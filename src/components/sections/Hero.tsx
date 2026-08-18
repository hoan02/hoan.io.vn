"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/common/Icons";
import { TechBadge } from "@/components/common/TechIcon";
import { ArrowDown, Mail, MapPin, FileText, Check, Sparkles } from "lucide-react";

interface HeroProps {
  onOpenAI: () => void;
}

export function Hero({ onOpenAI }: HeroProps) {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [copied, setCopied] = useState(false);

  const handleDownloadCV = async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#10b981", "#34d399", "#ffffff"]
      });
    } catch {
      // ignore
    }
    window.open(PERSONAL_INFO.cvUrl, "_blank");
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Availability Status Badge */}
      <MotionWrapper delay={0.1}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-300 mb-6 backdrop-blur-sm shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{language === "vi" ? PERSONAL_INFO.statusVi : PERSONAL_INFO.status}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" /> {t.hero.location}
          </span>
        </div>
      </MotionWrapper>

      {/* Main Name & Title */}
      <MotionWrapper delay={0.2}>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4 leading-[1.05]">
          {language === "vi" ? PERSONAL_INFO.nameVi : PERSONAL_INFO.name}
        </h1>
      </MotionWrapper>

      <MotionWrapper delay={0.3}>
        <div className="flex flex-wrap items-center gap-3 text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-400 mb-4">
          <span className="text-zinc-100">{t.hero.title}</span>
        </div>
      </MotionWrapper>

      {/* Core Tech Stack Badges with Authentic Logos */}
      <MotionWrapper delay={0.35}>
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <TechBadge name="Angular" size="sm" />
          <TechBadge name="Next.js" size="sm" />
          <TechBadge name="Java" size="sm" />
          <TechBadge name="Spring Boot" size="sm" />
          <TechBadge name="Go" size="sm" />
          <TechBadge name="Rust" size="sm" />
          <TechBadge name="PostgreSQL" size="sm" />
          <TechBadge name="Kubernetes" size="sm" />
        </div>
      </MotionWrapper>

      {/* Bio / Summary Paragraph */}
      <MotionWrapper delay={0.4}>
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed mb-10 font-normal">
          {language === "vi" ? PERSONAL_INFO.bioVi : PERSONAL_INFO.bio}
        </p>
      </MotionWrapper>

      {/* CTAs and Direct Links */}
      <MotionWrapper delay={0.5}>
        <div className="flex flex-wrap items-center gap-4 mb-12">
          {/* Primary CTA: View my work */}
          <Link
            href="#selected-work"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all duration-200 shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] active:scale-95"
          >
            <span>{t.hero.viewWork}</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </Link>

          {/* Secondary CTA: Download CV */}
          <button
            onClick={handleDownloadCV}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 font-medium text-sm border border-zinc-800 hover:border-zinc-700 transition-all active:scale-95 shadow-sm"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>{t.hero.downloadCv}</span>
          </button>

          {/* Quick AI query trigger chip */}
          <button
            onClick={onOpenAI}
            className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-zinc-950/60 hover:bg-emerald-500/10 text-zinc-400 hover:text-emerald-300 font-mono text-xs border border-zinc-800/80 hover:border-emerald-500/30 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{t.hero.askAiStack}</span>
          </button>
        </div>
      </MotionWrapper>

      {/* Social & Contact Strip */}
      <MotionWrapper delay={0.6}>
        <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-zinc-900 text-xs font-mono text-zinc-500">
          <span className="uppercase tracking-widest text-zinc-600">{t.hero.connect}</span>
          
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors link-hover-effect"
          >
            <GithubIcon className="w-4 h-4" />
            <span>github.com/hoan02</span>
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors link-hover-effect"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>linkedin.com/in/hoan02</span>
          </a>

          <a
            href={PERSONAL_INFO.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors link-hover-effect"
          >
            <FacebookIcon className="w-4 h-4 text-blue-400" />
            <span>facebook.com/hoanit02</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-emerald-400 transition-colors link-hover-effect"
          >
            <Mail className="w-4 h-4" />
            <span>{PERSONAL_INFO.email}</span>
            {copied ? (
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1 rounded flex items-center gap-0.5">
                <Check className="w-2.5 h-2.5" /> {t.hero.copied}
              </span>
            ) : (
              <span className="text-[10px] text-zinc-600">{t.hero.clickToCopy}</span>
            )}
          </button>
        </div>
      </MotionWrapper>
    </section>
  );
}
