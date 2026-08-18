"use client";

import React, { useState, useEffect, useRef } from "react";
import { CATEGORIZED_PROMPTS, PromptItem } from "@/data/aiKnowledgeBase";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { AIServiceResult, ChatMessage } from "@/lib/aiService";
import { TechIcon } from "@/components/common/TechIcon";
import { X, Sparkles, CornerDownLeft, Bot, ExternalLink, RefreshCw, ArrowRight, User, Trash2, Layers, Cpu, GraduationCap, UserCheck, MessageSquarePlus } from "lucide-react";
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
}

const CATEGORY_ICONS = [Layers, Cpu, GraduationCap, UserCheck];

export function AskAIModal({ isOpen, onClose }: AskAIModalProps) {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
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

  // Compute 1-3 contextual follow-up questions based on the last message/answer
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

    if (combined.includes("epas") || combined.includes("ngv") || combined.includes("crm") || combined.includes("bpm")) {
      return isVi
        ? [
            "Kiến trúc Angular Micro-Frontend trong EPAS?",
            "Cách EPAS tích hợp Kafka & Spring Boot?",
          ]
        : [
            "How is Angular Micro-Frontend structured in EPAS?",
            "How does EPAS integrate Kafka & Spring Boot?",
          ];
    }

    if (combined.includes("k3s") || combined.includes("homelab") || combined.includes("longhorn") || combined.includes("jenkins") || combined.includes("k8s")) {
      return isVi
        ? [
            "Cấu hình phân tán Longhorn storage trong K3s?",
            "Pipeline CI/CD Jenkins tự động triển khai lên K8s?",
          ]
        : [
            "How is Longhorn distributed storage configured on K3s?",
            "How does the Jenkins CI/CD pipeline deploy to K8s?",
          ];
    }

    if (combined.includes("tuổi") || combined.includes("sinh") || combined.includes("2002") || combined.includes("age") || combined.includes("born") || combined.includes("hobb") || combined.includes("thích")) {
      return isVi
        ? [
            "Học vấn và bằng tốt nghiệp loại Giỏi của Hoan tại UTC?",
            "Dự án tiêu biểu nhất Hoan từng phát triển?",
          ]
        : [
            "Tell me about Hoan's UTC degree with Distinction.",
            "What is Hoan's flagship engineering project?",
          ];
    }

    if (combined.includes("utc") || combined.includes("học vấn") || combined.includes("education") || combined.includes("degree")) {
      return isVi
        ? [
            "Bài viết đúc kết chặng đường tốt nghiệp UTC trên /writing?",
            "Kinh nghiệm làm việc tại NGV Group & MochiMochi?",
          ]
        : [
            "Read his reflection note on graduating from UTC.",
            "Tell me about his work at NGV Group & MochiMochi.",
          ];
    }

    // Default 2 sharp follow-ups
    return isVi
      ? [
          "Dự án Arda & Puchi trên GitHub của Hoan?",
          "Làm sao để tải CV hoặc liên hệ trực tiếp với Hoan?",
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
      id: `user-${Date.now()}`,
      role: "user",
      content: q,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    const historyPayload: ChatMessage[] = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          lang: language,
          history: historyPayload,
        }),
      });

      if (!res.ok) throw new Error("Failed to query AI");

      const data: AIServiceResult = await res.json();
      const followUps = computeContextualFollowUps(q, data.response.answer);

      const assistantMessage: DisplayMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.response.answer,
        source: data.source,
        relevantLinks: data.response.relevantLinks,
        followUps,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      const fallbackContent =
        language === "vi"
          ? "Lê Công Hoan sinh ngày 02/04/2002 (24 tuổi). Là Kỹ sư Full-stack Developer tốt nghiệp loại Giỏi ĐH Giao thông Vận tải, chuyên sâu về Angular Micro-Frontend, Go Microservices, Spring Boot, và cụm Kubernetes Homelab."
          : "Le Cong Hoan was born on April 2, 2002 (24 years old). He is a Full-stack Developer graduated with Distinction from UTC, specializing in Angular Micro-Frontends, Go Microservices, Spring Boot, and Kubernetes Homelab.";

      const assistantMessage: DisplayMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: fallbackContent,
        source: "local-semantic",
        relevantLinks: [
          { label: "View Projects", url: "/#selected-work" },
          { label: "Engineering Notes", url: "/writing" },
        ],
        followUps: computeContextualFollowUps(q, fallbackContent),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    handleSearch(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleClearChat = () => {
    setMessages([]);
    setQuery("");
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
          className="relative w-full max-w-2xl h-[85vh] max-h-[720px] flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] z-10 overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/60 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                  <span>Hoan AI</span>
                  <span className="text-[10px] font-mono font-normal text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    Gemini 2.5 Flash
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 transition-colors flex items-center gap-1 text-xs font-mono"
                  title="Clear conversation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 transition-colors"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body / Scrollable Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar">
            {/* Initial Welcome & Category Suggestion Cards (when no messages yet) */}
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {language === "vi"
                      ? "👋 Chào bạn! Tôi là trợ lý AI được tích hợp trực tiếp trên portfolio của Lê Công Hoan. Hãy hỏi tôi bất kỳ điều gì về dự án, năng lực công nghệ, học vấn hay thông tin liên hệ."
                      : "👋 Hello! I am Hoan AI assistant embedded in Le Cong Hoan's portfolio. Ask me anything about his projects, tech stack, education, or contact info."}
                  </p>
                </div>

                {/* Category Selector Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {CATEGORIZED_PROMPTS.map((cat, idx) => {
                    const Icon = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
                    const catTitle = language === "vi" ? cat.categoryVi : cat.categoryEn;
                    const isActive = activeCategoryIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveCategoryIdx(idx)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                          isActive
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 hover:bg-zinc-800/60"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{catTitle}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Prompt Cards for the Active Category */}
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {(language === "vi"
                    ? CATEGORIZED_PROMPTS[activeCategoryIdx].promptsVi
                    : CATEGORIZED_PROMPTS[activeCategoryIdx].promptsEn
                  ).map((prompt, promptIdx) => (
                    <button
                      key={promptIdx}
                      type="button"
                      onClick={() => handlePromptClick(prompt.text)}
                      className="group p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-emerald-500/40 transition-all text-left flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <TechIcon name={prompt.badge} className="w-3 h-3 rounded-[2px] flex-shrink-0" />
                          <span>{prompt.badge}</span>
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-200 group-hover:text-emerald-300 transition-colors truncate">
                          {prompt.text}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation Flow */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-3 ${
                    msg.role === "user"
                      ? "bg-emerald-500 text-zinc-950 font-medium rounded-tr-sm"
                      : "bg-zinc-900/80 text-zinc-200 border border-zinc-800 rounded-tl-sm"
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.content}</div>

                  {/* Direct Navigation Links */}
                  {msg.relevantLinks && msg.relevantLinks.length > 0 && (
                    <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap gap-2">
                      {msg.relevantLinks.map((link, linkIdx) => (
                        <a
                          key={linkIdx}
                          href={link.url}
                          onClick={onClose}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}

                  {msg.source && (
                    <div className="text-[10px] font-mono text-zinc-500 pt-1">
                      via {msg.source === "gemini" ? "Gemini 2.5 Flash" : msg.source === "openai" ? "OpenAI" : "Local Engine"}
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Contextual Follow-up Chips (1-3 questions maximum, strictly topic-relevant) */}
            {messages.length > 0 && !loading && activeFollowUps.length > 0 && (
              <div className="pt-2 pl-10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  <MessageSquarePlus className="w-3 h-3 text-emerald-400" />
                  <span>{language === "vi" ? "Câu hỏi liên quan gợi ý:" : "Related questions:"}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeFollowUps.slice(0, 3).map((itemText, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePromptClick(itemText)}
                      className="text-[11px] px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-emerald-300 border border-zinc-800 hover:border-emerald-500/30 transition-all flex items-center gap-1.5 text-left"
                    >
                      <span>{itemText}</span>
                      <ArrowRight className="w-3 h-3 text-zinc-500 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading indicator */}
            {loading && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-xs text-zinc-400 animate-pulse w-fit ml-10">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>Thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form (Conversational Bottom Bar) */}
          <div className="p-3 sm:p-4 border-t border-zinc-800/80 bg-zinc-900/70 shrink-0">
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center rounded-xl bg-zinc-950 border border-zinc-800 focus-within:border-emerald-500/60 px-3.5 py-2.5 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 mr-2.5 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.ai.placeholder}
                className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 text-zinc-500 hover:text-zinc-300 mr-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-zinc-950 transition-colors shrink-0"
                title="Send"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono mt-2 px-1">
              <span>{t.ai.escToClose}</span>
              <span>Enter ↵ to send</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
