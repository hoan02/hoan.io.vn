"use client";

import React from "react";
import Link from "next/link";
import { ARTICLES_DATA } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { BookOpen, ArrowRight, Sparkles, Clock, Calendar } from "lucide-react";

export function LatestWriting() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  // Pick top 3 featured articles
  const featuredArticles = ARTICLES_DATA.slice(0, 3);

  return (
    <section id="writing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Heading */}
      <MotionWrapper>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">
              <span>{t.writing.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {t.writing.title}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            {t.writing.subtitle}
          </p>
        </div>
      </MotionWrapper>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {featuredArticles.map((article, idx) => {
          const articleTitle = language === "vi" && article.titleVi ? article.titleVi : article.title;
          const articleSummary = language === "vi" && article.summaryVi ? article.summaryVi : article.summary;

          return (
            <MotionWrapper key={article.slug} delay={idx * 0.1}>
              <Link
                href={`/writing/${article.slug}`}
                className="group h-full flex flex-col justify-between rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-emerald-500/40 p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_15px_30px_-15px_rgba(16,185,129,0.15)]"
              >
                <div>
                  {/* Meta Strip */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 mb-3">
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors tracking-tight mb-3 leading-snug">
                    {articleTitle}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-6">
                    {articleSummary}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/80 mb-4">
                    {article.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read Link */}
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-400 group-hover:underline">
                    <span>{t.writing.readArticle}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </MotionWrapper>
          );
        })}
      </div>

      {/* View All Writing Button */}
      <MotionWrapper delay={0.4}>
        <div className="flex justify-center">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs sm:text-sm font-semibold border border-zinc-800 hover:border-zinc-700 transition-all active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>{t.writing.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </MotionWrapper>
    </section>
  );
}
