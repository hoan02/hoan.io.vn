"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { Sparkles, Command } from "lucide-react";

interface AskAIFloatingButtonProps {
  onClick: () => void;
}

export function AskAIFloatingButton({ onClick }: AskAIFloatingButtonProps) {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClick}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-zinc-950/90 text-white border border-emerald-500/40 shadow-[0_8px_30px_rgba(16,185,129,0.2)] hover:shadow-[0_8px_35px_rgba(16,185,129,0.35)] hover:border-emerald-400 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
        aria-label={t.ai.buttonLabel}
      >
        {/* Glow pulse ring */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 opacity-30 blur group-hover:opacity-60 transition duration-500" />

        <div className="relative flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <span className="text-xs font-semibold tracking-wide text-zinc-100">
            {t.ai.buttonLabel}
          </span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </div>
      </button>
    </div>
  );
}
