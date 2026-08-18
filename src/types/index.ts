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
  role: string;
  roleVi?: string;
  year: string;
  techStack: string[];
  category: "Full-stack" | "Backend" | "Frontend" | "DevOps & Cloud";
  categoryVi?: string;
  metrics?: string[];
  metricsVi?: string[];
  architecture?: string[];
  architectureVi?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  image: string;
  accentColor?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  periodVi?: string;
  role: string;
  roleVi?: string;
  company: string;
  companyVi?: string;
  location: string;
  locationVi?: string;
  type: "Full-time" | "Contract" | "Lead";
  typeVi?: string;
  summary: string;
  summaryVi?: string;
  contributions: string[];
  contributionsVi?: string[];
  techStack: string[];
  link?: string;
}

export interface TechItem {
  name: string;
  level: "Advanced" | "Proficient" | "Core";
  highlight?: boolean;
  description: string;
  descriptionVi?: string;
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
