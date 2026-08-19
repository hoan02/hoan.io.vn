"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ARTICLES_DATA } from "@/data/portfolioData";
import { getArticleEditorial } from "@/data/articleEditorial";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { CustomCursor } from "@/components/common/CustomCursor";
import { AskAIFloatingButton } from "@/components/ai/AskAIFloatingButton";
import { AskAIModal } from "@/components/ai/AskAIModal";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Search,
  Layers,
  Flame
} from "lucide-react";

function WritingContent() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const handleOpenAI = () => setAiModalOpen(true);
  const handleCloseAI = () => setAiModalOpen(false);

  // Collect unique tags
  const allTags = useMemo(() => {
    return ["All", ...Array.from(new Set(ARTICLES_DATA.flatMap((a) => a.tags)))];
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      const title = language === "vi" && article.titleVi ? article.titleVi : article.title;
      const summary = language === "vi" && article.summaryVi ? article.summaryVi : article.summary;

      const matchesTag = selectedTag === "All" || article.tags.includes(selectedTag);

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        title.toLowerCase().includes(q) ||
        summary.toLowerCase().includes(q) ||
        article.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesTag && matchesSearch;
    });
  }, [searchQuery, selectedTag, language]);

  // Featured hero article (first featured post when not searching)
  const isDefaultView = selectedTag === "All" && !searchQuery;
  const heroArticle = isDefaultView
    ? ARTICLES_DATA.find((a) => a.slug === "epas-transaction-inbox-and-compliance-boundaries") || ARTICLES_DATA.find((a) => a.featured) || ARTICLES_DATA[0]
    : null;
  const gridArticles = isDefaultView && heroArticle
    ? filteredArticles.filter((a) => a.slug !== heroArticle.slug)
    : filteredArticles;

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-[#090a0f] text-slate-900 dark:text-[#f4f4f5] bg-grid-pattern selection:bg-emerald-500 selection:text-black transition-colors duration-200">
      {/* Ambient lighting */}
      <div className="fixed top-0 left-1/3 w-[500px] h-[500px] bg-emerald-500/[0.04] dark:bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/3 right-1/4 w-[450px] h-[450px] bg-teal-500/[0.03] dark:bg-teal-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />
      
      <CustomCursor />
      <Navbar onOpenAI={handleOpenAI} />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Breadcrumb Back link */}
        <MotionWrapper delay={0.05}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>{t.writing.backToHome}</span>
          </Link>
        </MotionWrapper>

        {/* Heading */}
        <MotionWrapper delay={0.1}>
          <div className="mb-12 border-b border-zinc-200 dark:border-zinc-800/80 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.writing.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-950 dark:text-white tracking-tight mb-4">
              {t.writing.title}
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl font-normal leading-relaxed">
              {t.writing.subtitle}
            </p>
          </div>
        </MotionWrapper>

        {/* Search & Tag Filters */}
        <MotionWrapper delay={0.15}>
          <div className="space-y-6 mb-12">
            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.writing.searchPlaceholder}
                className="w-full pl-11 pr-4 py-3 text-sm rounded-xl bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-all font-mono shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Tag Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-500 mr-1">{t.writing.filterByTag}</span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    selectedTag === tag
                      ? "bg-emerald-500 text-zinc-950 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                      : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-sm"
                  }`}
                >
                  {tag === "All" ? t.writing.allTags : tag}
                </button>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Featured Hero Article (when in default view) */}
        {heroArticle && (
          <MotionWrapper delay={0.2}>
            <div className="mb-12">
              {(() => {
                const editorial = getArticleEditorial(heroArticle);
                return (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
                <Flame className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <span>{language === "vi" ? `${editorial.seriesVi} · ${editorial.formatVi}` : `${editorial.series} · ${editorial.format}`}</span>
              </div>
                );
              })()}

              <Link
                href={`/writing/${heroArticle.slug}`}
                className="group block rounded-3xl bg-gradient-to-b from-white via-zinc-50 to-zinc-100 dark:from-zinc-900/90 dark:to-zinc-950 border border-zinc-200 dark:border-emerald-500/30 hover:border-emerald-500/60 p-8 sm:p-10 lg:p-12 transition-all duration-300 shadow-md hover:shadow-[0_20px_50px_-20px_rgba(16,185,129,0.25)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="relative z-10 space-y-4 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      {heroArticle.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                      <Clock className="w-3.5 h-3.5" />
                      {heroArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors tracking-tight leading-tight">
                    {language === "vi" && heroArticle.titleVi ? heroArticle.titleVi : heroArticle.title}
                  </h2>

                  <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                    {language === "vi" && heroArticle.summaryVi ? heroArticle.summaryVi : heroArticle.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {heroArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-mono rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                    <span>{t.writing.readArticle}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </MotionWrapper>
        )}

        {/* Empty state */}
        {gridArticles.length === 0 && !heroArticle && (
          <div className="text-center py-20 rounded-2xl bg-white/60 dark:bg-zinc-950/40 border border-dashed border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
            <Layers className="w-10 h-10 text-zinc-400 dark:text-zinc-600 mx-auto mb-4" />
            <p className="text-base text-zinc-600 dark:text-zinc-400 font-mono">
              {language === "vi" ? "Không tìm thấy bài viết phù hợp." : "No matching articles found."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("All");
              }}
              className="mt-4 px-4 py-2 text-xs font-mono bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-emerald-600 dark:text-emerald-400 rounded-lg border border-zinc-200 dark:border-zinc-800 transition-colors shadow-sm"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Articles List Header (when grid is present) */}
        {gridArticles.length > 0 && heroArticle && (
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              {t.writing.allArticles} ({gridArticles.length})
            </h3>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gridArticles.map((article, idx) => {
            const articleTitle = language === "vi" && article.titleVi ? article.titleVi : article.title;
            const articleSummary = language === "vi" && article.summaryVi ? article.summaryVi : article.summary;
            const editorial = getArticleEditorial(article);

            return (
              <MotionWrapper key={article.slug} delay={0.1 + idx * 0.05}>
                <Link
                  href={`/writing/${article.slug}`}
                  className="group h-full flex flex-col justify-between rounded-2xl bg-white/90 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/90 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-[0_20px_40px_-20px_rgba(16,185,129,0.2)]"
                >
                  <div>
                    {/* Meta Bar */}
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 mb-4">
                      <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-600 dark:text-emerald-400/80 font-semibold">{language === "vi" ? editorial.formatVi : editorial.format}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors tracking-tight mb-3 leading-snug">
                      {articleTitle}
                    </h2>

                    {/* Summary */}
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-normal">
                      {articleSummary}
                    </p>
                    <p className="text-[11px] font-mono text-zinc-500 mb-5">
                      {language === "vi" ? editorial.seriesVi : editorial.series}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 mb-4">
                      {article.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-0.5 text-xs font-mono rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read Action */}
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-600 dark:text-emerald-400 group-hover:underline">
                      <span>{t.writing.readArticle}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </MotionWrapper>
            );
          })}
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
