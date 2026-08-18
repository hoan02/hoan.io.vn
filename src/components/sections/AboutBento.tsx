"use client";

import React from "react";
import { BENTO_STATS } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { Terminal, ShieldCheck, Zap, Code2, Layers } from "lucide-react";

export function AboutBento() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Heading */}
      <MotionWrapper>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">
              <span>{t.about.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {t.about.title}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            {t.about.subtitle}
          </p>
        </div>
      </MotionWrapper>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Card 1: Core Story / Intro */}
        <MotionWrapper delay={0.1} className="md:col-span-2 lg:col-span-2">
          <div className="h-full rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-emerald-500/30 p-6 sm:p-8 flex flex-col justify-between transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {t.about.storyTitle}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {t.about.storyDesc}
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-900 mt-6 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>{t.about.statusLabel}</span>
              <span>{t.about.coreLabel}</span>
            </div>
          </div>
        </MotionWrapper>

        {/* Card 2: Current Focus */}
        <MotionWrapper delay={0.2} className="md:col-span-1 lg:col-span-2">
          <div className="h-full rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900/50 to-zinc-950 border border-zinc-800/90 hover:border-emerald-500/30 p-6 sm:p-8 flex flex-col justify-between transition-colors">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t.about.currentFocus}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {t.about.leadershipTitle}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {t.about.leadershipDesc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-4 mt-4 border-t border-zinc-800/80">
              <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800 text-xs">
                <span className="text-zinc-400 block text-[11px]">{t.about.primaryFrontend}</span>
                <span className="text-emerald-400 font-semibold">Angular & Next.js</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800 text-xs">
                <span className="text-zinc-400 block text-[11px]">{t.about.primaryBackend}</span>
                <span className="text-emerald-400 font-semibold">Spring Boot & Go</span>
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
              <div className="h-full rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-emerald-500/30 p-5 sm:p-6 flex flex-col justify-between transition-all group">
                <div className="text-xl sm:text-2xl font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
                  {stat.value}
                </div>
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-1">
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
          <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800/90 p-6 sm:p-8">
            <h3 className="text-base font-semibold text-zinc-200 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> {t.about.coreTenets}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                <div className="flex items-center gap-2 text-emerald-400 mb-2 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4" /> {t.about.tenet1Title}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.about.tenet1Desc}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                <div className="flex items-center gap-2 text-emerald-400 mb-2 font-semibold text-sm">
                  <Zap className="w-4 h-4" /> {t.about.tenet2Title}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.about.tenet2Desc}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                <div className="flex items-center gap-2 text-emerald-400 mb-2 font-semibold text-sm">
                  <Code2 className="w-4 h-4" /> {t.about.tenet3Title}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
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
