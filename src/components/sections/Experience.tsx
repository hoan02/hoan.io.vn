"use client";

import React from "react";
import { EXPERIENCES_DATA } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { TechBadge } from "@/components/common/TechIcon";
import {
  Calendar,
  MapPin,
  Briefcase,
  Building2,
  CheckCircle2,
  FolderGit2,
} from "lucide-react";

export function Experience() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Heading */}
      <MotionWrapper>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-200 dark:border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">
              <Briefcase className="w-4 h-4" />
              <span>{t.experience.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              {t.experience.title}
            </h2>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md font-normal leading-relaxed">
            {t.experience.subtitle}
          </p>
        </div>
      </MotionWrapper>

      {/* Structured Company & Project Timeline */}
      <div className="space-y-12">
        {EXPERIENCES_DATA.map((exp, index) => {
          const expPeriod = language === "vi" && exp.periodVi ? exp.periodVi : exp.period;
          const expRole = language === "vi" && exp.roleVi ? exp.roleVi : exp.role;
          const expCompany = language === "vi" && exp.companyVi ? exp.companyVi : exp.company;
          const expCompanyDesc = language === "vi" && exp.companyDescriptionVi ? exp.companyDescriptionVi : exp.companyDescription;
          const expLocation = language === "vi" && exp.locationVi ? exp.locationVi : exp.location;
          const expType = language === "vi" && exp.typeVi ? exp.typeVi : exp.type;
          const expSummary = language === "vi" && exp.summaryVi ? exp.summaryVi : exp.summary;
          const isCurrent = expPeriod.toLowerCase().includes("present") || expPeriod.toLowerCase().includes("hiện tại") || expPeriod.includes("Present");

          return (
            <MotionWrapper key={exp.id} delay={index * 0.12}>
              <div className="group relative rounded-3xl bg-white/90 dark:bg-zinc-950/90 border border-zinc-200 dark:border-zinc-800/90 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 p-6 sm:p-8 lg:p-10 transition-all duration-300 shadow-sm hover:shadow-[0_20px_50px_-20px_rgba(16,185,129,0.15)] overflow-hidden space-y-8">
                {/* Ambient background glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Company Header Block */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800/80">
                  <div className="space-y-3">
                    {/* Timeframe & Type pill */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-semibold border ${
                        isCurrent
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.25)]"
                          : "bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800"
                      }`}>
                        {isCurrent && <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />}
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{expPeriod}</span>
                      </span>

                      <span className="px-3 py-1 text-xs font-mono rounded-full bg-zinc-100 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                        {expType}
                      </span>
                    </div>

                    {/* Role and Organization */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors flex items-center gap-3">
                        <Building2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{expRole}</span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-semibold mt-1">
                        <span className="text-emerald-600 dark:text-emerald-400">{expCompany}</span>
                        <span className="text-zinc-400 dark:text-zinc-600">•</span>
                        <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                          {expLocation}
                        </span>
                      </div>
                      {expCompanyDesc && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-500 font-mono mt-1">
                          {expCompanyDesc}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Summary & Global Tech Badges */}
                  <div className="lg:max-w-md space-y-3">
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                      {expSummary}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.techStack.map((tech, idx) => (
                        <TechBadge key={idx} name={tech} size="xs" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sub-Projects & Responsibilities Section */}
                {exp.projects && exp.projects.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                      <FolderGit2 className="w-4 h-4" />
                      <span>{language === "vi" ? "Các Dự án & Trọng tâm Thực hiện" : "Key Projects & Core Deliverables"}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {exp.projects.map((proj, pIdx) => {
                        const projName = language === "vi" && proj.nameVi ? proj.nameVi : proj.name;
                        const projRole = language === "vi" && proj.roleVi ? proj.roleVi : proj.role;
                        const projPeriod = language === "vi" && proj.periodVi ? proj.periodVi : proj.period;
                        const projDesc = language === "vi" && proj.descriptionVi ? proj.descriptionVi : proj.description;
                        const projHighlights = language === "vi" && proj.highlightsVi ? proj.highlightsVi : proj.highlights;

                        return (
                          <div
                            key={pIdx}
                            className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 p-5 sm:p-6 transition-all space-y-4"
                          >
                            {/* Project Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800/60">
                              <div>
                                <h4 className="text-base sm:lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                  <span>{projName}</span>
                                </h4>
                                {projRole && (
                                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                                    {projRole} {projPeriod && `• ${projPeriod}`}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Project Context */}
                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                              {projDesc}
                            </p>

                            {/* Concrete Engineering Highlights */}
                            <div className="space-y-2">
                              {projHighlights.map((hl, hlIdx) => (
                                <div key={hlIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                  <span className="leading-relaxed">{hl}</span>
                                </div>
                              ))}
                            </div>

                            {/* Project specific tech pills */}
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {proj.techStack.map((tech, tIdx) => (
                                <TechBadge key={tIdx} name={tech} size="xs" />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </MotionWrapper>
          );
        })}
      </div>
    </section>
  );
}
