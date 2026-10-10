"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SiteShell } from "@/components/layout/SiteShell";
import { ARTICLES_DATA } from "@/data/portfolioData";
import { getArticleEditorial } from "@/data/articleEditorial";
import { UI_TRANSLATIONS } from "@/data/translations";
import type { Article } from "@/types";

function WritingContent() {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allTags = useMemo(
    () => ["All", ...Array.from(new Set(ARTICLES_DATA.flatMap((a) => a.tags)))],
    []
  );

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

  const isDefaultView = selectedTag === "All" && !searchQuery;
  const heroArticle = isDefaultView
    ? ARTICLES_DATA.find((a) => a.slug === "arda-ai-service-agent-boundary") ||
      ARTICLES_DATA.find((a) => a.featured) ||
      ARTICLES_DATA[0]
    : null;
  const listArticles =
    isDefaultView && heroArticle
      ? filteredArticles.filter((a) => a.slug !== heroArticle.slug)
      : filteredArticles;

  const renderMeta = (a: Article) => {
    const ed = getArticleEditorial(a);
    return `${a.date} · ${a.readTime} · ${language === "vi" ? ed.formatVi : ed.format}`;
  };

  return (
    <SiteShell>
      <div className="page-wrap pt-16 pb-24">
        <header className="border-t border-ink pt-4 mb-10 max-w-2xl space-y-3">
          <p className="eyebrow">{t.writing.badge}</p>
          <h1 className="text-4xl sm:text-5xl">{t.writing.title}</h1>
          <p className="text-muted">{t.writing.subtitle}</p>
        </header>

        <div className="mb-10 space-y-6">
          <div className="relative max-w-xl">
            <label htmlFor="writing-search" className="sr-only">
              {t.writing.searchPlaceholder}
            </label>
            <input
              id="writing-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.writing.searchPlaceholder}
              className="w-full bg-transparent border-0 border-b border-rule focus:border-ink rounded-none px-0 py-2 pr-16 text-sm font-mono text-ink placeholder:text-faint outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-0 top-1/2 -translate-y-1/2 eyebrow hover:text-ink"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2" role="group" aria-label={t.writing.filterByTag}>
            <span className="eyebrow">{t.writing.filterByTag}</span>
            {allTags.map((tag) => {
              const active = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  aria-pressed={active}
                  className={`font-mono text-xs ${
                    active ? "text-ink underline underline-offset-4 decoration-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {tag === "All" ? t.writing.allTags : tag}
                </button>
              );
            })}
          </div>
        </div>

        {heroArticle && (
          <section className="mb-12" aria-label={t.writing.featuredArticle}>
            <p className="eyebrow mb-3">{t.writing.featuredArticle}</p>
            <Link href={`/writing/${heroArticle.slug}`} className="group block border-y border-rule py-8">
              <p className="eyebrow mb-3">{renderMeta(heroArticle)}</p>
              <h2 className="text-3xl sm:text-4xl max-w-3xl group-hover:text-accent">
                {language === "vi" && heroArticle.titleVi ? heroArticle.titleVi : heroArticle.title}
              </h2>
              <p className="mt-4 text-muted max-w-2xl">
                {language === "vi" && heroArticle.summaryVi ? heroArticle.summaryVi : heroArticle.summary}
              </p>
              <p className="mt-4 font-mono text-xs text-faint">{heroArticle.tags.join(" / ")}</p>
              <p className="mt-4 text-sm link inline-block">{t.writing.readArticle} →</p>
            </Link>
          </section>
        )}

        {listArticles.length === 0 && !heroArticle && (
          <div className="py-16 border-y border-rule">
            <p className="font-mono text-sm text-muted">
              {language === "vi" ? "Không tìm thấy bài viết phù hợp." : "No matching articles found."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("All");
              }}
              className="mt-4 link text-sm"
            >
              Reset filters
            </button>
          </div>
        )}

        {listArticles.length > 0 && (
          <section aria-label={t.writing.allArticles}>
            <p className="eyebrow mb-3">
              {t.writing.allArticles} ({listArticles.length})
            </p>
            <ol className="divide-y divide-rule border-y border-rule">
              {listArticles.map((a) => (
                <li key={a.slug}>
                  <Link href={`/writing/${a.slug}`} className="group grid gap-1 sm:gap-6 sm:grid-cols-[13rem_1fr] py-6">
                    <p className="eyebrow pt-1.5">{renderMeta(a)}</p>
                    <div>
                      <h3 className="text-xl sm:text-2xl group-hover:text-accent">
                        {language === "vi" && a.titleVi ? a.titleVi : a.title}
                      </h3>
                      <p className="mt-2 text-muted max-w-2xl">
                        {language === "vi" && a.summaryVi ? a.summaryVi : a.summary}
                      </p>
                      <p className="mt-3 font-mono text-xs text-faint">{a.tags.join(" / ")}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </SiteShell>
  );
}

export default function WritingIndexPage() {
  return <WritingContent />;
}
