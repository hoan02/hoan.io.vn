export interface SocialLink {
  name: string;
  url: string;
  username?: string;
}

export interface OrganizationInfo {
  name: string;
  github: string;
  website?: string;
  description: string;
}

export interface Profile {
  fullName: string;
  fullNameVi: string;
  displayName: string;
  birthday: string;
  birthYear: number;
  age: number;
  location: string;
  headline: string;
  summary: string;
  email: string;
  phone: string;
  cvUrl: string;
  website: string;
  interests: string[];
  hobbies: string[];
  socialLinks: SocialLink[];
  openSourceOrganizations: OrganizationInfo[];
}

export interface Education {
  school: string;
  schoolVi: string;
  degree: string;
  degreeVi: string;
  honor: string;
  honorVi: string;
  period: string;
  major: string;
  capstoneTopic?: string;
  achievements?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  contributions: string[];
  techStack: string[];
}

export interface SkillCategory {
  category: "frontend" | "backend" | "devops" | "database" | "iot_systems" | "architecture";
  title: string;
  items: {
    name: string;
    capabilities: string[];
  }[];
}

export interface Evidence {
  id: string;
  type: "github" | "blog" | "resume" | "project" | "experience" | "manual";
  source?: string;
  url?: string;
  claim: string;
  statement: string;
  technologies: string[];
  confidence: "high" | "verified";
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  organization?: string;
  role: string;
  period?: string;
  year?: string;
  summary: string;
  description?: string;
  problem: string;
  techStack: string[];
  domains: string[];
  competencies: string[];
  architecture: string[];
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  repositories?: {
    name: string;
    url: string;
  }[];
  links?: {
    label: string;
    url: string;
  }[];
  evidence?: Evidence[];
}

export interface KnowledgeDocument {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  tags: string[];
  url: string;
}
