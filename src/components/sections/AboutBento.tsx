"use client";

import React from "react";
import { BENTO_STATS } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { TechBadge } from "@/components/common/TechIcon";
import { Terminal, ShieldCheck, Zap, Code2, Layers } from "lucide-react";

export function AboutBento() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Heading */}
      <MotionWrapper>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>{t.about.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              {t.about.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md font-normal leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>
      </MotionWrapper>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Card 1: Core Story / Intro */}
        <MotionWrapper delay={0.1} className="md:col-span-2 lg:col-span-2">
          <div className="h-full rounded-2xl bg-white/90 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/90 hover:border-emerald-500/30 p-6 sm:p-8 flex flex-col justify-between transition-colors shadow-sm">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                {t.about.storyTitle}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.about.storyDesc}
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-900 mt-6 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>{t.about.statusLabel}</span>
              <span>{t.about.coreLabel}</span>
            </div>
          </div>
        </MotionWrapper>

        {/* Card 2: Current Focus */}
        <MotionWrapper delay={0.2} className="md:col-span-1 lg:col-span-2">
          <div className="h-full rounded-2xl bg-gradient-to-br from-white via-zinc-50 to-zinc-100 dark:from-zinc-950 dark:via-zinc-900/50 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800/90 hover:border-emerald-500/30 p-6 sm:p-8 flex flex-col justify-between transition-colors shadow-sm">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span>{t.about.currentFocus}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                {t.about.leadershipTitle}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.about.leadershipDesc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800/80">
              <div className="p-3 rounded-xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <span className="text-zinc-600 dark:text-zinc-400 block text-[11px] font-mono">{t.about.primaryFrontend}</span>
                <div className="flex flex-wrap gap-1.5">
                  <TechBadge name="Angular" size="xs" />
                  <TechBadge name="Next.js" size="xs" />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <span className="text-zinc-600 dark:text-zinc-400 block text-[11px] font-mono">{t.about.primaryBackend}</span>
                <div className="flex flex-wrap gap-1.5">
                  <TechBadge name="Spring Boot" size="xs" />
                  <TechBadge name="Go" size="xs" />
                </div>
              </div>
            </div>
          </div>
        </MotionWrapper>

        {/* Card 3: Metrics */}
        {BENTO_STATS.map((stat, idx) => {
          const statLabel = language === "vi" && stat.labelVi ? stat.labelVi : stat.label;
          const statDesc = language === "vi" && stat.descriptionVi ? stat.descriptionVi : stat.description;

          return (
            <MotionWrapper key={idx} delay={0.3 + idx * 0.05} className="col-span-1">
              <div className="h-full rounded-2xl bg-white/80 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/30 p-5 sm:p-6 flex flex-col justify-between transition-all group shadow-sm">
                <div className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white font-mono group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {stat.value}
                </div>
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-1">
                    {statLabel}
                  </h4>
                  <p className="text-[12px] text-zinc-500 leading-normal">
                    {statDesc}
                  </p>
                </div>
              </div>
            </MotionWrapper>
          );
        })}

        {/* Card 4: Architecture Core Pillars */}
        <MotionWrapper delay={0.5} className="md:col-span-3 lg:col-span-4">
          <div className="rounded-2xl bg-white/90 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/90 p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {t.about.coreTenets}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4" /> {t.about.tenet1Title}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.about.tenet1Desc}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2 font-semibold text-sm">
                  <Zap className="w-4 h-4" /> {t.about.tenet2Title}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.about.tenet2Desc}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2 font-semibold text-sm">
                  <Code2 className="w-4 h-4" /> {t.about.tenet3Title}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.about.tenet3Desc}
                </p>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
