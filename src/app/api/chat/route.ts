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
const MAX_HISTORY_CHARS = 800;
const MAX_OUTPUT_TOKENS = 1024;
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
  const { query, history } = parsed.data;

  const messages = [
    ...history.slice(-MAX_HISTORY_MESSAGES).map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, MAX_HISTORY_CHARS),
    })),
    { role: "user" as const, content: query },
  ];

  // 3. Stream the answer
  try {
    const result = streamText({
      model: getChatModel(),
      system: SYSTEM_PROMPT,
      messages,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      temperature: 0.3,
      onError: ({ error }) => {
        console.error("[chat] stream error:", error);
      },
      onFinish: ({ usage }) => {
        console.log(
          `[chat] ${getChatModelId()} ${Date.now() - startedAt}ms in=${usage?.inputTokens} out=${usage?.outputTokens}`
        );
      },
    });
    return result.toTextStreamResponse();
  } catch (error) {
    if (error instanceof MissingApiKeyError) {
      console.error("[chat] OPENROUTER_API_KEY is missing");
      return fail("Trợ lý AI chưa được cấu hình.", 503);
    }
    console.error("[chat] error:", error);
    return fail("Trợ lý AI đang bận, bạn thử lại sau vài giây nhé.", 502);
  }
}
