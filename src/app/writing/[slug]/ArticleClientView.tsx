"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { SiteShell } from "@/components/layout/SiteShell";
import { ArticleMarkdown } from "@/components/common/ArticleMarkdown";
import { UI_TRANSLATIONS } from "@/data/translations";
import { PROJECTS_DATA, ARTICLES_DATA } from "@/data/portfolioData";
import { ENGINEERING_EVIDENCE } from "@/data/engineeringEvidence";
import { getArticleEditorial } from "@/data/articleEditorial";
import { DIAGRAM_MAP } from "@/components/diagrams/ArchitectureDiagrams";
import { useLanguage } from "@/context/LanguageContext";
import { getArticle, getLinePosition } from "@/data/transitMap";
import { PageDots, SeeAlso, chapterNumber, pageNumber } from "@/components/writing/Notebook";
import { RecruiterCard } from "@/components/writing/RecruiterCard";

interface ArticleClientViewProps {
  article: Article;
}

const NOTE_TINTS = ["var(--note)", "var(--accent-soft)", "var(--paper-2)", "var(--note)"];
const NOTE_TILTS = [-2, 1.5, -1, 2];

function ArticleReader({ article }: ArticleClientViewProps) {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const nb = t.writing.notebook;
  const vi = language === "vi";
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>("");

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

  // Chapter and page in the notebook; articles outside a chapter fall back to list order.
  const position = getLinePosition(article.slug);
  const line = position?.line ?? null;
  const pageIndex = position?.index ?? 0;
  const currentIndex = ARTICLES_DATA.findIndex((a) => a.slug === article.slug);
  const prevArticle = line
    ? (pageIndex > 0 ? getArticle(line.stops[pageIndex - 1]) : null) ?? null
    : currentIndex > 0 ? ARTICLES_DATA[currentIndex - 1] : null;
  const nextArticle = line
    ? (pageIndex < line.stops.length - 1 ? getArticle(line.stops[pageIndex + 1]) : null) ?? null
    : currentIndex < ARTICLES_DATA.length - 1 ? ARTICLES_DATA[currentIndex + 1] : null;

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

  const activeIndex = tocItems.findIndex((i) => i.id === activeSectionId);
  const h2 = "scroll-mt-24 text-2xl sm:text-3xl mb-5";
  const projectLabel = article.project
    ? article.project === "arda" ? "ARDA Labs" : article.project === "puchi" ? "Puchidemy" : article.project.toUpperCase()
    : null;
  const calloutLabel = (type?: string) => (type === "warning" ? `! ${nb.warning}` : type === "tip" ? `✎ ${nb.tip}` : `✎ ${nb.note}`);

  return (
    <SiteShell>
      <div
        className="fixed left-0 right-0 top-0 z-50 h-1.5"
        role="progressbar"
        aria-label={t.writing.readingProgress}
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full rounded-r-full bg-marker" style={{ width: `${readingProgress}%` }} />
      </div>

      <div className="page-wrap pb-24 pt-10">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center justify-between gap-4 text-sm text-muted">
          <div className="flex min-w-0 items-center gap-2">
            <Link href="/" className="link">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/writing" className="link">{t.nav.writing}</Link>
          </div>
          <button type="button" onClick={handleShare} className="hand shrink-0 text-lg hover:text-ink">
            {copiedShare ? (vi ? "đã copy link!" : "link copied!") : `✎ ${t.writing.shareNote}`}
          </button>
        </nav>

        {line && (
          <div className="mb-10 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link href="/writing" className="hand text-xl hover:text-ink">
              {nb.chapter} {chapterNumber(line)} · {vi ? line.nameVi : line.name}
            </Link>
            <PageDots line={line} current={pageIndex} language={language} />
            <span className="hand text-lg text-faint">
              {nb.page} {pageIndex + 1} {nb.of} {line.stops.length} · {nb.read} {Math.round(readingProgress)}%
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
          {/* Margin: checklist TOC and the hiring note */}
          <aside className="order-2 lg:order-none lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <div className="space-y-10 lg:sticky lg:top-24">
              <nav aria-label={t.writing.tableOfContents}>
                <p className="hand mb-2 text-xl">{nb.onThisPage}</p>
                <ol className="space-y-0.5">
                  {tocItems.map((item, idx) => {
                    const isActive = activeSectionId === item.id;
                    const done = activeIndex > -1 && idx < activeIndex;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          aria-current={isActive ? "true" : undefined}
                          className={`flex min-h-9 items-center gap-2 text-[15px] ${
                            isActive ? "mark font-bold text-ink" : done ? "text-faint line-through" : "text-muted hover:text-ink"
                          }`}
                        >
                          <span aria-hidden="true" className={`hand w-5 text-lg ${isActive || done ? "text-accent" : "text-faint"}`}>
                            {done ? "☑" : isActive ? "✎" : "☐"}
                          </span>
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>
              <RecruiterCard variant="compact" />
            </div>
          </aside>

          <div className="order-1 min-w-0 lg:order-none lg:col-start-2">
            <header className="mb-10 max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-wide text-faint">
                {[article.date, article.updated ? `${vi ? "Cập nhật" : "Updated"} ${article.updated}` : null, article.readTime, projectLabel, vi ? editorial.formatVi : editorial.format]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <h1 className="mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl">{articleTitle}</h1>
              <p className="mt-5 text-lg text-muted">{articleSummary}</p>
              <p className="hand mt-4 text-lg">
                {article.repositoryUrl && (
                  <>
                    <a href={article.repositoryUrl} target="_blank" rel="noopener noreferrer" className="link">
                      ✎ {article.repositoryUrl.replace("https://github.com/", "")}
                    </a>
                    {" · "}
                  </>
                )}
                <span className="text-faint">{article.tags.map((tag) => `#${tag}`).join(" ")}</span>
              </p>
            </header>

            {article.heroImage && (
              <figure className="mb-12">
                <div className="note relative h-64 w-full p-3 sm:h-96" style={{ transform: "rotate(-0.5deg)" }}>
                  <div className="relative h-full w-full bg-paper">
                    <Image src={article.heroImage} alt={articleTitle} fill className="object-contain p-2" sizes="(max-width: 1200px) 100vw, 1200px" priority />
                  </div>
                </div>
                <figcaption className="hand mt-3 flex items-start justify-between gap-4 text-lg text-faint">
                  <span>
                    {nb.figure} 1 —{" "}
                    {(article.heroImageCaption || article.heroImageCaptionVi) &&
                      (vi && article.heroImageCaptionVi ? article.heroImageCaptionVi : article.heroImageCaption)}
                  </span>
                  <button type="button" onClick={() => setImageModalOpen(true)} className="link shrink-0" aria-label="Expand architecture image">
                    zoom
                  </button>
                </figcaption>
              </figure>
            )}

            <article className="prose-editorial max-w-3xl space-y-14">
              {article.highlights && article.highlights.length > 0 && (
                <section id="highlights" className="scroll-mt-24">
                  <h2 className={h2}>{vi ? "Chỉ số kiến trúc nổi bật" : "At a glance"}</h2>
                  <div className="mt-8 flex flex-wrap gap-6">
                    {article.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="note note-hover w-[13.5rem] px-4 pb-4 pt-6"
                        style={{ transform: `rotate(${NOTE_TILTS[idx % 4]}deg)`, background: NOTE_TINTS[idx % 4] }}
                      >
                        <p className="m-0 text-3xl font-extrabold tracking-tight text-ink">{item.value}</p>
                        <p className="m-0 mt-1 text-sm leading-snug text-ink">{vi && item.labelVi ? item.labelVi : item.label}</p>
                        {(vi && item.detailVi ? item.detailVi : item.detail) && (
                          <p className="hand m-0 mt-1 text-base">{vi && item.detailVi ? item.detailVi : item.detail}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <aside className="sketch relative px-5 pb-4 pt-6">
                <p className="hand absolute -top-3.5 left-4 m-0 bg-paper px-2 text-lg">✎ {t.writing.keyInsights}</p>
                <p className="m-0 text-[15px] text-ink">
                  {vi ? `${editorial.formatVi}: ${article.summaryVi || article.summary}` : `${editorial.format}: ${article.summary}`}
                </p>
              </aside>

              <section id="context" className="scroll-mt-24">
                <h2 className={h2}>{t.writing.problemContext}</h2>
                <p>{problemStatement}</p>
              </section>

              {article.comparison && (
                <section id="comparison" className="scroll-mt-24">
                  <h2 className={h2}>{vi ? "So sánh kiến trúc" : "Naive approach vs. engineered"}</h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="sketch p-5">
                      <p className="hand m-0 mb-2 text-lg text-danger">
                        ✕ {vi && article.comparison.naiveTitleVi ? article.comparison.naiveTitleVi : article.comparison.naiveTitle}
                      </p>
                      <ul className="m-0 list-none space-y-2 p-0 text-sm text-muted">
                        {(vi && article.comparison.naivePointsVi ? article.comparison.naivePointsVi : article.comparison.naivePoints).map((pt, i) => (
                          <li key={i} className="flex gap-2">
                            <span aria-hidden="true" className="hand text-danger">–</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="sketch-alt bg-marker/25 p-5">
                      <p className="hand m-0 mb-2 text-lg">
                        ✓ {vi && article.comparison.solutionTitleVi ? article.comparison.solutionTitleVi : article.comparison.solutionTitle}
                      </p>
                      <ul className="m-0 list-none space-y-2 p-0 text-sm text-ink">
                        {(vi && article.comparison.solutionPointsVi ? article.comparison.solutionPointsVi : article.comparison.solutionPoints).map((pt, i) => (
                          <li key={i} className="flex gap-2">
                            <span aria-hidden="true" className="hand text-accent">+</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {DiagramComponent ? (
                <section id="architecture-diagram" className="scroll-mt-24">
                  <DiagramComponent caption={articleTitle} />
                </section>
              ) : article.architectureDiagram ? (
                <section id="architecture-diagram" className="scroll-mt-24">
                  <h2 className={h2}>{vi ? "Sơ đồ hệ thống" : "System topology"}</h2>
                  <pre className="code-paper text-xs">{article.architectureDiagram}</pre>
                </section>
              ) : null}

              <section id="design" className="scroll-mt-24">
                <h2 className={h2}>{t.writing.architecturalSolution}</h2>
                <p>{architectureDesign}</p>
              </section>

              <section id="decisions" className="scroll-mt-24">
                <h2 className={h2}>{t.writing.technicalDecisions}</h2>
                <ol className="m-0 list-none space-y-4 p-0">
                  {technicalDecisions.map((decision, idx) => (
                    <li key={idx} className="m-0 grid grid-cols-[2.75rem_1fr] items-start gap-3">
                      <span
                        className="hand flex h-10 w-10 items-center justify-center border-2 border-ink text-xl text-ink"
                        style={{ borderRadius: "50% 45% 55% 50%" }}
                      >
                        {idx + 1}
                      </span>
                      <span className="pt-1.5">{decision}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {article.sections?.map((sec) => {
                const secTitle = vi && sec.titleVi ? sec.titleVi : sec.title;
                const secContent = vi && sec.contentVi ? sec.contentVi : sec.content;
                const calloutText = sec.callout ? (vi && sec.callout.textVi ? sec.callout.textVi : sec.callout.text) : null;
                return (
                  <section key={sec.id} id={sec.id} className="scroll-mt-24">
                    <h2 className={h2}>{secTitle}</h2>
                    <ArticleMarkdown>{secContent}</ArticleMarkdown>
                    {calloutText && (
                      <aside className="sketch relative mt-8 px-5 pb-4 pt-6 text-[15px]">
                        <p className={`hand absolute -top-3.5 left-4 m-0 bg-paper px-2 text-lg ${sec.callout?.type === "warning" ? "text-danger" : ""}`}>
                          {calloutLabel(sec.callout?.type)}
                        </p>
                        <p className="m-0">{calloutText}</p>
                      </aside>
                    )}
                  </section>
                );
              })}

              {article.content.codeSnippet && (
                <section id="implementation" className="scroll-mt-24">
                  <h2 className={h2}>{t.writing.codeImplementation}</h2>
                  <figure className="relative m-0" style={{ transform: "rotate(-0.4deg)" }}>
                    <span aria-hidden="true" className="absolute -top-2.5 left-6 z-10 h-5 w-16 -rotate-3 bg-marker/70" />
                    <span aria-hidden="true" className="absolute -top-2.5 right-6 z-10 h-5 w-16 rotate-3 bg-marker/70" />
                    <div className="code-paper p-0">
                      <figcaption className="flex items-center justify-between gap-4 px-4 pt-4 font-mono text-xs text-faint">
                        <span className="truncate">
                          {article.content.codeSnippet.title} · {article.content.codeSnippet.language}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(article.content.codeSnippet!.code)}
                          className="hand sketch shrink-0 px-3 text-base text-ink"
                          aria-label="Copy code"
                        >
                          {copiedCode ? nb.copied : nb.copy}
                        </button>
                      </figcaption>
                      <pre className="m-0 overflow-x-auto bg-transparent px-4 pb-5 pt-3 text-xs shadow-none sm:text-sm">
                        <code>{article.content.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </figure>
                </section>
              )}

              {verifiedEvidence.length > 0 && (
                <section id="evidence" className="scroll-mt-24">
                  <h2 className={h2}>{vi ? "Bằng chứng kỹ thuật" : "Verified repository evidence"}</h2>
                  <ul className="m-0 list-none space-y-5 p-0">
                    {verifiedEvidence.map((ev) => (
                      <li key={ev.id} className="m-0 border-l-4 border-marker pl-4">
                        <p className="hand m-0 text-base">
                          {ev.category} · {ev.confidence}
                        </p>
                        <p className="m-0 text-ink">{vi ? ev.claimVi : ev.claim}</p>
                        {ev.evidence[0]?.description && <p className="m-0 mt-1 font-mono text-xs text-muted">↳ {ev.evidence[0]?.description}</p>}
                        {ev.evidence[0]?.repository && (
                          <a href={ev.evidence[0].repository} target="_blank" rel="noopener noreferrer" className="link font-mono text-xs">
                            {ev.evidence[0].repository.replace("https://github.com/", "")} ↗
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {article.embeds && article.embeds.length > 0 && (
                <section id="media-embeds" className="scroll-mt-24">
                  <h2 className={h2}>{vi ? "Tư liệu & video thực tế" : "Media & practical records"}</h2>
                  <div className="space-y-10">
                    {article.embeds.map((emb, idx) => {
                      const title = vi && emb.titleVi ? emb.titleVi : emb.title;
                      const caption = vi && emb.captionVi ? emb.captionVi : emb.caption;
                      const frame = (inner: React.ReactNode) => (
                        <figure key={idx} className="m-0">
                          {title && <p className="hand m-0 mb-2 text-lg">{title}</p>}
                          {inner}
                          {caption && <figcaption className="hand mt-2 text-base text-faint">{caption}</figcaption>}
                        </figure>
                      );
                      if (emb.type === "youtube") {
                        const ytId = emb.url?.replace(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/, "$1") || "ASVxal2cwXo";
                        return frame(
                          <div className="note relative aspect-video w-full p-2">
                            <iframe
                              src={emb.src || `https://www.youtube-nocookie.com/embed/${ytId}`}
                              title={title || "YouTube video"}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="h-full w-full border-0"
                            />
                          </div>
                        );
                      }
                      if (emb.type === "facebook-video") {
                        return frame(
                          <div className="note flex h-[476px] w-[267px] max-w-full justify-center overflow-hidden">
                            <iframe
                              src={emb.src}
                              width="267"
                              height="476"
                              title={title || "Video"}
                              style={{ border: "none", overflow: "hidden" }}
                              scrolling="no"
                              allowFullScreen
                              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            />
                          </div>
                        );
                      }
                      return frame(
                        <div className="note flex w-full max-w-[500px] justify-center overflow-hidden">
                          <iframe
                            src={emb.src}
                            width={emb.width || "500"}
                            height={emb.height || "250"}
                            title={title || "Embedded media"}
                            style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
                            scrolling="no"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          />
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              <section id="takeaways" className="scroll-mt-24">
                <h2 className={h2}>{t.writing.keyTakeaways}</h2>
                <ul className="m-0 list-none space-y-3 p-0">
                  {keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="m-0 flex gap-3">
                      <span aria-hidden="true" className="hand text-xl text-accent">☑</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </article>

            {relatedProject && (
              <aside className="sketch mt-14 max-w-3xl px-6 py-5">
                <p className="hand text-lg">{vi ? "hệ thống liên quan" : "related system"}</p>
                <h3 className="text-xl">{vi && relatedProject.titleVi ? relatedProject.titleVi : relatedProject.title}</h3>
                <p className="mt-1 text-sm text-muted">{vi && relatedProject.subtitleVi ? relatedProject.subtitleVi : relatedProject.subtitle}</p>
                <Link href={`/projects/${relatedProject.id}`} className="link mt-3 inline-block text-sm">
                  {t.selectedWork.viewArchitecture} →
                </Link>
              </aside>
            )}

            {/* Turn the page, or follow a "see also" arrow to another chapter */}
            <nav aria-label="Article navigation" className="mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
              {prevArticle ? (
                <Link href={`/writing/${prevArticle.slug}`} className="note block px-5 pb-4 pt-6" style={{ transform: "rotate(-1deg)", background: "var(--code-bg)" }}>
                  <span className="hand block text-lg text-faint">
                    ← {nb.prevPage}
                    {pageNumber(prevArticle.slug) ? ` · ${pageNumber(prevArticle.slug)}` : ""}
                  </span>
                  <span className="mt-1 block font-bold leading-snug">{vi && prevArticle.titleVi ? prevArticle.titleVi : prevArticle.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextArticle ? (
                <Link href={`/writing/${nextArticle.slug}`} className="note block px-5 pb-4 pt-6 text-right" style={{ transform: "rotate(1deg)" }}>
                  <span className="hand block text-lg">
                    {nb.nextPage}
                    {pageNumber(nextArticle.slug) ? ` · ${pageNumber(nextArticle.slug)}` : ""} →
                  </span>
                  <span className="mt-1 block font-bold leading-snug">{vi && nextArticle.titleVi ? nextArticle.titleVi : nextArticle.title}</span>
                </Link>
              ) : (
                <Link href="/writing" className="note block px-5 pb-4 pt-6 text-right" style={{ transform: "rotate(1deg)" }}>
                  <span className="hand block text-lg">{nb.endOfChapter} →</span>
                  <span className="mt-1 block font-bold leading-snug">{t.writing.title}</span>
                </Link>
              )}
            </nav>

            <div className="mt-10 max-w-3xl">
              <SeeAlso slug={article.slug} language={language} />
            </div>
          </div>
        </div>
      </div>

      {imageModalOpen && article.heroImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={articleTitle}
          onClick={() => setImageModalOpen(false)}
        >
          <button type="button" onClick={() => setImageModalOpen(false)} aria-label="Close" className="hand absolute right-4 top-4 text-xl text-paper">
            close ✕
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl bg-paper">
            <Image src={article.heroImage} alt={articleTitle} fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </SiteShell>
  );
}

export function ArticleClientView({ article }: ArticleClientViewProps) {
  return <ArticleReader article={article} />;
}

export default ArticleClientView;
