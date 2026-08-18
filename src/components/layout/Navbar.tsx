"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { Sparkles, Command, Menu, X, ArrowUpRight, Globe } from "lucide-react";

interface NavbarProps {
  onOpenAI: () => void;
}

export function Navbar({ onOpenAI }: NavbarProps) {
  const pathname = usePathname() || "/";
  const { language, setLanguage, toggleLanguage } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";

  const navLinks = [
    { label: t.nav.work, href: isHome ? "/#selected-work" : "/projects", route: "/projects", sectionId: "selected-work" },
    { label: t.nav.experience, href: isHome ? "/#experience" : "/#experience", route: "/#experience", sectionId: "experience" },
    { label: t.nav.writing, href: "/writing", route: "/writing", sectionId: "writing" },
    { label: t.nav.contact, href: isHome ? "/#contact" : "/#contact", route: "/#contact", sectionId: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (isHome) {
        const sections = ["selected-work", "experience", "tech-stack", "writing", "contact"];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [language, isHome]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
          scrolled
            ? "glass-panel bg-zinc-950/85 shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/10"
            : "bg-zinc-950/50 backdrop-blur-sm border border-white/5"
        }`}
      >
        {/* Brand / Name */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white hover:text-emerald-400 transition-colors group cursor-pointer"
        >
          <img
            src="/images/logo-dark.svg"
            alt="Hoan Logo"
            className="w-6 h-6 object-contain rounded-md transition-transform duration-300 group-hover:scale-110 shadow-[0_0_10px_rgba(35,207,46,0.3)]"
          />
          <span>{language === "vi" ? PERSONAL_INFO.nameVi : PERSONAL_INFO.name}</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = isHome
              ? activeSection === link.sectionId
              : pathname.startsWith(link.route);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                  isActive
                    ? "text-white bg-white/10 font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Actions (Language Switcher + Ask AI + Contact) */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Pill */}
          <div className="flex items-center rounded-full bg-zinc-900 border border-zinc-800 p-0.5 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded-full transition-all ${
                language === "en"
                  ? "bg-emerald-500 text-zinc-950 font-bold shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("vi")}
              className={`px-2 py-1 rounded-full transition-all ${
                language === "vi"
                  ? "bg-emerald-500 text-zinc-950 font-bold shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Chuyển sang Tiếng Việt"
            >
              VI
            </button>
          </div>

          {/* Ask AI Command Button */}
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all hover:scale-105 active:scale-95"
            title="Ask AI Assistant (Ctrl+K)"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.nav.askAi}</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono rounded bg-zinc-900 text-zinc-400 border border-zinc-700">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>

          {/* Quick Contact CTA */}
          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
          >
            <span>{t.nav.letsTalk}</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-16 left-4 right-4 p-4 rounded-2xl glass-panel bg-zinc-950/95 border border-zinc-800 shadow-2xl flex flex-col gap-2 md:hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800 px-2">
            <span className="text-xs text-zinc-400 font-mono">Language:</span>
            <div className="flex items-center rounded-full bg-zinc-900 border border-zinc-800 p-0.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-full ${language === "en" ? "bg-emerald-500 text-zinc-950 font-bold" : "text-zinc-400"}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("vi")}
                className={`px-2.5 py-1 rounded-full ${language === "vi" ? "bg-emerald-500 text-zinc-950 font-bold" : "text-zinc-400"}`}
              >
                VI
              </button>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAI();
              }}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t.nav.askAi}
            </button>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1 w-full py-2 text-xs font-semibold rounded-lg bg-white text-zinc-950"
            >
              {t.nav.letsTalk}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
