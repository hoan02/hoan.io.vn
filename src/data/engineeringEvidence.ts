import { EngineeringEvidence } from "@/types/evidence";

export const ENGINEERING_EVIDENCE: EngineeringEvidence[] = [
  // --- ARDA LABS EVIDENCE ---
  {
    id: "arda-microservices-grpc",
    project: "arda",
    category: "backend",
    claim: "Go workspace of 15 services (arda-be) with internal gRPC between services and shared libraries under libs/go.",
    claimVi: "Go workspace gồm 15 service (arda-be), gọi nhau nội bộ qua gRPC và dùng chung thư viện trong libs/go.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "go.work, apps/*, libs/go/*, proto/arda",
        description: "15 Go modules in go.work; protobuf contracts under proto/arda; shared libs under libs/go. Only some libraries are used by every service."
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
    claim: "Layered auth boundary: auth-gateway BFF with Redis-backed sessions behind an arda_sid cookie, Ory Kratos/Hydra for login, and mTLS plus short-lived signed workload assertions between services.",
    claimVi: "Ranh giới xác thực nhiều lớp: auth-gateway BFF giữ session trong Redis (cookie arda_sid), Ory Kratos/Hydra cho đăng nhập, và mTLS cùng workload assertion ký ngắn hạn giữa các service.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "apps/auth-gateway/internal/handler/bff_handler.go",
        description: "Gateway strips client-supplied identity headers and sets them from the validated session; it signs a short-lived service token for internal calls."
      },
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "libs/go/arda-grpc/identity, libs/go/arda-grpc/interceptors/service_auth.go",
        description: "gRPC servers require TLS 1.3 mTLS plus an HMAC workload assertion with a source allowlist; the docs describe no replay store."
      },
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "docs/financial-grade-auth-plan.md",
        description: "The plan document lists what is planned versus implemented."
      }
    ],
    confidence: "direct",
    relatedArticles: ["authentication-beyond-jwt-arda-identity-architecture"],
    technologies: ["Ory Kratos", "Ory Hydra", "BFF", "mTLS", "gRPC", "Go"]
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
    claim: "Only workflow-service talks to Zeebe 8.5; other services reach it through a two-RPC WorkflowCommandService (CreateCase, SubmitCase), with idempotent submit and a workflow outbox.",
    claimVi: "Chỉ workflow-service nói chuyện với Zeebe 8.5; các service khác đi qua WorkflowCommandService (CreateCase, SubmitCase), submit idempotent và có workflow outbox.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "apps/workflow-service, proto/arda/workflow/v1/workflow.proto",
        description: "Zeebe Go client v8.5.5 is imported only by workflow-service; case create/submit are idempotent per tenant; SLA milestones come from a Postgres scan."
      }
    ],
    confidence: "direct",
    relatedArticles: ["bpmn-workflow-service-boundary-zeebe"],
    technologies: ["Zeebe", "BPMN", "Go", "gRPC", "PostgreSQL"]
  },
  {
    id: "arda-react-module-federation",
    project: "arda",
    category: "frontend",
    claim: "React Module Federation shell with 13 domain remotes, a route-prefix registry, shared singletons configured in federation.shared.ts, and per-route error boundaries.",
    claimVi: "Shell React Module Federation cùng 13 remote theo domain, registry route prefix, shared singleton cấu hình trong federation.shared.ts và error boundary theo route.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-mfe",
        file: "federation.routes.ts, federation.shared.ts, apps/*",
        description: "apps/ holds the shell and 13 remotes; packages/ holds 14 shared @workspace packages."
      }
    ],
    confidence: "direct",
    relatedArticles: ["multi-remote-micro-frontend-platform-module-federation"],
    technologies: ["React", "Module Federation", "TypeScript"]
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
    claim: "Opaque Limen sessions stored in Postgres; core, learn, media and notification resolve them via an internal HTTP session endpoint with a 60-second in-process cache.",
    claimVi: "Session opaque của Limen lưu trong Postgres; core, learn, media, notification kiểm tra qua endpoint HTTP nội bộ với cache trong process 60 giây.",
    evidence: [
      {
        repository: "https://github.com/puchidemy/puchi-backend",
        file: "pkg/auth/jwt.go, pkg/auth/middleware.go, app/auth/migrations/001_limen_schema.up.sql",
        description: "Introspection is an HTTP GET to /internal/session with a 5 s client timeout; revocation is immediate at auth-service but cached up to 60 s elsewhere."
      }
    ],
    confidence: "direct",
    relatedArticles: ["why-puchi-uses-opaque-sessions-over-jwt"],
    technologies: ["Limen", "Opaque Sessions", "Go", "Security"]
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
    claim: "Built and evolved the Angular Micro-Frontend foundation for EPAS at NGV Group, including shared UI, lending and disbursement forms, transaction inboxes, workflow-facing screens, reporting surfaces, and private Kubernetes delivery.",
    claimVi: "Xây dựng và tái cấu trúc nền tảng Angular Micro-Frontend cho EPAS tại NGV Group, gồm UI dùng chung, biểu mẫu cho vay và giải ngân, hộp thư giao dịch, màn hình gắn với workflow, bề mặt báo cáo và delivery trên Kubernetes private.",
    evidence: [
      {
        repository: "Private Enterprise Work (NGV Group)",
        description: "Private enterprise work: an Angular host with independently delivered CRM/BPM and credit-workflow modules. The early foundation used Nx, then the frontend structure was redesigned without Nx; the system includes dynamic forms, transaction inboxes, workflow and audit-facing UI, Kafka integration, and Jenkins CI/CD on on-premises Kubernetes."
      }
    ],
    confidence: "direct",
    relatedArticles: ["angular-microfrontend-architecture", "epas-transaction-inbox-and-compliance-boundaries", "epas-private-enterprise-delivery"],
    technologies: ["Angular", "Micro-Frontend", "Java Spring Boot", "Oracle", "PostgreSQL", "Kafka", "Keycloak", "Kubernetes", "Jenkins"]
  },
  {
    id: "homelab-3node-longhorn",
    project: "infrastructure",
    category: "infrastructure",
    claim: "Built and operate a Proxmox-based K3s Homelab on one ThinkCentre host with three Ubuntu 26 VMs, Longhorn storage, Traefik ingress, and automated local CI/CD pipelines.",
    claimVi: "Xây dựng và vận hành Homelab K3s trên Proxmox với một máy ThinkCentre, 3 VM Ubuntu 26, storage Longhorn, Traefik ingress và CI/CD tự động.",
    evidence: [
      {
        repository: "Self-Hosted Infrastructure Lab",
        description: "One ThinkCentre host with Intel Xeon E-2286M (8 cores / 16 threads) and 32 GB RAM, running Proxmox with three Ubuntu 26 VMs. The guests run K3s, Longhorn storage, Traefik Ingress Controller, and automated container deployment pipelines."
      }
    ],
    confidence: "direct",
    relatedArticles: ["homelab-thinkcentre-proxmox-k3s"],
    technologies: ["ThinkCentre", "Xeon E-2286M", "Proxmox", "Kubernetes", "K3s", "Longhorn", "Traefik", "Ubuntu 26", "Docker"]
  },

  // --- IOT & SYSTEMS REVERSE ENGINEERING EVIDENCE ---
  {
    id: "camrelay-rust-p2p-rtsp",
    project: "camrelay",
    category: "systems",
    claim: "Built a Rust/Tokio TCP tunnel that reaches a camera over a vendor P2P path, fronted by a loopback RTSP authentication proxy; recording uses FFmpeg -c copy and archiving uses rclone. It is a tunnel, not an RTSP server, and no performance figures are claimed.",
    claimVi: "Xây dựng TCP tunnel Rust/Tokio tới camera qua đường P2P của hãng, phía trước là proxy xác thực RTSP trên loopback; ghi hình bằng FFmpeg -c copy, lưu trữ bằng rclone. Đây là tunnel, không phải RTSP server, và không công bố số liệu hiệu năng.",
    evidence: [
      {
        repository: "hoan02/camrelay",
        file: "src/tunnel.rs",
        description: "Tokio TCP tunnel over the P2P session; recordings live in src/recordings.rs and the validated device path in docs/device-validation-matrix.md."
      }
    ],
    confidence: "direct",
    relatedArticles: ["camrelay-from-proprietary-p2p-to-private-rtsp"],
    technologies: ["Rust", "Tokio", "RTSP", "P2P Signaling", "FFmpeg", "rclone", "Axum"]
  },
  {
    id: "b4s-tauri-rust-ble-gatt",
    project: "b4s",
    category: "systems",
    claim: "Built an unofficial desktop companion for Baseus earbuds with Tauri v2, Rust (btleplug) and SolidJS: local Bluetooth LE control, two wire framings (bare AA/BA and a 789C frame with CRC-16), and a catalog of 124 profiles of which 7 can send commands (1 verified, 6 experimental). Tested on Windows.",
    claimVi: "Xây dựng app desktop không chính thức cho tai nghe Baseus với Tauri v2, Rust (btleplug) và SolidJS: điều khiển Bluetooth LE cục bộ, hai kiểu framing (bare AA/BA và frame 789C có CRC-16), catalog 124 profile trong đó 7 gửi được lệnh (1 verified, 6 experimental). Đã test trên Windows.",
    evidence: [
      {
        repository: "hoan02/b4s",
        file: "src-tauri/src/device/session.rs",
        description: "Session model over btleplug that only exposes device-confirmed state; codecs live in src-tauri/src/protocol/ (wrap_v2.rs for the 789C frame) and profiles in src-tauri/catalog/models/."
      }
    ],
    confidence: "direct",
    relatedArticles: ["b4s-reverse-engineering-a-local-ble-companion"],
    technologies: ["Tauri v2", "Rust", "SolidJS", "Bluetooth LE", "btleplug", "TypeScript", "SCSS"]
  },
  {
    id: "arda-ai-gateway-boundary",
    project: "arda",
    category: "auth",
    claim: "The AI service sits behind the auth-gateway: client identity headers are stripped and re-injected from the session, and a one-minute service token with audience ai-service is signed for /api/ai/* and /api/rag/*.",
    claimVi: "AI service nằm sau auth-gateway: header danh tính từ client bị loại bỏ rồi gắn lại từ session, kèm token dịch vụ 1 phút với audience ai-service cho /api/ai/* và /api/rag/*.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "apps/auth-gateway/internal/handler/bff_handler.go",
        description: "Gateway strips and re-sets identity headers and signs the ai-service token."
      },
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "apps/ai-service/internal/handler/service_auth.go",
        description: "ai-service verifies the service assertion; domain /internal/ai surfaces accept only source ai-service."
      }
    ],
    confidence: "direct",
    relatedArticles: ["arda-ai-service-agent-boundary"],
    technologies: ["Go", "AI Agents", "BFF", "Security"]
  },
  {
    id: "arda-ai-code-mode-catalog",
    project: "arda",
    category: "backend",
    claim: "The model sees four meta-tools (search, execute, readResult, renderChart); scripts run in a sandbox against a catalog of 40 SDK methods (35 generated from contracts/ai-internal, 5 hand-registered), 39 read-only and 1 confirm-kind, each permission-checked in Go.",
    claimVi: "Model chỉ thấy 4 meta-tool; script chạy trong sandbox trên catalog 40 SDK method (35 sinh từ contracts/ai-internal, 5 đăng ký tay), 39 chỉ-đọc và 1 cần xác nhận, mỗi method được kiểm quyền trong Go.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "apps/ai-service/internal/catalog/entry.go",
        description: "Catalog entries declare access level and permission; the sandbox executes scripts against them."
      },
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "apps/ai-service/internal/sandbox/engine.go",
        description: "ADR-002 records the tool authorization rationale."
      }
    ],
    confidence: "direct",
    relatedArticles: ["arda-ai-service-agent-boundary"],
    technologies: ["Go", "AI Agents", "Goja", "Authorization"]
  },
  {
    id: "arda-ai-hitl-approvals",
    project: "arda",
    category: "backend",
    claim: "Human-in-the-loop approvals are a Postgres state machine (PENDING, APPROVED, REJECTED, EXPIRED, CONSUMED): the approver cannot be the requester, only the run owner executes, and a stale permission version blocks execution.",
    claimVi: "Phê duyệt human-in-the-loop là state machine trên Postgres (PENDING, APPROVED, REJECTED, EXPIRED, CONSUMED): người duyệt không được là người yêu cầu, chỉ chủ run được thực thi và permission version cũ sẽ bị chặn.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "apps/ai-service/internal/repository/approval_store.go",
        description: "Claim step uses FOR UPDATE and a CONSUMED flip."
      },
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "apps/ai-service/internal/handler/resume.go",
        description: "The approval store has three unit tests; none is database-backed."
      }
    ],
    confidence: "direct",
    relatedArticles: ["arda-ai-service-agent-boundary"],
    technologies: ["Go", "PostgreSQL", "Human-in-the-loop"]
  },
  {
    id: "arda-ai-model-profiles-quota",
    project: "arda",
    category: "backend",
    claim: "Tenant-owned model profiles support four API formats, API keys are stored encrypted (AES-256-GCM via arda-crypto), and a monthly token quota reserves tokens per run with a circuit breaker for failing providers.",
    claimVi: "Model profile thuộc về tenant hỗ trợ bốn API format, API key lưu mã hóa (AES-256-GCM qua arda-crypto), quota token theo tháng giữ chỗ theo từng run và có circuit breaker cho provider lỗi.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "apps/ai-service/internal/model/format.go",
        description: "Formats: chat_completions, anthropic_messages, openai_responses, google_gemini."
      },
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "apps/ai-service/internal/repository/quota_store.go",
        description: "Quota and circuit breaker live in ai-service."
      }
    ],
    confidence: "direct",
    relatedArticles: ["arda-ai-service-agent-boundary"],
    technologies: ["Go", "LLM", "Cryptography"]
  },
  {
    id: "arda-ai-knowledge-untrusted-text",
    project: "arda",
    category: "backend",
    claim: "Retrieval is tenant, scope and version scoped (pgvector), and retrieved text is treated as untrusted: act mode is disabled after a knowledge read, and a reviewer cannot approve their own source.",
    claimVi: "Truy xuất tri thức giới hạn theo tenant, phạm vi và phiên bản (pgvector); văn bản truy xuất được coi là không tin cậy: act mode bị tắt sau khi đọc tri thức và người duyệt không thể tự duyệt nguồn của mình.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "apps/ai-service/internal/knowledge/repository.go",
        description: "Retrieval SQL does not filter on document-level ACL or classification yet; the design doc says it should."
      }
    ],
    confidence: "strong-inference",
    relatedArticles: ["arda-ai-service-agent-boundary"],
    technologies: ["Go", "RAG", "pgvector", "Security"]
  },
  {
    id: "arda-outbox-skip-locked-relay",
    project: "arda",
    category: "events",
    claim: "Finance, workflow, loan and statistical relays claim outbox rows with FOR UPDATE SKIP LOCKED and publish with the row id as Nats-Msg-Id; delivery is at-least-once.",
    claimVi: "Relay của finance, workflow, loan, statistical lấy dòng outbox bằng FOR UPDATE SKIP LOCKED và publish với id dòng làm Nats-Msg-Id; đảm bảo at-least-once.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "apps/finance-service/internal/service/outbox_relay.go",
        description: "A finance test shows two replicas publish one pending row once."
      }
    ],
    confidence: "direct",
    relatedArticles: ["reliable-domain-events-nats-transactional-outbox"],
    technologies: ["NATS JetStream", "PostgreSQL", "Go"]
  },
  {
    id: "arda-outbox-dlq-replay",
    project: "arda",
    category: "events",
    claim: "notification-service dead-letters outbox rows after 10 attempts into notification_outbox_dlq, and a CLI replays a single row with operator identity and confirmation.",
    claimVi: "notification-service chuyển dòng outbox vào notification_outbox_dlq sau 10 lần thử, và có CLI phát lại từng dòng kèm danh tính operator và xác nhận.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-be",
        file: "apps/notification-service/migrations/20260825150000_add_outbox_dlq.sql",
        description: "DLQ table and replay command exist in the notification service."
      }
    ],
    confidence: "direct",
    relatedArticles: ["reliable-domain-events-nats-transactional-outbox"],
    technologies: ["PostgreSQL", "Go", "DLQ"]
  },
  {
    id: "arda-mfe-federation-shared-singletons",
    project: "arda",
    category: "frontend",
    claim: "federation.shared.ts lists 20 shared entries with requiredVersion false and 8 documented per-remote exemptions, checked by a check:federation script.",
    claimVi: "federation.shared.ts liệt kê 20 shared entry với requiredVersion false và 8 ngoại lệ theo remote có ghi chú, được kiểm bằng script check:federation.",
    evidence: [
      {
        repository: "https://github.com/arda-labs/arda-mfe",
        file: "federation.shared.ts",
        description: "Shared singleton configuration and its compatibility check."
      }
    ],
    confidence: "direct",
    relatedArticles: ["multi-remote-micro-frontend-platform-module-federation"],
    technologies: ["Module Federation", "React"]
  },
];
