"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  GitBranch,
  Maximize2,
  Play,
  Share2,
  Terminal,
  Video,
} from "lucide-react";
import { Article } from "@/types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UI_TRANSLATIONS } from "@/data/translations";
import { PROJECTS_DATA, ARTICLES_DATA } from "@/data/portfolioData";
import { ENGINEERING_EVIDENCE } from "@/data/engineeringEvidence";
import { getArticleEditorial } from "@/data/articleEditorial";
import { getArticle, getLinePosition, getStopInfo, getTransfers, getInterchange } from "@/data/transitMap";
import { AskAIFloatingButton } from "@/components/ai/AskAIFloatingButton";
import { DIAGRAM_MAP } from "@/components/diagrams/ArchitectureDiagrams";
import { HoanBot, LineBadge, StationDot, Sticker, TransitTrain } from "@/components/writing/Toon";
import { RecruiterCard } from "@/components/writing/RecruiterCard";
import { useLanguage } from "@/context/LanguageContext";

const AskAIModal = dynamic(
  () => import("@/components/ai/AskAIModal").then((mod) => mod.AskAIModal),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import("@/components/common/CustomCursor").then((mod) => mod.CustomCursor),
  { ssr: false }
);

interface ArticleClientViewProps {
  article: Article;
}

const H2 = "font-display scroll-mt-28 text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-[34px] sm:leading-tight";

const CALLOUT_STYLES = {
  tip: { label: "Design principle", labelVi: "Nguyên tắc", accent: "var(--line-a)", bg: "bg-emerald-50 dark:bg-[#052E1F]" },
  info: { label: "Good to know", labelVi: "Cần biết", accent: "#38BDF8", bg: "bg-sky-50 dark:bg-[#0C1A2E]" },
  warning: { label: "Watch out", labelVi: "Lưu ý", accent: "var(--line-b)", bg: "bg-amber-50 dark:bg-[#2A1A05]" },
} as const;

function ArticleReader({ article }: ArticleClientViewProps) {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const tt = t.writing.transit;
  const vi = language === "vi";
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  const handleOpenAI = () => setAiModalOpen(true);
  const handleCloseAI = () => setAiModalOpen(false);

  const articleTitle = vi && article.titleVi ? article.titleVi : article.title;
  const articleSummary = vi && article.summaryVi ? article.summaryVi : article.summary;
  const problemStatement = vi && article.content.problemStatementVi ? article.content.problemStatementVi : article.content.problemStatement;
  const architectureDesign = vi && article.content.architectureDesignVi ? article.content.architectureDesignVi : article.content.architectureDesign;
  const technicalDecisions = vi && article.content.technicalDecisionsVi ? article.content.technicalDecisionsVi : article.content.technicalDecisions;
  const keyTakeaways = vi && article.content.keyTakeawaysVi ? article.content.keyTakeawaysVi : article.content.keyTakeaways;
  const editorial = getArticleEditorial(article);

  const relatedProject = article.relatedProject ? PROJECTS_DATA.find((p) => p.id === article.relatedProject) : null;
  const verifiedEvidence = article.evidenceIds
    ? ENGINEERING_EVIDENCE.filter((ev) => article.evidenceIds?.includes(ev.id))
    : [];

  // Position on the transit map; articles off the map fall back to list order.
  const position = getLinePosition(article.slug);
  const line = position?.line ?? null;
  const stopIndex = position?.index ?? 0;
  const lineColor = line?.color ?? "#10B981";
  const interchange = getInterchange(article.slug);
  const transfers = getTransfers(article.slug);
  const listIndex = ARTICLES_DATA.findIndex((a) => a.slug === article.slug);
  const prevArticle = line
    ? stopIndex > 0 ? getArticle(line.stops[stopIndex - 1]) ?? null : null
    : listIndex > 0 ? ARTICLES_DATA[listIndex - 1] : null;
  const nextArticle = line
    ? stopIndex < line.stops.length - 1 ? getArticle(line.stops[stopIndex + 1]) ?? null : null
    : listIndex < ARTICLES_DATA.length - 1 ? ARTICLES_DATA[listIndex + 1] : null;

  const handleCopyCode = async (codeText: string) => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {}
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } catch {}
  };

  const DiagramComponent = DIAGRAM_MAP[article.slug] || (article.diagramKey ? DIAGRAM_MAP[article.diagramKey] : null);
  const hasDiagram = Boolean(DiagramComponent);

  const tocItems = useMemo(() => [
    ...(article.highlights && article.highlights.length > 0 ? [{ id: "highlights", label: vi ? "Chỉ số kiến trúc" : "Key Highlights" }] : []),
    { id: "context", label: t.writing.problemContext },
    ...(article.comparison ? [{ id: "comparison", label: vi ? "So sánh giải pháp" : "Architecture Comparison" }] : []),
    ...(hasDiagram || article.architectureDiagram ? [{ id: "architecture-diagram", label: vi ? "Sơ đồ hệ thống" : "Architecture Topology" }] : []),
    { id: "design", label: t.writing.architecturalSolution },
    { id: "decisions", label: t.writing.technicalDecisions },
    ...(article.sections && article.sections.length > 0 ? article.sections.map((s) => ({ id: s.id, label: vi && s.titleVi ? s.titleVi : s.title })) : []),
    ...(article.content.codeSnippet ? [{ id: "implementation", label: t.writing.codeImplementation }] : []),
    ...(verifiedEvidence.length > 0 ? [{ id: "evidence", label: vi ? "Bằng chứng Repository" : "Verified Evidence" }] : []),
    ...(article.embeds && article.embeds.length > 0 ? [{ id: "media-embeds", label: vi ? "Tư liệu & Video thực tế" : "Media & Video Records" }] : []),
    { id: "takeaways", label: t.writing.keyTakeaways },
  ], [article, vi, verifiedEvidence.length, hasDiagram, t.writing.architecturalSolution, t.writing.codeImplementation, t.writing.keyTakeaways, t.writing.problemContext, t.writing.technicalDecisions]);

  // Reading progress & scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setReadingProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 100) {
            setActiveSectionId(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  const activeIndex = Math.max(0, tocItems.findIndex((i) => i.id === activeSectionId));
  const stopCount = line?.stops.length ?? 1;
  // The train sits at this stop and rolls toward the next one as you read.
  const trainPct = stopCount > 1 ? Math.min(100, ((stopIndex + readingProgress / 100) / (stopCount - 1)) * 100) : readingProgress;
  const stopLabel = String(stopIndex + 1).padStart(2, "0");

  return (
    <main className="transit relative min-h-screen bg-slate-50 dark:bg-[#090a0f] bg-dots-pattern text-[var(--ink)] transition-colors duration-200">
      {/* Reading rail */}
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-[var(--rail)]" aria-hidden="true">
        <div className="h-full transition-[width] duration-150 ease-out" style={{ width: `${readingProgress}%`, background: lineColor }} />
      </div>

      <CustomCursor />
      <Navbar onOpenAI={handleOpenAI} />

      <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        {/* Breadcrumb & share */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 font-mono text-xs text-[var(--muted)]">
            <Link href="/" className="hover:text-[var(--ink)]">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/writing" className="hover:text-[var(--ink)]">Writing</Link>
            <span aria-hidden="true">/</span>
            <span className="max-w-[160px] truncate sm:max-w-xs">{article.slug}</span>
          </nav>
          <button
            type="button"
            onClick={handleShare}
            className="toon-btn inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-xl bg-[var(--paper)] px-3 font-mono text-xs font-bold"
          >
            {copiedShare ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copiedShare ? (vi ? "Đã copy link" : "Link copied!") : t.writing.shareNote}</span>
          </button>
        </div>

        {/* Journey bar */}
        {line && (
          <div className="toon px-5 pb-5 pt-4 sm:px-6">
            <div className="mb-7 flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--muted)]">
              <LineBadge id={line.id} color={line.color} className="!px-2.5 !text-sm" />
              <Link href="/writing" className="font-bold text-[var(--ink)] hover:underline">
                {vi ? line.nameVi : line.name}
              </Link>
              <span>
                {tt.stop} {stopLabel} {tt.of} {String(stopCount).padStart(2, "0")}
              </span>
              <span className="ml-auto">
                {Math.round(readingProgress)}% {tt.ofTheRide}
              </span>
            </div>
            <div className="relative">
              <span aria-hidden="true" className="absolute left-3 right-3 top-[9px] h-1.5 rounded-full bg-[var(--rail)]" />
              <span
                aria-hidden="true"
                className="absolute left-3 top-[9px] h-1.5 rounded-full transition-[width] duration-150"
                style={{ width: `calc((100% - 24px) * ${trainPct / 100})`, background: line.color }}
              />
              <span
                className="absolute -top-[18px] transition-[left] duration-150"
                style={{ left: `clamp(0px, calc(12px + (100% - 24px) * ${trainPct / 100} - 32px), calc(100% - 64px))` }}
              >
                <TransitTrain color={line.color} />
              </span>
              <ol className="relative flex justify-between">
              {line.stops.map((slug, i) => {
                const stopArticle = getArticle(slug);
                const info = getStopInfo(slug);
                const label = vi ? info.shortVi : info.short;
                return (
                  <li key={slug} className="relative flex w-6 flex-col items-center gap-2.5">
                    <Link
                      href={`/writing/${slug}`}
                      className="toon-station block"
                      aria-label={`${tt.stop} ${i + 1}: ${stopArticle ? label : slug}`}
                      aria-current={i === stopIndex ? "page" : undefined}
                    >
                      <StationDot color={line.color} current={i === stopIndex} interchange={i !== stopIndex && Boolean(getInterchange(slug))} />
                    </Link>
                    <span className="font-mono text-[11px] text-[var(--subtle)]">0{i + 1}</span>
                  </li>
                );
              })}
              </ol>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="mt-14 flex flex-wrap items-end gap-10">
          <div className="min-w-0 flex-[999_1_600px]">
            <Sticker color={lineColor}>
              {line ? `${tt.stop.toUpperCase()} ${stopLabel} · ` : ""}
              {(vi ? editorial.formatVi : editorial.format).toUpperCase()}
            </Sticker>
            <h1 className="font-display mt-7 text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[68px]">
              <span className="toon-pop">{articleTitle}</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">{articleSummary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5 font-mono text-xs">
              <span className="rounded-full border-2 border-[var(--rail)] px-3 py-1.5 text-[var(--muted)]">{article.date}</span>
              <span className="rounded-full border-2 border-[var(--rail)] px-3 py-1.5 text-[var(--muted)]">{article.readTime}</span>
              <span className="rounded-full border-2 border-[var(--rail)] px-3 py-1.5 text-[var(--muted)]">{vi ? editorial.seriesVi : editorial.series}</span>
              {article.repositoryUrl && (
                <a
                  href={article.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="toon-btn inline-flex items-center gap-1.5 rounded-full bg-[var(--paper)] px-3 py-1.5 font-bold"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  {article.repositoryUrl.replace("https://github.com/", "")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="font-mono text-xs text-[var(--subtle)]">#{tag}</span>
              ))}
            </div>
          </div>
          <div className="hidden max-w-[240px] flex-[1_1_200px] md:block">
            <HoanBot size="sm" message={tt.botArticle} label={t.nav.askAi} onClick={handleOpenAI} />
          </div>
        </header>

        {/* Key insights */}
        <div className="toon relative mt-12 p-6 pt-8 sm:p-7 sm:pt-9">
          <Sticker color="var(--line-a)" className="absolute -top-4 left-5">{t.writing.keyInsights}</Sticker>
          <p className="text-base leading-relaxed sm:text-lg">
            {vi ? `${editorial.formatVi}: ${articleSummary}` : `${editorial.format}: ${article.summary}`}
          </p>
        </div>

        {/* Hero image */}
        {article.heroImage && (
          <figure className="toon mt-12 overflow-hidden p-2 sm:p-4">
            <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-950 sm:h-96 md:h-[420px]">
              <Image src={article.heroImage} alt={articleTitle} fill className="object-contain p-2 sm:p-4" sizes="(max-width: 1200px) 100vw, 1200px" priority />
              <button
                type="button"
                onClick={() => setImageModalOpen(true)}
                className="toon-btn absolute bottom-3 right-3 flex min-h-10 items-center gap-1.5 rounded-lg bg-[var(--paper)] px-3 font-mono text-xs font-bold"
                aria-label="Expand architecture image"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Zoom</span>
              </button>
            </div>
            {(article.heroImageCaption || article.heroImageCaptionVi) && (
              <figcaption className="mt-3 text-center font-mono text-xs text-[var(--muted)]">
                {vi && article.heroImageCaptionVi ? article.heroImageCaptionVi : article.heroImageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Body + sidebar */}
        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12">
          <article className="space-y-16 text-[17px] leading-8 text-zinc-700 dark:text-zinc-300 lg:col-span-8">
            {article.highlights && article.highlights.length > 0 && (
              <section id="highlights" className="space-y-6">
                <h2 className={H2}>{vi ? "Chỉ số kiến trúc nổi bật" : "Architectural highlights"}</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {article.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border-2 border-[var(--ink)] bg-[var(--paper)] p-4"
                      style={{ boxShadow: `4px 4px 0 ${["var(--line-a)", "var(--line-b)", "#38BDF8", "#F472B6"][idx % 4]}` }}
                    >
                      <div className="font-display text-xl font-bold tracking-tight text-[var(--ink)] sm:text-2xl">{item.value}</div>
                      <div className="mt-1 text-xs font-semibold leading-snug text-[var(--ink)]">{vi && item.labelVi ? item.labelVi : item.label}</div>
                      <div className="mt-1 text-[11px] leading-tight text-[var(--muted)]">{vi && item.detailVi ? item.detailVi : item.detail}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section id="context" className="space-y-5">
              <h2 className={H2}>{t.writing.problemContext}</h2>
              <p>{problemStatement}</p>
            </section>

            {article.comparison && (
              <section id="comparison" className="space-y-6">
                <h2 className={H2}>{vi ? "So sánh kiến trúc" : "Naive approach vs. engineered"}</h2>
                <div className="grid grid-cols-1 gap-6 text-[15px] leading-relaxed md:grid-cols-2">
                  <div className="rounded-2xl border-2 border-[var(--ink)] bg-[var(--paper)] p-6" style={{ boxShadow: "5px 5px 0 #FB923C" }}>
                    <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                      ✕ {vi && article.comparison.naiveTitleVi ? article.comparison.naiveTitleVi : article.comparison.naiveTitle}
                    </p>
                    <ul className="list-disc space-y-2 pl-5">
                      {(vi && article.comparison.naivePointsVi ? article.comparison.naivePointsVi : article.comparison.naivePoints).map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border-2 border-[var(--ink)] bg-[var(--paper)] p-6" style={{ boxShadow: "5px 5px 0 var(--line-a)" }}>
                    <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      ✓ {vi && article.comparison.solutionTitleVi ? article.comparison.solutionTitleVi : article.comparison.solutionTitle}
                    </p>
                    <ul className="list-disc space-y-2 pl-5">
                      {(vi && article.comparison.solutionPointsVi ? article.comparison.solutionPointsVi : article.comparison.solutionPoints).map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {DiagramComponent ? (
              <section id="architecture-diagram" className="scroll-mt-28">
                <DiagramComponent caption={articleTitle} />
              </section>
            ) : article.architectureDiagram ? (
              <section id="architecture-diagram" className="space-y-5">
                <h2 className={H2}>{vi ? "Sơ đồ hệ thống" : "System topology"}</h2>
                <div className="toon overflow-x-auto bg-[#09090B] p-5 font-mono text-xs leading-relaxed text-emerald-400">
                  <pre>{article.architectureDiagram}</pre>
                </div>
              </section>
            ) : null}

            <section id="design" className="space-y-5">
              <h2 className={H2}>{t.writing.architecturalSolution}</h2>
              <p>{architectureDesign}</p>
            </section>

            <section id="decisions" className="space-y-6">
              <h2 className={H2}>{t.writing.technicalDecisions}</h2>
              <ol className="space-y-5">
                {technicalDecisions.map((decision, idx) => (
                  <li key={idx} className="grid grid-cols-[48px_minmax(0,1fr)] items-start gap-4">
                    <span className="toon-sm font-display flex h-10 w-10 items-center justify-center rounded-full bg-[var(--line-a)] text-[15px] font-bold text-[#09090B]">
                      {idx + 1}
                    </span>
                    <span className="text-base leading-relaxed">{decision}</span>
                  </li>
                ))}
              </ol>
            </section>

            {article.sections?.map((sec) => {
              const secTitle = vi && sec.titleVi ? sec.titleVi : sec.title;
              const secContent = vi && sec.contentVi ? sec.contentVi : sec.content;
              const calloutText = sec.callout ? (vi && sec.callout.textVi ? sec.callout.textVi : sec.callout.text) : null;
              const style = CALLOUT_STYLES[sec.callout?.type ?? "info"];
              return (
                <section key={sec.id} id={sec.id} className="space-y-5">
                  <h2 className={H2}>{secTitle}</h2>
                  <p className="whitespace-pre-line">{secContent}</p>
                  {calloutText && (
                    <aside
                      className={`relative mt-8 rounded-2xl border-2 border-[var(--ink)] px-6 pb-5 pt-7 text-base leading-relaxed text-[var(--ink)] ${style.bg}`}
                      style={{ boxShadow: `5px 5px 0 ${style.accent}` }}
                    >
                      <Sticker color={style.accent} className="absolute -top-4 left-5 !text-[11px]">
                        {(vi ? style.labelVi : style.label).toUpperCase()}
                      </Sticker>
                      {calloutText}
                    </aside>
                  )}
                </section>
              );
            })}

            {article.content.codeSnippet && (
              <section id="implementation" className="space-y-6">
                <h2 className={H2}>{t.writing.codeImplementation}</h2>
                <figure className="toon overflow-hidden !bg-[#0C0C0E]">
                  <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[var(--ink)] bg-zinc-900 px-4 py-2.5 font-mono text-xs text-zinc-300">
                    <span className="flex min-w-0 items-center gap-2">
                      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-orange-400" />
                      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <Terminal className="ml-2 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                      <span className="truncate font-semibold text-zinc-100">{article.content.codeSnippet.title}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="uppercase text-zinc-400">{article.content.codeSnippet.language}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(article.content.codeSnippet!.code)}
                        className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border-2 border-zinc-100 bg-emerald-500 px-2.5 font-bold text-zinc-950"
                      >
                        {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copiedCode ? "Copied" : "Copy"}
                      </button>
                    </span>
                  </figcaption>
                  <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-zinc-200 sm:text-[13px]">
                    <code>{article.content.codeSnippet.code}</code>
                  </pre>
                </figure>
              </section>
            )}

            {verifiedEvidence.length > 0 && (
              <section id="evidence" className="space-y-6">
                <h2 className={H2}>{vi ? "Bằng chứng kỹ thuật" : "Verified repository evidence"}</h2>
                <div className="space-y-4">
                  {verifiedEvidence.map((ev) => (
                    <div key={ev.id} className="toon-sm space-y-2 rounded-2xl bg-[var(--paper)] p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-md bg-[var(--line-a)] px-2 py-0.5 font-mono text-[11px] font-bold text-[#09090B]">
                          {ev.category.toUpperCase()} · {ev.confidence.toUpperCase()}
                        </span>
                        {ev.evidence[0]?.repository && (
                          <a
                            href={ev.evidence[0].repository}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 font-mono text-xs text-[var(--muted)] hover:text-[var(--ink)]"
                          >
                            {ev.evidence[0].repository.replace("https://github.com/", "")}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-[15px] font-medium leading-relaxed text-[var(--ink)]">{vi ? ev.claimVi : ev.claim}</p>
                      {ev.evidence[0]?.description && (
                        <p className="font-mono text-xs text-[var(--muted)]">↳ {ev.evidence[0].description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {article.embeds && article.embeds.length > 0 && (
              <section id="media-embeds" className="space-y-6">
                <h2 className={H2}>{vi ? "Tư liệu & video thực tế" : "Media & practical records"}</h2>
                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
                  {article.embeds.map((emb, idx) => {
                    const title = vi && emb.titleVi ? emb.titleVi : emb.title;
                    const caption = vi && emb.captionVi ? emb.captionVi : emb.caption;
                    if (emb.type === "youtube") {
                      const ytId = emb.url?.replace(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/, "$1") || "ASVxal2cwXo";
                      return (
                        <div key={idx} className="toon space-y-3 p-4 md:col-span-2">
                          {title && (
                            <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--ink)]">
                              <Play className="h-4 w-4" />
                              {title}
                            </h3>
                          )}
                          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                            <iframe
                              src={emb.src || `https://www.youtube-nocookie.com/embed/${ytId}`}
                              title={title || "YouTube video"}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="absolute inset-0 h-full w-full border-0"
                            />
                          </div>
                          {caption && <p className="font-mono text-xs italic text-[var(--muted)]">{caption}</p>}
                        </div>
                      );
                    }
                    if (emb.type === "facebook-video") {
                      return (
                        <div key={idx} className="toon flex flex-col items-center space-y-3 p-4">
                          {title && (
                            <h3 className="flex items-center gap-2 self-start text-sm font-bold text-[var(--ink)]">
                              <Video className="h-4 w-4" />
                              {title}
                            </h3>
                          )}
                          <div className="flex h-[476px] w-[267px] max-w-full justify-center overflow-hidden rounded-xl bg-black">
                            <iframe
                              src={emb.src}
                              title={title || "Facebook video"}
                              width="267"
                              height="476"
                              style={{ border: "none", overflow: "hidden" }}
                              scrolling="no"
                              allowFullScreen
                              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            />
                          </div>
                          {caption && <p className="text-center font-mono text-xs italic text-[var(--muted)]">{caption}</p>}
                        </div>
                      );
                    }
                    return (
                      <div key={idx} className="toon flex flex-col items-center space-y-3 overflow-hidden p-4">
                        {title && (
                          <h3 className="flex items-center gap-2 self-start text-sm font-bold text-[var(--ink)]">
                            <ExternalLink className="h-4 w-4" />
                            {title}
                          </h3>
                        )}
                        <div className="flex w-full max-w-[500px] justify-center overflow-hidden rounded-xl bg-black/5 dark:bg-white/5">
                          <iframe
                            src={emb.src}
                            title={title || "Embedded post"}
                            width={emb.width || "500"}
                            height={emb.height || "250"}
                            style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
                            scrolling="no"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          />
                        </div>
                        {caption && <p className="text-center font-mono text-xs italic text-[var(--muted)]">{caption}</p>}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            <section id="takeaways" className="space-y-5">
              <h2 className={H2}>{t.writing.keyTakeaways}</h2>
              <ul className="space-y-3">
                {keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="mt-1.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>

            {relatedProject && (
              <div className="toon flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <div>
                  <span className="mb-1 block font-mono text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Related system</span>
                  <h3 className="font-display text-lg font-bold text-[var(--ink)]">{vi && relatedProject.titleVi ? relatedProject.titleVi : relatedProject.title}</h3>
                  <p className="mt-1 line-clamp-1 text-sm text-[var(--muted)]">{vi && relatedProject.subtitleVi ? relatedProject.subtitleVi : relatedProject.subtitle}</p>
                </div>
                <Link
                  href={`/projects/${relatedProject.id}`}
                  className="toon-btn inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-[var(--line-a)] px-4 text-sm font-bold text-[#09090B]"
                >
                  {t.selectedWork.viewArchitecture}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}

            {/* Where to next */}
            <section aria-label={tt.endOfStop} className="pt-4">
              <p className="font-hand mb-6 -rotate-2 text-[34px]" style={{ color: "var(--line-b)" }}>
                {nextArticle ? tt.endOfStop : tt.endOfLine}
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {nextArticle && (
                  <Link href={`/writing/${nextArticle.slug}`} className="toon toon-lift flex flex-col gap-3.5 overflow-hidden p-6">
                    <span className="font-mono text-xs font-bold" style={{ color: lineColor }}>
                      {tt.nextStop.toUpperCase()}
                      {line ? ` · ${line.id} · 0${stopIndex + 2}` : ""} →
                    </span>
                    <span className="font-display text-xl font-bold leading-tight text-[var(--ink)]">
                      {vi && nextArticle.titleVi ? nextArticle.titleVi : nextArticle.title}
                    </span>
                    <TransitTrain color={lineColor} smoke={false} className="mt-1 w-16" />
                  </Link>
                )}
                {transfers.map((tr) => {
                  const trPos = getLinePosition(tr.slug);
                  return (
                    <Link key={tr.slug} href={`/writing/${tr.slug}`} className="toon toon-lift flex flex-col gap-3.5 p-6">
                      <span className="font-mono text-xs font-bold" style={{ color: trPos?.line.color }}>
                        ⇄ {tt.changeHere.toUpperCase()}
                        {trPos ? ` · ${trPos.line.id} · 0${trPos.index + 1}` : ""}
                      </span>
                      <span className="font-display text-xl font-bold leading-tight text-[var(--ink)]">{vi && tr.titleVi ? tr.titleVi : tr.title}</span>
                      {interchange && (
                        <span className="font-hand text-[22px] text-[var(--muted)]">
                          {vi ? interchange.topicVi : interchange.topic}: {tt.sameProblem.replace("⇄ = ", "")}
                        </span>
                      )}
                    </Link>
                  );
                })}
                {prevArticle && (
                  <Link href={`/writing/${prevArticle.slug}`} className="toon toon-lift flex flex-col gap-3.5 p-6">
                    <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[var(--muted)]">
                      <ArrowLeft className="h-3.5 w-3.5" />
                      {tt.prevStop.toUpperCase()}
                    </span>
                    <span className="font-display text-lg font-bold leading-tight text-[var(--ink)]">
                      {vi && prevArticle.titleVi ? prevArticle.titleVi : prevArticle.title}
                    </span>
                  </Link>
                )}
                <Link href="/writing" className="toon toon-lift flex flex-col justify-center gap-2 p-6">
                  <span className="font-mono text-xs font-bold text-[var(--muted)]">← {tt.lineOverview.toUpperCase()}</span>
                  <span className="font-display text-lg font-bold text-[var(--ink)]">{line ? (vi ? line.nameVi : line.name) : t.writing.backToWriting}</span>
                </Link>
              </div>
            </section>

            <RecruiterCard />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="space-y-10 lg:sticky lg:top-28">
              <nav aria-label={tt.stationsOnPage} className="toon p-5">
                <h2 className="mb-4 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  <span>{tt.stationsOnPage}</span>
                  <span>{Math.round(readingProgress)}%</span>
                </h2>
                <ol className="relative max-h-[50vh] space-y-1 overflow-y-auto bg-[linear-gradient(var(--rail),var(--rail))] bg-[length:4px_calc(100%-24px)] bg-[position:7px_12px] bg-no-repeat">
                  {tocItems.map((item, idx) => {
                    const passed = idx <= activeIndex && activeSectionId !== "";
                    const isActive = item.id === activeSectionId;
                    return (
                      <li key={item.id} className="relative">
                        <a
                          href={`#${item.id}`}
                          aria-current={isActive ? "location" : undefined}
                          className={`flex min-h-9 items-center gap-3 text-sm transition-colors ${isActive ? "font-bold text-[var(--ink)]" : passed ? "text-[var(--ink)]" : "text-[var(--muted)] hover:text-[var(--ink)]"}`}
                        >
                          <span
                            aria-hidden="true"
                            className="relative block h-[18px] w-[18px] shrink-0 rounded-full"
                            style={{ border: `4px solid ${passed ? "var(--ink)" : lineColor}`, background: passed ? lineColor : "var(--paper)" }}
                          />
                          <span className="line-clamp-1">{item.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>
              <RecruiterCard variant="compact" />
            </div>
          </aside>
        </div>
      </div>

      {imageModalOpen && article.heroImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setImageModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={articleTitle}
        >
          <div className="relative flex h-[80vh] max-h-[90vh] w-full max-w-5xl items-center justify-center">
            <Image src={article.heroImage} alt={articleTitle} fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}

      <AskAIFloatingButton onClick={handleOpenAI} />
      {aiModalOpen && <AskAIModal isOpen={aiModalOpen} onClose={handleCloseAI} />}
      <Footer />
    </main>
  );
}

export function ArticleClientView({ article }: ArticleClientViewProps) {
  return <ArticleReader article={article} />;
}

export default ArticleClientView;
