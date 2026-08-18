import { queryAIKnowledgeBase } from "@/data/aiKnowledgeBase";
import { PERSONAL_INFO, PROJECTS_DATA, EXPERIENCES_DATA, TECH_CATEGORIES } from "@/data/portfolioData";
import { AIResponse } from "@/types";

/**
 * AI Service Provider Abstraction
 * Handles queries via:
 * 1. Google Gemini API (when GEMINI_API_KEY is present)
 * 2. OpenAI API (when OPENAI_API_KEY is present)
 * 3. High-precision Local Semantic Engine (Zero-latency fallback)
 */

export interface AIServiceResult {
  response: AIResponse;
  source: "local-semantic" | "gemini" | "openai";
}

const SYSTEM_CONTEXT = `
You are the AI Assistant embedded in the portfolio website of Le Cong Hoan (Lê Công Hoan).
Your mission is to represent Hoan accurately, professionally, concisely, and highlight his engineering expertise.

### Personal Profile:
- Name: Le Cong Hoan (Lê Công Hoan)
- Role: Full-stack Developer
- Phone: ${PERSONAL_INFO.phone}
- Location: Hanoi, Vietnam (Available for remote and hybrid roles globally)
- Email: ${PERSONAL_INFO.email}
- GitHub: ${PERSONAL_INFO.github}
- LinkedIn: ${PERSONAL_INFO.linkedin}
- Facebook: ${PERSONAL_INFO.facebook}
- CV File: ${PERSONAL_INFO.cvUrl}
- Education: ${PERSONAL_INFO.education.degree} - ${PERSONAL_INFO.education.school} (${PERSONAL_INFO.education.honor})

### Core Technologies:
- Frontend: Angular (Micro-frontends, NgRx, Signals, RxJS), Next.js (App Router, SSR, Server Actions), TypeScript, React, Tailwind CSS
- Backend: Java / Spring Boot (Spring Cloud, JPA, Security, CQRS), Go / Golang (gRPC, Goroutine worker pools, High throughput)
- Databases: PostgreSQL (Indexing, Partitioning, Pooling), Oracle (PL/SQL, High availability), Redis (Distributed caching & locks)
- DevOps & Cloud: Docker, Kubernetes, CI/CD (GitHub Actions, GitLab CI), Helm, Linux

### Key Featured Projects:
${PROJECTS_DATA.map((p) => `- **${p.title}** (${p.year}, Role: ${p.role}): ${p.subtitle}. Tech Stack: ${p.techStack.join(", ")}. Key Metrics: ${p.metrics?.join(" | ")}`).join("\n")}

### Work Experience:
${EXPERIENCES_DATA.map((e) => `- **${e.role}** at ${e.company} (${e.period}): ${e.summary}. Key contributions: ${e.contributions.join("; ")}`).join("\n")}

### Guidelines:
- If the user asks in Vietnamese, respond fluently in Vietnamese. If in English, respond in English.
- Keep responses concise, clear, and well-structured with bullet points when listing details.
- Be humble yet confident about Hoan's real-world software engineering depth.
- Highlight specific projects and technologies that relate to the question.
`;

export async function processAIQuery(query: string, lang: "en" | "vi" = "en"): Promise<AIServiceResult> {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const openAiApiKey = process.env.OPENAI_API_KEY;

  // 1. Try Gemini API if key is present
  if (geminiApiKey) {
    try {
      const response = await callGeminiAPI(query, geminiApiKey, lang);
      if (response && response.answer) {
        return { response, source: "gemini" };
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to local semantic engine:", err);
    }
  }

  // 2. Try OpenAI API if key is present
  if (openAiApiKey) {
    try {
      const response = await callOpenAI(query, openAiApiKey);
      if (response && response.answer) {
        return { response, source: "openai" };
      }
    } catch (err) {
      console.warn("OpenAI API call failed, falling back to local semantic engine:", err);
    }
  }

  // 3. High-precision local semantic matching fallback
  const localResponse = queryAIKnowledgeBase(query, lang);
  return {
    response: localResponse,
    source: "local-semantic"
  };
}

async function callGeminiAPI(query: string, apiKey: string, lang: "en" | "vi" = "en"): Promise<AIResponse | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // If token starts with AQ. or bearer format, also include Authorization header
  if (apiKey.startsWith("AQ.") || apiKey.startsWith("ya29.")) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  } else {
    headers["x-goog-api-key"] = apiKey;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { text: `${SYSTEM_CONTEXT}\n\nUser Question: ${query}` }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 600,
      }
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.warn("Gemini API call returned status:", res.status, errorText);
    return null;
  }

  const data = await res.json();
  const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!answer) return null;

  // Derive smart tag and navigation links based on query
  const lowerQuery = query.toLowerCase();
  const relevantLinks: { label: string; url: string }[] = [];

  if (lowerQuery.includes("project") || lowerQuery.includes("dự án") || lowerQuery.includes("bank") || lowerQuery.includes("gateway")) {
    relevantLinks.push({ label: "View Projects", url: "#selected-work" });
  }
  if (lowerQuery.includes("experience") || lowerQuery.includes("kinh nghiệm") || lowerQuery.includes("career")) {
    relevantLinks.push({ label: "View Experience", url: "#experience" });
  }
  if (lowerQuery.includes("tech") || lowerQuery.includes("stack") || lowerQuery.includes("angular") || lowerQuery.includes("k8s") || lowerQuery.includes("java") || lowerQuery.includes("go")) {
    relevantLinks.push({ label: "Inspect Tech Stack", url: "#tech-stack" });
  }
  if (lowerQuery.includes("contact") || lowerQuery.includes("liên hệ") || lowerQuery.includes("hire") || lowerQuery.includes("email")) {
    relevantLinks.push({ label: "Get in Touch", url: "#contact" });
  }

  if (relevantLinks.length === 0) {
    relevantLinks.push({ label: "Explore Work", url: "#selected-work" });
    relevantLinks.push({ label: "Contact Hoan", url: "#contact" });
  }

  return {
    answer,
    relatedTopic: "Gemini AI",
    tags: ["Full-stack", "AI Powered"],
    relevantLinks
  };
}

async function callOpenAI(query: string, apiKey: string): Promise<AIResponse | null> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_CONTEXT },
        { role: "user", content: query }
      ],
      temperature: 0.3
    })
  });

  if (!res.ok) return null;
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) return null;

  return {
    answer: text,
    relatedTopic: "OpenAI GPT",
    tags: ["Software Engineering"]
  };
}
