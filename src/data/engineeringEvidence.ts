import { EngineeringEvidence } from "@/types/evidence";

export const ENGINEERING_EVIDENCE: EngineeringEvidence[] = [
  // --- ARDA LABS EVIDENCE ---
  {
    id: "arda-microservices-grpc",
    project: "arda",
    category: "backend",
    claim: "Architected 9 Go microservices with high-throughput synchronous gRPC inter-service communication and shared internal libraries.",
    claimVi: "Thiết kế 9 Go microservices giao tiếp gRPC nội bộ hiệu năng cao và chia sẻ bộ thư viện libs/go dùng chung.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "libs/go/arda-grpc, libs/go/arda-proto",
        description: "Standardized protobuf contracts and gRPC client/server interceptors across all 9 domain services (iam, platform, finance, workflow, crm, hrm, notification, media, mdm)."
      }
    ],
    confidence: "direct",
    relatedArticles: ["designing-arda-cloud-native-finops-platform"],
    technologies: ["Go", "gRPC", "Protobuf", "Microservices"]
  },
  {
    id: "arda-auth-zero-trust",
    project: "arda",
    category: "auth",
    claim: "Implemented zero-trust authentication boundary using Ory Kratos, Ory Hydra, Traefik ForwardAuth, and BFF session proxy.",
    claimVi: "Hiện thực hóa kiến trúc bảo mật zero-trust kết hợp Ory Kratos, Ory Hydra, Traefik ForwardAuth và BFF session proxy.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "auth-gateway, iam-service",
        description: "Traefik delegates authentication to auth-gateway ForwardAuth, which verifies sessions via Kratos/Hydra and injects trusted identity headers (X-User-Id, X-Tenant-Id, X-Roles, X-Permissions) to downstream services."
      }
    ],
    confidence: "direct",
    relatedArticles: ["authentication-beyond-jwt-arda-identity-architecture"],
    technologies: ["Ory Kratos", "Ory Hydra", "Traefik", "ForwardAuth", "BFF", "Go"]
  },
  {
    id: "arda-transactional-outbox-nats",
    project: "arda",
    category: "events",
    claim: "Designed reliable event-driven domain communication using NATS JetStream and the Transactional Outbox pattern to eliminate dual-write hazards.",
    claimVi: "Thiết kế cơ chế xuất bản sự kiện tin cậy qua NATS JetStream với mẫu Transactional Outbox loại bỏ rủi ro dual-write.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "libs/go/arda-events",
        description: "Envelope versioning (`ardaevents.Envelope[T]`), transactional outbox table writes within SQL transactions, background relay workers, and idempotent consumer deduplication."
      }
    ],
    confidence: "direct",
    relatedArticles: ["reliable-domain-events-nats-transactional-outbox"],
    technologies: ["NATS JetStream", "Transactional Outbox", "PostgreSQL", "Go", "Distributed Systems"]
  },
  {
    id: "arda-zeebe-workflow-boundary",
    project: "arda",
    category: "workflow",
    claim: "Isolated BPMN workflow execution behind a dedicated workflow-service boundary proxying Zeebe 8.5.",
    claimVi: "Cô lập việc thực thi quy trình BPMN phía sau phân hệ workflow-service kết nối Zeebe 8.5.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "app/workflow-service",
        description: "Domain services (finance, crm, hrm) invoke workflow-service via gRPC/HTTP rather than coupling directly to the Zeebe gRPC client, enforcing uniform case lifecycle management."
      }
    ],
    confidence: "direct",
    relatedArticles: ["bpmn-workflow-service-boundary-zeebe"],
    technologies: ["Zeebe 8.5", "BPMN", "Go", "gRPC", "Workflow Engine"]
  },
  {
    id: "arda-react-module-federation",
    project: "arda",
    category: "frontend",
    claim: "Engineered a React Module Federation architecture with a host shell and 7 decoupled remote micro-frontend applications sharing workspace packages.",
    claimVi: "Xây dựng kiến trúc React Module Federation gồm Host Shell và 7 Remote apps dùng chung các gói @workspace/*.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-mfe",
        file: "apps/shell, apps/mfe-*, packages/*",
        description: "Shell orchestrates dynamic remote loading (iam, platform, finance, account, hrm, workflow, crm) while sharing @workspace/ui (shadcn), api, auth, i18n, core, and theme packages."
      }
    ],
    confidence: "direct",
    relatedArticles: ["multi-remote-micro-frontend-platform-module-federation"],
    technologies: ["React", "Module Federation", "TypeScript", "Tailwind CSS", "Micro-Frontends"]
  },
  {
    id: "arda-k3s-gitops-infra",
    project: "arda",
    category: "infrastructure",
    claim: "Orchestrated a 3-node bare-metal K3s cluster running CloudNativePG HA PostgreSQL, Valkey, Traefik, and Cloudflare Tunnels managed declaratively via ArgoCD.",
    claimVi: "Vận hành cụm K3s bare-metal 3-node với CloudNativePG HA PostgreSQL, Valkey, Traefik và Cloudflare Tunnel quản lý bằng ArgoCD GitOps.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-infra",
        file: "k8s manifests, cluster topology (192.168.100.201-203)",
        description: "3 control-plane/worker nodes with CloudNativePG PostgreSQL operator, Valkey caching, Traefik ingress controller, and Cloudflare Tunnel zero-trust exposure."
      }
    ],
    confidence: "direct",
    relatedArticles: ["production-like-platform-three-node-k3s-cluster"],
    technologies: ["K3s", "CloudNativePG", "PostgreSQL HA", "Valkey", "Traefik", "Cloudflare Tunnel", "ArgoCD", "GitOps"]
  },

  // --- PUCHIDEMY EVIDENCE ---
  {
    id: "puchi-kratos-monorepo",
    project: "puchi",
    category: "backend",
    claim: "Structured 5 domain microservices in a Go monorepo using the Kratos v3 framework with unified protobuf schemas.",
    claimVi: "Tổ chức 5 microservices trong monorepo Go sử dụng framework Kratos v3 với schema protobuf chuẩn hóa.",
    evidence: [
      {
        repository: "https://github.com/puchidemy/puchi-backend",
        file: "app/auth, app/core, app/learn, app/media, app/notification",
        description: "Monorepo services sharing protobuf contracts, clean dependency injection, gRPC/HTTP endpoints, and decoupled business logic."
      }
    ],
    confidence: "direct",
    relatedArticles: ["building-puchi-product-idea-to-service-architecture"],
    technologies: ["Go", "Kratos v3", "Protobuf", "gRPC", "HTTP", "Microservices"]
  },
  {
    id: "puchi-opaque-session-auth",
    project: "puchi",
    category: "auth",
    claim: "Designed opaque session authentication with Bearer token introspection, central revocation authority, and multi-provider OAuth.",
    claimVi: "Thiết kế cơ chế xác thực opaque session với Bearer introspection, quản lý thu hồi tập trung và hỗ trợ đa nhà cung cấp OAuth.",
    evidence: [
      {
        repository: "https://github.com/puchidemy/puchi-backend",
        file: "app/auth, pkg/auth",
        description: "Limen-auth protocol integration: clients receive opaque bearer sessions; downstream domain services introspect session validity via internal endpoints."
      }
    ],
    confidence: "direct",
    relatedArticles: ["why-puchi-uses-opaque-sessions-over-jwt"],
    technologies: ["Limen Auth", "Opaque Sessions", "OAuth2", "Go", "Security"]
  },
  {
    id: "puchi-gitops-argocd",
    project: "puchi",
    category: "devops",
    claim: "Engineered automated GitOps delivery from GitHub commit through GitHub Actions, GHCR, and ArgoCD to a multi-node K3s cluster.",
    claimVi: "Xây dựng quy trình phân phối tự động GitOps từ commit GitHub qua GitHub Actions, GHCR và ArgoCD lên cụm K3s.",
    evidence: [
      {
        repository: "https://github.com/puchidemy/puchi-infra",
        file: "ArgoCD Application manifests, k8s/",
        description: "Declarative App of Apps pattern syncing frontend PWA and backend microservice deployments automatically upon container image pushes to GHCR."
      }
    ],
    confidence: "direct",
    relatedArticles: ["git-push-to-k3s-puchi-gitops-pipeline"],
    technologies: ["ArgoCD", "GitOps", "GitHub Actions", "GHCR", "K3s", "Docker"]
  },
  {
    id: "puchi-learning-domain-engine",
    project: "puchi",
    category: "product",
    claim: "Modeled a story-driven language learning domain separating static pedagogical content hierarchies from dynamic learner progress and streak tracking.",
    claimVi: "Mô hình hóa nghiệp vụ học ngoại ngữ theo cốt truyện, phân tách cây nội dung sư phạm tĩnh khỏi luồng ghi nhận tiến độ và streak học viên.",
    evidence: [
      {
        repository: "https://github.com/puchidemy/puchi-backend",
        file: "app/learn, app/core",
        description: "Hierarchical content model (Story -> Scene -> Content -> Activity) decoupled from user attempt evaluations and asynchronous XP/streak calculations via NATS."
      }
    ],
    confidence: "direct",
    relatedArticles: ["designing-story-based-language-learning-engine"],
    technologies: ["Domain-Driven Design", "Next.js PWA", "NATS", "PostgreSQL", "Cloudflare R2"]
  },

  // --- ENTERPRISE & HOMELAB EVIDENCE ---
  {
    id: "epas-enterprise-mfe-k8s",
    project: "epas",
    category: "architecture",
    claim: "Designed and maintained enterprise Angular Micro-Frontend architecture with shared design systems, Spring Boot microservices, and Kubernetes rollouts at NGV Group.",
    claimVi: "Thiết kế và duy trì kiến trúc Angular Micro-Frontend với hệ thống UI dùng chung, Spring Boot microservices và triển khai Kubernetes tại NGV Group.",
    evidence: [
      {
        repository: "Private Enterprise Work (NGV Group)",
        description: "Nx monorepo Angular shell with CRM/BPM remotes, dynamic forms, transaction inboxes, Kafka event streaming, and Jenkins CI/CD on on-premises Kubernetes."
      }
    ],
    confidence: "direct",
    relatedArticles: ["angular-microfrontend-architecture", "practical-cicd-jenkins-k8s", "angular-complex-list-state"],
    technologies: ["Angular", "Micro-Frontend", "Nx", "Java Spring Boot", "Oracle", "PostgreSQL", "Kafka", "Keycloak", "Kubernetes", "Jenkins"]
  },
  {
    id: "homelab-3node-longhorn",
    project: "infrastructure",
    category: "infrastructure",
    claim: "Constructed a 3-node bare-metal K3s Homelab cluster with Longhorn distributed block storage, Traefik ingress, and automated local CI/CD pipelines.",
    claimVi: "Xây dựng cụm máy chủ 3-node K3s Homelab bare-metal với lưu trữ phân tán Longhorn, Traefik ingress và CI/CD tự động.",
    evidence: [
      {
        repository: "Self-Hosted Infrastructure Lab",
        description: "3-node Ubuntu cluster running K3s v1.35, Longhorn 2x replication storage volumes, Traefik Ingress Controller, and automated container deployment pipelines."
      }
    ],
    confidence: "direct",
    relatedArticles: ["kubernetes-homelab-k3s", "production-like-platform-three-node-k3s-cluster"],
    technologies: ["Kubernetes", "K3s", "Longhorn", "Traefik", "Linux", "Ubuntu", "Docker"]
  }
];
