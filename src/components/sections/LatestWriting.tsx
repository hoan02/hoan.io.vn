"use client";

import React from "react";
import Link from "next/link";
import { ARTICLES_DATA } from "@/data/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { TechBadge } from "@/components/common/TechIcon";
import {
  BookOpen,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Clock,
  Calendar,
  Layers,
  Terminal,
  Zap,
  CheckCircle2,
  Cpu
} from "lucide-react";

export function LatestWriting() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  // 1. Primary Spotlight Flagship Article
  const flagshipArticle = ARTICLES_DATA.find(
    (a) => a.slug === "designing-arda-cloud-native-finops-platform"
  ) || ARTICLES_DATA[0];

  // 2. Secondary Companion Articles (2 selected deep-dives)
  const secondaryArticles = ARTICLES_DATA.filter(
    (a) =>
      a.slug === "production-like-platform-three-node-k3s-cluster" ||
      a.slug === "why-puchi-uses-opaque-sessions-over-jwt"
  ).slice(0, 2);

  const flagshipTitle = language === "vi" && flagshipArticle.titleVi ? flagshipArticle.titleVi : flagshipArticle.title;
  const flagshipSummary = language === "vi" && flagshipArticle.summaryVi ? flagshipArticle.summaryVi : flagshipArticle.summary;

  return (
    <section id="writing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Heading */}
      <MotionWrapper>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">
              <BookOpen className="w-4 h-4" />
              <span>{t.writing.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {t.writing.title}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-normal leading-relaxed">
            {t.writing.subtitle}
          </p>
        </div>
      </MotionWrapper>

      {/* Flagship Spotlight Article Card */}
      <MotionWrapper delay={0.1}>
        <div className="group relative rounded-3xl bg-zinc-950/90 border border-zinc-800/90 hover:border-emerald-500/40 p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-[0_25px_60px_-20px_rgba(16,185,129,0.18)] mb-8 overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Context, Title, Highlights */}
            <div className="lg:col-span-7 space-y-5">
              {/* Meta Pill */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Flagship Architecture Deep Dive</span>
                </span>
                <span className="flex items-center gap-1 text-xs font-mono text-zinc-400">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  {flagshipArticle.date}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="flex items-center gap-1 text-xs font-mono text-zinc-400">
                  <Clock className="w-3 h-3 text-zinc-500" />
                  {flagshipArticle.readTime}
                </span>
              </div>

              {/* Title */}
              <Link href={`/writing/${flagshipArticle.slug}`} className="block group/title">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover/title:text-emerald-300 transition-colors tracking-tight leading-tight">
                  {flagshipTitle}
                </h3>
              </Link>

              {/* Detailed Summary */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {flagshipSummary}
              </p>

              {/* Key Metrics Grid */}
              {flagshipArticle.highlights && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {flagshipArticle.highlights.map((h, hIdx) => {
                    const label = language === "vi" && h.labelVi ? h.labelVi : h.label;
                    return (
                      <div
                        key={hIdx}
                        className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center space-y-0.5"
                      >
                        <span className="block text-sm sm:text-base font-bold font-mono text-emerald-400">
                          {h.value}
                        </span>
                        <span className="block text-[11px] font-mono text-zinc-400 truncate">
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {flagshipArticle.tags.slice(0, 5).map((tech, idx) => (
                  <TechBadge key={idx} name={tech} size="xs" />
                ))}
              </div>

              {/* Primary Action Button */}
              <div className="pt-2">
                <Link
                  href={`/writing/${flagshipArticle.slug}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:scale-105 active:scale-95"
                >
                  <span>{t.writing.readArticle}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Architecture Flow Box */}
            <div className="lg:col-span-5 bg-zinc-900/60 rounded-2xl p-5 sm:p-6 border border-zinc-800/80 space-y-4 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-zinc-200 font-semibold">Architecture Topology</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  CloudNativePG & NATS
                </span>
              </div>

              {/* Visual Architecture Flow */}
              <div className="space-y-2.5 text-xs font-mono text-zinc-300">
                <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/60 flex items-center justify-between">
                  <span className="text-zinc-400">Edge Ingress:</span>
                  <span className="text-emerald-400 font-semibold">Traefik + ForwardAuth</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/60 flex items-center justify-between">
                  <span className="text-zinc-400">Frontend Layer:</span>
                  <span className="text-zinc-200 font-semibold">React MFE (7 Remotes)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/60 flex items-center justify-between">
                  <span className="text-zinc-400">Core Services:</span>
                  <span className="text-zinc-200 font-semibold">9 Go Services via gRPC</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/60 flex items-center justify-between">
                  <span className="text-zinc-400">Event Bus:</span>
                  <span className="text-emerald-400 font-semibold">NATS JetStream Outbox</span>
                </div>
              </div>

              {/* Naive vs Solution Quote */}
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-zinc-300 leading-relaxed italic">
                {language === "vi"
                  ? "💡 Phân định ranh giới miền DDD, loại bỏ triệt để việc truy vấn chéo database và áp dụng Transactional Outbox nguyên tử."
                  : "💡 Strict DDD domain partitioning with atomic Transactional Outbox publishing over NATS JetStream."}
              </div>
            </div>
          </div>
        </div>
      </MotionWrapper>

      {/* Secondary Companion Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {secondaryArticles.map((article, idx) => {
          const title = language === "vi" && article.titleVi ? article.titleVi : article.title;
          const summary = language === "vi" && article.summaryVi ? article.summaryVi : article.summary;

          return (
            <MotionWrapper key={article.slug} delay={0.2 + idx * 0.1}>
              <Link
                href={`/writing/${article.slug}`}
                className="group h-full flex flex-col justify-between rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-emerald-500/40 p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_15px_35px_-15px_rgba(16,185,129,0.15)]"
              >
                <div className="space-y-3">
                  {/* Meta Strip */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
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
                  <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors tracking-tight leading-snug">
                    {title}
                  </h4>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                    {summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-800/80 space-y-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 4).map((tag, tagIdx) => (
                      <TechBadge key={tagIdx} name={tag} size="xs" />
                    ))}
                  </div>

                  {/* Read Link */}
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-400 group-hover:underline pt-1">
                    <span>{t.writing.readArticle}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </MotionWrapper>
          );
        })}
      </div>

      {/* View All Writing CTA Banner */}
      <MotionWrapper delay={0.4}>
        <div className="text-center">
          <Link
            href="/writing"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-zinc-900/90 hover:bg-emerald-500 hover:text-zinc-950 text-sm font-bold text-white border border-zinc-800 hover:border-emerald-500 transition-all duration-300 shadow-xl group"
          >
            <span>{t.writing.viewAll} ({ARTICLES_DATA.length}+ {language === "vi" ? "Bài viết" : "Articles"})</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </MotionWrapper>
    </section>
  );
}
