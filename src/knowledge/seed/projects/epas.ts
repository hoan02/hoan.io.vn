import { Project } from "../../types";

export const EPAS_PROJECT: Project = {
  id: "epas",
  slug: "epas",
  name: "EPAS Enterprise Process Automation System",
  organization: "NGV Group",
  role: "Full-stack Developer",
  period: "12/2024 – Hiện tại",
  year: "2024",
  summary:
    "Hệ thống lõi tự động hoá quy trình nghiệp vụ cho các tổ chức tài chính & tín dụng ngân hàng, kết hợp kiến trúc Angular Micro-Frontend, backend Java Spring Boot, Oracle/PostgreSQL và Kubernetes.",
  problem:
    "Các quy trình thẩm định tín dụng, giải ngân, quản lý rủi ro và giao dịch tại các ngân hàng/quỹ tín dụng nhân dân đòi hỏi tính toàn vẹn dữ liệu cực cao, khả năng tuỳ biến giao diện linh động và kiểm soát phân quyền chặt chẽ.",
  techStack: [
    "Angular",
    "TypeScript",
    "RxJS",
    "Micro-Frontend",
    "Java Spring Boot",
    "Oracle",
    "PostgreSQL",
    "Keycloak",
    "Kafka",
    "Kubernetes",
    "Docker",
    "Jenkins",
    "Zalo OA API",
  ],
  domains: ["Banking & FinTech", "Enterprise Process Automation", "BPM", "Micro-Frontends", "Credit Operations"],
  competencies: [
    "Enterprise Angular Micro-Frontend Architecture",
    "Dynamic Form Builder & Enterprise Data Grid Optimization",
    "Java Spring Boot & Oracle/PostgreSQL Integration",
    "Kubernetes On-premise Delivery & Jenkins CI/CD",
  ],
  architecture: [
    "Frontend: Kiến trúc Angular Micro-Frontend chia tách các phân hệ nghiệp vụ độc lập, sử dụng dynamic form engine và RxJS state pipeline.",
    "Backend & DB: Java Spring Boot microservices kết nối cơ sở dữ liệu quan hệ Oracle & PostgreSQL, đảm bảo transactional integrity trong từng giao dịch tài chính.",
    "Triển khai: Hệ thống container hoá bằng Docker, triển khai tự động qua Jenkins pipeline lên cụm Kubernetes on-premise an toàn.",
  ],
  challenges: [
    "Đồng bộ trạng thái phức tạp giữa Shell và các Remote modules mà không gây rò rỉ bộ nhớ (memory leaks).",
    "Xử lý các biểu mẫu động (dynamic forms) với hàng trăm trường dữ liệu và ràng buộc logic thẩm định khắt khe.",
  ],
  solutions: [
    "Thiết kế Event Bus nội bộ qua RxJS Subjects và custom state coordinator.",
    "Xây dựng engine render dynamic form theo metadata từ backend, tối ưu OnPush change detection.",
  ],
  outcomes: [
    "Hệ thống vận hành thực tế tại các tổ chức tín dụng cấp trung ương và địa phương, rút ngắn thời gian xử lý hồ sơ thẩm định.",
  ],
  links: [
    { label: "Xem kinh nghiệm tại NGV Group", url: "#experience" },
    { label: "Xem chi tiết dự án EPAS", url: "#selected-work" },
  ],
  evidence: [
    {
      id: "ev-epas-01",
      type: "experience",
      claim: "Kinh nghiệm thực chiến phát triển Enterprise Micro-Frontend & Banking Systems",
      statement: "Kỹ sư full-stack tại NGV Group trực tiếp phát triển Angular MFEs và Spring Boot backend cho hệ thống EPAS.",
      technologies: ["Angular", "Micro-Frontend", "Java Spring Boot", "Oracle", "Kubernetes"],
      confidence: "verified",
    },
  ],
};
