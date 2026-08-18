"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UI_TRANSLATIONS } from "@/data/translations";
import { PROJECTS_DATA, ARTICLES_DATA, PERSONAL_INFO } from "@/data/portfolioData";
import { ENGINEERING_EVIDENCE } from "@/data/engineeringEvidence";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { CustomCursor } from "@/components/common/CustomCursor";
import { AskAIFloatingButton } from "@/components/ai/AskAIFloatingButton";
import { AskAIModal } from "@/components/ai/AskAIModal";
import { DIAGRAM_MAP } from "@/components/diagrams/ArchitectureDiagrams";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Layers,
  AlertCircle,
  CheckCircle2,
  Code2,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  Sparkles,
  ExternalLink,
  GitBranch,
  ShieldCheck,
  XCircle,
  Zap,
  Info,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  Video,
  Play
} from "lucide-react";

import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

interface ArticleClientViewProps {
  article: Article;
}

function ArticleReader({ article }: ArticleClientViewProps) {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [copiedCode, setCopiedCode] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const handleOpenAI = () => setAiModalOpen(true);
  const handleCloseAI = () => setAiModalOpen(false);

  const articleTitle = language === "vi" && article.titleVi ? article.titleVi : article.title;
  const articleSummary = language === "vi" && article.summaryVi ? article.summaryVi : article.summary;
  const problemStatement = language === "vi" && article.content.problemStatementVi ? article.content.problemStatementVi : article.content.problemStatement;
  const architectureDesign = language === "vi" && article.content.architectureDesignVi ? article.content.architectureDesignVi : article.content.architectureDesign;
  const technicalDecisions = language === "vi" && article.content.technicalDecisionsVi ? article.content.technicalDecisionsVi : article.content.technicalDecisions;
  const keyTakeaways = language === "vi" && article.content.keyTakeawaysVi ? article.content.keyTakeawaysVi : article.content.keyTakeaways;

  // Find related project if exists
  const relatedProject = article.relatedProject
    ? PROJECTS_DATA.find((p) => p.id === article.relatedProject)
    : null;

  // Find verified evidence
  const verifiedEvidence = article.evidenceIds
    ? ENGINEERING_EVIDENCE.filter((ev) => article.evidenceIds?.includes(ev.id))
    : [];

  // Find other articles
  const otherArticles = ARTICLES_DATA.filter((a) => a.slug !== article.slug).slice(0, 2);

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const DiagramComponent = DIAGRAM_MAP[article.slug] || (article.diagramKey ? DIAGRAM_MAP[article.diagramKey] : null);

  const tocItems = [
    ...(article.highlights && article.highlights.length > 0 ? [{ id: "highlights", label: language === "vi" ? "Chỉ số kiến trúc" : "Key Highlights" }] : []),
    { id: "context", label: t.writing.problemContext },
    ...(article.comparison ? [{ id: "comparison", label: language === "vi" ? "So sánh giải pháp" : "Architecture Comparison" }] : []),
    ...(Boolean(DiagramComponent) || article.architectureDiagram ? [{ id: "architecture-diagram", label: language === "vi" ? "Sơ đồ hệ thống" : "Architecture Topology" }] : []),
    { id: "design", label: t.writing.architecturalSolution },
    { id: "decisions", label: t.writing.technicalDecisions },
    ...(article.sections && article.sections.length > 0 ? article.sections.map((s) => ({ id: s.id, label: language === "vi" && s.titleVi ? s.titleVi : s.title })) : []),
    ...(article.content.codeSnippet ? [{ id: "implementation", label: t.writing.codeImplementation }] : []),
    ...(verifiedEvidence.length > 0 ? [{ id: "evidence", label: language === "vi" ? "Bằng chứng Repository" : "Verified Evidence" }] : []),
    ...(article.embeds && article.embeds.length > 0 ? [{ id: "media-embeds", label: language === "vi" ? "Tư liệu & Video thực tế" : "Media & Video Records" }] : []),
    { id: "takeaways", label: t.writing.keyTakeaways },
  ];

  return (
    <main className="relative min-h-screen bg-[#090a0f] text-[#f4f4f5] bg-grid-pattern selection:bg-emerald-500 selection:text-black">
      {/* Ambient light */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[160px] pointer-events-none -z-10" />

      <CustomCursor />
      <Navbar onOpenAI={handleOpenAI} />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <MotionWrapper delay={0.05}>
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-8">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <span className="text-zinc-600">/</span>
            <Link href="/writing" className="hover:text-emerald-400 transition-colors">
              Writing
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-500 truncate max-w-[200px] sm:max-w-xs">{article.slug}</span>
          </div>
        </MotionWrapper>

        {/* Article Header */}
        <MotionWrapper delay={0.1}>
          <div className="border-b border-zinc-800/80 pb-8 mb-12">
            {/* Meta bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500 mb-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  {article.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  {article.readTime}
                </span>
                {article.project && (
                  <>
                    <span>•</span>
                    <span className="text-emerald-400 uppercase font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {article.project === "arda" ? "ARDA Labs" : article.project === "puchi" ? "Puchidemy" : article.project.toUpperCase()}
                    </span>
                  </>
                )}
              </div>

              {article.repositoryUrl && (
                <a
                  href={article.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Inspect Source Code</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-[1.15]">
              {articleTitle}
            </h1>

            {/* Summary */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal mb-6 max-w-3xl">
              {articleSummary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Hero Image Illustration Banner (if configured) */}
        {article.heroImage && (
          <MotionWrapper delay={0.12}>
            <div className="mb-12 rounded-2xl overflow-hidden border border-zinc-800 bg-[#09090B] p-2 sm:p-4 shadow-2xl relative group">
              <div className="relative w-full h-64 sm:h-96 md:h-[420px] rounded-xl overflow-hidden bg-zinc-950 flex items-center justify-center">
                <Image
                  src={article.heroImage}
                  alt={articleTitle}
                  fill
                  className="object-contain p-2 sm:p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
                <button
                  type="button"
                  onClick={() => setImageModalOpen(true)}
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/80 hover:bg-black text-zinc-300 hover:text-white border border-zinc-700 transition-colors flex items-center gap-1.5 text-xs font-mono backdrop-blur-sm"
                  title="Expand architecture image"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Zoom</span>
                </button>
              </div>
              {(article.heroImageCaption || article.heroImageCaptionVi) && (
                <p className="mt-3 text-center text-xs text-zinc-400 font-mono italic">
                  {language === "vi" && article.heroImageCaptionVi ? article.heroImageCaptionVi : article.heroImageCaption}
                </p>
              )}
            </div>
          </MotionWrapper>
        )}

        {/* Main Grid: Article Content + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Article Main Body */}
          <article className="lg:col-span-8 space-y-12 text-zinc-300 leading-relaxed font-normal">
            {/* Key Highlights Metric Grid (if available) */}
            {article.highlights && article.highlights.length > 0 && (
              <section id="highlights" className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span>{language === "vi" ? "Chỉ số Kiến trúc Nổi bật" : "Architectural Highlights & Guarantees"}</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {article.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/40 transition-colors space-y-1"
                    >
                      <div className="text-lg sm:text-2xl font-black font-mono text-emerald-400 tracking-tight">
                        {item.value}
                      </div>
                      <div className="text-xs font-semibold text-zinc-200">
                        {language === "vi" && item.labelVi ? item.labelVi : item.label}
                      </div>
                      <div className="text-[11px] text-zinc-400 leading-tight">
                        {language === "vi" && item.detailVi ? item.detailVi : item.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 1. Problem Context */}
            <section id="context" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                <AlertCircle className="w-5 h-5 text-emerald-400" />
                <span>{t.writing.problemContext}</span>
              </h2>
              <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-sm sm:text-base leading-relaxed text-zinc-300">
                {problemStatement}
              </div>
            </section>

            {/* Side-by-Side Comparison Card (Naive vs Solution) */}
            {article.comparison && (
              <section id="comparison" className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                  <Layers className="w-5 h-5 text-emerald-400" />
                  <span>{language === "vi" ? "Phân tích So sánh Kiến trúc" : "Architectural Trade-offs: Naive vs Engineered"}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Naive card */}
                  <div className="p-5 rounded-2xl bg-rose-950/15 border border-rose-500/20 space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 text-sm font-bold font-mono">
                      <XCircle className="w-4 h-4 shrink-0" />
                      <span>
                        {language === "vi" && article.comparison.naiveTitleVi
                          ? article.comparison.naiveTitleVi
                          : article.comparison.naiveTitle}
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                      {(language === "vi" && article.comparison.naivePointsVi
                        ? article.comparison.naivePointsVi
                        : article.comparison.naivePoints
                      ).map((pt, ptIdx) => (
                        <li key={ptIdx} className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solution card */}
                  <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold font-mono">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>
                        {language === "vi" && article.comparison.solutionTitleVi
                          ? article.comparison.solutionTitleVi
                          : article.comparison.solutionTitle}
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-zinc-200">
                      {(language === "vi" && article.comparison.solutionPointsVi
                        ? article.comparison.solutionPointsVi
                        : article.comparison.solutionPoints
                      ).map((pt, ptIdx) => (
                        <li key={ptIdx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* 2. Visual & Dynamic Architecture Diagram */}
            {(() => {
              if (DiagramComponent) {
                return (
                  <section id="architecture-diagram" className="space-y-4">
                    <DiagramComponent caption={articleTitle} />
                  </section>
                );
              }
              if (article.architectureDiagram) {
                return (
                  <section id="architecture-diagram" className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                      <Layers className="w-5 h-5 text-emerald-400" />
                      <span>System Architecture Topology</span>
                    </h2>
                    <div className="p-4 sm:p-6 rounded-2xl bg-black/90 border border-zinc-800 font-mono text-[11px] sm:text-xs text-emerald-400 overflow-x-auto leading-relaxed shadow-2xl">
                      <pre>{article.architectureDiagram}</pre>
                    </div>
                  </section>
                );
              }
              return null;
            })()}

            {/* 3. Architectural Design */}
            <section id="design" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span>{t.writing.architecturalSolution}</span>
              </h2>
              <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-sm sm:text-base leading-relaxed text-zinc-300">
                {architectureDesign}
              </div>
            </section>

            {/* 4. Technical Decisions */}
            <section id="decisions" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>{t.writing.technicalDecisions}</span>
              </h2>
              <div className="space-y-3">
                {technicalDecisions.map((decision, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-3.5 hover:border-zinc-700 transition-colors"
                  >
                    <span className="text-emerald-400 font-mono font-bold shrink-0 mt-0.5 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-xs">
                      0{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{decision}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Custom Deep-Dive Sections (if any) */}
            {article.sections && article.sections.map((sec) => {
              const secTitle = language === "vi" && sec.titleVi ? sec.titleVi : sec.title;
              const secContent = language === "vi" && sec.contentVi ? sec.contentVi : sec.content;
              const calloutText = sec.callout ? (language === "vi" && sec.callout.textVi ? sec.callout.textVi : sec.callout.text) : null;

              return (
                <section key={sec.id} id={sec.id} className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                    <BookOpen className="w-5 h-5 text-emerald-400" />
                    <span>{secTitle}</span>
                  </h2>
                  <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-sm sm:text-base leading-relaxed text-zinc-300">
                    <p className="whitespace-pre-line">{secContent}</p>
                  </div>
                  {calloutText && (
                    <div className={`p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${
                      sec.callout?.type === "warning"
                        ? "bg-amber-950/30 border border-amber-500/30 text-amber-200"
                        : sec.callout?.type === "tip"
                        ? "bg-emerald-950/30 border border-emerald-500/30 text-emerald-200"
                        : "bg-blue-950/30 border border-blue-500/30 text-blue-200"
                    }`}>
                      {sec.callout?.type === "warning" ? (
                        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      ) : sec.callout?.type === "tip" ? (
                        <Lightbulb className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                      ) : (
                        <Info className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" />
                      )}
                      <span>{calloutText}</span>
                    </div>
                  )}
                </section>
              );
            })}

            {/* 6. Code Implementation */}
            {article.content.codeSnippet && (
              <section id="implementation" className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                    <Code2 className="w-5 h-5 text-emerald-400" />
                    <span>{t.writing.codeImplementation}</span>
                  </h2>
                  <span className="text-xs font-mono text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {article.content.codeSnippet.language}
                  </span>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
                  {/* Code snippet header bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span>{article.content.codeSnippet.title}</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(article.content.codeSnippet!.code)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                      title="Copy code"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-4 sm:p-5 font-mono text-xs text-zinc-200 overflow-x-auto leading-relaxed bg-[#09090B]">
                    <code>{article.content.codeSnippet.code}</code>
                  </pre>
                </div>
              </section>
            )}

            {/* 7. Verified Evidence in Public Repositories */}
            {verifiedEvidence.length > 0 && (
              <section id="evidence" className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>{language === "vi" ? "Bằng chứng Kỹ thuật Khách quan" : "Verified Repository Evidence"}</span>
                </h2>
                <div className="space-y-3">
                  {verifiedEvidence.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {ev.category.toUpperCase()} • {ev.confidence.toUpperCase()}
                        </span>
                        <a
                          href={ev.evidence[0]?.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                        >
                          <span>{ev.evidence[0]?.repository.replace("https://github.com/", "")}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-200 font-medium">
                        {language === "vi" ? ev.claimVi : ev.claim}
                      </p>
                      {ev.evidence[0]?.description && (
                        <p className="text-xs text-zinc-400 font-mono">
                          ↳ {ev.evidence[0]?.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 7.5 Media & Practical Documentation Embeds (Facebook Posts, Reels, YouTube) */}
            {article.embeds && article.embeds.length > 0 && (
              <section id="media-embeds" className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                  <Video className="w-5 h-5 text-emerald-400" />
                  <span>{language === "vi" ? "Tư liệu & Video Hoạt động Thực tế" : "Media, Videos & Practical Records"}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {article.embeds.map((emb, idx) => {
                    const title = language === "vi" && emb.titleVi ? emb.titleVi : emb.title;
                    const caption = language === "vi" && emb.captionVi ? emb.captionVi : emb.caption;

                    if (emb.type === "youtube") {
                      const ytId = emb.url?.replace(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/, "$1") || "ASVxal2cwXo";
                      return (
                        <div key={idx} className="md:col-span-2 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 p-4 space-y-3 shadow-2xl">
                          {title && (
                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                              <Play className="w-4 h-4 text-emerald-400" />
                              <span>{title}</span>
                            </h4>
                          )}
                          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
                            <iframe
                              src={emb.src || `https://www.youtube-nocookie.com/embed/${ytId}`}
                              title={title || "YouTube video"}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full border-0"
                            />
                          </div>
                          {caption && <p className="text-xs text-zinc-400 font-mono italic">{caption}</p>}
                        </div>
                      );
                    }

                    if (emb.type === "facebook-video") {
                      return (
                        <div key={idx} className="flex flex-col items-center rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-3 shadow-2xl">
                          {title && (
                            <h4 className="text-sm font-bold text-white self-start flex items-center gap-2">
                              <Video className="w-4 h-4 text-emerald-400" />
                              <span>{title}</span>
                            </h4>
                          )}
                          <div className="w-[267px] max-w-full h-[476px] rounded-xl overflow-hidden bg-black flex justify-center">
                            <iframe
                              src={emb.src}
                              width="267"
                              height="476"
                              style={{ border: "none", overflow: "hidden" }}
                              scrolling="no"
                              frameBorder="0"
                              allowFullScreen={true}
                              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            />
                          </div>
                          {caption && <p className="text-xs text-zinc-400 font-mono italic text-center">{caption}</p>}
                        </div>
                      );
                    }

                    // Facebook Post / iframe
                    return (
                      <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 space-y-3 shadow-2xl overflow-hidden flex flex-col items-center">
                        {title && (
                          <h4 className="text-sm font-bold text-white self-start flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-emerald-400" />
                            <span>{title}</span>
                          </h4>
                        )}
                        <div className="w-full max-w-[500px] overflow-hidden rounded-xl bg-white/5 flex justify-center">
                          <iframe
                            src={emb.src}
                            width={emb.width || "500"}
                            height={emb.height || "250"}
                            style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          />
                        </div>
                        {caption && <p className="text-xs text-zinc-400 font-mono italic text-center">{caption}</p>}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 8. Key Takeaways */}
            <section id="takeaways" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>{t.writing.keyTakeaways}</span>
              </h2>
              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
                {keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Project Callout */}
            {relatedProject && (
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                    Related System
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {language === "vi" && relatedProject.titleVi ? relatedProject.titleVi : relatedProject.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                    {language === "vi" && relatedProject.subtitleVi ? relatedProject.subtitleVi : relatedProject.subtitle}
                  </p>
                </div>
                <Link
                  href="/#selected-work"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold shrink-0 transition-colors"
                >
                  <span>View Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </article>

          {/* Sticky Sidebar (TOC + Author + Other Articles) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Table of Contents */}
            <div className="sticky top-28 space-y-6">
              <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-4 pb-2 border-b border-zinc-800">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t.writing.tableOfContents}</span>
                </div>
                <nav className="space-y-1.5">
                  {tocItems.map((item, idx) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-xs font-mono text-zinc-400 hover:text-emerald-400 py-1 transition-colors truncate"
                    >
                      <span className="text-zinc-600 mr-2">0{idx + 1}.</span>
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Author & System Builder Card */}
              <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-sm space-y-3">
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  Author & Builder
                </div>
                <div className="font-bold text-white text-base">
                  {PERSONAL_INFO.name}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Full-stack Engineer & System Builder. Graduated with Distinction from UTC. Building cloud-native multi-tenant architectures and language learning platforms.
                </p>
                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
                  <Link href="/#contact" className="text-emerald-400 hover:underline">
                    Get in touch →
                  </Link>
                  <a
                    href="https://github.com/hoan02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Other Related Notes */}
              {otherArticles.length > 0 && (
                <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-sm space-y-3">
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    {language === "vi" ? "Bài viết liên quan" : "Related Notes"}
                  </div>
                  <div className="space-y-3">
                    {otherArticles.map((other) => (
                      <Link
                        key={other.slug}
                        href={`/writing/${other.slug}`}
                        className="block group"
                      >
                        <h4 className="text-xs font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors line-clamp-2">
                          {language === "vi" && other.titleVi ? other.titleVi : other.title}
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {other.readTime} • {other.date}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Lightbox Modal for Hero Image */}
      {imageModalOpen && article.heroImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setImageModalOpen(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-[80vh] flex items-center justify-center">
            <Image
              src={article.heroImage}
              alt={articleTitle}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}

      <AskAIFloatingButton onClick={handleOpenAI} />
      <AskAIModal isOpen={aiModalOpen} onClose={handleCloseAI} />
      <Footer />
    </main>
  );
}

export function ArticleClientView({ article }: ArticleClientViewProps) {
  return (
    <LanguageProvider>
      <ArticleReader article={article} />
    </LanguageProvider>
  );
}

export default ArticleClientView;
