"use client";

import React from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useAskAI } from "@/components/layout/SiteShell";

interface NavbarProps {
  /** Deprecated: the shell provides this. Kept so older pages still compile. */
  onOpenAI?: () => void;
}

export function Navbar({ onOpenAI }: NavbarProps) {
  const { language, setLanguage } = useLanguage();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { openAI } = useAskAI();
  const t = UI_TRANSLATIONS[language];

  const links = [
    { label: t.nav.work, href: "/projects" },
    { label: t.nav.experience, href: "/#experience" },
    { label: t.nav.writing, href: "/writing" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  return (
    <header className="border-b border-rule bg-paper sticky top-0 z-30">
      <div className="page-wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3.5">
        <Link href="/" className="font-serif text-lg tracking-tight text-ink">
          {language === "vi" ? PERSONAL_INFO.nameVi : PERSONAL_INFO.name}
        </Link>

        <nav aria-label="Primary" className="order-3 w-full sm:order-none sm:w-auto">
          <ul className="flex items-center gap-5 text-sm text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <button
            type="button"
            onClick={onOpenAI ?? openAI}
            className="text-muted hover:text-accent transition-colors"
          >
            {t.nav.askAi}
          </button>

          <div className="flex items-center gap-1 font-mono text-xs text-faint" role="group" aria-label="Language">
            {(["en", "vi"] as const).map((code, i) => (
              <React.Fragment key={code}>
                {i > 0 && <span aria-hidden>/</span>}
                <button
                  type="button"
                  onClick={() => setLanguage(code)}
                  aria-pressed={language === code}
                  className={language === code ? "text-ink" : "hover:text-ink transition-colors"}
                >
                  {code.toUpperCase()}
                </button>
              </React.Fragment>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="text-muted hover:text-ink transition-colors"
          >
            {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
