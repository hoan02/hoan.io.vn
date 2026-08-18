export type EvidenceCategory =
  | "architecture"
  | "frontend"
  | "backend"
  | "auth"
  | "events"
  | "workflow"
  | "database"
  | "devops"
  | "infrastructure"
  | "product";

export type ConfidenceLevel = "direct" | "strong-inference" | "direction";

export interface EvidenceSource {
  repository: string;
  file?: string;
  url?: string;
  description: string;
}

export interface EngineeringEvidence {
  id: string;
  project: "arda" | "puchi" | "epas" | "infrastructure" | "personal";
  category: EvidenceCategory;
  claim: string;
  claimVi: string;
  evidence: EvidenceSource[];
  confidence: ConfidenceLevel;
  relatedArticles?: string[];
  technologies: string[];
}
