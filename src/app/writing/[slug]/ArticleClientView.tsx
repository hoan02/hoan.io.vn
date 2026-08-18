"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Article } from "@/types";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UI_TRANSLATIONS } from "@/data/translations";
import { PROJECTS_DATA, ARTICLES_DATA, PERSONAL_INFO } from "@/data/portfolioData";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { CustomCursor } from "@/components/common/CustomCursor";
import { AskAIFloatingButton } from "@/components/ai/AskAIFloatingButton";
import { AskAIModal } from "@/components/ai/AskAIModal";
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
  ExternalLink
} from "lucide-react";

interface ArticleClientViewProps {
  article: Article;
}

function ArticleReader({ article }: { article: Article }) {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [copiedCode, setCopiedCode] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

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

  // Find other articles
  const otherArticles = ARTICLES_DATA.filter((a) => a.slug !== article.slug).slice(0, 2);

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const tocItems = [
    { id: "context", label: t.writing.problemContext },
    ...(article.architectureDiagram ? [{ id: "architecture-diagram", label: "Architecture Overview" }] : []),
    { id: "design", label: t.writing.architecturalSolution },
    { id: "decisions", label: t.writing.technicalDecisions },
    ...(article.content.codeSnippet ? [{ id: "implementation", label: t.writing.codeImplementation }] : []),
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
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 mb-4">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {article.readTime}
              </span>
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

        {/* Main Grid: Article Content + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Article Main Body */}
          <article className="lg:col-span-8 space-y-12 text-zinc-300 leading-relaxed font-normal">
            {/* 1. Problem Context */}
            <section id="context" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                <AlertCircle className="w-5 h-5 text-emerald-400" />
                <span>{t.writing.problemContext}</span>
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                {problemStatement}
              </p>
            </section>

            {/* 2. Architecture Diagram (if present) */}
            {article.architectureDiagram && (
              <section id="architecture-diagram" className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                  <Layers className="w-5 h-5 text-emerald-400" />
                  <span>System Architecture Diagram</span>
                </h2>
                <div className="p-4 sm:p-6 rounded-2xl bg-black/90 border border-zinc-800 font-mono text-[11px] sm:text-xs text-emerald-400 overflow-x-auto leading-relaxed shadow-2xl">
                  <pre>{article.architectureDiagram}</pre>
                </div>
              </section>
            )}

            {/* 3. Architectural Design */}
            <section id="design" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span>{t.writing.architecturalSolution}</span>
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                {architectureDesign}
              </p>
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
                    className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-3"
                  >
                    <span className="text-emerald-400 font-mono font-bold shrink-0 mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="text-sm text-zinc-300 leading-relaxed">{decision}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Code Implementation */}
            {article.content.codeSnippet && (
              <section id="implementation" className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                    <Code2 className="w-5 h-5 text-emerald-400" />
                    <span>{t.writing.codeImplementation}</span>
                  </h2>
                  <span className="text-xs font-mono text-zinc-500 uppercase">
                    {article.content.codeSnippet.language}
                  </span>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
                  {/* Code snippet header bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                    <span>{article.content.codeSnippet.title}</span>
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

                  <pre className="p-4 sm:p-5 font-mono text-xs text-zinc-200 overflow-x-auto leading-relaxed">
                    <code>{article.content.codeSnippet.code}</code>
                  </pre>
                </div>
              </section>
            )}

            {/* 6. Key Takeaways */}
            <section id="takeaways" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>{t.writing.keyTakeaways}</span>
              </h2>
              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2.5">
                {keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
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
              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>{t.writing.tableOfContents}</span>
                </h4>
                <nav className="space-y-2">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-xs text-zinc-400 hover:text-emerald-400 hover:translate-x-1 transition-all py-1"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Author Card */}
              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                <span className="text-[11px] font-mono text-emerald-400 uppercase block mb-1">Author</span>
                <h4 className="text-sm font-bold text-white">
                  {language === "vi" ? PERSONAL_INFO.nameVi : PERSONAL_INFO.name}
                </h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {language === "vi" ? PERSONAL_INFO.bioVi : PERSONAL_INFO.bio}
                </p>
                <div className="pt-3 mt-3 border-t border-zinc-800 flex items-center gap-3 text-xs font-mono">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                  <span className="text-zinc-700">•</span>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* More Notes */}
              {otherArticles.length > 0 && (
                <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                    More Notes
                  </h4>
                  <div className="space-y-3">
                    {otherArticles.map((other) => {
                      const otherTitle = language === "vi" && other.titleVi ? other.titleVi : other.title;
                      return (
                        <Link
                          key={other.slug}
                          href={`/writing/${other.slug}`}
                          className="group block p-2.5 rounded-lg hover:bg-zinc-900/80 transition-colors"
                        >
                          <span className="text-xs font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                            {otherTitle}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
                            {other.readTime}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <Footer />
      <AskAIFloatingButton onClick={handleOpenAI} />
      <AskAIModal isOpen={aiModalOpen} onClose={handleCloseAI} />
    </main>
  );
}

export default function ArticleClientView({ article }: ArticleClientViewProps) {
  return (
    <LanguageProvider>
      <ArticleReader article={article} />
    </LanguageProvider>
  );
}
