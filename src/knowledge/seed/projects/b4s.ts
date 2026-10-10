import { Project } from "../../types";

export const B4S_PROJECT: Project = {
  id: "b4s",
  slug: "b4s",
  name: "B4S - Desktop Companion for Baseus Headphones",
  role: "Author & Developer",
  period: "2024",
  year: "2024",
  summary:
    "App desktop không chính thức cho tai nghe Baseus (Tauri v2 + Rust btleplug + SolidJS): điều khiển Bluetooth LE cục bộ, không tài khoản, không telemetry. Hai kiểu framing (bare AA/BA và frame 789C có CRC-16); catalog 124 profile JSON, 7 profile gửi được lệnh (1 verified, 6 experimental), còn lại chỉ scan. Chỉ test trên Windows.",
  problem:
    "Nhiều thiết bị tai nghe không dây bắt buộc người dùng cài app di động kèm đăng ký tài khoản cloud để chỉnh EQ/ANC, gây bất tiện khi làm việc trên máy tính và tiềm ẩn rủi ro theo dõi quyền riêng tư.",
  techStack: ["Tauri v2", "Rust", "btleplug", "SolidJS", "TypeScript", "SCSS", "BLE Protocols"],
  domains: ["Desktop Apps", "Hardware Control", "Bluetooth LE", "Reverse Engineering", "Privacy-first"],
  competencies: [
    "Desktop Development (Tauri v2 + Rust)",
    "Bluetooth Low Energy (BLE) Protocol Reverse-engineering",
    "SolidJS UI driven by per-model capability profiles",
    "Local-first Software Architecture without Cloud Dependencies",
  ],
  architecture: [
    "Rust Backend Core: dùng btleplug để scan, kết nối GATT và gửi frame nhị phân; session chỉ hiển thị state do thiết bị xác nhận.",
    "SolidJS Frontend: render điều khiển theo capability của từng profile model trong catalog JSON.",
    "IPC: Tauri v2 bridge giữa Rust core và giao diện SolidJS.",
  ],
  challenges: [
    "Dịch ngược (reverse-engineer) cấu trúc gói tin BLE độc quyền của nhà sản xuất.",
    "Không có tài liệu giao thức chính thức nên mỗi profile phải được phân loại verified / experimental / scan-only.",
  ],
  solutions: [
    "Mã hóa hai kiểu framing bằng codec có tài liệu và test; cổng cho phép gửi lệnh chỉ mở với profile đã review.",
    "Session Rust từ chối hiển thị state cũ thay vì đoán.",
  ],
  outcomes: [
    "Điều khiển cục bộ cho các profile đã hiện thực; các giới hạn chưa xác minh được liệt kê trung thực trong bài viết.",
  ],
  repositories: [{ name: "b4s (Tauri v2 Bluetooth Companion)", url: "https://github.com/hoan02/b4s" }],
  links: [{ label: "GitHub Repo", url: "https://github.com/hoan02/b4s" }],
  evidence: [
    {
      id: "ev-b4s-01",
      type: "github",
      claim: "Lập trình app desktop với Tauri v2, Rust & BLE",
      statement: "Repository hoan02/b4s mã nguồn mở kết hợp Tauri v2, Rust btleplug và SolidJS.",
      source: "https://github.com/hoan02/b4s",
      technologies: ["Tauri v2", "Rust", "SolidJS", "Bluetooth LE"],
      confidence: "verified",
    },
  ],
};
