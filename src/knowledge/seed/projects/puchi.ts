import { Project } from "../../types";

export const PUCHI_PROJECT: Project = {
  id: "puchi",
  slug: "puchi",
  name: "Puchidemy Platform",
  organization: "Puchidemy",
  role: "Founder & Full-stack Architect",
  period: "2024 – Hiện tại",
  year: "2024",
  summary:
    "Nền tảng học ngôn ngữ tương tác (Tiếng Việt) với Next.js Progressive Web App (PWA), 5 Go microservices dựa trên Go Kratos v3 framework, hệ thống xác thực Limen Auth, NATS event bus, và GitOps ArgoCD trên K3s.",
  problem:
    "Xây dựng trải nghiệm học tập đa phương tiện (audio streaming, bài học tương tác, theo dõi tiến độ thời gian thực) với kiến trúc microservices nhẹ, chịu tải tốt và chi phí hạ tầng tối ưu.",
  techStack: [
    "Go",
    "Go Kratos v3",
    "Protobuf",
    "NATS",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "PostgreSQL",
    "Valkey",
    "Cloudflare R2",
    "Kubernetes (K3s)",
    "ArgoCD",
    "Limen Auth",
  ],
  domains: ["EdTech", "E-learning", "Microservices", "PWA", "Event-driven", "Audio Streaming"],
  competencies: [
    "Go Microservices with Kratos v3 (Protobuf-first)",
    "Next.js PWA & Audio Caching for Learning Flow",
    "Opaque Session Authentication (Limen Auth)",
    "Object Storage & CDN Integration (Cloudflare R2)",
    "Kubernetes K3s Deployment with ArgoCD GitOps",
  ],
  architecture: [
    "Frontend (puchi-frontend): Next.js PWA với caching âm thanh thông minh, trải nghiệm học tương tác gamified, hỗ trợ offline-ready state.",
    "Backend (puchi-backend): Monorepo chứa 5 Go microservices (auth, core, learn, media, notification) phát triển trên nền Go Kratos v3 framework, giao tiếp đồng bộ qua gRPC và xử lý sự kiện qua NATS.",
    "Hạ tầng & Storage (puchi-infra): Triển khai trên K3s cluster, sử dụng Cloudflare R2 để lưu trữ và stream hàng nghìn audio files bài học với chi phí egress 0 đồng.",
  ],
  challenges: [
    "Tối ưu độ trễ phát âm thanh và kiểm tra tiến độ bài học mà không làm gián đoạn dòng học (learning flow).",
    "Bảo mật phiên đăng nhập và bảo vệ tài nguyên học tập mà không làm tăng overhead xác thực trên client.",
  ],
  solutions: [
    "Tích hợp Cloudflare R2 với presigned URLs và cache worker phía client.",
    "Sử dụng Limen Auth với cơ chế opaque session token lưu trong cookie HttpOnly an toàn chống XSS/CSRF.",
  ],
  outcomes: [
    "Nền tảng chạy ổn định trên hạ tầng K3s tự vận hành với pipeline GitOps tự động hoá 100%.",
  ],
  repositories: [
    { name: "puchi-frontend (Next.js PWA)", url: "https://github.com/puchidemy/puchi-frontend" },
    { name: "puchi-backend (Go Kratos Monorepo)", url: "https://github.com/puchidemy/puchi-backend" },
    { name: "puchi-infra (K3s & ArgoCD Manifests)", url: "https://github.com/puchidemy/puchi-infra" },
  ],
  links: [
    { label: "Puchidemy Organization", url: "https://github.com/puchidemy" },
    { label: "Puchi Website", url: "https://puchi.io.vn" },
    { label: "Đọc bài phân tích kiến trúc Puchi", url: "/writing/puchi-vietnamese-learning-platform-architecture" },
  ],
  evidence: [
    {
      id: "ev-puchi-01",
      type: "github",
      claim: "Kinh nghiệm thực tế với Go Kratos v3 framework & Protobuf",
      statement: "Puchi backend monorepo tổ chức 5 services chuẩn Kratos layout với proto generation và NATS event handler.",
      source: "https://github.com/puchidemy/puchi-backend",
      technologies: ["Go", "Go Kratos", "Protobuf", "NATS"],
      confidence: "verified",
    },
  ],
};
