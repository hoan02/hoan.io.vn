import { Article } from "@/types";

export interface ArticleEditorial {
  format: string;
  formatVi: string;
  series: string;
  seriesVi: string;
}

const FORMAT_LABELS: Record<string, [string, string]> = {
  "case-study": ["Case study", "Case study"],
  "architecture-note": ["Architecture note", "Ghi chép kiến trúc"],
  "decision-record": ["Decision record", "Decision record"],
  "build-log": ["Build log", "Build log"],
  "field-note": ["Field note", "Field note"],
  "personal-essay": ["Personal essay", "Bài viết cá nhân"]
};

const FORMAT_OVERRIDES: Record<string, string> = {
  "reliable-domain-events-nats-transactional-outbox": "decision-record",
  "bpmn-workflow-service-boundary-zeebe": "decision-record",
  "multi-remote-micro-frontend-platform-module-federation": "architecture-note",
  "production-like-platform-three-node-k3s-cluster": "field-note",
  "building-puchi-product-idea-to-service-architecture": "case-study",
  "why-puchi-uses-opaque-sessions-over-jwt": "decision-record",
  "git-push-to-k3s-puchi-gitops-pipeline": "build-log",
  "designing-story-based-language-learning-engine": "architecture-note",
  "angular-microfrontend-architecture": "architecture-note",
  "from-utc-engineer-to-production-systems": "personal-essay"
};

function inferFormat(article: Article): string {
  if (article.format) return article.format;
  return FORMAT_OVERRIDES[article.slug] || (article.project === "personal" ? "personal-essay" : "architecture-note");
}

function inferSeries(article: Article): [string, string] {
  if (article.series && article.seriesVi) return [article.series, article.seriesVi];
  switch (article.project) {
    case "epas":
      return ["EPAS / Enterprise Reality", "EPAS / Thực tế enterprise"];
    case "arda":
      return ["ARDA / Platform Architecture", "ARDA / Kiến trúc platform"];
    case "puchi":
      return ["Puchi / Product Engineering", "Puchi / Product engineering"];
    case "infrastructure":
      return ["Systems & infrastructure", "Hệ thống & hạ tầng"];
    case "camrelay":
    case "b4s":
      return ["Systems & field notes", "Hệ thống & field notes"];
    default:
      return ["Engineering journal", "Engineering journal"];
  }
}

export function getArticleEditorial(article: Article): ArticleEditorial {
  const format = inferFormat(article);
  const [formatLabel, formatLabelVi] = FORMAT_LABELS[format] || FORMAT_LABELS["architecture-note"];
  const [series, seriesVi] = inferSeries(article);
  return {
    format: formatLabel,
    formatVi: article.formatVi || formatLabelVi,
    series: article.series || series,
    seriesVi: article.seriesVi || seriesVi
  };
}
