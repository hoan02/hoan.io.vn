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

      <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {TECH_CATEGORIES.map((cat) => (
          <div key={cat.title}>
            <dt className="hand text-xl">{vi && cat.titleVi ? cat.titleVi : cat.title}</dt>
            <dd className="mt-1">
              <p className="text-sm text-muted">{vi && cat.taglineVi ? cat.taglineVi : cat.tagline}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item.name}
                    className={`sketch px-3 py-1 text-sm ${item.highlight ? "bg-marker font-semibold text-ink" : "text-muted"}`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
