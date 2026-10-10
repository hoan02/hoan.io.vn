"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { SectionHeader } from "@/components/common/SectionHeader";

export function Contact() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const channels = [
    { label: "Email", value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
    { label: "GitHub", value: "github.com/hoan02", href: PERSONAL_INFO.github },
    { label: "LinkedIn", value: "linkedin.com/in/hoan02", href: PERSONAL_INFO.linkedin },
    { label: "CV", value: "PDF", href: PERSONAL_INFO.cvUrl },
  ];

  return (
    <section id="contact" className="page-wrap py-14">
      <SectionHeader
        label={t.contact.badge}
        title={`${t.contact.titleStart} ${t.contact.titleHighlight} ${t.contact.titleEnd}`}
        intro={t.contact.subtitle}
      />

      <dl className="divide-y divide-rule border-y border-rule">
        {channels.map((c) => (
          <div key={c.label} className="grid gap-1 sm:gap-6 sm:grid-cols-[9rem_1fr] py-4">
            <dt className="eyebrow pt-1">{c.label}</dt>
            <dd>
              <a href={c.href} target={c.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="link">
                {c.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-faint">{t.contact.timezone}</p>
    </section>
  );
}
