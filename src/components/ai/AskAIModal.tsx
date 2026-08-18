"use client";

import React, { useState, useEffect, useRef } from "react";
import { SUGGESTED_PROMPTS_EN, SUGGESTED_PROMPTS_VI } from "@/data/aiKnowledgeBase";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { AIServiceResult, ChatMessage } from "@/lib/aiService";
import { X, Sparkles, CornerDownLeft, Bot, ExternalLink, RefreshCw, ArrowRight, User, Trash2 } from "lucide-react";
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

export function AskAIModal({ isOpen, onClose }: AskAIModalProps) {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const suggestedPrompts = language === "vi" ? SUGGESTED_PROMPTS_VI : SUGGESTED_PROMPTS_EN;

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

    // Build history payload
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
            ? "Lê Công Hoan là Kỹ sư Full-stack Developer với kinh nghiệm chuyên sâu về Angular Micro-Frontend, Next.js, Java Spring Boot, Oracle, PostgreSQL, Docker, Kubernetes và hạ tầng Homelab."
            : "Le Cong Hoan is a Full-stack Developer with practical experience in Angular Micro-Frontends, Next.js, Java Spring Boot, Oracle, PostgreSQL, Docker, Kubernetes, and Homelab infrastructure.",
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
          className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] z-10 overflow-hidden"
        >
          {/* Top Bar / Search Input */}
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center border-b border-zinc-800 px-4 py-3.5 bg-zinc-900/60"
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
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar min-h-[260px]">
            {/* Quick Suggestions Chips (when no messages yet) */}
            {messages.length === 0 && (
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2.5">
                  {t.ai.suggestedTitle}
                </span>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePromptClick(prompt)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-emerald-300 border border-zinc-800/80 transition-all text-left flex items-center gap-1.5"
                    >
                      <span>{prompt}</span>
                      <ArrowRight className="w-3 h-3 text-zinc-500" />
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

                  {/* Direct Navigation Links for Assistant responses */}
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
