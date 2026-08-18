import { NextResponse } from "next/server";
import { processAIQuery } from "@/lib/aiService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query, lang } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query string is required." },
        { status: 400 }
      );
    }

    const result = await processAIQuery(query, lang === "vi" ? "vi" : "en");
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing AI query:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your query." },
      { status: 500 }
    );
  }
}
