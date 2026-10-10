"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PERSONAL_INFO, ARTICLES_DATA } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { useAskAI } from "@/components/layout/SiteShell";
import { HandArrow, HandCircle } from "@/components/common/Doodles";

const STACK = ["Angular", "Next.js", "Java / Spring Boot", "Go", "PostgreSQL", "Kubernetes"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dateKey = (d: string) => {
  const [m, y] = d.split(" ");
  return Number(y) * 12 + Math.max(0, MONTHS.indexOf(m));
};

export function Hero() {
  const { language } = useLanguage();
  const { openAI } = useAskAI();
  const t = UI_TRANSLATIONS[language];
  const vi = language === "vi";
  const [copied, setCopied] = useState(false);
  const latest = [...ARTICLES_DATA].sort((a, b) => dateKey(b.date) - dateKey(a.date))[0];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}`;
    }
  };

  return (
    <section className="page-wrap pb-14 pt-14 sm:pt-20">
      <div className="flex flex-wrap items-end gap-x-14 gap-y-10">
        <div className="min-w-0 flex-[999_1_560px]">
          <p className="eyebrow -rotate-2 text-xl">{t.hero.sketchHello}</p>
          <h1 className="mt-3 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
            <span className="mark mark-draw">{vi ? PERSONAL_INFO.nameVi : PERSONAL_INFO.name}</span>
            <span className="text-muted">, </span>
            <span className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              {t.hero.headlineLead}{" "}
              <span className="relative inline-block">
                {t.hero.headlineCircle}
                <HandCircle className="-left-3 -top-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)]" />
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-muted">{vi ? PERSONAL_INFO.bioVi : PERSONAL_INFO.bio}</p>
          <p className="mt-5 font-mono text-sm text-faint">{STACK.join("  ·  ")}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/projects" className="btn btn-ink">
              {t.hero.projectsCta}
            </Link>
            <a href={PERSONAL_INFO.cvUrl} target="_blank" rel="noreferrer" className="btn">
              {t.hero.downloadCv}
            </a>
            <span className="hand -rotate-3 text-xl">{t.hero.openNote}</span>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li><Link href="/writing" className="link">{t.nav.writing}</Link></li>
            <li><a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="link">GitHub</a></li>
            <li><a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="link">LinkedIn</a></li>
            <li>
              <button type="button" onClick={copyEmail} className="link">
                {copied ? t.hero.copied : PERSONAL_INFO.email}
              </button>
            </li>
            <li>
              <button type="button" onClick={openAI} className="link">{t.hero.askAiStack}</button>
            </li>
          </ul>
        </div>

        {latest && (
          <div className="flex-[1_1_240px] lg:max-w-[18rem]">
            <div className="flex items-end gap-1">
              <p className="hand rotate-3 text-xl">{t.hero.latestNote}:</p>
              <HandArrow direction="down-left" width={70} />
            </div>
            <Link href={`/writing/${latest.slug}`} className="note mt-2 block px-5 pb-5 pt-7" style={{ transform: "rotate(2deg)" }}>
              <span className="font-mono text-xs text-faint">
                {latest.date} · {latest.readTime.replace(" read", "")}
              </span>
              <span className="mt-1 block text-lg font-extrabold leading-snug text-ink">
                {vi && latest.titleVi ? latest.titleVi : latest.title}
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
