"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";

/** Contact block for recruiters, shown on the writing index and every article. */
export function RecruiterCard({ variant = "full" }: { variant?: "full" | "compact" }) {
  const { language } = useLanguage();
  const tt = UI_TRANSLATIONS[language].writing.transit;
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
    <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
      <li>
        <a href={PERSONAL_INFO.cvUrl} target="_blank" rel="noopener noreferrer" className="link">
          {tt.viewCv} ↗
        </a>
      </li>
      <li>
        <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="link">
          GitHub ↗
        </a>
      </li>
      <li>
        <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="link">
          LinkedIn ↗
        </a>
      </li>
      <li>
        <a href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, "")}`} className="link">
          {PERSONAL_INFO.phone}
        </a>
      </li>
    </ul>
  );

  if (variant === "compact") {
    return (
      <aside aria-label={tt.recruiterLabel} className="border-t border-rule pt-6 text-sm">
        <p className="eyebrow mb-2">{tt.recruiterLabel}</p>
        <p className="text-ink">{name}</p>
        <p className="mt-1 max-w-xl text-muted">
          {PERSONAL_INFO.title} · {tt.recruiterCompact}
        </p>
        <p className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="link font-mono text-xs">
            {PERSONAL_INFO.email}
          </a>
          <button type="button" onClick={copyEmail} className="link font-mono text-xs" aria-live="polite">
            {copied ? tt.copied : tt.copyEmail}
          </button>
        </p>
        <div className="mt-3">{links}</div>
      </aside>
    );
  }

  return (
    <section aria-label={tt.recruiterLabel} className="border-y border-ink py-10">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_18rem] md:gap-12">
        <div>
          <p className="eyebrow mb-3">{tt.recruiterLabel}</p>
          <h2 className="max-w-xl text-3xl sm:text-4xl">{tt.recruiterTitle}</h2>
          <p className="mt-4 max-w-xl text-muted">{tt.recruiterBody}</p>
          <p className="mt-4 font-mono text-xs text-faint">
            {name} · {PERSONAL_INFO.title} · {location}
          </p>
        </div>
        <div className="flex flex-col justify-end gap-4">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex min-h-11 items-center justify-center bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            {tt.emailMe} →
          </a>
          <p className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs text-muted">
            <span className="break-all">{PERSONAL_INFO.email}</span>
            <button type="button" onClick={copyEmail} className="link" aria-live="polite">
              {copied ? tt.copied : tt.copyEmail}
            </button>
          </p>
          {links}
        </div>
      </div>
    </section>
  );
}
