"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SiteShell } from "@/components/layout/SiteShell";
import { ARTICLES_DATA } from "@/data/portfolioData";
import { getArticleEditorial } from "@/data/articleEditorial";
import { UI_TRANSLATIONS } from "@/data/translations";
import type { Article } from "@/types";
import { TRANSIT_LINES, LineId, getArticle, getLinePosition } from "@/data/transitMap";
import { ChapterSwatch, MiniFlow, SeeAlso, chapterNumber, pageNumber } from "@/components/writing/Notebook";
import { RecruiterCard } from "@/components/writing/RecruiterCard";
import { HandArrow } from "@/components/common/Doodles";

function WritingContent() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const nb = t.writing.notebook;
  const vi = language === "vi";
  const [chapter, setChapter] = useState<LineId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const q = searchQuery.toLowerCase().trim();
  const matches = useMemo(() => {
    return (a: Article) => {
      if (!q) return true;
      const title = vi && a.titleVi ? a.titleVi : a.title;
      const summary = vi && a.summaryVi ? a.summaryVi : a.summary;
      return (
        title.toLowerCase().includes(q) ||
        summary.toLowerCase().includes(q) ||
        a.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    };
  }, [q, vi]);

  const chapters = TRANSIT_LINES.filter((l) => chapter === "all" || l.id === chapter)
    .map((line) => ({
      line,
      entries: line.stops.map((s) => getArticle(s)).filter((a): a is Article => Boolean(a)).filter(matches),
    }))
    .filter((c) => c.entries.length > 0);

  // Articles that sit on no chapter still need a place in the notebook.
  const loose = ARTICLES_DATA.filter((a) => !getLinePosition(a.slug) && chapter === "all" && matches(a));
  const empty = chapters.length === 0 && loose.length === 0;

  const renderEntry = (a: Article, num: string | null) => {
    const ed = getArticleEditorial(a);
    return (
      <li key={a.slug}>
        <Link
          href={`/writing/${a.slug}`}
          className="group -mx-3 grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-3 gap-y-1 rounded-sm px-3 py-3.5 transition-colors hover:bg-marker/40 sm:grid-cols-[3.25rem_minmax(0,1fr)_auto]"
        >
          <span className="hand pt-0.5 text-xl text-faint">{num ?? "·"}</span>
          <span className="min-w-0">
            <span className="block text-lg font-semibold leading-snug text-ink group-hover:underline group-hover:decoration-marker group-hover:decoration-[6px] group-hover:underline-offset-[-1px]">
              {vi && a.titleVi ? a.titleVi : a.title}
            </span>
            <span className="mt-1 block">
              <MiniFlow slug={a.slug} />
            </span>
            <SeeAlso slug={a.slug} language={language} size="sm" />
          </span>
          <span className="col-start-2 font-mono text-xs text-faint sm:col-start-auto sm:whitespace-nowrap sm:pt-1.5">
            {a.date} · {a.readTime.replace(" read", "")} · {vi ? ed.formatVi : ed.format}
          </span>
        </Link>
      </li>
    );
  };

  return (
    <SiteShell>
      <div className="page-wrap pb-24 pt-12">
        <div className="flex flex-wrap items-start gap-12">
          <div className="min-w-0 flex-[999_1_640px]">
            <header className="max-w-2xl">
              <p className="eyebrow -rotate-2">
                {nb.tocLabel} — {ARTICLES_DATA.length} {nb.posts}, {TRANSIT_LINES.length} {nb.chapters}
              </p>
              <h1 className="mt-2 text-4xl sm:text-6xl">
                <span className="mark mark-draw">{t.writing.title}</span>
              </h1>
              <p className="mt-4 text-lg text-muted">{nb.intro}</p>
            </header>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <label htmlFor="writing-search" className="sr-only">
                {nb.searchPlaceholder}
              </label>
              <input
                id="writing-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={nb.searchPlaceholder}
                className="hand min-h-11 min-w-0 flex-[1_1_16rem] border-0 border-b-2 border-ink bg-transparent px-1 text-xl text-ink placeholder:text-faint focus:border-accent focus:outline-none"
              />
              <div className="flex flex-wrap gap-2" role="group" aria-label={nb.chapters}>
                {[{ id: "all" as const, label: nb.all }, ...TRANSIT_LINES.map((l) => ({ id: l.id, label: `${nb.chapter} ${chapterNumber(l)}` }))].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={chapter === f.id}
                    onClick={() => setChapter(f.id)}
                    className={`hand sketch min-h-10 px-3.5 text-lg ${chapter === f.id ? "bg-ink text-paper" : "text-ink hover:bg-marker/50"}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {empty && (
              <div className="mt-14">
                <p className="hand text-2xl text-muted">{nb.noResults}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setChapter("all");
                  }}
                  className="btn mt-4"
                >
                  {nb.reset}
                </button>
              </div>
            )}

            {chapters.map(({ line, entries }) => (
              <section key={line.id} className="mt-14" aria-labelledby={`chapter-${line.id}`}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="hand text-xl">
                    {nb.chapter} {chapterNumber(line)}
                  </span>
                  <h2 id={`chapter-${line.id}`} className="text-2xl sm:text-3xl">
                    {vi ? line.nameVi : line.name}
                  </h2>
                  <ChapterSwatch line={line} />
                  <span className="hand text-lg text-faint">
                    {vi ? line.metaVi : line.meta} · {line.stops.length} {nb.posts}
                  </span>
                </div>
                <ol className="mt-3">{entries.map((a) => renderEntry(a, pageNumber(a.slug)))}</ol>
              </section>
            ))}

            {loose.length > 0 && (
              <section className="mt-14">
                <ol>{loose.map((a) => renderEntry(a, null))}</ol>
              </section>
            )}

            {!empty && chapter === "all" && !q && (
              <div className="mt-10 flex items-center gap-3 pl-6">
                <HandArrow />
                <p className="hand text-xl">↪ = {nb.sameProblem}</p>
              </div>
            )}
          </div>

          <aside className="flex w-full flex-col gap-12 lg:w-72 lg:flex-none">
            <nav aria-label={nb.chapters} className="hidden flex-col items-end gap-2 lg:flex">
              {TRANSIT_LINES.map((line) => (
                <button
                  key={line.id}
                  type="button"
                  aria-pressed={chapter === line.id}
                  onClick={() => setChapter(chapter === line.id ? "all" : line.id)}
                  className="chapter-tab flex min-h-11 w-60 items-center justify-between rounded-l-xl border-2 border-r-0 border-ink px-4 text-left text-ink"
                  style={{ background: line.color }}
                >
                  <span className="text-[15px] font-semibold">{vi ? line.nameVi : line.name}</span>
                  <span className="hand text-lg">{line.stops.length}</span>
                </button>
              ))}
            </nav>
            <div className="lg:sticky lg:top-24">
              <RecruiterCard variant="compact" rotate={-2} />
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}

export default function WritingIndexPage() {
  return <WritingContent />;
}
