import { Article } from "@/types";
import { ARTICLES_DATA } from "./portfolioData";

// The writing index is a notebook: each series is a chapter (a "line" here),
// each article a page. Interchanges link pages where two systems solve the same
// problem differently ("see also"). Flows are short request/data paths from each
// article's own summary.

export type LineId = "A" | "P" | "E" | "S" | "J";

export interface TransitLine {
  id: LineId;
  name: string;
  nameVi: string;
  meta: string;
  metaVi: string;
  /** CSS color (a theme variable) for the line's rail and stations. */
  color: string;
  stops: string[];
}

export interface TransitStopInfo {
  short: string;
  shortVi: string;
  flow: string[];
}

export const TRANSIT_LINES: TransitLine[] = [
  {
    id: "A",
    name: "Building Arda",
    nameVi: "Xây dựng Arda",
    meta: "Arda Labs · financial operations platform",
    metaVi: "Arda Labs · nền tảng vận hành tài chính",
    color: "var(--tab-a)",
    stops: [
      "designing-arda-cloud-native-finops-platform",
      "authentication-beyond-jwt-arda-identity-architecture",
      "reliable-domain-events-nats-transactional-outbox",
      "bpmn-workflow-service-boundary-zeebe",
      "multi-remote-micro-frontend-platform-module-federation",
      "arda-ai-service-agent-boundary",
      "production-like-platform-three-node-k3s-cluster"
    ]
  },
  {
    id: "P",
    name: "Building Puchi",
    nameVi: "Xây dựng Puchi",
    meta: "Puchidemy · language learning PWA",
    metaVi: "Puchidemy · PWA học ngôn ngữ",
    color: "var(--tab-p)",
    stops: [
      "building-puchi-product-idea-to-service-architecture",
      "why-puchi-uses-opaque-sessions-over-jwt",
      "git-push-to-k3s-puchi-gitops-pipeline",
      "designing-story-based-language-learning-engine"
    ]
  },
  {
    id: "E",
    name: "EPAS in production",
    nameVi: "EPAS thực chiến",
    meta: "Enterprise lending & operations",
    metaVi: "Tín dụng & vận hành doanh nghiệp",
    color: "var(--tab-e)",
    stops: [
      "epas-transaction-inbox-and-compliance-boundaries",
      "angular-microfrontend-architecture",
      "epas-private-enterprise-delivery",
      "zalo-oa-conversation-operations"
    ]
  },
  {
    id: "S",
    name: "Systems & field notes",
    nameVi: "Hệ thống & field notes",
    meta: "Homelab, Rust, hardware",
    metaVi: "Homelab, Rust, phần cứng",
    color: "var(--tab-s)",
    stops: [
      "homelab-thinkcentre-proxmox-k3s",
      "camrelay-from-proprietary-p2p-to-private-rtsp",
      "b4s-reverse-engineering-a-local-ble-companion"
    ]
  },
  {
    id: "J",
    name: "Journal",
    nameVi: "Nhật ký",
    meta: "Career & frontend notes",
    metaVi: "Sự nghiệp & ghi chép frontend",
    color: "var(--tab-j)",
    stops: ["from-utc-engineer-to-production-systems", "mochimochi-performance-and-seo"]
  }
];

export const TRANSIT_STOPS: Record<string, TransitStopInfo> = {
  "designing-arda-cloud-native-finops-platform": { short: "Designing Arda", shortVi: "Thiết kế Arda", flow: ["HTTP edge", "15 Go svcs", "gRPC", "NATS"] },
  "authentication-beyond-jwt-arda-identity-architecture": { short: "Authentication beyond JWT", shortVi: "Xác thực vượt JWT", flow: ["session cookie", "BFF", "Kratos · Hydra", "mTLS"] },
  "reliable-domain-events-nats-transactional-outbox": { short: "Domain events & outbox", shortVi: "Domain events & outbox", flow: ["Postgres tx", "outbox", "JetStream"] },
  "bpmn-workflow-service-boundary-zeebe": { short: "BPMN workflow boundary", shortVi: "Ranh giới workflow BPMN", flow: ["workflow-svc", "Postgres", "Zeebe 8.5"] },
  "multi-remote-micro-frontend-platform-module-federation": { short: "Micro frontend platform", shortVi: "Nền tảng micro frontend", flow: ["Vite shell", "13 remotes"] },
  "arda-ai-service-agent-boundary": { short: "AI service boundary", shortVi: "Ranh giới AI service", flow: ["model call", "gateway", "tool sandbox", "approval"] },
  "production-like-platform-three-node-k3s-cluster": { short: "Three-node K3s cluster", shortVi: "Cụm K3s ba node", flow: ["3× K3s", "CNPG", "ingress"] },
  "building-puchi-product-idea-to-service-architecture": { short: "Idea to architecture", shortVi: "Từ ý tưởng đến kiến trúc", flow: ["PWA", "5 Go svcs", "NATS"] },
  "why-puchi-uses-opaque-sessions-over-jwt": { short: "Opaque sessions over JWT", shortVi: "Opaque session thay JWT", flow: ["Limen", "Postgres session", "introspect"] },
  "git-push-to-k3s-puchi-gitops-pipeline": { short: "Git push to K3s", shortVi: "Git push tới K3s", flow: ["push", "Actions", "GHCR", "ArgoCD"] },
  "designing-story-based-language-learning-engine": { short: "Story-based learning engine", shortVi: "Engine học qua câu chuyện", flow: ["City", "Story", "Scene", "Activity"] },
  "epas-transaction-inbox-and-compliance-boundaries": { short: "A credit workflow", shortVi: "Một luồng tín dụng", flow: ["request", "appraisal", "approval", "disbursement"] },
  "angular-microfrontend-architecture": { short: "Nx to micro frontends", shortVi: "Từ Nx tới micro frontend", flow: ["Nx", "Angular remotes"] },
  "epas-private-enterprise-delivery": { short: "Private enterprise delivery", shortVi: "Release trong hạ tầng kín", flow: ["remotes", "registry", "Kubernetes"] },
  "zalo-oa-conversation-operations": { short: "Zalo OA console", shortVi: "Console Zalo OA", flow: ["template", "send", "delivery state"] },
  "homelab-thinkcentre-proxmox-k3s": { short: "Inside the homelab", shortVi: "Bên trong homelab", flow: ["ThinkCentre", "Proxmox", "3 VMs", "K3s"] },
  "camrelay-from-proprietary-p2p-to-private-rtsp": { short: "Camrelay: P2P to RTSP", shortVi: "Camrelay: P2P sang RTSP", flow: ["P2P channel", "Rust daemon", "RTSP"] },
  "b4s-reverse-engineering-a-local-ble-companion": { short: "B4S: a BLE companion", shortVi: "B4S: ứng dụng BLE", flow: ["Tauri UI", "Rust session", "BLE frames"] },
  "from-utc-engineer-to-production-systems": { short: "From UTC to production", shortVi: "Từ UTC tới production", flow: [] },
  "mochimochi-performance-and-seo": { short: "Performance as UX", shortVi: "Hiệu năng là trải nghiệm", flow: ["assets", "components", "SEO"] }
};

// Topic → the stops (on different lines) that share it.
export const INTERCHANGES: { topic: string; topicVi: string; stops: string[] }[] = [
  {
    topic: "Auth",
    topicVi: "Auth",
    stops: ["authentication-beyond-jwt-arda-identity-architecture", "why-puchi-uses-opaque-sessions-over-jwt"]
  },
  {
    topic: "K3s",
    topicVi: "K3s",
    stops: ["production-like-platform-three-node-k3s-cluster", "git-push-to-k3s-puchi-gitops-pipeline", "homelab-thinkcentre-proxmox-k3s"]
  },
  {
    topic: "Micro frontends",
    topicVi: "Micro frontend",
    stops: ["multi-remote-micro-frontend-platform-module-federation", "angular-microfrontend-architecture"]
  }
];

const ARTICLE_BY_SLUG = new Map(ARTICLES_DATA.map((a) => [a.slug, a]));

export function getArticle(slug: string): Article | undefined {
  return ARTICLE_BY_SLUG.get(slug);
}

export function getLinePosition(slug: string): { line: TransitLine; index: number } | null {
  for (const line of TRANSIT_LINES) {
    const index = line.stops.indexOf(slug);
    if (index !== -1) return { line, index };
  }
  return null;
}

export function getInterchange(slug: string) {
  return INTERCHANGES.find((ix) => ix.stops.includes(slug)) ?? null;
}

/** Other stops reachable by changing lines at this stop. */
export function getTransfers(slug: string): Article[] {
  const ix = getInterchange(slug);
  if (!ix) return [];
  return ix.stops
    .filter((s) => s !== slug)
    .map((s) => ARTICLE_BY_SLUG.get(s))
    .filter((a): a is Article => Boolean(a));
}

export function getStopInfo(slug: string): TransitStopInfo {
  return TRANSIT_STOPS[slug] ?? { short: slug, shortVi: slug, flow: [] };
}
