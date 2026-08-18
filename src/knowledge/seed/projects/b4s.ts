import { Project } from "../../types";

export const B4S_PROJECT: Project = {
  id: "b4s",
  slug: "b4s",
  name: "B4S - Desktop Companion for Baseus Headphones",
  role: "Author & Developer",
  period: "2024",
  year: "2024",
  summary:
    "Ứng dụng desktop đa nền tảng (Tauri v2 + Rust btleplug + SolidJS) cho phép điều khiển tai nghe Bluetooth LE cục bộ (chống ồn chủ động ANC, tuỳ chỉnh 10-band EQ, theo dõi telemetry pin) mà không cần tài khoản cloud hay ứng dụng điện thoại.",
  problem:
    "Nhiều thiết bị tai nghe không dây bắt buộc người dùng cài app di động kèm đăng ký tài khoản cloud để chỉnh EQ/ANC, gây bất tiện khi làm việc trên máy tính và tiềm ẩn rủi ro theo dõi quyền riêng tư.",
  techStack: ["Tauri v2", "Rust", "btleplug", "SolidJS", "TypeScript", "Tailwind CSS", "BLE Protocols"],
  domains: ["Desktop Apps", "Hardware Control", "Bluetooth LE", "Reverse Engineering", "Privacy-first"],
  competencies: [
    "Cross-platform Desktop Development (Tauri v2 + Rust)",
    "Bluetooth Low Energy (BLE) Protocol Reverse-engineering",
    "SolidJS Reactive UI & High-performance Audio EQ Control",
    "Local-first Software Architecture without Cloud Dependencies",
  ],
  architecture: [
    "Rust Backend Core: Sử dụng crate btleplug để scan, kết nối GATT services/characteristics và gửi opcode nhị phân tới tai nghe.",
    "SolidJS Reactive Frontend: Giao diện trực quan cho phép kéo chỉnh 10 băng tần EQ, chuyển đổi chế độ ANC/Transparency thời gian thực.",
    "IPC Communication: Tauri v2 bridge trao đổi dữ liệu binary/JSON siêu nhẹ giữa Rust core và giao diện SolidJS.",
  ],
  challenges: [
    "Dịch ngược (reverse-engineer) cấu trúc gói tin BLE độc quyền của nhà sản xuất.",
    "Đảm bảo ứng dụng khởi động tức thì và chiếm dụng tài nguyên RAM cực thấp (< 30MB).",
  ],
  solutions: [
    "Sử dụng Wireshark & Bluetooth HCI Snoop logs để phân tích opcode và checksum.",
    "Kết hợp Tauri v2 và SolidJS giúp tối ưu kích thước file cài đặt và hiệu năng xử lý.",
  ],
  outcomes: [
    "Dự án mã nguồn mở hữu ích cho cộng đồng sử dụng tai nghe trên hệ điều hành Windows, macOS và Linux.",
  ],
  repositories: [{ name: "b4s (Tauri v2 Bluetooth Companion)", url: "https://github.com/hoan02/b4s" }],
  links: [{ label: "GitHub Repo", url: "https://github.com/hoan02/b4s" }],
  evidence: [
    {
      id: "ev-b4s-01",
      type: "github",
      claim: "Kỹ năng lập trình ứng dụng Desktop với Tauri v2, Rust & BLE",
      statement: "Repository hoan02/b4s mã nguồn mở kết hợp Tauri v2, Rust btleplug và SolidJS.",
      source: "https://github.com/hoan02/b4s",
      technologies: ["Tauri v2", "Rust", "SolidJS", "Bluetooth LE"],
      confidence: "verified",
    },
  ],
};
