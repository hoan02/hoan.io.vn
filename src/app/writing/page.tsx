"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ARTICLES_DATA } from "@/data/portfolioData";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { CustomCursor } from "@/components/common/CustomCursor";
import { AskAIFloatingButton } from "@/components/ai/AskAIFloatingButton";
import { AskAIModal } from "@/components/ai/AskAIModal";
import { BookOpen, Calendar, Clock, ArrowRight, ArrowLeft, Tag, Layers } from "lucide-react";

function WritingContent() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const handleOpenAI = () => setAiModalOpen(true);
  const handleCloseAI = () => setAiModalOpen(false);

  // Collect unique tags
  const allTags = ["All", ...Array.from(new Set(ARTICLES_DATA.flatMap((a) => a.tags)))];

  const filteredArticles = selectedTag === "All"
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter((a) => a.tags.includes(selectedTag));

  return (
    <main className="relative min-h-screen bg-[#090a0f] text-[#f4f4f5] bg-grid-pattern selection:bg-emerald-500 selection:text-black">
      {/* Ambient lighting */}
      <div className="fixed top-0 left-1/3 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />
      
      <CustomCursor />
      <Navbar onOpenAI={handleOpenAI} />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Breadcrumb Back link */}
        <MotionWrapper delay={0.05}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.writing.backToHome}</span>
          </Link>
        </MotionWrapper>

        {/* Heading */}
        <MotionWrapper delay={0.1}>
          <div className="mb-12 border-b border-zinc-800/80 pb-8">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-3">
              <BookOpen className="w-4 h-4" />
              <span>{t.writing.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
              {t.writing.title}
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed">
              {t.writing.subtitle}
            </p>
          </div>
        </MotionWrapper>

        {/* Tag Filters */}
        <MotionWrapper delay={0.15}>
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <span className="text-xs font-mono text-zinc-500 mr-1">{t.writing.filterByTag}</span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedTag === tag
                    ? "bg-emerald-500 text-zinc-950 font-semibold shadow-sm"
                    : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                }`}
              >
                {tag === "All" ? t.writing.allTags : tag}
              </button>
            ))}
          </div>
        </MotionWrapper>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article, idx) => {
            const articleTitle = language === "vi" && article.titleVi ? article.titleVi : article.title;
            const articleSummary = language === "vi" && article.summaryVi ? article.summaryVi : article.summary;

            return (
              <MotionWrapper key={article.slug} delay={0.2 + idx * 0.05}>
                <Link
                  href={`/writing/${article.slug}`}
                  className="group h-full flex flex-col justify-between rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-emerald-500/40 p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_20px_40px_-20px_rgba(16,185,129,0.2)]"
                >
                  <div>
                    {/* Meta Bar */}
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 mb-4">
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
                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors tracking-tight mb-3 leading-snug">
                      {articleTitle}
                    </h2>

                    {/* Summary */}
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                      {articleSummary}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/80 mb-4">
                      {article.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-0.5 text-xs font-mono rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read Action */}
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400 group-hover:underline">
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
      <AskAIModal isOpen={aiModalOpen} onClose={handleCloseAI} />
    </main>
  );
}

export default function WritingIndexPage() {
  return (
    <LanguageProvider>
      <WritingContent />
    </LanguageProvider>
  );
}
