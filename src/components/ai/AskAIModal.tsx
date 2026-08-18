"use client";

import React, { useState, useEffect, useRef } from "react";
import { SUGGESTED_PROMPTS_EN, SUGGESTED_PROMPTS_VI } from "@/data/aiKnowledgeBase";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { AIServiceResult } from "@/lib/aiService";
import { X, Sparkles, CornerDownLeft, Bot, ExternalLink, RefreshCw, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AskAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AskAIModal({ isOpen, onClose }: AskAIModalProps) {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const suggestedPrompts = language === "vi" ? SUGGESTED_PROMPTS_VI : SUGGESTED_PROMPTS_EN;

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<AIServiceResult | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Focus on input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

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

  // Streaming typewriter effect
  const typeText = (fullText: string) => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setDisplayedText("");
    setIsTyping(true);

    let index = 0;
    typingTimerRef.current = setInterval(() => {
      if (index < fullText.length) {
        const chunk = fullText.slice(0, index + 3);
        setDisplayedText(chunk);
        index += 3;
      } else {
        setDisplayedText(fullText);
        setIsTyping(false);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      }
    }, 10);
  };

  const handleSearch = async (searchQuery: string) => {
    const q = searchQuery.trim();
    if (!q) return;

    setLoading(true);
    setQuery(q);

    try {
      const res = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, lang: language })
      });

      if (!res.ok) throw new Error("Failed to query AI");

      const data: AIServiceResult = await res.json();
      setCurrentResult(data);
      typeText(data.response.answer);
    } catch (err) {
      console.error(err);
      const fallbackResult: AIServiceResult = {
        response: {
          answer: language === "vi" 
            ? "Lê Công Hoan là Kỹ sư Full-stack Developer với kinh nghiệm chuyên sâu về Angular Micro-Frontend, Next.js, Java Spring Boot, Oracle, PostgreSQL, Docker và Kubernetes."
            : "Le Cong Hoan is a Full-stack Developer with deep expertise in Angular Micro-Frontends, Next.js, Java Spring Boot, Oracle, PostgreSQL, Docker, and Kubernetes.",
          relatedTopic: language === "vi" ? "Thông tin Tổng quan" : "Profile Summary"
        },
        source: "local-semantic"
      };
      setCurrentResult(fallbackResult);
      typeText(fallbackResult.response.answer);
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
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
          <form onSubmit={handleSubmit} className="relative flex items-center border-b border-zinc-800 px-4 py-3.5 bg-zinc-900/50">
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
                onClick={() => {
                  setQuery("");
                  setCurrentResult(null);
                  setDisplayedText("");
                }}
                className="p-1 text-zinc-500 hover:text-zinc-300 mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-zinc-950 transition-colors"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
            {/* Quick Suggestions Chips */}
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

            {/* Answer Display Area */}
            {loading && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-xs text-zinc-400 animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                <span>{t.ai.retrieving} &quot;{query}&quot;...</span>
              </div>
            )}

            {currentResult && !loading && (
              <div className="p-5 rounded-xl bg-zinc-900/70 border border-emerald-500/20 space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-zinc-800/60 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-200">
                      {currentResult.response.relatedTopic || "AI Assistant"}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {currentResult.source === "local-semantic" ? "Local Semantic Engine" : currentResult.source.toUpperCase()}
                  </span>
                </div>

                {/* Streamed Answer Text */}
                <div className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line">
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-1.5 h-4 ml-1 bg-emerald-400 animate-pulse align-middle" />
                  )}
                </div>

                {/* Tags */}
                {currentResult.response.tags && currentResult.response.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {currentResult.response.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800/90 text-zinc-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Direct Links */}
                {currentResult.response.relevantLinks && currentResult.response.relevantLinks.length > 0 && (
                  <div className="pt-3 border-t border-zinc-800/60 flex flex-wrap gap-2">
                    {currentResult.response.relevantLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-5 py-3 border-t border-zinc-800/80 bg-zinc-950 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>{t.ai.escToClose}</span>
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
