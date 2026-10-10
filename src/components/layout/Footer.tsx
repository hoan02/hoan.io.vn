"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { PERSONAL_INFO } from "@/data/portfolioData";

export function Footer() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  return (
    <footer className="border-t border-rule mt-24">
      <div className="page-wrap py-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between text-sm text-muted">
        <div className="space-y-1">
          <p className="font-serif text-base text-ink">
            {language === "vi" ? PERSONAL_INFO.nameVi : PERSONAL_INFO.name}
          </p>
          <p>
            {t.footer.role} · {t.footer.location}
          </p>
          <p className="text-faint">
            © {new Date().getFullYear()} · {t.footer.rights}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><Link className="link" href="/projects">{t.nav.work}</Link></li>
          <li><Link className="link" href="/writing">{t.nav.writing}</Link></li>
          <li><a className="link" href={PERSONAL_INFO.github} target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a className="link" href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a className="link" href={PERSONAL_INFO.cvUrl} target="_blank" rel="noreferrer">CV</a></li>
        </ul>
      </div>
    </footer>
  );
}
