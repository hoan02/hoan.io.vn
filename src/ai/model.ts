import { createGroq } from "@ai-sdk/groq";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { LanguageModel } from "ai";

export function getChatModel(): LanguageModel {
  const provider = (process.env.AI_PROVIDER || "openrouter").toLowerCase();

  // 1. OpenRouter Provider (Free Models Router & High Token Ceiling)
  if (provider === "openrouter") {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (apiKey) {
      const openrouter = createOpenRouter({ apiKey });
      const modelName = process.env.OPENROUTER_MODEL || "openrouter/free";
      return openrouter(modelName);
    }
  }

  // 2. Groq Provider (Fast LPU inference, tool calling ready)
  if (provider === "groq") {
    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey) {
      const groq = createGroq({ apiKey });
      const modelName = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
      return groq(modelName);
    }
  }

  // 3. Google Gemini Provider (Gemini 2.5 Flash / 1.5 Flash)
  const geminiApiKey =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_API_KEY;

  if (geminiApiKey) {
    const google = createGoogleGenerativeAI({ apiKey: geminiApiKey });
    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    return google(modelName);
  }

  // 4. Default Fallback cascade
  if (process.env.OPENROUTER_API_KEY) {
    const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
    return openrouter(process.env.OPENROUTER_MODEL || "openrouter/free");
  }

  if (process.env.GROQ_API_KEY) {
    const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
    return groq(process.env.GROQ_MODEL || "openai/gpt-oss-20b");
  }

  const groq = createGroq({
    apiKey: "dummy-key",
  });
  return groq("openai/gpt-oss-20b");
}
