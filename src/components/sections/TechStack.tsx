"use client";

import React from "react";
import { TECH_CATEGORIES } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { SectionHeader } from "@/components/common/SectionHeader";

export function TechStack() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const vi = language === "vi";

  return (
    <section id="stack" className="page-wrap py-14">
      <SectionHeader label={t.techStack.badge} title={t.techStack.title} intro={t.techStack.subtitle} />

      <dl className="divide-y divide-rule border-y border-rule">
        {TECH_CATEGORIES.map((cat) => (
          <div key={cat.title} className="grid gap-2 sm:gap-6 sm:grid-cols-[9rem_1fr] py-6">
            <dt className="eyebrow pt-1.5">{vi && cat.titleVi ? cat.titleVi : cat.title}</dt>
            <dd>
              <p className="text-muted">{vi && cat.taglineVi ? cat.taglineVi : cat.tagline}</p>
              <p className="mt-3 text-ink">
                {cat.items.map((item, i) => (
                  <React.Fragment key={item.name}>
                    {i > 0 && <span className="text-faint"> · </span>}
                    <span className={item.highlight ? "font-medium" : "text-ink/80"}>{item.name}</span>
                  </React.Fragment>
                ))}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
