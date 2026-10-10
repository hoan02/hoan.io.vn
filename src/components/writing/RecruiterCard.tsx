"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, FileText, Phone, MapPin } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";
import { Sticker } from "./Toon";

/** Contact block for recruiters, shown on the writing index and every article. */
export function RecruiterCard({ variant = "banner" }: { variant?: "banner" | "compact" }) {
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

  const secondary =
    "toon-btn inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--paper)] px-3.5 text-sm font-semibold text-[var(--ink)]";

  if (variant === "compact") {
    return (
      <section aria-label={tt.recruiterSticker} className="toon relative space-y-4 p-5 pt-7">
        <Sticker color="var(--line-b)" className="absolute -top-4 left-4">
          {tt.recruiterSticker}
        </Sticker>
        <div>
          <p className="font-display text-lg font-bold text-[var(--ink)]">{name}</p>
          <p className="text-sm text-[var(--muted)]">{PERSONAL_INFO.title}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">{tt.recruiterCompact}</p>
        </div>
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="toon-btn flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--line-a)] px-4 text-sm font-bold text-[#09090B]"
        >
          <Mail className="h-4 w-4" />
          {tt.emailMe}
        </a>
        <div className="grid grid-cols-3 gap-2">
          <a href={PERSONAL_INFO.cvUrl} target="_blank" rel="noopener noreferrer" className={`${secondary} justify-center px-2`} aria-label={tt.viewCv}>
            <FileText className="h-4 w-4" />
          </a>
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className={`${secondary} justify-center px-2`} aria-label="GitHub">
            <GithubIcon className="h-4 w-4" />
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className={`${secondary} justify-center px-2`} aria-label="LinkedIn">
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section aria-label={tt.recruiterSticker} className="toon relative p-6 pt-9 sm:p-10 sm:pt-12">
      <Sticker color="var(--line-b)" className="absolute -top-4 left-6 text-sm">
        {tt.recruiterSticker}
      </Sticker>
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div className="min-w-0 max-w-2xl flex-[999_1_420px]">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl">{tt.recruiterTitle}</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">{tt.recruiterBody}</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-[var(--muted)]">
            <span className="font-bold text-[var(--ink)]">{name}</span>
            <span>{PERSONAL_INFO.title}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </span>
          </p>
        </div>
        <div className="flex flex-[1_1_280px] flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="toon-btn inline-flex min-h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[var(--line-a)] px-5 text-base font-bold text-[#09090B]"
            >
              <Mail className="h-5 w-5" />
              {tt.emailMe}
            </a>
            <button type="button" onClick={copyEmail} className={secondary} aria-live="polite">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? tt.copied : tt.copyEmail}
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={PERSONAL_INFO.cvUrl} target="_blank" rel="noopener noreferrer" className={secondary}>
              <FileText className="h-4 w-4" />
              {tt.viewCv}
            </a>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className={secondary}>
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className={secondary}>
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <a href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, "")}`} className={secondary}>
              <Phone className="h-4 w-4" />
              {tt.call}
            </a>
          </div>
          <p className="font-mono text-xs text-[var(--muted)]">{PERSONAL_INFO.email}</p>
        </div>
      </div>
    </section>
  );
}
