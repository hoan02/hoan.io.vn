"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";

/** "Hiring?" sticky note for recruiters, on the writing index and every article. */
export function RecruiterCard({ variant = "full", rotate = -1.5 }: { variant?: "full" | "compact"; rotate?: number }) {
  const { language } = useLanguage();
  const nb = UI_TRANSLATIONS[language].writing.notebook;
  const [copied, setCopied] = useState(false);
  const name = language === "vi" ? PERSONAL_INFO.nameVi : PERSONAL_INFO.name;
  const location = language === "vi" ? PERSONAL_INFO.locationVi : PERSONAL_INFO.location;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (insecure context); the mailto link still works.
    }
  };

  const links = (
    <p className="hand flex flex-wrap justify-center gap-x-4 gap-y-1 text-lg">
      <a href={PERSONAL_INFO.cvUrl} target="_blank" rel="noopener noreferrer" className="link">
        {nb.viewCv}
      </a>
      <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="link">
        GitHub
      </a>
      <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="link">
        LinkedIn
      </a>
      <a href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, "")}`} className="link">
        {PERSONAL_INFO.phone}
      </a>
    </p>
  );

  if (variant === "compact") {
    return (
      <aside aria-label={nb.recruiterLabel} className="note px-5 pb-5 pt-7" style={{ transform: `rotate(${rotate}deg)` }}>
        <p className="hand text-lg">{nb.recruiterLabel}</p>
        <p className="mt-1 text-lg font-extrabold leading-tight text-ink">{name}</p>
        <p className="mt-1 text-sm text-muted">{nb.recruiterCompact}</p>
        <a href={`mailto:${PERSONAL_INFO.email}`} className="btn btn-ink mt-4 w-full text-sm">
          {nb.emailMe}
        </a>
        <button type="button" onClick={copyEmail} className="hand mt-2 block w-full text-center text-base text-muted hover:text-accent" aria-live="polite">
          {copied ? nb.copied : `${nb.copyEmail} · ${PERSONAL_INFO.email}`}
        </button>
        <div className="mt-2">{links}</div>
      </aside>
    );
  }

  return (
    <section aria-label={nb.recruiterLabel} className="note @container mx-auto w-full max-w-3xl px-6 pb-8 pt-10 sm:px-10" style={{ transform: `rotate(${rotate}deg)` }}>
      <div className="grid gap-6 @2xl:grid-cols-[minmax(0,1fr)_17rem] @2xl:items-end @2xl:gap-10">
        <div>
          <p className="hand text-xl">{nb.recruiterLabel}</p>
          <h2 className="mt-1 text-3xl sm:text-4xl">{nb.recruiterTitle}</h2>
          <p className="mt-3 text-muted">{nb.recruiterBody}</p>
          <p className="mt-3 font-mono text-xs text-faint">
            {name} · {PERSONAL_INFO.title} · {location}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="btn btn-ink w-full">
            {nb.emailMe} →
          </a>
          <button type="button" onClick={copyEmail} className="hand text-base text-muted hover:text-accent" aria-live="polite">
            {copied ? nb.copied : `${nb.copyEmail} · ${PERSONAL_INFO.email}`}
          </button>
          {links}
        </div>
      </div>
    </section>
  );
}
