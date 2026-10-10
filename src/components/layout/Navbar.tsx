"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { useAskAI } from "@/components/layout/SiteShell";

interface NavbarProps {
  /** Deprecated: the shell provides this. Kept so older pages still compile. */
  onOpenAI?: () => void;
}

export function Navbar({ onOpenAI }: NavbarProps) {
  const { language, setLanguage } = useLanguage();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { openAI } = useAskAI();
  const pathname = usePathname();
  const t = UI_TRANSLATIONS[language];

  const links = [
    { label: t.nav.work, href: "/projects" },
    { label: t.nav.experience, href: "/#experience" },
    { label: t.nav.writing, href: "/writing" },
    { label: t.nav.contact, href: "/#contact" },
  ];
  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-30 border-b-2 border-dashed border-rule bg-paper/95 backdrop-blur-sm">
      <div className="page-wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <Link href="/" className="font-hand text-[1.75rem] leading-none text-ink">
          hoan&apos;s notebook
        </Link>

        <nav aria-label="Primary" className="order-3 w-full sm:order-none sm:w-auto">
          <ul className="flex items-center gap-5 text-[15px] font-medium text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={isActive(l.href) ? "mark text-ink" : "transition-colors hover:text-ink"}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <button type="button" onClick={onOpenAI ?? openAI} className="btn btn-marker hand min-h-10 px-4 text-lg">
            {t.nav.askAi} ✎
          </button>

          <div className="hand flex items-center gap-1 text-lg text-faint" role="group" aria-label="Language">
            {(["en", "vi"] as const).map((code, i) => (
              <React.Fragment key={code}>
                {i > 0 && <span aria-hidden>/</span>}
                <button
                  type="button"
                  onClick={() => setLanguage(code)}
                  aria-pressed={language === code}
                  className={language === code ? "text-ink underline decoration-marker decoration-4 underline-offset-2" : "transition-colors hover:text-ink"}
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
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
          >
            {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
