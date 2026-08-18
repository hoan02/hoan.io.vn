import { queryAIKnowledgeBase } from "@/data/aiKnowledgeBase";
import { PERSONAL_INFO, PROJECTS_DATA, EXPERIENCES_DATA, TECH_CATEGORIES, ARTICLES_DATA } from "@/data/portfolioData";
import { ENGINEERING_EVIDENCE } from "@/data/engineeringEvidence";
import { AIResponse } from "@/types";

export interface ChatMessage {
  role: "user" | "assistant" | "model";
  content: string;
}

export interface AIServiceResult {
  response: AIResponse;
  source: "local-semantic" | "gemini" | "openai";
}

const HOAN_PROFILE = {
  identity: {
    fullName: PERSONAL_INFO.name,
    fullNameVi: "Lê Công Hoan",
    preferredName: "Hoan",
    birthDateFormatted: "02/04/2002",
    birthYear: 2002,
    age: 24,
    location: "Hanoi, Vietnam",
    phone: PERSONAL_INFO.phone,
    email: PERSONAL_INFO.email,
    github: PERSONAL_INFO.github,
    linkedin: PERSONAL_INFO.linkedin,
    facebook: PERSONAL_INFO.facebook,
    cvUrl: PERSONAL_INFO.cvUrl,
    website: "https://hoan.io.vn",
    openSourceOrganizations: [
      {
        name: "Arda Labs",
        github: "https://github.com/arda-labs",
        website: "https://arda.io.vn",
        description: "Cloud-native multi-tenant FinOps platform with 9 Go microservices (gRPC/NATS), React Module Federation (7 remotes), and Ory IAM on 3-node K3s."
      },
      {
        name: "Puchidemy",
        github: "https://github.com/puchidemy",
        website: "https://puchi.io.vn",
        description: "Modern Vietnamese language learning platform with Next.js PWA, 5 Go microservices (Kratos v3), Limen Auth, NATS event bus, and ArgoCD GitOps on K3s."
      }
    ],
  },
  personal: {
    hobbies: [
      "homelab & self-hosting",
      "building side projects",
      "exploring new web & cloud technologies",
      "coding & system experiments",
    ],
    interests: [
      "software architecture",
      "DevOps & Kubernetes",
      "micro-frontends",
      "distributed systems",
      "developer tooling",
      "AI engineering",
    ],
  },
  career: {
    currentRole: "Fullstack Developer at NGV Group",
    currentFocus: "Angular micro-frontends, Java Spring Boot microservices, and Kubernetes/CI-CD infrastructure",
    status: "Building scalable web platforms & developer infrastructure",
  },
  education: {
    school: "University of Transport and Communications (Trường Đại học Giao thông Vận tải)",
    degree: "Degree of Engineer in Information Technology (Kỹ sư Công nghệ Thông tin)",
    honor: "Graduated with Distinction (Tốt nghiệp loại Giỏi)",
    period: "10/2020 – 08/2024",
  },
  technicalCapabilities: TECH_CATEGORIES.map((cat) => ({
    category: cat.title,
    items: cat.items.map((item) => ({
      name: item.name,
      capabilities: item.capabilities,
    })),
  })),
  projects: PROJECTS_DATA.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    role: p.role,
    year: p.year,
    techStack: p.techStack,
    problem: p.problem,
    deliverables: p.contributionsDetailed || p.contributionsDetailedVi,
    results: p.results || p.metrics,
  })),
  experience: EXPERIENCES_DATA.map((e) => ({
    role: e.role,
    company: e.company,
    period: e.period,
    location: e.location,
    summary: e.summary,
    contributions: e.contributions,
    techStack: e.techStack,
  })),
  engineeringEvidence: ENGINEERING_EVIDENCE.map((ev) => ({
    id: ev.id,
    project: ev.project,
    category: ev.category,
    claim: ev.claim,
    evidence: ev.evidence,
    confidence: ev.confidence,
    relatedArticles: ev.relatedArticles,
    technologies: ev.technologies,
  })),
  writing: ARTICLES_DATA.map((a) => ({
    title: a.title,
    slug: a.slug,
    date: a.date,
    readTime: a.readTime,
    tags: a.tags,
    summary: a.summary,
    url: `https://hoan.io.vn/writing/${a.slug}`,
  })),
};

const DERIVED_PROFILE = {
  currentDate: new Date().toISOString().split("T")[0],
  currentAge: 24,
  birthYear: 2002,
  primaryStack: "Angular, Next.js, TypeScript, Java Spring Boot, Go, Kubernetes, PostgreSQL, Oracle, Docker, Jenkins, NATS",
};

const SYSTEM_INSTRUCTION_TEXT = `You are Hoan AI, the personal AI assistant embedded in Le Cong Hoan's portfolio website.
Your purpose is to help visitors learn about Hoan naturally and accurately, including his personal background, career, skills, projects, interests, education, engineering evidence, and technical articles.
Your purpose is to help visitors learn about Hoan naturally and accurately, including his personal background, career, skills, projects, interests, education, engineering evidence, and technical articles.
You are not a generic recruiter bot.

EVIDENCE-GROUNDED TECHNICAL RESPONSES
When answering technical questions, rely on the verified ENGINEERING EVIDENCE and ARCHITECTURAL CASE STUDIES rather than merely listing skill names:
- When asked "Does Hoan know Kubernetes?": Explain that Hoan runs a multi-node self-hosted K3s cluster running CloudNativePG HA, NATS JetStream, Traefik, and ArgoCD GitOps for projects like Arda and Puchi.
- When asked "Does Hoan understand distributed systems?": Explain his hands-on implementation of the Transactional Outbox pattern with NATS JetStream, idempotent consumer deduplication, and gRPC service contracts in Arda.
- When asked "What is Hoan strongest at?": Answer with nuanced perspective: building systems across boundaries — frontend architecture (Module Federation & Angular MFEs), backend services (Go microservices, Spring Boot, NATS), and deployment infrastructure (K3s, GitOps).
- Always distinguish between verified code evidence, self-hosted deployment environments, and general skills. Never invent fake enterprise traffic, transaction numbers, or business metrics.

MOST IMPORTANT RULE
Answer the user's actual question first.
Do not unnecessarily redirect personal or simple questions toward Hoan's technical stack.

Examples:
User: Hoan bao nhiêu tuổi? / Hoan sinh ngày nào?
Good: Hoan sinh ngày 02/04/2002, hiện 24 tuổi.

User: Hoan thích làm gì?
Good: Hoan thích mày mò cụm homelab/self-hosting, thử nghiệm công nghệ mới và xây dựng các dự án mã nguồn mở như Arda và Puchi.

User: Hoan có kinh nghiệm Angular không?
Good: Có. Angular là một trong những công nghệ Hoan sử dụng nhiều nhất. Hoan đã dùng Angular trong các hệ thống enterprise, bao gồm micro-frontend, reusable libraries và tối ưu hiệu năng.

CONVERSATION STYLE & RICH FORMATTING
Talk naturally, like an authoritative, knowledgeable engineering peer introducing Hoan.
Tone: Friendly, Crisp, Analytical, Confident, Clear, and Professional.

Formatting Rules (CRITICAL for readable, beautiful UI):
- Use **bold** text to emphasize key technologies, metrics, performance numbers, and crucial insights (e.g. **Angular Micro-Frontend**, **K3s 3-node cluster**, **10ms latency**).
- Use inline code \`code\` for frameworks, libraries, protocols, CLI commands, and architectures (e.g. \`gRPC\`, \`NATS JetStream\`, \`CloudNativePG\`, \`Nx monorepo\`).
- Use bullet points - for lists of features, responsibilities, or capabilities to avoid walls of text.
- Use \`### Section Title\` for structured in-depth technical answers (e.g. \`### 1. Kiến trúc Hệ thống\`, \`### 2. Quyết định Kỹ thuật\`).
- When referencing code or configs, use fenced code blocks with language identifiers.
- Keep simple personal questions direct and warm; format technical questions with depth, trade-offs, and concrete evidence.

Avoid:
- Corporate buzzwords or empty fluff
- Marketing hype without substance
- Repeating full name unnecessarily in every sentence
- Long generic introductions or robotic phrases like "According to the database..."

Simple question → simple answer.
Technical question → provide thorough, complete engineering context, architectural decisions, and concrete components without stopping prematurely.
Always ensure lists, bullet points, and code explanations are fully completed and closed.

LANGUAGE
Automatically respond in the same language as the user.
If the user speaks Vietnamese, answer naturally in Vietnamese.
If the user speaks English, answer in English.
Do not translate technical names unnecessarily (e.g. Angular, Kubernetes, Spring Boot, PostgreSQL, Micro-Frontend remain unchanged).

PERSONAL QUESTIONS
Questions about age, birthday, location, education, hobbies, interests, personal projects, career goals should be answered directly and personally.
Do not force technical information into these answers unless relevant.

CAREER & TECHNICAL QUESTIONS
For career-related questions, prioritize direct answer, relevant real experience, relevant project example, and technologies involved without simply dumping the entire CV.

PROJECT QUESTIONS
When discussing a project, structure as: What the project is, What Hoan worked on, Key technologies & engineering challenges.

FOLLOW-UP QUESTIONS
Use conversation history to understand context from previous messages.

FACTUALITY & DERIVED INFORMATION
Never invent facts. Use derived values directly (e.g. currentAge: 24).
Only reveal information included in HOAN_PROFILE.

<HOAN_PROFILE>
${JSON.stringify(HOAN_PROFILE, null, 2)}
</HOAN_PROFILE>

<DERIVED_PROFILE>
${JSON.stringify(DERIVED_PROFILE, null, 2)}
</DERIVED_PROFILE>`;

export async function processAIQuery(
  query: string,
  lang: "en" | "vi" = "en",
  history: ChatMessage[] = []
): Promise<AIServiceResult> {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const openAiApiKey = process.env.OPENAI_API_KEY;

  // 1. Try Gemini API if key is present (default model: gemini-2.5-flash)
  if (geminiApiKey) {
    try {
      const response = await callGeminiAPI(query, geminiApiKey, history);
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
      const response = await callOpenAI(query, openAiApiKey, history);
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
    source: "local-semantic",
  };
}

async function callGeminiAPI(
  query: string,
  apiKey: string,
  history: ChatMessage[] = []
): Promise<AIResponse | null> {
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-goog-api-key": apiKey,
  };

  // Build conversation contents
  const contents = [
    ...history.slice(-6).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    })),
    {
      role: "user",
      parts: [{ text: query }],
    },
  ];

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION_TEXT }],
      },
      contents,
      generationConfig: {
        temperature: 0.65,
        topP: 0.9,
        maxOutputTokens: 8192,
      },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.warn("Gemini API call returned status:", res.status, errorText);
    return null;
  }

  const data = await res.json();
  const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!answer) return null;

  // Derive contextual navigation links based on query
  const lowerQuery = query.toLowerCase();
  const relevantLinks: { label: string; url: string }[] = [];

  if (lowerQuery.includes("arda") || lowerQuery.includes("finops")) {
    relevantLinks.push({ label: "Read Arda Architecture Note", url: "/writing/designing-arda-cloud-native-finops-platform" });
    relevantLinks.push({ label: "Arda GitHub", url: "https://github.com/arda-labs" });
  }
  if (lowerQuery.includes("puchi") || lowerQuery.includes("học tiếng việt")) {
    relevantLinks.push({ label: "Read Puchi Architecture Note", url: "/writing/puchi-vietnamese-learning-platform-architecture" });
    relevantLinks.push({ label: "Puchidemy GitHub", url: "https://github.com/puchidemy" });
  }
  if (lowerQuery.includes("project") || lowerQuery.includes("dự án") || lowerQuery.includes("epas") || lowerQuery.includes("zalo")) {
    relevantLinks.push({ label: "View Projects", url: "/#selected-work" });
  }
  if (lowerQuery.includes("writing") || lowerQuery.includes("bài viết") || lowerQuery.includes("blog") || lowerQuery.includes("k3s") || lowerQuery.includes("note")) {
    relevantLinks.push({ label: "Read Engineering Notes", url: "/writing" });
  }
  if (lowerQuery.includes("experience") || lowerQuery.includes("kinh nghiệm") || lowerQuery.includes("ngv") || lowerQuery.includes("mochi")) {
    relevantLinks.push({ label: "View Experience", url: "/#experience" });
  }
  if (lowerQuery.includes("tech") || lowerQuery.includes("stack") || lowerQuery.includes("angular") || lowerQuery.includes("k8s") || lowerQuery.includes("homelab")) {
    relevantLinks.push({ label: "Inspect Tech Stack", url: "/#tech-stack" });
  }
  if (lowerQuery.includes("contact") || lowerQuery.includes("liên hệ") || lowerQuery.includes("email") || lowerQuery.includes("phone")) {
    relevantLinks.push({ label: "Get in Touch", url: "/#contact" });
  }

  return {
    answer,
    relatedTopic: "Hoan AI",
    tags: ["Full-stack", "AI Powered"],
    relevantLinks: relevantLinks.length > 0 ? relevantLinks : undefined,
  };
}

async function callOpenAI(
  query: string,
  apiKey: string,
  history: ChatMessage[] = []
): Promise<AIResponse | null> {
  const messages = [
    { role: "system", content: SYSTEM_INSTRUCTION_TEXT },
    ...history.slice(-6).map((msg) => ({
      role: msg.role === "model" ? "assistant" : msg.role,
      content: msg.content,
    })),
    { role: "user", content: query },
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.65,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) return null;

  return {
    answer: text,
    relatedTopic: "Hoan AI",
    tags: ["Software Engineering"],
  };
}
