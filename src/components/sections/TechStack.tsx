"use client";

import React from "react";
import { TECH_CATEGORIES } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { Sparkles, Server, Terminal, Database, Cloud } from "lucide-react";

export function TechStack() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 1:
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 2:
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 3:
      default:
        return <Cloud className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="tech-stack" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Heading */}
      <MotionWrapper>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">
              <span>{t.techStack.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {t.techStack.title}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            {t.techStack.subtitle}
          </p>
        </div>
      </MotionWrapper>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TECH_CATEGORIES.map((category, catIdx) => {
          const categoryTitle = language === "vi" && category.titleVi ? category.titleVi : category.title;
          const categoryTagline = language === "vi" && category.taglineVi ? category.taglineVi : category.tagline;

          return (
            <MotionWrapper key={catIdx} delay={catIdx * 0.1}>
              <div className="h-full rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-emerald-500/30 p-6 sm:p-8 flex flex-col justify-between transition-colors">
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        {getCategoryIcon(catIdx)}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {categoryTitle}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">
                      {category.items.length} {t.techStack.technologiesCount}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 mb-6 font-normal">
                    {categoryTagline}
                  </p>

                  {/* Items List with Concrete Capabilities */}
                  <div className="space-y-3.5">
                    {category.items.map((item, itemIdx) => {
                      const capabilities = language === "vi" && item.capabilitiesVi ? item.capabilitiesVi : item.capabilities;

                      return (
                        <div
                          key={itemIdx}
                          className="p-3.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/60 hover:border-zinc-700 transition-all flex flex-col gap-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                              {item.name}
                              {item.highlight && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[10px] font-mono font-normal rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                  <Sparkles className="w-2.5 h-2.5" /> {t.techStack.coreTag}
                                </span>
                              )}
                            </span>
                          </div>

                          {/* Capability bullets / tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {capabilities.map((cap, capIdx) => (
                              <span
                                key={capIdx}
                                className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </MotionWrapper>
          );
        })}
      </div>
    </section>
  );
}
