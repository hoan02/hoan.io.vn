import { Experience } from "../types";

export const SEED_EXPERIENCES: Experience[] = [
  {
    id: "ngv-group",
    company: "NGV Group",
    role: "Full-stack Developer",
    period: "12/2024 – Hiện tại",
    location: "Hà Nội, Việt Nam",
    summary:
      "Phát triển hệ thống lõi tự động hóa quy trình nghiệp vụ (EPAS) phục vụ các tổ chức tài chính/tín dụng ngân hàng, kết hợp Angular Micro-Frontends và Java Spring Boot Microservices.",
    contributions: [
      "Thiết kế và phát triển nền tảng Angular Micro-Frontend phục vụ các module nghiệp vụ phức tạp (thẩm định tín dụng, giải ngân, quản lý giao dịch).",
      "Xây dựng thư viện giao diện dùng chung, dynamic forms engine, bảng dữ liệu hiệu năng cao với khả năng đồng bộ state giữa shell và các remote modules.",
      "Tích hợp và tối ưu hóa các RESTful APIs & contracts với backend Java Spring Boot, Oracle và PostgreSQL.",
      "Xây dựng module tương tác Zalo Official Account (Zalo OA) đa kênh tự động gửi thông báo và chăm sóc khách hàng.",
      "Hỗ trợ triển khai hệ thống trên cụm Kubernetes nội bộ (On-premise K8s), xây dựng quy trình CI/CD tự động bằng Jenkins và Docker.",
    ],
    techStack: [
      "Angular",
      "TypeScript",
      "RxJS",
      "Micro-Frontend",
      "Java Spring Boot",
      "Oracle",
      "PostgreSQL",
      "Kubernetes",
      "Docker",
      "Jenkins",
      "Zalo OA API",
    ],
  },
  {
    id: "mochimochi",
    company: "MochiMochi",
    role: "Frontend Developer",
    period: "03/2024 – 08/2024",
    location: "Hà Nội, Việt Nam",
    summary:
      "Phát triển ứng dụng web học ngoại ngữ (Tiếng Nhật & Tiếng Trung) với hàng trăm nghìn người dùng, tập trung vào trải nghiệm tương tác mượt mà và tối ưu hóa SEO/hiệu năng tải trang.",
    contributions: [
      "Phát triển các tính năng học từ vựng Spaced Repetition System (SRS) và luyện thi bằng Next.js App Router và TypeScript.",
      "Tối ưu Core Web Vitals, SSR caching và giảm thiểu bundle size giúp cải thiện tốc độ tải trang hơn 40%.",
      "Tích hợp thanh toán trực tuyến, quản lý state học tập real-time và animation mượt mà cho trải nghiệm gamification.",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion"],
  },
];
