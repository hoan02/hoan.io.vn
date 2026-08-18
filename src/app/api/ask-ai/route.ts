import { NextResponse } from "next/server";
import { processAIQuery, ChatMessage } from "@/lib/aiService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query, lang, history } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query string is required." },
        { status: 400 }
      );
    }

    const sanitizedHistory: ChatMessage[] = Array.isArray(history)
      ? history
          .filter((msg) => msg && typeof msg.content === "string" && (msg.role === "user" || msg.role === "assistant" || msg.role === "model"))
          .map((msg) => ({
            role: msg.role,
            content: msg.content.trim(),
          }))
      : [];

    const result = await processAIQuery(query, lang === "vi" ? "vi" : "en", sanitizedHistory);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing AI query:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your query." },
      { status: 500 }
    );
  }
}
