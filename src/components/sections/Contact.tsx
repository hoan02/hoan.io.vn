"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { SectionHeader } from "@/components/common/SectionHeader";
import { RecruiterCard } from "@/components/writing/RecruiterCard";

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

      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <dl className="space-y-4">
          {channels.map((c) => (
            <div key={c.label} className="grid grid-cols-[6rem_1fr] items-baseline gap-4">
              <dt className="hand text-lg">{c.label}</dt>
              <dd>
                <a href={c.href} target={c.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="link">
                  {c.value}
                </a>
              </dd>
            </div>
          ))}
          <p className="hand pt-2 text-lg text-faint">{t.contact.timezone}</p>
        </dl>
        <RecruiterCard rotate={1.5} />
      </div>
    </section>
  );
}
