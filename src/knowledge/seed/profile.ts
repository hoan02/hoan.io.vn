import { Profile } from "../types";

export const SEED_PROFILE: Profile = {
  fullName: "Lê Công Hoan",
  fullNameVi: "Lê Công Hoan",
  displayName: "Hoan",
  birthday: "02/04/2002",
  birthYear: 2002,
  age: 24,
  location: "Hà Nội, Việt Nam",
  headline: "Full-stack Developer & System Builder",
  summary:
    "Kỹ sư Công nghệ Thông tin tốt nghiệp loại Giỏi tại Đại học Giao thông Vận tải (UTC). Chuyên môn sâu về kiến trúc Frontend (Angular Micro-Frontend, Next.js), Backend Microservices (Go, Java Spring Boot), hệ thống phân tán (gRPC, NATS JetStream), và hạ tầng Cloud-native/DevOps (Kubernetes/K3s, GitOps ArgoCD, Docker).",
  email: "lehoan.dev@gmail.com",
  phone: "(+84) 0358 069 992",
  cvUrl: "/cv.pdf",
  website: "https://hoan.io.vn",
  hobbies: [
    "Homelab & Tự vận hành hạ tầng máy chủ (Self-hosting K3s/Proxmox)",
    "Nghiên cứu kiến trúc hệ thống phân tán & vi dịch vụ",
    "Phát triển các dự án mã nguồn mở (Arda Labs, Puchidemy, CamRelay, B4S)",
    "Thử nghiệm công nghệ mới & tối ưu hiệu năng",
  ],
  interests: [
    "Software Architecture",
    "Micro-Frontends & Module Federation",
    "Distributed Systems & Event-driven Architecture",
    "Kubernetes & Cloud-native Infrastructure",
    "Developer Tooling & DevOps",
    "IoT & Low-level Systems (Rust, Tauri v2)",
  ],
  socialLinks: [
    { name: "GitHub", url: "https://github.com/hoan02" },
    { name: "LinkedIn", url: "https://linkedin.com/in/hoan02" },
    { name: "Facebook", url: "https://facebook.com/hoan02" },
  ],
  openSourceOrganizations: [
    {
      name: "ARDA Labs",
      github: "https://github.com/arda-labs",
      website: "https://arda.io.vn",
      description:
        "Nền tảng FinOps & Enterprise SaaS đa người dùng với 9 Go microservices (gRPC/NATS), React Module Federation (7 remotes), và Ory Kratos/Hydra IAM trên cụm 3-node K3s.",
    },
    {
      name: "Puchidemy",
      github: "https://github.com/puchidemy",
      website: "https://puchi.io.vn",
      description:
        "Nền tảng học ngôn ngữ tương tác với Next.js PWA, 5 Go microservices (Kratos v3), Limen Auth, NATS event bus, và GitOps ArgoCD trên K3s.",
    },
  ],
};
