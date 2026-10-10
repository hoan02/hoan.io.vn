import { Project, ExperienceItem, TechCategory, BentoStat, Article } from "@/types";
import { ADDITIONAL_ARTICLES } from "./additionalArticles";
import { REWRITTEN_ARTICLES, NEW_ARTICLES } from "./articlesRewritten";

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
  bio: "Full-stack Engineer dedicated to crafting modern web applications, high-performance microservices, and reliable distributed systems. Focused on solving practical challenges through clean architecture, maintainable code, and seamless user experiences.",
  bioVi: "Kỹ sư Full-stack đam mê kiến tạo các hệ thống web hiện đại, vi dịch vụ hiệu năng cao và hạ tầng phân tán ổn định. Tập trung giải quyết các bài toán thực tế bằng kiến trúc rõ ràng, mã nguồn tối ưu và trải nghiệm người dùng mượt mà.",
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
    image: "/images/projects/epas-preview.jpg",
    accentColor: "#10b981",
  },
  {
    id: "devops-k8s-infrastructure",
    title: "ThinkCentre Proxmox Homelab & Three-VM K3s Platform",
    titleVi: "Homelab ThinkCentre Proxmox & Platform K3s trên 3 máy ảo",
    subtitle: "A compact self-hosted lab for Kubernetes, CI/CD, storage, ingress, and recovery practice",
    subtitleVi: "Môi trường tự vận hành nhỏ gọn để thực hành Kubernetes, CI/CD, storage, ingress và recovery",
    description: "A ThinkCentre host running Proxmox with three Ubuntu 26 virtual machines forming a K3s platform for self-hosted workloads, Jenkins delivery, Longhorn storage, registry, ingress routing, and operational experiments.",
    descriptionVi: "Một máy ThinkCentre chạy Proxmox với 3 máy ảo Ubuntu 26 tạo thành platform K3s cho workload tự vận hành, delivery qua Jenkins, storage Longhorn, registry, ingress và các thử nghiệm vận hành.",
    problem: "A single physical host is a constrained but useful platform for learning the entire path from hardware and virtualization to guest operating systems, cluster scheduling, persistent storage, ingress, and application delivery.",
    problemVi: "Một máy vật lý duy nhất có giới hạn, nhưng rất hữu ích để thực hành toàn bộ đường đi từ phần cứng, ảo hóa, guest operating system đến scheduling của cluster, persistent storage, ingress và delivery ứng dụng.",
    architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│ ThinkCentre · Intel Xeon E-2286M · 8C/16T · 32GB RAM       │
│                         Proxmox VE                         │
└──────────────┬────────────────┬────────────────────────────┘
               │                │
      ┌────────▼───────┐ ┌──────▼────────┐ ┌────────▼────────┐
      │ Ubuntu 26 VM 1 │ │ Ubuntu 26 VM 2│ │ Ubuntu 26 VM 3  │
      │ K3s node       │ │ K3s node      │ │ K3s node        │
      └────────┬───────┘ └──────┬────────┘ └────────┬────────┘
               └────────────────┴───────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│ K3s · Traefik · Longhorn · Registry · Self-hosted Workloads │
└──────────────────────────────┬──────────────────────────────┘
                               ▲
                               │ (Automated CI/CD Delivery)
Git Push ──► Jenkins Pipeline ──► Docker Image ──► K3s Rollout

Internet / Cloudflare Tunnel
            │
            ▼
            ▼
      Traefik / Ingress`,
    contributionsDetailed: [
      "Built multi-stage Docker build files with layer caching, reducing image footprint and build times significantly.",
      "Configured Jenkins declarative pipelines for automated linting, test execution, image packaging, version tagging, and automated Kubernetes manifests deployment.",
      "Built the current lab topology on one ThinkCentre host running Proxmox with three Ubuntu 26 VMs for the K3s nodes.",
      "Deployed Longhorn distributed block storage across the virtualized K3s nodes for persistent workloads and snapshots.",
      "Configured Traefik Ingress with TLS certificate automation, namespace isolation, ConfigMaps/Secrets, and health check probes (liveness/readiness).",
      "Handled cluster maintenance, CoreDNS troubleshooting, node draining, and rolling application releases."
    ],
    contributionsDetailedVi: [
      "Thiết kế Dockerfile đa tầng (multi-stage) tối ưu bộ nhớ đệm layer, giảm dung lượng image và rút ngắn thời gian đóng gói.",
      "Xây dựng pipeline Jenkins declarative tự động kiểm tra cú pháp, chạy test, đóng gói image, gắn tag phiên bản và cập nhật manifest Kubernetes.",
      "Xây dựng topology homelab hiện tại trên một máy ThinkCentre chạy Proxmox với 3 VM Ubuntu 26 làm các node K3s.",
      "Triển khai storage phân tán Longhorn trên các node K3s ảo hóa cho workload cần dữ liệu bền bỉ và snapshot.",
      "Cấu hình Traefik Ingress tự động hóa chứng chỉ TLS, phân tách namespace, quản lý ConfigMaps/Secrets và cấu hình probe kiểm tra sức khỏe pod.",
      "Vận hành bảo trì cụm, xử lý sự cố mạng CoreDNS, bảo dưỡng node và triển khai rolling update không gián đoạn dịch vụ."
    ],
    results: [
      "Fully automated code-to-cluster delivery pipeline eliminating manual server interventions.",
      "A compact, reproducible lab for testing self-hosted workloads and delivery paths.",
      "Persistent storage and cluster operations can be practiced on VMs while the single physical-host boundary remains explicit.",
      "A predictable rolling update strategy across the three-VM K3s environment."
    ],
    resultsVi: [
      "Tự động hóa hoàn toàn quy trình từ commit mã nguồn đến triển khai trên cụm K8s, loại bỏ thao tác thủ công.",
      "Môi trường lab nhỏ gọn, có thể tái tạo để thử nghiệm workload tự vận hành và delivery.",
      "Có thể thực hành storage bền bỉ và vận hành cluster trên VM, đồng thời nhìn rõ giới hạn của một host vật lý.",
      "Chiến lược rolling update có thể dự đoán trong môi trường K3s 3 VM."
    ],
    relatedArticles: ["homelab-thinkcentre-proxmox-k3s"],
    role: "DevOps & Infrastructure",
    roleVi: "DevOps & Hạ tầng Kỹ thuật",
    year: "2024 – Present",
    techStack: ["ThinkCentre", "Xeon E-2286M", "Proxmox", "Ubuntu 26", "Kubernetes", "K3s", "Longhorn", "Docker", "Jenkins", "Traefik", "Linux", "Git", "CI/CD"],
    category: "DevOps & Cloud",
    categoryVi: "DevOps & Cloud",
    metrics: [
      "1 ThinkCentre / Proxmox host with 3 Ubuntu 26 K3s VMs",
      "Longhorn distributed persistent storage across the virtualized cluster",
      "Automated declarative Jenkins pipelines for Docker image builds & K8s rollouts",
      "Rolling deployments and self-healing container infrastructure"
    ],
    metricsVi: [
      "1 host ThinkCentre / Proxmox với 3 VM Ubuntu 26 chạy K3s",
      "Lưu trữ persistent phân tán Longhorn trên cụm ảo hóa",
      "Pipeline Jenkins declarative tự động build Docker image và rollout K8s",
      "Triển khai rolling update và hạ tầng container tự phục hồi"
    ],
    architecture: [
      "Jenkins declarative pipelines with multi-stage Docker caching",
      "Proxmox VM topology with multi-node K3s deployments, services, and ingress",
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
    image: "/images/projects/homelab-preview.jpg",
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
    roleVi: "Frontend Developer (MochiMochi)",
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
    subtitle: "Cloud-native platform with 15 Go microservices (gRPC & NATS), React Module Federation (13 remotes), and Ory IAM",
    subtitleVi: "Kiến trúc FinOps đám mây với 15 Go Microservices (gRPC & NATS), React Module Federation (13 remotes) và Ory IAM",
    description: "Architected a multi-tenant financial operations platform organized into 3 Git repositories: 15 Go microservices backend (arda-be), React Module Federation (arda-mfe), and GitOps-managed Kubernetes infrastructure (arda-infra) with Ory Kratos/Hydra authentication and CloudNativePG.",
    descriptionVi: "Thiết kế nền tảng FinOps đa khách thuê gồm 3 repo: 15 Go Microservices (arda-be), React Module Federation 13 remote apps (arda-mfe) và hạ tầng Kubernetes GitOps (arda-infra) với xác thực Ory Kratos/Hydra và CloudNativePG.",
    problem: "Financial operations demand strict multi-tenant data isolation, high-throughput microservices communication, unified zero-trust identity, and decoupled frontend release cycles across CRM, Finance, HRM, and Workflow domains.",
    problemVi: "Hệ thống vận hành tài chính yêu cầu cách ly dữ liệu đa khách thuê nghiêm ngặt, giao tiếp microservice hiệu năng cao, định danh zero-trust tập trung và phân tách chu kỳ release độc lập giữa các module Finance, CRM, HRM và Workflow.",
    architectureDiagram: `Browser / Client ──► Cloudflare Tunnel ──► Traefik (ForwardAuth)
                                                  │
           ┌──────────────────────────────────────┴──────────────────────────────────────┐
           ▼                                                                             ▼
    BFF Auth-Gateway ──► Ory Kratos + Hydra (Identity)                         React Shell + 7 MFE Remotes
           │                                                                   [@workspace/ui, api, auth]
           ▼
    15 Go Microservices (HTTP/JSON + gRPC + NATS Events)
    [iam, platform, finance, workflow, crm, hrm, notification, media, mdm]
           │
           ▼
    CloudNativePG (HA Postgres) · Valkey · Garage S3 · Zeebe 8.5 BPMN`,
    contributionsDetailed: [
      "Engineered 15 Go microservices sharing common libraries (arda-auth, arda-grpc, arda-events, arda-postgres) with standardized gRPC contracts.",
      "Architected React Module Federation with a central shell and 13 remotes (iam, platform, finance, account, hrm, workflow, crm, mdm, loan, deposit, capital, statistical, ai) using shared workspace packages.",
      "Built zero-trust identity flow with Ory Kratos, Ory Hydra, Traefik ForwardAuth, and BFF session cookies.",
      "Orchestrated HA PostgreSQL with CloudNativePG, Valkey distributed cache, and Zeebe 8.5 BPMN workflow on a 3-node K3s cluster."
    ],
    contributionsDetailedVi: [
      "Xây dựng 15 Go microservices sử dụng thư viện dùng chung (arda-auth, arda-grpc, arda-events) với contract gRPC được chuẩn hóa.",
      "Thiết kế kiến trúc React Module Federation gồm Shell trung tâm và 13 remote apps dùng chung gói @workspace/* (shadcn UI, auth, API).",
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
      "15 Go Microservices with gRPC & NATS event streams",
      "React Module Federation (Shell + 13 Remotes)",
      "Zero-trust Ory Kratos/Hydra IAM & CloudNativePG HA"
    ],
    metricsVi: [
      "15 Go Microservices giao tiếp qua gRPC và luồng sự kiện NATS",
      "React Module Federation gồm Shell và 7 phân hệ Remotes",
      "Định danh Zero-trust Ory Kratos/Hydra và CSDL CloudNativePG HA"
    ],
    architecture: [
      "React Module Federation with shared @workspace packages",
      "15 Go Microservices with gRPC inter-service calls & NATS domain events",
      "Ory Kratos & Hydra zero-trust authentication via Traefik ForwardAuth",
      "CloudNativePG HA PostgreSQL cluster with Valkey distributed caching"
    ],
    architectureVi: [
      "React Module Federation với các gói dùng chung @workspace/*",
      "15 Go Microservices kết nối gRPC và luồng sự kiện bất đồng bộ NATS",
      "Xác thực Zero-trust qua Ory Kratos/Hydra và Traefik ForwardAuth",
      "Cụm CloudNativePG HA PostgreSQL và bộ nhớ đệm phân tán Valkey"
    ],
    liveUrl: "https://arda.io.vn",
    githubUrl: "https://github.com/arda-labs",
    featured: true,
    image: "/images/projects/arda-preview.jpg",
    accentColor: "#6366f1",
  },
  {
    id: "puchi-language-platform",
    title: "Puchi — Vietnamese Language Learning Platform",
    titleVi: "Puchi — Nền tảng Học tiếng Việt Trực tuyến",
    subtitle: "Next.js PWA with 5 Go microservices (Kratos v3), Limen sessions, NATS events, and ArgoCD GitOps",
    subtitleVi: "Ứng dụng Next.js PWA với 5 Go Microservices (Kratos v3), Limen sessions, NATS events và ArgoCD GitOps",
    description: "Developed a modern Vietnamese learning web platform featuring a responsive Next.js PWA frontend, 5 Go microservices monorepo built on Kratos v3, Limen auth session exchange, NATS event bus, and automated ArgoCD GitOps deployments on K3s.",
    descriptionVi: "Phát triển nền tảng học tiếng Việt hiện đại gồm Next.js PWA frontend, monorepo 5 Go microservices trên nền Kratos v3, xác thực Limen sessions, NATS event bus và CI/CD GitOps qua ArgoCD trên K3s.",
    problem: "Online language learners need fast, offline-capable PWA experiences with instant lesson progress synchronization, audio pronunciation streaming, and resilient microservice APIs under traffic spikes.",
    problemVi: "Học viên học ngoại ngữ cần trải nghiệm PWA mượt mà hỗ trợ offline, đồng bộ tiến độ học, phát âm thanh bài học và hạ tầng microservice ổn định.",
    architectureDiagram: `User ──► Cloudflare CDN ──► Next.js PWA (Limen sessions) ──► Envoy Gateway
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
      "Next.js PWA with Limen sessions & Cloudflare R2",
      "Declarative ArgoCD GitOps on K3s Kubernetes"
    ],
    metricsVi: [
      "5 Go Microservices (Kratos v3) và luồng sự kiện NATS",
      "Next.js PWA tích hợp Limen sessions và Cloudflare R2",
      "Triển khai GitOps tự động hóa với ArgoCD trên K3s"
    ],
    architecture: [
      "Next.js PWA with Limen authentication session management",
      "5 Go Microservices (Kratos v3) with NATS asynchronous event messaging",
      "Cloudflare R2 object storage for audio pronunciation assets",
      "ArgoCD GitOps deployment pipeline on multi-node K3s cluster"
    ],
    architectureVi: [
      "Next.js PWA quản lý phiên người dùng qua Limen sessions",
      "5 Go Microservices (Kratos v3) xử lý sự kiện bất đồng bộ qua NATS",
      "Lưu trữ tệp âm thanh bài giảng trên Cloudflare R2",
      "Pipeline triển khai ArgoCD GitOps trên cụm K3s Kubernetes"
    ],
    liveUrl: "https://puchi.io.vn",
    githubUrl: "https://github.com/puchidemy",
    featured: true,
    image: "/images/projects/puchi-preview.jpg",
    accentColor: "#10b981",
  },
  {
    id: "camrelay-p2p-rtsp-bridge",
    title: "Camrelay — P2P IP Camera to RTSP Stream Relay",
    titleVi: "Camrelay — Cầu nối Chuyển đổi P2P IP Camera sang RTSP Stream",
    subtitle: "Rust/Tokio tunnel that puts a P2P-only camera behind a private, authenticated RTSP endpoint",
    subtitleVi: "Tunnel Rust/Tokio đưa camera chỉ truy cập được qua P2P vào một endpoint RTSP riêng, có xác thực",
    description: "A Rust/Tokio service that carries TCP traffic to a camera reachable only through a vendor P2P path, and exposes it on a loopback RTSP authentication proxy so NVR software can read it. It is a tunnel, not an RTSP server. Optional recording uses FFmpeg with -c copy; archiving uses rclone. No performance figures are claimed.",
    descriptionVi: "Service Rust/Tokio chuyển tiếp TCP tới camera chỉ truy cập được qua đường P2P của hãng, và mở ra qua một proxy xác thực RTSP trên loopback để NVR đọc được. Đây là tunnel, không phải RTSP server. Ghi hình tùy chọn dùng FFmpeg với -c copy; lưu trữ dùng rclone. Không công bố số liệu hiệu năng.",
    problem: "Proprietary IP cameras (Dahua, easy4ip) restrict access behind closed P2P cloud servers, preventing local integration into open-source NVR systems (Frigate, Home Assistant, Scrypted) without subscription fees or vulnerable open ports.",
    problemVi: "Các dòng camera IP sử dụng giao thức P2P đóng (Dahua, easy4ip) bị phụ thuộc vào máy chủ đám mây của hãng, gây khó khăn khi tích hợp vào hệ thống NVR mã nguồn mở (Frigate, Home Assistant) mà không phải trả phí thuê bao hay mở port router tiềm ẩn nguy cơ bảo mật.",
    architectureDiagram: `IP Camera (vendor P2P path) ──► [ camrelay: TCP tunnel (Rust / Tokio) ] ──► loopback RTSP auth proxy
                                       │                              │
                                       ├─► Web UI & probe             ├─► RTSP consumers (e.g. NVR)
                                       └─► FFmpeg -c copy segments ──► rclone archive`,
    contributionsDetailed: [
      "Built an asynchronous Rust daemon (Tokio, Axum) that tunnels TCP to the camera over a vendor P2P path, with realm-based tunnel sessions.",
      "Implemented the P2P signaling and session setup needed to reach the camera without port forwarding, and kept it isolated from the local RTSP contract.",
      "Put a loopback RTSP authentication proxy in front of the tunnel so consumers use a normal RTSP URL with credentials.",
      "Built optional recording workers that run FFmpeg with -c copy (no re-encoding) into segments and archive them with rclone.",
      "Added an embedded web UI for camera setup and tunnel status."
    ],
    contributionsDetailedVi: [
      "Xây dựng daemon Rust bất đồng bộ (Tokio, Axum) tunnel TCP tới camera qua đường P2P của hãng, với session tunnel theo realm.",
      "Hiện thực signaling và thiết lập session P2P để tới camera mà không cần mở port, tách biệt khỏi contract RTSP nội bộ.",
      "Đặt một proxy xác thực RTSP trên loopback trước tunnel để consumer dùng URL RTSP thường kèm credential.",
      "Xây dựng worker ghi hình tùy chọn chạy FFmpeg với -c copy (không re-encode) theo phân đoạn và lưu trữ bằng rclone.",
      "Thêm web UI nhúng để cấu hình camera và xem trạng thái tunnel."
    ],
    results: [
      "A private RTSP path for the one camera path validated so far (see the device validation matrix in the repo).",
      "A self-hosted alternative to depending on a vendor viewing workflow.",
      "Optional off-site archiving with rclone."
    ],
    resultsVi: [
      "Một đường RTSP riêng cho camera path đã được xác minh (xem device validation matrix trong repo).",
      "Giảm phụ thuộc vào workflow xem camera của vendor bằng một relay tự vận hành.",
      "Lưu trữ off-site tùy chọn bằng rclone."
    ],
    relatedArticles: ["camrelay-from-proprietary-p2p-to-private-rtsp"],
    role: "Sole Creator & Systems Engineer",
    roleVi: "Tác giả & Kỹ sư Hệ thống",
    year: "2025 – Present",
    techStack: ["Rust", "Tokio", "RTSP", "P2P Signaling", "FFmpeg", "rclone", "Axum"],
    category: "Systems & IoT",
    categoryVi: "Hệ thống & IoT",
    metrics: [
      "Rust Async Tokio relay core",
      "Loopback RTSP auth proxy in front of a TCP tunnel",
      "FFmpeg -c copy segments + rclone archive"
    ],
    metricsVi: [
      "Nhân relay Rust Tokio bất đồng bộ",
      "Proxy xác thực RTSP trên loopback trước TCP tunnel",
      "Phân đoạn FFmpeg -c copy + lưu trữ rclone"
    ],
    architecture: [
      "P2P session setup reaching the camera without port forwarding",
      "TCP tunnel plus a loopback RTSP authentication proxy (not an RTSP server)",
      "Optional FFmpeg -c copy segment recorder with rclone offloading",
      "Embedded HTTP management API and web UI"
    ],
    architectureVi: [
      "Thiết lập session P2P tới camera mà không cần mở port",
      "TCP tunnel kèm proxy xác thực RTSP trên loopback (không phải RTSP server)",
      "Bộ ghi phân đoạn FFmpeg -c copy tùy chọn, đẩy file qua rclone",
      "API quản trị HTTP và web UI nhúng"
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
    subtitle: "Unofficial desktop companion for Baseus earbuds: Tauri v2, Rust (btleplug), SolidJS",
    subtitleVi: "App desktop không chính thức cho tai nghe Baseus: Tauri v2, Rust (btleplug), SolidJS",
    description: "An unofficial desktop app that talks to Baseus earbuds over Bluetooth LE with no account and no telemetry. Two wire framings (bare AA/BA and a 789C frame with CRC-16), a Rust session model that only shows device-confirmed state, and a catalog of 124 JSON profiles of which 7 can send commands (1 verified, 6 experimental; the rest are scan-only). Tested on Windows only.",
    descriptionVi: "App desktop không chính thức nói chuyện với tai nghe Baseus qua Bluetooth LE, không tài khoản, không telemetry. Hai kiểu framing (bare AA/BA và frame 789C có CRC-16), session Rust chỉ hiển thị state do thiết bị xác nhận, catalog 124 profile JSON trong đó 7 profile gửi được lệnh (1 verified, 6 experimental; còn lại chỉ scan). Chỉ test trên Windows.",
    problem: "Headphone manufacturers often only release mobile apps for EQ and ANC adjustments, leaving desktop users unable to configure their devices without a phone and a vendor account.",
    problemVi: "Các hãng sản xuất tai nghe thường chỉ phát hành app di động để chỉnh EQ/ANC, khiến người dùng máy tính không thể tùy biến thiết bị trên desktop mà phải dùng điện thoại và tài khoản của hãng.",
    architectureDiagram: `Desktop GUI (SolidJS + SCSS) ──► Tauri v2 IPC Bridge
                                              │
                                              ▼
Baseus Headphones (BLE) ◄─── GATT Frames ─── [ Rust Core (btleplug) ]`,
    contributionsDetailed: [
      "Built a desktop application on Tauri v2 and Rust with the BLE lifecycle kept in native code.",
      "Implemented BLE scanning, the GATT connection lifecycle and a handshake via btleplug, with a session that refuses stale state.",
      "Worked out two Baseus wire framings (bare AA/BA and a 789C frame with CRC-16) and encoded them with documented, tested codecs.",
      "Built the interface with SolidJS, TypeScript and SCSS, rendering controls from each model profile's capabilities.",
      "Kept the app local-only: no account, no telemetry."
    ],
    contributionsDetailedVi: [
      "Xây dựng app desktop trên Tauri v2 và Rust, giữ vòng đời BLE trong code native.",
      "Hiện thực quét BLE, vòng đời kết nối GATT và handshake qua btleplug, với session từ chối state cũ.",
      "Tìm ra hai kiểu framing của Baseus (bare AA/BA và frame 789C có CRC-16) và mã hóa bằng codec có tài liệu và test.",
      "Xây dựng giao diện bằng SolidJS, TypeScript và SCSS, render điều khiển theo capability của từng profile model.",
      "Giữ app hoàn toàn local: không tài khoản, không telemetry."
    ],
    results: [
      "Desktop control of the features implemented for the 7 command-capable profiles.",
      "A native/local control path with explicit per-profile support status.",
      "Local Bluetooth LE communication without unnecessary telemetry."
    ],
    resultsVi: [
      "Điều khiển trên desktop các tính năng đã hiện thực cho 7 profile gửi được lệnh.",
      "Luồng điều khiển native/local với trạng thái hỗ trợ rõ ràng theo từng profile.",
      "Giao tiếp Bluetooth LE local, không thêm telemetry không cần thiết."
    ],
    relatedArticles: ["b4s-reverse-engineering-a-local-ble-companion"],
    role: "Creator & Systems Developer",
    roleVi: "Tác giả & Lập trình viên Hệ thống",
    year: "2025 – Present",
    techStack: ["Tauri v2", "Rust", "SolidJS", "Bluetooth LE", "btleplug", "TypeScript", "SCSS"],
    category: "Desktop & IoT",
    categoryVi: "Desktop & IoT",
    metrics: [
      "124 catalog profiles, 7 can send commands (1 verified)",
      "Direct Local Bluetooth LE (GATT) Protocol",
      "Tested on Windows only"
    ],
    metricsVi: [
      "Catalog 124 profile, 7 gửi được lệnh (1 verified)",
      "Giao thức Bluetooth LE (GATT) trực tiếp không qua mây",
      "Chỉ test trên Windows"
    ],
    architecture: [
      "Tauri v2 IPC bridge connecting SolidJS frontend to native Rust backend",
      "Bluetooth LE GATT client over btleplug",
      "Two framings: bare AA/BA and a 789C frame with CRC-16",
      "JSON model catalog driving capability-based UI per profile"
    ],
    architectureVi: [
      "Cầu nối IPC Tauri v2 kết nối giao diện SolidJS với backend Rust gốc",
      "Client Bluetooth LE GATT qua btleplug",
      "Hai kiểu framing: bare AA/BA và frame 789C có CRC-16",
      "Catalog model JSON điều khiển UI theo capability của từng profile"
    ],
    liveUrl: "https://github.com/hoan02/b4s",
    githubUrl: "https://github.com/hoan02/b4s",
    featured: true,
    image: "/images/projects/saas.svg",
    accentColor: "#3b82f6",
  }
];

const LEGACY_ARTICLES: Article[] = [
  // ==========================================
  // ARDA LABS ARTICLES
  // ==========================================
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
    relatedProject: "arda-finops-platform",
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
        value: "PWA",
        label: "Mobile First Content",
        labelVi: "Ứng dụng PWA",
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
        "NATS event stream processes gamification in background, returning quiz results without blocking the request.",
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

/** Rewritten and new articles (src/data/articles) come first, then the older ones. */
export const ARTICLES_DATA: Article[] = [...NEW_ARTICLES, ...REWRITTEN_ARTICLES, ...LEGACY_ARTICLES];

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
    roleVi: "Frontend Developer",
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
