"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { useAskAI } from "@/components/layout/SiteShell";

const STACK = ["Angular", "Next.js", "Java / Spring Boot", "Go", "PostgreSQL", "Kubernetes"];

export function Hero() {
  const { language } = useLanguage();
  const { openAI } = useAskAI();
  const t = UI_TRANSLATIONS[language];
  const [copied, setCopied] = useState(false);

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
    <section className="page-wrap pt-16 sm:pt-24 pb-14">
      <p className="eyebrow mb-6">
        {t.hero.location} · {language === "vi" ? PERSONAL_INFO.statusVi : PERSONAL_INFO.status}
      </p>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl max-w-4xl">
        {language === "vi" ? PERSONAL_INFO.nameVi : PERSONAL_INFO.name}
      </h1>
      <p className="font-serif text-xl sm:text-2xl text-muted mt-3">{t.hero.title}</p>

      <p className="mt-8 max-w-2xl text-lg text-ink/90">
        {language === "vi" ? PERSONAL_INFO.bioVi : PERSONAL_INFO.bio}
      </p>

      <p className="mt-6 font-mono text-sm text-faint">{STACK.join("  ·  ")}</p>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <li><Link href="/writing" className="link">{t.nav.writing}</Link></li>
        <li><Link href="/projects" className="link">{t.nav.work}</Link></li>
        <li><a href={PERSONAL_INFO.cvUrl} target="_blank" rel="noreferrer" className="link">{t.hero.viewCv}</a></li>
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
    </section>
  );
}
