import { KnowledgeDocument } from "../types";

export const SEED_KNOWLEDGE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "doc-arda-architecture",
    slug: "designing-arda-cloud-native-finops-platform",
    title: "Designing Arda: A Cloud-Native FinOps & Multi-Tenant Platform with Go, gRPC, and React Module Federation",
    category: "Architecture",
    tags: ["Go", "gRPC", "NATS", "Module Federation", "Kubernetes", "K3s", "Ory Kratos", "Ory Hydra"],
    url: "/writing/designing-arda-cloud-native-finops-platform",
    summary:
      "Phân tích chuyên sâu kiến trúc nền tảng Arda: 9 Go microservices, event bus NATS JetStream với Transactional Outbox, React Module Federation (7 remotes) và hệ thống IAM phân tán bằng Ory Kratos/Hydra trên K3s.",
    content: `Arda là nền tảng FinOps và SaaS đa người dùng giải quyết bài toán quản lý tài chính đám mây và quy trình vận hành phức tạp.
Điểm nổi bật:
- 9 Go Microservices: Tách biệt domain rõ ràng (iam, platform, finance, workflow, crm, hrm, notification, media, mdm).
- Giao tiếp đồng bộ qua gRPC (Protobuf contracts) và giao tiếp bất đồng bộ qua NATS JetStream.
- Áp dụng Transactional Outbox Pattern để bảo đảm an toàn dữ liệu phân tán.
- Frontend React Module Federation gồm 1 Shell và 7 Remotes chia sẻ Design System (@workspace/*).
- Triển khai trên cụm 3-node bare-metal K3s với CloudNativePG HA và Traefik ForwardAuth Ingress.`,
  },
  {
    id: "doc-puchi-architecture",
    slug: "puchi-vietnamese-learning-platform-architecture",
    title: "Puchidemy: Building a High-Performance Language Learning Platform with Go Kratos v3, Next.js PWA, and ArgoCD GitOps",
    category: "Architecture",
    tags: ["Go", "Kratos", "Next.js", "PWA", "NATS", "ArgoCD", "GitOps", "Cloudflare R2"],
    url: "/writing/puchi-vietnamese-learning-platform-architecture",
    summary:
      "Kiến trúc nền tảng học tiếng Việt Puchidemy: Go Kratos v3 microservices, Next.js Progressive Web App, Limen Auth opaque sessions, và GitOps pipeline tự động trên Kubernetes.",
    content: `Puchidemy được xây dựng nhằm đem lại trải nghiệm học ngôn ngữ mượt mà và tương tác cao:
- 5 Go Microservices monorepo phát triển theo chuẩn Go Kratos v3 framework.
- Next.js Progressive Web App (PWA) với tính năng cache audio thông minh trên Cloudflare R2 (zero egress cost).
- Cơ chế bảo mật Limen Auth sử dụng Opaque Session cookies bảo vệ an toàn API.
- Tự động hoá triển khai 100% bằng ArgoCD GitOps trên cụm K3s.`,
  },
  {
    id: "doc-homelab-k3s",
    slug: "building-a-3-node-k3s-cluster-on-bare-metal-proxmox",
    title: "Building and Operating a Resilient 3-Node K3s Cluster on Bare-Metal Proxmox for Microservices",
    category: "DevOps & Infrastructure",
    tags: ["Kubernetes", "K3s", "Proxmox", "CloudNativePG", "Traefik", "GitOps", "ArgoCD", "Homelab"],
    url: "/writing/building-a-3-node-k3s-cluster-on-bare-metal-proxmox",
    summary:
      "Hướng dẫn thực chiến tự xây dựng và vận hành cụm Kubernetes K3s 3 nodes trên nền tảng Proxmox homelab, cấu hình CloudNativePG HA, Traefik Ingress và ArgoCD GitOps.",
    content: `Chia sẻ kinh nghiệm tự vận hành hệ thống máy chủ cá nhân:
- Thiết lập cụm K3s 3-node HA control plane.
- Cài đặt CloudNativePG quản lý High Availability PostgreSQL với tự động chuyển đổi dự phòng (failover).
- Cấu hình Traefik Ingress với ForwardAuth và Cloudflare Tunnel cho phép truy cập an toàn từ internet mà không cần mở port modem.
- Quản lý toàn bộ application manifests qua GitOps repository với ArgoCD.`,
  },
  {
    id: "doc-micro-frontends",
    slug: "pragmatic-micro-frontends-angular-and-module-federation",
    title: "Pragmatic Micro-Frontends: Sharing State, Managing Dependencies, and Lessons from Angular & React",
    category: "Frontend Architecture",
    tags: ["Micro-Frontend", "Angular", "Module Federation", "React", "TypeScript", "RxJS", "State Management"],
    url: "/writing/pragmatic-micro-frontends-angular-and-module-federation",
    summary:
      "Kinh nghiệm thực tế khi xây dựng kiến trúc Micro-Frontend: so sánh Angular Micro-Frontend và React Module Federation, cách xử lý state synchronization và quản lý dependencies dùng chung.",
    content: `Phân tích sâu về kiến trúc Micro-Frontends qua 2 dự án thực tế EPAS (Angular) và Arda (React Module Federation):
- Cách thức phân chia ranh giới giữa Shell application và Remote modules.
- Quản lý version conflicts và chia sẻ singleton packages (@workspace/core, @angular/core).
- Giao tiếp và đồng bộ trạng thái phân tán không phụ thuộc vào global window object.
- Đánh giá trade-offs giữa tính độc lập của team phát triển và kích thước bundle tải trang.`,
  },
];
