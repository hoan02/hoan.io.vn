import { AIResponse } from "@/types";

export interface AIKnowledgeEntry {
  id: string;
  keywords: string[];
  patterns: RegExp[];
  responseEn: AIResponse;
  responseVi: AIResponse;
}

export interface PromptItem {
  badge: string;
  text: string;
}

export interface PromptCategory {
  categoryEn: string;
  categoryVi: string;
  promptsEn: PromptItem[];
  promptsVi: PromptItem[];
}

export const CATEGORIZED_PROMPTS: PromptCategory[] = [
  {
    categoryEn: "Featured Work",
    categoryVi: "Dự án Tiêu biểu",
    promptsEn: [
      { badge: "EPAS System", text: "What does Hoan work on in EPAS, and what kind of enterprise workflows does it support?" },
      { badge: "Puchi Platform", text: "How did Hoan architect Puchidemy with 5 Go microservices?" },
      { badge: "Proxmox Homelab", text: "Tell me about his ThinkCentre Proxmox homelab and three Ubuntu 26 K3s VMs." }
    ],
    promptsVi: [
      { badge: "Hệ thống EPAS", text: "Hoan làm gì trong EPAS và hệ thống này hỗ trợ những quy trình enterprise nào?" },
      { badge: "Nền tảng Puchi", text: "Hoan đã thiết kế hệ thống Puchidemy với 5 Go microservices ra sao?" },
      { badge: "Homelab Proxmox", text: "Homelab ThinkCentre Proxmox và 3 VM Ubuntu 26 chạy K3s của Hoan ra sao?" }
    ]
  },
  {
    categoryEn: "Tech Stack",
    categoryVi: "Kỹ năng Chuyên môn",
    promptsEn: [
      { badge: "Angular & RxJS", text: "Show me his Angular Micro-Frontend experience." },
      { badge: "Spring Boot & DB", text: "What are his Java Spring Boot & Oracle/PostgreSQL skills?" },
      { badge: "CI/CD & Jenkins", text: "How does Hoan build automated CI/CD pipelines?" }
    ],
    promptsVi: [
      { badge: "Angular & RxJS", text: "Kinh nghiệm Angular Micro-Frontend & RxJS của Hoan?" },
      { badge: "Spring Boot & DB", text: "Kinh nghiệm Java Spring Boot và tối ưu Oracle/PostgreSQL?" },
      { badge: "CI/CD Jenkins", text: "Hoan xây dựng pipeline CI/CD tự động như thế nào?" }
    ]
  },
  {
    categoryEn: "Education & Notes",
    categoryVi: "Học vấn & Bài viết",
    promptsEn: [
      { badge: "UTC Engineer", text: "What is his educational background and degree honors?" },
      { badge: "Tech Notes", text: "What engineering notes has Hoan published on /writing?" }
    ],
    promptsVi: [
      { badge: "Kỹ sư UTC", text: "Học vấn và bằng tốt nghiệp loại Giỏi của Hoan tại UTC?" },
      { badge: "Bài viết /writing", text: "Hoan đã chia sẻ những bài viết kỹ thuật nào trên /writing?" }
    ]
  },
  {
    categoryEn: "Personal & Contact",
    categoryVi: "Cá nhân & Liên hệ",
    promptsEn: [
      { badge: "Birthday & Age", text: "When was Hoan born and what are his hobbies?" },
      { badge: "Download CV", text: "How can I download his CV or contact him directly?" }
    ],
    promptsVi: [
      { badge: "Ngày sinh & Tuổi", text: "Hoan sinh ngày bao nhiêu và có sở thích gì?" },
      { badge: "Tải CV / Liên hệ", text: "Làm sao để tải CV hoặc liên hệ trực tiếp với Hoan?" }
    ]
  }
];

export const SUGGESTED_PROMPTS_EN = CATEGORIZED_PROMPTS.flatMap((c) => c.promptsEn.map((p) => p.text));
export const SUGGESTED_PROMPTS_VI = CATEGORIZED_PROMPTS.flatMap((c) => c.promptsVi.map((p) => p.text));

export const AI_KNOWLEDGE_BASE: AIKnowledgeEntry[] = [
  {
    id: "epas-project",
    keywords: ["epas", "ngv", "ngv group", "strongest", "best", "highlight", "main project", "top project", "dự án tốt nhất", "dự án nổi bật", "tự động hóa", "bpm", "crm"],
    patterns: [/epas/i, /ngv\s*group/i, /strongest/i, /best\s+project/i, /dự\s*án\s*nổi\s*bật/i, /dự\s*án\s*chính/i],
    responseEn: {
      answer: `Hoan's flagship enterprise project is **EPAS (Enterprise Process Automation System)** at NGV Group. It is used across multiple credit institutions, including central-level organizations and People's Credit Funds, to coordinate lending, appraisal and approval, disbursement, post-disbursement operations, transaction handling, and operational or compliance reporting.
• **Frontend Architecture**: Built Angular Micro-Frontend foundations, shared UI libraries, dynamic forms, data tables, pagination, and transaction inboxes. The project started with Nx and later moved away from it after the frontend structure was redesigned for more flexibility.
• **Enterprise Contracts**: Integrated frontend flows with Java Spring Boot services, Oracle/PostgreSQL data contracts, Redis/Kafka infrastructure, and Keycloak-based access control.
• **Delivery**: Supported Jenkins, Docker, and private Kubernetes delivery without exposing customer data or regulated figures publicly.`,
      relatedTopic: "Projects & Architecture",
      tags: ["Angular", "Micro-Frontend", "Spring Boot", "Kafka", "Oracle", "Kubernetes", "Jenkins"],
      relevantLinks: [
        { label: "View EPAS Project", url: "#selected-work" },
        { label: "View Experience at NGV Group", url: "#experience" }
      ]
    },
    responseVi: {
      answer: `Dự án enterprise tiêu biểu nhất của Hoan là **EPAS (Enterprise Process Automation System)** tại NGV Group. Hệ thống được sử dụng tại nhiều tổ chức tín dụng, gồm các đơn vị cấp trung ương và quỹ tín dụng nhân dân, để điều phối quy trình cho vay, thẩm định/phê duyệt, giải ngân, nghiệp vụ sau giải ngân, xử lý giao dịch và báo cáo vận hành/tuân thủ.
• **Kiến trúc Frontend**: Xây dựng Angular Micro-Frontend, thư viện UI dùng chung, dynamic forms, bảng dữ liệu, phân trang và transaction inbox. Dự án ban đầu dùng Nx, sau đó được tái cấu trúc và loại bỏ Nx để frontend linh động hơn.
• **Contract Enterprise**: Tích hợp luồng frontend với Java Spring Boot, dữ liệu Oracle/PostgreSQL, Redis/Kafka và phân quyền qua Keycloak.
• **Delivery**: Hỗ trợ Jenkins, Docker và Kubernetes private; không công khai dữ liệu khách hàng hoặc số liệu tuân thủ nhạy cảm.`,
      relatedTopic: "Dự án Nổi bật",
      tags: ["Angular", "Micro-Frontend", "Spring Boot", "Kafka", "Oracle", "Kubernetes", "Jenkins"],
      relevantLinks: [
        { label: "Xem Dự án EPAS", url: "#selected-work" },
        { label: "Xem Kinh nghiệm tại NGV Group", url: "#experience" }
      ]
    }
  },
  {
    id: "angular-experience",
    keywords: ["angular", "frontend", "microfrontend", "micro-frontend", "shared library", "dynamic form", "rxjs"],
    patterns: [/angular/i, /micro-?frontend/i, /kinh\s*nghiệm\s*angular/i, /giao\s*diện/i],
    responseEn: {
      answer: `Hoan has deep production experience with **Angular & Micro-Frontend architecture**:
• Standardized shared design libraries, routing, dynamic forms, data tables, and pagination for enterprise systems.
• Built Zalo Official Account message management and CRM/BPM workflow interfaces.
• Developed with TypeScript, reactive RxJS streams, and a flexible module delivery structure; Nx was used during the early EPAS foundation and later removed.`,
      relatedTopic: "Frontend Tech Stack",
      tags: ["Angular", "Micro-Frontend", "TypeScript", "RxJS", "EPAS"],
      relevantLinks: [
        { label: "Inspect Tech Stack", url: "#tech-stack" },
        { label: "View EPAS Project", url: "#selected-work" }
      ]
    },
    responseVi: {
      answer: `Hoan có kinh nghiệm chuyên sâu với **Angular & Kiến trúc Micro-Frontend**:
• Chuẩn hóa thư viện giao diện dùng chung, cơ chế định tuyến, biểu mẫu động (dynamic forms) và bảng dữ liệu cho hệ thống doanh nghiệp.
• Xây dựng phân hệ quản lý hội thoại Zalo Official Account và luồng quy trình CRM/BPM.
• Sử dụng TypeScript, RxJS reactive patterns và đã tham gia tái cấu trúc từ nền tảng Nx ban đầu sang mô hình module delivery linh động hơn.`,
      relatedTopic: "Kỹ năng Frontend",
      tags: ["Angular", "Micro-Frontend", "TypeScript", "RxJS", "EPAS"],
      relevantLinks: [
        { label: "Xem Tech Stack", url: "#tech-stack" },
        { label: "Xem Dự án EPAS", url: "#selected-work" }
      ]
    }
  },
  {
    id: "kubernetes-devops",
    keywords: ["kubernetes", "k8s", "docker", "devops", "ci/cd", "jenkins", "ingress", "registry"],
    patterns: [/kubernetes/i, /k8s/i, /docker/i, /devops/i, /jenkins/i, /ci\/cd/i, /triển\s*khai/i, /hạ\s*tầng/i],
    responseEn: {
      answer: `Hoan possesses solid hands-on DevOps & Cloud-Native skills:
• **CI/CD Automation**: Designed Jenkins declarative pipelines for automated container builds, testing, and multi-environment publishing.
• **Kubernetes Infrastructure**: Runs a current personal lab with one ThinkCentre host, Proxmox, three Ubuntu 26 VMs, K3s, Ingress routing, Longhorn storage, container registries, and delivery troubleshooting.
• **Docker**: Multi-stage production container image optimization.`,
      relatedTopic: "DevOps & Cloud-Native",
      tags: ["Kubernetes", "Docker", "Jenkins", "CI/CD", "Linux"],
      relevantLinks: [
        { label: "DevOps Tech Stack", url: "#tech-stack" }
      ]
    },
    responseVi: {
      answer: `Hoan có kinh nghiệm thực chiến vững chắc về DevOps & Cloud-Native:
• **Tự động hóa CI/CD**: Xây dựng pipeline Jenkins declarative tự động build, kiểm thử và xuất bản image cho nhiều môi trường.
• **Hạ tầng Kubernetes**: Vận hành homelab gồm một máy ThinkCentre chạy Proxmox, 3 VM Ubuntu 26, K3s, Ingress, Longhorn, registry nội bộ, giám sát và xử lý sự cố.
• **Docker**: Đóng gói Docker build đa giai đoạn (multi-stage) tối ưu dung lượng và bảo mật.`,
      relatedTopic: "DevOps & Cloud-Native",
      tags: ["Kubernetes", "Docker", "Jenkins", "CI/CD", "Linux"],
      relevantLinks: [
        { label: "Xem Năng lực DevOps", url: "#tech-stack" }
      ]
    }
  },
  {
    id: "age-birthday",
    keywords: ["age", "birthday", "birth", "year", "born", "tuổi", "sinh", "sinh năm", "ngày sinh", "bao nhiêu tuổi", "sinh ngày"],
    patterns: [/tuổi/i, /sinh\s*ngày/i, /sinh\s*năm/i, /ngày\s*sinh/i, /bao\s*nhiêu\s*tuổi/i, /birthday/i, /born/i, /age/i],
    responseEn: {
      answer: `Hoan was born on **April 2, 2002 (02/04/2002)** and is currently **24 years old**. He is based in Hanoi, Vietnam.`,
      relatedTopic: "Personal Info",
      tags: ["Age", "Birthday", "Hanoi, Vietnam"],
      relevantLinks: [
        { label: "View About", url: "/#about" },
        { label: "Get in Touch", url: "/#contact" }
      ]
    },
    responseVi: {
      answer: `Hoan sinh ngày **02/04/2002**, hiện **24 tuổi**. Hoan đang sinh sống và làm việc tại Hà Nội, Việt Nam.`,
      relatedTopic: "Thông tin Cá nhân",
      tags: ["Tuổi", "Ngày sinh", "Hà Nội"],
      relevantLinks: [
        { label: "Xem Giới thiệu", url: "/#about" },
        { label: "Liên hệ Hoan", url: "/#contact" }
      ]
    }
  },
  {
    id: "hobbies-interests",
    keywords: ["hobby", "hobbies", "interest", "interests", "free time", "thích", "sở thích", "làm gì khi rảnh", "đam mê"],
    patterns: [/sở\s*thích/i, /thích\s*làm\s*gì/i, /rảnh/i, /hobb/i, /interest/i, /đam\s*mê/i],
    responseEn: {
      answer: `Outside of commercial development, Hoan enjoys **homelab tinkering & self-hosting**, building side projects, exploring new cloud/web tech stacks, and system architecture experiments.`,
      relatedTopic: "Hobbies & Interests",
      tags: ["Homelab", "Self-hosting", "Side Projects", "System Architecture"],
      relevantLinks: [
        { label: "Read Homelab Note", url: "/writing/homelab-thinkcentre-proxmox-k3s" },
        { label: "Engineering Notes", url: "/writing" }
      ]
    },
    responseVi: {
      answer: `Ngoài công việc phát triển dự án, Hoan khá thích **mày mò dựng Homelab & self-hosting**, xây dựng các side project, thử nghiệm các công nghệ web/cloud mới và tối ưu kiến trúc hệ thống.`,
      relatedTopic: "Sở thích Cá nhân",
      tags: ["Homelab", "Self-hosting", "Side Projects", "Kiến trúc Hệ thống"],
      relevantLinks: [
        { label: "Xem Bài viết Homelab", url: "/writing/homelab-thinkcentre-proxmox-k3s" },
        { label: "Engineering Notes", url: "/writing" }
      ]
    }
  },
  {
    id: "education-degree",
    keywords: ["education", "university", "utc", "degree", "school", "học vấn", "bằng cấp", "đại học", "giao thông vận tải"],
    patterns: [/education/i, /university/i, /học\s*vấn/i, /bằng\s*cấp/i, /đại\s*học/i, /trường/i, /utc/i],
    responseEn: {
      answer: `Hoan graduated with a **Degree of Engineer in Information Technology** from the **University of Transport and Communications (UTC)** (10/2020 – 08/2024), **Graduating with Distinction (Tốt nghiệp loại Giỏi)**.`,
      relatedTopic: "Education & Degree",
      tags: ["Engineer in IT", "University of Transport and Communications", "Graduated with Distinction"],
      relevantLinks: [
        { label: "Download CV", url: "/cv/Le_Cong_Hoan_CV.pdf" },
        { label: "View About", url: "#about" }
      ]
    },
    responseVi: {
      answer: `Hoan tốt nghiệp **Kỹ sư Công nghệ Thông tin** tại **Trường Đại học Giao thông Vận tải (UTC)** (10/2020 – 08/2024) và **Tốt nghiệp loại Giỏi (Graduated with Distinction)**.`,
      relatedTopic: "Trình độ Học vấn",
      tags: ["Kỹ sư CNTT", "Đại học Giao thông Vận tải", "Tốt nghiệp loại Giỏi"],
      relevantLinks: [
        { label: "Tải CV PDF", url: "/cv/Le_Cong_Hoan_CV.pdf" },
        { label: "Xem Giới thiệu", url: "#about" }
      ]
    }
  },
  {
    id: "work-history-companies",
    keywords: ["company", "companies", "experience", "ngv", "mochimochi", "lịch sử", "kinh nghiệm", "quá trình"],
    patterns: [/companies/i, /ngv/i, /mochimochi/i, /kinh\s*nghiệm\s*làm\s*việc/i],
    responseEn: {
      answer: `Hoan's career journey includes:
1. **NGV Group** (12/2024 – Present) — *Fullstack Developer*: Architecting EPAS Angular micro-frontends, Java Spring Boot microservices, Zalo OA module, Kafka, Oracle/PostgreSQL, and Kubernetes CI/CD.
2. **MochiMochi** (03/2024 – 08/2024) — *Frontend Developer*: Developed Next.js / React language learning platforms, optimizing rendering performance, metadata, and organic SEO.`,
      relatedTopic: "Work Experience",
      tags: ["NGV Group", "MochiMochi", "Fullstack Developer", "Frontend Developer"],
      relevantLinks: [
        { label: "View Experience Timeline", url: "#experience" }
      ]
    },
    responseVi: {
      answer: `Quá trình công tác của Hoan gồm:
1. **NGV Group** (12/2024 – Hiện tại) — *Kỹ sư Fullstack*: Phát triển nền tảng EPAS trên kiến trúc Angular Micro-Frontend, Spring Boot microservices, phân hệ Zalo OA, Kafka, Oracle/PostgreSQL và cụm Kubernetes.
2. **MochiMochi** (03/2024 – 08/2024) — *Kỹ sư Frontend*: Xây dựng ứng dụng web học ngoại ngữ với Next.js / React, tối ưu hóa rendering, cấu trúc dữ liệu và thứ hạng SEO.`,
      relatedTopic: "Hành trình Sự nghiệp",
      tags: ["NGV Group", "MochiMochi", "Fullstack", "Frontend"],
      relevantLinks: [
        { label: "Xem Chi tiết Kinh nghiệm", url: "#experience" }
      ]
    }
  },
  {
    id: "contact-hire",
    keywords: ["contact", "hire", "email", "phone", "linkedin", "github", "cv", "resume", "liên hệ", "tuyển", "thuê", "sdt", "số điện thoại"],
    patterns: [/contact/i, /hire/i, /email/i, /phone/i, /liên\s*hệ/i, /cv/i, /resume/i, /sđt/i, /số\s*điện\s*thoại/i],
    responseEn: {
      answer: `You can reach Le Cong Hoan directly via:
• **Email**: lehoan.dev@gmail.com
• **Phone**: 0358 069 992
• **LinkedIn**: linkedin.com/in/hoan02
• **Facebook**: facebook.com/hoanit02
• **GitHub**: github.com/hoan02
• **CV Document**: [Download CV PDF](/cv/Le_Cong_Hoan_CV.pdf)
• **Location**: Hanoi, Vietnam`,
      relatedTopic: "Get in Touch",
      tags: ["Email", "Phone", "LinkedIn", "Facebook", "GitHub", "CV"],
      relevantLinks: [
        { label: "Download CV (PDF)", url: "/cv/Le_Cong_Hoan_CV.pdf" },
        { label: "Go to Contact Section", url: "#contact" }
      ]
    },
    responseVi: {
      answer: `Bạn có thể liên hệ trực tiếp với Lê Công Hoan qua:
• **Email**: lehoan.dev@gmail.com
• **Điện thoại**: 0358 069 992
• **LinkedIn**: linkedin.com/in/hoan02
• **Facebook**: facebook.com/hoanit02
• **GitHub**: github.com/hoan02
• **Hồ sơ CV**: [Tải file CV PDF](/cv/Le_Cong_Hoan_CV.pdf)
• **Địa điểm**: Hà Nội, Việt Nam`,
      relatedTopic: "Liên hệ Trực tiếp",
      tags: ["Email", "Số điện thoại", "LinkedIn", "Facebook", "GitHub", "CV"],
      relevantLinks: [
        { label: "Tải file CV (PDF)", url: "/cv/Le_Cong_Hoan_CV.pdf" },
        { label: "Tới Mục Liên hệ", url: "#contact" }
      ]
    }
  }
];

export function queryAIKnowledgeBase(query: string, lang: "en" | "vi" = "en"): AIResponse {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) {
    return {
      answer: lang === "vi" 
        ? "Vui lòng đặt câu hỏi về dự án EPAS, kinh nghiệm tại NGV Group / MochiMochi, học vấn UTC hoặc tải CV của Lê Công Hoan."
        : "Please ask a question about Hoan's EPAS project, NGV Group / MochiMochi experience, UTC degree, or download his CV."
    };
  }

  const isVi = lang === "vi" || /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(cleanQuery);

  for (const item of AI_KNOWLEDGE_BASE) {
    for (const pattern of item.patterns) {
      if (pattern.test(cleanQuery)) {
        return isVi ? item.responseVi : item.responseEn;
      }
    }
  }

  let bestMatch: AIKnowledgeEntry | null = null;
  let highestScore = 0;

  for (const item of AI_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (cleanQuery.includes(kw.toLowerCase())) {
        score += 2;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore > 0) {
    return isVi ? bestMatch.responseVi : bestMatch.responseEn;
  }

  if (isVi) {
    return {
      answer: `Lê Công Hoan là Full-stack Engineer & System Builder (Tốt nghiệp loại Giỏi ĐH Giao thông Vận tải), chuyên về **nền tảng workflow enterprise, Angular Micro-Frontend, Next.js, Java Spring Boot, Go, hệ thống phân tán, Docker và Kubernetes**.
Hoan hiện phát triển EPAS tại **NGV Group** — nền tảng tự động hóa quy trình cho nhiều tổ chức tín dụng, bao gồm quy trình cho vay, giải ngân, vận hành và báo cáo — đồng thời xây dựng ARDA, Puchi và các dự án hệ thống cá nhân.`,
      relatedTopic: "Hồ sơ Tổng quan",
      tags: ["Full-stack", "NGV Group", "EPAS", "Angular", "Spring Boot", "Kubernetes"],
      relevantLinks: [
        { label: "Xem Dự án EPAS", url: "#selected-work" },
        { label: "Tải file CV (PDF)", url: "/cv/Le_Cong_Hoan_CV.pdf" },
        { label: "Liên hệ Hoan", url: "#contact" }
      ]
    };
  }

  return {
      answer: `Le Cong Hoan is a Full-stack Engineer & System Builder (Graduated with Distinction from UTC) specializing in **enterprise workflow platforms, Angular Micro-Frontends, Next.js, Java Spring Boot, Go, distributed systems, Docker, and Kubernetes**.
He currently develops EPAS at **NGV Group**, a private enterprise process platform supporting complex financial and operational workflows, and builds ARDA, Puchi, and systems projects in parallel.`,
    relatedTopic: "General Profile",
    tags: ["Full-stack", "NGV Group", "EPAS", "Angular", "Spring Boot", "Kubernetes"],
    relevantLinks: [
      { label: "Explore Projects", url: "#selected-work" },
      { label: "Download CV (PDF)", url: "/cv/Le_Cong_Hoan_CV.pdf" },
      { label: "Contact Hoan", url: "#contact" }
    ]
  };
}
