"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/common/Icons";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-zinc-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left side */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5 text-zinc-300 font-semibold">
            <img
              src="/images/logo-dark.svg"
              alt="Hoan Logo"
              className="w-5 h-5 object-contain rounded"
            />
            <span>{language === "vi" ? PERSONAL_INFO.nameVi : PERSONAL_INFO.name}</span>
          </div>
          <span className="hidden sm:inline text-zinc-700">/</span>
          <span>{t.footer.role}</span>
          <span className="hidden sm:inline text-zinc-700">/</span>
          <span>{t.footer.location}</span>
        </div>

        {/* Center: Status indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t.footer.engineStatus}</span>
        </div>

        {/* Right side: Back to top */}
        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-blue-400 transition-colors"
            title="Facebook"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-zinc-400 hover:text-emerald-400 transition-colors ml-2"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-600">
        <p>© {new Date().getFullYear()} {language === "vi" ? PERSONAL_INFO.nameVi : PERSONAL_INFO.name}. {t.footer.rights}</p>
        <p>{t.footer.builtWith}</p>
      </div>
    </footer>
  );
}
