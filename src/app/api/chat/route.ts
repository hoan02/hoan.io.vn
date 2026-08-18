import { streamText, stepCountIs } from "ai";
import { getChatModel } from "@/ai/model";
import { SYSTEM_PROMPT } from "@/ai/system-prompt";
import { aiTools } from "@/ai/tools";
import { checkRateLimit } from "@/lib/rateLimit";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  const startTime = Date.now();

  try {
    // 1. IP extraction & Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    const rateLimit = checkRateLimit(ip, 25, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Hệ thống đang nhận nhiều câu hỏi. Bạn vui lòng đợi 1 phút trước khi thử lại nhé.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // 2. Parse request body
    const body = await req.json();
    const { messages, query, history } = body;

    // Normalizing messages format
    let formattedMessages: { role: "user" | "assistant" | "system"; content: string }[] = [];

    if (Array.isArray(messages) && messages.length > 0) {
      formattedMessages = messages
        .filter((m) => m && typeof m.content === "string")
        .slice(-8)
        .map((m) => ({
          role: m.role === "system" ? "system" : m.role === "assistant" ? "assistant" : "user",
          content: m.content.trim().slice(0, 1000), // Max 1000 chars per message
        }));
    } else if (typeof query === "string" && query.trim()) {
      const sanitizedHistory = Array.isArray(history)
        ? history
            .filter((m) => m && typeof m.content === "string")
            .slice(-6)
            .map((m) => ({
              role: (m.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
              content: m.content.trim().slice(0, 1000),
            }))
        : [];

      formattedMessages = [
        ...sanitizedHistory,
        { role: "user", content: query.trim().slice(0, 1000) },
      ];
    } else {
      return NextResponse.json({ error: "Missing query or messages." }, { status: 400 });
    }

    // 3. Obtain AI Model
    const model = getChatModel();

    // 4. Stream response with Tools & Reasoning
    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
      messages: formattedMessages,
      tools: aiTools,
      stopWhen: stepCountIs(5),
      maxOutputTokens: 1500,
      temperature: 0.5,
      onFinish: ({ usage }) => {
        const duration = Date.now() - startTime;
        console.log(
          `[Chat API] Handled request from IP: ${ip} in ${duration}ms | Tokens: total=${usage?.totalTokens}`
        );
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[Chat API Error]:", error);
    return NextResponse.json(
      {
        error:
          "Đã có sự cố kết nối với AI provider. Bạn có thể thử lại sau giây lát hoặc xem trực tiếp các dự án tại /#selected-work.",
      },
      { status: 500 }
    );
  }
}
