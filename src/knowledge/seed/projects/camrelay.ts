import { Project } from "../../types";

export const CAMRELAY_PROJECT: Project = {
  id: "camrelay",
  slug: "camrelay",
  name: "CamRelay",
  role: "Author & Developer",
  period: "2024",
  year: "2024",
  summary:
    "Cầu nối video hiệu năng cao viết bằng Rust async (Tokio), chuyển đổi luồng P2P độc quyền từ camera Dahua/Imou/easy4ip thành luồng RTSP nội bộ cho Frigate NVR & Home Assistant, hỗ trợ FFmpeg ghi hình và rclone tự động sao lưu Google Drive.",
  problem:
    "Nhiều dòng camera IP gia đình bị khoá luồng P2P độc quyền trên cloud nhà sản xuất, không mở cổng RTSP trực tiếp hoặc bị giới hạn băng thông, gây khó khăn cho việc tích hợp vào hệ thống Smarthome và NVR cục bộ.",
  techStack: ["Rust", "Tokio", "RTSP", "FFmpeg", "P2P Protocols", "Docker", "Home Assistant", "Frigate NVR"],
  domains: ["IoT & Systems", "Video Streaming", "Home Automation", "Network Protocols", "Embedded & Edge"],
  competencies: [
    "Rust Systems Programming & Async Networking (Tokio)",
    "Video Protocol Bridging (P2P to RTSP Stream)",
    "FFmpeg Recording Pipeline & Cloud Archiving (rclone)",
    "Home Assistant & Frigate NVR Integration",
  ],
  architecture: [
    "Rust Async Core: Sử dụng Tokio runtime để duy trì kết nối P2P liên tục, nhận frame nhị phân và đóng gói lại thành luồng RTSP chuẩn.",
    "Recording & Backup Pipeline: Tích hợp FFmpeg phân đoạn video theo block thời gian và kích hoạt rclone đồng bộ lên Google Drive.",
    "Containerized Edge Deployment: Đóng gói Docker image siêu nhẹ chạy trực tiếp trên Raspberry Pi hoặc Linux homelab.",
  ],
  challenges: [
    "Giải mã luồng dữ liệu nhị phân P2P với độ trễ tối thiểu mà không gây tràn bộ nhớ.",
    "Xử lý tự động reconnect khi đường truyền camera bị ngắt quãng mà không làm crash stream RTSP của NVR.",
  ],
  solutions: [
    "Tận dụng quyền sở hữu bộ nhớ an toàn (memory safety) và zero-cost abstractions của Rust.",
    "Xây dựng state-machine quản lý reconnect và buffering dữ liệu thông minh.",
  ],
  outcomes: [
    "Cung cấp giải pháp self-hosted miễn phí, bảo mật quyền riêng tư cho camera an ninh gia đình.",
  ],
  repositories: [{ name: "camrelay (Rust P2P RTSP Bridge)", url: "https://github.com/hoan02/camrelay" }],
  links: [{ label: "GitHub Repo", url: "https://github.com/hoan02/camrelay" }],
  evidence: [
    {
      id: "ev-camrelay-01",
      type: "github",
      claim: "Kỹ năng lập trình hệ thống bằng ngôn ngữ Rust",
      statement: "Repository hoan02/camrelay trên GitHub viết hoàn toàn bằng Rust với Tokio async streaming.",
      source: "https://github.com/hoan02/camrelay",
      technologies: ["Rust", "Tokio", "RTSP", "FFmpeg"],
      confidence: "verified",
    },
  ],
};
