"use client";

import React, { useState, useMemo } from "react";
import { TECH_CATEGORIES } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { TechIcon, TechBadge } from "@/components/common/TechIcon";
import {
  Sparkles,
  Server,
  Terminal,
  Database,
  Cloud,
  CheckCircle2,
  Cpu,
} from "lucide-react";

export function TechStack() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(1);

  const categories = [
    { title: language === "vi" ? "Frontend & MFE" : "Frontend & MFE", icon: Terminal },
    { title: language === "vi" ? "Backend Microservices" : "Backend & Services", icon: Server },
    { title: language === "vi" ? "Cơ sở Dữ liệu" : "Databases & Cache", icon: Database },
    { title: language === "vi" ? "DevOps & Cloud" : "DevOps & Cloud", icon: Cloud },
    { title: language === "vi" ? "Tất cả" : "All Domains", icon: Sparkles },
  ];

  const displayedCategories = useMemo(() => {
    if (activeCategoryIdx === 4) {
      return TECH_CATEGORIES;
    }
    return [TECH_CATEGORIES[activeCategoryIdx]];
  }, [activeCategoryIdx]);

  return (
    <section id="tech-stack" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Heading */}
      <MotionWrapper>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>{t.techStack.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              {t.techStack.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md font-normal leading-relaxed">
            {t.techStack.subtitle}
          </p>
        </div>
      </MotionWrapper>

      {/* Category Filter Pills */}
      <MotionWrapper delay={0.05}>
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isActive = activeCategoryIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveCategoryIdx(idx)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-emerald-500 text-zinc-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    : "bg-white dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-sm"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </MotionWrapper>

      {/* Categories & Technology Cards Grid */}
      <div className="space-y-12">
        {displayedCategories.map((category, catIdx) => {
          const categoryTitle = language === "vi" && category.titleVi ? category.titleVi : category.title;
          const categoryTagline = language === "vi" && category.taglineVi ? category.taglineVi : category.tagline;

          return (
            <MotionWrapper key={catIdx} delay={catIdx * 0.1}>
              <div className="rounded-3xl bg-white/90 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/90 p-6 sm:p-8 lg:p-10 shadow-sm dark:shadow-xl space-y-6">
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-200 dark:border-zinc-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      {catIdx === 0 ? <Terminal className="w-5 h-5" /> : catIdx === 1 ? <Server className="w-5 h-5" /> : catIdx === 2 ? <Database className="w-5 h-5" /> : <Cloud className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        {categoryTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-normal">
                        {categoryTagline}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
                    {category.items.length} {t.techStack.technologiesCount}
                  </span>
                </div>

                {/* Grid of Tech Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {category.items.map((item, itemIdx) => {
                    const capabilities = language === "vi" && item.capabilitiesVi ? item.capabilitiesVi : item.capabilities;

                    return (
                      <div
                        key={itemIdx}
                        className="group relative rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100/80 dark:hover:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/40 p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.15)] flex flex-col justify-between"
                      >
                        <div>
                          {/* Card Header: Icon + Name + Core badge */}
                          <div className="flex items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <TechIcon name={item.name} className="w-7 h-7 rounded-md p-0.5 bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 shadow-sm" />
                              <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                                {item.name}
                              </h4>
                            </div>

                            {item.highlight && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>{t.techStack.coreTag}</span>
                              </span>
                            )}
                          </div>

                          {/* Concrete Capability Checkpoints */}
                          <div className="space-y-2 mb-4">
                            {capabilities.map((cap, capIdx) => (
                              <div key={capIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                <span>{cap}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Tagline Indicator */}
                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                          <span>Production Proven</span>
                          <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">✓</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </MotionWrapper>
          );
        })}
      </div>
    </section>
  );
}
