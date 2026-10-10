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

      <ol className="divide-y divide-rule border-y border-rule">
        {jobs.map((job) => {
          const contributions = (vi && job.contributionsVi ? job.contributionsVi : job.contributions).slice(0, 4);
          return (
            <li key={job.id} className="grid gap-3 sm:gap-6 sm:grid-cols-[9rem_1fr] py-8">
              <div className="eyebrow pt-1.5 space-y-1">
                <p>{vi && job.periodVi ? job.periodVi : job.period}</p>
                <p className="normal-case tracking-normal">{vi && job.locationVi ? job.locationVi : job.location}</p>
              </div>
              <div>
                <h3 className="text-2xl">
                  {vi && job.roleVi ? job.roleVi : job.role}
                  <span className="text-muted"> · {job.company}</span>
                </h3>
                <p className="mt-3 text-muted max-w-2xl">{vi && job.summaryVi ? job.summaryVi : job.summary}</p>
                <ul className="mt-4 space-y-2 max-w-2xl list-disc pl-5 marker:text-faint">
                  {contributions.map((c) => (
                    <li key={c}>{c}</li>
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
