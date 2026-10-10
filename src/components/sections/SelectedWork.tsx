"use client";

import React from "react";
import Link from "next/link";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { Project } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { SectionHeader } from "@/components/common/SectionHeader";

const FEATURED_IDS = [
  "epas-enterprise-process-automation",
  "arda-finops-platform",
  "puchi-language-platform",
];

export function SelectedWork() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const projects = FEATURED_IDS.map((id) => PROJECTS_DATA.find((p) => p.id === id)).filter(
    (p): p is Project => Boolean(p)
  );

  return (
    <section id="work" className="page-wrap py-14">
      <SectionHeader
        label={t.selectedWork.badge}
        title={t.selectedWork.title}
        intro={t.selectedWork.subtitle}
        action={<Link href="/projects" className="link">{t.selectedWork.viewAll} →</Link>}
      />

      <ul className="divide-y divide-rule border-y border-rule">
        {projects.map((p) => (
          <li key={p.id}>
            <Link href={`/projects/${p.id}`} className="group grid gap-2 sm:gap-6 sm:grid-cols-[9rem_1fr] py-7">
              <div className="eyebrow pt-1.5 space-y-1">
                <p>{p.year}</p>
                <p className="normal-case tracking-normal">
                  {language === "vi" && p.roleVi ? p.roleVi : p.role}
                </p>
              </div>
              <div>
                <h3 className="text-2xl group-hover:text-accent transition-colors">
                  {language === "vi" && p.titleVi ? p.titleVi : p.title}
                </h3>
                <p className="mt-2 text-muted max-w-2xl">
                  {language === "vi" && p.subtitleVi ? p.subtitleVi : p.subtitle}
                </p>
                <p className="mt-4 font-mono text-xs text-faint">
                  {p.techStack.slice(0, 7).join(" · ")}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
