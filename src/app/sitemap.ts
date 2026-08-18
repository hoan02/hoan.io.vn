import type { MetadataRoute } from "next";
import { ARTICLES_DATA } from "@/data/portfolioData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hoan.io.vn";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cv/Le_Cong_Hoan_CV.pdf`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES_DATA.map((article) => ({
    url: `${baseUrl}/writing/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...articleRoutes];
}
