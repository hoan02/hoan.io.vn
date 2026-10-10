import React from "react";
import Link from "next/link";
import { TRANSIT_LINES, TransitLine, getLinePosition, getStopInfo, getTransfers, getInterchange } from "@/data/transitMap";
import { UI_TRANSLATIONS } from "@/data/translations";
import { HandArrow } from "@/components/common/Doodles";

type Lang = "en" | "vi";

/** Chapter number of a line, 1-based, in map order. */
export function chapterNumber(line: Pick<TransitLine, "id">): number {
  return TRANSIT_LINES.findIndex((l) => l.id === line.id) + 1;
}

/** "1.2" style page number for an article, or null when it sits on no chapter. */
export function pageNumber(slug: string): string | null {
  const pos = getLinePosition(slug);
  return pos ? `${chapterNumber(pos.line)}.${pos.index + 1}` : null;
}

/** Short slanted stripe in the chapter's tab colour. */
export function ChapterSwatch({ line, className = "" }: { line: Pick<TransitLine, "color">; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-3 w-8 -skew-x-12 border border-ink/20 ${className}`}
      style={{ background: line.color }}
    />
  );
}

/** Request path such as "session cookie → BFF → Kratos". */
export function MiniFlow({ slug }: { slug: string }) {
  const nodes = getStopInfo(slug).flow;
  if (nodes.length === 0) return null;
  return <p className="font-mono text-xs text-faint">{nodes.join(" → ")}</p>;
}

/** Circled page numbers for every article in a chapter; the current one is highlighted. */
export function PageDots({ line, current, language }: { line: TransitLine; current: number; language: Lang }) {
  const nb = UI_TRANSLATIONS[language].writing.notebook;
  return (
    <ol aria-label={`${nb.chapter} ${chapterNumber(line)}`} className="flex flex-wrap gap-1.5">
      {line.stops.map((slug, i) => {
        const info = getStopInfo(slug);
        const label = language === "vi" ? info.shortVi : info.short;
        const state = i < current ? "read" : i === current ? "current" : "ahead";
        return (
          <li key={slug}>
            <Link
              href={`/writing/${slug}`}
              aria-label={`${chapterNumber(line)}.${i + 1} ${label}`}
              aria-current={state === "current" ? "page" : undefined}
              title={label}
              className={`hand flex h-9 w-9 items-center justify-center border-2 border-ink text-lg transition-transform hover:-translate-y-0.5 ${
                state === "read" ? "bg-ink text-paper" : state === "current" ? "bg-marker text-ink" : "bg-paper text-ink"
              }`}
              style={{ borderRadius: "50% 45% 55% 50%" }}
            >
              {i + 1}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

/** Hand-written "see how X does it differently" links to interchange pages. */
export function SeeAlso({ slug, language, size = "md" }: { slug: string; language: Lang; size?: "sm" | "md" }) {
  const nb = UI_TRANSLATIONS[language].writing.notebook;
  const transfers = getTransfers(slug);
  const ix = getInterchange(slug);
  if (transfers.length === 0) return null;

  if (size === "sm") {
    return (
      <span className="hand mt-1 block text-lg">
        {transfers.map((tr) => {
          const pos = getLinePosition(tr.slug);
          const lineName = pos ? (language === "vi" ? pos.line.nameVi : pos.line.name).replace(/^(Building|Xây dựng) /, "") : "";
          return (
            <span key={tr.slug} className="mr-3 inline-block">
              ↪ {nb.seeAlso.replace("{line}", lineName)} → {pageNumber(tr.slug)}
            </span>
          );
        })}
      </span>
    );
  }

  return (
    <div className="space-y-4">
      {transfers.map((tr) => {
        const pos = getLinePosition(tr.slug);
        const lineName = pos ? (language === "vi" ? pos.line.nameVi : pos.line.name).replace(/^(Building|Xây dựng) /, "") : "";
        return (
          <Link key={tr.slug} href={`/writing/${tr.slug}`} className="group flex items-center gap-4">
            <HandArrow />
            <span>
              <span className="hand block text-xl">
                {nb.seeAlso.replace("{line}", lineName)}
                {ix && <span className="text-faint"> · {language === "vi" ? ix.topicVi : ix.topic}</span>}
              </span>
              <span className="block font-bold leading-snug group-hover:underline group-hover:decoration-marker group-hover:decoration-[6px] group-hover:underline-offset-[-1px]">
                {pageNumber(tr.slug)} · {language === "vi" && tr.titleVi ? tr.titleVi : tr.title}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
