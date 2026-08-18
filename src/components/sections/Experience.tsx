"use client";

import React from "react";
import { EXPERIENCES_DATA } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { TechBadge } from "@/components/common/TechIcon";
import { Calendar, MapPin, ChevronRight } from "lucide-react";

export function Experience() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Heading */}
      <MotionWrapper>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">
              <span>{t.experience.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {t.experience.title}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            {t.experience.subtitle}
          </p>
        </div>
      </MotionWrapper>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-10 border-l border-zinc-800 space-y-12">
        {EXPERIENCES_DATA.map((exp, index) => {
          const expPeriod = language === "vi" && exp.periodVi ? exp.periodVi : exp.period;
          const expRole = language === "vi" && exp.roleVi ? exp.roleVi : exp.role;
          const expCompany = language === "vi" && exp.companyVi ? exp.companyVi : exp.company;
          const expLocation = language === "vi" && exp.locationVi ? exp.locationVi : exp.location;
          const expType = language === "vi" && exp.typeVi ? exp.typeVi : exp.type;
          const expSummary = language === "vi" && exp.summaryVi ? exp.summaryVi : exp.summary;
          const expContributions = language === "vi" && exp.contributionsVi ? exp.contributionsVi : exp.contributions;

          return (
            <MotionWrapper key={exp.id} delay={index * 0.15}>
              <div className="relative group">
                {/* Timeline Node Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-emerald-400 group-hover:bg-emerald-400 group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(16,185,129,0.5)]" />

                {/* Experience Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-emerald-500/30 transition-all">
                  {/* Period & Role Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{expPeriod}</span>
                    </div>
                    <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
                      {expType}
                    </span>
                  </div>

                  {/* Role & Company */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                    {expRole}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400 mb-4">
                    <span className="font-medium text-zinc-200">{expCompany}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <MapPin className="w-3 h-3 text-emerald-400" /> {expLocation}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-zinc-400 mb-5 leading-relaxed">
                    {expSummary}
                  </p>

                  {/* Key Contributions */}
                  <div className="space-y-2.5 mb-6">
                    {expContributions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-900">
                    {exp.techStack.map((tech, idx) => (
                      <TechBadge key={idx} name={tech} size="xs" />
                    ))}
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
