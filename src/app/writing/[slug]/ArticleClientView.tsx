"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { SiteShell } from "@/components/layout/SiteShell";
import { ArticleMarkdown } from "@/components/common/ArticleMarkdown";
import { UI_TRANSLATIONS } from "@/data/translations";
import { PROJECTS_DATA, ARTICLES_DATA, PERSONAL_INFO } from "@/data/portfolioData";
import { ENGINEERING_EVIDENCE } from "@/data/engineeringEvidence";
import { getArticleEditorial } from "@/data/articleEditorial";
import { DIAGRAM_MAP } from "@/components/diagrams/ArchitectureDiagrams";
import { useLanguage } from "@/context/LanguageContext";

interface ArticleClientViewProps {
  article: Article;
}

function ArticleReader({ article }: ArticleClientViewProps) {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  const articleTitle = language === "vi" && article.titleVi ? article.titleVi : article.title;
  const articleSummary = language === "vi" && article.summaryVi ? article.summaryVi : article.summary;
  const problemStatement = language === "vi" && article.content.problemStatementVi ? article.content.problemStatementVi : article.content.problemStatement;
  const architectureDesign = language === "vi" && article.content.architectureDesignVi ? article.content.architectureDesignVi : article.content.architectureDesign;
  const technicalDecisions = language === "vi" && article.content.technicalDecisionsVi ? article.content.technicalDecisionsVi : article.content.technicalDecisions;
  const keyTakeaways = language === "vi" && article.content.keyTakeawaysVi ? article.content.keyTakeawaysVi : article.content.keyTakeaways;
  const editorial = getArticleEditorial(article);

  // Find related project if exists
  const relatedProject = article.relatedProject
    ? PROJECTS_DATA.find((p) => p.id === article.relatedProject)
    : null;

  // Find verified evidence
  const verifiedEvidence = article.evidenceIds
    ? ENGINEERING_EVIDENCE.filter((ev) => article.evidenceIds?.includes(ev.id))
    : [];

  // Next & Previous Articles
  const currentIndex = ARTICLES_DATA.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? ARTICLES_DATA[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES_DATA.length - 1 ? ARTICLES_DATA[currentIndex + 1] : null;
  const otherArticles = ARTICLES_DATA.filter((a) => a.slug !== article.slug).slice(0, 3);

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const DiagramComponent = DIAGRAM_MAP[article.slug] || (article.diagramKey ? DIAGRAM_MAP[article.diagramKey] : null);
  const hasDiagram = Boolean(DiagramComponent);

  const tocItems = useMemo(() => [
    ...(article.highlights && article.highlights.length > 0 ? [{ id: "highlights", label: language === "vi" ? "Chỉ số kiến trúc" : "Key Highlights" }] : []),
    { id: "context", label: t.writing.problemContext },
    ...(article.comparison ? [{ id: "comparison", label: language === "vi" ? "So sánh giải pháp" : "Architecture Comparison" }] : []),
    ...(hasDiagram || article.architectureDiagram ? [{ id: "architecture-diagram", label: language === "vi" ? "Sơ đồ hệ thống" : "Architecture Topology" }] : []),
    { id: "design", label: t.writing.architecturalSolution },
    { id: "decisions", label: t.writing.technicalDecisions },
    ...(article.sections && article.sections.length > 0 ? article.sections.map((s) => ({ id: s.id, label: language === "vi" && s.titleVi ? s.titleVi : s.title })) : []),
    ...(article.content.codeSnippet ? [{ id: "implementation", label: t.writing.codeImplementation }] : []),
    ...(verifiedEvidence.length > 0 ? [{ id: "evidence", label: language === "vi" ? "Bằng chứng Repository" : "Verified Evidence" }] : []),
    ...(article.embeds && article.embeds.length > 0 ? [{ id: "media-embeds", label: language === "vi" ? "Tư liệu & Video thực tế" : "Media & Video Records" }] : []),
    { id: "takeaways", label: t.writing.keyTakeaways },
  ], [article, language, verifiedEvidence.length, hasDiagram, t.writing.architecturalSolution, t.writing.codeImplementation, t.writing.keyTakeaways, t.writing.problemContext, t.writing.technicalDecisions]);

  // Track Reading Progress & Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }

      // Scroll Spy for TOC
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

  const h2 = "text-2xl sm:text-3xl border-t border-rule pt-6 mb-5";
  const projectLabel = article.project
    ? article.project === "arda" ? "ARDA Labs" : article.project === "puchi" ? "Puchidemy" : article.project.toUpperCase()
    : null;

  return (
    <SiteShell>
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[2px]"
        role="progressbar"
        aria-label={t.writing.readingProgress}
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full bg-accent" style={{ width: `${readingProgress}%` }} />
      </div>

      <div className="page-wrap pt-12 pb-24">
        <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4 mb-10 font-mono text-xs text-muted">
          <div className="flex items-center gap-2 min-w-0">
            <Link href="/" className="link">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/writing" className="link">Writing</Link>
          </div>
          <button type="button" onClick={handleShare} className="link shrink-0">
            {copiedShare ? (language === "vi" ? "Đã copy link" : "Link copied") : t.writing.shareNote}
          </button>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[13rem_minmax(0,1fr)] gap-x-12 gap-y-8">
          {/* Table of contents */}
          <aside className="lg:row-start-1 lg:col-start-1 order-2 lg:order-none lg:row-span-2">
            <div className="lg:sticky lg:top-24">
              <p className="eyebrow border-t border-ink pt-3 mb-3">{t.writing.tableOfContents}</p>
              <nav aria-label={t.writing.tableOfContents}>
                <ol className="space-y-1.5 font-mono text-xs">
                  {tocItems.map((item, idx) => {
                    const isActive = activeSectionId === item.id;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          aria-current={isActive ? "true" : undefined}
                          className={`block py-0.5 ${isActive ? "text-ink underline underline-offset-4 decoration-accent" : "text-muted hover:text-ink"}`}
                        >
                          <span className="text-faint mr-2">{String(idx + 1).padStart(2, "0")}</span>
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>
              <p className="mt-4 font-mono text-xs text-faint">{Math.round(readingProgress)}%</p>
            </div>
          </aside>

          <div className="min-w-0 lg:col-start-2 order-1 lg:order-none">
            {/* Header */}
            <header className="border-t border-ink pt-4 pb-8 mb-10 border-b border-b-rule">
              <p className="eyebrow mb-4">
                {[article.date, article.updated ? `${language === "vi" ? "Cập nhật" : "Updated"} ${article.updated}` : null, article.readTime, projectLabel, language === "vi" ? editorial.formatVi : editorial.format]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5">{articleTitle}</h1>
              <p className="text-lg text-muted max-w-2xl">{articleSummary}</p>
              <p className="mt-5 font-mono text-xs text-faint">
                {language === "vi" ? editorial.seriesVi : editorial.series}
                {" · "}
                {article.tags.map((tag) => `#${tag}`).join(" ")}
              </p>
              {article.repositoryUrl && (
                <p className="mt-3 font-mono text-xs">
                  <a href={article.repositoryUrl} target="_blank" rel="noopener noreferrer" className="link">
                    Inspect Source Code ↗
                  </a>
                </p>
              )}
            </header>

            {/* Hero image */}
            {article.heroImage && (
              <figure className="mb-12">
                <div className="relative w-full h-64 sm:h-96 border border-rule bg-paper-2">
                  <Image
                    src={article.heroImage}
                    alt={articleTitle}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority
                  />
                </div>
                <figcaption className="mt-2 flex items-start justify-between gap-4 font-mono text-xs text-muted">
                  <span>
                    {(article.heroImageCaption || article.heroImageCaptionVi) &&
                      (language === "vi" && article.heroImageCaptionVi ? article.heroImageCaptionVi : article.heroImageCaption)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setImageModalOpen(true)}
                    className="link shrink-0"
                    aria-label="Expand architecture image"
                  >
                    Zoom
                  </button>
                </figcaption>
              </figure>
            )}

            <article className="prose-editorial space-y-12">
              {/* At a glance */}
              {article.highlights && article.highlights.length > 0 && (
                <section id="highlights" className="scroll-mt-24">
                  <h2 className={h2}>{language === "vi" ? "Chỉ số Kiến trúc Nổi bật" : "At a glance"}</h2>
                  <dl className="divide-y divide-rule border-y border-rule">
                    {article.highlights.map((item, idx) => (
                      <div key={idx} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6 py-3">
                        <dt className="font-mono text-sm text-ink">{item.value}</dt>
                        <dd className="m-0 text-sm text-muted">
                          <span className="text-ink">{language === "vi" && item.labelVi ? item.labelVi : item.label}</span>
                          {(language === "vi" && item.detailVi ? item.detailVi : item.detail) && (
                            <> — {language === "vi" && item.detailVi ? item.detailVi : item.detail}</>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {/* Key insights callout */}
              <aside className="border-l-2 border-accent bg-accent-soft p-4 not-prose">
                <p className="eyebrow mb-2">{t.writing.keyInsights}</p>
                <p className="text-sm text-ink">
                  {language === "vi"
                    ? `${editorial.formatVi}: ${article.summaryVi || article.summary}`
                    : `${editorial.format}: ${article.summary}`}
                </p>
              </aside>

              {/* Problem */}
              <section id="context" className="scroll-mt-24">
                <h2 className={h2}>{t.writing.problemContext}</h2>
                <p>{problemStatement}</p>
              </section>

              {/* Comparison */}
              {article.comparison && (
                <section id="comparison" className="scroll-mt-24">
                  <h2 className={h2}>{language === "vi" ? "Phân tích So sánh Kiến trúc" : "Architectural Trade-offs: Naive vs Engineered"}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 border border-rule md:divide-x divide-y md:divide-y-0 divide-rule">
                    <div className="p-4">
                      <p className="eyebrow mb-3">
                        {language === "vi" && article.comparison.naiveTitleVi ? article.comparison.naiveTitleVi : article.comparison.naiveTitle}
                      </p>
                      <ul className="space-y-2 text-sm text-muted list-none p-0 m-0">
                        {(language === "vi" && article.comparison.naivePointsVi ? article.comparison.naivePointsVi : article.comparison.naivePoints).map((pt, i) => (
                          <li key={i} className="flex gap-2"><span aria-hidden="true" className="font-mono text-faint">–</span><span>{pt}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4">
                      <p className="eyebrow mb-3 text-accent">
                        {language === "vi" && article.comparison.solutionTitleVi ? article.comparison.solutionTitleVi : article.comparison.solutionTitle}
                      </p>
                      <ul className="space-y-2 text-sm text-ink list-none p-0 m-0">
                        {(language === "vi" && article.comparison.solutionPointsVi ? article.comparison.solutionPointsVi : article.comparison.solutionPoints).map((pt, i) => (
                          <li key={i} className="flex gap-2"><span aria-hidden="true" className="font-mono text-accent">+</span><span>{pt}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {/* Diagram */}
              {DiagramComponent ? (
                <section id="architecture-diagram" className="scroll-mt-24">
                  <DiagramComponent caption={articleTitle} />
                </section>
              ) : article.architectureDiagram ? (
                <section id="architecture-diagram" className="scroll-mt-24">
                  <h2 className={h2}>System Architecture Topology</h2>
                  <pre className="bg-code border border-rule p-4 font-mono text-xs overflow-x-auto">{article.architectureDiagram}</pre>
                </section>
              ) : null}

              {/* Design */}
              <section id="design" className="scroll-mt-24">
                <h2 className={h2}>{t.writing.architecturalSolution}</h2>
                <p>{architectureDesign}</p>
              </section>

              {/* Decisions */}
              <section id="decisions" className="scroll-mt-24">
                <h2 className={h2}>{t.writing.technicalDecisions}</h2>
                <ol className="divide-y divide-rule border-y border-rule list-none p-0 m-0">
                  {technicalDecisions.map((decision, idx) => (
                    <li key={idx} className="grid grid-cols-[2.5rem_1fr] gap-2 py-3 m-0">
                      <span className="font-mono text-xs text-faint pt-1">{String(idx + 1).padStart(2, "0")}</span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Custom sections */}
              {article.sections && article.sections.map((sec) => {
                const secTitle = language === "vi" && sec.titleVi ? sec.titleVi : sec.title;
                const secContent = language === "vi" && sec.contentVi ? sec.contentVi : sec.content;
                const calloutText = sec.callout ? (language === "vi" && sec.callout.textVi ? sec.callout.textVi : sec.callout.text) : null;
                return (
                  <section key={sec.id} id={sec.id} className="scroll-mt-24">
                    <h2 className={h2}>{secTitle}</h2>
                    <ArticleMarkdown>{secContent}</ArticleMarkdown>
                    {calloutText && (
                      <aside className="mt-5 border-l-2 border-accent bg-accent-soft p-4 text-sm text-ink">
                        <p className="eyebrow mb-1">{sec.callout?.type === "warning" ? "Warning" : sec.callout?.type === "tip" ? "Tip" : "Note"}</p>
                        <p className="m-0">{calloutText}</p>
                      </aside>
                    )}
                  </section>
                );
              })}

              {/* Code */}
              {article.content.codeSnippet && (
                <section id="implementation" className="scroll-mt-24">
                  <h2 className={h2}>{t.writing.codeImplementation}</h2>
                  <div className="flex items-center justify-between gap-4 border border-rule border-b-0 bg-code px-4 py-2 font-mono text-xs text-muted">
                    <span className="truncate">{article.content.codeSnippet.title} · {article.content.codeSnippet.language}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(article.content.codeSnippet!.code)}
                      className="link shrink-0"
                      aria-label="Copy code"
                    >
                      {copiedCode ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <pre className="bg-code border border-rule p-4 font-mono text-xs sm:text-sm overflow-x-auto mt-0">
                    <code>{article.content.codeSnippet.code}</code>
                  </pre>
                </section>
              )}

              {/* Evidence */}
              {verifiedEvidence.length > 0 && (
                <section id="evidence" className="scroll-mt-24">
                  <h2 className={h2}>{language === "vi" ? "Bằng chứng Kỹ thuật Khách quan" : "Verified Repository Evidence"}</h2>
                  <ul className="divide-y divide-rule border-y border-rule list-none p-0 m-0">
                    {verifiedEvidence.map((ev) => (
                      <li key={ev.id} className="py-4 m-0">
                        <p className="eyebrow mb-1">{ev.category} · {ev.confidence}</p>
                        <p className="text-ink m-0">{language === "vi" ? ev.claimVi : ev.claim}</p>
                        {ev.evidence[0]?.description && (
                          <p className="mt-1 font-mono text-xs text-muted">↳ {ev.evidence[0]?.description}</p>
                        )}
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

              {/* Embeds */}
              {article.embeds && article.embeds.length > 0 && (
                <section id="media-embeds" className="scroll-mt-24">
                  <h2 className={h2}>{language === "vi" ? "Tư liệu & Video Hoạt động Thực tế" : "Media, Videos & Practical Records"}</h2>
                  <div className="space-y-8">
                    {article.embeds.map((emb, idx) => {
                      const title = language === "vi" && emb.titleVi ? emb.titleVi : emb.title;
                      const caption = language === "vi" && emb.captionVi ? emb.captionVi : emb.caption;

                      if (emb.type === "youtube") {
                        const ytId = emb.url?.replace(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/, "$1") || "ASVxal2cwXo";
                        return (
                          <figure key={idx} className="m-0">
                            {title && <p className="eyebrow mb-2">{title}</p>}
                            <div className="relative aspect-video w-full bg-code border border-rule">
                              <iframe
                                src={emb.src || `https://www.youtube-nocookie.com/embed/${ytId}`}
                                title={title || "YouTube video"}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full border-0"
                              />
                            </div>
                            {caption && <figcaption className="mt-2 font-mono text-xs text-muted">{caption}</figcaption>}
                          </figure>
                        );
                      }

                      if (emb.type === "facebook-video") {
                        return (
                          <figure key={idx} className="m-0">
                            {title && <p className="eyebrow mb-2">{title}</p>}
                            <div className="w-[267px] max-w-full h-[476px] bg-code border border-rule flex justify-center overflow-hidden">
                              <iframe
                                src={emb.src}
                                width="267"
                                height="476"
                                title={title || "Video"}
                                style={{ border: "none", overflow: "hidden" }}
                                scrolling="no"
                                frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                              />
                            </div>
                            {caption && <figcaption className="mt-2 font-mono text-xs text-muted">{caption}</figcaption>}
                          </figure>
                        );
                      }

                      return (
                        <figure key={idx} className="m-0">
                          {title && <p className="eyebrow mb-2">{title}</p>}
                          <div className="w-full max-w-[500px] overflow-hidden border border-rule bg-code flex justify-center">
                            <iframe
                              src={emb.src}
                              width={emb.width || "500"}
                              height={emb.height || "250"}
                              title={title || "Embedded media"}
                              style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
                              scrolling="no"
                              frameBorder="0"
                              allowFullScreen={true}
                              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            />
                          </div>
                          {caption && <figcaption className="mt-2 font-mono text-xs text-muted">{caption}</figcaption>}
                        </figure>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Takeaways */}
              <section id="takeaways" className="scroll-mt-24">
                <h2 className={h2}>{t.writing.keyTakeaways}</h2>
                <ul>
                  {keyTakeaways.map((takeaway, idx) => (
                    <li key={idx}>{takeaway}</li>
                  ))}
                </ul>
              </section>
            </article>

            {/* Related project */}
            {relatedProject && (
              <aside className="mt-12 border-t border-rule pt-6">
                <p className="eyebrow mb-2">Related System</p>
                <h3 className="text-xl">
                  {language === "vi" && relatedProject.titleVi ? relatedProject.titleVi : relatedProject.title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {language === "vi" && relatedProject.subtitleVi ? relatedProject.subtitleVi : relatedProject.subtitle}
                </p>
                <Link href={`/projects/${relatedProject.id}`} className="link text-sm mt-3 inline-block">
                  {t.selectedWork.viewArchitecture} →
                </Link>
              </aside>
            )}

            {/* Author */}
            <aside className="mt-12 border-t border-rule pt-6 text-sm text-muted">
              <p className="eyebrow mb-2">Author</p>
              <p className="text-ink">{language === "vi" ? PERSONAL_INFO.nameVi : PERSONAL_INFO.name}</p>
              <p className="mt-1 max-w-xl">
                {language === "vi"
                  ? "Kỹ sư Full-stack & System Builder. Tốt nghiệp loại Giỏi ĐH Giao thông Vận tải. Chuyên sâu về vi dịch vụ, micro-frontend và hệ thống phân tán."
                  : "Full-stack Engineer & System Builder. Graduated with Distinction from UTC. Building cloud-native multi-tenant architectures and distributed platforms."}
              </p>
              <p className="mt-2 font-mono text-xs flex gap-4">
                <Link href="/#contact" className="link">Get in touch →</Link>
                <a href="https://github.com/hoan02" target="_blank" rel="noopener noreferrer" className="link">GitHub ↗</a>
              </p>
            </aside>

            {/* Prev / next */}
            <nav aria-label="Article navigation" className="mt-12 border-t border-ink pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prevArticle ? (
                <Link href={`/writing/${prevArticle.slug}`} className="group block">
                  <span className="eyebrow">← {t.writing.prevArticle}</span>
                  <span className="mt-1 block font-serif text-lg group-hover:text-accent">
                    {language === "vi" && prevArticle.titleVi ? prevArticle.titleVi : prevArticle.title}
                  </span>
                </Link>
              ) : <div />}
              {nextArticle && (
                <Link href={`/writing/${nextArticle.slug}`} className="group block sm:text-right">
                  <span className="eyebrow">{t.writing.nextArticle} →</span>
                  <span className="mt-1 block font-serif text-lg group-hover:text-accent">
                    {language === "vi" && nextArticle.titleVi ? nextArticle.titleVi : nextArticle.title}
                  </span>
                </Link>
              )}
            </nav>

            {otherArticles.length > 0 && (
              <section className="mt-10 border-t border-rule pt-6">
                <p className="eyebrow mb-3">{language === "vi" ? "Gợi ý Đọc tiếp" : "Recommended Notes"}</p>
                <ul className="divide-y divide-rule border-y border-rule">
                  {otherArticles.map((other) => (
                    <li key={other.slug}>
                      <Link href={`/writing/${other.slug}`} className="group block py-3">
                        <span className="font-serif text-lg group-hover:text-accent">
                          {language === "vi" && other.titleVi ? other.titleVi : other.title}
                        </span>
                        <span className="block font-mono text-xs text-faint mt-1">{other.date} · {other.readTime}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>

      {imageModalOpen && article.heroImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/90"
          role="dialog"
          aria-modal="true"
          aria-label={articleTitle}
          onClick={() => setImageModalOpen(false)}
        >
          <button
            type="button"
            onClick={() => setImageModalOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 font-mono text-xs text-paper underline"
          >
            Close
          </button>
          <div className="relative max-w-5xl w-full h-[80vh] bg-paper">
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
