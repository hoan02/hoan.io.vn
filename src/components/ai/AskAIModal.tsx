"use client";

import React, { useState, useEffect, useRef } from "react";
import { CATEGORIZED_PROMPTS, PromptItem } from "@/data/aiKnowledgeBase";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { AIServiceResult, ChatMessage } from "@/lib/aiService";
import { TechIcon } from "@/components/common/TechIcon";
import { ChatMessageRenderer } from "@/components/ai/ChatMessageRenderer";
import {
  X,
  Sparkles,
  CornerDownLeft,
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
  Send
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

const CATEGORY_ICONS = [Layers, Cpu, GraduationCap, UserCheck];

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

    if (combined.includes("b4s") || combined.includes("tauri") || combined.includes("bluetooth")) {
      return isVi
        ? [
            "Cơ chế BLE reverse-engineering trên Tauri v2 & Rust của B4S?",
            "Giao diện SolidJS và kiểm soát 10-band EQ hoạt động ra sao?",
          ]
        : [
            "How did Hoan reverse-engineer BLE protocols in Tauri v2 & Rust?",
            "How does the SolidJS UI control the 10-band headphone EQ?",
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

    if (combined.includes("học vấn") || combined.includes("utc") || combined.includes("education") || combined.includes("tốt nghiệp")) {
      return isVi
        ? [
            "Xếp loại tốt nghiệp và đề tài kỹ sư của Hoan tại UTC?",
            "Xem các bài viết kỹ thuật và ghi chép của Hoan?",
          ]
        : [
            "What was his graduation honor and engineering capstone at UTC?",
            "Where can I read his technical notes on /writing?",
          ];
    }

    // Default general follow-ups
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
        isStreaming: true,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      const fallbackContent =
        language === "vi"
          ? "Lê Công Hoan sinh ngày 02/04/2002 (24 tuổi). Là Kỹ sư Full-stack Developer tốt nghiệp loại Giỏi ĐH Giao thông Vận tải (UTC), chuyên sâu về **Angular Micro-Frontend**, **Go Microservices**, **Spring Boot**, và hạ tầng **Kubernetes Homelab**."
          : "Le Cong Hoan was born on April 2, 2002 (24 years old). He is a Full-stack Developer graduated with Distinction from UTC, specializing in **Angular Micro-Frontends**, **Go Microservices**, **Spring Boot**, and **Kubernetes Homelab** infrastructure.";

      const assistantMessage: DisplayMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: fallbackContent,
        source: "local-semantic",
        relevantLinks: [
          { label: "View Projects", url: "/projects" },
          { label: "Engineering Notes", url: "/writing" },
        ],
        followUps: computeContextualFollowUps(q, fallbackContent),
        isStreaming: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
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
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Gemini 2.5 Flash
                  </span>
                </h3>
                <p className="text-[11px] text-zinc-400 font-mono">
                  {language === "vi" ? "Trợ lý Kỹ thuật & Hỏi đáp Thực chiến" : "Technical & Architectural Profile Companion"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="p-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 transition-colors flex items-center gap-1 text-xs font-mono border border-transparent hover:border-zinc-700"
                  title="Clear conversation"
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
            {/* Initial Welcome & Category Suggestion Cards (when no messages yet) */}
            {messages.length === 0 && (
              <div className="space-y-6">
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/20 via-zinc-900/60 to-zinc-950 border border-zinc-800/80">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Interactive Engineering Prompting</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                    {language === "vi"
                      ? "👋 Chào bạn! Tôi là trợ lý AI được nhúng trực tiếp trên portfolio của Lê Công Hoan. Hãy chọn chủ đề gợi ý bên dưới hoặc hỏi bất kỳ câu hỏi kỹ thuật nào về hệ thống vi dịch vụ, micro-frontend, Kubernetes hay kinh nghiệm thực chiến."
                      : "👋 Hello! I am the AI assistant embedded in Le Cong Hoan's portfolio. Select a suggested topic below or ask anything about his distributed systems, micro-frontends, Kubernetes, or career background."}
                  </p>
                </div>

                {/* Category Selector Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {CATEGORIZED_PROMPTS.map((cat, idx) => {
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
                    ? CATEGORIZED_PROMPTS[activeCategoryIdx].promptsVi
                    : CATEGORIZED_PROMPTS[activeCategoryIdx].promptsEn
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
                    {/* Message Body with Rich Markdown & Streaming */}
                    {isAssistant ? (
                      <ChatMessageRenderer
                        content={msg.content}
                        isStreaming={isLatestAssistant && msg.isStreaming}
                      />
                    ) : (
                      <div className="whitespace-pre-line font-semibold text-zinc-950">
                        {msg.content}
                      </div>
                    )}

                    {/* Direct Navigation Links (if assistant) */}
                    {isAssistant && msg.relevantLinks && msg.relevantLinks.length > 0 && (
                      <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-2">
                        {msg.relevantLinks.map((link, linkIdx) => (
                          <a
                            key={linkIdx}
                            href={link.url}
                            onClick={onClose}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all hover:scale-105"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Footer bar for assistant messages (copy & source badge) */}
                    {isAssistant && (
                      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-500">
                        <span>
                          via {msg.source === "gemini" ? "Gemini 2.5 Flash" : msg.source === "openai" ? "OpenAI" : "Context Engine"}
                        </span>
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

            {/* Loading Thinking Indicator */}
            {loading && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 text-xs font-mono text-zinc-300 animate-pulse w-fit ml-11">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Hoan AI is analyzing architecture & drafting response...</span>
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
