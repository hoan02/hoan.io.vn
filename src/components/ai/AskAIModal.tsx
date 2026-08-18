"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { TechIcon } from "@/components/common/TechIcon";
import { ChatMessageRenderer } from "@/components/ai/ChatMessageRenderer";
import { readDataStream } from "@/lib/streamHelper";
import {
  X,
  Sparkles,
  Bot,
  ExternalLink,
  RefreshCw,
  ArrowRight,
  User,
  Trash2,
  Layers,
  Cpu,
  GraduationCap,
  UserCheck,
  MessageSquarePlus,
  Copy,
  Check,
  Send,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AskAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DisplayMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: string;
  relevantLinks?: { label: string; url: string }[];
  followUps?: string[];
  isStreaming?: boolean;
}

interface PromptCategory {
  categoryEn: string;
  categoryVi: string;
  promptsEn: { badge: string; text: string }[];
  promptsVi: { badge: string; text: string }[];
}

const CATEGORY_PROMPTS: PromptCategory[] = [
  {
    categoryEn: "Featured Architecture",
    categoryVi: "Kiến trúc & Dự án Tiêu biểu",
    promptsEn: [
      {
        badge: "Arda Platform",
        text: "How did Hoan architect Arda with 9 Go microservices, gRPC, and React Module Federation?",
      },
      {
        badge: "Puchi Platform",
        text: "Tell me about Puchidemy's Go Kratos v3 backend, Next.js PWA, and ArgoCD GitOps.",
      },
      {
        badge: "EPAS Enterprise",
        text: "What did Hoan build in the EPAS banking system using Angular Micro-Frontends?",
      },
      {
        badge: "CamRelay & Rust",
        text: "Why did Hoan build CamRelay in Rust to bridge P2P camera streams into RTSP?",
      },
    ],
    promptsVi: [
      {
        badge: "Nền tảng Arda",
        text: "Hoan đã thiết kế Arda với 9 Go microservices, gRPC và React Module Federation ra sao?",
      },
      {
        badge: "Nền tảng Puchi",
        text: "Kiến trúc Puchidemy kết hợp Go Kratos v3, Next.js PWA và GitOps ArgoCD như thế nào?",
      },
      {
        badge: "Hệ thống EPAS",
        text: "Hoan đã làm gì trong hệ thống ngân hàng EPAS với Angular Micro-Frontend?",
      },
      {
        badge: "CamRelay & Rust",
        text: "Tại sao Hoan xây dựng CamRelay bằng Rust để chuyển đổi luồng camera P2P sang RTSP?",
      },
    ],
  },
  {
    categoryEn: "Engineering Capabilities",
    categoryVi: "Năng lực Chuyên môn",
    promptsEn: [
      {
        badge: "Full-stack Profile",
        text: "What are Hoan's strongest core competencies across frontend and backend?",
      },
      {
        badge: "Kubernetes & Homelab",
        text: "Does Hoan have hands-on experience running a bare-metal Kubernetes K3s cluster?",
      },
      {
        badge: "Auth Architecture",
        text: "How does Hoan design authentication systems using Ory Kratos, Hydra, and Keycloak?",
      },
      {
        badge: "Distributed Systems",
        text: "Why can we say Hoan understands distributed systems and Transactional Outbox?",
      },
    ],
    promptsVi: [
      {
        badge: "Thế mạnh Full-stack",
        text: "Điểm mạnh cốt lõi và định hướng chuyên môn của Hoan là gì?",
      },
      {
        badge: "Kubernetes Homelab",
        text: "Hoan đã tự vận hành cụm Kubernetes K3s thực tế trên homelab như thế nào?",
      },
      {
        badge: "Kiến trúc Auth",
        text: "Kinh nghiệm thiết kế hệ thống xác thực của Hoan với Ory Kratos, Hydra và Keycloak?",
      },
      {
        badge: "Hệ thống Phân tán",
        text: "Tại sao có thể nói Hoan hiểu sâu về Distributed Systems và Transactional Outbox?",
      },
    ],
  },
  {
    categoryEn: "Education & Career",
    categoryVi: "Học vấn & Kinh nghiệm",
    promptsEn: [
      {
        badge: "UTC Engineer",
        text: "What is Hoan's degree and graduation honor at University of Transport and Communications?",
      },
      {
        badge: "Work Experience",
        text: "What companies has Hoan worked at and what were his key deliverables?",
      },
      {
        badge: "Engineering Notes",
        text: "What architectural case studies has Hoan published on /writing?",
      },
    ],
    promptsVi: [
      {
        badge: "Kỹ sư UTC",
        text: "Học vấn và xếp loại tốt nghiệp Kỹ sư CNTT của Hoan tại ĐH Giao thông Vận tải?",
      },
      {
        badge: "Kinh nghiệm làm việc",
        text: "Hoan từng làm việc ở những công ty nào và phụ trách những mảng gì?",
      },
      {
        badge: "Bài viết /writing",
        text: "Hoan đã xuất bản những case study kiến trúc nào trên trang /writing?",
      },
    ],
  },
  {
    categoryEn: "Personal & Contact",
    categoryVi: "Cá nhân & Liên hệ",
    promptsEn: [
      {
        badge: "Birthday & Age",
        text: "When was Hoan born and what are his technical hobbies?",
      },
      {
        badge: "Contact & Resume",
        text: "How can I download Hoan's CV or get in touch for collaboration?",
      },
    ],
    promptsVi: [
      {
        badge: "Ngày sinh & Tuổi",
        text: "Hoan sinh ngày bao nhiêu và có sở thích kỹ thuật gì?",
      },
      {
        badge: "Liên hệ & CV",
        text: "Làm sao để tải CV hoặc liên hệ trực tiếp với Hoan?",
      },
    ],
  },
];

const CATEGORY_ICONS = [Layers, Cpu, GraduationCap, UserCheck];

let messageIdCounter = 0;
function nextId(prefix: string): string {
  messageIdCounter += 1;
  return `${prefix}-${messageIdCounter}`;
}

export function AskAIModal({ isOpen, onClose }: AskAIModalProps) {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Focus on input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Handle global shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Derive relevant contextual navigation links
  const deriveRelevantLinks = (text: string): { label: string; url: string }[] => {
    const lower = text.toLowerCase();
    const links: { label: string; url: string }[] = [];

    if (lower.includes("arda") || lower.includes("finops")) {
      links.push({ label: "Arda Architecture Note", url: "/writing/designing-arda-cloud-native-finops-platform" });
      links.push({ label: "Arda GitHub", url: "https://github.com/arda-labs" });
    }
    if (lower.includes("puchi") || lower.includes("học tiếng việt")) {
      links.push({ label: "Puchi Architecture Note", url: "/writing/puchi-vietnamese-learning-platform-architecture" });
      links.push({ label: "Puchidemy GitHub", url: "https://github.com/puchidemy" });
    }
    if (lower.includes("camrelay") || lower.includes("dahua") || lower.includes("rtsp")) {
      links.push({ label: "CamRelay GitHub", url: "https://github.com/hoan02/camrelay" });
    }
    if (lower.includes("b4s") || lower.includes("tauri") || lower.includes("bluetooth")) {
      links.push({ label: "B4S GitHub", url: "https://github.com/hoan02/b4s" });
    }
    if (lower.includes("epas") || lower.includes("selected-work") || lower.includes("dự án tiêu biểu")) {
      links.push({ label: "View Projects", url: "/#selected-work" });
    }
    if (lower.includes("ngv") || lower.includes("mochimochi") || lower.includes("kinh nghiệm")) {
      links.push({ label: "View Experience", url: "/#experience" });
    }
    if (lower.includes("homelab") || lower.includes("k3s") || lower.includes("writing") || lower.includes("bài viết")) {
      links.push({ label: "Engineering Notes", url: "/writing" });
    }

    return links.slice(0, 3);
  };

  // Compute 1-3 contextual follow-up questions
  const computeContextualFollowUps = (lastQuery: string, answerText: string): string[] => {
    const combined = `${lastQuery} ${answerText}`.toLowerCase();
    const isVi = language === "vi";

    if (combined.includes("arda") || combined.includes("finops") || combined.includes("ory")) {
      return isVi
        ? [
            "Kiến trúc 9 Go microservices & gRPC trong Arda?",
            "Module Federation (7 remotes) của Arda tổ chức ra sao?",
          ]
        : [
            "How are the 9 Go microservices & gRPC built in Arda?",
            "How does Arda organize its 7 Module Federation remotes?",
          ];
    }

    if (combined.includes("puchi") || combined.includes("kratos") || combined.includes("tiếng việt")) {
      return isVi
        ? [
            "Cách Puchi kết hợp Go Kratos v3 và NATS event-driven?",
            "Hạ tầng K3s và GitOps ArgoCD của Puchi?",
          ]
        : [
            "How does Puchi use Go Kratos v3 & NATS events?",
            "Tell me about Puchi's K3s & ArgoCD GitOps setup.",
          ];
    }

    if (combined.includes("epas") || combined.includes("ngv") || combined.includes("bpm")) {
      return isVi
        ? [
            "Hoan xử lý state synchronization giữa Shell & Remote thế nào?",
            "Quy trình deploy Kubernetes tại NGV Group?",
          ]
        : [
            "How did Hoan handle shell-to-remote state synchronization?",
            "What was the Kubernetes deployment setup at NGV Group?",
          ];
    }

    if (combined.includes("camrelay") || combined.includes("rust") || combined.includes("rtsp")) {
      return isVi
        ? [
            "Tại sao CamRelay dùng Rust thay vì Python/C++?",
            "Cách CamRelay giải mã P2P và stream RTSP cho Home Assistant?",
          ]
        : [
            "Why did Hoan build CamRelay with Rust instead of Python?",
            "How does CamRelay stream Dahua P2P cameras into Home Assistant?",
          ];
    }

    if (combined.includes("k8s") || combined.includes("homelab") || combined.includes("kubernetes")) {
      return isVi
        ? [
            "Cấu hình 3-Node K3s cluster và CloudNativePG?",
            "Quy trình GitOps tự động với ArgoCD trên homelab?",
          ]
        : [
            "How is the 3-node K3s cluster & CloudNativePG configured?",
            "How does the automated GitOps pipeline with ArgoCD work?",
          ];
    }

    if (combined.includes("học vấn") || combined.includes("utc") || combined.includes("education")) {
      return isVi
        ? [
            "Xếp loại tốt nghiệp và chuyên ngành của Hoan tại UTC?",
            "Xem các bài viết kỹ thuật và case study trên /writing?",
          ]
        : [
            "What was his graduation honor at UTC?",
            "Where can I read his technical notes on /writing?",
          ];
    }

    return isVi
      ? [
          "Các dự án mã nguồn mở Arda & Puchi trên GitHub?",
          "Làm thế nào để tải CV hoặc liên hệ trực tiếp với Hoan?",
        ]
      : [
          "Tell me about Arda & Puchi projects on GitHub.",
          "How can I download his CV or contact him directly?",
        ];
  };

  const handleSearch = async (searchQuery: string) => {
    const q = searchQuery.trim();
    if (!q || loading) return;

    const userMessage: DisplayMessage = {
      id: nextId("user"),
      role: "user",
      content: q,
    };

    const assistantMsgId = nextId("assistant");
    const initialAssistantMessage: DisplayMessage = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      source: "Vercel AI SDK + Groq",
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, initialAssistantMessage]);
    setQuery("");
    setLoading(true);

    const historyPayload = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          history: historyPayload,
          lang: language,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to query AI");
      }

      let fullAnswer = "";

      for await (const chunk of readDataStream(res)) {
        fullAnswer += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content: fullAnswer,
                  isStreaming: true,
                }
              : msg
          )
        );
      }

      const relevantLinks = deriveRelevantLinks(`${q} ${fullAnswer}`);
      const followUps = computeContextualFollowUps(q, fullAnswer);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content: fullAnswer || "Hoan AI đã xử lý yêu cầu của bạn.",
                isStreaming: false,
                relevantLinks: relevantLinks.length > 0 ? relevantLinks : undefined,
                followUps,
              }
            : msg
        )
      );
    } catch (err: unknown) {
      console.error("[Chat UI error]:", err);
      const fallbackContent =
        language === "vi"
          ? `Lê Công Hoan sinh ngày **02/04/2002** (24 tuổi). Là Kỹ sư Full-stack Developer tốt nghiệp loại Giỏi tại **Đại học Giao thông Vận tải (UTC)**, hiện làm việc tại **NGV Group**. Hoan chuyên sâu về **Angular Micro-Frontend**, **Go Microservices** (Arda, Puchi), và hạ tầng **Kubernetes K3s Homelab**.`
          : `Le Cong Hoan was born on **April 2, 2002** (24 years old). He is a Full-stack Developer graduated with Distinction from **UTC**, currently working at **NGV Group**, specializing in **Angular Micro-Frontends**, **Go Microservices** (Arda, Puchi), and **Kubernetes K3s Homelab** infrastructure.`;

      const relevantLinks = deriveRelevantLinks(fallbackContent);
      const followUps = computeContextualFollowUps(q, fallbackContent);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content: fallbackContent,
                isStreaming: false,
                source: "Evidence Grounding Fallback",
                relevantLinks,
                followUps,
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePromptClick = (promptText: string) => {
    handleSearch(promptText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleClearChat = () => {
    setMessages([]);
    setQuery("");
  };

  const handleCopyMessage = (msgId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(msgId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  if (!isOpen) return null;

  const latestAssistantMessage = [...messages].reverse().find((m) => m.role === "assistant");
  const activeFollowUps = latestAssistantMessage?.followUps || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-3xl h-[85vh] max-h-[760px] flex flex-col rounded-3xl bg-zinc-950 border border-zinc-800/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] z-10 overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/80 bg-zinc-900/70 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Hoan AI Assistant</span>
                  <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <Zap className="w-2.5 h-2.5 fill-emerald-400 text-emerald-400" />
                    Tool Calling Engine
                  </span>
                </h3>
                <p className="text-[11px] text-zinc-400 font-mono">
                  {language === "vi"
                    ? "Vercel AI SDK • Groq Llama 3.3 70B • Evidence Grounding"
                    : "Vercel AI SDK • Groq Llama 3.3 70B • Evidence Grounding"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="p-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 transition-colors flex items-center gap-1 text-xs font-mono border border-transparent hover:border-zinc-700"
                  title="Reset conversation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 transition-colors border border-transparent hover:border-zinc-700"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body / Scrollable Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
            {/* Initial Welcome & Category Suggestion Cards */}
            {messages.length === 0 && (
              <div className="space-y-6">
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/20 via-zinc-900/60 to-zinc-950 border border-zinc-800/80">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Evidence-Grounded AI Companion</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                    {language === "vi"
                      ? "👋 Chào bạn! Tôi là trợ lý AI nhúng trực tiếp trong portfolio của Lê Công Hoan. Chatbot hoạt động dựa trên Vercel AI SDK kết hợp hệ thống Custom Tools truy xuất trực tiếp dữ liệu dự án, kiến trúc vi dịch vụ, Kubernetes và năng lực thực chiến."
                      : "👋 Hello! I am the AI assistant embedded in Le Cong Hoan's portfolio. Powered by Vercel AI SDK & custom tool calling to accurately retrieve project architectures, microservices, Kubernetes homelab, and engineering evidence."}
                  </p>
                </div>

                {/* Category Selector Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {CATEGORY_PROMPTS.map((cat, idx) => {
                    const Icon = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
                    const catTitle = language === "vi" ? cat.categoryVi : cat.categoryEn;
                    const isActive = activeCategoryIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveCategoryIdx(idx)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                          isActive
                            ? "bg-emerald-500 text-zinc-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                            : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800/80 hover:bg-zinc-800/60"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{catTitle}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Prompt Cards for the Active Category */}
                <div className="grid grid-cols-1 gap-2.5 pt-1">
                  {(language === "vi"
                    ? CATEGORY_PROMPTS[activeCategoryIdx].promptsVi
                    : CATEGORY_PROMPTS[activeCategoryIdx].promptsEn
                  ).map((prompt, promptIdx) => (
                    <button
                      key={promptIdx}
                      type="button"
                      onClick={() => handlePromptClick(prompt.text)}
                      className="group p-4 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-emerald-500/40 transition-all text-left flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <TechIcon name={prompt.badge} className="w-3 h-3 rounded-[2px] flex-shrink-0" />
                          <span>{prompt.badge}</span>
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-200 group-hover:text-emerald-300 transition-colors">
                          {prompt.text}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation Flow */}
            {messages.map((msg, msgIdx) => {
              const isAssistant = msg.role === "assistant";
              const isLatestAssistant = isAssistant && msgIdx === messages.length - 1;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-3 shadow-lg ${
                      msg.role === "user"
                        ? "bg-emerald-500 text-zinc-950 font-medium rounded-tr-sm"
                        : "bg-zinc-900/90 text-zinc-200 border border-zinc-800/90 rounded-tl-sm"
                    }`}
                  >
                    {/* Message Body with Rich Markdown */}
                    {isAssistant ? (
                      msg.content ? (
                        <ChatMessageRenderer
                          content={msg.content}
                          isStreaming={isLatestAssistant && msg.isStreaming}
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                          <span>Đang truy xuất dữ liệu & suy luận...</span>
                        </div>
                      )
                    ) : (
                      <div className="whitespace-pre-line font-semibold text-zinc-950">
                        {msg.content}
                      </div>
                    )}

                    {/* Direct Navigation Links */}
                    {isAssistant && msg.relevantLinks && msg.relevantLinks.length > 0 && (
                      <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-2">
                        {msg.relevantLinks.map((link, linkIdx) => (
                          <a
                            key={linkIdx}
                            href={link.url}
                            target={link.url.startsWith("http") ? "_blank" : undefined}
                            rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                            onClick={() => !link.url.startsWith("http") && onClose()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all hover:scale-105"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Footer bar for assistant messages */}
                    {isAssistant && msg.content && (
                      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-500">
                        <span>Tool Calling Active</span>
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          className="inline-flex items-center gap-1 text-zinc-400 hover:text-emerald-400 transition-colors p-1 rounded hover:bg-zinc-800"
                          title="Copy message"
                        >
                          {copiedMessageId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 mt-0.5 border border-zinc-700">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Contextual Follow-up Chips */}
            {messages.length > 0 && !loading && activeFollowUps.length > 0 && (
              <div className="pt-2 pl-11 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                  <MessageSquarePlus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === "vi" ? "Gợi ý đào sâu tiếp theo:" : "Suggested deep dive:"}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeFollowUps.slice(0, 3).map((itemText, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePromptClick(itemText)}
                      className="text-xs px-3.5 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-emerald-300 border border-zinc-800 hover:border-emerald-500/40 transition-all flex items-center gap-2 text-left group/chip shadow-sm"
                    >
                      <span>{itemText}</span>
                      <ArrowRight className="w-3 h-3 text-zinc-500 group-hover/chip:text-emerald-400 group-hover/chip:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form */}
          <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/80 shrink-0">
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center rounded-2xl bg-zinc-950 border border-zinc-800 focus-within:border-emerald-500/60 focus-within:ring-1 focus-within:ring-emerald-500/30 px-4 py-3 transition-all shadow-inner"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.ai.placeholder}
                className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none font-mono"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 text-zinc-500 hover:text-zinc-300 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-25 text-zinc-950 font-bold transition-all shrink-0 hover:scale-105 active:scale-95 shadow-md"
                title="Send query"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono mt-2.5 px-2">
              <span>{t.ai.escToClose}</span>
              <span className="hidden sm:inline">Press Enter ↵ to send</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
