"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import {
  Home,
  Layers,
  Briefcase,
  BookOpen,
  Sparkles
} from "lucide-react";

interface MobileTabBarProps {
  onOpenAI: () => void;
}

export function MobileTabBar({ onOpenAI }: MobileTabBarProps) {
  const pathname = usePathname() || "/";
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [activeSection, setActiveSection] = useState("");

  const isHome = pathname === "/";

  // Active section spy on Home page
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const sections = ["selected-work", "experience", "tech-stack", "writing", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const tabs = [
    {
      id: "home",
      label: language === "vi" ? "Trang chủ" : "Home",
      icon: Home,
      href: "/",
      onClick: handleHomeClick,
      isActive: isHome && !activeSection,
    },
    {
      id: "projects",
      label: language === "vi" ? "Dự án" : "Projects",
      icon: Layers,
      href: "/projects",
      isActive: pathname.startsWith("/projects") || (isHome && activeSection === "selected-work"),
    },
    {
      id: "experience",
      label: language === "vi" ? "Kinh nghiệm" : "Career",
      icon: Briefcase,
      href: isHome ? "/#experience" : "/#experience",
      isActive: isHome && activeSection === "experience",
    },
    {
      id: "writing",
      label: language === "vi" ? "Bài viết" : "Writing",
      icon: BookOpen,
      href: "/writing",
      isActive: pathname.startsWith("/writing") || (isHome && activeSection === "writing"),
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-3 left-3 right-3 z-40 md:hidden flex justify-center pointer-events-none pb-[env(safe-area-inset-bottom)]"
    >
      <div className="pointer-events-auto w-full max-w-sm flex items-center justify-around px-2.5 py-1.5 rounded-full bg-zinc-950/85 backdrop-blur-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.85)] ring-1 ring-white/5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              onClick={tab.onClick}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 active:scale-90 ${
                tab.isActive
                  ? "text-emerald-400 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tab.isActive && (
                <span className="absolute -top-1 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
              )}
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </Link>
          );
        })}

        {/* Ask AI Tab Item with Special Glow */}
        <button
          type="button"
          onClick={onOpenAI}
          className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl text-emerald-400 hover:text-emerald-300 transition-all duration-200 active:scale-90"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)] mb-0.5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight text-emerald-400">Ask AI</span>
        </button>
      </div>
    </nav>
  );
}
