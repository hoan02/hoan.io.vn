"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/common/Icons";
import { Mail, Copy, Check, ArrowUpRight, Phone } from "lucide-react";
import confetti from "canvas-confetti";

export function Contact() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.9 },
      colors: ["#10b981", "#34d399", "#ffffff"]
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <MotionWrapper>
        <div className="relative rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-zinc-950 border border-zinc-800/90 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Indicator */}
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-4">
            <span>{t.contact.badge}</span>
          </div>

          {/* Big Typography CTA */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 max-w-2xl leading-[1.1]">
            {t.contact.titleStart} <span className="text-emerald-400">{t.contact.titleHighlight}</span> {t.contact.titleEnd}
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed font-normal">
            {t.contact.subtitle}
          </p>

          {/* Contact Action Boxes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-12">
            {/* Email Box */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/40 transition-all shadow-inner">
              <div className="flex items-center gap-3 truncate">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[11px] font-mono text-zinc-500 block uppercase">Email</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs sm:text-sm font-mono font-medium text-zinc-100 hover:text-emerald-400 transition-colors truncate block"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="ml-3 p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors shrink-0"
                title={t.contact.copyEmail}
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone / Hotline Box */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/40 transition-all shadow-inner">
              <div className="flex items-center gap-3 truncate">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[11px] font-mono text-zinc-500 block uppercase">Phone / Zalo</span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, "")}`}
                    className="text-xs sm:text-sm font-mono font-medium text-zinc-100 hover:text-emerald-400 transition-colors truncate block"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyPhone}
                className="ml-3 p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors shrink-0"
                title="Copy phone number"
              >
                {copiedPhone ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Social Channels Strip */}
          <div className="pt-8 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors link-hover-effect"
              >
                <GithubIcon className="w-4 h-4 text-emerald-400" />
                <span>GitHub (hoan02)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors link-hover-effect"
              >
                <LinkedinIcon className="w-4 h-4 text-emerald-400" />
                <span>LinkedIn (hoan02)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <a
                href={PERSONAL_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors link-hover-effect"
              >
                <FacebookIcon className="w-4 h-4 text-blue-400" />
                <span>Facebook (hoanit02)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            </div>

            <div className="text-xs font-mono text-zinc-500">
              {t.contact.timezone}
            </div>
          </div>
        </div>
      </MotionWrapper>
    </section>
  );
}
