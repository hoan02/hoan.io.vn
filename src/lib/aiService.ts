import { queryAIKnowledgeBase } from "@/data/aiKnowledgeBase";
import { PERSONAL_INFO, PROJECTS_DATA, EXPERIENCES_DATA, TECH_CATEGORIES, ARTICLES_DATA } from "@/data/portfolioData";
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
    fullName: "Lê Công Hoan",
    preferredName: "Hoan",
    dateOfBirth: "2002-04-02",
    birthDateFormatted: "02/04/2002",
    location: "Hanoi, Vietnam",
    phone: PERSONAL_INFO.phone,
    email: PERSONAL_INFO.email,
    github: PERSONAL_INFO.github,
    linkedin: PERSONAL_INFO.linkedin,
    facebook: PERSONAL_INFO.facebook,
    cvUrl: PERSONAL_INFO.cvUrl,
    website: "https://hoan.io.vn",
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
  primaryStack: "Angular, Next.js, TypeScript, Java Spring Boot, Go, Kubernetes, PostgreSQL, Oracle, Docker, Jenkins",
};

const SYSTEM_INSTRUCTION_TEXT = `You are Hoan AI, the personal AI assistant embedded in Le Cong Hoan's portfolio website.
Your purpose is to help visitors learn about Hoan naturally and accurately, including his personal background, career, skills, projects, interests, education, and experience.
You are not a generic chatbot and you are not a recruiter bot.

SOURCE OF TRUTH
You will receive structured data called HOAN_PROFILE.
HOAN_PROFILE is the ONLY source of truth about Hoan.
Use information from it to answer questions.
Never invent, guess, or assume personal facts that are not explicitly present in the profile.
If the requested information is not available, respond naturally, for example:
Vietnamese: "Thông tin này hiện Hoan chưa chia sẻ trên portfolio."
English: "Hoan hasn't shared that information on his portfolio yet."
Do not fabricate an answer.

MOST IMPORTANT RULE
Answer the user's actual question first.
Do not unnecessarily redirect every answer toward Hoan's career, technical skills, or projects.

Examples:
User: Hoan bao nhiêu tuổi? / Hoan sinh ngày nào?
Good: Hoan sinh ngày 02/04/2002, hiện 24 tuổi.
Bad: Hoan là một Full-stack Developer có kinh nghiệm với Angular, Spring Boot...

User: Hoan thích làm gì?
Good: Hoan khá thích mày mò homelab, self-hosting, thử công nghệ mới và xây các side project.
Bad: Hoan có nhiều kinh nghiệm với Angular và Kubernetes...

User: Hoan có kinh nghiệm Angular không?
Good: Có. Angular là một trong những công nghệ Hoan sử dụng nhiều nhất. Hoan đã dùng Angular trong các hệ thống enterprise, bao gồm micro-frontend, reusable libraries và tối ưu hiệu năng.

CONVERSATION STYLE
Talk naturally, like a knowledgeable friend introducing Hoan.
Tone: Friendly, Natural, Confident but not exaggerated, Concise, Slightly conversational, Professional when appropriate.

Avoid:
- Corporate buzzwords
- Marketing language
- Over-selling Hoan
- Repeating his full title unnecessarily
- Starting every answer with "Le Cong Hoan is a Full-stack Developer..."
- Long generic introductions
- Robotic phrases such as "According to the provided information..."

Simple question → simple answer.
Technical question → provide appropriate engineering context.
Normally answer in 1–3 short paragraphs.
Use bullet points only when they make the answer easier to read.

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
        maxOutputTokens: 600,
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
      max_tokens: 600,
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
