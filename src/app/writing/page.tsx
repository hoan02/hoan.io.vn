"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ARTICLES_DATA } from "@/data/portfolioData";
import { UI_TRANSLATIONS } from "@/data/translations";
import { AskAIFloatingButton } from "@/components/ai/AskAIFloatingButton";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import {
  TRANSIT_LINES,
  LineId,
  getArticle,
  getInterchange,
  getLinePosition,
  getStopInfo,
} from "@/data/transitMap";
import {
  HoanBot,
  LineBadge,
  MiniFlow,
  RequestTrace,
  Sparkle,
  Squiggle,
  StationDot,
  Sticker,
  TransitTrain,
} from "@/components/writing/Toon";
import { RecruiterCard } from "@/components/writing/RecruiterCard";

const AskAIModal = dynamic(
  () => import("@/components/ai/AskAIModal").then((mod) => mod.AskAIModal),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import("@/components/common/CustomCursor").then((mod) => mod.CustomCursor),
  { ssr: false }
);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "Feb 2026" → sortable number
function dateKey(date: string) {
  const [m, y] = date.split(" ");
  return Number(y) * 12 + Math.max(0, MONTHS.indexOf(m));
}

const TRACE_NODES = ["Browser", "Traefik · ForwardAuth", "auth-gateway BFF", "9 Go services", "CloudNativePG"];

function WritingContent() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const tt = t.writing.transit;
  const [lineFilter, setLineFilter] = useState<LineId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const handleOpenAI = () => setAiModalOpen(true);
  const handleCloseAI = () => setAiModalOpen(false);

  const departures = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ARTICLES_DATA.filter((article) => {
      const pos = getLinePosition(article.slug);
      if (lineFilter !== "all" && pos?.line.id !== lineFilter) return false;
      if (!q) return true;
      const title = language === "vi" && article.titleVi ? article.titleVi : article.title;
      const summary = language === "vi" && article.summaryVi ? article.summaryVi : article.summary;
      return (
        title.toLowerCase().includes(q) ||
        summary.toLowerCase().includes(q) ||
        article.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }).sort((a, b) => dateKey(b.date) - dateKey(a.date));
  }, [searchQuery, lineFilter, language]);

  const heroWords = tt.heroLead.split(" ");
  const accentWords = tt.heroAccent.split(" ");

  return (
    <main className="transit relative min-h-screen bg-slate-50 dark:bg-[#090a0f] bg-dots-pattern text-[var(--ink)] transition-colors duration-200">
      <CustomCursor />
      <Navbar onOpenAI={handleOpenAI} />

      <div className="mx-auto max-w-6xl px-4 pb-28 pt-32 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="flex flex-wrap items-end justify-between gap-10">
          <div className="min-w-0 flex-[999_1_600px]">
            <Sticker color="var(--line-b)">
              {tt.boarding.toUpperCase()} · {ARTICLES_DATA.length} {tt.fieldNotes}
            </Sticker>
            <h1 className="font-display relative mt-8 text-5xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[96px]">
              <Sparkle color="var(--line-b)" size={28} style={{ right: "6%", top: -20 }} />
              <Sparkle color="var(--ink)" size={18} style={{ right: "1%", top: 44 }} delay={0.7} />
              <Sparkle color="var(--line-a)" size={22} style={{ left: -26, bottom: 24 }} delay={1.4} />
              {heroWords.map((w, i) => (
                <React.Fragment key={`h${i}`}>
                  <span className="toon-pop" style={{ animationDelay: `${i * 0.12}s` }}>
                    {w}
                  </span>{" "}
                </React.Fragment>
              ))}
              <br />
              {accentWords.map((w, i) => (
                <React.Fragment key={`a${i}`}>
                  <span
                    className="toon-pop font-serif-accent text-[var(--line-a)]"
                    style={{ animationDelay: `${(heroWords.length + i) * 0.12}s` }}
                  >
                    {w}
                  </span>{" "}
                </React.Fragment>
              ))}
            </h1>
            <Squiggle color="var(--line-b)" className="mt-2" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">{tt.heroSub}</p>
          </div>
          <div className="hidden max-w-[260px] flex-[1_1_220px] sm:block">
            <HoanBot message={tt.botHello} label={t.nav.askAi} onClick={handleOpenAI} />
          </div>
        </section>

        {/* Request trace */}
        <figure className="toon mt-16 px-5 py-7 sm:px-7">
          <div role="img" aria-label={TRACE_NODES.join(" → ")}>
            <RequestTrace nodes={TRACE_NODES} highlight={2} />
          </div>
          <figcaption className="mt-5 flex flex-wrap justify-between gap-2 font-mono text-xs text-[var(--muted)]">
            <span>{tt.traceCaption}</span>
            <span>{tt.traceHint} ↗</span>
          </figcaption>
        </figure>

        {/* Network */}
        <section className="mt-28" aria-labelledby="network-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="network-title" className="font-display text-4xl font-bold tracking-[-0.03em] sm:text-6xl">
              {tt.networkTitle}{" "}
              <span className="font-serif-accent relative inline-block">
                {tt.network}
                <svg className="absolute -bottom-1.5 left-0 h-3.5 w-full" viewBox="0 0 200 14" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path d="M2 8 C 30 2, 60 13, 100 7 S 170 2, 198 8" stroke="var(--line-a)" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-[var(--muted)]">{tt.networkSub}</p>
          </div>

          <div className="mt-12 space-y-9">
            {TRANSIT_LINES.map((line, lineIdx) => (
              <div key={line.id} className="toon overflow-x-auto px-5 pb-8 pt-6 sm:px-7">
                <div className="mb-11 flex flex-wrap items-center gap-3.5">
                  <LineBadge id={line.id} color={line.color} />
                  <span className="font-display text-2xl font-bold">{language === "vi" ? line.nameVi : line.name}</span>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    {line.stops.length} {tt.stops} · {language === "vi" ? line.metaVi : line.meta}
                  </span>
                  {lineIdx === 0 && (
                    <span className="toon-nudge ml-auto hidden items-center gap-1.5 md:inline-flex" aria-hidden="true">
                      <span className="font-hand -rotate-3 text-[28px]" style={{ color: "var(--line-b)" }}>
                        {tt.startHere}
                      </span>
                      <svg width="46" height="40" viewBox="0 0 46 40" fill="none">
                        <path d="M40 4 C 30 10, 18 18, 8 34 M8 34 l2 -12 M8 34 l11 -4" stroke="var(--line-b)" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    </span>
                  )}
                  {lineIdx === 1 && (
                    <span className="font-hand ml-auto hidden rotate-2 text-[26px] md:inline" aria-hidden="true">
                      {tt.sameProblem}
                    </span>
                  )}
                </div>
                <div className="relative" style={{ minWidth: line.stops.length * 140 }}>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 top-[7px] h-2.5 rounded-full border-2 border-[var(--ink)]"
                    style={{ background: line.color }}
                  />
                  {line.stops.length >= 3 && (
                    <span className="toon-ride absolute -top-[18px]" style={{ animationDuration: `${8 + lineIdx * 2}s` }}>
                      <TransitTrain color={line.color} />
                    </span>
                  )}
                  <ol className="relative flex">
                  {line.stops.map((slug, i) => {
                    const article = getArticle(slug);
                    if (!article) return null;
                    const info = getStopInfo(slug);
                    const ix = getInterchange(slug);
                    return (
                      <li key={slug} className="relative min-w-0 flex-1">
                        <Link href={`/writing/${slug}`} className="toon-station group flex flex-col gap-3.5 pr-4">
                          <StationDot color={line.color} interchange={Boolean(ix)} current={lineIdx === 0 && i === 0} />
                          <span className="font-mono text-[11px] text-[var(--subtle)]">
                            0{i + 1} · {article.readTime.replace(" read", "")}
                          </span>
                          <span className="text-[15px] font-medium leading-snug text-[var(--muted)] transition-colors group-hover:text-[var(--ink)]">
                            {language === "vi" ? info.shortVi : info.short}
                          </span>
                          {ix && (
                            <span className="self-start rounded-full border-2 border-[var(--ink)] bg-[var(--ink)] px-2 py-0.5 font-mono text-[11px] font-bold text-[var(--paper)]">
                              ⇄ {language === "vi" ? ix.topicVi : ix.topic}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Departures */}
        <section className="mt-28" aria-labelledby="departures-title">
          <h2 id="departures-title" className="font-display text-4xl font-bold tracking-[-0.03em] sm:text-6xl">
            {tt.departuresTitle} <span className="font-serif-accent">{tt.departures}</span>
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <label htmlFor="writing-search" className="sr-only">
              {t.writing.searchPlaceholder}
            </label>
            <div className="relative min-w-0 flex-[1_1_280px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
              <input
                id="writing-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.writing.searchPlaceholder}
                className="toon-sm min-h-12 w-full rounded-xl bg-[var(--paper)] pl-11 pr-4 font-mono text-sm text-[var(--ink)] placeholder:text-[var(--subtle)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--line-a)]"
              />
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label={tt.allLines}>
              {[{ id: "all" as const, label: tt.allLines, color: "var(--ink)" }, ...TRANSIT_LINES.map((l) => ({ id: l.id, label: l.id, color: l.color }))].map(
                (f) => {
                  const active = lineFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setLineFilter(f.id)}
                      className="toon-btn min-h-11 min-w-11 rounded-full px-4 font-mono text-sm font-bold"
                      style={
                        active
                          ? { background: f.id === "all" ? "var(--ink)" : f.color, color: f.id === "all" ? "var(--paper)" : "#09090B" }
                          : { background: "var(--paper)", color: "var(--ink)" }
                      }
                    >
                      {f.label}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {departures.length === 0 ? (
            <div className="toon mt-10 p-10 text-center">
              <p className="font-mono text-[var(--muted)]">{tt.noResults}</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setLineFilter("all");
                }}
                className="toon-btn mt-5 min-h-11 rounded-xl bg-[var(--line-a)] px-5 font-mono text-sm font-bold text-[#09090B]"
              >
                {tt.reset}
              </button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {departures.map((article) => {
                const pos = getLinePosition(article.slug);
                const info = getStopInfo(article.slug);
                const title = language === "vi" && article.titleVi ? article.titleVi : article.title;
                return (
                  <Link key={article.slug} href={`/writing/${article.slug}`} className="toon toon-lift flex flex-col gap-4 p-6">
                    <div className="flex items-center justify-between gap-3">
                      {pos ? <LineBadge id={pos.line.id} color={pos.line.color} /> : <span />}
                      <span className="font-mono text-xs text-[var(--muted)]">
                        {article.date} · {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl">{title}</h3>
                    <MiniFlow nodes={info.flow} />
                    <span className="mt-auto pt-2 font-mono text-[13px] font-bold" style={{ color: "var(--line-a)" }}>
                      {tt.board}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <div className="mt-28">
          <RecruiterCard />
        </div>
      </div>

      <Footer />
      <AskAIFloatingButton onClick={handleOpenAI} />
      <MobileTabBar onOpenAI={handleOpenAI} />
      {aiModalOpen && <AskAIModal isOpen={aiModalOpen} onClose={handleCloseAI} />}
    </main>
  );
}

export default function WritingIndexPage() {
  return <WritingContent />;
}
