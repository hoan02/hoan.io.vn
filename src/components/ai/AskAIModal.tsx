"use client";

import React, { useState, useEffect, useRef } from "react";
import { CATEGORIZED_PROMPTS, PromptItem } from "@/data/aiKnowledgeBase";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { AIServiceResult, ChatMessage } from "@/lib/aiService";
import { X, Sparkles, CornerDownLeft, Bot, ExternalLink, RefreshCw, ArrowRight, User, Trash2, Layers, Cpu, GraduationCap, UserCheck } from "lucide-react";
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
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Handle global shortcuts (Ctrl+K / Cmd+K / Esc)
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
      const assistantMessage: DisplayMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.response.answer,
        source: data.source,
        relevantLinks: data.response.relevantLinks,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      const fallbackMessage: DisplayMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          language === "vi"
            ? "Lê Công Hoan sinh ngày 02/04/2002 (24 tuổi). Là Kỹ sư Full-stack Developer tốt nghiệp loại Giỏi ĐH Giao thông Vận tải, chuyên sâu về Angular Micro-Frontend, Spring Boot, Oracle/PostgreSQL và cụm Kubernetes Homelab."
            : "Le Cong Hoan was born on April 2, 2002 (24 years old). He is a Full-stack Developer graduated with Distinction from UTC, specializing in Angular Micro-Frontends, Spring Boot, Oracle/PostgreSQL, and Kubernetes Homelab.",
        source: "local-semantic",
        relevantLinks: [
          { label: "View Projects", url: "/#selected-work" },
          { label: "Engineering Notes", url: "/writing" },
        ],
      };
      setMessages((prev) => [...prev, fallbackMessage]);
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

  // Follow-up suggestions when chat is active
  const quickFollowUps: PromptItem[] = language === "vi"
    ? [
        { badge: "Dự án EPAS", text: "Dự án EPAS tại NGV Group của Hoan làm những gì?" },
        { badge: "Homelab K8s", text: "Hạ tầng cụm 3-Node Kubernetes Homelab của Hoan ra sao?" },
        { badge: "Học vấn UTC", text: "Học vấn và bằng tốt nghiệp loại Giỏi của Hoan tại UTC?" },
        { badge: "Tuổi & Ngày sinh", text: "Hoan sinh ngày bao nhiêu và có sở thích gì?" },
        { badge: "Tải CV PDF", text: "Làm sao để tải CV hoặc liên hệ trực tiếp với Hoan?" },
      ]
    : [
        { badge: "EPAS Architecture", text: "What is Hoan's main enterprise project (EPAS)?" },
        { badge: "K8s Homelab", text: "Tell me about his 3-Node Kubernetes Homelab cluster." },
        { badge: "UTC Degree", text: "What is his educational background and degree honors?" },
        { badge: "Age & Hobbies", text: "When was Hoan born and what are his hobbies?" },
        { badge: "Download CV", text: "How can I download his CV or contact him directly?" },
      ];

  if (!isOpen) return null;

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
          className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] z-10 overflow-hidden"
        >
          {/* Top Bar / Search Input */}
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center border-b border-zinc-800 px-4 py-3.5 bg-zinc-900/70"
          >
            <Sparkles className="w-5 h-5 text-emerald-400 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.ai.placeholder}
              className="w-full bg-transparent text-sm sm:text-base text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
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
              className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-zinc-950 transition-colors"
              title="Send"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>

          {/* Modal Body / Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar min-h-[280px]">
            {/* Structured Category Suggestions (when no messages yet) */}
            {messages.length === 0 && (
              <div className="space-y-4">
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
                      <div className="space-y-1 min-w-0">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {prompt.badge}
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

            {/* Follow-up Suggestion Chips when in Conversation */}
            {messages.length > 0 && !loading && (
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                  {language === "vi" ? "Gợi ý câu hỏi tiếp theo:" : "Suggested follow-ups:"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickFollowUps.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePromptClick(item.text)}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-emerald-300 border border-zinc-800/80 transition-all flex items-center gap-1"
                    >
                      <span className="text-emerald-400 font-mono text-[10px]">[{item.badge}]</span>
                      <span>{item.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading indicator */}
            {loading && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-xs text-zinc-400 animate-pulse w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>Thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Modal Footer */}
          <div className="px-5 py-3 border-t border-zinc-800/80 bg-zinc-950 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <div className="flex items-center gap-3">
              <span>{t.ai.escToClose}</span>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors"
                  title="Clear conversation"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {t.ai.close}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
