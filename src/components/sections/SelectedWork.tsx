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
  "camrelay-p2p-rtsp-bridge",
];

const TILTS = [-2, 1.5, -1, 2];
const TINTS = ["var(--note)", "var(--accent-soft)", "var(--paper-2)", "var(--note)"];

export function SelectedWork() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const vi = language === "vi";

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

      <ul className="grid grid-cols-1 gap-8 pt-2 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p, i) => (
          <li key={p.id}>
            <Link
              href={`/projects/${p.id}`}
              className="note flex h-full flex-col px-5 pb-5 pt-7"
              style={{ transform: `rotate(${TILTS[i % 4]}deg)`, background: TINTS[i % 4] }}
            >
              <span className="hand text-lg">{p.year}</span>
              <span className="mt-1 text-xl font-extrabold leading-tight text-ink">
                {vi && p.titleVi ? p.titleVi : p.title}
              </span>
              <span className="mt-2 text-sm leading-relaxed text-muted">
                {vi && p.subtitleVi ? p.subtitleVi : p.subtitle}
              </span>
              <span className="mt-auto pt-4 font-mono text-[11px] leading-relaxed text-faint">
                {p.techStack.slice(0, 5).join(" · ")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
