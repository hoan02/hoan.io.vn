"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";

interface NavbarProps {
  onOpenAI?: () => void;
}

export function Navbar({ onOpenAI }: NavbarProps) {
  const pathname = usePathname() || "/";
  const { language, setLanguage } = useLanguage();
  const { resolvedTheme, toggleTheme } = useTheme();
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
      if (typeof window !== "undefined" && window.location.hash) {
        window.history.pushState(null, "", window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
          scrolled
            ? "glass-panel bg-white/85 dark:bg-zinc-950/85 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-zinc-200/80 dark:border-white/10"
            : "bg-white/60 dark:bg-zinc-950/50 backdrop-blur-sm border border-zinc-200/60 dark:border-white/5"
        }`}
      >
        {/* Brand / Name */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-zinc-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group cursor-pointer"
        >
          <img
            src={resolvedTheme === "light" ? "/images/logo-light.svg" : "/images/logo-dark.svg"}
            alt="Hoan Logo"
            className="w-6 h-6 object-contain rounded-md transition-transform duration-300 group-hover:scale-110 shadow-[0_0_10px_rgba(16,185,129,0.25)]"
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
                    ? "text-zinc-950 dark:text-white bg-zinc-200/70 dark:bg-white/10 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Actions (Language Switcher + Theme Toggle + Contact) */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Pill */}
          <div className="flex items-center rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-0.5 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded-full transition-all ${
                language === "en"
                  ? "bg-emerald-500 text-white dark:text-zinc-950 font-bold shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
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
                  ? "bg-emerald-500 text-white dark:text-zinc-950 font-bold shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
              title="Chuyển sang Tiếng Việt"
            >
              VI
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark and light mode"
            title={
              resolvedTheme === "dark"
                ? language === "vi"
                  ? "Chuyển sang giao diện sáng"
                  : "Switch to light mode"
                : language === "vi"
                ? "Chuyển sang giao diện tối"
                : "Switch to dark mode"
            }
            className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-200 active:scale-90"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-200" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700 animate-in spin-in-90 duration-200" />
            )}
          </button>

          {/* Quick Contact CTA */}
          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <span>{t.nav.letsTalk}</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-16 left-4 right-4 p-4 rounded-2xl glass-panel bg-white/95 dark:bg-zinc-950/95 border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col gap-3 md:hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Controls Bar: Language & Theme */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">Language:</span>
              <div className="flex items-center rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-2.5 py-1 rounded-full ${
                    language === "en"
                      ? "bg-emerald-500 text-white dark:text-zinc-950 font-bold"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("vi")}
                  className={`px-2.5 py-1 rounded-full ${
                    language === "vi"
                      ? "bg-emerald-500 text-white dark:text-zinc-950 font-bold"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  VI
                </button>
              </div>
            </div>

            {/* Theme Toggle Pill */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300"
            >
              {resolvedTheme === "dark" ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-zinc-700" />
                  <span>Light</span>
                </>
              )}
            </button>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1 w-full py-2.5 text-xs font-semibold rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors"
            >
              {t.nav.letsTalk}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
