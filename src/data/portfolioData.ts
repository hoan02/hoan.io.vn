import { Project, ExperienceItem, TechCategory, BentoStat } from "@/types";

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
  location: "Hanoi, Vietnam • Available Worldwide (Remote / Hybrid)",
  locationVi: "Hà Nội, Việt Nam • Sẵn sàng làm việc (Remote / Hybrid)",
  status: "Open for high-impact roles & architectural consulting",
  statusVi: "Sẵn sàng cho các dự án lớn & tư vấn kiến trúc",
  roleTagline: "Architecting Angular micro-frontends, Spring Boot microservices & cloud-native deployments.",
  roleTaglineVi: "Kiến trúc Angular micro-frontends, Java Spring Boot microservices & triển khai Cloud-Native.",
  bio: "Full-stack Developer with extensive experience building enterprise automation and EdTech web applications using Angular, Next.js, TypeScript, and Java Spring Boot. Specialized in micro-frontend architecture, high-scale database workflows (Oracle, PostgreSQL), CI/CD pipelines, and Kubernetes deployment.",
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
    longDescription: "EPAS is a comprehensive enterprise process automation system. Led the frontend architecture using Angular Micro-frontends (NX monorepo), standardizing routing and reusable UI capabilities across enterprise modules. Integrated with Spring Boot microservices and Oracle/PostgreSQL data flows, with automated CI/CD pipelines deploying to on-premises Kubernetes clusters.",
    longDescriptionVi: "EPAS là nền tảng tự động hóa quy trình nghiệp vụ toàn diện cho doanh nghiệp. Thiết kế kiến trúc Angular Micro-Frontend với NX monorepo, chuẩn hóa luồng định tuyến và các component UI dùng chung. Tích hợp chặt chẽ với backend Java Spring Boot, CSDL Oracle/PostgreSQL, bảo mật Keycloak, luồng thông điệp Kafka và triển khai tự động qua Kubernetes / Jenkins.",
    role: "Fullstack Developer (NGV Group)",
    roleVi: "Kỹ sư Fullstack (NGV Group)",
    year: "12/2024 – Present",
    techStack: ["Angular", "Micro-Frontend", "Java Spring Boot", "Oracle", "PostgreSQL", "Kafka", "Redis", "Keycloak", "Kubernetes", "Docker", "Jenkins"],
    category: "Full-stack",
    categoryVi: "Full-stack",
    metrics: [
      "Standardized UI libraries & routing across multiple enterprise modules",
      "End-to-end CI/CD build & image publishing with Jenkins & Kubernetes",
      "Production-ready RBAC security with Keycloak & Zero-downtime rollouts"
    ],
    metricsVi: [
      "Chuẩn hóa thư viện giao diện và định tuyến xuyên suốt các phân hệ doanh nghiệp",
      "Tự động hóa toàn diện quy trình build & đóng gói image với Jenkins & Kubernetes",
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
    id: "zalo-oa-messaging-platform",
    title: "Zalo OA Integration & Message Management Platform",
    titleVi: "Nền tảng Tích hợp Zalo Official Account & Quản lý Tin nhắn",
    subtitle: "Enterprise communication and conversation management module",
    subtitleVi: "Phân hệ quản lý hội thoại, tin nhắn và tích hợp Zalo Official Account cho doanh nghiệp",
    description: "Developed Angular modules integrating Zalo Official Account features, message conversation management, template administration, filtering, status tracking, and Spring Boot REST APIs.",
    descriptionVi: "Phát triển các module Angular tích hợp tính năng Zalo Official Account, quản lý hội thoại tin nhắn, quản trị mẫu tin, lọc trạng thái và kết nối REST API Spring Boot.",
    longDescription: "Engineered responsive conversation interfaces with conversation inbox, message templates, status tracking, pagination, and real-time interaction capabilities. Collaborated closely with BA, Backend, and QA to deliver production-ready business communication tools.",
    longDescriptionVi: "Xây dựng giao diện quản lý hội thoại đa kênh, mẫu tin nhắn tự động, theo dõi trạng thái gửi, phân trang và xử lý dữ liệu lớn. Phối hợp với BA, Backend và QA để bàn giao tính năng vận hành ổn định trên môi trường thực tế.",
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
    descriptionVi: "Phát triển và duy trì ứng dụng web học ngoại ngữ cho hàng ngàn học viên với Next.js, React và TypeScript. Tối ưu hóa rendering, tài nguyên, cấu trúc trang, SEO và chuẩn hóa component tái sử dụng.",
    longDescription: "Standardized modern Next.js architecture, upgraded framework dependencies, and solved critical technical rendering issues. Significantly improved SEO rankings and Core Web Vitals through asset preloading, image optimization, and responsive design.",
    longDescriptionVi: "Chuẩn hóa kiến trúc Next.js hiện đại, nâng cấp framework và tối ưu hóa hiệu năng render. Cải thiện mạnh mẽ thứ hạng SEO và chỉ số Core Web Vitals thông qua tối ưu tài nguyên, nén hình ảnh và thiết kế tương thích mọi thiết bị.",
    role: "Frontend Developer (MochiMochi)",
    roleVi: "Kỹ sư Frontend (MochiMochi)",
    year: "03/2024 – 08/2024",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SEO Optimization", "SSR"],
    category: "Frontend",
    categoryVi: "Frontend",
    metrics: [
      "High Lighthouse performance & Core Web Vitals score",
      "Significant organic SEO traffic boost through semantic metadata and SSR",
      "Standardized reusable component library cutting development lead time"
    ],
    metricsVi: [
      "Tối ưu điểm số hiệu năng Lighthouse & Core Web Vitals xuất sắc",
      "Tăng trưởng lượng truy cập SEO tự nhiên nhờ cấu trúc thẻ metadata và SSR",
      "Chuẩn hóa thư viện component tái sử dụng giúp tăng tốc độ phát triển tính năng"
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
    featured: true,
    image: "/images/projects/analytics.svg",
    accentColor: "#818cf8",
  },
  {
    id: "devops-k8s-infrastructure",
    title: "Enterprise CI/CD & Kubernetes Multi-Environment Infrastructure",
    titleVi: "Hạ tầng CI/CD & Cụm Kubernetes Đa Môi trường",
    subtitle: "Automated container builds, registry management, ingress, and monitoring",
    subtitleVi: "Tự động hóa build container, quản lý registry, ingress và giám sát cụm máy chủ",
    description: "Configured and maintained on-premises Kubernetes clusters, Jenkins pipelines, Docker builds, image publishing, ingress routing, registries, and production monitoring.",
    descriptionVi: "Cấu hình và vận hành cụm Kubernetes on-premises, pipeline Jenkins, đóng gói Docker, registry nội bộ, ingress routing và giám sát sản xuất.",
    longDescription: "Implemented end-to-end automated deployment workflows from code commit to containerized rollout. Managed ingress controllers, secret management, container registries, and troubleshooting across staging and production environments.",
    longDescriptionVi: "Thiết lập quy trình triển khai tự động từ commit mã nguồn đến phát hành container trên cụm Kubernetes. Quản lý ingress controller, cấu hình secret, registry lưu trữ image và xử lý sự cố hạ tầng sản xuất.",
    role: "DevOps & Infrastructure",
    roleVi: "DevOps & Hạ tầng Kỹ thuật",
    year: "2024 – Present",
    techStack: ["Kubernetes", "Docker", "Jenkins", "CI/CD", "Linux", "Postman", "Git"],
    category: "DevOps & Cloud",
    categoryVi: "DevOps & Cloud",
    metrics: [
      "Automated build and image publishing pipeline across multi-environments",
      "High availability and self-healing container infrastructure with Kubernetes",
      "Zero-downtime deployments with rolling update strategies"
    ],
    metricsVi: [
      "Quy trình tự động hóa build & xuất bản image trên nhiều môi trường",
      "Hạ tầng container tự phục hồi độ sẵn sàng cao với Kubernetes",
      "Phát hành cập nhật zero-downtime với chiến lược rolling update"
    ],
    architecture: [
      "Jenkins declarative pipelines with multi-stage Docker builds",
      "Kubernetes deployments, services, ingress controllers, and config maps",
      "On-premises container registry and health check probes"
    ],
    architectureVi: [
      "Pipeline Jenkins declarative kết hợp build Docker đa giai đoạn",
      "Quản lý Kubernetes deployments, services, ingress và config maps",
      "Hệ thống registry nội bộ và các probe kiểm tra sức khỏe dịch vụ"
    ],
    liveUrl: "#contact",
    githubUrl: "https://github.com/hoan02",
    featured: false,
    image: "/images/projects/devops.svg",
    accentColor: "#f59e0b",
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
      "Improved performance and SEO through rendering and asset optimization, page structure, and metadata improvements.",
      "Refactored legacy code, upgraded framework and dependencies, and standardized reusable components to improve maintainability and development velocity."
    ],
    contributionsVi: [
      "Phát triển và duy trì ứng dụng web học tiếng Nhật và tiếng Trung hướng học viên sử dụng Next.js.",
      "Tối ưu hóa hiệu năng và chuẩn SEO thông qua cải tiến cơ chế rendering, tối ưu tài nguyên tĩnh, cấu trúc trang và thẻ metadata.",
      "Tái cấu trúc mã nguồn cũ, nâng cấp phiên bản framework và thư viện, chuẩn hóa các component dùng chung nhằm tăng tốc độ phát triển."
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SEO", "Responsive UI"]
  }
];

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Frontend Engineering",
    titleVi: "Kỹ thuật Frontend",
    tagline: "Modern, reactive, and enterprise-scale architectures",
    taglineVi: "Giao diện hiện đại, phản ứng nhanh và kiến trúc Micro-Frontend",
    items: [
      { name: "Angular", level: "Advanced", highlight: true, description: "Micro-Frontend, Shared Libraries, Dynamic Forms, Routing & RxJS", descriptionVi: "Micro-Frontend, Thư viện dùng chung, Biểu mẫu động & RxJS" },
      { name: "Next.js", level: "Advanced", highlight: true, description: "App Router, SSR, SSG, SEO & Asset Optimization", descriptionVi: "App Router, SSR, SSG, SEO & Tối ưu hóa tài nguyên" },
      { name: "TypeScript / JavaScript", level: "Advanced", highlight: true, description: "Strict typing, complex generics & design patterns", descriptionVi: "Kiểu tĩnh nghiêm ngặt, generics & mẫu thiết kế" },
      { name: "React", level: "Advanced", highlight: false, description: "Component lifecycle, state hooks & modular UI", descriptionVi: "Component lifecycle, custom hooks & module hóa UI" },
      { name: "CSS / SCSS / Tailwind", level: "Advanced", highlight: false, description: "Responsive layouts, Bootstrap, Tailwind & animations", descriptionVi: "Layout đa màn hình, Bootstrap, Tailwind & animation" }
    ]
  },
  {
    title: "Backend & Microservices",
    titleVi: "Backend & Dịch vụ Microservices",
    tagline: "High-throughput APIs and enterprise integrations",
    taglineVi: "API tải cao, kết nối luồng sự kiện và tích hợp doanh nghiệp",
    items: [
      { name: "Java / Spring Boot", level: "Advanced", highlight: true, description: "Microservices, REST APIs, Security & BPM integration", descriptionVi: "Microservices, REST API, Bảo mật & tích hợp BPM/CRM" },
      { name: "Node.js", level: "Proficient", highlight: false, description: "Asynchronous backend services and runtime scripting", descriptionVi: "Xây dựng dịch vụ bất đồng bộ và script tự động hóa" },
      { name: "Apache Kafka", level: "Proficient", highlight: false, description: "Event streaming and asynchronous message queues", descriptionVi: "Luồng sự kiện phân tán và hàng đợi thông điệp" },
      { name: "Keycloak & Minio", level: "Proficient", highlight: false, description: "Identity / Access Management (IAM) & Object Storage", descriptionVi: "Quản lý định danh xác thực IAM & Lưu trữ Object Storage" }
    ]
  },
  {
    title: "Databases & In-Memory Storage",
    titleVi: "Cơ sở Dữ liệu & Lưu trữ",
    tagline: "Relational integrity, SQL tuning, and distributed cache",
    taglineVi: "Toàn vẹn dữ liệu quan hệ, tinh chỉnh SQL và bộ nhớ đệm",
    items: [
      { name: "Oracle Database", level: "Advanced", highlight: true, description: "Enterprise schemas, SQL optimization & data flows", descriptionVi: "Lược đồ doanh nghiệp, tối ưu SQL & luồng dữ liệu" },
      { name: "PostgreSQL", level: "Advanced", highlight: true, description: "Relational schemas, queries, indexing & connection pools", descriptionVi: "Lược đồ quan hệ, truy vấn, indexing & connection pools" },
      { name: "Redis", level: "Advanced", highlight: false, description: "In-memory caching, session store & distributed locking", descriptionVi: "Bộ nhớ đệm in-memory, lưu trữ session & khóa phân tán" }
    ]
  },
  {
    title: "DevOps & Cloud-Native",
    titleVi: "DevOps & Hạ tầng Cloud-Native",
    tagline: "Automated CI/CD pipelines, containerization, and K8s orchestration",
    taglineVi: "Quy trình CI/CD tự động, đóng gói container và điều phối K8s",
    items: [
      { name: "Kubernetes", level: "Advanced", highlight: true, description: "Clusters, Ingress routing, Deployments, Services & Troubleshooting", descriptionVi: "Quản trị cụm, Ingress, Deployments, Services & Xử lý sự cố" },
      { name: "Docker", level: "Advanced", highlight: true, description: "Multi-stage builds, container packaging & registries", descriptionVi: "Build đa tầng tối ưu, đóng gói container & quản lý registry" },
      { name: "Jenkins & CI/CD", level: "Advanced", highlight: true, description: "Automated pipeline builds, image publishing & multi-env deploy", descriptionVi: "Pipeline tự động build, xuất bản image & triển khai đa môi trường" },
      { name: "Git / Linux / Postman", level: "Advanced", highlight: false, description: "Version control, Linux server administration & API testing", descriptionVi: "Quản lý mã nguồn, quản trị máy chủ Linux & kiểm thử API" }
    ]
  }
];

export const BENTO_STATS: BentoStat[] = [
  {
    label: "Professional Experience",
    labelVi: "Kinh nghiệm Thực chiến",
    value: "3+ Yrs",
    description: "Enterprise Process Automation & EdTech Platforms",
    descriptionVi: "Tự động hóa Doanh nghiệp & Nền tảng EdTech"
  },
  {
    label: "Education Qualification",
    labelVi: "Trình độ Học vấn",
    value: "UTC Eng.",
    description: "Engineer in IT • Graduated with Distinction",
    descriptionVi: "Kỹ sư CNTT • ĐH Giao thông Vận tải (Loại Giỏi)"
  },
  {
    label: "Full-Stack Breadth",
    labelVi: "Năng lực Toàn diện",
    value: "100%",
    description: "Angular Micro-Frontend, Spring Boot, K8s & CI/CD",
    descriptionVi: "Angular Micro-Frontend, Spring Boot, K8s & CI/CD"
  },
  {
    label: "Code & Build Velocity",
    labelVi: "Tốc độ Phát triển",
    value: "High",
    description: "Automated CI/CD & Standardized Design Libraries",
    descriptionVi: "CI/CD tự động & Thư viện UI chuẩn hóa"
  }
];
