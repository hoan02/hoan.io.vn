import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
          "Meta-ExternalAgent",
          "cohere-ai",
          "Bytespider",
        ],
        allow: ["/", "/llms.txt"],
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://hoan.io.vn/sitemap.xml",
    host: "https://hoan.io.vn",
  };
}
