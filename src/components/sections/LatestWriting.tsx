"use client";

import React from "react";
import Link from "next/link";
import { ARTICLES_DATA } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { SectionHeader } from "@/components/common/SectionHeader";
import { pageNumber } from "@/components/writing/Notebook";

export function LatestWriting() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const vi = language === "vi";

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

      <ol>
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/writing/${a.slug}`}
              className="group -mx-3 grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-3 rounded-sm px-3 py-4 transition-colors hover:bg-marker/40 sm:grid-cols-[3.25rem_minmax(0,1fr)_9rem]"
            >
              <span className="hand pt-0.5 text-xl text-faint">{pageNumber(a.slug) ?? "·"}</span>
              <span className="min-w-0">
                <span className="block text-xl font-bold leading-snug text-ink group-hover:underline group-hover:decoration-marker group-hover:decoration-[6px] group-hover:underline-offset-[-1px]">
                  {vi && a.titleVi ? a.titleVi : a.title}
                </span>
                <span className="mt-1.5 block max-w-2xl text-muted">{vi && a.summaryVi ? a.summaryVi : a.summary}</span>
              </span>
              <span className="col-start-2 mt-2 font-mono text-xs text-faint sm:col-start-auto sm:mt-0 sm:pt-1.5 sm:text-right">
                {a.date} · {a.readTime.replace(" read", "")}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
