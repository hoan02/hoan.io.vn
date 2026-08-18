import { Project, ExperienceItem, TechCategory, BentoStat, Article } from "@/types";

export const PERSONAL_INFO = {
  name: "Le Cong Hoan",
  nameVi: "Lê Công Hoan",
  title: "Full-stack Developer",
  titleVi: "Full-stack Developer",
  phone: "0358 069 992",
  email: "lehoan.dev@gmail.com",
  github: "https://github.com/hoan02",
  linkedin: "https://www.linkedin.com/in/hoan02",
  facebook: "https://web.facebook.com/hoanit02",
  cvUrl: "/cv/Le_Cong_Hoan_CV.pdf",
  location: "Hanoi, Vietnam • Available for Remote / Hybrid",
  locationVi: "Hà Nội, Việt Nam • Sẵn sàng làm việc Remote / Hybrid",
  status: "Building scalable web platforms & developer infrastructure",
  statusVi: "Xây dựng nền tảng web & hạ tầng kỹ thuật thực chiến",
  roleTagline: "Angular micro-frontends, Spring Boot microservices & Kubernetes deployments.",
  roleTaglineVi: "Angular micro-frontends, Spring Boot microservices & hạ tầng Kubernetes.",
  bio: "Full-stack Engineer with practical experience building enterprise process automation systems and EdTech web applications using Angular, Next.js, TypeScript, and Java Spring Boot. Focused on micro-frontend architecture, high-scale database workflows (Oracle, PostgreSQL), automated CI/CD pipelines, and Kubernetes deployment.",
  bioVi: "Kỹ sư Full-stack Developer với kinh nghiệm thực chiến phát triển các hệ thống tự động hóa doanh nghiệp và nền tảng EdTech trên nền tảng Angular, Next.js, TypeScript và Java Spring Boot. Chuyên sâu về kiến trúc Micro-Frontend, xử lý dữ liệu Oracle/PostgreSQL, CI/CD và Kubernetes.",
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
    subtitle: "Enterprise-scale micro-frontend and microservice platform with CRM/BPM workflow automation",
    subtitleVi: "Nền tảng tự động hóa quy trình nghiệp vụ & CRM/BPM trên kiến trúc Micro-Frontend và Spring Boot",
    description: "Designed and maintained Angular micro-frontend architecture, shared libraries, dynamic forms, and transaction inboxes integrated with Java Spring Boot, Oracle, PostgreSQL, Redis, Kafka, and Keycloak on Kubernetes.",
    descriptionVi: "Thiết kế và duy trì kiến trúc Angular Micro-Frontend, thư viện dùng chung, biểu mẫu động và hộp thư giao dịch tích hợp với Java Spring Boot, Oracle, PostgreSQL, Redis, Kafka, Keycloak trên Kubernetes.",
    problem: "Multiple enterprise business modules (CRM, BPM, Operations) required independent release cycles while maintaining consistent design systems, single sign-on authentication, synchronized routing, and unified workflow state across dozens of concurrent users.",
    problemVi: "Nhiều phân hệ nghiệp vụ doanh nghiệp (CRM, BPM, Quản trị) cần chu kỳ release độc lập nhưng phải đồng nhất hệ thống thiết kế UI, xác thực SSO, đồng bộ định tuyến và trạng thái luồng công việc xuyên suốt.",
    architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                 Angular Shell (Nx Monorepo)                 │
└──────────────┬───────────────────────────────┬──────────────┘
               │ (Module Federation / Routing) │
        ┌──────▼──────┐                 ┌──────▼──────┐
        │   CRM MFE   │                 │   BPM MFE   │
        └──────┬──────┘                 └──────┬──────┘
               │                               │
               └───────────────┬───────────────┘
                               ▼
        ┌─────────────────────────────────────────────┐
        │        Java Spring Boot Microservices       │
        └──────────────┬───────────────┬──────────────┘
                       │               │
        ┌──────────────▼──────┐ ┌──────▼──────────────┐
        │ Oracle / PostgreSQL │ │ Apache Kafka & Redis│
        └─────────────────────┘ └─────────────────────┘`,
    contributionsDetailed: [
      "Architected Angular Micro-Frontend foundation using Nx monorepo with standardized routing and shell-to-remote state synchronization.",
      "Engineered shared component libraries for dynamic forms, custom data grids with virtual scrolling, pagination, and multi-file attachments.",
      "Implemented CRM/BPM transaction inboxes with real-time task dispatching, audit trails, and multi-tier approval flows.",
      "Integrated frontend clients with Spring Boot REST services, Keycloak OIDC authentication, and Kafka event streaming.",
      "Authored Jenkins declarative CI/CD pipelines to automate multi-stage Docker builds and rolling Kubernetes updates."
    ],
    contributionsDetailedVi: [
      "Thiết kế kiến trúc Angular Micro-Frontend với Nx monorepo, chuẩn hóa định tuyến và đồng bộ trạng thái giữa Shell và các Remote.",
      "Xây dựng thư viện component dùng chung: biểu mẫu động (dynamic forms), bảng dữ liệu hỗ trợ lọc và phân trang, xử lý tệp đính kèm.",
      "Phát triển hộp thư giao dịch CRM/BPM xử lý luồng phê duyệt đa cấp, quản lý tác vụ và lưu vết lịch sử kiểm toán (audit trail).",
      "Tích hợp các module frontend với API Java Spring Boot, cơ chế bảo mật Keycloak OIDC và luồng sự kiện Kafka.",
      "Thiết lập pipeline Jenkins CI/CD tự động hóa build Docker đa tầng và phát hành rolling update trên cụm Kubernetes."
    ],
    results: [
      "Standardized UI foundation and dynamic form engine, cutting feature development lead time across enterprise modules.",
      "Zero-downtime rolling deployments on on-premises Kubernetes clusters via automated Jenkins pipelines.",
      "Consistent single-sign-on (SSO) and role-based access control (RBAC) enforced across all remote applications."
    ],
    resultsVi: [
      "Chuẩn hóa nền tảng giao diện và engine biểu mẫu động, rút ngắn thời gian phát triển tính năng mới giữa các nhóm nghiệp vụ.",
      "Phát hành cập nhật zero-downtime trên cụm Kubernetes on-premises thông qua pipeline CI/CD tự động.",
      "Đồng bộ xác thực đăng nhập một lần (SSO) và phân quyền RBAC chặt chẽ xuyên suốt toàn bộ các ứng dụng remote."
    ],
    relatedArticles: ["angular-microfrontend-architecture", "practical-cicd-jenkins-k8s", "angular-complex-list-state"],
    role: "Fullstack Developer (NGV Group)",
    roleVi: "Kỹ sư Fullstack (NGV Group)",
    year: "12/2024 – Present",
    techStack: ["Angular", "Micro-Frontend", "Nx", "Java Spring Boot", "Oracle", "PostgreSQL", "Kafka", "Redis", "Keycloak", "Kubernetes", "Jenkins"],
    category: "Full-stack",
    categoryVi: "Full-stack",
    metrics: [
      "Standardized UI libraries & routing across multiple enterprise modules",
      "End-to-end CI/CD build & image publishing with Jenkins & Kubernetes",
      "Production-ready RBAC security with Keycloak & Zero-downtime rollouts"
    ],
    metricsVi: [
      "Chuẩn hóa thư viện giao diện và định tuyến xuyên suốt các phân hệ",
      "Tự động hóa toàn diện quy trình build & đóng gói image với Jenkins & K8s",
      "Bảo mật phân quyền RBAC qua Keycloak & triển khai zero-downtime"
    ],
    architecture: [
      "Angular Micro-Frontend architecture with shared design libraries and NX monorepo",
      "Event-driven messaging with Apache Kafka and distributed cache with Redis",
      "Oracle and PostgreSQL dual persistence with Keycloak OIDC authentication",
      "On-premises Kubernetes cluster orchestration with ingress and health monitoring"
    ],
    architectureVi: [
      "Kiến trúc Angular Micro-Frontend với thư viện dùng chung và NX monorepo",
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
      "Handled cluster maintenance, CoreDNS troubleshooting, node draining, and rolling zero-downtime application releases."
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
      "Predictable zero-downtime rolling update rollout strategy across multiple environments."
    ],
    resultsVi: [
      "Tự động hóa hoàn toàn quy trình từ commit mã nguồn đến triển khai trên cụm K8s, loại bỏ thao tác thủ công.",
      "Môi trường thử nghiệm và vận hành độ sẵn sàng cao với hệ thống lưu trữ phân tán Longhorn.",
      "Chiến lược cập nhật rolling update an toàn, đảm bảo dịch vụ luôn khả dụng liên tục."
    ],
    relatedArticles: ["kubernetes-homelab-k3s", "practical-cicd-jenkins-k8s"],
    role: "DevOps & Infrastructure",
    roleVi: "DevOps & Hạ tầng Kỹ thuật",
    year: "2024 – Present",
    techStack: ["Kubernetes", "K3s", "Longhorn", "Docker", "Jenkins", "Traefik", "Linux", "Git", "CI/CD"],
    category: "DevOps & Cloud",
    categoryVi: "DevOps & Cloud",
    metrics: [
      "3-node K3s Homelab cluster with Longhorn distributed persistent storage",
      "Automated declarative Jenkins pipelines for Docker image builds & K8s rollouts",
      "Zero-downtime rolling deployments and self-healing container infrastructure"
    ],
    metricsVi: [
      "Cụm Homelab K3s 3-node tích hợp lưu trữ phân tán Longhorn",
      "Pipeline Jenkins declarative tự động build Docker image và rollout K8s",
      "Triển khai rolling update zero-downtime và hạ tầng container tự phục hồi"
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
      "High performance pagination and instant filter across large message histories.",
      "Seamless Zalo OA API synchronization and webhook delivery."
    ],
    resultsVi: [
      "Tự động hóa quản trị mẫu tin nhắn và theo dõi hội thoại thời gian thực.",
      "Phân trang và tìm kiếm lọc siêu tốc trên lượng lớn lịch sử tin nhắn.",
      "Đồng bộ API Zalo OA và xử lý webhook ổn định."
    ],
    relatedArticles: ["angular-complex-list-state"],
    role: "Fullstack Developer (NGV Group)",
    roleVi: "Kỹ sư Fullstack (NGV Group)",
    year: "12/2024 – Present",
    techStack: ["Angular", "Java Spring Boot", "TypeScript", "REST APIs", "PostgreSQL", "Redis"],
    category: "Full-stack",
    categoryVi: "Full-stack",
    metrics: [
      "Automated message template management and real-time conversation tracking",
      "High performance pagination and instant filter across large message histories",
      "Seamless Zalo OA API synchronization and webhook delivery"
    ],
    metricsVi: [
      "Tự động hóa quản trị mẫu tin nhắn và theo dõi hội thoại thời gian thực",
      "Phân trang và tìm kiếm lọc siêu tốc trên lượng lớn lịch sử tin nhắn",
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
    featured: true,
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
  }
];

export const ARTICLES_DATA: Article[] = [
  {
    slug: "angular-microfrontend-architecture",
    title: "Designing Angular Micro-Frontends for Enterprise Applications",
    titleVi: "Thiết kế Kiến trúc Angular Micro-Frontend cho Ứng dụng Doanh nghiệp",
    summary: "How to structure Nx monorepos, module federation, shared UI libraries, and synchronized routing across independent enterprise teams.",
    summaryVi: "Cách tổ chức Nx monorepo, Module Federation, thư viện dùng chung và đồng bộ routing giữa các nhóm phát triển độc lập.",
    date: "Feb 2026",
    readTime: "8 min read",
    tags: ["Angular", "Architecture", "Micro-Frontend", "Nx"],
    featured: true,
    relatedProject: "epas-enterprise-process-automation",
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
      problemStatement: "In large enterprise systems, multiple functional teams frequently encounter merge conflicts, deployment bottlenecks, and tightly-coupled dependencies when contributing to a single monolithic Angular frontend.",
      problemStatementVi: "Trong các hệ thống doanh nghiệp lớn, nhiều nhóm phát triển thường xuyên gặp xung đột mã nguồn, nghẽn chu kỳ phát hành và phụ thuộc chéo khi cùng phát triển trên một ứng dụng Angular nguyên khối (monolith).",
      architectureDesign: "By adopting an Nx monorepo with Module Federation, we separate the system into a lightweight Shell (Host) application and isolated Remote micro-frontends (CRM, BPM, Operations). Shared components and data access patterns are distributed via local workspace libraries (`@shared/ui-lib`).",
      architectureDesignVi: "Bằng cách áp dụng Nx monorepo kết hợp Module Federation, hệ thống được tách thành một ứng dụng Shell (Host) gọn nhẹ và các Remote độc lập (CRM, BPM, Vận hành). Các thành phần dùng chung được đóng gói thành các thư viện nội bộ (@shared/ui-lib).",
      technicalDecisions: [
        "Use Nx Monorepo for unified dependency management, version alignment, and affected-build caching.",
        "Module Federation with dynamic remote manifest configuration, allowing remotes to be deployed independently without rebuilding the host.",
        "Custom Event Bus and URL query synchronization for inter-MFE communication without polluting the global window object.",
        "Shared singleton dependencies (RxJS, @angular/core, Keycloak-js) configured with strict version constraints to avoid bundle duplication."
      ],
      technicalDecisionsVi: [
        "Sử dụng Nx monorepo để quản lý phiên bản phụ thuộc tập trung và tận dụng tính năng build caching cho các package bị ảnh hưởng.",
        "Áp dụng Module Federation với cơ chế dynamic remote manifest, cho phép release các app remote độc lập mà không cần build lại Host.",
        "Thiết lập Event Bus và cơ chế đồng bộ qua URL query parameters để các MFE trao đổi dữ liệu an toàn.",
        "Cấu hình singleton dependencies (RxJS, @angular/core) nhằm tránh việc nạp trùng lặp thư viện gây nặng bundle."
      ],
      keyTakeaways: [
        "Independent release pipelines for individual feature teams.",
        "Standardized dynamic form schema and UI component reuse.",
        "Zero-downtime rolling updates for remote modules without restarting the host shell."
      ],
      keyTakeawaysVi: [
        "Phân tách độc lập quy trình release cho từng nhóm chức năng.",
        "Chuẩn hóa engine biểu mẫu động và tái sử dụng component giao diện.",
        "Triển khai cập nhật remote module mượt mà không làm gián đoạn người dùng đang thao tác trên Shell."
      ],
      codeSnippet: {
        language: "typescript",
        title: "module-federation.config.ts (Remote Configuration)",
        code: `import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'crm-mfe',
  exposes: {
    './Routes': './src/app/remote-entry/entry.routes.ts',
  },
  shared: (libraryName, defaultConfig) => {
    if (['@angular/core', '@angular/common', '@angular/router', 'rxjs'].includes(libraryName)) {
      return {
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
      };
    }
    return defaultConfig;
  },
};

export default config;`
      }
    }
  },
  {
    slug: "kubernetes-homelab-k3s",
    title: "Building a 3-Node Kubernetes (K3s) Homelab with Longhorn Storage",
    titleVi: "Xây dựng Cụm Kubernetes (K3s) Homelab 3-Node với Lưu trữ Phân tán Longhorn",
    summary: "Hands-on architectural setup for bare-metal/virtualized multi-node K3s, Longhorn distributed block storage, Traefik ingress, and local deployment pipelines.",
    summaryVi: "Chi tiết thiết lập cụm K3s đa node, hệ thống lưu trữ phân tán Longhorn, Traefik Ingress và quy trình tự động hóa triển khai.",
    date: "Jan 2026",
    readTime: "10 min read",
    tags: ["Kubernetes", "DevOps", "Homelab", "Longhorn", "Linux"],
    featured: true,
    relatedProject: "devops-k8s-infrastructure",
    architectureDiagram: `┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare Tunnel / LAN                  │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
┌──────────────▼───────────────────────────────▼──────────────┐
│                  Traefik Ingress Controller                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    3-Node K3s Cluster                       │
│  ┌─────────────────┐ ┌─────────────────┐ ┌────────────────┐ │
│  │ Node 1 (Master) │ │  Node 2 (Worker)│ │ Node 3 (Worker)│ │
│  │ • K3s Server    │ │  • K3s Agent    │ │ • K3s Agent    │ │
│  │ • Control Plane │ │  • Workload Pods│ │ • Workload Pods│ │
│  └────────┬────────┘ └────────┬────────┘ └────────┬───────┘ │
│           │                   │                   │         │
│  ┌────────▼───────────────────▼───────────────────▼───────┐ │
│  │     Longhorn Distributed Block Storage Engine (Replication = 2) │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘`,
    content: {
      problemStatement: "Testing microservice architectures, persistent database clusters, and deployment failover strategies requires a real multi-node Kubernetes environment without incurring unpredictable public cloud costs.",
      problemStatementVi: "Thử nghiệm kiến trúc microservices, cơ chế sao lưu CSDL phân tán và kịch bản failover đòi hỏi môi trường Kubernetes đa node thực tế mà không phát sinh chi phí đắt đỏ trên cloud.",
      architectureDesign: "We deploy a lightweight, production-grade K3s cluster across 3 nodes (Ubuntu Linux). Persistent volumes are handled by Longhorn distributed block storage with synchronous data replication, while Traefik acts as the ingress controller routing HTTP/gRPC traffic with automated TLS.",
      architectureDesignVi: "Thiết lập cụm K3s gọn nhẹ trên 3 node Ubuntu Linux. Dữ liệu bền vững (PV/PVC) được quản lý qua Longhorn với cơ chế nhân bản dữ liệu 2x, kết hợp Traefik Ingress định tuyến lưu lượng HTTP/gRPC và tự động cấp phát chứng chỉ TLS.",
      technicalDecisions: [
        "Selected K3s over full-blown K8s for lower memory footprint (under 512MB per control plane) while maintaining 100% Kubernetes API compatibility.",
        "Configured Longhorn with node storage tagging and a replication factor of 2, ensuring zero data loss if one physical worker node goes offline.",
        "Static IP assignment and local DNS overrides to ensure deterministic node discovery during cluster reboots.",
        "Automated backup snapshots exported to MinIO object storage on a scheduled cron trigger."
      ],
      technicalDecisionsVi: [
        "Chọn K3s thay vì full K8s để tối ưu tài nguyên RAM (dưới 512MB cho control plane) nhưng vẫn giữ 100% độ tương thích API chuẩn.",
        "Cấu hình Longhorn với replication factor = 2, đảm bảo dữ liệu toàn vẹn ngay cả khi một node vật lý gặp sự cố mất điện.",
        "Gán địa chỉ IP tĩnh và cấu hình DNS nội bộ giúp các node nhận diện nhau ổn định sau mỗi lần khởi động lại.",
        "Thiết lập snapshot sao lưu định kỳ xuất ra cụm MinIO Object Storage."
      ],
      keyTakeaways: [
        "True hands-on understanding of pod scheduling, storage classes, and PVC attachments.",
        "Resilient environment for hosting personal backend services and staging builds.",
        "Deep debugging insights into Linux networking, iptables, and CoreDNS lookups."
      ],
      keyTakeawaysVi: [
        "Nắm vững cơ chế pod scheduling, storage class và gắn kết PVC trong thực tế.",
        "Môi trường tin cậy để chạy các dịch vụ backend cá nhân và staging test.",
        "Kinh nghiệm xử lý sự cố mạng Linux, iptables và phân giải tên miền CoreDNS."
      ],
      codeSnippet: {
        language: "yaml",
        title: "longhorn-pvc.yaml (Persistent Volume Claim)",
        code: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-data-pvc
  namespace: database
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: longhorn
  resources:
    requests:
      storage: 20Gi`
      }
    }
  },
  {
    slug: "practical-cicd-jenkins-k8s",
    title: "Building a Practical CI/CD Pipeline: From Git to Kubernetes",
    titleVi: "Xây dựng Pipeline CI/CD Thực chiến: Từ Git đến Kubernetes",
    summary: "A battle-tested Jenkins declarative pipeline featuring multi-stage Docker builds, layer caching, automated versioning, and zero-downtime rolling updates.",
    summaryVi: "Pipeline Jenkins Declarative thực chiến kết hợp Docker multi-stage, tối ưu cache layer, gắn tag phiên bản và cập nhật rolling update.",
    date: "Jan 2026",
    readTime: "9 min read",
    tags: ["CI/CD", "Jenkins", "Docker", "Kubernetes", "DevOps"],
    featured: true,
    relatedProject: "devops-k8s-infrastructure",
    architectureDiagram: `┌────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│ Git Commit ├──────►│ Jenkins Declarative  ├──────►│ Multi-Stage Docker   │
│ (Push Tag) │       │ Pipeline (Lint/Test) │       │ Build & Layer Cache  │
└────────────┘       └──────────────────────┘       └──────────┬───────────┘
                                                               │
┌──────────────────────┐       ┌──────────────────────┐        │
│ Kubernetes Deployment│◄──────┤ Private Container    │◄───────┘
│ Rolling Zero-Downtime│       │ Registry (v1.2.x Tag)│
└──────────────────────┘       └──────────────────────┘`,
    content: {
      problemStatement: "Manual container builds and ad-hoc kubectl apply commands create human errors, inconsistent build environments, and unpredictable downtime during production releases.",
      problemStatementVi: "Quy trình build thủ công và chạy lệnh kubectl apply trực tiếp thường dẫn đến sai sót do con người, thiếu tính nhất quán giữa các môi trường và gây gián đoạn dịch vụ khi release.",
      architectureDesign: "A standardized Declarative Jenkinsfile automates the entire lifecycle: running unit tests, packaging container images with multi-stage Dockerfiles, publishing tagged artifacts to a secure registry, and applying rolling update manifests to the cluster.",
      architectureDesignVi: "Tự động hóa toàn diện chu trình release bằng Declarative Jenkinsfile: chạy kiểm thử, đóng gói image qua Dockerfile multi-stage, đẩy image có tag phiên bản lên registry và áp dụng cập nhật rolling update vào cụm K8s.",
      technicalDecisions: [
        "Multi-stage Docker builds: compile in a full SDK image (Node/Maven), copy only the final artifact into a lightweight runtime (Alpine/Distroless).",
        "Deterministic tagging strategy: \`\${GIT_COMMIT_SHORT}-\${BUILD_NUMBER}\` prevents \`latest\` tag caching pitfalls.",
        "K8s rollout status verification: Jenkins waits for deployment rollout status before declaring success, automatically rolling back on crash loops."
      ],
      technicalDecisionsVi: [
        "Build Docker đa tầng (multi-stage): biên dịch trong môi trường SDK đầy đủ, sau đó chỉ sao chép file thực thi sang image runtime siêu nhẹ (Alpine/Distroless).",
        "Chiến lược gắn tag định danh theo commit và build number, loại bỏ rủi ro khi dùng tag latest.",
        "Kiểm tra trạng thái rollout tự động: Jenkins chỉ xác nhận thành công khi toàn bộ pod mới đã ready và vượt qua liveness check."
      ],
      keyTakeaways: [
        "100% reproducible builds across staging and production environments.",
        "Sub-3-minute build and deployment cycles for microservices.",
        "Safe rollback capability with immutable image tags."
      ],
      keyTakeawaysVi: [
        "Đảm bảo 100% tính nhất quán giữa môi trường staging và production.",
        "Rút ngắn thời gian build và triển khai dịch vụ xuống dưới 3 phút.",
        "Khả năng rollback tức thì nhờ lưu trữ đầy đủ các image tag bất biến."
      ],
      codeSnippet: {
        language: "groovy",
        title: "Jenkinsfile (Declarative Pipeline)",
        code: `pipeline {
  agent any
  environment {
    IMAGE_NAME = 'registry.local:5000/app/backend-service'
    IMAGE_TAG  = "\${env.BUILD_NUMBER}-\${env.GIT_COMMIT.take(7)}"
  }
  stages {
    stage('Build & Test') {
      steps {
        sh 'mvn clean package -DskipTests=false'
      }
    }
    stage('Docker Build & Push') {
      steps {
        sh "docker build -t \${IMAGE_NAME}:\${IMAGE_TAG} ."
        sh "docker push \${IMAGE_NAME}:\${IMAGE_TAG}"
      }
    }
    stage('Deploy to K8s') {
      steps {
        sh "kubectl set image deployment/backend-service backend=\${IMAGE_NAME}:\${IMAGE_TAG} -n production"
        sh "kubectl rollout status deployment/backend-service -n production --timeout=120s"
      }
    }
  }
}`
      }
    }
  },
  {
    slug: "angular-complex-list-state",
    title: "Preserving Complex Filter & Pagination State in Angular Applications",
    titleVi: "Kỹ thuật Giữ Trạng thái Bộ lọc & Phân trang Phức tạp trong Ứng dụng Angular",
    summary: "Managing enterprise data grid states with RxJS declarative streams, bi-directional URL query sync, and seamless browser history navigation.",
    summaryVi: "Quản lý trạng thái bảng dữ liệu doanh nghiệp với luồng RxJS, đồng bộ hai chiều với URL query và điều hướng lịch sử mượt mà.",
    date: "Dec 2025",
    readTime: "7 min read",
    tags: ["Angular", "RxJS", "TypeScript", "Frontend"],
    featured: false,
    relatedProject: "epas-enterprise-process-automation",
    content: {
      problemStatement: "In enterprise data tables with multi-field filters, date ranges, and pagination, users lose their context whenever navigating to detail screens or refreshing the browser.",
      problemStatementVi: "Trong các bảng dữ liệu doanh nghiệp có bộ lọc đa trường, khoảng thời gian và phân trang, người dùng thường bị mất trạng thái lọc khi bấm vào chi tiết hoặc tải lại trang.",
      architectureDesign: "We establish a single source of truth by syncing filter state bi-directionally with Angular Router query parameters and RxJS `combineLatest` streams, ensuring shareable URLs and instant state restoration.",
      architectureDesignVi: "Thiết lập nguồn chân lý duy nhất (Single Source of Truth) bằng cách đồng bộ trạng thái lọc với URL query parameters và luồng RxJS combineLatest, giúp URL có thể chia sẻ và tự khôi phục trạng thái.",
      technicalDecisions: [
        "Store state in URL Query Params: makes every filter view bookmarkable and shareable between enterprise teammates.",
        "Debounce filter text inputs with RxJS `distinctUntilChanged` and `debounceTime(300)` to eliminate redundant API requests.",
        "Use `switchMap` for data fetching to automatically cancel outdated HTTP requests on rapid filter changes."
      ],
      technicalDecisionsVi: [
        "Lưu trạng thái vào Query Params trên URL: cho phép bookmark và chia sẻ trực tiếp link lọc cho đồng nghiệp.",
        "Debounce các trường nhập liệu văn bản với distinctUntilChanged và debounceTime(300) để triệt tiêu request thừa.",
        "Sử dụng switchMap khi gọi API để tự động hủy các HTTP request cũ khi người dùng thay đổi bộ lọc nhanh."
      ],
      keyTakeaways: [
        "Zero state loss during back/forward browser navigation.",
        "Cleaner component architecture without messy imperative state resetting.",
        "Optimized server load with request cancellation and input debouncing."
      ],
      keyTakeawaysVi: [
        "Không bị mất trạng thái lọc khi người dùng nhấn nút Back/Forward trên trình duyệt.",
        "Mã nguồn component rõ ràng, loại bỏ các đoạn code gán biến thủ công.",
        "Giảm tải cho backend nhờ hủy request thừa và debounce thông minh."
      ]
    }
  },
  {
    slug: "postgresql-oracle-migration-lessons",
    title: "PostgreSQL & Oracle in Enterprise Systems: Architecture & SQL Tuning",
    titleVi: "Xử lý Dữ liệu Oracle & PostgreSQL trong Hệ thống Doanh nghiệp: Kiến trúc & Tối ưu SQL",
    summary: "Architectural insights on dual-persistence patterns, indexing strategies, connection pooling, and optimizing high-throughput SQL queries with Spring Boot.",
    summaryVi: "Kinh nghiệm thực chiến về kiến trúc tương thích dữ liệu, chiến lược đánh index, cấu hình connection pool và tối ưu truy vấn SQL tải cao.",
    date: "Nov 2025",
    readTime: "8 min read",
    tags: ["Database", "PostgreSQL", "Oracle", "Spring Boot", "SQL"],
    featured: false,
    relatedProject: "epas-enterprise-process-automation",
    content: {
      problemStatement: "Enterprise systems often require interfacing with legacy Oracle schemas while operating modern PostgreSQL microservices, demanding high query efficiency and robust connection management.",
      problemStatementVi: "Hệ thống doanh nghiệp thường cần kết nối đồng thời với cơ sở dữ liệu Oracle legacy và các microservices PostgreSQL mới, đòi hỏi hiệu năng truy vấn cao và quản lý kết nối an toàn.",
      architectureDesign: "We utilize Spring Data JPA with multi-datasource configurations, HikariCP connection pooling, tailored execution plan analysis (EXPLAIN ANALYZE), and partial indexes to maintain sub-50ms query latency.",
      architectureDesignVi: "Sử dụng Spring Data JPA cấu hình multi-datasource, tối ưu connection pool với HikariCP, phân tích execution plan (EXPLAIN ANALYZE) và đánh partial index để duy trì độ trễ truy vấn dưới 50ms.",
      technicalDecisions: [
        "Fine-tune HikariCP pool sizing based on CPU core formulas to avoid thread contention.",
        "Implement Composite and Partial Indexes on high-cardinality status columns to eliminate full table scans.",
        "Use read-only transaction annotations (`@Transactional(readOnly = true)`) for reporting queries to bypass Hibernate dirty-checking overhead."
      ],
      technicalDecisionsVi: [
        "Tinh chỉnh kích thước connection pool HikariCP theo công thức số core CPU để tránh tắc nghẽn thread.",
        "Thiết lập Composite Index và Partial Index trên các cột trạng thái để loại bỏ hoàn toàn việc quét toàn bảng (Full Table Scan).",
        "Sử dụng @Transactional(readOnly = true) cho các truy vấn đọc dữ liệu để bỏ qua chi phí dirty-checking của Hibernate."
      ],
      keyTakeaways: [
        "Significant reduction in query execution times on million-row tables.",
        "Resilient connection pool management preventing thread starvation during traffic spikes.",
        "Clean separation between legacy enterprise records and modern service schemas."
      ],
      keyTakeawaysVi: [
        "Rút ngắn đáng kể thời gian thực thi truy vấn trên các bảng hàng triệu bản ghi.",
        "Quản lý connection pool an toàn, ngăn ngừa cạn kiệt kết nối khi lượng truy cập tăng đột biến.",
        "Phân tách rõ ràng giữa dữ liệu lưu trữ doanh nghiệp và schema dịch vụ mới."
      ]
    }
  }
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
    location: "Hanoi, Vietnam",
    locationVi: "Hà Nội, Việt Nam",
    type: "Full-time",
    typeVi: "Chính thức",
    summary: "Engineering enterprise process automation systems (EPAS) and Zalo OA communication modules with Angular micro-frontends, Java Spring Boot microservices, and Kubernetes infrastructure.",
    summaryVi: "Phát triển hệ thống tự động hóa quy trình doanh nghiệp (EPAS) và phân hệ Zalo OA trên nền tảng Angular Micro-Frontend, Java Spring Boot microservices và hạ tầng Kubernetes.",
    contributions: [
      "Designed and maintained Angular micro-frontend architecture, shared libraries, routing, integration patterns, and reusable UI foundations across enterprise modules.",
      "Built reusable Angular UI capabilities for dynamic forms, data tables, pagination, attachments, and activity history.",
      "Implemented CRM/BPM workflows covering transaction inboxes, task management, customer flows, and business-process interactions.",
      "Integrated frontend modules with Java Spring Boot microservices and Oracle/PostgreSQL data flows for enterprise operations.",
      "Implemented CI/CD pipelines with Jenkins, Docker, and Kubernetes for builds, image publishing, configuration, and multi-environment deployments.",
      "Supported on-premises infrastructure with Kubernetes clusters, ingress, registries, monitoring, and production troubleshooting.",
      "Developed Angular modules integrating Zalo Official Account features, message conversation management, template administration, filtering, and Spring Boot REST APIs."
    ],
    contributionsVi: [
      "Thiết kế và duy trì kiến trúc Angular Micro-Frontend, thư viện dùng chung, chuẩn định tuyến và nền tảng UI tái sử dụng xuyên suốt các phân hệ doanh nghiệp.",
      "Xây dựng các component UI Angular dùng chung cho biểu mẫu động (dynamic forms), bảng dữ liệu, phân trang, tệp đính kèm và lịch sử hoạt động.",
      "Phát triển các luồng quy trình CRM/BPM bao gồm hộp thư giao dịch, quản lý tác vụ, luồng khách hàng và tương tác quy trình doanh nghiệp.",
      "Tích hợp các module frontend với microservices Java Spring Boot và luồng dữ liệu Oracle/PostgreSQL cho hoạt động vận hành.",
      "Xây dựng pipeline CI/CD với Jenkins, Docker và Kubernetes để tự động hóa build, xuất bản image, cấu hình và triển khai đa môi trường.",
      "Vận hành hạ tầng on-premises với cụm Kubernetes, ingress, registry, giám sát và xử lý sự cố môi trường production.",
      "Phát triển module Angular tích hợp tính năng Zalo Official Account, quản lý hội thoại tin nhắn, quản trị mẫu tin nhắn, lọc trạng thái và REST API Spring Boot."
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
    location: "Hanoi, Vietnam",
    locationVi: "Hà Nội, Việt Nam",
    type: "Full-time",
    typeVi: "Chính thức",
    summary: "Developed and optimized learner-facing web applications for Japanese & Chinese language learning platforms using Next.js, React, and TypeScript.",
    summaryVi: "Phát triển và tối ưu hóa ứng dụng web học tiếng Nhật & tiếng Trung hướng người học trên nền tảng Next.js, React và TypeScript.",
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
        capabilities: ["Micro-frontends", "Nx Monorepos", "RxJS", "Dynamic Forms", "Shared UI Libs"],
        capabilitiesVi: ["Micro-frontends", "Nx Monorepo", "RxJS", "Biểu mẫu động", "Thư viện UI dùng chung"]
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
    taglineVi: "API tải cao, kết nối luồng sự kiện và tích hợp doanh nghiệp",
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
    description: "Nx Monorepos, Declarative Pipelines & K8s",
    descriptionVi: "Nx Monorepo, Pipeline tự động & K8s"
  }
];
