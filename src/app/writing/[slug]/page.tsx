import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ARTICLES_DATA } from "@/data/portfolioData";
import ArticleClientView from "./ArticleClientView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES_DATA.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | Le Cong Hoan",
    };
  }

  return {
    title: `${article.title} — Le Cong Hoan`,
    description: article.summary,
    keywords: [...article.tags, "Software Engineering", "Le Cong Hoan"],
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      url: `https://hoan.io.vn/writing/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return <ArticleClientView article={article} />;
}
