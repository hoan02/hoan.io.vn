import { streamText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getChatModel, getChatModelId, MissingApiKeyError } from "@/ai/model";
import { SYSTEM_PROMPT } from "@/ai/system-prompt";
import { checkRateLimit } from "@/lib/rateLimit";

export const maxDuration = 30;

// --- Limits (best-effort: in-memory, so they are per server instance) -------
const MAX_QUERY_CHARS = 800;
const MAX_HISTORY_MESSAGES = 6;
const MAX_HISTORY_CHARS = 1500;
// Vietnamese costs roughly 2–3x the tokens of English, so 1024 cut answers mid-sentence.
const MAX_OUTPUT_TOKENS = 2048;

// Appended to the text stream so the reader knows the answer did not end naturally.
const NOTES = {
  length: {
    en: '\n\n_(The answer hit the length limit. Ask "continue" for the rest.)_',
    vi: '\n\n_(Câu trả lời chạm giới hạn độ dài. Hỏi "tiếp tục" để xem phần còn lại.)_',
  },
  error: {
    en: "\n\n_(The connection to the assistant dropped mid-answer. Please try again.)_",
    vi: "\n\n_(Kết nối với trợ lý bị ngắt giữa chừng. Bạn thử lại nhé.)_",
  },
};
const PER_IP_PER_MINUTE = 8;
const PER_IP_PER_DAY = 80;
// Hard ceiling on total daily requests, a cost circuit breaker.
const GLOBAL_PER_DAY = Number(process.env.AI_DAILY_REQUEST_LIMIT) || 1000;

const MINUTE = 60_000;
const DAY = 24 * 60 * MINUTE;

const bodySchema = z.object({
  query: z.string().trim().min(1).max(MAX_QUERY_CHARS),
  history: z
    .array(
      z.object({
        // Only user/assistant: never accept client-supplied "system" messages.
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .max(50)
    .optional()
    .default([]),
  lang: z.enum(["en", "vi"]).optional().default("vi"),
});

function clientIp(req: Request): string {
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "anonymous"
  );
}

function fail(message: string, status: number, retryAfterMs?: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: retryAfterMs
        ? { "Retry-After": Math.ceil(retryAfterMs / 1000).toString() }
        : undefined,
    }
  );
}

export async function POST(req: Request) {
  const startedAt = Date.now();

  // 1. Rate limiting (per IP per minute / day, plus a global daily ceiling)
  const ip = clientIp(req);
  const checks = [
    checkRateLimit(`m:${ip}`, PER_IP_PER_MINUTE, MINUTE),
    checkRateLimit(`d:${ip}`, PER_IP_PER_DAY, DAY),
    checkRateLimit("global:day", GLOBAL_PER_DAY, DAY),
  ];
  const blocked = checks.find((c) => !c.allowed);
  if (blocked) {
    return fail(
      "Bạn hỏi hơi nhanh rồi, vui lòng thử lại sau ít phút nhé.",
      429,
      Math.max(blocked.resetTime - Date.now(), 1000)
    );
  }

  // 2. Validate input
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return fail("Yêu cầu không hợp lệ.", 400);
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return fail("Câu hỏi trống hoặc quá dài (tối đa 800 ký tự).", 400);
  }
  const { query, history, lang } = parsed.data;

  const messages = [
    ...history.slice(-MAX_HISTORY_MESSAGES).map((m) => {
      const content = m.content.trim();
      // Keep the end of long assistant answers so "continue" picks up where it stopped.
      return {
        role: m.role,
        content: m.role === "assistant" ? content.slice(-MAX_HISTORY_CHARS) : content.slice(0, MAX_HISTORY_CHARS),
      };
    }),
    { role: "user" as const, content: query },
  ];

  // 3. Stream the answer
  try {
    let streamFailed = false;
    const result = streamText({
      model: getChatModel(),
      system: SYSTEM_PROMPT,
      messages,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      temperature: 0.3,
      onError: ({ error }) => {
        streamFailed = true;
        console.error("[chat] stream error:", error);
      },
      onFinish: ({ usage, finishReason }) => {
        console.log(
          `[chat] ${getChatModelId()} ${Date.now() - startedAt}ms in=${usage?.inputTokens} out=${usage?.outputTokens} finish=${finishReason}`
        );
      },
    });

    // Plain text stream, plus a short note when the answer was cut off or broke.
    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const text of result.textStream) {
            controller.enqueue(encoder.encode(text));
          }
          const reason = await Promise.resolve(result.finishReason).catch(() => "error");
          if (streamFailed || reason === "error") controller.enqueue(encoder.encode(NOTES.error[lang]));
          else if (reason === "length") controller.enqueue(encoder.encode(NOTES.length[lang]));
        } catch (error) {
          console.error("[chat] stream error:", error);
          controller.enqueue(encoder.encode(NOTES.error[lang]));
        } finally {
          controller.close();
        }
      },
    });
    return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  } catch (error) {
    if (error instanceof MissingApiKeyError) {
      console.error("[chat] OPENROUTER_API_KEY is missing");
      return fail("Trợ lý AI chưa được cấu hình.", 503);
    }
    console.error("[chat] error:", error);
    return fail("Trợ lý AI đang bận, bạn thử lại sau vài giây nhé.", 502);
  }
}
