import { createGroq } from "@ai-sdk/groq";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export function getChatModel() {
  const provider = (process.env.AI_PROVIDER || "groq").toLowerCase();

  // 1. Groq Provider (Fast LPU inference, tool calling ready)
  if (provider === "groq") {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.warn("GROQ_API_KEY is not set. Trying Google Gemini fallback...");
    } else {
      const groq = createGroq({ apiKey });
      const modelName = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
      return groq(modelName);
    }
  }

  // 2. Google Gemini Provider (Gemini 2.5 Flash / 1.5 Flash)
  const geminiApiKey =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_API_KEY;

  if (geminiApiKey) {
    const google = createGoogleGenerativeAI({ apiKey: geminiApiKey });
    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    return google(modelName);
  }

  // Default Groq fallback
  const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY || "dummy-key",
  });
  return groq(process.env.GROQ_MODEL || "openai/gpt-oss-120b");
}
