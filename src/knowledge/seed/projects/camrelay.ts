import { Project } from "../../types";

export const CAMRELAY_PROJECT: Project = {
  id: "camrelay",
  slug: "camrelay",
  name: "CamRelay",
  role: "Author & Developer",
  period: "2024",
  year: "2024",
  summary:
    "Service Rust/Tokio đưa camera chỉ truy cập được qua đường P2P của hãng vào mạng riêng: TCP tunnel phía sau proxy xác thực RTSP trên loopback, kèm ghi hình FFmpeg (-c copy) và lưu trữ rclone tùy chọn. Đây là tunnel, không phải RTSP server.",
  problem:
    "Nhiều dòng camera IP gia đình bị khoá luồng P2P độc quyền trên cloud nhà sản xuất, không mở cổng RTSP trực tiếp hoặc bị giới hạn băng thông, gây khó khăn cho việc tích hợp vào hệ thống Smarthome và NVR cục bộ.",
  techStack: ["Rust", "Tokio", "RTSP", "FFmpeg", "P2P Protocols", "rclone"],
  domains: ["IoT & Systems", "Video Streaming", "Home Automation", "Network Protocols", "Embedded & Edge"],
  competencies: [
    "Rust Systems Programming & Async Networking (Tokio)",
    "Video Protocol Bridging (P2P to RTSP Stream)",
    "FFmpeg Recording Pipeline & Cloud Archiving (rclone)",
    "Home Assistant & Frigate NVR Integration",
  ],
  architecture: [
    "Rust Async Core: Tokio runtime giữ session P2P và tunnel TCP tới camera theo realm.",
    "Recording & Archive: FFmpeg -c copy (không re-encode) theo phân đoạn, rclone để lưu trữ.",
    "RTSP auth proxy: proxy xác thực trên loopback để consumer dùng URL RTSP thường kèm credential.",
  ],
  challenges: [
    "Tách logic P2P đặc thù của hãng khỏi contract RTSP nội bộ.",
    "Phân biệt path đã xác minh với khả năng tương thích phổ quát (có device validation matrix trong repo).",
  ],
  solutions: [
    "Cô lập protocol trong một lớp riêng, chỉ lộ ra TCP tunnel.",
    "Giữ ghi hình và archive là tùy chọn để relay không phụ thuộc chính sách lưu trữ.",
  ],
  outcomes: [
    "Giải pháp self-hosted cho camera path đã xác minh; hạn chế đã biết (login admin mặc định, địa chỉ bind của tunnel, trạng thái treo khi session chết) được nêu trong bài viết.",
  ],
  repositories: [{ name: "camrelay (Rust P2P RTSP Bridge)", url: "https://github.com/hoan02/camrelay" }],
  links: [{ label: "GitHub Repo", url: "https://github.com/hoan02/camrelay" }],
  evidence: [
    {
      id: "ev-camrelay-01",
      type: "github",
      claim: "Lập trình hệ thống bằng Rust",
      statement: "Repository hoan02/camrelay trên GitHub viết bằng Rust với Tokio.",
      source: "https://github.com/hoan02/camrelay",
      technologies: ["Rust", "Tokio", "RTSP", "FFmpeg"],
      confidence: "verified",
    },
  ],
};
