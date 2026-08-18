export interface Project {
  id: string;
  title: string;
  titleVi?: string;
  subtitle: string;
  subtitleVi?: string;
  description: string;
  descriptionVi?: string;
  longDescription?: string;
  longDescriptionVi?: string;
  problem?: string;
  problemVi?: string;
  architectureDiagram?: string;
  architecture?: string[];
  architectureVi?: string[];
  contributionsDetailed?: string[];
  contributionsDetailedVi?: string[];
  results?: string[];
  resultsVi?: string[];
  relatedArticles?: string[]; // Slugs of related articles in /writing
  role: string;
  roleVi?: string;
  year: string;
  techStack: string[];
  category: "Full-stack" | "Backend" | "Frontend" | "DevOps & Cloud" | "Systems & IoT" | "Desktop & IoT";
  categoryVi?: string;
  metrics?: string[];
  metricsVi?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  image: string;
  accentColor?: string;
}

export interface ArticleHighlight {
  value: string;
  label: string;
  labelVi?: string;
  detail: string;
  detailVi?: string;
}

export interface ArticleComparison {
  naiveTitle: string;
  naiveTitleVi?: string;
  naivePoints: string[];
  naivePointsVi?: string[];
  solutionTitle: string;
  solutionTitleVi?: string;
  solutionPoints: string[];
  solutionPointsVi?: string[];
}

export interface ArticleSection {
  id: string;
  title: string;
  titleVi?: string;
  content: string;
  contentVi?: string;
  callout?: {
    type: "info" | "warning" | "tip";
    text: string;
    textVi?: string;
  };
}

export interface ArticleEmbed {
  type: "facebook-post" | "facebook-video" | "youtube" | "iframe";
  src?: string;
  url?: string;
  title?: string;
  titleVi?: string;
  caption?: string;
  captionVi?: string;
  width?: number | string;
  height?: number | string;
}

export interface Article {
  slug: string;
  title: string;
  titleVi?: string;
  summary: string;
  summaryVi?: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  project?: "arda" | "puchi" | "epas" | "infrastructure" | "personal" | "camrelay" | "b4s";
  relatedProject?: string; // Project ID
  diagramKey?: string;
  evidenceIds?: string[];
  repositoryUrl?: string;
  heroImage?: string;
  heroImageCaption?: string;
  heroImageCaptionVi?: string;
  embeds?: ArticleEmbed[];
  highlights?: ArticleHighlight[];
  comparison?: ArticleComparison;
  architectureDiagram?: string;
  sections?: ArticleSection[];
  content: {
    problemStatement: string;
    problemStatementVi?: string;
    architectureDesign: string;
    architectureDesignVi?: string;
    technicalDecisions: string[];
    technicalDecisionsVi?: string[];
    keyTakeaways: string[];
    keyTakeawaysVi?: string[];
    codeSnippet?: {
      language: string;
      title: string;
      code: string;
    };
  };
}

export interface ExperienceProject {
  name: string;
  nameVi?: string;
  role?: string;
  roleVi?: string;
  period?: string;
  periodVi?: string;
  description: string;
  descriptionVi?: string;
  highlights: string[];
  highlightsVi?: string[];
  techStack: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  periodVi?: string;
  role: string;
  roleVi?: string;
  company: string;
  companyVi?: string;
  companyDescription?: string;
  companyDescriptionVi?: string;
  location: string;
  locationVi?: string;
  type: "Full-time" | "Contract" | "Lead" | "Education";
  typeVi?: string;
  summary: string;
  summaryVi?: string;
  projects?: ExperienceProject[];
  contributions: string[];
  contributionsVi?: string[];
  techStack: string[];
  link?: string;
}

export interface TechItem {
  name: string;
  highlight?: boolean;
  capabilities: string[];
  capabilitiesVi?: string[];
  iconName?: string;
}

export interface TechCategory {
  title: string;
  titleVi?: string;
  tagline: string;
  taglineVi?: string;
  items: TechItem[];
}

export interface BentoStat {
  label: string;
  labelVi?: string;
  value: string;
  description: string;
  descriptionVi?: string;
}

export interface AIResponse {
  answer: string;
  relatedTopic?: string;
  relevantLinks?: { label: string; url: string }[];
  tags?: string[];
}
