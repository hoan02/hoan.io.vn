import { Project, ExperienceItem, TechCategory, BentoStat, Article } from "@/types";
import { ADDITIONAL_ARTICLES } from "./additionalArticles";

export const PERSONAL_INFO = {
  name: "Le Cong Hoan",
  nameVi: "Lê Công Hoan",
  dateOfBirth: "02/04/2002",
  title: "Full-stack Engineer & System Builder",
  titleVi: "Full-stack Engineer & System Builder",
  phone: "0358 069 992",
  email: "lehoan.dev@gmail.com",
  github: "https://github.com/hoan02",
  linkedin: "https://www.linkedin.com/in/hoan02",
  facebook: "https://web.facebook.com/hoanit02",
  cvUrl: "/cv/Le_Cong_Hoan_CV.pdf",
  location: "Hanoi, Vietnam • Available for Remote / Hybrid",
  locationVi: "Hà Nội, Việt Nam • Sẵn sàng làm việc Remote / Hybrid",
  status: "Building enterprise workflows, products, and self-hosted systems",
  statusVi: "Xây dựng workflow enterprise, sản phẩm và hệ thống tự vận hành",
  roleTagline: "Enterprise workflow platforms, product engineering, distributed systems, and private infrastructure.",
  roleTaglineVi: "Nền tảng workflow enterprise, product engineering, hệ thống phân tán và hạ tầng private.",
  bio: "Full-stack Engineer building systems where business workflows, data, and operations meet. My work spans EPAS process automation for multiple credit institutions, product platforms such as ARDA and Puchi, and lower-level systems including self-hosted infrastructure, camera relays, and local Bluetooth tooling.",
  bioVi: "Full-stack Engineer xây dựng những hệ thống nơi quy trình nghiệp vụ, dữ liệu và vận hành phải hoạt động cùng nhau. Công việc của tôi trải rộng từ EPAS — nền tảng tự động hóa quy trình cho nhiều tổ chức tín dụng — đến ARDA, Puchi và các hệ thống cấp thấp như hạ tầng tự vận hành, camera relay và công cụ Bluetooth local.",
  education: {
    school: "University of Transport and Communications",
    schoolVi: "Trường Đại học Giao thông Vận tải",
    degree: "Degree of Engineer in Information Technology",
    degreeVi: "Kỹ sư Công nghệ Thông tin",
    honor: "Graduated with Distinction",
    honorVi: "Tốt nghiệp loại Giỏi",
    period: "10/2020 – 08/2024"
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "epas-enterprise-process-automation",
    title: "EPAS — Enterprise Process Automation System",
    titleVi: "EPAS — Hệ thống Tự động hóa Quy trình Doanh nghiệp",
    subtitle: "Configurable workflow platform for lending, disbursement, operations, and reporting across credit institutions",
    subtitleVi: "Nền tảng workflow có thể cấu hình cho nghiệp vụ cho vay, giải ngân, vận hành và báo cáo tại nhiều tổ chức tín dụng",
    description: "A private enterprise process platform used across multiple credit institutions, including central-level organizations and People's Credit Funds, covering lending workflows, appraisal and approval, disbursement, post-disbursement operations, transaction handling, and operational or compliance reporting.",
    descriptionVi: "Nền tảng tự động hóa quy trình enterprise được sử dụng tại nhiều tổ chức tín dụng, gồm các đơn vị cấp trung ương và quỹ tín dụng nhân dân, bao phủ quy trình cho vay, thẩm định/phê duyệt, giải ngân, nghiệp vụ sau giải ngân, xử lý giao dịch và báo cáo vận hành hoặc tuân thủ.",
    problem: "The product had to express different institutions' business rules through configurable workflows while keeping forms, documents, approvals, transaction queues, audit history, and reporting facts consistent across business modules.",
    problemVi: "Sản phẩm phải thể hiện các rule nghiệp vụ khác nhau giữa nhiều tổ chức thông qua workflow có thể cấu hình, đồng thời giữ tính nhất quán cho biểu mẫu, hồ sơ, phê duyệt, hàng đợi giao dịch, lịch sử audit và dữ kiện báo cáo giữa các phân hệ.",
    architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│          Angular Host / Shared Frontend Contracts           │
│   Auth • Navigation • Forms • Tables • Transaction State    │
└──────────────┬───────────────────────────────┬──────────────┘
               │       Independently delivered modules        │
        ┌──────▼──────┐                 ┌──────▼──────┐
        │ CRM / Core  │                 │ BPM / Credit│
        │ Workflows   │                 │ Workflows   │
        └──────┬──────┘                 └──────┬──────┘
               │                               │
               └───────────────┬───────────────┘
                               ▼
        ┌─────────────────────────────────────────────┐
        │        Java Spring Boot Business Services   │
        │ Lending • Approval • Disbursement • Reports │
        └──────────────┬───────────────┬──────────────┘
                       │               │
        ┌──────────────▼──────┐ ┌──────▼──────────────┐
        │ Oracle / PostgreSQL │ │ Kafka • Redis • IAM  │
        └─────────────────────┘ └─────────────────────┘`,
    contributionsDetailed: [
      "Started the Angular Micro-Frontend foundation with Nx to establish shared conventions, routing, and shell-to-remote coordination.",
      "Reworked the frontend structure later and removed Nx when a more flexible delivery model better matched the product's independent business modules.",
      "Engineered shared component libraries for dynamic forms, custom data grids with virtual scrolling, pagination, and multi-file attachments.",
      "Implemented lending and disbursement transaction inboxes with task dispatching, audit trails, and multi-tier approval flows.",
      "Integrated frontend clients with Spring Boot REST services, Keycloak OIDC authentication, and Kafka event streaming.",
      "Supported operational and compliance-facing reporting surfaces, then authored Jenkins declarative CI/CD pipelines for private Kubernetes delivery."
    ],
    contributionsDetailedVi: [
      "Bắt đầu với nền tảng Angular Micro-Frontend dùng Nx để chuẩn hóa convention, routing và phối hợp giữa Shell với các Remote.",
      "Sau đó tái cấu trúc và loại bỏ Nx khi mô hình delivery linh động hơn phù hợp với các phân hệ nghiệp vụ độc lập của sản phẩm.",
      "Xây dựng thư viện component dùng chung: biểu mẫu động (dynamic forms), bảng dữ liệu hỗ trợ lọc và phân trang, xử lý tệp đính kèm.",
      "Phát triển hộp thư giao dịch cho vay và giải ngân, xử lý task, luồng phê duyệt đa cấp và lưu vết lịch sử kiểm toán (audit trail).",
      "Tích hợp các module frontend với API Java Spring Boot, cơ chế bảo mật Keycloak OIDC và luồng sự kiện Kafka.",
      "Hỗ trợ các màn hình phục vụ báo cáo vận hành/tuân thủ và pipeline Jenkins CI/CD cho delivery trên Kubernetes private."
    ],
    results: [
      "Connected configurable lending, approval, disbursement, and reporting workflows through a consistent product surface.",
      "Reduced architectural coupling by replacing the initial Nx-centered structure with a more flexible frontend delivery model.",
      "Kept SSO, RBAC, audit context, and repeatable private delivery as shared platform concerns."
    ],
    resultsVi: [
      "Kết nối các quy trình cho vay, phê duyệt, giải ngân và báo cáo trong một mặt phẳng sản phẩm nhất quán.",
      "Giảm coupling kiến trúc bằng cách thay cấu trúc ban đầu xoay quanh Nx bằng mô hình frontend delivery linh động hơn.",
      "Giữ SSO, RBAC, ngữ cảnh audit và delivery private có thể lặp lại như các concern dùng chung của platform."
    ],
    relatedArticles: ["angular-microfrontend-architecture", "epas-transaction-inbox-and-compliance-boundaries", "epas-private-enterprise-delivery"],
    role: "Fullstack Developer (NGV Group)",
    roleVi: "Kỹ sư Fullstack (NGV Group)",
    year: "12/2024 – Present",
    techStack: ["Angular", "Micro-Frontend", "Java Spring Boot", "Oracle", "PostgreSQL", "Kafka", "Redis", "Keycloak", "Kubernetes", "Jenkins"],
    category: "Full-stack",
    categoryVi: "Full-stack",
    metrics: [
      "Configurable lending, disbursement & reporting workflow surface",
      "Flexible frontend delivery across independent business modules",
      "RBAC security with Keycloak and a repeatable private rollout path"
    ],
    metricsVi: [
      "Mặt phẳng workflow có thể cấu hình cho cho vay, giải ngân và báo cáo",
      "Frontend delivery linh động giữa các phân hệ nghiệp vụ độc lập",
      "Bảo mật phân quyền RBAC qua Keycloak và quy trình rollout private lặp lại được"
    ],
    architecture: [
      "Angular Micro-Frontend architecture with shared design libraries and flexible module delivery",
      "Event-driven messaging with Apache Kafka and distributed cache with Redis",
      "Oracle and PostgreSQL dual persistence with Keycloak OIDC authentication",
      "On-premises Kubernetes cluster orchestration with ingress and health monitoring"
    ],
    architectureVi: [
      "Kiến trúc Angular Micro-Frontend với thư viện dùng chung và mô hình delivery module linh động",
      "Luồng xử lý sự kiện qua Apache Kafka và bộ nhớ đệm phân tán Redis",
      "Tương thích dữ liệu Oracle & PostgreSQL, tích hợp xác thực OIDC Keycloak",
      "Quản trị cụm Kubernetes on-premises, cấu hình Ingress và giám sát hạ tầng"
    ],
    liveUrl: "#contact",
    githubUrl: "https://github.com/hoan02",
    featured: true,
    image: "/images/projects/banking.svg",
    accentColor: "#10b981",
  },
  {
    id: "devops-k8s-infrastructure",
    title: "Enterprise CI/CD & Multi-Node Kubernetes (K3s) Homelab Infrastructure",
    titleVi: "Hạ tầng CI/CD & Cụm Kubernetes (K3s) Homelab Đa Môi trường",
    subtitle: "Automated container pipelines, private registry, Longhorn storage, and production cluster orchestration",
    subtitleVi: "Tự động hóa build container, registry nội bộ, lưu trữ phân tán Longhorn và điều phối cụm máy chủ",
    description: "Configured and maintained on-premises Kubernetes/K3s clusters, Jenkins pipelines, Docker builds, image publishing, Longhorn distributed storage, ingress routing, registries, and observability.",
    descriptionVi: "Cấu hình và vận hành cụm Kubernetes/K3s (bao gồm cụm Homelab 3-node), pipeline Jenkins, đóng gói Docker, lưu trữ phân tán Longhorn, ingress routing và giám sát sản xuất.",
    problem: "Delivering software to isolated on-premises and staging environments requires deterministic, repeatable container build pipelines, persistent distributed block storage, and automated routing without vendor lock-in.",
    problemVi: "Triển khai phần mềm lên hạ tầng on-premises và môi trường thử nghiệm đòi hỏi quy trình build container tự động, lưu trữ dữ liệu phân tán bền bỉ và định tuyến Ingress linh hoạt không bị phụ thuộc vào cloud vendor.",
    architectureDiagram: `Internet / Cloudflare Tunnel
            │
            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Traefik / Ingress Controller               │
└───────────┬─────────────────────────────────────┬───────────┘
            │                                     │
┌───────────▼─────────────────────────────────────▼───────────┐
│              Multi-Node Kubernetes / K3s Cluster            │
│  ┌───────────────────────┐       ┌───────────────────────┐  │
│  │   Frontend / Shell    │       │ Spring Boot / Backend │  │
│  └───────────────────────┘       └───────────────────────┘  │
│  ┌───────────────────────┐       ┌───────────────────────┐  │
│  │     PostgreSQL HA     │       │     Redis / Kafka     │  │
│  └───────────────────────┘       └───────────────────────┘  │
│  Storage Layer: Longhorn Distributed Block Storage Volume   │
└─────────────────────────────────────────────────────────────┘
            ▲
            │ (Automated CI/CD Delivery)
Git Push ──► Jenkins Pipeline ──► Multi-Stage Docker ──► Registry ──► K8s Rollout`,
    contributionsDetailed: [
      "Built multi-stage Docker build files with layer caching, reducing image footprint and build times significantly.",
      "Configured Jenkins declarative pipelines for automated linting, test execution, image packaging, version tagging, and automated Kubernetes manifests deployment.",
      "Deployed a 3-node bare-metal/virtualized K3s Homelab cluster with Longhorn distributed block storage for persistent workloads and automated backups.",
      "Configured Traefik Ingress with TLS certificate automation, namespace isolation, ConfigMaps/Secrets, and health check probes (liveness/readiness).",
      "Handled cluster maintenance, CoreDNS troubleshooting, node draining, and rolling application releases."
    ],
    contributionsDetailedVi: [
      "Thiết kế Dockerfile đa tầng (multi-stage) tối ưu bộ nhớ đệm layer, giảm dung lượng image và rút ngắn thời gian đóng gói.",
      "Xây dựng pipeline Jenkins declarative tự động kiểm tra cú pháp, chạy test, đóng gói image, gắn tag phiên bản và cập nhật manifest Kubernetes.",
      "Thiết lập cụm Homelab K3s 3-node với hệ thống lưu trữ phân tán Longhorn cho các dịch vụ đòi hỏi lưu trữ dữ liệu bền bỉ và sao lưu tự động.",
      "Cấu hình Traefik Ingress tự động hóa chứng chỉ TLS, phân tách namespace, quản lý ConfigMaps/Secrets và cấu hình probe kiểm tra sức khỏe pod.",
      "Vận hành bảo trì cụm, xử lý sự cố mạng CoreDNS, bảo dưỡng node và triển khai rolling update không gián đoạn dịch vụ."
    ],
    results: [
      "Fully automated code-to-cluster delivery pipeline eliminating manual server interventions.",
      "High-availability local and enterprise testing ground with persistent distributed storage via Longhorn.",
      "A predictable rolling update strategy across multiple environments."
    ],
    resultsVi: [
      "Tự động hóa hoàn toàn quy trình từ commit mã nguồn đến triển khai trên cụm K8s, loại bỏ thao tác thủ công.",
      "Môi trường thử nghiệm và vận hành độ sẵn sàng cao với hệ thống lưu trữ phân tán Longhorn.",
      "Chiến lược cập nhật rolling update an toàn, đảm bảo dịch vụ luôn khả dụng liên tục."
    ],
    relatedArticles: ["production-like-platform-three-node-k3s-cluster"],
    role: "DevOps & Infrastructure",
    roleVi: "DevOps & Hạ tầng Kỹ thuật",
    year: "2024 – Present",
    techStack: ["Kubernetes", "K3s", "Longhorn", "Docker", "Jenkins", "Traefik", "Linux", "Git", "CI/CD"],
    category: "DevOps & Cloud",
    categoryVi: "DevOps & Cloud",
    metrics: [
      "3-node K3s Homelab cluster with Longhorn distributed persistent storage",
      "Automated declarative Jenkins pipelines for Docker image builds & K8s rollouts",
      "Rolling deployments and self-healing container infrastructure"
    ],
    metricsVi: [
      "Cụm Homelab K3s 3-node tích hợp lưu trữ phân tán Longhorn",
      "Pipeline Jenkins declarative tự động build Docker image và rollout K8s",
      "Triển khai rolling update và hạ tầng container tự phục hồi"
    ],
    architecture: [
      "Jenkins declarative pipelines with multi-stage Docker caching",
      "Multi-node K3s homelab & enterprise Kubernetes deployments, services, and ingress",
      "Longhorn distributed block storage volumes with automated snapshots",
      "On-premises container registry, Traefik ingress, and health check probes"
    ],
    architectureVi: [
      "Pipeline Jenkins declarative kết hợp cache Docker đa tầng",
      "Cụm Kubernetes/K3s quản lý deployments, services và ingress",
      "Lưu trữ phân tán Longhorn với cơ chế snapshot tự động",
      "Hệ thống registry nội bộ, Traefik ingress và probe kiểm tra pod"
    ],
    liveUrl: "#contact",
    githubUrl: "https://github.com/hoan02",
    featured: true,
    image: "/images/projects/devops.svg",
    accentColor: "#f59e0b",
  },
  {
    id: "zalo-oa-messaging-platform",
    title: "Zalo OA Integration & Message Management Platform",
    titleVi: "Nền tảng Tích hợp Zalo Official Account & Quản lý Tin nhắn",
    subtitle: "Enterprise communication and conversation management module",
    subtitleVi: "Phân hệ quản lý hội thoại, tin nhắn và tích hợp Zalo Official Account cho doanh nghiệp",
    description: "Developed Angular modules integrating Zalo Official Account features, message conversation management, template administration, filtering, status tracking, and Spring Boot REST APIs.",
    descriptionVi: "Phát triển các module Angular tích hợp tính năng Zalo Official Account, quản lý hội thoại tin nhắn, quản trị mẫu tin, lọc trạng thái và kết nối REST API Spring Boot.",
    problem: "Customer care agents needed an intuitive, real-time message management console to interact with end users via Zalo OA while syncing conversation threads across backend databases and Redis sessions.",
    problemVi: "Bộ phận chăm sóc khách hàng cần giao diện quản lý hội thoại thời gian thực để tương tác với người dùng qua Zalo OA, đồng thời đồng bộ luồng tin nhắn với backend và bộ nhớ đệm Redis.",
    contributionsDetailed: [
      "Engineered responsive conversation interfaces with conversation inbox, message templates, status tracking, pagination, and real-time interaction capabilities.",
      "Developed message template management and preview interfaces for dynamic broadcast campaigns.",
      "Integrated Spring Boot endpoints with Redis caching for fast conversation session retrieval."
    ],
    contributionsDetailedVi: [
      "Xây dựng giao diện quản lý hội thoại đa kênh, mẫu tin nhắn tự động, theo dõi trạng thái gửi, phân trang và xử lý dữ liệu lớn.",
      "Phát triển module quản trị mẫu tin nhắn và xem trước nội dung cho các chiến dịch tương tác.",
      "Tích hợp REST API Spring Boot với bộ nhớ đệm Redis để truy xuất nhanh phiên hội thoại."
    ],
    results: [
      "Automated message template management and real-time conversation tracking.",
      "Explicit pagination and responsive filtering across large message histories.",
      "Seamless Zalo OA API synchronization and webhook delivery."
    ],
    resultsVi: [
      "Tự động hóa quản trị mẫu tin nhắn và theo dõi hội thoại thời gian thực.",
      "Phân trang và lọc phản hồi tốt trên lượng lớn lịch sử tin nhắn.",
      "Đồng bộ API Zalo OA và xử lý webhook ổn định."
    ],
    relatedArticles: ["zalo-oa-conversation-operations"],
    role: "Fullstack Developer (NGV Group)",
    roleVi: "Kỹ sư Fullstack (NGV Group)",
    year: "12/2024 – Present",
    techStack: ["Angular", "Java Spring Boot", "TypeScript", "REST APIs", "PostgreSQL", "Redis"],
    category: "Full-stack",
    categoryVi: "Full-stack",
    metrics: [
      "Automated message template management and real-time conversation tracking",
      "Explicit pagination and responsive filtering across large message histories",
      "Seamless Zalo OA API synchronization and webhook delivery"
    ],
    metricsVi: [
      "Tự động hóa quản trị mẫu tin nhắn và theo dõi hội thoại thời gian thực",
      "Phân trang và lọc phản hồi tốt trên lượng lớn lịch sử tin nhắn",
      "Đồng bộ API Zalo OA và xử lý webhook mượt mà"
    ],
    architecture: [
      "Angular reactive forms, state-driven conversation filters, and pagination",
      "Spring Boot RESTful endpoints with validation and error handling",
      "Redis caching for active sessions and conversation threads"
    ],
    architectureVi: [
      "Angular reactive forms, bộ lọc hội thoại thông minh và tối ưu phân trang",
      "Spring Boot REST API với chuẩn xác thực và xử lý lỗi chặt chẽ",
      "Cache phiên làm việc và luồng tin nhắn qua Redis"
    ],
    liveUrl: "#contact",
    githubUrl: "https://github.com/hoan02",
    featured: false,
    image: "/images/projects/gateway.svg",
    accentColor: "#38bdf8",
  },
  {
    id: "mochimochi-learning-platform",
    title: "MochiMochi — Language Learning Web Platform",
    titleVi: "MochiMochi — Nền tảng Học Ngoại ngữ Trực tuyến",
    subtitle: "High-performance learner-facing web platform for Japanese and Chinese learning",
    subtitleVi: "Ứng dụng web học tiếng Nhật & tiếng Trung hướng người dùng với Next.js tối ưu SEO",
    description: "Developed and maintained learner-facing web applications using Next.js, React, and TypeScript. Optimized rendering, asset delivery, page structure, metadata, SEO, and refactored legacy code to standardized reusable components.",
    descriptionVi: "Phát triển và duy trì ứng dụng web học ngoại ngữ cho học viên với Next.js, React và TypeScript. Tối ưu hóa rendering, tài nguyên, cấu trúc trang, SEO và chuẩn hóa component tái sử dụng.",
    problem: "Learners required rapid page loads, smooth client-side interactions across mobile and desktop devices, and optimal search engine discoverability for vocabulary and grammar courses.",
    problemVi: "Học viên cần tốc độ tải trang nhanh, trải nghiệm học từ vựng/ngữ pháp mượt mà trên cả di động và máy tính, cùng khả năng hiển thị tối ưu trên công cụ tìm kiếm.",
    contributionsDetailed: [
      "Developed learner-facing web applications for Japanese and Chinese language platforms using Next.js App/Pages architecture.",
      "Optimized Core Web Vitals (LCP, CLS, FID) through server-side rendering (SSR), static generation, and next/font & asset preloading.",
      "Refactored legacy code and standardized reusable TypeScript component libraries, accelerating feature delivery velocity."
    ],
    contributionsDetailedVi: [
      "Phát triển ứng dụng web học tiếng Nhật và tiếng Trung hướng người học trên nền tảng Next.js.",
      "Cải thiện các chỉ số Core Web Vitals (LCP, CLS) thông qua cơ chế SSR, SSG và tối ưu tài nguyên tĩnh/phông chữ.",
      "Tái cấu trúc mã nguồn cũ, chuẩn hóa thư viện component TypeScript dùng chung, giúp tăng tốc độ ra mắt tính năng."
    ],
    results: [
      "Improved Core Web Vitals and user load times through rendering and asset optimizations.",
      "Strengthened search engine visibility with structured metadata and server-rendered HTML.",
      "Streamlined frontend codebase with modular component architecture and strict typing."
    ],
    resultsVi: [
      "Cải thiện rõ rệt chỉ số Core Web Vitals và thời gian tải trang qua tối ưu tài nguyên.",
      "Tăng cường khả năng lập chỉ mục SEO nhờ cấu trúc metadata chuẩn và HTML render phía server.",
      "Chuẩn hóa mã nguồn frontend với kiến trúc component module hóa và strict typing."
    ],
    role: "Frontend Developer (MochiMochi)",
    roleVi: "Kỹ sư Frontend (MochiMochi)",
    year: "03/2024 – 08/2024",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SEO Optimization", "SSR"],
    category: "Frontend",
    categoryVi: "Frontend",
    metrics: [
      "Optimized Core Web Vitals and rendering performance",
      "Strengthened organic SEO discoverability through semantic metadata and SSR",
      "Standardized reusable TypeScript component library"
    ],
    metricsVi: [
      "Tối ưu chỉ số Core Web Vitals và hiệu năng rendering",
      "Tăng cường khả năng tìm kiếm SEO tự nhiên nhờ metadata và SSR",
      "Chuẩn hóa thư viện component TypeScript tái sử dụng"
    ],
    architecture: [
      "Next.js Server-Side Rendering (SSR) & Static Site Generation (SSG)",
      "Optimized asset pipelines and responsive cross-platform layouts",
      "Strict TypeScript typing and clean component modularization"
    ],
    architectureVi: [
      "Kiến trúc Next.js Server-Side Rendering (SSR) & SSG",
      "Tối ưu hóa pipeline tài nguyên tĩnh và layout đa thiết bị",
      "TypeScript strict mode và module hóa component rõ ràng"
    ],
    liveUrl: "#contact",
    githubUrl: "https://github.com/hoan02",
    featured: false,
    image: "/images/projects/analytics.svg",
    accentColor: "#818cf8",
  },
  {
    id: "arda-finops-platform",
    title: "Arda — Multi-Tenant Financial Operations Platform",
    titleVi: "Arda — Nền tảng FinOps & Vận hành Tài chính Đa Khách thuê",
    subtitle: "Cloud-native platform with 9 Go microservices (gRPC & NATS), React Module Federation (7 remotes), and Ory IAM",
    subtitleVi: "Kiến trúc FinOps đám mây với 9 Go Microservices (gRPC & NATS), React Module Federation (7 remotes) và Ory IAM",
    description: "Architected a multi-tenant financial operations platform organized into 3 Git repositories: 9 Go microservices backend (arda-be), React Module Federation (arda-mfe), and GitOps-managed Kubernetes infrastructure (arda-infra) with Ory Kratos/Hydra authentication and CloudNativePG.",
    descriptionVi: "Thiết kế nền tảng FinOps đa khách thuê gồm 3 repo: 9 Go Microservices (arda-be), React Module Federation 7 remote apps (arda-mfe) và hạ tầng Kubernetes GitOps (arda-infra) với xác thực Ory Kratos/Hydra và CloudNativePG.",
    problem: "Financial operations demand strict multi-tenant data isolation, high-throughput microservices communication, unified zero-trust identity, and decoupled frontend release cycles across CRM, Finance, HRM, and Workflow domains.",
    problemVi: "Hệ thống vận hành tài chính yêu cầu cách ly dữ liệu đa khách thuê nghiêm ngặt, giao tiếp microservice hiệu năng cao, định danh zero-trust tập trung và phân tách chu kỳ release độc lập giữa các module Finance, CRM, HRM và Workflow.",
    architectureDiagram: `Browser / Client ──► Cloudflare Tunnel ──► Traefik (ForwardAuth)
                                                  │
           ┌──────────────────────────────────────┴──────────────────────────────────────┐
           ▼                                                                             ▼
    BFF Auth-Gateway ──► Ory Kratos + Hydra (Identity)                         React Shell + 7 MFE Remotes
           │                                                                   [@workspace/ui, api, auth]
           ▼
    9 Go Microservices (HTTP/JSON + gRPC + NATS Events)
    [iam, platform, finance, workflow, crm, hrm, notification, media, mdm]
           │
           ▼
    CloudNativePG (HA Postgres) · Valkey · Garage S3 · Zeebe 8.5 BPMN`,
    contributionsDetailed: [
      "Engineered 9 Go microservices sharing common libraries (arda-auth, arda-grpc, arda-events, arda-postgres) with standardized gRPC contracts.",
      "Architected React Module Federation with a central shell and 7 remotes (mfe-iam, platform, finance, account, hrm, workflow, crm) using shared workspace packages.",
      "Built zero-trust identity flow with Ory Kratos, Ory Hydra, Traefik ForwardAuth, and BFF session cookies.",
      "Orchestrated HA PostgreSQL with CloudNativePG, Valkey distributed cache, and Zeebe 8.5 BPMN workflow on a 3-node K3s cluster."
    ],
    contributionsDetailedVi: [
      "Xây dựng 9 Go microservices sử dụng thư viện dùng chung (arda-auth, arda-grpc, arda-events) với contract gRPC được chuẩn hóa.",
      "Thiết kế kiến trúc React Module Federation gồm Shell trung tâm và 7 remote apps dùng chung gói @workspace/* (shadcn UI, auth, API).",
      "Thiết lập cơ chế bảo mật zero-trust với Ory Kratos, Ory Hydra, Traefik ForwardAuth và BFF session cookies.",
      "Vận hành CloudNativePG (PostgreSQL HA), Valkey cache và Zeebe 8.5 BPMN workflow trên cụm 3-node K3s."
    ],
    results: [
      "Fully decoupled frontend and backend release velocity across independent domain teams.",
      "Zero-trust security with centralized IAM and route-level RBAC policy enforcement.",
      "Resilient high-availability architecture running bare-metal on 3-node K3s."
    ],
    resultsVi: [
      "Tách biệt hoàn toàn chu kỳ phát hành giữa các nhóm phát triển phân hệ tài chính và nhân sự.",
      "Bảo mật zero-trust với định danh tập trung và chính sách phân quyền RBAC cấp route.",
      "Hạ tầng sẵn sàng cao (HA) tự vận hành ổn định trên cụm bare-metal 3-node K3s."
    ],
    relatedArticles: ["designing-arda-cloud-native-finops-platform", "production-like-platform-three-node-k3s-cluster"],
    role: "Lead Architect & Open Source Maintainer",
    roleVi: "Kiến trúc sư & Maintainer Dự án",
    year: "2025 – Present",
    techStack: ["Go", "gRPC", "NATS", "React", "Module Federation", "Ory Kratos", "CloudNativePG", "K3s", "Zeebe"],
    category: "Full-stack",
    categoryVi: "Full-stack",
    metrics: [
      "9 Go Microservices with gRPC & NATS event streams",
      "React Module Federation (Shell + 7 Remotes)",
      "Zero-trust Ory Kratos/Hydra IAM & CloudNativePG HA"
    ],
    metricsVi: [
      "9 Go Microservices giao tiếp qua gRPC và luồng sự kiện NATS",
      "React Module Federation gồm Shell và 7 phân hệ Remotes",
      "Định danh Zero-trust Ory Kratos/Hydra và CSDL CloudNativePG HA"
    ],
    architecture: [
      "React Module Federation with shared @workspace packages",
      "9 Go Microservices with gRPC inter-service calls & NATS domain events",
      "Ory Kratos & Hydra zero-trust authentication via Traefik ForwardAuth",
      "CloudNativePG HA PostgreSQL cluster with Valkey distributed caching"
    ],
    architectureVi: [
      "React Module Federation với các gói dùng chung @workspace/*",
      "9 Go Microservices kết nối gRPC và luồng sự kiện bất đồng bộ NATS",
      "Xác thực Zero-trust qua Ory Kratos/Hydra và Traefik ForwardAuth",
      "Cụm CloudNativePG HA PostgreSQL và bộ nhớ đệm phân tán Valkey"
    ],
    liveUrl: "https://arda.io.vn",
    githubUrl: "https://github.com/arda-labs",
    featured: true,
    image: "/images/projects/gateway.svg",
    accentColor: "#6366f1",
  },
  {
    id: "puchi-language-platform",
    title: "Puchi — Vietnamese Language Learning Platform",
    titleVi: "Puchi — Nền tảng Học tiếng Việt Trực tuyến",
    subtitle: "Next.js PWA with 5 Go microservices (Kratos v3), Limen Auth, NATS events, and ArgoCD GitOps",
    subtitleVi: "Ứng dụng Next.js PWA với 5 Go Microservices (Kratos v3), Limen Auth, NATS events và ArgoCD GitOps",
    description: "Developed a modern Vietnamese learning web platform featuring a responsive Next.js PWA frontend, 5 Go microservices monorepo built on Kratos v3, Limen auth session exchange, NATS event bus, and automated ArgoCD GitOps deployments on K3s.",
    descriptionVi: "Phát triển nền tảng học tiếng Việt hiện đại gồm Next.js PWA frontend, monorepo 5 Go microservices trên nền Kratos v3, xác thực Limen Auth, NATS event bus và CI/CD GitOps qua ArgoCD trên K3s.",
    problem: "Online language learners need fast, offline-capable PWA experiences with instant lesson progress synchronization, audio pronunciation streaming, and resilient microservice APIs under traffic spikes.",
    problemVi: "Học viên học ngoại ngữ cần trải nghiệm PWA mượt mà hỗ trợ offline, đồng bộ tiến độ học, phát âm thanh bài học và hạ tầng microservice ổn định.",
    architectureDiagram: `User ──► Cloudflare CDN ──► Next.js PWA (Limen Auth) ──► Envoy Gateway
                │
                ▼
       Go Services (Kratos v3) ──► PostgreSQL / NATS / Cloudflare R2
       [auth, core, learn, media, notification]
                │
                ▼
       K3s Cluster (v1.35) + ArgoCD GitOps + Traefik Ingress`,
    contributionsDetailed: [
      "Built responsive Next.js PWA frontend with progress tracking, interactive quiz exercises, and audio pronunciation streaming via Cloudflare R2.",
      "Developed 5 Go microservices monorepo (app/auth, core, learn, media, notification) powered by the Kratos v3 framework.",
      "Implemented asynchronous domain events via NATS (auth.user.created, learn.lesson.completed, email.send).",
      "Automated continuous delivery via ArgoCD GitOps on a 3-node K3s cluster with Traefik ingress and Cloudflare Tunnels."
    ],
    contributionsDetailedVi: [
      "Xây dựng frontend Next.js PWA theo dõi tiến độ học tập, bài tập trắc nghiệm tương tác và stream âm thanh qua Cloudflare R2.",
      "Phát triển monorepo 5 Go microservices (auth, core, learn, media, notification) trên nền tảng Kratos v3.",
      "Hiện thực hóa kiến trúc event-driven qua NATS (auth.user.created, learn.lesson.completed, email.send).",
      "Tự động hóa triển khai GitOps với ArgoCD trên cụm K3s v1.35 kết hợp Traefik và Cloudflare Tunnel."
    ],
    results: [
      "A responsive PWA experience and immediate local feedback for interactive exercises.",
      "Event-driven decoupling of learning progress tracking and notification dispatching.",
      "Declarative automated deployments with ArgoCD GitOps."
    ],
    resultsVi: [
      "Trải nghiệm PWA phản hồi tốt và feedback cục bộ ngay cho các bài tập tương tác.",
      "Phân tách kiến trúc theo hướng sự kiện (Event-Driven) tối ưu tải hệ thống.",
      "Triển khai tự động theo mô hình khai báo qua ArgoCD GitOps."
    ],
    relatedArticles: ["building-puchi-product-idea-to-service-architecture", "why-puchi-uses-opaque-sessions-over-jwt", "git-push-to-k3s-puchi-gitops-pipeline", "designing-story-based-language-learning-engine"],
    role: "Fullstack Architect & Creator",
    roleVi: "Kiến trúc sư & Nhà sáng lập",
    year: "2025 – Present",
    techStack: ["Go", "Kratos v3", "Next.js", "PWA", "NATS", "PostgreSQL", "ArgoCD", "K3s", "Cloudflare R2"],
    category: "Full-stack",
    categoryVi: "Full-stack",
    metrics: [
      "5 Go Microservices (Kratos v3) + NATS Event Bus",
      "Next.js PWA with Limen Auth & Cloudflare R2",
      "Declarative ArgoCD GitOps on K3s Kubernetes"
    ],
    metricsVi: [
      "5 Go Microservices (Kratos v3) và luồng sự kiện NATS",
      "Next.js PWA tích hợp Limen Auth và Cloudflare R2",
      "Triển khai GitOps tự động hóa với ArgoCD trên K3s"
    ],
    architecture: [
      "Next.js PWA with Limen authentication session management",
      "5 Go Microservices (Kratos v3) with NATS asynchronous event messaging",
      "Cloudflare R2 object storage for audio pronunciation assets",
      "ArgoCD GitOps deployment pipeline on multi-node K3s cluster"
    ],
    architectureVi: [
      "Next.js PWA quản lý phiên người dùng qua Limen Auth",
      "5 Go Microservices (Kratos v3) xử lý sự kiện bất đồng bộ qua NATS",
      "Lưu trữ tệp âm thanh bài giảng trên Cloudflare R2",
      "Pipeline triển khai ArgoCD GitOps trên cụm K3s Kubernetes"
    ],
    liveUrl: "https://puchi.io.vn",
    githubUrl: "https://github.com/puchidemy",
    featured: true,
    image: "/images/projects/saas.svg",
    accentColor: "#10b981",
  },
  {
    id: "camrelay-p2p-rtsp-bridge",
    title: "Camrelay — P2P IP Camera to RTSP Stream Relay",
    titleVi: "Camrelay — Cầu nối Chuyển đổi P2P IP Camera sang RTSP Stream",
    subtitle: "High-performance Rust bridge tunneling proprietary Dahua/easy4ip P2P cameras into local RTSP streams for Frigate & NVRs",
    subtitleVi: "Hệ thống Rust hiệu năng cao chuyển đổi luồng P2P Dahua/easy4ip sang chuẩn RTSP nội bộ cho Frigate NVR & Home Assistant",
    description: "Engineered a high-performance, asynchronous Rust bridge that handshakes with proprietary Dahua/P2P cloud signaling servers and tunnels video streams to local RTSP endpoints. Integrates seamlessly with Frigate NVR, Home Assistant, go2rtc, and features automatic FFmpeg segment recording with rclone Google Drive archiving.",
    descriptionVi: "Phát triển giải pháp Rust hiệu năng cao kết nối giao thức bắt tay P2P đóng của Dahua/easy4ip và chuyển đổi thành luồng RTSP nội bộ. Tương thích hoàn hảo với Frigate NVR, Home Assistant, go2rtc, tích hợp tính năng ghi hình phân đoạn FFmpeg và tự động lưu trữ lên Google Drive qua rclone.",
    problem: "Proprietary IP cameras (Dahua, easy4ip) restrict access behind closed P2P cloud servers, preventing local integration into open-source NVR systems (Frigate, Home Assistant, Scrypted) without subscription fees or vulnerable open ports.",
    problemVi: "Các dòng camera IP sử dụng giao thức P2P đóng (Dahua, easy4ip) bị phụ thuộc vào máy chủ đám mây của hãng, gây khó khăn khi tích hợp vào hệ thống NVR mã nguồn mở (Frigate, Home Assistant) mà không phải trả phí thuê bao hay mở port router tiềm ẩn nguy cơ bảo mật.",
    architectureDiagram: `IP Camera (P2P Cloud) ──► [ camrelay (Rust / Tokio) ] ──► Local RTSP Stream (:8551)
                                       │                              │
                                       ├─► Web Dashboard & Probe      ├─► Frigate NVR / Home Assistant
                                       └─► FFmpeg Segments (300s) ──► rclone ──► Google Drive Archive`,
    contributionsDetailed: [
      "Engineered an asynchronous Rust daemon with Tokio and Axum for high-throughput, low-latency video packet tunneling.",
      "Implemented reverse-engineered Dahua/easy4ip P2P handshake signaling protocols to establish direct and relay UDP/TCP data sessions.",
      "Exposed local multi-channel RTSP stream servers allowing drop-in ingestion for Frigate NVR, go2rtc, and Home Assistant.",
      "Built optional background FFmpeg recording workers that segment video streams into JSON-indexed archives and sync to Google Drive via rclone.",
      "Developed a clean embedded web management dashboard for camera onboarding, live tunnel health telemetry, and API token management."
    ],
    contributionsDetailedVi: [
      "Xây dựng daemon Rust bất đồng bộ với Tokio và Axum cho thông lượng cao, độ trễ cực thấp khi chuyển tiếp các gói tin video.",
      "Hiện thực hóa giao thức bắt tay P2P của Dahua/easy4ip thiết lập phiên truyền nhận dữ liệu UDP/TCP direct và relay.",
      "Cung cấp máy chủ RTSP nội bộ đa luồng cho phép cắm-và-chạy trực tiếp vào Frigate NVR, go2rtc và Home Assistant.",
      "Phát triển worker ngầm tích hợp FFmpeg cắt phân đoạn video, lập chỉ mục JSON và tự động đồng bộ lên Google Drive qua rclone.",
      "Xây dựng dashboard quản trị web nhúng gọn nhẹ để cấu hình camera, theo dõi trạng thái tunnel thời gian thực và quản lý token API."
    ],
    results: [
      "A local relay path for supported camera streams and NVR consumers.",
      "A self-hosted alternative to depending on a vendor viewing workflow.",
      "Optional off-site Google Drive archive synchronization with configurable retention policies."
    ],
    resultsVi: [
      "Một relay nội bộ cho camera path được hỗ trợ và các consumer NVR.",
      "Giảm phụ thuộc vào workflow xem camera của vendor bằng một relay tự vận hành.",
      "Đồng bộ archive tùy chọn lên Google Drive với chính sách xoay vòng dữ liệu cấu hình được."
    ],
    relatedArticles: ["camrelay-from-proprietary-p2p-to-private-rtsp"],
    role: "Sole Creator & Systems Engineer",
    roleVi: "Tác giả & Kỹ sư Hệ thống",
    year: "2025 – Present",
    techStack: ["Rust", "Tokio", "RTSP", "P2P Signaling", "FFmpeg", "rclone", "Axum", "Docker"],
    category: "Systems & IoT",
    categoryVi: "Hệ thống & IoT",
    metrics: [
      "Rust Async Tokio relay core",
      "Native Ingestion for Frigate NVR & Home Assistant",
      "Automated FFmpeg Segments & Google Drive Sync"
    ],
    metricsVi: [
      "Nhân relay Rust Tokio bất đồng bộ",
      "Tích hợp trực tiếp Frigate NVR & Home Assistant",
      "Ghi hình phân đoạn FFmpeg và đồng bộ Google Drive"
    ],
    architecture: [
      "P2P handshake engine connecting to vendor signaling servers without port forwarding",
      "Multi-threaded RTSP server exposing local video streams on dedicated ports",
      "Continuous FFmpeg segment recorder with automated rclone cloud offloading",
      "Token-authenticated HTTP REST management API & responsive dashboard"
    ],
    architectureVi: [
      "Engine bắt tay P2P kết nối tới signaling server mà không cần mở port NAT",
      "Máy chủ RTSP đa luồng cung cấp luồng video trên từng cổng mạng nội bộ riêng",
      "Bộ ghi hình phân đoạn FFmpeg liên tục tự động đẩy file qua rclone",
      "REST API quản trị xác thực qua token và giao diện quản lý trực quan"
    ],
    liveUrl: "https://github.com/hoan02/camrelay",
    githubUrl: "https://github.com/hoan02/camrelay",
    featured: true,
    image: "/images/projects/gateway.svg",
    accentColor: "#f59e0b",
  },
  {
    id: "b4s-baseus-desktop-companion",
    title: "B4S — Desktop Companion for Baseus Headphones",
    titleVi: "B4S — Ứng dụng Desktop Điều khiển Tai nghe Baseus",
    subtitle: "Cross-platform desktop companion built with Tauri v2, Rust (btleplug), and SolidJS for local Bluetooth LE headphone control",
    subtitleVi: "Ứng dụng Desktop đa nền tảng với Tauri v2, Rust (btleplug) và SolidJS điều khiển tai nghe Baseus qua Bluetooth LE",
    description: "Built a lightweight, cross-platform desktop application (Windows, macOS, Linux) to control and customize Baseus Bluetooth headphones locally without third-party cloud apps. Implements direct GATT frame communication, ANC mode switching, 10-band Equalizer tuning, battery telemetry, and spatial audio modes.",
    descriptionVi: "Xây dựng ứng dụng desktop đa nền tảng (Windows, macOS, Linux) gọn nhẹ cho phép điều khiển và tùy biến tai nghe Bluetooth Baseus hoàn toàn cục bộ không cần tài khoản đám mây. Tự giải mã giao thức GATT frame, chuyển đổi chế độ chống ồn ANC, tinh chỉnh Equalizer 10 dải tần và theo dõi dung lượng pin.",
    problem: "Headphone manufacturers often only release mobile apps for EQ and ANC adjustments, leaving desktop users (Windows, macOS, Linux) unable to configure their devices without an Android/iOS phone and mandatory cloud accounts.",
    problemVi: "Các hãng sản xuất tai nghe thường chỉ phát hành app di động để chỉnh EQ/ANC, khiến người dùng máy tính (Windows, macOS, Linux) không thể tùy biến thiết bị trên desktop mà bắt buộc phải dùng điện thoại và đăng ký tài khoản đám mây.",
    architectureDiagram: `Desktop GUI (SolidJS + Tailwind) ──► Tauri v2 IPC Bridge
                                              │
                                              ▼
Baseus Headphones (BLE) ◄─── GATT Frames ─── [ Rust Core (btleplug) ]`,
    contributionsDetailed: [
      "Engineered a lightweight desktop application utilizing Tauri v2 and Rust, consuming less than 30MB RAM.",
      "Implemented asynchronous Bluetooth Low Energy (BLE) scanning, GATT connection lifecycle, and event handling via btleplug.",
      "Reverse-engineered proprietary Baseus protocol packet frames for reading battery levels, switching ANC/Transparency modes, and applying 10-band EQ curves.",
      "Designed a responsive, modern dark-mode user interface using SolidJS, TypeScript, and Tailwind CSS.",
      "Designed the core control flow for local operation without requiring user registration."
    ],
    contributionsDetailedVi: [
      "Phát triển ứng dụng desktop gọn nhẹ trên nền Tauri v2 và Rust, ưu tiên vòng đời native rõ ràng.",
      "Hiện thực hóa quá trình quét Bluetooth Low Energy (BLE), quản lý kết nối GATT và sự kiện qua thư viện btleplug.",
      "Giải mã cấu trúc gói tin (GATT packet frames) của tai nghe Baseus để đọc dung lượng pin, chuyển chế độ ANC/Xuyên âm và nạp EQ 10 dải.",
      "Thiết kế giao diện Dark Mode hiện đại, mượt mà với SolidJS, TypeScript và Tailwind CSS.",
      "Thiết kế luồng điều khiển local, không yêu cầu đăng ký tài khoản cho các tính năng cốt lõi."
    ],
    results: [
      "Native desktop control for Baseus headphone features previously exclusive to mobile apps.",
      "A lightweight desktop footprint and a clear native/local control path.",
      "Local Bluetooth LE communication without unnecessary telemetry."
    ],
    resultsVi: [
      "Điều khiển trực tiếp các tính năng tai nghe Baseus trên desktop mà trước đây chỉ có trên mobile.",
      "Ứng dụng desktop gọn nhẹ với luồng điều khiển native/local rõ ràng.",
      "Giao tiếp Bluetooth LE local, không thêm telemetry không cần thiết."
    ],
    relatedArticles: ["b4s-reverse-engineering-a-local-ble-companion"],
    role: "Creator & Systems Developer",
    roleVi: "Tác giả & Lập trình viên Hệ thống",
    year: "2025 – Present",
    techStack: ["Tauri v2", "Rust", "SolidJS", "Bluetooth LE", "btleplug", "TypeScript", "Tailwind CSS"],
    category: "Desktop & IoT",
    categoryVi: "Desktop & IoT",
    metrics: [
      "Tauri v2 + Rust Core with < 30MB RAM Footprint",
      "Direct Local Bluetooth LE (GATT) Protocol",
      "Cross-Platform Support (Windows, macOS, Linux)"
    ],
    metricsVi: [
      "Nhân Tauri v2 + Rust tiêu thụ dưới 30MB RAM",
      "Giao thức Bluetooth LE (GATT) trực tiếp không qua mây",
      "Hỗ trợ đa nền tảng (Windows, macOS, Linux)"
    ],
    architecture: [
      "Tauri v2 IPC bridge connecting SolidJS frontend to native Rust backend",
      "Cross-platform Bluetooth LE GATT client using btleplug adapter abstraction",
      "Structured Baseus packet codec for frame serialization and checksum verification",
      "Decoupled model catalog supporting capability-based UI rendering per headphone profile"
    ],
    architectureVi: [
      "Cầu nối IPC Tauri v2 kết nối giao diện SolidJS với backend Rust gốc",
      "Client Bluetooth LE GATT đa nền tảng trừu tượng hóa qua btleplug",
      "Bộ mã hóa/giải mã gói tin Baseus với kiểm tra checksum an toàn",
      "Catalog model tách biệt tự động render giao diện theo tính năng của từng dòng tai nghe"
    ],
    liveUrl: "https://github.com/hoan02/b4s",
    githubUrl: "https://github.com/hoan02/b4s",
    featured: true,
    image: "/images/projects/saas.svg",
    accentColor: "#3b82f6",
  }
];

export const ARTICLES_DATA: Article[] = [
  // ==========================================
  // ARDA LABS ARTICLES
  // ==========================================
  {
    slug: "designing-arda-cloud-native-finops-platform",
    title: "Designing Arda: A Cloud-Native Financial Operations Platform",
    titleVi: "Thiết kế Hệ thống Arda: Nền tảng FinOps Đám mây Đa Khách thuê",
    summary: "Comprehensive system design of Arda (arda.io.vn) — 9 Go microservices, synchronous gRPC, NATS domain events, BFF auth-gateway proxy, CloudNativePG HA, Zeebe workflow, and K3s GitOps.",
    summaryVi: "Chi tiết kiến trúc hệ thống vận hành tài chính Arda (arda.io.vn) — 9 Go microservices, gRPC đồng bộ, NATS domain events, BFF auth-gateway proxy, CloudNativePG HA, Zeebe workflow và K3s GitOps.",
    date: "Feb 2026",
    readTime: "12 min read",
    tags: ["Arda Labs", "Go", "gRPC", "Microservices", "FinOps", "Architecture", "Distributed Systems"],
    featured: true,
    project: "arda",
    relatedProject: "arda-finops-platform",
    diagramKey: "designing-arda-cloud-native-finops-platform",
    evidenceIds: ["arda-microservices-grpc", "arda-auth-zero-trust", "arda-transactional-outbox-nats"],
    repositoryUrl: "https://github.com/arda-labs/arda-be",
    heroImage: "https://raw.githubusercontent.com/arda-labs/.github/main/profile/assets/system-architecture.png",
    heroImageCaption: "ARDA Labs System Architecture: Browser ──► Cloudflare ──► Traefik (ForwardAuth) ──► auth-gateway BFF ──► 9 Go Services ──► CloudNativePG / Zeebe",
    heroImageCaptionVi: "Sơ đồ Kiến trúc ARDA Labs: Trình duyệt ──► Cloudflare ──► Traefik (ForwardAuth) ──► auth-gateway BFF ──► 9 Go Microservices ──► CloudNativePG / Zeebe",
    highlights: [
      {
        value: "< 10ms",
        label: "gRPC RPC Latency",
        labelVi: "Độ trễ gRPC",
        detail: "Synchronous intra-cluster calls",
        detailVi: "Truy vấn nội bộ cụm cực nhanh"
      },
      {
        value: "9 Services",
        label: "Go Microservices",
        labelVi: "Microservices Go",
        detail: "Shared libs/go toolkit",
        detailVi: "Dùng chung thư viện libs/go"
      },
      {
        value: "7 Remotes",
        label: "Module Federation",
        labelVi: "Remote MFE",
        detail: "Independent UI releases",
        detailVi: "Phát hành giao diện độc lập"
      },
      {
        value: "Zero Trust",
        label: "Ory Kratos + Hydra",
        labelVi: "Định danh Zero-Trust",
        detail: "Edge ForwardAuth verification",
        detailVi: "Xác thực biên mạng qua Traefik"
      }
    ],
    comparison: {
      naiveTitle: "Traditional Monolith or Uncontrolled Services",
      naiveTitleVi: "Monolith Truyền thống hoặc Services Không Chuẩn hóa",
      naivePoints: [
        "Monolith release lockstep blocks independent feature delivery across Finance, CRM, and HRM.",
        "Direct cross-service database access causes schema coupling and cascading failure modes.",
        "Client browsers coordinate raw JWTs directly, creating security vulnerabilities and zero revocation control."
      ],
      naivePointsVi: [
        "Chu kỳ release dính chùm làm nghẽn tiến độ giữa các nhóm Tài chính, CRM và Nhân sự.",
        "Các service chọc chéo vào CSDL của nhau gây phụ thuộc schema và sập lan truyền.",
        "Trình duyệt tự quản lý raw JWT tiềm ẩn rủi ro lộ lọt và không thể thu hồi phiên tức thì."
      ],
      solutionTitle: "ARDA Cloud-Native Architecture",
      solutionTitleVi: "Kiến trúc ARDA FinOps Đám Mây Chuẩn Mực",
      solutionPoints: [
        "React Module Federation (7 remotes) and 9 Go microservices release independently via CI/CD.",
        "Transactional Outbox + NATS JetStream guarantee atomic events with zero dual-write hazard.",
        "Traefik ForwardAuth passes verified identity headers to services, eliminating JWT decoding overhead."
      ],
      solutionPointsVi: [
        "React Module Federation (7 remotes) và 9 Go microservices phát hành độc lập hoàn toàn.",
        "Transactional Outbox kết hợp NATS JetStream đảm bảo xuất bản sự kiện nguyên tử an toàn.",
        "Traefik ForwardAuth inject header đã xác thực, giải phóng service khỏi việc decode JWT."
      ]
    },
    sections: [
      {
        id: "service-boundaries",
        title: "Service Boundaries & Domain Partitioning",
        titleVi: "Phân Định Ranh Giới Service & Kiến trúc Hướng Miền (DDD)",
        content: "Arda partitions financial operations into 9 distinct Go services: `iam-service` (identity & tenant policies), `platform-service` (organization hierarchy), `finance-service` (general ledger, billing, invoices), `workflow-service` (Zeebe 8.5 BPMN facade), `crm-service` (leads & accounts), `hrm-service` (personnel records), `notification-service` (emails & webhooks), `media-service` (Garage S3 uploads), and `mdm-service` (master data management).\n\nBy enforcing protobuf contracts and forbidding direct cross-database queries, each service retains complete ownership over its database schema.",
        contentVi: "Arda phân chia nghiệp vụ tài chính thành 9 Go service độc lập: `iam-service` (phân quyền & chính sách tenant), `platform-service` (cơ cấu tổ chức), `finance-service` (sổ cái, hóa đơn, thanh toán), `workflow-service` (facade Zeebe 8.5 BPMN), `crm-service` (khách hàng), `hrm-service` (nhân sự), `notification-service` (thông báo & webhook), `media-service` (lưu trữ Garage S3) và `mdm-service` (dữ liệu danh mục).\n\nNhờ chuẩn hóa protobuf contract và cấm tuyệt đối việc gọi chéo database, mỗi service toàn quyền quản trị schema CSDL của mình.",
        callout: {
          type: "tip",
          text: "Design Principle: High cohesion within service boundaries, loose coupling across networks via gRPC contracts and NATS domain events.",
          textVi: "Nguyên tắc Thiết kế: Tính gắn kết cao bên trong ranh giới service, liên kết lỏng qua mạng bằng protobuf gRPC và sự kiện NATS."
        }
      },
      {
        id: "storage-reliability",
        title: "High-Availability Storage & Failover Strategy",
        titleVi: "Kiến trúc Lưu trữ Sẵn sàng Cao (HA) & Chiến lược Failover",
        content: "Stateful reliability is achieved via the CloudNativePG operator running on the bare-metal 3-node K3s cluster. CloudNativePG coordinates PostgreSQL streaming replication across all 3 nodes with automated leader election and WAL archiving.\n\nTransient state, tenant session caches, and rate-limiting counters are hosted on Valkey, providing sub-millisecond in-memory lookups.",
        contentVi: "Độ tin cậy của dữ liệu có trạng thái (stateful) được đảm bảo bởi operator CloudNativePG trên cụm bare-metal 3-node K3s. CloudNativePG điều phối streaming replication giữa cả 3 node với cơ chế tự động bầu chọn leader và lưu trữ WAL liên tục.\n\nBộ nhớ đệm phiên làm việc và giới hạn tần suất được lưu trữ trên Valkey, mang lại thời gian phản hồi dưới 1 mili-giây.",
        callout: {
          type: "info",
          text: "CloudNativePG automatically triggers failover in under 10 seconds if the primary node stops heartbeating.",
          textVi: "CloudNativePG tự động kích hoạt chuyển đổi dự phòng (failover) trong dưới 10 giây nếu node chính ngừng gửi tín hiệu heartbeat."
        }
      }
    ],
    content: {
      problemStatement: "Financial operations platforms must provide strict multi-tenant isolation, unified auditability, dependable service communication, and independent release cycles across domain modules (Finance, IAM, CRM, HRM, Workflow). A traditional monolith suffers from release lockstep, while uncontrolled microservices lead to distributed transaction chaos.",
      problemStatementVi: "Nền tảng vận hành tài chính đòi hỏi cách ly dữ liệu đa khách thuê nghiêm ngặt, kiểm toán thống nhất, giao tiếp microservice dưới 10ms và chu kỳ release độc lập giữa các phân hệ (Finance, IAM, CRM, HRM, Workflow). Kiến trúc monolith nguyên khối gây nghẽn phát hành, trong khi chia nhỏ microservices thiếu kỷ luật sẽ dẫn tới hỗn loạn transaction.",
      architectureDesign: "Arda isolates concerns across 3 Git repositories: arda-be (9 Go microservices + shared libs/go), arda-mfe (React Module Federation 7 remotes), and arda-infra (3-node K3s GitOps). Client traffic routes through Cloudflare Tunnels to Traefik Ingress with ForwardAuth. The auth-gateway BFF validates sessions via Ory Kratos/Hydra and injects trusted identity headers. Go domain services communicate via gRPC for synchronous data and NATS JetStream for asynchronous domain events, backed by CloudNativePG HA PostgreSQL, Valkey cache, and Zeebe 8.5 BPMN.",
      architectureDesignVi: "Arda phân tách ranh giới qua 3 repository: arda-be (9 Go microservices và libs/go), arda-mfe (React Module Federation 7 remotes) và arda-infra (K3s GitOps). Client kết nối qua Cloudflare Tunnel tới Traefik Ingress tích hợp ForwardAuth. auth-gateway BFF xác thực phiên qua Ory Kratos/Hydra và đính kèm identity header. Các Go microservices giao tiếp qua gRPC cho truy vấn đồng bộ và NATS JetStream cho sự kiện nghiệp vụ, lưu trữ trên CloudNativePG HA Postgres, Valkey cache và Zeebe 8.5 BPMN.",
      technicalDecisions: [
        "Internal Shared Library (libs/go): unified arda-auth, arda-grpc, arda-events, arda-postgres packages preventing drift across all 9 domain services.",
        "Dual gRPC & NATS Protocol Strategy: gRPC for synchronous low-latency intra-cluster reads/writes; NATS JetStream for asynchronous domain event propagation.",
        "BFF Auth Gateway Facade: abstracts authentication complexity from client browsers, managing session cookies, CSRF protection, and token exchanges.",
        "High-Availability Bare-Metal Storage: CloudNativePG HA PostgreSQL with automated failover and local NVMe storage on a 3-node K3s cluster."
      ],
      technicalDecisionsVi: [
        "Bộ thư viện nội bộ (libs/go): chuẩn hóa các package arda-auth, arda-grpc, arda-events, arda-postgres ngăn ngừa sự phân mảnh giữa 9 microservices.",
        "Chiến lược giao tiếp kép gRPC & NATS: gRPC phục vụ đọc/ghi đồng bộ nội bộ cụm độ trễ thấp; NATS JetStream cho luồng sự kiện nghiệp vụ bất đồng bộ.",
        "Mô hình BFF Auth Gateway: che giấu độ phức tạp xác thực khỏi trình duyệt, quản lý session cookie, CSRF và trao đổi token tập trung.",
        "Lưu trữ sẵn sàng cao trên bare-metal: CloudNativePG HA PostgreSQL với cơ chế tự động failover trên cụm 3-node K3s."
      ],
      keyTakeaways: [
        "Enforcing a strict protobuf-first gRPC contract eliminates API drift between backend microservices.",
        "Decoupling the BFF from domain services allows frontend teams to iterate on composite APIs without touching core business logic.",
        "Bare-metal K3s with CloudNativePG delivers production-like resilience at a fraction of cloud managed service costs."
      ],
      keyTakeawaysVi: [
        "Áp dụng gRPC với Protobuf contract loại bỏ hoàn toàn tình trạng sai lệch schema giữa các backend microservices.",
        "Tách biệt BFF khỏi domain services giúp frontend phát triển nhanh các API tổng hợp mà không cần sửa core logic.",
        "Hạ tầng bare-metal K3s với CloudNativePG mang lại độ tin cậy tương đương môi trường production với chi phí tối ưu."
      ],
      codeSnippet: {
        language: "go",
        title: "Arda Shared gRPC Server Interceptor (libs/go/arda-grpc)",
        code: `// UnaryServerInterceptor injecting trusted tenant & actor context
func TenantContextUnaryServerInterceptor() grpc.UnaryServerInterceptor {
    return func(ctx context.Context, req any, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (any, error) {
        md, ok := metadata.FromIncomingContext(ctx)
        if !ok {
            return nil, status.Error(codes.Unauthenticated, "missing grpc metadata")
        }

        tenantID := getHeaderValue(md, "x-tenant-id")
        userID := getHeaderValue(md, "x-user-id")
        if tenantID == "" || userID == "" {
            return nil, status.Error(codes.Unauthenticated, "missing tenant or user context")
        }

        ctx = context.WithValue(ctx, TenantIDKey, tenantID)
        ctx = context.WithValue(ctx, UserIDKey, userID)
        return handler(ctx, req)
    }
}`
      }
    }
  },
  {
    slug: "authentication-beyond-jwt-arda-identity-architecture",
    title: "Authentication Beyond JWT: Designing Arda's Identity Architecture",
    titleVi: "Bảo mật Vượt trên JWT: Thiết kế Kiến trúc Định danh Zero-Trust trong Arda",
    summary: "Deep dive into why browsers shouldn't juggle raw JWTs: Traefik ForwardAuth, auth-gateway BFF, Ory Kratos (Identity), Ory Hydra (OAuth2/OIDC), and downstream header injection.",
    summaryVi: "Phân tích vì sao trình duyệt không nên trực tiếp xử lý raw JWT: Traefik ForwardAuth, auth-gateway BFF, Ory Kratos (Identity), Ory Hydra (OAuth2/OIDC) và cơ chế inject header đáng tin cậy.",
    date: "Feb 2026",
    readTime: "10 min read",
    tags: ["Arda Labs", "Auth", "Security", "Ory Kratos", "Ory Hydra", "ForwardAuth", "Zero-Trust"],
    featured: false,
    project: "arda",
    relatedProject: "arda-finops-platform",
    diagramKey: "authentication-beyond-jwt-arda-identity-architecture",
    evidenceIds: ["arda-auth-zero-trust"],
    repositoryUrl: "https://github.com/arda-labs/arda-be",
    highlights: [
      {
        value: "HttpOnly",
        label: "Cookie Security",
        labelVi: "Bảo mật Cookie",
        detail: "Zero client token leakage",
        detailVi: "Không lộ token ra Javascript"
      },
      {
        value: "Instant",
        label: "Session Revocation",
        labelVi: "Thu hồi Phiên Tức thì",
        detail: "Centralized in Ory Kratos",
        detailVi: "Quản lý tập trung tại Kratos"
      },
      {
        value: "Edge Auth",
        label: "Traefik ForwardAuth",
        labelVi: "Xác thực Biên Mạng",
        detail: "Zero backend verification cost",
        detailVi: "Giải phóng tính toán backend"
      },
      {
        value: "RBAC + IAM",
        label: "Tenant Role Injection",
        labelVi: "Phân quyền Đa Tenant",
        detail: "Injected trusted headers",
        detailVi: "Đính kèm header tin cậy"
      }
    ],
    comparison: {
      naiveTitle: "Client-Side JWT Management",
      naiveTitleVi: "Quản lý JWT Truyền thống ở Trình duyệt",
      naivePoints: [
        "Tokens stored in localStorage/sessionStorage vulnerable to XSS exfiltration.",
        "Impossible to revoke stolen JWTs before expiration without distributed blacklists.",
        "Every downstream service must verify RSA/ECDSA public-key signatures on every RPC."
      ],
      naivePointsVi: [
        "Lưu token trong localStorage/sessionStorage dễ bị đánh cắp qua tấn công XSS.",
        "Không thể thu hồi JWT bị đánh cắp trước khi hết hạn nếu không dựng blacklist phân tán.",
        "Mọi service nội bộ phải tự giải mã chữ ký RSA/ECDSA trên từng request gRPC."
      ],
      solutionTitle: "Arda Edge Zero-Trust Identity",
      solutionTitleVi: "Định danh Zero-Trust Biên Mạng trong Arda",
      solutionPoints: [
        "HttpOnly SameSite opaque cookie completely invisible to browser JavaScript.",
        "Instant session invalidation at Ory Kratos identity authority.",
        "Traefik ForwardAuth injects trusted identity headers (X-User-Id, X-Tenant-Id, X-Roles) downstream."
      ],
      solutionPointsVi: [
        "Cookie HttpOnly SameSite vô hình hoàn toàn trước mã JavaScript trình duyệt.",
        "Hủy phiên làm việc ngay lập tức tại máy chủ định danh Ory Kratos.",
        "Traefik ForwardAuth inject các header đáng tin cậy đã xác thực tới các service phía sau."
      ]
    },
    sections: [
      {
        id: "why-not-client-jwt",
        title: "The Pitfalls of Browser-Held JWTs in Enterprise Systems",
        titleVi: "Hạn chế của Việc Lưu JWT ở Trình duyệt trong Hệ thống Lớn",
        content: "While JWT is popular in simple tutorials, in high-compliance multi-tenant platforms it introduces severe operational issues:\n1. Revocation Delay: A compromised token remains valid until expiry unless complex Redis blacklists are checked on every request.\n2. Security Boundary: If client JavaScript has access to tokens, any third-party script vulnerability (XSS) can exfiltrate full credentials.\n3. Header Bloat: As tenant permissions and roles grow, the Authorization header balloons, degrading mobile network bandwidth.",
        contentVi: "Dù JWT rất phổ biến trong các tutorial đơn giản, trong hệ thống tài chính đa khách thuê nó tạo ra nhiều rủi ro vận hành:\n1. Độ trễ thu hồi: Token bị lộ vẫn hợp lệ cho tới khi hết hạn trừ khi phải dựng thêm blacklist Redis.\n2. Lỗ hổng bảo mật: Khi JavaScript client đọc được token, bất kỳ lỗ hổng XSS nào cũng có thể làm lộ thông tin đăng nhập.\n3. Phình to kích thước header: Khi quyền hạn và vai trò tenant tăng lên, header Authorization phình to làm chậm đường truyền di động.",
        callout: {
          type: "warning",
          text: "Never store credentials or unencrypted JWTs in localStorage for applications handling financial or enterprise data.",
          textVi: "Tuyệt đối không lưu token hoặc JWT trong localStorage đối với các ứng dụng xử lý dữ liệu tài chính hoặc doanh nghiệp."
        }
      }
    ],
    content: {
      problemStatement: "Storing raw JWTs in browser localStorage or cookies creates token leakage vulnerabilities, makes instant session revocation impossible without distributed blocklists, and forces every microservice to maintain complex public-key signature verification logic.",
      problemStatementVi: "Lưu trữ raw JWT trong localStorage hoặc cookie trình duyệt tiềm ẩn nguy cơ rò rỉ token, khiến việc thu hồi phiên tức thì trở nên bất khả thi nếu không có blacklist phân tán, và buộc mọi microservice phải gánh logic xác thực chữ ký phức tạp.",
      architectureDesign: "Arda shifts identity verification to the network edge: Browser requests carry an HttpOnly opaque session cookie to Traefik Ingress. Traefik's ForwardAuth middleware delegates inspection to auth-gateway. auth-gateway verifies the session against Ory Kratos and extracts tenant permissions via IAM. Once verified, auth-gateway responds with HTTP 200 and injects trusted identity headers (X-User-Id, X-Tenant-Id, X-Roles, X-Permissions) which Traefik forwards directly to downstream services.",
      architectureDesignVi: "Arda chuyển việc xác thực định danh ra biên mạng: Request từ trình duyệt gửi kèm HttpOnly session cookie tới Traefik Ingress. Middleware ForwardAuth ủy quyền kiểm tra cho auth-gateway. auth-gateway đối soát phiên với Ory Kratos và phân quyền qua IAM. Khi hợp lệ, auth-gateway phản hồi HTTP 200 và đính kèm các header đã xác thực (X-User-Id, X-Tenant-Id, X-Roles, X-Permissions) để Traefik chuyển tiếp tới các service phía sau.",
      technicalDecisions: [
        "Separation of Identity (Kratos) vs OAuth2 (Hydra) vs Application RBAC (IAM Service): clear separation of concerns without coupling credentials to business permissions.",
        "Edge ForwardAuth with Traefik: unauthorized requests are rejected at the ingress before consuming internal cluster compute.",
        "HttpOnly SameSite Cookies: eliminates XSS token exfiltration risks by never exposing credentials to JavaScript execution.",
        "Downstream Trust Boundary: internal Go services trust injected headers because external clients cannot bypass Traefik's header sanitization."
      ],
      technicalDecisionsVi: [
        "Phân tách rõ ràng Định danh (Kratos) vs OAuth2 (Hydra) vs Phân quyền ứng dụng (IAM Service): không gộp thông tin xác thực với logic quyền hạn nghiệp vụ.",
        "ForwardAuth tại Ingress Traefik: loại bỏ các request không hợp lệ ngay tại cổng vào, tiết kiệm tài nguyên tính toán bên trong cụm.",
        "Cookie HttpOnly SameSite: ngăn chặn triệt để rủi ro đánh cắp token qua tấn công XSS do JavaScript client không thể đọc cookie.",
        "Ranh giới tin cậy nội bộ: các Go microservice tin tưởng header được inject vì Traefik luôn xóa sạch các header giả mạo từ client bên ngoài."
      ],
      keyTakeaways: [
        "Opaque cookies with edge ForwardAuth combine the security of instant revocation with the speed of internal header passing.",
        "Microservices become simpler and faster because they do not verify cryptographic JWT signatures on every RPC.",
        "Multi-factor authentication (MFA) and OAuth2 social logins are managed centrally in Kratos/Hydra without touching domain services."
      ],
      keyTakeawaysVi: [
        "Opaque cookie kết hợp ForwardAuth mang lại khả năng thu hồi phiên tức thì cùng tốc độ xử lý header nội bộ cực nhanh.",
        "Các microservice trở nên gọn nhẹ và tối ưu hơn do không phải xác thực chữ ký JWT trên từng request.",
        "Xác thực 2 bước (MFA) và đăng nhập mạng xã hội được quản lý tập trung tại Kratos/Hydra mà không ảnh hưởng tới domain services."
      ],
      codeSnippet: {
        language: "go",
        title: "Arda ForwardAuth Handler in auth-gateway",
        code: `func (g *Gateway) ForwardAuthHandler(w http.ResponseWriter, r *http.Request) {
    session, err := g.kratosClient.ValidateSessionCookie(r.Context(), r)
    if err != nil || !session.Active {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    // Resolve tenant membership and RBAC permissions from iam-service
    authCtx, err := g.iamClient.ResolveUserContext(r.Context(), session.Identity.Id)
    if err != nil {
        http.Error(w, "Forbidden", http.StatusForbidden)
        return
    }

    // Inject trusted downstream identity headers
    w.Header().Set("X-User-Id", authCtx.UserId)
    w.Header().Set("X-Tenant-Id", authCtx.TenantId)
    w.Header().Set("X-Roles", strings.Join(authCtx.Roles, ","))
    w.Header().Set("X-Permissions", strings.Join(authCtx.Permissions, ","))
    w.WriteHeader(http.StatusOK)
}`
      }
    }
  },
  {
    slug: "reliable-domain-events-nats-transactional-outbox",
    title: "Reliable Domain Events with NATS and the Transactional Outbox Pattern",
    titleVi: "Xuất bản Sự kiện Miền Tin cậy với NATS và Mẫu Transactional Outbox",
    summary: "Solving the dual-write hazard in distributed Go services: writing business state and domain events atomically in PostgreSQL, relaying via NATS JetStream, and enforcing idempotent consumer deduplication.",
    summaryVi: "Giải quyết rủi ro dual-write trong hệ thống Go phân tán: ghi nhận trạng thái nghiệp vụ và sự kiện miền nguyên tử trong PostgreSQL, chuyển tiếp qua NATS JetStream và xử lý deduplication ở consumer.",
    date: "Jan 2026",
    readTime: "11 min read",
    tags: ["Arda Labs", "NATS JetStream", "Transactional Outbox", "Distributed Systems", "Go", "PostgreSQL", "Event-Driven"],
    featured: true,
    project: "arda",
    relatedProject: "arda-finops-platform",
    diagramKey: "reliable-domain-events-nats-transactional-outbox",
    evidenceIds: ["arda-transactional-outbox-nats"],
    repositoryUrl: "https://github.com/arda-labs/arda-be",
    highlights: [
      {
        value: "Atomic",
        label: "Zero Dual-Write",
        labelVi: "Không Lỗi Dual-Write",
        detail: "Co-located outbox table",
        detailVi: "Bảng outbox trong cùng transaction"
      },
      {
        value: "< 1ms",
        label: "NATS JetStream",
        labelVi: "Độ trễ NATS",
        detail: "Disk-backed stream replay",
        detailVi: "Lưu trữ bền vững trên đĩa"
      },
      {
        value: "UUIDv7",
        label: "Event ID Ordering",
        labelVi: "Định danh UUIDv7",
        detail: "Time-sortable event keys",
        detailVi: "Sắp xếp theo thời gian tự nhiên"
      },
      {
        value: "Idempotent",
        label: "Deduplication Log",
        labelVi: "Khử Trùng lặp",
        detail: "At-least-once safety",
        detailVi: "An toàn tuyệt đối khi phân phối"
      }
    ],
    comparison: {
      naiveTitle: "Direct DB Commit + Broker Publish",
      naiveTitleVi: "Commit CSDL rồi Bắn Message Trực tiếp",
      naivePoints: [
        "If broker publish fails after DB commit, events are permanently lost with zero trace.",
        "If DB transaction aborts after message dispatch, ghost events corrupt downstream systems.",
        "Unversioned JSON payloads break downstream consumers during rapid schema evolution."
      ],
      naivePointsVi: [
        "Nếu broker lỗi sau khi commit CSDL, sự kiện sẽ bị mất vĩnh viễn không dấu vết.",
        "Nếu transaction CSDL bị rollback sau khi bắn tin, message ma làm hỏng dữ liệu downstream.",
        "Payload JSON không đánh version sẽ làm sập consumer khi cập nhật schema."
      ],
      solutionTitle: "Transactional Outbox + NATS JetStream",
      solutionTitleVi: "Transactional Outbox kết hợp NATS JetStream",
      solutionPoints: [
        "Outbox record is written in the same SQL transaction as the domain state.",
        "Relay worker continuously sweeps unpublished events and acknowledges upon JetStream disk write.",
        "Envelope[T] enforces UUIDv7 event IDs, schema versions, and consumer idempotency tables."
      ],
      solutionPointsVi: [
        "Bản ghi outbox được ghi trong cùng transaction SQL với dữ liệu miền.",
        "Worker quét sự kiện chưa gửi và chỉ xác nhận xóa khi NATS JetStream đã ghi đĩa an toàn.",
        "Schema Envelope[T] chuẩn hóa UUIDv7, version và bảng log khử trùng lặp ở consumer."
      ]
    },
    content: {
      problemStatement: "In distributed microservices, performing a database commit and publishing a message to a broker in the same API handler creates a critical 'dual-write' hazard. If the broker publish fails after DB commit (or DB crashes after publish), data becomes permanently inconsistent across services.",
      problemStatementVi: "Trong hệ thống microservices phân tán, việc vừa commit vào CSDL vừa bắn message sang broker trong cùng một API handler dẫn đến rủi ro 'dual-write' nghiêm trọng. Nếu bắn message thất bại sau khi đã commit CSDL (hoặc DB lỗi sau khi bắn message), dữ liệu giữa các service sẽ bị lệch lạc vĩnh viễn.",
      architectureDesign: "Arda implements the Transactional Outbox pattern in `libs/go/arda-events`: Business data and a structured outbox record are committed within a single atomic PostgreSQL transaction. A background outbox worker polls unpublished records, wraps them into versioned `Envelope[T]` schemas with tenant and actor metadata, and publishes them to NATS JetStream. Downstream consumers maintain an idempotent processing log to discard duplicate deliveries.",
      architectureDesignVi: "Arda áp dụng mẫu Transactional Outbox trong thư viện `libs/go/arda-events`: Dữ liệu nghiệp vụ và bản ghi outbox được ghi đồng thời trong cùng một transaction PostgreSQL nguyên tử. Một worker chạy ngầm sẽ quét các bản ghi chưa xuất bản, đóng gói vào schema `Envelope[T]` có version, tenant và actor metadata, rồi publish lên NATS JetStream. Phía consumer duy trì bảng log xử lý để loại bỏ các message trùng lặp.",
      technicalDecisions: [
        "Atomic Outbox Table: the `outbox_events` table is co-located in the service's PostgreSQL schema so the event write shares the business transaction.",
        "Structured Event Envelope: `Envelope[T]` includes `event_id` (UUIDv7), `schema_version`, `tenant_id`, `actor_id`, `timestamp`, and strongly-typed JSON payload.",
        "NATS JetStream Stream Persistence: JetStream stores messages on disk with file-based retention, ack policy, and consumer replay capabilities.",
        "Idempotent Consumer Deduplication: consumers store processed `event_id` in a dedicated processed_events table inside their own local transaction."
      ],
      technicalDecisionsVi: [
        "Bảng Outbox nguyên tử: bảng `outbox_events` nằm trong schema PostgreSQL của service để việc ghi sự kiện dùng chung transaction với dữ liệu nghiệp vụ.",
        "Chuẩn hóa Envelope sự kiện: `Envelope[T]` chứa `event_id` (UUIDv7), `schema_version`, `tenant_id`, `actor_id`, `timestamp` và payload JSON.",
        "Lưu trữ bền vững với NATS JetStream: JetStream lưu trữ message xuống đĩa với chính sách ACK rõ ràng và khả năng replay sự kiện.",
        "Cơ chế Idempotent Consumer: consumer lưu `event_id` đã xử lý vào bảng deduplication nội bộ trong transaction riêng."
      ],
      keyTakeaways: [
        "Guarantees at-least-once delivery without distributed 2-phase commits (2PC) or XA transactions.",
        "Versioned event envelopes allow schema evolution without breaking downstream consumers.",
        "NATS JetStream provides sub-millisecond pub/sub latency with low operational overhead compared to Kafka."
      ],
      keyTakeawaysVi: [
        "Đảm bảo cơ chế phân phối ít nhất một lần (at-least-once) mà không cần dùng 2-phase commit (2PC) phức tạp.",
        "Envelope có version cho phép nâng cấp cấu trúc sự kiện mà không làm lỗi các consumer đang chạy.",
        "NATS JetStream mang lại độ trễ dưới 1 mili-giây cùng chi phí vận hành nhẹ hơn đáng kể so với Kafka."
      ],
      codeSnippet: {
        language: "go",
        title: "Transactional Outbox Helper in libs/go/arda-events",
        code: `// Atomically inserts domain entity and outbox event in PostgreSQL
func (r *OrderRepository) CreateOrderWithOutbox(ctx context.Context, tx pgx.Tx, order *Order) error {
    // 1. Insert domain row
    if err := r.insertOrder(ctx, tx, order); err != nil {
        return fmt.Errorf("failed to insert order: %w", err)
    }

    // 2. Prepare structured event envelope
    env := ardaevents.NewEnvelope("finance.order.created", "v1", order.TenantID, order.CreatedBy, order)

    // 3. Insert into outbox_events table within the SAME transaction
    query := \`INSERT INTO outbox_events (id, subject, payload, status, created_at) 
              VALUES ($1, $2, $3, 'PENDING', NOW())\`
    _, err := tx.Exec(ctx, query, env.ID, env.Subject, env.PayloadJSON())
    return err
}`
      }
    }
  },
  {
    slug: "bpmn-workflow-service-boundary-zeebe",
    title: "Putting BPMN Behind a Workflow Service Boundary",
    titleVi: "Cô lập Quy trình BPMN Phía sau Phân hệ Workflow Service (Zeebe 8.5)",
    summary: "Why domain services shouldn't talk directly to Zeebe: Designing a clean gRPC/HTTP workflow-service facade for case lifecycles, user tasks, SLA timers, and domain error handling.",
    summaryVi: "Vì sao các domain service không nên kết nối trực tiếp vào Zeebe: Thiết kế facade workflow-service qua gRPC/HTTP quản lý vòng đời hồ sơ, user task, SLA timer và xử lý lỗi nghiệp vụ.",
    date: "Jan 2026",
    readTime: "9 min read",
    tags: ["Arda Labs", "Zeebe", "BPMN", "Workflow", "Go", "gRPC", "Architecture"],
    featured: false,
    project: "arda",
    relatedProject: "arda-finops-platform",
    diagramKey: "bpmn-workflow-service-boundary-zeebe",
    evidenceIds: ["arda-zeebe-workflow-boundary"],
    repositoryUrl: "https://github.com/arda-labs/arda-be",
    content: {
      problemStatement: "Allowing multiple microservices (finance, crm, hrm) to import the Zeebe gRPC client directly tightly couples business domain code to workflow engine internals, leaks process variables, and scatters case lifecycle tracking across disparate codebases.",
      problemStatementVi: "Nếu cho phép nhiều microservices (finance, crm, hrm) trực tiếp gọi Zeebe gRPC client sẽ làm mã nguồn nghiệp vụ bị phụ thuộc chặt chẽ vào engine workflow, rò rỉ biến quy trình và phân tán việc theo dõi vòng đời hồ sơ.",
      architectureDesign: "Arda introduces a dedicated `workflow-service` as an architectural boundary in front of Zeebe 8.5. Domain services call standard gRPC endpoints (`CreateCase`, `SubmitCase`, `CancelCase`) without knowing Zeebe exists. The workflow-service handles BPMN process definitions, variable serialization, user task assignments, SLA timer events, and publishes NATS notifications upon workflow milestone completion.",
      architectureDesignVi: "Arda xây dựng phân hệ `workflow-service` độc lập làm facade che chắn phía trước Zeebe 8.5. Các service nghiệp vụ chỉ gọi các endpoint gRPC chuẩn (`CreateCase`, `SubmitCase`, `CancelCase`). workflow-service chịu trách nhiệm nạp định nghĩa BPMN, chuyển đổi biến, phân công user task, bắt sự kiện timer SLA và phát thông báo qua NATS khi hoàn thành mốc quy trình.",
      technicalDecisions: [
        "Standardized Case Interface: domain services treat workflows as generic Case entities with status transitions (DRAFT -> SUBMITTED -> APPROVED -> REJECTED).",
        "Encapsulated Zeebe Client: only workflow-service manages Zeebe connection pools, worker threads, and job streaming.",
        "Asynchronous SLA Escalation: Zeebe timer boundary events trigger automated escalation tasks without custom cron jobs in domain services.",
        "Unified Audit Log: all BPMN state changes are automatically recorded in an audit table and published to NATS for compliance."
      ],
      technicalDecisionsVi: [
        "Chuẩn hóa Interface Case: các domain service coi workflow như các thực thể Case với các trạng thái chuẩn (DRAFT -> SUBMITTED -> APPROVED -> REJECTED).",
        "Đóng gói Zeebe Client: chỉ duy nhất workflow-service quản lý kết nối Zeebe, worker pool và job streaming.",
        "Xử lý Escalation SLA tự động: Timer boundary event trong BPMN tự động kích hoạt luồng cảnh báo mà không cần viết cron job thủ công ở domain service.",
        "Audit Log tập trung: mọi thay đổi trạng thái BPMN đều được ghi nhận vào bảng kiểm toán và bắn sự kiện qua NATS."
      ],
      keyTakeaways: [
        "Domain microservices remain decoupled from the workflow engine and can be tested with simple mock interfaces.",
        "Business analysts can inspect and update BPMN models in Camunda Modeler without altering domain service code.",
        "Centralized error handling prevents unhandled workflow panics from polluting business transaction logs."
      ],
      keyTakeawaysVi: [
        "Các domain microservice hoàn toàn độc lập với workflow engine, dễ dàng viết unit test với mock interface.",
        "Chuyên viên nghiệp vụ có thể chỉnh sửa mô hình BPMN trên Camunda Modeler mà không cần sửa code backend.",
        "Xử lý lỗi tập trung ngăn ngừa các sự cố luồng workflow làm ảnh hưởng đến transaction của hệ thống."
      ],
      codeSnippet: {
        language: "go",
        title: "Workflow Service Facade Interface (app/workflow-service)",
        code: `// gRPC Service definition isolating Zeebe orchestration
type WorkflowServiceServer interface {
    StartProcessInstance(ctx context.Context, req *pb.StartProcessRequest) (*pb.ProcessInstanceReply, error)
    CompleteUserTask(ctx context.Context, req *pb.CompleteTaskRequest) (*pb.TaskReply, error)
    GetCaseHistory(ctx context.Context, req *pb.CaseHistoryRequest) (*pb.CaseHistoryReply, error)
}`
      }
    }
  },
  {
    slug: "multi-remote-micro-frontend-platform-module-federation",
    title: "What I Learned Building a Multi-Remote Micro Frontend Platform",
    titleVi: "Bài học Thực chiến khi Xây dựng Nền tảng Micro-Frontend Đa Phân hệ với React Module Federation",
    summary: "Architecting Arda's frontend with React Module Federation: 1 Shell host + 7 decoupled remotes (IAM, Platform, Finance, Account, HRM, Workflow, CRM) sharing @workspace packages and avoiding shared state traps.",
    summaryVi: "Kiến trúc frontend Arda với React Module Federation: 1 Shell Host + 7 Remotes độc lập dùng chung gói @workspace/*, chuẩn hóa ranh giới và tránh bẫy chia sẻ state.",
    date: "Feb 2026",
    readTime: "11 min read",
    tags: ["Arda Labs", "React", "Module Federation", "Micro-Frontend", "TypeScript", "Tailwind CSS"],
    featured: true,
    project: "arda",
    relatedProject: "arda-finops-platform",
    diagramKey: "multi-remote-micro-frontend-platform-module-federation",
    evidenceIds: ["arda-react-module-federation"],
    repositoryUrl: "https://github.com/arda-labs/arda-mfe",
    highlights: [
      {
        value: "7 Remotes",
        label: "Domain Remotes",
        labelVi: "Remote Độc lập",
        detail: "Finance, IAM, CRM, HRM, Workflow",
        detailVi: "Tài chính, IAM, CRM, HRM, Quy trình"
      },
      {
        value: "1 Host",
        label: "Orchestration Shell",
        labelVi: "Shell Điều phối",
        detail: "Top-level layout & routing",
        detailVi: "Khung layout & điều hướng chung"
      },
      {
        value: "6 Packages",
        label: "Shared @workspace",
        labelVi: "Gói Dùng chung",
        detail: "ui, api, auth, i18n, core, theme",
        detailVi: "ui, api, auth, i18n, core, theme"
      },
      {
        value: "Singleton",
        label: "React 19 Runtime",
        labelVi: "React Singleton",
        detail: "Zero duplicate bundle bloat",
        detailVi: "Tránh nạp trùng thư viện"
      }
    ],
    comparison: {
      naiveTitle: "Component-Level Micro-Frontends",
      naiveTitleVi: "Micro-Frontend Cắt Nhỏ Cấp Component",
      naivePoints: [
        "Exporting individual buttons and modals creates cross-app CSS and state entanglement.",
        "Sharing global state across remotes breaks independent team deployments.",
        "MFE bundle version mismatches cause frequent runtime crashes."
      ],
      naivePointsVi: [
        "Export từng nút bấm hay modal nhỏ khiến CSS và state bị dính chùm giữa các app.",
        "Chia sẻ global state giữa các remote làm mất đi tính độc lập khi release.",
        "Lệch phiên bản thư viện giữa các remote gây lỗi văng app khi chạy."
      ],
      solutionTitle: "Arda Route-Level Module Federation",
      solutionTitleVi: "Module Federation Cấp Route Chuẩn Mực",
      solutionPoints: [
        "Remotes expose clean route trees (./Routes) rather than scattered micro-components.",
        "State remains encapsulated within each remote; inter-app sync is handled via URL query params.",
        "Shared dependencies (React, ReactDOM) configured as strict singletons via Module Federation."
      ],
      solutionPointsVi: [
        "Các remote chỉ export cây route hoàn chỉnh (./Routes) thay vì phân mảnh component.",
        "State được đóng gói trọn vẹn trong remote; liên kết giữa các app qua URL query param.",
        "Các thư viện dùng chung (React, ReactDOM) được khóa singleton nghiêm ngặt."
      ]
    },
    sections: [
      {
        id: "module-federation-rules",
        title: "Golden Rules for Module Federation in Production",
        titleVi: "Nguyên Tắc Vàng Khi Vận Hành Module Federation",
        content: "1. Never export internal state: Remotes should own their stores (Zustand, React Query). Never import a store from another remote.\n2. Keep packages pure: `@workspace/ui` contains design components (shadcn) without business domain logic.\n3. Graceful degradation: Wrap remote imports in React Error Boundaries and Suspense fallback spinners.",
        contentVi: "1. Tuyệt đối không export state nội bộ: Mỗi remote tự quản lý store của mình (Zustand, React Query). Không import store từ remote khác.\n2. Giữ các gói dùng chung thuần túy: `@workspace/ui` chỉ chứa UI component (shadcn) không chứa logic nghiệp vụ.\n3. Dự phòng sự cố: Luôn bọc các remote import bằng React Error Boundary và Suspense fallback spinner.",
        callout: {
          type: "tip",
          text: "When updating shared @workspace packages, TypeScript project references in the monorepo provide instant compile-time feedback across all 7 remotes.",
          textVi: "Khi cập nhật các gói @workspace/*, tính năng TypeScript Project References trong monorepo giúp phát hiện lỗi type trên cả 7 remote ngay lập tức."
        }
      }
    ],
    content: {
      problemStatement: "Large enterprise dashboards built as single monolithic frontends result in slow CI/CD builds, tight coupling between feature teams, and risky all-or-nothing deployments. Conversely, poorly designed micro-frontends suffer from styling conflicts, duplicated npm bundles, and fragmented auth states.",
      problemStatementVi: "Các dashboard doanh nghiệp lớn viết dưới dạng monolith dẫn tới thời gian build CI/CD kéo dài, phụ thuộc chéo giữa các team và rủi ro cao khi deploy. Ngược lại, chia MFE không khéo sẽ gây xung đột CSS, nạp trùng thư viện JS và phân mảnh trạng thái đăng nhập.",
      architectureDesign: "Arda MFE organizes the frontend into a monorepo with an orchestration Shell and 7 domain remotes (`mfe-iam`, `platform`, `finance`, `account`, `hrm`, `workflow`, `crm`). Remotes expose only top-level route modules rather than arbitrary internal components. Cross-cutting concerns are factored into shared internal packages (`@workspace/ui` with shadcn, `@workspace/api`, `@workspace/auth`, `@workspace/i18n`, `@workspace/core`, and `@workspace/theme`).",
      architectureDesignVi: "Arda MFE tổ chức frontend thành monorepo gồm Shell điều phối và 7 remote apps (`mfe-iam`, `platform`, `finance`, `account`, `hrm`, `workflow`, `crm`). Các remote chỉ export các module Route cấp cao thay vì export component nhỏ lẻ. Các phần dùng chung được đóng gói vào `@workspace/*` (shadcn UI, api, auth, i18n, core, theme).",
      technicalDecisions: [
        "Route-Level Module Exposing: remotes expose lazy-loaded page route trees (`./Routes`), ensuring remote internal state remains encapsulated.",
        "Shared Workspace Packages: `@workspace/ui` enforces consistent design tokens without duplicating CSS stylesheets across remotes.",
        "Strict Singleton Sharing: React, ReactDOM, and React Router are configured as strict singletons to prevent multiple React instance errors at runtime.",
        "URL Query as Inter-App State: cross-module navigation uses standard browser URL query parameters instead of fragile global window event buses."
      ],
      technicalDecisionsVi: [
        "Export Module ở cấp Route: các remote chỉ export route tree dạng lazy-load (`./Routes`), đảm bảo state nội bộ của remote không bị rò rỉ.",
        "Bộ thư viện @workspace dùng chung: `@workspace/ui` đồng nhất design system mà không làm phình kích thước bundle CSS.",
        "Chia sẻ Singleton nghiêm ngặt: React, ReactDOM, React Router được cấu hình singleton bắt buộc để tránh lỗi đa instance React khi chạy.",
        "Đồng bộ State qua URL Query: việc điều hướng giữa các module sử dụng query param chuẩn của trình duyệt thay vì lạm dụng window event bus."
      ],
      keyTakeaways: [
        "Do not share global Redux/Zustand state across micro-frontends — keep state scoped to individual remotes.",
        "Exposing entire routes rather than micro-components provides the best balance of decoupling and performance.",
        "Independent deployments allow the Finance team to release updates in seconds without rebuilding the IAM or HRM remotes."
      ],
      keyTakeawaysVi: [
        "Không nên chia sẻ global store (Redux/Zustand) giữa các remote — hãy giữ state cục bộ trong từng module.",
        "Export theo Route hoàn chỉnh mang lại sự phân tách ranh giới và hiệu năng tốt nhất so với export từng nút bấm nhỏ.",
        "Quy trình release độc lập giúp team Finance phát hành tính năng chỉ trong vài giây mà không cần build lại IAM hay HRM."
      ],
      codeSnippet: {
        language: "typescript",
        title: "Arda Shell Dynamic Remote Route Loader",
        code: `import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingSpinner } from "@workspace/ui";

const FinanceApp = lazy(() => import("finance/Routes"));
const IamApp = lazy(() => import("iam/Routes"));
const WorkflowApp = lazy(() => import("workflow/Routes"));

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/finance/*" element={<FinanceApp />} />
        <Route path="/iam/*" element={<IamApp />} />
        <Route path="/workflow/*" element={<WorkflowApp />} />
      </Routes>
    </Suspense>
  );
}`
      }
    }
  },
  {
    slug: "production-like-platform-three-node-k3s-cluster",
    title: "Running a Production-Like Platform on a Three-Node K3s Cluster",
    titleVi: "Vận hành Nền tảng Tương đương Production trên Cụm K3s 3-Node Bare-Metal",
    summary: "Setting up a resilient self-hosted lab: 3 control-plane/worker nodes, CloudNativePG HA PostgreSQL, NATS JetStream, Valkey, Traefik, Cloudflare Tunnel, and ArgoCD GitOps.",
    summaryVi: "Thiết lập cụm lab tự vận hành: 3 node control-plane/worker, CloudNativePG HA PostgreSQL, NATS JetStream, Valkey, Traefik, Cloudflare Tunnel và ArgoCD GitOps.",
    date: "Jan 2026",
    readTime: "11 min read",
    tags: ["Arda Labs", "K3s", "Kubernetes", "CloudNativePG", "DevOps", "GitOps", "Homelab", "Infrastructure"],
    featured: false,
    project: "infrastructure",
    relatedProject: "devops-k8s-infrastructure",
    diagramKey: "production-like-platform-three-node-k3s-cluster",
    evidenceIds: ["arda-k3s-gitops-infra", "homelab-3node-longhorn"],
    repositoryUrl: "https://github.com/arda-labs/arda-infra",
    content: {
      problemStatement: "Testing distributed microservice patterns such as failover, rolling rollouts, outbox consumers, and ingress security on managed public Kubernetes can become expensive for independent research and development.",
      problemStatementVi: "Thử nghiệm các kiến trúc phân tán như failover, rolling rollout, outbox worker và bảo mật ingress trên Kubernetes public managed có thể tốn kém đối với nghiên cứu và phát triển độc lập.",
      architectureDesign: "We constructed a production-like 3-node bare-metal K3s cluster (nodes 192.168.100.201-203) using embedded etcd for high availability. Ingress traffic enters via Cloudflare Tunnels (eliminating public IP exposure) into Traefik Ingress. State is managed by CloudNativePG (HA PostgreSQL with automatic leader election) and Valkey. Workload delivery is fully automated via declarative ArgoCD GitOps syncing manifests directly from GitHub.",
      architectureDesignVi: "Chúng tôi thiết lập cụm 3-node K3s bare-metal (IP 192.168.100.201-203) sử dụng etcd nhúng để đạt tính sẵn sàng cao (HA). Luồng truy cập đi qua Cloudflare Tunnel (không cần mở IP tĩnh công khai) vào Traefik Ingress. Dữ liệu được quản lý bởi CloudNativePG (PostgreSQL HA tự động bầu chọn leader) và Valkey. Triển khai ứng dụng hoàn toàn tự động qua ArgoCD GitOps đồng bộ từ GitHub.",
      technicalDecisions: [
        "Embedded etcd High-Availability: 3 server nodes participate in quorum, allowing any single node to fail without cluster downtime.",
        "CloudNativePG PostgreSQL Operator: automated asynchronous streaming replication, continuous WAL archiving, and sub-10s failover.",
        "Cloudflare Tunnel Zero-Trust Ingress: all cluster endpoints are published securely without port forwarding or exposing router firewalls.",
        "ArgoCD App of Apps Pattern: single root GitOps application orchestrating infrastructure operators and microservice Helm releases."
      ],
      technicalDecisionsVi: [
        "Cụm etcd nhúng sẵn sàng cao: 3 master node duy trì quorum, cho phép 1 node gặp sự cố mà cụm vẫn hoạt động bình thường.",
        "Operator CloudNativePG: tự động nhân bản streaming replication, lưu trữ WAL liên tục và tự động failover trong dưới 10 giây.",
        "Cloudflare Tunnel Zero-Trust Ingress: xuất bản các dịch vụ an toàn mà không cần mở port firewall hay cấu hình IP tĩnh.",
        "Mô hình App of Apps với ArgoCD: quản lý toàn bộ hạ tầng và các microservice Helm release chỉ từ một Git repository gốc."
      ],
      keyTakeaways: [
        "A 3-node K3s cluster provides identical API semantics to full Kubernetes while consuming less than 512MB RAM per control-plane node.",
        "CloudNativePG delivers enterprise-grade database replication and automated failover out of the box.",
        "Declarative GitOps guarantees that the entire infrastructure state is version-controlled and reproducible from scratch."
      ],
      keyTakeawaysVi: [
        "Cụm 3-node K3s mang lại API chuẩn như Kubernetes đầy đủ nhưng chỉ tiêu tốn dưới 512MB RAM trên mỗi control plane node.",
        "CloudNativePG cung cấp cơ chế nhân bản và tự động failover CSDL đạt chuẩn doanh nghiệp.",
        "Mô hình GitOps đảm bảo toàn bộ trạng thái hạ tầng đều được lưu vết trên Git và có thể tái dựng lại bất kỳ lúc nào."
      ],
      codeSnippet: {
        language: "yaml",
        title: "CloudNativePG HA Cluster Definition (k8s/database/cluster.yaml)",
        code: `apiVersion: postgresql.cnpg.io/v1
kind: Cluster
metadata:
  name: arda-postgres-ha
  namespace: database
spec:
  instances: 3
  primaryUpdateStrategy: unsupervised
  storage:
    size: 20Gi
    storageClass: local-path
  postgresql:
    parameters:
      shared_buffers: "256MB"
      max_connections: "200"`
      }
    }
  },

  // ==========================================
  // PUCHIDEMY ARTICLES
  // ==========================================
  {
    slug: "building-puchi-product-idea-to-service-architecture",
    title: "Building Puchi: From Product Idea to Service Architecture",
    titleVi: "Xây dựng Puchi: Từ Ý tưởng Trải nghiệm Học tập đến Kiến trúc Microservices",
    summary: "Deriving backend service boundaries from product domain needs: Next.js PWA, Go Kratos v3 monorepo (auth, core, learn, media, notification), NATS event bus, and Cloudflare R2 audio streaming.",
    summaryVi: "Xây dựng ranh giới microservice từ trải nghiệm học viên: Next.js PWA, Go Kratos v3 monorepo (auth, core, learn, media, notification), NATS event bus và stream âm thanh Cloudflare R2.",
    date: "Jan 2026",
    readTime: "10 min read",
    tags: ["Puchidemy", "Go", "Kratos v3", "Next.js", "PWA", "Microservices", "Product Engineering"],
    featured: true,
    project: "puchi",
    relatedProject: "puchi-language-platform",
    diagramKey: "building-puchi-product-idea-to-service-architecture",
    evidenceIds: ["puchi-kratos-monorepo", "puchi-learning-domain-engine"],
    repositoryUrl: "https://github.com/puchidemy/puchi-backend",
    heroImage: "https://raw.githubusercontent.com/puchidemy/.github/main/profile/assets/system-design.png",
    heroImageCaption: "Puchidemy System Design: Learner PWA ──► Envoy Gateway ──► 5 Go Kratos Services ──► PostgreSQL / NATS / Cloudflare R2",
    heroImageCaptionVi: "Thiết kế Hệ thống Puchidemy: PWA Học viên ──► Envoy Gateway ──► 5 Go Kratos Services ──► PostgreSQL / NATS / Cloudflare R2",
    highlights: [
      {
        value: "5 Services",
        label: "Go Kratos Monorepo",
        labelVi: "Go Kratos Monorepo",
        detail: "Protobuf contracts & gRPC/HTTP",
        detailVi: "Chuẩn hóa Protobuf & gRPC/HTTP"
      },
      {
        value: "< 1s PWA",
        label: "Mobile First Content",
        labelVi: "Tốc độ Tải PWA",
        detail: "Edge CDN & IndexedDB cache",
        detailVi: "Cache IndexedDB & CDN Edge"
      },
      {
        value: "NATS Bus",
        label: "Async XP & Streaks",
        labelVi: "Luồng Sự kiện NATS",
        detail: "Non-blocking quiz feedback",
        detailVi: "Chấm điểm không nghẽn HTTP"
      },
      {
        value: "GitOps",
        label: "ArgoCD on K3s",
        labelVi: "ArgoCD trên K3s",
        detail: "Automated declarative releases",
        detailVi: "Phát hành tự động qua GitOps"
      }
    ],
    comparison: {
      naiveTitle: "Monolithic Language App with Direct Media Delivery",
      naiveTitleVi: "Ứng dụng Ngoại ngữ Monolith Lưu Audio Trực tiếp",
      naivePoints: [
        "Serving high-frequency audio pronunciation files consumes server CPU and saturates network bandwidth.",
        "Synchronous user gamification (XP, streaks, leaderboard) adds 200ms+ latency to quiz submissions.",
        "Monolithic schema intertwines static language grammar rules with mutable learner test attempts."
      ],
      naivePointsVi: [
        "Phát file âm thanh trực tiếp từ server gây nghẽn băng thông và tốn CPU máy chủ.",
        "Tính điểm thưởng XP và chuỗi streak đồng bộ làm tăng độ trễ nộp bài lên hơn 200ms.",
        "Schema monolith gộp chung ngữ pháp bài học với lịch sử làm bài của học viên."
      ],
      solutionTitle: "Puchi Cloud-Native EdTech Architecture",
      solutionTitleVi: "Kiến trúc Nền tảng Học Ngoại ngữ Puchi Đám Mây",
      solutionPoints: [
        "Cloudflare R2 edge audio streaming keeps media delivery separate from backend request handling.",
        "NATS event stream processes gamification in background, returning quiz results in <10ms.",
        "Domain separation: immutable curriculum tree decoupled from append-only learner progress logs."
      ],
      solutionPointsVi: [
        "Stream audio qua Cloudflare R2 giúp tách việc phân phối media khỏi request handling của backend.",
        "Sự kiện NATS xử lý tính XP ngầm, trả kết quả trắc nghiệm tức thì dưới 10ms.",
        "Phân tách nghiệp vụ: cây bài học tĩnh bất biến tách khỏi lịch sử làm bài append-only."
      ]
    },
    sections: [
      {
        id: "product-to-services",
        title: "From Learner Journey to Microservice Boundaries",
        titleVi: "Từ Hành Trình Người Học đến Ranh Giới Microservices",
        content: "When designing Puchi, we modeled services strictly after learner interactions:\n1. Authentication & OAuth -> `auth-service`\n2. Story & Scene Navigation -> `learn-service`\n3. Audio Pronunciation Streaming -> `media-service` (backed by Cloudflare R2)\n4. XP Streaks & Daily Rewards -> `core-service` (via NATS events)\n5. Email Reminders & Notifications -> `notification-service`.\n\nThis functional separation ensures that an influx of learners listening to audio lessons never impacts the latency of authentication or progress evaluation.",
        contentVi: "Khi thiết kế Puchi, các service được phân tách bám sát trải nghiệm học viên:\n1. Đăng nhập & OAuth -> `auth-service`\n2. Cốt truyện & Bài tập -> `learn-service`\n3. Phát âm thanh bài giảng -> `media-service` (lưu trữ Cloudflare R2)\n4. Chuỗi streak & Điểm thưởng XP -> `core-service` (qua NATS events)\n5. Nhắc nhở học tập -> `notification-service`.\n\nSự phân tách này đảm bảo việc hàng nghìn học viên cùng nghe audio không bao giờ làm chậm API đăng nhập hay chấm bài.",
        callout: {
          type: "tip",
          text: "Audio files are cached globally on Cloudflare Edge with Cache-Control headers, eliminating egress bandwidth costs.",
          textVi: "Các file âm thanh phát âm được cache trên Cloudflare Edge toàn cầu với Cache-Control header, triệt tiêu hoàn toàn chi phí băng thông egress."
        }
      }
    ],
    content: {
      problemStatement: "Designing an online language learning platform requires balancing rapid client-side lesson interactivity (audio playback, quiz validations, offline PWA access) with reliable backend services for user auth, learning progress tracking, XP streaks, and media storage without over-engineering.",
      problemStatementVi: "Xây dựng ứng dụng học ngoại ngữ đòi hỏi cân bằng giữa tương tác client tốc độ cao (phát âm thanh, chấm trắc nghiệm, PWA offline) với các backend service ổn định xử lý xác thực, tiến độ học, chuỗi streak và lưu trữ media mà không bị quá tải kiến trúc.",
      architectureDesign: "Puchi derives its 5 Go microservices directly from user domain boundaries: `auth` (opaque sessions & OAuth), `core` (gamification, XP, streaks, user profiles), `learn` (pedagogical curriculum, lessons, quizzes), `media` (Cloudflare R2 audio asset uploads & streaming), and `notification` (email/push dispatches). Services are organized in a clean Go Kratos v3 monorepo sharing protobuf contracts and communicating asynchronously via NATS.",
      architectureDesignVi: "Puchi phân chia 5 Go microservices bám sát nghiệp vụ người dùng: `auth` (opaque session & OAuth), `core` (gamification, XP, streak, hồ sơ), `learn` (giáo trình, bài học, bài tập trắc nghiệm), `media` (tải lên & stream âm thanh qua Cloudflare R2) và `notification` (thông báo/email). Các service nằm trong Go Kratos monorepo dùng chung protobuf và kết nối qua NATS.",
      technicalDecisions: [
        "Go Kratos v3 Framework: standardizes HTTP/gRPC dual-transport, configuration parsing, middleware, and dependency injection across all services.",
        "Decoupled Learning Progress: `learn-service` records lesson completion and immediately emits `learn.lesson.completed` over NATS, delegating XP and streak updates to `core-service`.",
        "Cloudflare R2 Audio Distribution: high-quality Vietnamese pronunciation audio stored in R2 with edge CDN caching, saving server bandwidth.",
        "Protobuf-First Contracts: API schemas defined in `.proto` files automatically generate TypeScript clients for Next.js and Go structs for services."
      ],
      technicalDecisionsVi: [
        "Framework Go Kratos v3: chuẩn hóa hỗ trợ song song HTTP/gRPC, nạp cấu hình, middleware và dependency injection xuyên suốt các service.",
        "Tách biệt tiến độ học: `learn-service` ghi nhận kết quả bài học và bắn ngay sự kiện `learn.lesson.completed` qua NATS để `core-service` tính XP ngầm.",
        "Phân phối âm thanh qua Cloudflare R2: lưu trữ file âm thanh phát âm chuẩn trên Cloudflare R2 với CDN edge cache giúp tiết kiệm băng thông máy chủ.",
        "Chuẩn hóa Protobuf: định nghĩa schema trong `.proto` tự động sinh ra client TypeScript cho Next.js và struct Go cho backend."
      ],
      keyTakeaways: [
        "Product domain boundaries should dictate service boundaries, not arbitrary technical slicing.",
        "Asynchronous NATS messaging keeps the learner's quiz completion response instantaneous.",
        "Kratos v3 monorepo provides microservice modularity without the pain of managing multiple Git repositories."
      ],
      keyTakeawaysVi: [
        "Ranh giới phân chia service phải bám sát luồng trải nghiệm người dùng thay vì chia tách máy móc.",
        "Gửi sự kiện bất đồng bộ qua NATS giúp thao tác nộp bài của học viên luôn được phản hồi tức thì.",
        "Monorepo với Kratos v3 mang lại tính module hóa cao mà không tốn công quản lý nhiều repo riêng lẻ."
      ],
      codeSnippet: {
        language: "go",
        title: "Puchi Learn Service Event Dispatcher",
        code: `func (s *LearnService) SubmitQuizAttempt(ctx context.Context, req *pb.SubmitAttemptRequest) (*pb.SubmitAttemptReply, error) {
    result, err := s.evaluator.Grade(ctx, req.QuizId, req.Answers)
    if err != nil {
        return nil, err
    }

    // Emit async domain event for Core Service (XP/Streak calculation)
    event := &events.LessonCompletedEvent{
        UserID:     req.UserId,
        LessonID:   req.LessonId,
        Score:      result.Score,
        Passed:     result.Passed,
        Timestamp:  time.Now().Unix(),
    }
    _ = s.eventBus.Publish("learn.lesson.completed", event)

    return &pb.SubmitAttemptReply{Passed: result.Passed, Score: result.Score}, nil
}`
      }
    }
  },
  {
    slug: "why-puchi-uses-opaque-sessions-over-jwt",
    title: "Why Puchi Uses Opaque Sessions Instead of JWT Everywhere",
    titleVi: "Vì sao Puchi Sử dụng Opaque Session Thay vì Lạm dụng JWT",
    summary: "Architecting authentication for language learners: opaque bearer tokens, centralized revocation authority, internal session introspection, and caching trade-offs.",
    summaryVi: "Kiến trúc xác thực người dùng trong Puchi: opaque bearer token, khả năng thu hồi phiên tập trung, introspection nội bộ và chiến lược bộ nhớ đệm.",
    date: "Jan 2026",
    readTime: "9 min read",
    tags: ["Puchidemy", "Auth", "Security", "Go", "Architecture"],
    featured: false,
    project: "puchi",
    relatedProject: "puchi-language-platform",
    diagramKey: "why-puchi-uses-opaque-sessions-over-jwt",
    evidenceIds: ["puchi-opaque-session-auth"],
    repositoryUrl: "https://github.com/puchidemy/puchi-backend",
    content: {
      problemStatement: "While stateless JWTs appear simple, they suffer from inability to immediately revoke compromised sessions, payload bloat on high-frequency mobile requests, and token expiration edge cases that disrupt learning flow.",
      problemStatementVi: "Dù JWT stateless có vẻ tiện lợi, chúng lại gặp nhược điểm chí mạng là không thể thu hồi phiên ngay lập tức khi bị lộ, kích thước payload lớn làm nặng request di động và các lỗi hết hạn token làm gián đoạn bài học.",
      architectureDesign: "Puchi's `auth-service` issues high-entropy opaque random strings as bearer session tokens to the Next.js PWA. Downstream services (`learn`, `core`, `media`) validate incoming tokens by introspecting against `auth-service` via gRPC, cached in Valkey for sub-millisecond repeated checks. Instant logout or session revocation deletes the key from Valkey/PostgreSQL immediately.",
      architectureDesignVi: "Phân hệ `auth-service` của Puchi cấp phát chuỗi ngẫu nhiên có độ entropy cao (opaque session token) cho Next.js PWA. Các service phía sau (`learn`, `core`, `media`) kiểm tra tính hợp lệ của token qua lời gọi gRPC introspection tới `auth-service`, được cache trên Valkey dưới 1 mili-giây. Khi người dùng đăng xuất, key sẽ bị xóa ngay lập tức.",
      technicalDecisions: [
        "Opaque Random Bearer Tokens: client never parses or depends on token internals, preventing brittle frontend coupling.",
        "Centralized Session Revocation: user logout or security resets take effect across all microservices instantly.",
        "Valkey Session Cache: introspection latency is reduced to <1ms with a short TTL cache in memory.",
        "OAuth2 Social Login Integration: Google, Facebook, and TikTok OAuth codes are exchanged centrally in `auth-service`."
      ],
      technicalDecisionsVi: [
        "Opaque Bearer Token ngẫu nhiên: frontend không cần parse hay phụ thuộc vào cấu trúc bên trong của token.",
        "Thu hồi phiên tập trung: khi người dùng đổi mật khẩu hoặc đăng xuất, phiên làm việc sẽ bị hủy ngay lập tức trên toàn bộ các service.",
        "Cache phiên với Valkey: giảm độ trễ kiểm tra token xuống dưới 1ms với TTL ngắn trong RAM.",
        "Tích hợp OAuth2 tập trung: luồng đăng nhập Google, Facebook, TikTok được xử lý duy nhất tại `auth-service`."
      ],
      keyTakeaways: [
        "Opaque sessions offer superior security control for consumer applications where instant session revocation is required.",
        "With proper Valkey caching, session introspection introduces negligible overhead compared to cryptographic JWT verification.",
        "Simpler client code with no token refresh race conditions."
      ],
      keyTakeawaysVi: [
        "Opaque session mang lại khả năng kiểm soát bảo mật tuyệt đối cho ứng dụng người dùng khi cần thu hồi phiên tức thì.",
        "Với bộ nhớ đệm Valkey, việc kiểm tra token chỉ mất dưới 1ms, không hề thua kém việc giải mã chữ ký JWT.",
        "Frontend trở nên đơn giản hơn nhiều do không phải xử lý race condition khi refresh token."
      ],
      codeSnippet: {
        language: "go",
        title: "Puchi Auth Token Introspection Middleware",
        code: `func AuthMiddleware(authClient pb.AuthServiceClient) middleware.Middleware {
    return func(handler middleware.Handler) middleware.Handler {
        return func(ctx context.Context, req any) (any, error) {
            token := extractBearerToken(ctx)
            if token == "" {
                return nil, errors.Unauthorized("UNAUTHORIZED", "missing bearer token")
            }

            reply, err := authClient.IntrospectToken(ctx, &pb.IntrospectRequest{Token: token})
            if err != nil || !reply.Active {
                return nil, errors.Unauthorized("INVALID_SESSION", "session expired or revoked")
            }

            ctx = context.WithValue(ctx, UserIDKey, reply.UserId)
            return handler(ctx, req)
        }
    }
}`
      }
    }
  },
  {
    slug: "git-push-to-k3s-puchi-gitops-pipeline",
    title: "Git Push to K3s: Building Puchi's GitOps Deployment Pipeline",
    titleVi: "Từ Git Push đến K3s: Xây dựng Pipeline Triển khai GitOps cho Puchi",
    summary: "Automating zero-touch continuous delivery: GitHub Actions container builds, GHCR registry publishing, and declarative ArgoCD synchronization on a multi-node K3s cluster with zero open firewall ports.",
    summaryVi: "Tự động hóa phân phối ứng dụng: GitHub Actions đóng gói container, xuất bản lên GHCR và ArgoCD tự động đồng bộ lên cụm K3s mà không cần mở port firewall.",
    date: "Jan 2026",
    readTime: "10 min read",
    tags: ["Puchidemy", "GitOps", "ArgoCD", "K3s", "GitHub Actions", "Docker", "DevOps"],
    featured: false,
    project: "puchi",
    relatedProject: "puchi-language-platform",
    diagramKey: "git-push-to-k3s-puchi-gitops-pipeline",
    evidenceIds: ["puchi-gitops-argocd"],
    repositoryUrl: "https://github.com/puchidemy/puchi-infra",
    content: {
      problemStatement: "Manual SSH deployments and imperative deployment scripts are error-prone, lack auditability, risk environment drift, and require opening direct SSH/Kubeconfig access into internal cluster networks.",
      problemStatementVi: "Việc deploy thủ công qua SSH hay chạy script dòng lệnh rất dễ xảy ra sai sót, thiếu khả năng kiểm toán lịch sử, dễ bị lệch cấu hình giữa các môi trường và đòi hỏi phải mở quyền truy cập trực tiếp vào mạng cụm máy chủ.",
      architectureDesign: "Puchi establishes a declarative GitOps workflow: When code is pushed to GitHub, GitHub Actions runs tests, builds multi-stage Docker images, and publishes them to GitHub Container Registry (GHCR). A Git commit updates image tags in `puchi-infra`. ArgoCD running inside the K3s cluster detects repository changes and performs an automated rolling update with zero downtime.",
      architectureDesignVi: "Puchi thiết lập quy trình GitOps khai báo: Khi commit mã nguồn lên GitHub, GitHub Actions chạy test, build Docker image đa tầng và xuất bản lên GHCR. Commit tiếp theo cập nhật tag image trong `puchi-infra`. ArgoCD chạy bên trong cụm K3s phát hiện thay đổi và đồng bộ deployment theo manifest.",
      technicalDecisions: [
        "ArgoCD App of Apps Pattern: single root manifest manages individual microservice deployments, services, ingress, and configmaps.",
        "GitHub Actions Multi-Stage Builds: slim scratch/alpine base images minimize container image size and reduce attack surface.",
        "Zero Inbound Firewall Ports: cluster pulls from Git & GHCR internally; user access is routed securely via Cloudflare Tunnels.",
        "Sealed Secrets Management: sensitive credentials encrypted with Bitnami SealedSecrets committed safely to public/private Git."
      ],
      technicalDecisionsVi: [
        "Mô hình App of Apps trong ArgoCD: một manifest gốc điều phối toàn bộ deployment, service, ingress và configmap của các microservices.",
        "Build Docker đa tầng (Multi-Stage): sử dụng base image alpine/scratch tinh gọn giúp giảm dung lượng image và hạn chế lỗ hổng bảo mật.",
        "Không cần mở port Inbound: cụm K3s chủ động pull dữ liệu từ Git và GHCR; người dùng truy cập an toàn qua Cloudflare Tunnel.",
        "Bảo mật Secret với SealedSecrets: mã hóa mật khẩu an toàn và lưu trữ trực tiếp trên Git mà không sợ lộ thông tin nhạy cảm."
      ],
      keyTakeaways: [
        "Git is the single source of truth for all application deployments and infrastructure state.",
        "Rolling back a bad release is as simple as running `git revert` on GitHub.",
        "ArgoCD continuously monitors cluster state and automatically heals manual configuration drifts."
      ],
      keyTakeawaysVi: [
        "Git là nguồn chân lý duy nhất (Single Source of Truth) cho toàn bộ trạng thái triển khai ứng dụng.",
        "Rollback phiên bản lỗi chỉ đơn giản bằng một lệnh `git revert` trên GitHub.",
        "ArgoCD liên tục giám sát và tự động đồng bộ nếu có ai đó chỉnh sửa cấu hình thủ công trong cụm."
      ],
      codeSnippet: {
        language: "yaml",
        title: "ArgoCD Application Definition for Puchi Backend",
        code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: puchi-backend
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/puchidemy/puchi-infra.git
    targetRevision: main
    path: k8s/apps/backend
  destination:
    server: https://kubernetes.default.svc
    namespace: puchi
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`
      }
    }
  },
  {
    slug: "designing-story-based-language-learning-engine",
    title: "Designing a Story-Based Language Learning Engine",
    titleVi: "Thiết kế Engine Học Ngôn ngữ theo Cốt truyện & Mô hình Hóa Miền Nghiệp vụ",
    summary: "Domain modeling for interactive language learning: City -> Story -> Scene -> Content -> Activity hierarchy, separating static pedagogical curriculum from dynamic learner progress and XP streaks.",
    summaryVi: "Cấu trúc City -> Story -> Scene -> Content -> Activity, phân tách giáo trình sư phạm tĩnh khỏi tiến độ và streak học viên.",
    date: "Jan 2026",
    readTime: "9 min read",
    tags: ["Puchidemy", "Domain-Driven Design", "Next.js", "Go", "PostgreSQL", "Product Engineering"],
    featured: false,
    project: "puchi",
    relatedProject: "puchi-language-platform",
    diagramKey: "designing-story-based-language-learning-engine",
    evidenceIds: ["puchi-learning-domain-engine"],
    repositoryUrl: "https://github.com/puchidemy/puchi-backend",
    content: {
      problemStatement: "Tightly coupling static lesson content (stories, dialogues, vocabulary, audio assets) with mutable learner state (scores, attempts, streaks, XP) causes severe database contention, schema bloat, and makes content authoring slow and fragile.",
      problemStatementVi: "Gộp chung dữ liệu bài học tĩnh (cốt truyện, hội thoại, từ vựng, file âm thanh) với trạng thái động của người học (điểm số, lượt làm bài, streak, XP) gây nghẽn CSDL, phình schema và làm việc biên tập nội dung trở nên chậm chạp.",
      architectureDesign: "Puchi models the learning engine into two strictly decoupled layers: (1) Static Content Hierarchy (City -> Story -> Scene -> Content -> Activity) stored with optimistic caching and CDN distribution, and (2) Dynamic Learner State (UserAttempt -> MasteryRecord -> StreakCounter) updated via asynchronous NATS event streams. Learners can retry activities infinitely without locking curriculum tables.",
      architectureDesignVi: "Puchi mô hình hóa engine học tập thành 2 tầng phân tách triệt để: (1) Cây nội dung tĩnh (City -> Story -> Scene -> Content -> Activity) được cache tối ưu và phân phối qua CDN, và (2) Trạng thái động của học viên (UserAttempt -> MasteryRecord -> StreakCounter) cập nhật qua luồng sự kiện NATS. Học viên có thể làm lại bài tập không giới hạn mà không gây khóa bảng giáo trình.",
      technicalDecisions: [
        "Immutable Content Nodes: learning content is versioned and immutable, allowing aggressive caching in browser IndexedDB and edge CDNs.",
        "Decoupled Learner Attempt Log: user attempts are recorded as append-only events, preserving full learning history for analytics.",
        "Asynchronous Gamification: XP points and streak milestones are computed asynchronously in the background via NATS subscribers.",
        "Polymorphic Activity Schema: flexible activity types (multiple-choice, fill-in-blank, pronunciation listening) validated via strongly-typed JSONB schemas in PostgreSQL."
      ],
      technicalDecisionsVi: [
        "Cấu trúc nội dung bất biến: nội dung bài học có version và bất biến, cho phép cache mạnh mẽ trên IndexedDB trình duyệt và CDN.",
        "Lưu vết lượt làm bài dạng Append-Only: các lần làm bài được lưu nối tiếp, bảo toàn toàn bộ lịch sử học tập để phân tích tiến bộ.",
        "Tính điểm Gamification bất đồng bộ: điểm thưởng XP và chuỗi streak được tính toán ngầm qua NATS consumer mà không làm chậm giao diện.",
        "Schema bài tập đa hình (Polymorphic): hỗ trợ linh hoạt nhiều dạng bài tập (trắc nghiệm, điền từ, nghe phát âm) với validation qua JSONB trong PostgreSQL."
      ],
      keyTakeaways: [
        "Separating content architecture from learner state enables instant offline PWA caching without synchronization conflicts.",
        "Append-only attempt logs unlock rich analytics on learner difficulty curves.",
        "Domain-driven design creates clean boundaries that scale gracefully as curriculum expands."
      ],
      keyTakeawaysVi: [
        "Phân tách nội dung khỏi trạng thái người học giúp ứng dụng PWA chạy offline mượt mà không lo xung đột dữ liệu.",
        "Lưu vết append-only mở ra khả năng phân tích chi tiết độ khó của từng câu hỏi theo thời gian.",
        "Thiết kế hướng miền (DDD) tạo nên cấu trúc mở rộng linh hoạt khi bổ sung thêm các ngôn ngữ mới."
      ],
      codeSnippet: {
        language: "typescript",
        title: "Puchi Content Hierarchy & Attempt Types",
        code: `export interface SceneContent {
  id: string;
  storyId: string;
  order: number;
  dialogues: Array<{
    speaker: string;
    vietnamese: string;
    english: string;
    audioUrl: string;
  }>;
  activities: Array<{
    id: string;
    type: "MULTIPLE_CHOICE" | "FILL_BLANK" | "LISTEN_SELECT";
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
}`
      }
    }
  },

  // ==========================================
  // ENTERPRISE & CAREER ARTICLES
  // ==========================================
  {
    slug: "angular-microfrontend-architecture",
    title: "EPAS Frontend Architecture: From Nx Foundations to Flexible Module Delivery",
    titleVi: "Kiến trúc frontend EPAS: Từ nền tảng Nx đến mô hình delivery linh động",
    summary: "A practical account of how EPAS started with Nx and evolved toward a more flexible Angular micro-frontend structure as lending, disbursement, operations, and reporting modules grew.",
    summaryVi: "Ghi chép thực tế về cách EPAS bắt đầu với Nx rồi chuyển sang cấu trúc Angular Micro-Frontend linh động hơn khi các phân hệ cho vay, giải ngân, vận hành và báo cáo phát triển.",
    date: "Feb 2026",
    readTime: "8 min read",
    tags: ["Angular", "Architecture", "Micro-Frontend", "EPAS", "Enterprise"],
    featured: false,
    project: "epas",
    relatedProject: "epas-enterprise-process-automation",
    evidenceIds: ["epas-enterprise-mfe-k8s"],
    architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                 Angular Shell (Host App)                    │
│   • Auth / Keycloak Session  • Global Navigation  • Routing │
└──────────────┬───────────────────────────────┬──────────────┘
               │ (Webpack / Rspack Module Fed) │
        ┌──────▼──────┐                 ┌──────▼──────┐
        │   CRM MFE   │                 │   BPM MFE   │
        │ (Remote App)│                 │ (Remote App)│
        └──────┬──────┘                 └──────┬──────┘
               │                               │
               └───────────────┬───────────────┘
                               ▼
        ┌─────────────────────────────────────────────┐
        │      @shared/ui-lib  &  @shared/data-access │
        │ • Dynamic Forms • Data Grid • Event Bus API │
        └─────────────────────────────────────────────┘`,
    content: {
      problemStatement: "EPAS had to support different institutions and configurable credit workflows without turning every change in lending, appraisal, disbursement, operations, or reporting into a coordinated rewrite of one frontend. The architecture also needed consistent authentication, navigation, form behavior, transaction state, and shared UI across business modules.",
      problemStatementVi: "EPAS phải hỗ trợ nhiều tổ chức và các workflow tín dụng có thể cấu hình, nhưng không được biến mỗi thay đổi ở cho vay, thẩm định, giải ngân, vận hành hay báo cáo thành một lần sửa chữa đồng bộ trên một frontend duy nhất. Kiến trúc vẫn cần giữ nhất quán về xác thực, điều hướng, hành vi biểu mẫu, state giao dịch và UI dùng chung giữa các phân hệ.",
      architectureDesign: "The first foundation used an Nx monorepo with Module Federation because it gave the team a clear workspace, shared libraries, and a consistent way to coordinate the Shell and Remote applications. As the product and delivery model became more flexible, that structure was redesigned and Nx was removed. The durable part was not the tool: it was the boundary between a host, independently delivered business modules, shared frontend contracts, and backend-owned workflow rules.",
      architectureDesignVi: "Nền tảng ban đầu sử dụng Nx monorepo kết hợp Module Federation vì nó giúp team có workspace rõ ràng, thư viện dùng chung và cách phối hợp nhất quán giữa Shell với các ứng dụng Remote. Khi sản phẩm và mô hình delivery cần linh động hơn, cấu trúc này được thiết kế lại và loại bỏ Nx. Phần bền vững không nằm ở tool, mà ở ranh giới giữa host, các phân hệ nghiệp vụ được delivery độc lập, contract frontend dùng chung và rule workflow do backend làm chủ.",
      technicalDecisions: [
        "Use Nx initially as a coordination and standardization tool, then remove it when its workspace conventions created more coupling than the product needed.",
        "Keep Module Federation and host/remote boundaries focused on independently delivered business modules rather than on a specific monorepo tool.",
        "Treat dynamic forms, task inboxes, transaction state, permissions, and reporting facts as explicit contracts between the frontend and backend.",
        "Keep shared UI and authentication behavior consistent while allowing lending, disbursement, operations, and reporting modules to evolve at their own pace."
      ],
      technicalDecisionsVi: [
        "Ban đầu dùng Nx như công cụ phối hợp và chuẩn hóa, sau đó loại bỏ khi convention của workspace tạo ra nhiều coupling hơn nhu cầu thực tế của sản phẩm.",
        "Giữ ranh giới Module Federation và host/remote xoay quanh các phân hệ được delivery độc lập, không phụ thuộc vào một monorepo tool cụ thể.",
        "Định nghĩa rõ contract giữa frontend và backend cho dynamic forms, task inbox, state giao dịch, phân quyền và các dữ kiện báo cáo.",
        "Giữ UI dùng chung và hành vi xác thực nhất quán, đồng thời cho phép module cho vay, giải ngân, vận hành và báo cáo phát triển theo nhịp riêng."
      ],
      keyTakeaways: [
        "Architecture should preserve the useful boundary and be willing to discard the tool that no longer serves it.",
        "A workflow platform is shaped by business contracts—forms, tasks, approvals, transactions, and reports—not only by frontend composition.",
        "The best micro-frontend structure is the one that matches the product's actual ownership and delivery model."
      ],
      keyTakeawaysVi: [
        "Kiến trúc nên giữ lại ranh giới có giá trị và sẵn sàng loại bỏ tool không còn phục vụ ranh giới đó.",
        "Một nền tảng workflow được định hình bởi contract nghiệp vụ—biểu mẫu, task, phê duyệt, giao dịch và báo cáo—không chỉ bởi frontend composition.",
        "Mô hình micro-frontend tốt nhất là mô hình khớp với cách sản phẩm thực sự được sở hữu và delivery."
      ],
      codeSnippet: {
        language: "typescript",
        title: "remote-manifest.ts (Flexible Module Boundary)",
        code: `export interface RemoteDefinition {
  name: string;
  entry: string;
  exposedRoute: string;
  capabilities: string[];
}

export const businessModules: RemoteDefinition[] = [
  {
    name: "credit-workflows",
    entry: "/remotes/credit/remoteEntry.js",
    exposedRoute: "/credit",
    capabilities: ["forms", "approval", "disbursement"],
  },
  {
    name: "operations-and-reports",
    entry: "/remotes/operations/remoteEntry.js",
    exposedRoute: "/operations",
    capabilities: ["transactions", "audit", "reporting"],
  },
];`
      }
    }
  },
  {
    slug: "from-utc-engineer-to-production-systems",
    title: "Reflections on Graduating as an IT Engineer (Distinction) & Transitioning to Production Systems",
    titleVi: "Nhìn lại Chặng đường Kỹ sư CNTT Loại Giỏi (UTC) & Bước chuyển mình vào Vận hành Hệ thống",
    summary: "Personal and technical reflections on completing an Engineer Degree in IT with Distinction from University of Transport and Communications (UTC), mastering core computer science foundations, and bridging the gap to enterprise architectures.",
    summaryVi: "Những đúc kết cá nhân và kỹ thuật sau khi tốt nghiệp Kỹ sư CNTT loại Giỏi tại ĐH Giao thông Vận tải (UTC), xây dựng nền tảng cốt lõi và chuyển tiếp vào phát triển hệ thống doanh nghiệp.",
    date: "Aug 2024",
    readTime: "6 min read",
    tags: ["Career", "Education", "Engineering", "UTC", "Personal"],
    featured: false,
    project: "personal",
    highlights: [
      {
        value: "Distinction",
        label: "Engineer Degree",
        labelVi: "Bằng Kỹ sư Loại Giỏi",
        detail: "UTC (10/2020 – 08/2024)",
        detailVi: "ĐH GTVT (10/2020 – 08/2024)"
      },
      {
        value: "4 Years",
        label: "CS Fundamentals",
        labelVi: "Nền tảng CS Vững chắc",
        detail: "OS, DB isolation, Networks",
        detailVi: "Hệ điều hành, CSDL, Mạng"
      },
      {
        value: "Homelab",
        label: "Hands-on Practice",
        labelVi: "Thực hành Homelab",
        detail: "Linux, Docker, K8s, Go",
        detailVi: "Tự dựng server, K8s & Go"
      },
      {
        value: "Enterprise",
        label: "Production Ready",
        labelVi: "Sẵn sàng Thực chiến",
        detail: "Angular MFE & Spring Boot",
        detailVi: "Microservices & MFE lớn"
      }
    ],
    comparison: {
      naiveTitle: "Academic-Only Theory without Practical Depth",
      naiveTitleVi: "Học Lý thuyết Thuần túy Thiếu Thực hành",
      naivePoints: [
        "Memorizing algorithms without understanding real-world concurrency or latency bottlenecks.",
        "Relying solely on classroom assignments without building production-like homelab systems.",
        "Struggling when transitioning to enterprise microservices, CI/CD pipelines, and cloud infra."
      ],
      naivePointsVi: [
        "Học thuộc thuật toán mà không hiểu về xử lý đa luồng thực tế hay điểm nghẽn độ trễ.",
        "Chỉ làm bài tập trên lớp mà không tự tay dựng server và kiến trúc hệ thống riêng.",
        "Bỡ ngỡ khi bước vào môi trường doanh nghiệp với microservices, CI/CD và Kubernetes."
      ],
      solutionTitle: "Theory-to-Production Hybrid Engineering Rigor",
      solutionTitleVi: "Phương pháp Thực chiến Kết hợp Nền tảng Lý thuyết",
      solutionPoints: [
        "Master deep CS foundations (networking, database ACID/isolation, OS internals) alongside coursework.",
        "Self-host production-grade infrastructure (K3s, NATS, PostgreSQL HA) to simulate enterprise workloads.",
        "Write clean, defensive code and modular architectures that directly translate to production value."
      ],
      solutionPointsVi: [
        "Nắm chắc gốc rễ khoa học máy tính (giao thức mạng, cấp độ cô lập CSDL, luồng hệ điều hành).",
        "Tự xây dựng hạ tầng thực tế (cụm K3s, NATS, PostgreSQL HA) để mô phỏng tải doanh nghiệp.",
        "Viết code chỉn chu, typing chặt chẽ và thiết kế module hóa áp dụng ngay vào dự án thực chiến."
      ]
    },
    sections: [
      {
        id: "utc-journey",
        title: "The 4-Year Academic Foundation at UTC",
        titleVi: "Hành trình 4 Năm Xây dựng Nền tảng Kỹ sư tại UTC",
        content: "Entering the University of Transport and Communications (UTC) in October 2020, the focus from day one was cultivating true engineering rigor. Rather than chasing ephemeral framework trends, substantial time was invested in mastering fundamental computer science: operating systems, networking protocols, compiler design, and database transaction theory.\n\nThis continuous discipline culminated in graduating with the Degree of Engineer in Information Technology with Distinction in August 2024.",
        contentVi: "Bắt đầu chặng đường tại Trường Đại học Giao thông Vận tải (UTC) vào tháng 10/2020, mục tiêu cốt lõi luôn là rèn luyện tư duy kỹ sư thực thụ. Thay vì chỉ chạy theo các framework ngắn hạn, phần lớn thời gian được dành để đào sâu các nguyên lý cốt lõi: hệ điều hành, giao thức mạng, kiến trúc phần mềm và lý thuyết giao dịch trong CSDL.\n\nSự kiên trì liên tục này đã được đền đáp với tấm Bằng Kỹ sư Công nghệ Thông tin loại Giỏi vào tháng 08/2024.",
        callout: {
          type: "tip",
          text: "Strong computer science foundations make learning any modern framework (Angular, React, Spring Boot, Go) a matter of days rather than months.",
          textVi: "Nền tảng khoa học máy tính vững chắc giúp việc làm chủ bất kỳ công nghệ mới nào (Angular, React, Spring Boot, Go) trở nên rất nhanh chóng và tự tin."
        }
      }
    ],
    embeds: [
      {
        type: "facebook-post",
        src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fweb.facebook.com%2Fhoanit02%2Fposts%2Fpfbid02RBrpFKVBtGw2AYC5chgNjGfQkeoFhDJdNkwgk7oe5SDBt6rrm5uTBLUN2dhgRWoZl&show_text=true&width=500",
        title: "UTC Engineer Degree Graduation with Distinction",
        titleVi: "Lễ Tốt nghiệp Bằng Kỹ sư CNTT Loại Giỏi tại UTC",
        caption: "Ceremony & Engineer Degree Diploma at University of Transport and Communications (UTC)",
        captionVi: "Hình ảnh Lễ trao bằng Kỹ sư Công nghệ Thông tin tại Trường ĐH Giao thông Vận tải",
        width: 500,
        height: 250,
      },
      {
        type: "facebook-video",
        src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fweb.facebook.com%2Freel%2F1131656488139965%2F&show_text=false&width=267&t=0",
        title: "Graduation Moments & Engineer Journey",
        titleVi: "Khoảnh khắc Tốt nghiệp & Chặng đường Kỹ sư",
        caption: "Graduation reel capturing the engineer milestones (10/2020 – 08/2024)",
        captionVi: "Video khoảnh khắc tốt nghiệp và chặng đường 4 năm học tập tại UTC",
        width: 267,
        height: 476,
      },
      {
        type: "facebook-post",
        src: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fweb.facebook.com%2Fhoanit02%2Fposts%2Fpfbid088R858r8T4f5bXy7m1CEnf5AiaFir2B4Kd8nCh7w1sw3NNMibH7zuY42NfWPbQSxl&show_text=true&width=500",
        title: "Engineering Reflections & Future Direction",
        titleVi: "Chia sẻ Chặng đường Phát triển Kỹ thuật",
        caption: "Personal milestone post reflecting on academic discipline and engineering growth",
        captionVi: "Bài viết đúc kết về kỷ luật học tập và hành trình theo đuổi lập trình hệ thống",
        width: 500,
        height: 250,
      },
      {
        type: "youtube",
        src: "https://www.youtube-nocookie.com/embed/ASVxal2cwXo",
        url: "https://www.youtube.com/watch?v=ASVxal2cwXo",
        title: "Engineering Journey & Student Life Documentary",
        titleVi: "Phim Tư liệu Chặng đường Kỹ sư & Đời sống Sinh viên UTC",
        caption: "Documentary capturing university engineering milestones and memories",
        captionVi: "Video tài liệu ghi lại dấu ấn học tập và trải nghiệm thực chiến",
      }
    ],
    content: {
      problemStatement: "The transition from university theoretical computer science concepts (algorithms, databases, OS internals) to fast-paced production delivery often catches new graduates off-guard with real-world complexities like microservices, CI/CD, and distributed observability.",
      problemStatementVi: "Bước chuyển từ lý thuyết đại học (thuật toán, cấu trúc dữ liệu, hệ điều hành) sang môi trường thực chiến thường gặp rào cản lớn về tính phức tạp của microservices, CI/CD và khả năng chịu tải thực tế.",
      architectureDesign: "During 4 years at UTC (10/2020 – 08/2024), maintaining disciplined focus on software architecture fundamentals and actively building production-like homelab projects laid the solid ground to graduate with Distinction and quickly assume full-stack enterprise responsibilities.",
      architectureDesignVi: "Trong suốt 4 năm tại UTC (10/2020 – 08/2024), việc kiên trì rèn luyện tư duy kiến trúc và tự thực hành các dự án homelab thực tế đã tạo nền móng vững chắc để tốt nghiệp Bằng Kỹ sư loại Giỏi và nhanh chóng tham gia phát triển các hệ thống lớn.",
      technicalDecisions: [
        "Focus on fundamental computer science principles: network protocols (TCP/HTTP), database transaction isolation levels, and concurrency patterns.",
        "Bridge theory to practice by maintaining hands-on self-hosted servers, Docker containers, and full-stack side projects alongside coursework.",
        "Emphasize code readability, defensive typing in TypeScript, and modular design over short-term hacks."
      ],
      technicalDecisionsVi: [
        "Tập trung sâu vào nền tảng khoa học máy tính: giao thức mạng, cấp độ cô lập transaction trong CSDL và xử lý đa luồng.",
        "Chủ động thu hẹp khoảng cách lý thuyết - thực tế bằng việc tự dựng server, container Docker và các side project hoàn chỉnh song song việc học.",
        "Đề cao tính dễ đọc của mã nguồn, typing chặt chẽ với TypeScript và thiết kế module hóa thay vì các giải pháp chắp vá ngắn hạn."
      ],
      keyTakeaways: [
        "Strong computer science fundamentals significantly accelerate learning new frameworks (Angular, Next.js, Spring Boot, K8s).",
        "Graduating with Distinction from UTC reinforced personal discipline and thorough problem-solving rigor.",
        "The real world rewards pragmatic execution, reliable architectures, and continuous curiosity."
      ],
      keyTakeawaysVi: [
        "Nền tảng CS vững vàng giúp tiếp cận cực nhanh các công nghệ và framework mới.",
        "Cột mốc tốt nghiệp loại Giỏi tại UTC là minh chứng cho sự kiên trì và kỷ luật học tập nghiêm túc.",
        "Thực tế luôn ưu tiên tính thực dụng, kiến trúc tin cậy và tinh thần không ngừng học hỏi."
      ]
    }
  },
  ...ADDITIONAL_ARTICLES
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: "exp-ngv-group",
    period: "12/2024 — Present",
    periodVi: "12/2024 — Hiện tại",
    role: "Fullstack Developer",
    roleVi: "Kỹ sư Fullstack Developer",
    company: "NGV Group",
    companyVi: "NGV Group",
    companyDescription: "Enterprise Digital Transformation & Process Automation Solutions Provider",
    companyDescriptionVi: "Tập đoàn giải pháp công nghệ chuyển đổi số và tự động hóa quy trình doanh nghiệp",
    location: "Hanoi, Vietnam",
    locationVi: "Hà Nội, Việt Nam",
    type: "Full-time",
    typeVi: "Chính thức",
    summary: "Driving enterprise process automation systems (EPAS), real-time Zalo OA communication modules, and managing on-premises Kubernetes/CI-CD infrastructure.",
    summaryVi: "Phát triển hệ thống tự động hóa quy trình nghiệp vụ (EPAS), phân hệ truyền thông Zalo OA thời gian thực và vận hành hạ tầng CI/CD Kubernetes nội bộ.",
    projects: [
      {
        name: "EPAS — Enterprise Process Automation System",
        nameVi: "Hệ thống Tự động hóa Quy trình Doanh nghiệp (EPAS)",
        role: "Frontend & Micro-Frontend Engineer",
        roleVi: "Kỹ sư Frontend & Micro-Frontend",
        period: "12/2024 — Present",
        periodVi: "12/2024 — Hiện tại",
        description: "Enterprise workflow automation platform used across credit institutions, covering lending, appraisal, approval, disbursement, post-disbursement operations, transaction handling, and operational or compliance reporting.",
        descriptionVi: "Nền tảng tự động hóa quy trình enterprise được sử dụng tại nhiều tổ chức tín dụng, bao phủ cho vay, thẩm định, phê duyệt, giải ngân, nghiệp vụ sau giải ngân, xử lý giao dịch và báo cáo vận hành/tuân thủ.",
        highlights: [
          "Started the Angular Micro-Frontend foundation with Nx, then redesigned the structure and removed Nx when more flexible module delivery became the better fit.",
          "Mapped lending, approval, disbursement, and reporting workflows into dynamic forms, task inboxes, transaction screens, and shared UI contracts.",
          "Built shared enterprise component libraries (@workspace/ui, dynamic reactive forms, high-performance data tables with virtual scroll).",
          "Integrated frontend flows with Java Spring Boot microservices, Oracle/PostgreSQL schemas, and Redis cache."
        ],
        highlightsVi: [
          "Bắt đầu với nền tảng Angular Micro-Frontend dùng Nx, sau đó thiết kế lại và loại bỏ Nx khi mô hình delivery module linh động hơn phù hợp với sản phẩm.",
          "Chuyển hóa workflow cho vay, phê duyệt, giải ngân và báo cáo thành dynamic forms, task inbox, màn hình giao dịch và contract UI dùng chung.",
          "Xây dựng thư viện component doanh nghiệp dùng chung (biểu mẫu phản ứng động, bảng dữ liệu hiệu năng cao với virtual scroll).",
          "Tích hợp luồng frontend với microservices Java Spring Boot, cơ sở dữ liệu Oracle/PostgreSQL và bộ nhớ đệm Redis."
        ],
        techStack: ["Angular", "Micro-Frontend", "RxJS", "Java Spring Boot", "Oracle", "PostgreSQL", "Redis", "Kafka"]
      },
      {
        name: "Enterprise Micro-Frontend & Dynamic Form Engine",
        nameVi: "Phân hệ Micro-Frontend & Nền tảng Biểu mẫu Động (Dynamic Form)",
        role: "Frontend Core Engineer",
        roleVi: "Kỹ sư Frontend Core",
        period: "12/2024 — Present",
        periodVi: "12/2024 — Hiện tại",
        description: "Standardized reusable UI foundation, dynamic reactive form engine, complex validation pipelines, and cross-micro-frontend state synchronization for credit and operational workflows.",
        descriptionVi: "Chuẩn hóa nền tảng UI dùng chung, engine biểu mẫu phản ứng động (dynamic form), pipeline kiểm tra dữ liệu phức tạp và cơ chế đồng bộ state giữa các remote app.",
        highlights: [
          "Developed schema-driven dynamic form generators rendering complex multi-step transaction approval workflows.",
          "Implemented high-performance virtualized data tables supporting sorting, multi-column filters, and large dataset streaming.",
          "Integrated state bridges and shared authentication contexts across micro-frontend boundaries with explicit lifecycle ownership."
        ],
        highlightsVi: [
          "Phát triển bộ sinh biểu mẫu động theo schema cấu hình cho các quy trình phê duyệt giao dịch đa bước phức tạp.",
          "Hiện thực hóa bảng dữ liệu ảo hóa (virtual scroll) hiệu năng cao hỗ trợ sắp xếp, lọc đa cột và stream dữ liệu lớn.",
          "Xây dựng cầu nối state và ngữ cảnh xác thực dùng chung xuyên suốt các remote micro-frontend mà không gây rò rỉ bộ nhớ."
        ],
        techStack: ["Angular", "TypeScript", "RxJS", "Micro-Frontend", "Dynamic Forms", "Tailwind CSS"]
      },
      {
        name: "On-Premises Kubernetes & CI/CD Pipelines",
        nameVi: "Hạ tầng Kubernetes On-Premises & CI/CD Tự động hóa",
        role: "DevOps & Infrastructure Engineer",
        roleVi: "Kỹ sư DevOps & Hạ tầng",
        period: "12/2024 — Present",
        periodVi: "12/2024 — Hiện tại",
        description: "Constructed automated delivery pipelines and maintained on-premises container clusters for multi-environment testing and production workloads.",
        descriptionVi: "Xây dựng pipeline phân phối phần mềm tự động và duy trì cụm container nội bộ cho các môi trường kiểm thử và production.",
        highlights: [
          "Built declarative Jenkins CI/CD pipelines automating Docker multi-stage builds, version tagging, and registry pushes.",
          "Managed on-premises Kubernetes cluster deployments, Traefik ingress routing, container health checks, and rolling updates."
        ],
        highlightsVi: [
          "Xây dựng pipeline Jenkins declarative tự động hóa build Docker đa tầng, gắn tag phiên bản và đẩy lên registry nội bộ.",
          "Vận hành triển khai trên cụm Kubernetes on-premises, cấu hình Traefik ingress, kiểm tra sức khỏe container và rolling update."
        ],
        techStack: ["Kubernetes", "Docker", "Jenkins", "Traefik", "Linux", "Shell"]
      }
    ],
    contributions: [
      "Designed and maintained Angular micro-frontend architecture, shared libraries, routing, integration patterns, and reusable UI foundations across enterprise modules.",
      "Built reusable Angular UI capabilities for dynamic forms, data tables, pagination, attachments, and activity history.",
      "Implemented CRM/BPM workflows covering transaction inboxes, task management, customer flows, and business-process interactions.",
      "Integrated frontend modules with Java Spring Boot microservices and Oracle/PostgreSQL data flows for enterprise operations.",
      "Implemented CI/CD pipelines with Jenkins, Docker, and Kubernetes for builds, image publishing, configuration, and multi-environment deployments.",
      "Supported on-premises infrastructure with Kubernetes clusters, ingress, registries, monitoring, and production troubleshooting."
    ],
    contributionsVi: [
      "Thiết kế và duy trì kiến trúc Angular Micro-Frontend, thư viện dùng chung, chuẩn định tuyến và nền tảng UI tái sử dụng xuyên suốt các phân hệ doanh nghiệp.",
      "Xây dựng các component UI Angular dùng chung cho biểu mẫu động (dynamic forms), bảng dữ liệu, phân trang, tệp đính kèm và lịch sử hoạt động.",
      "Phát triển các luồng quy trình CRM/BPM bao gồm hộp thư giao dịch, quản lý tác vụ, luồng khách hàng và tương tác quy trình doanh nghiệp.",
      "Tích hợp các module frontend với microservices Java Spring Boot và luồng dữ liệu Oracle/PostgreSQL cho hoạt động vận hành.",
      "Xây dựng pipeline CI/CD với Jenkins, Docker và Kubernetes để tự động hóa build, xuất bản image, cấu hình và triển khai đa môi trường.",
      "Vận hành hạ tầng on-premises với cụm Kubernetes, ingress, registry, giám sát và xử lý sự cố môi trường production."
    ],
    techStack: ["Angular", "Micro-Frontend", "Java Spring Boot", "Oracle", "PostgreSQL", "Redis", "Kafka", "Keycloak", "Minio", "Kubernetes", "Docker", "Jenkins"]
  },
  {
    id: "exp-mochimochi",
    period: "03/2024 — 08/2024",
    periodVi: "03/2024 — 08/2024",
    role: "Frontend Developer",
    roleVi: "Kỹ sư Frontend Developer",
    company: "MochiMochi",
    companyVi: "MochiMochi",
    companyDescription: "EdTech Platform Specializing in Spaced-Repetition Japanese & Chinese Learning",
    companyDescriptionVi: "Nền tảng công nghệ giáo dục chuyên sâu về học tiếng Nhật & tiếng Trung theo phương pháp lặp lại ngắt quãng",
    location: "Hanoi, Vietnam",
    locationVi: "Hà Nội, Việt Nam",
    type: "Full-time",
    typeVi: "Chính thức",
    summary: "Developed learner-facing web applications, improved Core Web Vitals performance, strengthened SEO rankings, and modularized reusable UI component libraries.",
    summaryVi: "Phát triển ứng dụng web học ngoại ngữ cho học viên, tối ưu chỉ số Core Web Vitals, nâng cao thứ hạng SEO và module hóa thư viện component tái sử dụng.",
    projects: [
      {
        name: "Learner-Facing Web Applications (Japanese & Chinese)",
        nameVi: "Ứng dụng Web Học Ngoại ngữ Trực tuyến (Tiếng Nhật & Tiếng Trung)",
        role: "Frontend Developer",
        roleVi: "Kỹ sư Frontend",
        period: "03/2024 — 08/2024",
        periodVi: "03/2024 — 08/2024",
        description: "Learner-facing portal delivering interactive lessons, spaced-repetition flashcards, and pronunciation practice across mobile and desktop browsers.",
        descriptionVi: "Cổng học tập trực tuyến cung cấp bài học tương tác, flashcard ôn tập ngắt quãng và luyện phát âm trên cả trình duyệt di động lẫn máy tính.",
        highlights: [
          "Engineered responsive UI using Next.js App & Pages router, React, and TypeScript with smooth micro-interactions.",
          "Refactored legacy UI components into clean, strictly-typed reusable component packages.",
          "Optimized asset delivery, reducing JavaScript bundle size and boosting client-side responsiveness."
        ],
        highlightsVi: [
          "Xây dựng giao diện responsive với Next.js (App & Pages router), React và TypeScript với hiệu ứng tương tác mượt mà.",
          "Tái cấu trúc các component cũ thành các gói module TypeScript dùng chung có kiểu dữ liệu chặt chẽ.",
          "Tối ưu hóa tài nguyên tải về, giảm kích thước bundle JavaScript và tăng tốc độ phản hồi trên trình duyệt."
        ],
        techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive UI"]
      },
      {
        name: "Core Web Vitals & SEO Architecture Optimization",
        nameVi: "Tối ưu hóa Chỉ số Core Web Vitals & Kiến trúc SEO",
        role: "Frontend & Performance Engineer",
        roleVi: "Kỹ sư Frontend & Tối ưu Hiệu năng",
        period: "04/2024 — 08/2024",
        periodVi: "04/2024 — 08/2024",
        description: "Audited and restructured web rendering pipelines to maximize organic search engine visibility and pass all Core Web Vitals thresholds.",
        descriptionVi: "Khảo sát và tái cấu trúc pipeline rendering của trang web nhằm tối đa hóa khả năng tìm kiếm tự nhiên và đạt chuẩn các chỉ số Core Web Vitals.",
        highlights: [
          "Improved Core Web Vitals through Server-Side Rendering (SSR), asset delivery, and next/font optimisation.",
          "Implemented structured JSON-LD schema, dynamic OpenGraph metadata, and canonical URL handling across thousands of course pages."
        ],
        highlightsVi: [
          "Cải thiện Core Web Vitals thông qua SSR, phân phối tài nguyên và tối ưu font chữ next/font.",
          "Triển khai cấu trúc dữ liệu JSON-LD schema, metadata OpenGraph động và canonical URL cho hàng nghìn trang khóa học."
        ],
        techStack: ["Next.js", "SSR / SSG", "SEO Optimization", "Web Vitals", "TypeScript"]
      }
    ],
    contributions: [
      "Developed and maintained learner-facing web applications for Japanese and Chinese language learning using Next.js.",
      "Improved Core Web Vitals and SEO through rendering and asset optimization, page structure, and metadata improvements.",
      "Refactored legacy code, upgraded framework and dependencies, and standardized reusable components to improve maintainability and development velocity."
    ],
    contributionsVi: [
      "Phát triển và duy trì ứng dụng web học tiếng Nhật và tiếng Trung hướng học viên sử dụng Next.js.",
      "Cải thiện hiệu năng và chuẩn SEO thông qua tối ưu cơ chế rendering, tối ưu tài nguyên tĩnh, cấu trúc trang và thẻ metadata.",
      "Tái cấu trúc mã nguồn cũ, nâng cấp phiên bản framework và thư viện, chuẩn hóa các component dùng chung nhằm tăng tốc độ phát triển."
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SEO", "Responsive UI"]
  }
];

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Frontend Engineering",
    titleVi: "Kỹ thuật Frontend",
    tagline: "Component architecture, micro-frontends, and performance optimization",
    taglineVi: "Kiến trúc component, Micro-Frontend và tối ưu hóa hiệu năng",
    items: [
      {
        name: "Angular",
        highlight: true,
        capabilities: ["Micro-frontends", "Flexible Module Delivery", "RxJS", "Dynamic Forms", "Shared UI Libs"],
        capabilitiesVi: ["Micro-frontends", "Module Delivery linh động", "RxJS", "Biểu mẫu động", "Thư viện UI dùng chung"]
      },
      {
        name: "Next.js",
        highlight: true,
        capabilities: ["App Router", "SSR / SSG", "SEO Optimization", "Asset Delivery", "Tailwind CSS"],
        capabilitiesVi: ["App Router", "SSR / SSG", "Chuẩn hóa SEO", "Tối ưu tài nguyên", "Tailwind CSS"]
      },
      {
        name: "TypeScript / JavaScript",
        highlight: true,
        capabilities: ["Strict Typing", "Generic Systems", "Async Streams", "ES6+ Architecture"],
        capabilitiesVi: ["Kiểu tĩnh chặt chẽ", "Generics phức tạp", "Luồng bất đồng bộ", "Chuẩn ES6+"]
      },
      {
        name: "React",
        highlight: false,
        capabilities: ["Custom Hooks", "State Management", "Modular Components", "Framer Motion"],
        capabilitiesVi: ["Custom Hooks", "Quản lý state", "Module hóa Component", "Framer Motion"]
      }
    ]
  },
  {
    title: "Backend & Microservices",
    titleVi: "Backend & Dịch vụ Microservices",
    tagline: "High-throughput APIs, distributed messaging, and enterprise security",
    taglineVi: "API ổn định, kết nối luồng sự kiện và tích hợp doanh nghiệp",
    items: [
      {
        name: "Java / Spring Boot",
        highlight: true,
        capabilities: ["Microservices", "RESTful APIs", "Spring Security", "JPA / Hibernate", "BPM Integrations"],
        capabilitiesVi: ["Microservices", "RESTful API", "Spring Security", "JPA / Hibernate", "Tích hợp BPM"]
      },
      {
        name: "Go (Golang)",
        highlight: false,
        capabilities: ["Concurrent Routines", "High-throughput Endpoints", "CLI Tooling"],
        capabilitiesVi: ["Xử lý đồng thời Goroutine", "Endpoint hiệu năng cao", "CLI Tools"]
      },
      {
        name: "Apache Kafka",
        highlight: false,
        capabilities: ["Event Streaming", "Topic Partitions", "Consumer Groups", "Async Workflows"],
        capabilitiesVi: ["Luồng sự kiện phân tán", "Phân vùng Topic", "Consumer Groups", "Luồng bất đồng bộ"]
      },
      {
        name: "Keycloak & MinIO",
        highlight: false,
        capabilities: ["OIDC / OAuth2", "Role-Based Access (RBAC)", "Object Storage Buckets"],
        capabilitiesVi: ["Xác thực OIDC / OAuth2", "Phân quyền RBAC", "Lưu trữ Object Storage"]
      }
    ]
  },
  {
    title: "Databases & Storage",
    titleVi: "Cơ sở Dữ liệu & Lưu trữ",
    tagline: "Relational integrity, SQL query tuning, and distributed caching",
    taglineVi: "Toàn vẹn dữ liệu quan hệ, tinh chỉnh truy vấn SQL và bộ nhớ đệm",
    items: [
      {
        name: "Oracle Database",
        highlight: true,
        capabilities: ["Enterprise Schemas", "SQL Tuning", "Stored Procedures", "Execution Plans"],
        capabilitiesVi: ["Lược đồ doanh nghiệp", "Tối ưu hóa SQL", "Stored Procedures", "Execution Plans"]
      },
      {
        name: "PostgreSQL",
        highlight: true,
        capabilities: ["Relational Modeling", "Composite Indexing", "Connection Pools", "JSONB Queries"],
        capabilitiesVi: ["Thiết kế quan hệ", "Đánh Index phức hợp", "Connection Pools", "Truy vấn JSONB"]
      },
      {
        name: "Redis",
        highlight: false,
        capabilities: ["In-Memory Caching", "Session Store", "Distributed Locking", "Pub/Sub"],
        capabilitiesVi: ["Bộ nhớ đệm In-Memory", "Lưu trữ Session", "Khóa phân tán", "Pub/Sub"]
      }
    ]
  },
  {
    title: "DevOps & Cloud-Native",
    titleVi: "DevOps & Hạ tầng Cloud-Native",
    tagline: "Automated pipelines, multi-node K3s homelab, and container orchestration",
    taglineVi: "Quy trình CI/CD tự động, cụm Homelab K3s đa node và điều phối container",
    items: [
      {
        name: "Kubernetes & K3s",
        highlight: true,
        capabilities: ["Multi-Node Clusters", "Longhorn Storage", "Traefik Ingress", "Rolling Updates", "Troubleshooting"],
        capabilitiesVi: ["Cụm đa node", "Lưu trữ phân tán Longhorn", "Traefik Ingress", "Rolling Updates", "Xử lý sự cố"]
      },
      {
        name: "Docker",
        highlight: true,
        capabilities: ["Multi-stage Builds", "Layer Cache Optimization", "Private Registries"],
        capabilitiesVi: ["Build đa tầng tối ưu", "Tối ưu hóa Layer Cache", "Registry nội bộ"]
      },
      {
        name: "Jenkins CI/CD",
        highlight: true,
        capabilities: ["Declarative Pipelines", "Automated Image Rollouts", "Multi-env Config"],
        capabilitiesVi: ["Pipeline Declarative", "Tự động phát hành Image", "Cấu hình đa môi trường"]
      },
      {
        name: "Linux & Homelab",
        highlight: false,
        capabilities: ["Ubuntu Server", "Networking & CoreDNS", "Cloudflare Tunnels", "Shell Automation"],
        capabilitiesVi: ["Quản trị Ubuntu Server", "Cấu hình mạng & DNS", "Cloudflare Tunnels", "Script Shell"]
      }
    ]
  }
];

export const BENTO_STATS: BentoStat[] = [
  {
    label: "Full-Stack Breadth",
    labelVi: "Năng lực Toàn diện",
    value: "Full-stack",
    description: "Frontend → Backend → Infrastructure",
    descriptionVi: "Frontend → Backend → Infrastructure"
  },
  {
    label: "Systems in Production",
    labelVi: "Hệ thống Thực tế",
    value: "Production",
    description: "Enterprise Automation & EdTech Platforms",
    descriptionVi: "Tự động hóa Doanh nghiệp & EdTech"
  },
  {
    label: "Education Qualification",
    labelVi: "Trình độ Học vấn",
    value: "UTC Eng.",
    description: "Engineer in IT • Graduated with Distinction",
    descriptionVi: "Kỹ sư CNTT • ĐH GTVT (Tốt nghiệp Giỏi)"
  },
  {
    label: "Delivery & Engineering",
    labelVi: "Vận hành Kỹ thuật",
    value: "CI/CD & MFE",
    description: "Flexible MFE Delivery, Declarative Pipelines & K8s",
    descriptionVi: "MFE Delivery linh động, Pipeline tự động & K8s"
  }
];
