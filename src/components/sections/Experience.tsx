"use client";

import React from "react";
import { EXPERIENCES_DATA } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { SectionHeader } from "@/components/common/SectionHeader";

export function Experience() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const vi = language === "vi";

  const jobs = EXPERIENCES_DATA.filter((e) => e.type !== "Education");

  return (
    <section id="experience" className="page-wrap py-14">
      <SectionHeader label={t.experience.badge} title={t.experience.title} intro={t.experience.subtitle} />

      <ol className="lined margin-rule rounded-sm py-4 shadow-[var(--shadow)]" style={{ transform: "rotate(-0.3deg)" }}>
        {jobs.map((job, i) => {
          const contributions = (vi && job.contributionsVi ? job.contributionsVi : job.contributions).slice(0, 4);
          return (
            <li key={job.id} className={`grid gap-3 py-6 pl-14 pr-5 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:pr-8 ${i > 0 ? "border-t-2 border-dashed border-rule" : ""}`}>
              <div className="space-y-0.5">
                <p className="hand text-lg">{vi && job.periodVi ? job.periodVi : job.period}</p>
                <p className="text-sm text-faint">{vi && job.locationVi ? job.locationVi : job.location}</p>
              </div>
              <div>
                <h3 className="text-2xl">
                  {vi && job.roleVi ? job.roleVi : job.role}
                  <span className="font-semibold text-muted"> · <span className="mark">{job.company}</span></span>
                </h3>
                <p className="mt-3 max-w-2xl text-muted">{vi && job.summaryVi ? job.summaryVi : job.summary}</p>
                <ul className="mt-4 max-w-2xl space-y-2">
                  {contributions.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span aria-hidden="true" className="hand text-lg text-accent">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-mono text-xs text-faint">{job.techStack.join(" · ")}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
