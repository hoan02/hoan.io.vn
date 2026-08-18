import { Project, ProjectEditorial } from "@/types";

/**
 * Editorial layer for the portfolio.
 *
 * The raw project records keep the technical inventory used by the existing
 * pages. This layer supplies the human context: what the system is for, what
 * Hoan actually owned, and which engineering notes explain the important
 * decisions behind it.
 */
export const PROJECT_EDITORIAL: Record<string, ProjectEditorial> = {
  "epas-enterprise-process-automation": {
    group: "professional",
    groupLabel: "Professional system",
    groupLabelVi: "Hệ thống chuyên nghiệp",
    status: "Private enterprise work",
    statusVi: "Dự án enterprise bảo mật",
    context: "EPAS is a private enterprise process-automation platform used across multiple credit institutions, including central-level organizations and People's Credit Funds. It brings configurable business processes such as lending, appraisal and approval, disbursement, post-disbursement operations, transaction handling, and operational or compliance reporting into one system. The public-safe story focuses on how those workflows become usable, traceable, and maintainable software.",
    contextVi: "EPAS là nền tảng tự động hóa quy trình nghiệp vụ enterprise, được sử dụng cho nhiều tổ chức tín dụng, gồm các đơn vị cấp trung ương và các quỹ tín dụng nhân dân. Hệ thống bao phủ những quy trình như tiếp nhận và xử lý hồ sơ cho vay, thẩm định/phê duyệt, giải ngân, nghiệp vụ sau giải ngân, xử lý giao dịch và các báo cáo vận hành hoặc tuân thủ. Phần có thể công khai tập trung vào cách biến các quy trình đó thành phần mềm dễ dùng, có thể truy vết và duy trì lâu dài.",
    roleScope: "Translating lending and operational workflows into Angular micro-frontends, shared frontend foundations, dynamic forms, transaction inboxes, integration patterns, and delivery support across private on-premises environments. The architecture started with Nx, then evolved away from it when a more flexible structure fit the product and delivery needs better.",
    roleScopeVi: "Chuyển hóa các quy trình cho vay và vận hành thành Angular Micro-Frontend, nền tảng frontend dùng chung, biểu mẫu động, hộp thư giao dịch, các pattern tích hợp và hỗ trợ phân phối phần mềm trên môi trường on-premises bảo mật. Kiến trúc ban đầu có sử dụng Nx, sau đó được tái cấu trúc và loại bỏ Nx khi mô hình linh động hơn phù hợp với nhu cầu sản phẩm và delivery.",
    publicNote: "Details are intentionally redacted. The case study describes responsibilities and engineering decisions without exposing customer data, internal URLs, source code, or regulated figures.",
    publicNoteVi: "Chi tiết nhạy cảm được lược bỏ có chủ đích. Case study chỉ mô tả phạm vi trách nhiệm và quyết định kỹ thuật, không công khai dữ liệu khách hàng, URL nội bộ, mã nguồn hay số liệu tuân thủ.",
    outcomes: [
      "A configurable workflow surface spanning lending, approval, disbursement, operations, and reporting.",
      "A more flexible frontend structure that keeps business modules independent without treating Nx as a permanent constraint.",
      "A public-safe engineering record that separates product responsibility from confidential business data."
    ],
    outcomesVi: [
      "Một mặt phẳng workflow có thể cấu hình cho nghiệp vụ cho vay, phê duyệt, giải ngân, vận hành và báo cáo.",
      "Cấu trúc frontend linh động hơn, giữ các phân hệ độc lập mà không xem Nx là ràng buộc lâu dài.",
      "Một hồ sơ kỹ thuật có thể công khai, tách bạch trách nhiệm sản phẩm khỏi dữ liệu nghiệp vụ bảo mật."
    ],
    workflowAreas: [
      {
        id: "lending-and-approval",
        title: "Lending, appraisal & approval",
        titleVi: "Cho vay, thẩm định & phê duyệt",
        summary: "Structured forms, supporting documents, task assignment, review stages, and approval decisions for credit workflows.",
        summaryVi: "Biểu mẫu có cấu trúc, hồ sơ đi kèm, phân công task, các bước thẩm định và quyết định phê duyệt trong quy trình tín dụng."
      },
      {
        id: "disbursement-and-operations",
        title: "Disbursement & post-disbursement operations",
        titleVi: "Giải ngân & nghiệp vụ sau giải ngân",
        summary: "The transaction and task surfaces needed to move an approved case into disbursement and continued operational handling.",
        summaryVi: "Các màn hình giao dịch và task cần thiết để đưa một hồ sơ đã duyệt sang giải ngân và tiếp tục xử lý trong vận hành."
      },
      {
        id: "reporting-and-audit",
        title: "Operational, audit & compliance reporting",
        titleVi: "Báo cáo vận hành, audit & tuân thủ",
        summary: "History, status transitions, responsible actors, and reportable facts that help institutions inspect what happened in a process.",
        summaryVi: "Lịch sử, chuyển trạng thái, người chịu trách nhiệm và các dữ kiện phục vụ báo cáo giúp tổ chức kiểm tra điều gì đã xảy ra trong quy trình."
      }
    ],
    highlights: [
      {
        id: "lending-to-disbursement",
        title: "From lending request to disbursement",
        titleVi: "Từ hồ sơ cho vay đến giải ngân",
        summary: "How dynamic forms, supporting documents, task inboxes, review stages, approvals, and transaction handling connect into one configurable credit workflow.",
        summaryVi: "Biểu mẫu động, hồ sơ đi kèm, hộp thư tác vụ, các bước thẩm định, phê duyệt và xử lý giao dịch kết nối thành một quy trình tín dụng có thể cấu hình.",
        articleSlugs: ["epas-transaction-inbox-and-compliance-boundaries"]
      },
      {
        id: "architecture-evolution",
        title: "Why the frontend architecture changed",
        titleVi: "Vì sao kiến trúc frontend được tái cấu trúc",
        summary: "The early Nx-based foundation was useful for standardization, but the product later moved to a more flexible structure when the tool began imposing more coordination than value.",
        summaryVi: "Nền tảng ban đầu dùng Nx hữu ích cho việc chuẩn hóa, nhưng sau đó sản phẩm chuyển sang cấu trúc linh động hơn khi công cụ bắt đầu tạo thêm chi phí phối hợp thay vì giá trị.",
        articleSlugs: ["angular-microfrontend-architecture"]
      },
      {
        id: "reporting-and-compliance",
        title: "Making process history useful for reporting",
        titleVi: "Biến lịch sử quy trình thành dữ liệu báo cáo hữu ích",
        summary: "Why audit history, status transitions, ownership, documents, and server-owned facts matter when a workflow must support operational and compliance reporting.",
        summaryVi: "Vì sao lịch sử audit, chuyển trạng thái, người phụ trách, hồ sơ và dữ kiện do server quản lý quan trọng khi workflow phải phục vụ báo cáo vận hành và tuân thủ.",
        articleSlugs: ["epas-transaction-inbox-and-compliance-boundaries"]
      },
      {
        id: "private-delivery",
        title: "Shipping safely inside a private enterprise environment",
        titleVi: "Phân phối phần mềm an toàn trong môi trường enterprise riêng",
        summary: "What changes when releases, authentication, registries, Kubernetes, and operational troubleshooting all have to respect an existing enterprise contract.",
        summaryVi: "Quy trình release, xác thực, registry, Kubernetes và xử lý sự cố thay đổi như thế nào khi phải tôn trọng các contract enterprise có sẵn.",
        articleSlugs: ["epas-private-enterprise-delivery"]
      }
    ]
  },
  "arda-finops-platform": {
    group: "products",
    groupLabel: "Product platform",
    groupLabelVi: "Nền tảng sản phẩm",
    status: "Actively building",
    statusVi: "Đang xây dựng",
    context: "ARDA is a self-owned multi-tenant business platform built from first principles: domain services, identity, workflow, frontend composition, and self-hosted infrastructure are designed as one system.",
    contextVi: "ARDA là nền tảng business đa tenant do Hoan tự xây dựng từ đầu: domain service, định danh, workflow, frontend composition và hạ tầng tự vận hành được thiết kế như một hệ thống thống nhất.",
    roleScope: "Lead architecture, backend and frontend implementation, shared libraries, identity boundaries, event contracts, and GitOps infrastructure across the ARDA Labs repositories.",
    roleScopeVi: "Kiến trúc chính, triển khai backend/frontend, thư viện dùng chung, ranh giới định danh, contract sự kiện và hạ tầng GitOps xuyên suốt các repository ARDA Labs.",
    outcomes: [
      "A coherent platform model spanning domain services, identity, workflow, frontend composition, and infrastructure.",
      "Explicit contracts for synchronous calls, asynchronous events, and tenant-aware identity.",
      "Public repositories that make the architectural reasoning inspectable."
    ],
    outcomesVi: [
      "Một mô hình platform thống nhất từ domain service, identity, workflow, frontend composition đến hạ tầng.",
      "Contract rõ ràng cho giao tiếp đồng bộ, sự kiện bất đồng bộ và định danh theo tenant.",
      "Các repository public giúp người khác có thể kiểm tra được cách tư duy kiến trúc."
    ],
    highlights: [
      {
        id: "domain-boundaries",
        title: "Domain boundaries that remain understandable",
        titleVi: "Ranh giới domain vẫn dễ hiểu khi hệ thống lớn lên",
        summary: "Why Finance, IAM, Workflow, CRM, HRM, and platform capabilities are separated, and where synchronous gRPC should stop.",
        summaryVi: "Vì sao Finance, IAM, Workflow, CRM, HRM và platform được tách ra, cũng như điểm mà giao tiếp gRPC đồng bộ nên dừng lại.",
        articleSlugs: ["designing-arda-cloud-native-finops-platform"]
      },
      {
        id: "identity-boundary",
        title: "Identity as a boundary, not a frontend feature",
        titleVi: "Định danh là một ranh giới hệ thống, không chỉ là tính năng frontend",
        summary: "The BFF, ForwardAuth, Ory, session, tenant, and route-policy decisions behind a safer browser boundary.",
        summaryVi: "Các quyết định về BFF, ForwardAuth, Ory, session, tenant và policy route phía sau một ranh giới trình duyệt an toàn hơn.",
        articleSlugs: ["authentication-beyond-jwt-arda-identity-architecture"]
      },
      {
        id: "reliable-events",
        title: "Events that do not disappear between database and broker",
        titleVi: "Sự kiện không biến mất giữa database và message broker",
        summary: "Transactional Outbox, NATS JetStream, idempotency, and the operational consequences of choosing eventual consistency.",
        summaryVi: "Transactional Outbox, NATS JetStream, idempotency và hệ quả vận hành khi lựa chọn eventual consistency.",
        articleSlugs: ["reliable-domain-events-nats-transactional-outbox"]
      },
      {
        id: "workflow-service",
        title: "Workflow without leaking the engine into every domain",
        titleVi: "Workflow mà không để engine rò rỉ vào mọi domain",
        summary: "A dedicated workflow boundary keeps BPMN lifecycle concerns consistent while domain services keep their own language.",
        summaryVi: "Một ranh giới workflow riêng giúp vòng đời BPMN nhất quán trong khi các domain service vẫn giữ ngôn ngữ của mình.",
        articleSlugs: ["bpmn-workflow-service-boundary-zeebe"]
      },
      {
        id: "frontend-composition",
        title: "Frontend composition across seven remotes",
        titleVi: "Ghép một frontend từ bảy remote application",
        summary: "The rules for shared packages, remote ownership, failure isolation, and release independence in the React platform.",
        summaryVi: "Các nguyên tắc về package dùng chung, ownership, cô lập lỗi và release độc lập trong nền tảng React.",
        articleSlugs: ["multi-remote-micro-frontend-platform-module-federation"]
      }
    ]
  },
  "puchi-language-platform": {
    group: "products",
    groupLabel: "Product platform",
    groupLabelVi: "Nền tảng sản phẩm",
    status: "Building the product",
    statusVi: "Đang xây dựng sản phẩm",
    context: "Puchi is a learner-facing language platform. Its architecture starts with the learner journey: stories, scenes, activities, progress, pronunciation media, reminders, and the ability to evolve the curriculum without rewriting learner history.",
    contextVi: "Puchi là nền tảng học ngôn ngữ hướng tới người học. Kiến trúc bắt đầu từ hành trình học: story, scene, activity, tiến độ, media phát âm, nhắc học và khả năng mở rộng giáo trình mà không làm mất lịch sử học tập.",
    roleScope: "Product architecture, Next.js PWA, Go services, learning domain model, authentication, event flows, media delivery, and GitOps deployment.",
    roleScopeVi: "Kiến trúc sản phẩm, Next.js PWA, Go services, mô hình domain học tập, xác thực, luồng sự kiện, phân phối media và triển khai GitOps.",
    outcomes: [
      "A product model that starts from learner actions rather than service count.",
      "Separated curriculum content, learner state, media delivery, and notification work.",
      "A repeatable path from product change to a declared cluster deployment."
    ],
    outcomesVi: [
      "Mô hình sản phẩm bắt đầu từ hành động của người học thay vì số lượng service.",
      "Tách nội dung giáo trình, trạng thái người học, phân phối media và xử lý notification.",
      "Đường đi lặp lại được từ thay đổi sản phẩm đến deployment khai báo trên cluster."
    ],
    highlights: [
      {
        id: "learner-domain",
        title: "Modeling learning before modeling services",
        titleVi: "Mô hình hóa trải nghiệm học trước khi tách service",
        summary: "The Story → Scene → Content → Activity model separates curriculum structure from attempts, progress, XP, and streak state.",
        summaryVi: "Mô hình Story → Scene → Content → Activity tách cấu trúc giáo trình khỏi lượt làm bài, tiến độ, XP và trạng thái streak.",
        articleSlugs: ["building-puchi-product-idea-to-service-architecture", "designing-story-based-language-learning-engine"]
      },
      {
        id: "session-auth",
        title: "Authentication that can be revoked centrally",
        titleVi: "Xác thực có thể thu hồi tập trung",
        summary: "Why Puchi uses opaque sessions and internal introspection instead of spreading raw JWT handling across the product.",
        summaryVi: "Vì sao Puchi dùng opaque session và introspection nội bộ thay vì rải việc xử lý raw JWT khắp sản phẩm.",
        articleSlugs: ["why-puchi-uses-opaque-sessions-over-jwt"]
      },
      {
        id: "gitops-delivery",
        title: "A delivery path designed for a small product team",
        titleVi: "Đường phân phối phù hợp với một product team nhỏ",
        summary: "GitHub Actions, GHCR, ArgoCD, and K3s turn a product change into a repeatable deployment without manual server access.",
        summaryVi: "GitHub Actions, GHCR, ArgoCD và K3s biến một thay đổi sản phẩm thành quy trình triển khai lặp lại được mà không cần truy cập server thủ công.",
        articleSlugs: ["git-push-to-k3s-puchi-gitops-pipeline"]
      }
    ]
  },
  "devops-k8s-infrastructure": {
    group: "systems",
    groupLabel: "Systems & infrastructure",
    groupLabelVi: "Hệ thống & hạ tầng",
    status: "Self-hosted and maintained",
    statusVi: "Tự vận hành và duy trì",
    context: "A self-hosted infrastructure practice for learning what stateful workloads, ingress, storage, delivery, and failure recovery feel like on real nodes rather than only in managed cloud documentation.",
    contextVi: "Một môi trường hạ tầng tự vận hành để hiểu workload có state, ingress, storage, delivery và khôi phục lỗi trên node thật thay vì chỉ đọc tài liệu cloud managed.",
    roleScope: "Cluster design, K3s operations, Jenkins delivery, registry and ingress configuration, Longhorn storage, troubleshooting, and release discipline.",
    roleScopeVi: "Thiết kế cluster, vận hành K3s, delivery qua Jenkins, registry/ingress, storage Longhorn, xử lý sự cố và kỷ luật release.",
    outcomes: [
      "A practical environment for testing delivery and stateful workload behavior on owned infrastructure.",
      "Operational habits grounded in node, storage, ingress, and recovery work.",
      "A clearer distinction between a successful manifest apply and a healthy service."
    ],
    outcomesVi: [
      "Môi trường thực hành delivery và workload có state trên hạ tầng tự sở hữu.",
      "Thói quen vận hành được hình thành từ công việc với node, storage, ingress và recovery.",
      "Phân biệt rõ hơn giữa apply manifest thành công và service thực sự healthy."
    ],
    highlights: [
      {
        id: "self-hosted-operations",
        title: "Operating the stateful parts, not only deploying YAML",
        titleVi: "Vận hành phần có state, không chỉ apply YAML",
        summary: "The lessons from nodes, storage, ingress, registries, persistence, and recovery are more valuable than a list of Kubernetes objects.",
        summaryVi: "Bài học từ node, storage, ingress, registry, persistence và recovery quan trọng hơn một danh sách Kubernetes object.",
        articleSlugs: ["production-like-platform-three-node-k3s-cluster"]
      }
    ]
  },
  "zalo-oa-messaging-platform": {
    group: "professional",
    groupLabel: "Professional system",
    groupLabelVi: "Hệ thống chuyên nghiệp",
    status: "Enterprise module",
    statusVi: "Phân hệ enterprise",
    context: "A business communication module connecting Zalo OA conversations, templates, delivery states, customer-care workflows, and backend data contracts.",
    contextVi: "Phân hệ truyền thông doanh nghiệp kết nối hội thoại Zalo OA, mẫu tin, trạng thái gửi, quy trình chăm sóc khách hàng và contract dữ liệu backend.",
    roleScope: "Angular module delivery, conversation and template interfaces, filtering and pagination, API integration, and operational feedback loops.",
    roleScopeVi: "Phát triển module Angular, giao diện hội thoại và mẫu tin, lọc/phân trang, tích hợp API và xử lý phản hồi vận hành.",
    outcomes: [
      "A conversation-oriented interface for history, templates, delivery states, and operator filters.",
      "Clearer feedback around the current message and conversation state.",
      "Reusable patterns for data-heavy enterprise module screens."
    ],
    outcomesVi: [
      "Giao diện xoay quanh hội thoại cho lịch sử, mẫu tin, trạng thái gửi và bộ lọc của nhân viên.",
      "Phản hồi rõ ràng hơn về trạng thái tin nhắn và hội thoại hiện tại.",
      "Các pattern có thể tái sử dụng cho màn hình module enterprise nhiều dữ liệu."
    ],
    highlights: [
      {
        id: "conversation-operations",
        title: "Making message operations usable",
        titleVi: "Biến vận hành tin nhắn thành trải nghiệm có thể dùng được",
        summary: "Conversation history, templates, state changes, filters, and pagination have to support agents doing real work—not just display API responses.",
        summaryVi: "Lịch sử hội thoại, mẫu tin, thay đổi trạng thái, bộ lọc và phân trang phải hỗ trợ nhân viên làm việc thật, không chỉ hiển thị response API.",
        articleSlugs: ["zalo-oa-conversation-operations"]
      }
    ]
  },
  "mochimochi-learning-platform": {
    group: "professional",
    groupLabel: "Professional product",
    groupLabelVi: "Sản phẩm chuyên nghiệp",
    status: "Previous role",
    statusVi: "Kinh nghiệm trước đây",
    context: "A learner-facing EdTech platform for Japanese and Chinese study, where page performance, reusable UI, content discoverability, and mobile usability directly affect the learning experience.",
    contextVi: "Nền tảng EdTech hướng người học tiếng Nhật và tiếng Trung, nơi hiệu năng trang, UI tái sử dụng, khả năng tìm kiếm nội dung và trải nghiệm mobile ảnh hưởng trực tiếp đến việc học.",
    roleScope: "Next.js frontend, responsive interfaces, component refactoring, rendering and asset optimisation, SEO metadata, and Core Web Vitals work.",
    roleScopeVi: "Frontend Next.js, giao diện responsive, tái cấu trúc component, tối ưu rendering/tài nguyên, metadata SEO và Core Web Vitals.",
    outcomes: [
      "More maintainable learner-facing UI components.",
      "A more deliberate connection between rendering, assets, responsive behavior, and discoverability.",
      "Performance work framed around real learner entry points."
    ],
    outcomesVi: [
      "Các component UI hướng người học dễ duy trì hơn.",
      "Mối liên hệ rõ hơn giữa rendering, tài nguyên, responsive behavior và khả năng tìm kiếm.",
      "Công việc hiệu năng được gắn với những điểm vào thực tế của người học."
    ],
    highlights: [
      {
        id: "learner-performance",
        title: "Performance is part of the learning product",
        titleVi: "Hiệu năng là một phần của sản phẩm học tập",
        summary: "Rendering, assets, responsive interaction, and discoverability were treated as one learner-facing problem rather than isolated frontend chores.",
        summaryVi: "Rendering, tài nguyên, tương tác responsive và khả năng tìm kiếm được nhìn như một bài toán người học thống nhất thay vì các task frontend rời rạc.",
        articleSlugs: ["mochimochi-performance-and-seo"]
      }
    ]
  },
  "camrelay-p2p-rtsp-bridge": {
    group: "systems",
    groupLabel: "Systems & reverse engineering",
    groupLabelVi: "Hệ thống & reverse engineering",
    status: "Open-source system project",
    statusVi: "Dự án hệ thống mã nguồn mở",
    context: "Camrelay turns a proprietary camera access problem into a local systems problem: connect to the vendor P2P path, expose a private RTSP stream, and keep recording and archive operations under local control.",
    contextVi: "Camrelay biến bài toán camera proprietary thành bài toán hệ thống nội bộ: kết nối qua P2P của nhà cung cấp, xuất RTSP riêng trong LAN và giữ quyền kiểm soát việc ghi hình/lưu trữ.",
    roleScope: "Rust async runtime, protocol investigation, stream relay, RTSP integration, recording workers, dashboard, and private deployment boundaries.",
    roleScopeVi: "Runtime Rust bất đồng bộ, nghiên cứu protocol, relay stream, tích hợp RTSP, worker ghi hình, dashboard và ranh giới triển khai private.",
    publicNote: "Device and browser compatibility is described conservatively; a working protocol path is not the same as universal camera support.",
    publicNoteVi: "Khả năng tương thích thiết bị và trình duyệt được mô tả thận trọng; một protocol path hoạt động không đồng nghĩa hỗ trợ mọi camera.",
    outcomes: [
      "A private RTSP boundary that local NVR tooling can consume.",
      "Protocol-specific relay logic separated from optional recording and archive workers.",
      "A documented distinction between validated camera paths and compatibility still requiring testing."
    ],
    outcomesVi: [
      "Một ranh giới RTSP private để các công cụ NVR nội bộ có thể sử dụng.",
      "Logic relay đặc thù protocol được tách khỏi worker ghi hình và archive tùy chọn.",
      "Phân biệt rõ camera path đã xác minh với phần tương thích vẫn cần kiểm thử thêm."
    ],
    highlights: [
      {
        id: "p2p-to-rtsp",
        title: "Bridging a closed protocol into an open local interface",
        titleVi: "Bắc cầu từ protocol đóng sang interface nội bộ mở",
        summary: "The interesting part is the boundary: proprietary signaling on one side, a predictable private RTSP contract for NVR tooling on the other.",
        summaryVi: "Điểm đáng kể nằm ở ranh giới: signaling proprietary ở một phía và contract RTSP private dễ tích hợp cho NVR ở phía còn lại.",
        articleSlugs: ["camrelay-from-proprietary-p2p-to-private-rtsp"]
      }
    ]
  },
  "b4s-baseus-desktop-companion": {
    group: "systems",
    groupLabel: "Systems & reverse engineering",
    groupLabelVi: "Hệ thống & reverse engineering",
    status: "Open-source system project",
    statusVi: "Dự án hệ thống mã nguồn mở",
    context: "B4S explores what a local desktop companion can look like when a headphone vendor's useful controls are hidden behind a mobile application and a proprietary Bluetooth protocol.",
    contextVi: "B4S khám phá một ứng dụng desktop local có thể trông như thế nào khi các tính năng hữu ích của tai nghe chỉ nằm trong app mobile và protocol Bluetooth proprietary.",
    roleScope: "Tauri desktop shell, Rust BLE lifecycle, GATT packet investigation, capability-aware UI, and privacy-first local operation.",
    roleScopeVi: "Tauri desktop shell, vòng đời BLE bằng Rust, nghiên cứu GATT packet, UI theo capability và cơ chế local ưu tiên quyền riêng tư.",
    outcomes: [
      "A local desktop control surface for supported headphone capabilities.",
      "A narrower boundary between native BLE behavior and the UI layer.",
      "A privacy-first application model without unnecessary accounts or telemetry."
    ],
    outcomesVi: [
      "Một giao diện desktop local cho các capability tai nghe được hỗ trợ.",
      "Ranh giới rõ hơn giữa behavior BLE native và lớp UI.",
      "Mô hình ứng dụng ưu tiên privacy, không thêm account hoặc telemetry không cần thiết."
    ],
    highlights: [
      {
        id: "ble-protocol",
        title: "Reverse engineering as product discovery",
        titleVi: "Reverse engineering cũng là product discovery",
        summary: "The UI can only be honest when the protocol model, device capabilities, failure states, and local privacy boundary are understood first.",
        summaryVi: "UI chỉ có thể trung thực khi đã hiểu model protocol, capability của thiết bị, trạng thái lỗi và ranh giới privacy local.",
        articleSlugs: ["b4s-reverse-engineering-a-local-ble-companion"]
      }
    ]
  }
};

export function getProjectEditorial(project: Project): ProjectEditorial | undefined {
  return project.editorial || PROJECT_EDITORIAL[project.id];
}

export const PROJECT_GROUP_ORDER = ["professional", "products", "systems"] as const;
