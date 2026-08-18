import { Article } from "@/types";

/** Focused engineering notes that connect a project highlight to a concrete decision. */
export const ADDITIONAL_ARTICLES: Article[] = [
  {
    slug: "epas-transaction-inbox-and-compliance-boundaries",
    title: "Inside an EPAS Credit Workflow: From Lending Request to Disbursement and Reporting",
    titleVi: "Bên trong workflow tín dụng EPAS: Từ hồ sơ cho vay đến giải ngân và báo cáo",
    summary: "A public-safe note on how lending requests, appraisal, approvals, disbursement, transaction history, and operational or compliance reporting become one traceable EPAS workflow.",
    summaryVi: "Một ghi chép public-safe về cách hồ sơ cho vay, thẩm định, phê duyệt, giải ngân, lịch sử giao dịch và báo cáo vận hành/tuân thủ trở thành một workflow EPAS có thể truy vết.",
    date: "Mar 2026",
    readTime: "9 min read",
    tags: ["EPAS", "Enterprise", "Lending", "Disbursement", "Reporting", "Angular", "BPM"],
    featured: true,
    project: "epas",
    relatedProject: "epas-enterprise-process-automation",
    relatedHighlightId: "lending-to-disbursement",
    format: "case-study",
    formatVi: "Case study",
    series: "EPAS / Enterprise Reality",
    seriesVi: "EPAS / Thực tế enterprise",
    content: {
      problemStatement: "A credit workflow does not end when a lending form is submitted. EPAS must carry an application through supporting documents, appraisal, approval, disbursement, later operational handling, and reporting. It must preserve who acted, which data version was approved, what task is waiting next, and which history can support an institution's operational or compliance review.",
      problemStatementVi: "Một workflow tín dụng không kết thúc khi hồ sơ cho vay được gửi đi. EPAS phải đưa hồ sơ đi qua các bước hồ sơ đi kèm, thẩm định, phê duyệt, giải ngân, xử lý sau đó và báo cáo. Hệ thống phải giữ được ai đã thao tác, phiên bản dữ liệu nào được phê duyệt, task tiếp theo đang chờ ai và lịch sử nào có thể phục vụ kiểm tra vận hành hoặc tuân thủ của từng tổ chức.",
      architectureDesign: "The practical design separates responsibilities without fragmenting the user's journey. The frontend owns schema-driven rendering, local validation, draft interaction, table and inbox state, and clear task transitions. Backend services remain the authority for institution-specific business rules, permissions, workflow state, validation, persistence, audit records, and reportable facts. The shared frontend layer keeps those contracts understandable across multiple business modules and institutions.",
      architectureDesignVi: "Thiết kế thực tế phân tách trách nhiệm nhưng không chia vụn hành trình của người dùng. Frontend phụ trách render theo schema, validation tại chỗ, tương tác draft, state của bảng/hộp thư và chuyển task rõ ràng. Backend vẫn là nơi có thẩm quyền đối với rule nghiệp vụ theo từng tổ chức, phân quyền, trạng thái workflow, validation, persistence, audit và các dữ kiện dùng cho báo cáo. Lớp frontend dùng chung giúp các contract này nhất quán giữa nhiều phân hệ và tổ chức.",
      technicalDecisions: [
        "Treat transaction inbox state as part of the workflow experience: filters, tree selections, pagination, visible columns, and search context should survive a round trip to detail when the user returns.",
        "Keep institution-specific lending and approval rules in configurable workflow or backend contracts instead of scattering them through reusable UI components.",
        "Keep compliance-facing facts server-owned and reproducible; the UI may help users complete a task, but it must not become the source of truth for a report.",
        "Use shared form and table primitives to reduce behavioral drift between business modules while allowing each workflow to keep its own domain rules.",
        "Describe private enterprise behavior at the contract and responsibility level instead of publishing regulated data or internal identifiers."
      ],
      technicalDecisionsVi: [
        "Coi state của hộp thư giao dịch là một phần của trải nghiệm workflow: bộ lọc, cây lựa chọn, phân trang, cột hiển thị và ngữ cảnh tìm kiếm nên được giữ lại khi người dùng quay về từ màn hình chi tiết.",
        "Giữ rule cho vay và phê duyệt riêng theo từng tổ chức trong contract workflow hoặc backend, thay vì rải chúng vào các UI component dùng chung.",
        "Giữ các dữ kiện phục vụ tuân thủ ở phía server và có khả năng tái lập; UI hỗ trợ người dùng hoàn thành task nhưng không trở thành nguồn sự thật cho báo cáo.",
        "Dùng primitive form/table dùng chung để giảm sai khác hành vi giữa các module nghiệp vụ nhưng vẫn giữ được rule riêng của từng workflow.",
        "Mô tả hệ thống enterprise riêng ở cấp contract và trách nhiệm, không công khai dữ liệu được quản lý hoặc mã định danh nội bộ."
      ],
      keyTakeaways: [
        "The most valuable abstraction is often the workflow contract, not another UI component.",
        "A credit workflow is a chain from lending request to disbursement and ongoing operations, with reporting as a first-class output.",
        "A compliance report is the end of a chain of reliable facts, not a screen assembled from convenient frontend state.",
        "Public case studies can be detailed without exposing private customer or regulatory information."
      ],
      keyTakeawaysVi: [
        "Abstraction có giá trị nhất nhiều khi là workflow contract, không phải thêm một UI component.",
        "Workflow tín dụng là một chuỗi từ hồ sơ cho vay đến giải ngân và vận hành tiếp theo, trong đó báo cáo là một đầu ra cốt lõi.",
        "Báo cáo tuân thủ là điểm cuối của một chuỗi dữ kiện đáng tin cậy, không phải màn hình ghép từ state thuận tiện của frontend.",
        "Case study public vẫn có thể chi tiết mà không cần lộ thông tin khách hàng hoặc dữ liệu tuân thủ riêng."
      ]
    }
  },
  {
    slug: "epas-private-enterprise-delivery",
    title: "Shipping Frontend Changes Inside a Private Enterprise Platform",
    titleVi: "Phân phối thay đổi frontend trong một nền tảng enterprise riêng",
    summary: "What reliable delivery means when Angular remotes, shared packages, authentication, registries, Kubernetes, and existing enterprise contracts all meet in one release path.",
    summaryVi: "Reliable delivery có ý nghĩa gì khi Angular remote, package dùng chung, xác thực, registry, Kubernetes và các contract enterprise có sẵn cùng nằm trong một đường release.",
    date: "Mar 2026",
    readTime: "8 min read",
    tags: ["EPAS", "Angular", "CI/CD", "Kubernetes", "Enterprise Delivery"],
    featured: false,
    project: "epas",
    relatedProject: "epas-enterprise-process-automation",
    relatedHighlightId: "private-delivery",
    format: "field-note",
    formatVi: "Field note",
    series: "EPAS / Enterprise Reality",
    seriesVi: "EPAS / Thực tế enterprise",
    evidenceIds: ["epas-enterprise-mfe-k8s"],
    content: {
      problemStatement: "A frontend release in a micro-frontend enterprise system is not only a successful local build. The shared package version, remote artifact, host configuration, authentication contract, image, registry, deployment manifest, and running environment must agree.",
      problemStatementVi: "Một lần release frontend trong hệ thống enterprise micro-frontend không chỉ là build local thành công. Version package dùng chung, artifact của remote, cấu hình host, contract xác thực, image, registry, manifest triển khai và môi trường đang chạy phải khớp nhau.",
      architectureDesign: "The delivery path is treated as a chain of contracts. A shared library change is built and published, consumers install the intended version, production builds verify the package boundary, and the deployed remote is tested through the actual host rather than through source inspection alone. This keeps runtime verification separate from compile-time confidence.",
      architectureDesignVi: "Đường delivery được nhìn như một chuỗi contract. Thay đổi ở thư viện dùng chung phải được build và publish, consumer cài đúng version, production build kiểm tra ranh giới package, sau đó remote đã deploy được kiểm thử thông qua host thật thay vì chỉ nhìn source. Nhờ đó có thể phân biệt độ tin cậy compile-time với xác minh runtime.",
      technicalDecisions: [
        "Keep the existing host-to-remote navigation and authentication contract stable while improving the package or remote implementation behind it.",
        "Treat stale dev-server caches and installed package declarations as a separate diagnostic problem from application code errors.",
        "Verify the artifact loaded by the host after publishing a remote; a source-only check cannot prove Module Federation runtime behavior.",
        "Use private-work language for customer systems and keep deployment details at the level needed to explain the engineering responsibility."
      ],
      technicalDecisionsVi: [
        "Giữ ổn định contract định tuyến và xác thực giữa host/remote, chỉ thay đổi implementation phía sau khi cần.",
        "Phân biệt cache của dev server hoặc declaration đã cài với lỗi thực sự trong mã nguồn ứng dụng.",
        "Sau khi publish remote, phải kiểm tra artifact được host load; kiểm tra source không chứng minh được runtime Module Federation.",
        "Dùng ngôn ngữ private-work cho hệ thống khách hàng và chỉ mô tả chi tiết triển khai ở mức cần thiết để thể hiện trách nhiệm kỹ thuật."
      ],
      keyTakeaways: [
        "In enterprise frontend work, the deployed contract matters as much as the source code.",
        "Build success is a checkpoint, not the end of release validation.",
        "Good case studies explain where confidence comes from and where it still needs runtime proof."
      ],
      keyTakeawaysVi: [
        "Trong frontend enterprise, contract đã deploy quan trọng không kém source code.",
        "Build thành công là một checkpoint, không phải điểm kết thúc của validation release.",
        "Case study tốt phải nói rõ độ tin cậy đến từ đâu và phần nào vẫn cần xác minh runtime."
      ]
    }
  },
  {
    slug: "zalo-oa-conversation-operations",
    title: "Designing a Conversation Console for Real Customer-Care Work",
    titleVi: "Thiết kế màn hình hội thoại cho công việc chăm sóc khách hàng thực tế",
    summary: "A practical note on conversation history, message templates, delivery states, filters, pagination, and the backend contracts behind a Zalo OA operations module.",
    summaryVi: "Ghi chép thực tế về lịch sử hội thoại, mẫu tin, trạng thái gửi, bộ lọc, phân trang và các contract backend phía sau một phân hệ vận hành Zalo OA.",
    date: "Feb 2026",
    readTime: "7 min read",
    tags: ["Zalo OA", "Angular", "Operations", "REST", "Redis"],
    featured: false,
    project: "epas",
    relatedProject: "zalo-oa-messaging-platform",
    relatedHighlightId: "conversation-operations",
    format: "case-study",
    formatVi: "Case study",
    series: "Professional modules",
    seriesVi: "Các phân hệ chuyên nghiệp",
    content: {
      problemStatement: "A customer-care console has to answer operational questions quickly: which conversation needs attention, what was sent, which template was used, what state the delivery reached, and how to move through history without losing context.",
      problemStatementVi: "Một màn hình chăm sóc khách hàng phải trả lời nhanh các câu hỏi vận hành: hội thoại nào cần xử lý, đã gửi gì, dùng mẫu nào, trạng thái gửi đến đâu và làm sao duyệt lịch sử mà không mất ngữ cảnh.",
      architectureDesign: "The module combines a conversation-oriented UI with explicit backend contracts for filtering, pagination, template management, status tracking, and cacheable active-session data. The important design decision is to model the operator's work context instead of presenting a collection of unrelated API tables.",
      architectureDesignVi: "Phân hệ kết hợp UI xoay quanh hội thoại với các contract backend rõ ràng cho lọc, phân trang, quản trị mẫu tin, theo dõi trạng thái và dữ liệu phiên hoạt động có thể cache. Quyết định quan trọng là mô hình hóa ngữ cảnh làm việc của nhân viên thay vì hiển thị tập hợp bảng API rời rạc.",
      technicalDecisions: [
        "Keep filters and pagination explicit so operators can reason about which slice of history they are viewing.",
        "Separate template administration from conversation history while keeping preview and send-state feedback close to the operator's task.",
        "Use cache selectively for active conversation context without treating cache as the source of message truth.",
        "Prefer clear empty, loading, and failed-delivery states over pretending that the conversation is always real-time."
      ],
      technicalDecisionsVi: [
        "Giữ bộ lọc và phân trang rõ ràng để nhân viên biết chính xác lát cắt lịch sử đang xem.",
        "Tách quản trị mẫu tin khỏi lịch sử hội thoại nhưng giữ preview và phản hồi trạng thái gửi gần với task của người dùng.",
        "Chỉ cache có chọn lọc ngữ cảnh hội thoại đang hoạt động, không coi cache là nguồn sự thật của tin nhắn.",
        "Ưu tiên trạng thái empty/loading/gửi lỗi rõ ràng thay vì giả định hội thoại luôn realtime."
      ],
      keyTakeaways: [
        "Operational UI quality is mostly about preserving context through state changes.",
        "A message console should communicate uncertainty and delivery state honestly.",
        "The best abstraction starts from the operator's next action."
      ],
      keyTakeawaysVi: [
        "Chất lượng UI vận hành chủ yếu nằm ở việc giữ ngữ cảnh qua các thay đổi state.",
        "Màn hình tin nhắn nên diễn đạt trung thực độ chắc chắn và trạng thái delivery.",
        "Abstraction tốt nhất bắt đầu từ hành động tiếp theo của người vận hành."
      ]
    }
  },
  {
    slug: "mochimochi-performance-and-seo",
    title: "When Frontend Performance Becomes Part of the Learning Experience",
    titleVi: "Khi hiệu năng frontend trở thành một phần của trải nghiệm học tập",
    summary: "A frontend field note from MochiMochi on rendering, assets, reusable components, SEO metadata, and the practical trade-offs behind learner-facing pages.",
    summaryVi: "Ghi chép frontend từ MochiMochi về rendering, tài nguyên, component tái sử dụng, metadata SEO và các trade-off thực tế phía sau những trang học tập.",
    date: "Aug 2024",
    readTime: "7 min read",
    tags: ["Next.js", "Performance", "SEO", "EdTech", "Frontend"],
    featured: false,
    project: "personal",
    relatedProject: "mochimochi-learning-platform",
    relatedHighlightId: "learner-performance",
    format: "field-note",
    formatVi: "Field note",
    series: "Professional modules",
    seriesVi: "Các phân hệ chuyên nghiệp",
    content: {
      problemStatement: "For a learning platform, a slow page is not a cosmetic defect. It interrupts a learner's next action, makes mobile study harder, and reduces the chance that useful course content is discovered through search.",
      problemStatementVi: "Với một nền tảng học tập, trang chậm không chỉ là lỗi thẩm mỹ. Nó ngắt hành động tiếp theo của người học, làm việc học trên mobile khó hơn và giảm khả năng nội dung hữu ích được tìm thấy qua search.",
      architectureDesign: "The work connected rendering strategy, asset delivery, component reuse, responsive interaction, and metadata into one frontend concern. The goal was not to chase one benchmark number, but to make the common learning paths predictable across device sizes and entry points.",
      architectureDesignVi: "Công việc kết nối chiến lược rendering, phân phối tài nguyên, tái sử dụng component, tương tác responsive và metadata thành một bài toán frontend thống nhất. Mục tiêu không phải chạy theo một con số benchmark, mà làm cho các hành trình học phổ biến ổn định trên nhiều kích thước thiết bị và điểm truy cập.",
      technicalDecisions: [
        "Measure the pages learners actually enter instead of optimizing an isolated demo route.",
        "Refactor repeated UI into typed components while protecting content-specific layout needs.",
        "Treat metadata, canonical URLs, and structured content as part of the product surface.",
        "Prefer a small number of measurable improvements over unverified claims about universal performance."
      ],
      technicalDecisionsVi: [
        "Đo các trang mà người học thực sự truy cập thay vì tối ưu một route demo tách biệt.",
        "Tái cấu trúc UI lặp lại thành component có type nhưng vẫn bảo vệ nhu cầu layout riêng của nội dung.",
        "Coi metadata, canonical URL và cấu trúc nội dung là một phần của sản phẩm.",
        "Ưu tiên một số cải thiện đo được thay vì claim không kiểm chứng về hiệu năng phổ quát."
      ],
      keyTakeaways: [
        "Performance is meaningful when tied to a learner action.",
        "SEO and UI architecture are connected through content structure and rendering choices.",
        "A reusable component is valuable only when it preserves the behavior users need."
      ],
      keyTakeawaysVi: [
        "Hiệu năng có ý nghĩa khi gắn với một hành động cụ thể của người học.",
        "SEO và kiến trúc UI kết nối với nhau qua cấu trúc nội dung và lựa chọn rendering.",
        "Component tái sử dụng chỉ có giá trị khi vẫn giữ được hành vi người dùng cần."
      ]
    }
  },
  {
    slug: "camrelay-from-proprietary-p2p-to-private-rtsp",
    title: "Camrelay: Turning a Proprietary Camera Path into a Private RTSP Contract",
    titleVi: "Camrelay: Biến đường truyền camera proprietary thành contract RTSP private",
    summary: "A systems note on the boundary between vendor P2P signaling, asynchronous Rust, local RTSP consumers, and the security limits of a camera relay.",
    summaryVi: "Ghi chép hệ thống về ranh giới giữa signaling P2P của nhà cung cấp, Rust bất đồng bộ, consumer RTSP nội bộ và giới hạn bảo mật của một camera relay.",
    date: "Feb 2026",
    readTime: "10 min read",
    tags: ["Camrelay", "Rust", "P2P", "RTSP", "Frigate", "Systems"],
    featured: false,
    project: "camrelay",
    relatedProject: "camrelay-p2p-rtsp-bridge",
    relatedHighlightId: "p2p-to-rtsp",
    format: "build-log",
    formatVi: "Build log",
    series: "Systems & field notes",
    seriesVi: "Hệ thống & field notes",
    repositoryUrl: "https://github.com/hoan02/camrelay",
    content: {
      problemStatement: "Closed camera ecosystems make local NVR integration difficult. The useful system boundary is not to recreate every vendor feature, but to establish a private, predictable stream contract that local tools can consume.",
      problemStatementVi: "Hệ sinh thái camera đóng khiến việc tích hợp NVR nội bộ khó khăn. Ranh giới hệ thống hữu ích không phải tái tạo mọi tính năng của hãng, mà là tạo ra một contract stream private, ổn định để các công cụ nội bộ có thể dùng.",
      architectureDesign: "Camrelay keeps the vendor-specific handshake and session behavior inside an asynchronous Rust service. On the other side it exposes local RTSP paths for Frigate, go2rtc, or Home Assistant, with optional recording workers and archive synchronization. The private boundary matters: camera media and credentials should not be placed into public URLs or unnecessary process arguments.",
      architectureDesignVi: "Camrelay giữ handshake và session behavior riêng của vendor bên trong service Rust bất đồng bộ. Ở phía còn lại, hệ thống xuất các RTSP path nội bộ cho Frigate, go2rtc hoặc Home Assistant, kèm worker ghi hình và đồng bộ archive tùy chọn. Ranh giới private rất quan trọng: media camera và credential không nên nằm trong URL public hoặc process argument không cần thiết.",
      technicalDecisions: [
        "Keep protocol-specific code isolated from the local RTSP contract.",
        "Make recording and cloud archive workers optional so relay availability is not tied to storage policy.",
        "Treat codec, device, browser, ICE, and TURN support as separate validation dimensions.",
        "Keep the media path private and use scoped control mechanisms for management access."
      ],
      technicalDecisionsVi: [
        "Cô lập code đặc thù protocol khỏi contract RTSP nội bộ.",
        "Cho phép worker ghi hình và archive là tùy chọn để availability của relay không phụ thuộc vào policy lưu trữ.",
        "Tách riêng việc xác minh codec, thiết bị, trình duyệt, ICE và TURN.",
        "Giữ media path private và dùng cơ chế control có scope cho quyền quản trị."
      ],
      keyTakeaways: [
        "A good bridge narrows a messy protocol into a stable local contract.",
        "Systems claims should distinguish a validated path from universal compatibility.",
        "Privacy boundaries are part of the architecture, not a deployment afterthought."
      ],
      keyTakeawaysVi: [
        "Một bridge tốt thu hẹp protocol phức tạp thành contract nội bộ ổn định.",
        "Claim về hệ thống phải phân biệt path đã xác minh với khả năng tương thích phổ quát.",
        "Ranh giới privacy là một phần của kiến trúc, không phải việc nghĩ đến sau khi deploy."
      ]
    }
  },
  {
    slug: "b4s-reverse-engineering-a-local-ble-companion",
    title: "B4S: Reverse-Engineering a Local Bluetooth Companion",
    titleVi: "B4S: Reverse-engineering một ứng dụng Bluetooth local",
    summary: "A build note on Tauri, Rust BLE lifecycle, proprietary GATT frames, capability-aware controls, and the discipline required for a privacy-first desktop tool.",
    summaryVi: "Ghi chép xây dựng về Tauri, vòng đời BLE bằng Rust, GATT frame proprietary, UI theo capability và kỷ luật cần có cho một công cụ desktop ưu tiên privacy.",
    date: "Feb 2026",
    readTime: "9 min read",
    tags: ["B4S", "Tauri", "Rust", "Bluetooth LE", "GATT", "Desktop"],
    featured: false,
    project: "b4s",
    relatedProject: "b4s-baseus-desktop-companion",
    relatedHighlightId: "ble-protocol",
    format: "build-log",
    formatVi: "Build log",
    series: "Systems & field notes",
    seriesVi: "Hệ thống & field notes",
    repositoryUrl: "https://github.com/hoan02/b4s",
    content: {
      problemStatement: "A desktop companion cannot assume that a device's mobile application behavior is documented or portable. Before building controls, the protocol, device capabilities, connection lifecycle, and failure behavior have to be observed carefully.",
      problemStatementVi: "Một ứng dụng desktop không thể giả định behavior của mobile app đã được document hoặc có thể portable. Trước khi xây control, cần quan sát cẩn thận protocol, capability của thiết bị, vòng đời kết nối và behavior khi lỗi.",
      architectureDesign: "B4S keeps the native BLE lifecycle in Rust and exposes a narrow capability-oriented interface to the SolidJS UI through Tauri. This lets the UI describe what a particular headphone model can do without pretending that every model supports the same packet set or state transitions.",
      architectureDesignVi: "B4S giữ vòng đời BLE native trong Rust và cung cấp interface hẹp theo capability cho UI SolidJS qua Tauri. Nhờ đó UI mô tả được từng model tai nghe có thể làm gì mà không giả định mọi model hỗ trợ cùng một packet set hoặc state transition.",
      technicalDecisions: [
        "Separate transport, packet codec, device profile, and UI capability rendering.",
        "Treat disconnects, unsupported commands, and partial device responses as normal states.",
        "Keep the application local-first and avoid accounts or telemetry that are not required for the feature.",
        "Document supported device behavior instead of claiming universal Baseus compatibility."
      ],
      technicalDecisionsVi: [
        "Tách transport, packet codec, device profile và phần render UI theo capability.",
        "Coi disconnect, command không hỗ trợ và response không đầy đủ là các trạng thái bình thường.",
        "Giữ ứng dụng local-first, không thêm account hoặc telemetry nếu feature không cần.",
        "Document behavior của thiết bị được hỗ trợ thay vì claim tương thích toàn bộ Baseus."
      ],
      keyTakeaways: [
        "Protocol understanding should shape the product model before the UI gets polished.",
        "Capability-driven UI is safer than a large collection of optimistic buttons.",
        "Local privacy is a product requirement when the tool controls personal hardware."
      ],
      keyTakeawaysVi: [
        "Hiểu protocol nên định hình product model trước khi polish UI.",
        "UI theo capability an toàn hơn một tập hợp lớn các button chỉ giả định là sẽ hoạt động.",
        "Privacy local là yêu cầu sản phẩm khi công cụ điều khiển phần cứng cá nhân."
      ]
    }
  }
];
