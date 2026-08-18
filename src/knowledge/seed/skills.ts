import { SkillCategory } from "../types";

export const SEED_SKILLS: SkillCategory[] = [
  {
    category: "frontend",
    title: "Frontend & Architecture",
    items: [
      {
        name: "Angular & Micro-Frontends",
        capabilities: [
          "Xây dựng kiến trúc Micro-Frontend quy mô lớn (Module Federation, Native Federation)",
          "Quản lý state phức tạp và Reactive Programming với RxJS",
          "Thiết kế Design System và Component Libraries dùng chung",
          "Tối ưu Change Detection (OnPush, Signals) và lazy loading",
        ],
      },
      {
        name: "React & Next.js Ecosystem",
        capabilities: [
          "Next.js App Router, Server Components, SSR/SSG/ISR",
          "React 19, Hooks, Context API, state management (Zustand, Redux Toolkit)",
          "Tailwind CSS, Radix UI / shadcn/ui, Framer Motion animations",
          "Progressive Web Apps (PWA) và tối ưu Core Web Vitals",
        ],
      },
      {
        name: "TypeScript & Core Web",
        capabilities: [
          "TypeScript strict type-safety, Generics, Discriminated Unions",
          "DOM APIs, Web Workers, WebSockets, SSE",
        ],
      },
    ],
  },
  {
    category: "backend",
    title: "Backend & Microservices",
    items: [
      {
        name: "Go (Golang)",
        capabilities: [
          "Xây dựng microservices hiệu năng cao với gRPC (Protobuf) và REST",
          "Go Kratos v3 framework, Gin, Chi, Chi Router",
          "Event-driven architecture với NATS JetStream & Transactional Outbox pattern",
          "Database connection pooling, migrations, sqlc, GORM",
        ],
      },
      {
        name: "Java Spring Boot",
        capabilities: [
          "Spring Boot 3, Spring Data JPA, Spring Security, Hibernate",
          "Thiết kế enterprise RESTful APIs, transactional service boundaries",
          "Tích hợp Kafka, Redis cache, và RBAC/Keycloak IAM",
        ],
      },
      {
        name: "Node.js & Runtime APIs",
        capabilities: ["Next.js Route Handlers, Express, NestJS", "Serverless Functions, Vercel AI SDK"],
      },
    ],
  },
  {
    category: "devops",
    title: "DevOps, Kubernetes & Cloud-native",
    items: [
      {
        name: "Kubernetes & K3s",
        capabilities: [
          "Tự vận hành cụm 3-node bare-metal K3s cluster trên Proxmox homelab",
          "Triển khai Ingress (Traefik), ForwardAuth, Cloudflare Tunnel",
          "Cấu hình CloudNativePG HA (High Availability PostgreSQL cluster)",
          "Quản lý ConfigMaps, Secrets, PVCs (Local Path Provisioner, Longhorn)",
        ],
      },
      {
        name: "GitOps & CI/CD",
        capabilities: [
          "ArgoCD GitOps declarative application delivery",
          "GitHub Actions automated build, test & multi-arch Docker image push",
          "Jenkins enterprise automated pipelines",
        ],
      },
      {
        name: "Containers & Linux",
        capabilities: [
          "Docker, Docker Compose, multi-stage builds tối ưu dung lượng",
          "Quản trị Linux Server (Ubuntu Server, Debian), systemd, networking",
        ],
      },
    ],
  },
  {
    category: "database",
    title: "Database & Storage",
    items: [
      {
        name: "PostgreSQL & Neon",
        capabilities: [
          "PostgreSQL performance tuning, index optimization (B-tree, GIN)",
          "JSONB querying, Full-Text Search, pgvector extension",
          "CloudNativePG HA replication & automated failover",
          "Neon Serverless PostgreSQL integration",
        ],
      },
      {
        name: "Oracle Database",
        capabilities: ["PL/SQL, stored procedures, complex query optimization trong dự án ngân hàng"],
      },
      {
        name: "Caching & Messaging",
        capabilities: [
          "Redis & Valkey: cache-aside, distributed lock, session storage",
          "NATS JetStream: Pub/Sub, Key-Value store, Object store, Stream deduplication",
        ],
      },
    ],
  },
  {
    category: "iot_systems",
    title: "Systems, IoT & Native Tools",
    items: [
      {
        name: "Rust & Desktop Systems",
        capabilities: [
          "Rust async (Tokio), low-level networking, memory safety",
          "Tauri v2 + Rust + SolidJS cross-platform desktop application (B4S)",
          "Reverse-engineering Bluetooth Low Energy (BLE) protocols (btleplug)",
          "High-performance video streaming bridge (CamRelay: RTSP, Dahua P2P, FFmpeg)",
        ],
      },
    ],
  },
];
