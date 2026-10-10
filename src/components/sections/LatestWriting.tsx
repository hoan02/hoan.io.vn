"use client";

import React from "react";
import Link from "next/link";
import { ARTICLES_DATA } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { SectionHeader } from "@/components/common/SectionHeader";

export function LatestWriting() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  // Featured pieces first, then the rest in source order.
  const articles = [...ARTICLES_DATA]
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 6);

  return (
    <section id="writing" className="page-wrap py-14">
      <SectionHeader
        label={t.writing.badge}
        title={t.writing.title}
        intro={t.writing.subtitle}
        action={<Link href="/writing" className="link">{t.writing.viewAll} →</Link>}
      />

      <ol className="divide-y divide-rule border-y border-rule">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/writing/${a.slug}`}
              className="group grid gap-1 sm:gap-6 sm:grid-cols-[9rem_1fr] py-6"
            >
              <p className="eyebrow pt-1.5">
                {a.date} · {a.readTime.replace(" read", "")}
              </p>
              <div>
                <h3 className="text-xl sm:text-2xl group-hover:text-accent transition-colors">
                  {language === "vi" && a.titleVi ? a.titleVi : a.title}
                </h3>
                <p className="mt-2 text-muted max-w-2xl">
                  {language === "vi" && a.summaryVi ? a.summaryVi : a.summary}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
