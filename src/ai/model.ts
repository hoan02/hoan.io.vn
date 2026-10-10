import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { LanguageModel } from "ai";

/**
 * Hoan AI talks to exactly one provider (OpenRouter) and one model.
 * Override the model with OPENROUTER_MODEL; the API key is required.
 */
export const DEFAULT_CHAT_MODEL = "anthropic/claude-haiku-5.5";

export class MissingApiKeyError extends Error {
  constructor() {
    super("OPENROUTER_API_KEY is not set");
    this.name = "MissingApiKeyError";
  }
}

export function getChatModelId(): string {
  return process.env.OPENROUTER_MODEL?.trim() || DEFAULT_CHAT_MODEL;
}

export function getChatModel(): LanguageModel {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) throw new MissingApiKeyError();

  return createOpenRouter({ apiKey })(getChatModelId());
}
