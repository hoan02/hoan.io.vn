import type { Article } from "@/types";

const article: Article = {
  slug: "camrelay-from-proprietary-p2p-to-private-rtsp",
  title: "CamRelay: Tunnelling a Vendor P2P Camera Path into a Local TCP/RTSP Endpoint",
  titleVi: "CamRelay: Đưa đường P2P của hãng camera thành endpoint TCP/RTSP cục bộ",
  summary: "A build log read from the camrelay repository: a Rust daemon that carries a camera's own RTSP session through a reverse-engineered P2P channel for cameras I own, how recording and rclone archiving hang off it, and where reconnect, stop and error handling are still unfinished.",
  summaryVi: "Build log đọc từ repo camrelay: một daemon Rust chuyển phiên RTSP của chính camera qua kênh P2P được dựng lại bằng reverse engineering, dành cho camera tôi sở hữu; cách recording và archive bằng rclone gắn vào đó, và những chỗ reconnect, stop, xử lý lỗi còn chưa xong.",
  date: "Feb 2026",
  updated: "Oct 2026",
  readTime: "12 min read",
  tags: ["Camrelay", "Rust", "Tokio", "P2P", "RTSP", "Frigate", "FFmpeg", "rclone", "Systems"],
  featured: false,
  format: "build-log",
  formatVi: "Build log",
  project: "camrelay",
  relatedProject: "camrelay-p2p-rtsp-bridge",
  relatedHighlightId: "p2p-to-rtsp",
  series: "Systems & field notes",
  seriesVi: "Hệ thống & field notes",
  evidenceIds: ["camrelay-rust-p2p-rtsp"],
  repositoryUrl: "https://github.com/hoan02/camrelay",
  highlights: [
    {
      value: "3",
      label: "Cargo workspace members",
      labelVi: "Member trong Cargo workspace",
      detail: "Root daemon (6,528 lines in src/), camrelay-contract (164), camrelay-storage (958)",
      detailVi: "Daemon gốc (6.528 dòng trong src/), camrelay-contract (164), camrelay-storage (958)",
    },
    {
      value: "20",
      label: "Unit tests, none against a camera",
      labelVi: "Unit test, không test nào dùng camera thật",
      detail: "Across 8 files; CI runs fmt, check, test and clippy -D warnings",
      detailVi: "Trong 8 file; CI chạy fmt, check, test và clippy -D warnings",
    },
    {
      value: "5 s / 8 s",
      label: "Heartbeat vs read timeout",
      labelVi: "Heartbeat so với timeout đọc",
      detail: "Every channel is bounded at 128 messages; no reconnect loop exists after the tunnel starts",
      detailVi: "Mọi channel bị chặn ở 128 message; không có vòng reconnect nào sau khi tunnel đã khởi động",
    },
    {
      value: "0 of 3",
      label: "Device rows validated",
      labelVi: "Dòng thiết bị đã xác minh",
      detail: "docs/device-validation-matrix.md lists IMOU, Dahua and KBVision, all Unclaimed",
      detailVi: "docs/device-validation-matrix.md liệt kê IMOU, Dahua và KBVision, tất cả đều Unclaimed",
    },
  ],
  sections: [
    {
      id: "why-a-bridge",
      title: "Why a bridge: the camera speaks P2P, the NVR speaks RTSP",
      titleVi: "Vì sao cần một bridge: camera nói P2P, NVR nói RTSP",
      content: `Frigate, Home Assistant and FFmpeg all want the same thing: an \`rtsp://\` URL on the local network. Some Dahua-family cameras and recorders that I own are reachable remotely only through the vendor's P2P path: a cloud signaling server brokers a UDP session between the app and the device, and nothing is exposed as a plain RTSP port. \`camrelay\` is my attempt to speak that path from a small Rust daemon, so that a local consumer sees a normal TCP endpoint.

This is interoperability work for cameras I own and administer. The README says the same: use only credentials and P2P access for devices you are authorized to administer. I will describe the protocol only as far as the repository's own README and docs do, and the article contains no credentials, serials or provider account details.

What I read for this note: the \`README.md\`, the architecture, media-gateway and device-validation docs, every Rust source file in \`src/\`, the two workspace crates, \`Dockerfile\`, \`deploy/compose/\`, the CI workflow and \`dh-p2p.lua\`. I did not run it against a camera for this article. Where I say "as I read it", it is the code, not a test run. The clone is shallow (one commit visible), so I say nothing about how the design evolved or why unless a doc says so.

One correction to how I used to describe the project, since it shapes everything below: \`camrelay\` is not an RTSP server. It does not parse the camera's media or re-serve frames. It opens a local TCP listener per camera and carries the bytes of the camera's own RTSP server through the P2P session. RTSP awareness exists in exactly one place, a loopback auth proxy, covered in section four.`,
      contentVi: `Frigate, Home Assistant và FFmpeg đều cần cùng một thứ: một URL \`rtsp://\` trong mạng nội bộ. Một số camera và đầu ghi họ Dahua mà tôi sở hữu chỉ truy cập từ xa được qua đường P2P của hãng: một cloud signaling server môi giới phiên UDP giữa app và thiết bị, và không có cổng RTSP thông thường nào được mở. \`camrelay\` là nỗ lực của tôi để nói chuyện qua đường đó từ một daemon Rust nhỏ, để consumer nội bộ thấy một TCP endpoint bình thường.

Đây là công việc interoperability cho camera tôi sở hữu và quản trị. README cũng nói như vậy: chỉ dùng credential và truy cập P2P cho thiết bị bạn được phép quản trị. Tôi chỉ mô tả protocol ở mức README và docs của repo mô tả, và bài viết không chứa credential, serial hay thông tin tài khoản provider.

Những gì tôi đã đọc: \`README.md\`, các tài liệu architecture, media-gateway và device-validation, mọi file Rust trong \`src/\`, hai crate trong workspace, \`Dockerfile\`, \`deploy/compose/\`, workflow CI và \`dh-p2p.lua\`. Tôi không chạy nó với camera thật để viết bài này. Chỗ nào ghi "theo tôi đọc" nghĩa là đọc code, không phải kết quả chạy thử. Bản clone là shallow (chỉ thấy một commit), nên tôi không nói gì về lịch sử thiết kế hay lý do, trừ khi tài liệu nói rõ.

Một điều chỉnh so với cách tôi từng mô tả dự án, vì nó ảnh hưởng mọi thứ phía dưới: \`camrelay\` không phải RTSP server. Nó không parse media của camera hay phát lại frame. Nó mở một TCP listener cục bộ cho mỗi camera và chuyển byte của chính RTSP server trên camera qua phiên P2P. Phần hiểu RTSP chỉ nằm ở một chỗ, là auth proxy loopback, nói ở mục bốn.`,
      callout: {
        type: "info",
        text: "Everything here concerns devices you own. Compatibility is per model, firmware and region: docs/device-validation-matrix.md lists three rows (IMOU, Dahua, KBVision) and all three are marked Unclaimed.",
        textVi: "Mọi thứ ở đây chỉ áp dụng cho thiết bị bạn sở hữu. Tương thích phụ thuộc model, firmware và region: docs/device-validation-matrix.md có ba dòng (IMOU, Dahua, KBVision) và cả ba đều ghi Unclaimed.",
      },
    },
    {
      id: "architecture",
      title: "Architecture: one daemon, two small crates, a lot in the root",
      titleVi: "Kiến trúc: một daemon, hai crate nhỏ, phần lớn nằm ở crate gốc",
      content: `The Cargo workspace has three members: the root \`camrelay\` binary and two library crates. The async runtime is Tokio (locked at 1.52.3 in \`Cargo.lock\`, \`features = ["full"]\`), the HTTP layer is Axum 0.7.9, outbound HTTP is \`reqwest\` 0.12 with rustls, and the SQLite layer is \`sqlx\` 0.8.

| Member | Lines | What it owns |
| --- | --- | --- |
| \`src/\` (root binary) | 6,528 | P2P handshake (\`dh.rs\`, 695), PTCP framing (\`ptcp.rs\`, 389), tunnel lifecycle (\`tunnel.rs\`, 210), byte pumps (\`process.rs\`, 175), RTSP auth proxy (\`rtsp_proxy.rs\`, 419), FFmpeg live and recording (\`live.rs\`, \`recordings.rs\`), Axum API and auth (\`web.rs\`, 3,093) |
| \`crates/camrelay-contract\` | 164 | Serde DTOs for \`/api/v1\`: roles, error envelope, camera, recording and audit summaries |
| \`crates/camrelay-storage\` | 958 | SQLite, three migrations, Argon2id user hashes, ChaCha20-Poly1305 for stored secrets, sessions, audit log, idempotent import of the legacy JSON files |

The split is worth being honest about. \`docs/architecture.md\` describes a target layout with \`camrelay-core\`, \`camrelay-api\` and \`camrelay-media\` crates. Those crates do not exist yet. Today the P2P code, the HTTP API and the FFmpeg supervision all live in the root crate, and \`web.rs\` alone is almost half of it. The two extracted crates are the parts that had a clean seam: the wire types and the persistence layer.

Around the daemon sit a React console (\`apps/web\`, Vite), a Flutter client (\`apps/mobile\`) and a shared design-token package. I will not cover them; they only use the versioned \`/api/v1\` and, per the architecture doc, never see camera credentials.

Two supervisors tick inside the process. Tunnels are started once, at boot for cameras with \`auto_start\`, or from the API. A separate loop in \`main.rs\` wakes every \`archive_poll_seconds\` (default 15, floor 5) and calls \`RecordingManager::reconcile\`, which is the only periodic self-healing in the codebase. Section five comes back to that.`,
      contentVi: `Cargo workspace có ba member: binary \`camrelay\` ở gốc và hai library crate. Async runtime là Tokio (khóa ở 1.52.3 trong \`Cargo.lock\`, \`features = ["full"]\`), tầng HTTP là Axum 0.7.9, HTTP phía ngoài dùng \`reqwest\` 0.12 với rustls, và tầng SQLite là \`sqlx\` 0.8.

| Member | Số dòng | Phụ trách |
| --- | --- | --- |
| \`src/\` (binary gốc) | 6.528 | Handshake P2P (\`dh.rs\`, 695), framing PTCP (\`ptcp.rs\`, 389), vòng đời tunnel (\`tunnel.rs\`, 210), các bơm byte (\`process.rs\`, 175), RTSP auth proxy (\`rtsp_proxy.rs\`, 419), FFmpeg live và recording (\`live.rs\`, \`recordings.rs\`), API Axum và auth (\`web.rs\`, 3.093) |
| \`crates/camrelay-contract\` | 164 | DTO Serde cho \`/api/v1\`: role, error envelope, summary của camera, recording, audit |
| \`crates/camrelay-storage\` | 958 | SQLite, ba migration, hash user bằng Argon2id, ChaCha20-Poly1305 cho secret lưu trữ, session, audit log, import idempotent từ file JSON cũ |

Cách chia này cần nói thật. \`docs/architecture.md\` mô tả layout đích gồm các crate \`camrelay-core\`, \`camrelay-api\` và \`camrelay-media\`. Những crate đó chưa tồn tại. Hiện tại code P2P, HTTP API và giám sát FFmpeg đều nằm trong crate gốc, riêng \`web.rs\` đã gần một nửa. Hai crate đã tách là những phần có ranh giới rõ: wire type và tầng persistence.

Xung quanh daemon có một console React (\`apps/web\`, Vite), một client Flutter (\`apps/mobile\`) và một package design token dùng chung. Tôi không đi sâu vào chúng; chúng chỉ dùng \`/api/v1\` có version và theo tài liệu kiến trúc thì không bao giờ thấy credential của camera.

Trong process có hai cơ chế giám sát. Tunnel chỉ được khởi động một lần, lúc boot với camera có \`auto_start\`, hoặc qua API. Một vòng lặp riêng trong \`main.rs\` thức mỗi \`archive_poll_seconds\` (mặc định 15, tối thiểu 5) và gọi \`RecordingManager::reconcile\`, đây là cơ chế tự phục hồi định kỳ duy nhất trong codebase. Mục năm sẽ quay lại chuyện này.`,
    },
    {
      id: "p2p-tunnel",
      title: "The P2P tunnel: handshake, PTCP, realms",
      titleVi: "Tunnel P2P: handshake, PTCP, realm",
      content: `Per camera, \`run_tunnel\` does four things in order: bind a local TCP listener on \`local_port\`, bind a UDP socket, run \`p2p_handshake\`, then start three tasks (writer, reader, heartbeat) and loop on \`accept\`.

**Handshake.** At the level the README documents it: HTTP-like request/response text over UDP to a provider endpoint configured in \`brands.json\`, authenticated with platform credentials that are separate from the camera's own RTSP login, followed by a device-side step that establishes the PTCP channel. Each step has a timeout (5 s for the device handshake, 8 s per signaling read), and the error text suggests that "relay mode may be required" if the direct path fails. \`p2p_handshake\` has a \`relay_mode\` parameter, but \`tunnel.rs\` passes \`false\` and there is no per-camera setting, which the README's limitations list also admits. A provider probe endpoint in the API checks only that the platform credential is accepted; the README is explicit that this does not prove a camera works.

**PTCP.** The README calls it a proprietary protocol reconstructed through reverse engineering, with no official documentation in the repo, and credits two upstream projects for the foundations. In \`ptcp.rs\` a packet is a fixed 24-byte header (magic, two byte counters, a packet id, local and remote message ids) plus one of seven body kinds: sync, command, payload, bind, status, heartbeat, empty. Payloads carry a 32-bit realm and a length, and parsing rejects truncated headers, wrong lengths and non-zero padding with an \`Err\` instead of a panic. There is a test for exactly that. \`dh-p2p.lua\` is a Wireshark dissector for the signaling and PTCP traffic, shipped for investigation; the README labels it optional, and the Dockerfile copies it into the image.

**Realms are how several clients share one camera.** Each accepted local TCP client gets a random 32-bit realm. The tunnel sends a Bind for that realm to the remote RTSP port, waits for the device's \`CONN\` status, and only then starts the two pump tasks. Data from the client becomes \`Payload(realm, bytes)\`; data from the device is routed by realm to that client's channel.

\`\`\`rust
// src/tunnel.rs (trimmed)
let (tx, rx) = mpsc::channel::<Vec<u8>>(128);
let (conn_tx, conn_rx) = oneshot::channel::<bool>();
let realm_id = rand::random::<u32>();
channels2.lock().unwrap().insert(realm_id, tx);
conn_channels2.lock().unwrap().insert(realm_id, conn_tx);

dh_tx.send(PTCPEvent::Connect(realm_id)).await?;
conn_rx.await?;                       // wait for the device's CONN

let (r, w) = client.into_split();
tokio::spawn(process_reader(r, realm_id, dh_tx_clone));
tokio::spawn(process_writer(w, rx));
\`\`\`

**Buffering and backpressure.** Every channel is bounded at 128 messages, the client read buffer is 4096 bytes, and a PTCP datagram is read into a 4096-byte buffer. Nothing is unbounded, which matches the "no unbounded queues" rule in the architecture doc. The consequence is head-of-line blocking: \`dh_reader\` does \`tx.send(data).await\` into the per-realm channel inside the single loop that reads the UDP socket. If one local client stops reading, that channel fills and the loop stalls for every realm on that camera. I would call that fine for one NVR per camera and wrong for many viewers.

I also looked for retransmission and reordering. The session tracks sent and received byte counters and acknowledges incoming packets with an empty one, but I did not find a resend queue or a reorder buffer. I do not know whether the device side makes that unnecessary on a clean network; I have not tested a lossy one.`,
      contentVi: `Với mỗi camera, \`run_tunnel\` làm bốn việc theo thứ tự: bind TCP listener cục bộ trên \`local_port\`, bind một UDP socket, chạy \`p2p_handshake\`, rồi khởi động ba task (writer, reader, heartbeat) và lặp \`accept\`.

**Handshake.** Ở mức README mô tả: request/response dạng HTTP-like text qua UDP tới một provider endpoint cấu hình trong \`brands.json\`, xác thực bằng platform credential tách biệt với tài khoản RTSP của camera, sau đó là bước phía thiết bị để thiết lập kênh PTCP. Mỗi bước có timeout (5 s cho handshake với thiết bị, 8 s cho mỗi lần đọc signaling), và thông báo lỗi gợi ý "relay mode may be required" nếu đường direct thất bại. \`p2p_handshake\` có tham số \`relay_mode\`, nhưng \`tunnel.rs\` truyền \`false\` và không có cài đặt theo từng camera, điều mà danh sách limitations của README cũng thừa nhận. Endpoint probe provider trong API chỉ kiểm tra platform credential được chấp nhận; README nói rõ điều này không chứng minh camera hoạt động.

**PTCP.** README gọi đây là protocol proprietary được dựng lại bằng reverse engineering, không có tài liệu chính thức trong repo, và ghi nhận hai dự án upstream làm nền tảng. Trong \`ptcp.rs\`, một packet gồm header cố định 24 byte (magic, hai bộ đếm byte, packet id, message id local và remote) cộng một trong bảy loại body: sync, command, payload, bind, status, heartbeat, empty. Payload mang realm 32-bit và độ dài; parser từ chối header bị cắt, độ dài sai và padding khác 0 bằng \`Err\` thay vì panic. Có test cho đúng điều đó. \`dh-p2p.lua\` là Wireshark dissector cho traffic signaling và PTCP, dùng để điều tra; README ghi là tùy chọn, và Dockerfile copy nó vào image.

**Realm là cách nhiều client dùng chung một camera.** Mỗi TCP client cục bộ được accept sẽ nhận một realm 32-bit ngẫu nhiên. Tunnel gửi Bind cho realm đó tới cổng RTSP từ xa, chờ trạng thái \`CONN\` từ thiết bị, rồi mới chạy hai task bơm dữ liệu. Dữ liệu từ client thành \`Payload(realm, bytes)\`; dữ liệu từ thiết bị được định tuyến theo realm về channel của client đó.

\`\`\`rust
// src/tunnel.rs (trimmed)
let (tx, rx) = mpsc::channel::<Vec<u8>>(128);
let (conn_tx, conn_rx) = oneshot::channel::<bool>();
let realm_id = rand::random::<u32>();
channels2.lock().unwrap().insert(realm_id, tx);
conn_channels2.lock().unwrap().insert(realm_id, conn_tx);

dh_tx.send(PTCPEvent::Connect(realm_id)).await?;
conn_rx.await?;                       // wait for the device's CONN

let (r, w) = client.into_split();
tokio::spawn(process_reader(r, realm_id, dh_tx_clone));
tokio::spawn(process_writer(w, rx));
\`\`\`

**Buffering và backpressure.** Mọi channel đều bị chặn ở 128 message, buffer đọc client là 4096 byte, và một datagram PTCP được đọc vào buffer 4096 byte. Không có gì unbounded, khớp với quy tắc "no unbounded queues" trong tài liệu kiến trúc. Hệ quả là head-of-line blocking: \`dh_reader\` gọi \`tx.send(data).await\` vào channel của realm bên trong một vòng lặp duy nhất đọc UDP socket. Nếu một client cục bộ ngừng đọc, channel đầy và vòng lặp bị kẹt với mọi realm của camera đó. Tôi cho rằng tạm ổn với một NVR cho mỗi camera, và không phù hợp nếu có nhiều người xem.

Tôi cũng tìm cơ chế truyền lại và sắp xếp lại thứ tự. Session theo dõi bộ đếm byte gửi và nhận, và ack packet đến bằng một packet rỗng, nhưng tôi không thấy hàng đợi gửi lại hay reorder buffer. Tôi không biết phía thiết bị có làm điều đó thành không cần thiết trên mạng sạch hay không; tôi chưa thử trên mạng có mất gói.`,
    },
    {
      id: "consumers",
      title: "The local side: how Frigate, FFmpeg and the recorder consume it",
      titleVi: "Phía local: Frigate, FFmpeg và recorder dùng nó thế nào",
      content: `A consumer connects to \`127.0.0.1:<local_port>\` (the host that runs the daemon) and speaks RTSP to the camera as if the camera were local. The README's test command uses TCP transport: \`ffplay -rtsp_transport tcp "rtsp://127.0.0.1:8551/cam/realmonitor?channel=1&subtype=0"\`. Because the listener is a TCP socket, I would expect RTP over UDP not to work through it; I have not tried. For Frigate the README says to use the same URL as an input. There is no Frigate-specific test or config in the repo, and the README lists a native Frigate integration under "not yet promised". Home Assistant is not mentioned anywhere in the repo's README or docs, so I will not claim more than "any RTSP client".

**Credentials stay out of URLs.** The raw tunnel just forwards the camera's authentication challenge to the client. For the paths the daemon starts itself (HLS preview and recording) there is \`rtsp_proxy.rs\`: a loopback listener on an ephemeral port that sits between FFmpeg and the tunnel. It reads RTSP messages (including \`$\`-prefixed interleaved frames), answers the camera's 401 with Basic or Digest authorization built from the stored camera login, and after a successful \`PLAY\` switches to \`copy_bidirectional\`. The point, per the README, is that camera secrets never appear on an FFmpeg command line. Two tests cover Basic and Digest header construction.

**Recording.** \`recordings.rs\` spawns FFmpeg once per running camera:

\`\`\`rust
// src/recordings.rs: start_recorder (args trimmed)
Command::new(&self.config.ffmpeg_path).args([
    "-hide_banner", "-loglevel", "warning",
    "-rtsp_transport", "tcp", "-i", &url,   // loopback proxy URL
    "-map", "0", "-c", "copy",
    "-f", "segment", "-segment_time", &segment_seconds,
    "-reset_timestamps", "1", "-strftime", "1", &output,
]).spawn()
\`\`\`

\`-c copy\` means no transcoding: the stream is remuxed into MP4 segments named by timestamp, \`segment_seconds\` defaulting to 300 with a floor of 30. A segment is indexed into \`recordings.json\` (or SQLite) only once it is non-empty and its mtime is at least 8 seconds old, so an open file is skipped. There is no hardware acceleration: every FFmpeg invocation I found copies the video stream (the HLS path re-encodes audio to AAC).

**Archive.** Closed segments are SHA-256'd and uploaded with \`rclone copyto --retries 3 --low-level-retries 10 --retries-sleep 5s\`. With \`archive_verify\` on, it downloads the object again and compares hashes. rclone remotes are configured outside the repo; the Compose file mounts the rclone config read-only. Live HLS is separate: 2-second segments, a 6-entry playlist, \`delete_segments\`, served behind a camera-scoped ticket.`,
      contentVi: `Consumer kết nối tới \`127.0.0.1:<local_port>\` (trên host chạy daemon) và nói RTSP với camera như thể camera nằm trong mạng local. Lệnh test trong README dùng TCP transport: \`ffplay -rtsp_transport tcp "rtsp://127.0.0.1:8551/cam/realmonitor?channel=1&subtype=0"\`. Vì listener là TCP socket, tôi đoán RTP over UDP sẽ không chạy qua nó; tôi chưa thử. Với Frigate, README bảo dùng cùng URL đó làm input. Repo không có test hay config riêng cho Frigate, và README xếp native Frigate integration vào mục "not yet promised". Home Assistant không được nhắc tới ở đâu trong README hay docs của repo, nên tôi không khẳng định gì hơn "bất kỳ RTSP client nào".

**Credential không nằm trong URL.** Tunnel thô chỉ chuyển nguyên thử thách xác thực của camera cho client. Với các đường do daemon tự khởi động (HLS preview và recording) có \`rtsp_proxy.rs\`: một listener loopback trên cổng ngẫu nhiên nằm giữa FFmpeg và tunnel. Nó đọc các message RTSP (kể cả interleaved frame bắt đầu bằng \`$\`), trả lời 401 của camera bằng Basic hoặc Digest authorization dựng từ login camera đã lưu, và sau \`PLAY\` thành công thì chuyển sang \`copy_bidirectional\`. Theo README, mục đích là để secret của camera không bao giờ xuất hiện trên command line của FFmpeg. Hai test kiểm tra việc dựng header Basic và Digest.

**Recording.** \`recordings.rs\` spawn một FFmpeg cho mỗi camera đang chạy:

\`\`\`rust
// src/recordings.rs: start_recorder (args trimmed)
Command::new(&self.config.ffmpeg_path).args([
    "-hide_banner", "-loglevel", "warning",
    "-rtsp_transport", "tcp", "-i", &url,   // loopback proxy URL
    "-map", "0", "-c", "copy",
    "-f", "segment", "-segment_time", &segment_seconds,
    "-reset_timestamps", "1", "-strftime", "1", &output,
]).spawn()
\`\`\`

\`-c copy\` nghĩa là không transcode: stream được remux thành các segment MP4 đặt tên theo timestamp, \`segment_seconds\` mặc định 300 và tối thiểu 30. Một segment chỉ được lập chỉ mục vào \`recordings.json\` (hoặc SQLite) khi file không rỗng và mtime đã cách ít nhất 8 giây, nên file đang ghi bị bỏ qua. Không có hardware acceleration: mọi lệnh FFmpeg tôi tìm thấy đều copy video stream (đường HLS mã hóa lại audio sang AAC).

**Archive.** Segment đã đóng được tính SHA-256 và upload bằng \`rclone copyto --retries 3 --low-level-retries 10 --retries-sleep 5s\`. Khi bật \`archive_verify\`, nó tải object về lần nữa và so hash. Remote rclone được cấu hình ngoài repo; file Compose mount config rclone ở chế độ read-only. HLS live tách riêng: segment 2 giây, playlist 6 mục, \`delete_segments\`, phục vụ qua ticket giới hạn theo camera.`,
    },
    {
      id: "failure-modes",
      title: "Failure modes: what the code does when things break",
      titleVi: "Failure mode: code làm gì khi có sự cố",
      content: `This is the section where reading the code matters most, because the README's limitations list already says "error handling and reconnect behavior still need hardening for unattended NVR use" and "guaranteed reconnection after every network or device failure" is under not-yet-promised. Here is what I can add by following the paths.

| Event | What I read in the code |
| --- | --- |
| No packet from the device for 8 s | \`ptcp_read\` times out, returns \`Err\`, \`dh_reader\` logs \`P2P reader stopped\` and exits |
| One malformed datagram | Parse returns \`Err\` (no panic); \`dh_reader\` treats any \`Err\` the same way and exits |
| UDP send fails | \`dh_writer\` logs and exits |
| Reader or writer has exited | Tunnel status stays \`Running\`; the TCP listener keeps accepting; nothing restarts the session |
| Handshake fails at start | Status becomes \`Error(message)\`; no retry |
| FFmpeg recorder exits | Next \`reconcile\` tick reaps it and starts a new one, if the tunnel status is still \`Running\` |
| rclone fails | Segment marked \`failed\` with stderr; only \`status == "local"\` rows are scheduled, so a failed one waits for the manual Archive action |
| Disk full | Not handled; FFmpeg's own error is the only signal. \`local_retention_days\` defaults to 0, meaning nothing is deleted |

The heartbeat is a task that sends a heartbeat event every 5 seconds, which is shorter than the 8-second read timeout, so a healthy idle session should not trip it.

\`\`\`rust
// src/tunnel.rs
tokio::spawn(async move {
    loop {
        tokio::time::sleep(Duration::from_secs(5)).await;
        if hb_tx.send(PTCPEvent::Heartbeat).await.is_err() { break; }
    }
});
\`\`\`

The part that worries me is the fourth row. When the reader task dies, the status the API reports and the status \`reconcile\` uses are both still \`Running\`. Recorder restarts then keep launching FFmpeg against a listener that accepts connections but whose accept loop waits for a \`CONN\` that cannot arrive (\`conn_rx.await\` has no timeout). From the outside this looks like a camera that hangs, not one that is down.

Two smaller things I noticed. \`TunnelManager::stop\` aborts the supervisor task, but \`run_tunnel\` runs in a nested \`tokio::spawn\`; as I read Tokio's semantics, dropping that handle detaches the inner task instead of cancelling it, so the listener and sub-tasks may outlive a stop. And I found no place where a realm's sender is removed from the channel map when a client disconnects. Neither is tested; both are things to verify with a real run before I trust them.

On partial frames: FFmpeg's segment muxer owns that problem, not \`camrelay\`. The only guard on the daemon side is the "non-empty and 8 seconds old" rule before indexing. I have not checked what an MP4 segment looks like after FFmpeg is killed mid-write.`,
      contentVi: `Đây là mục mà việc đọc code quan trọng nhất, vì danh sách limitations của README đã ghi "error handling and reconnect behavior still need hardening for unattended NVR use" và "guaranteed reconnection after every network or device failure" nằm trong mục not-yet-promised. Dưới đây là những gì tôi bổ sung được sau khi lần theo các đường code.

| Sự kiện | Điều tôi đọc được trong code |
| --- | --- |
| Không có packet từ thiết bị trong 8 s | \`ptcp_read\` timeout, trả \`Err\`, \`dh_reader\` log \`P2P reader stopped\` rồi thoát |
| Một datagram sai định dạng | Parse trả \`Err\` (không panic); \`dh_reader\` coi mọi \`Err\` như nhau và thoát |
| Gửi UDP lỗi | \`dh_writer\` log rồi thoát |
| Reader hoặc writer đã thoát | Status của tunnel vẫn là \`Running\`; TCP listener vẫn accept; không gì khởi động lại session |
| Handshake lỗi lúc start | Status thành \`Error(message)\`; không retry |
| Recorder FFmpeg thoát | Tick \`reconcile\` kế tiếp dọn nó và chạy cái mới, nếu status tunnel vẫn là \`Running\` |
| rclone lỗi | Segment đánh dấu \`failed\` kèm stderr; chỉ các dòng \`status == "local"\` được lên lịch, nên segment lỗi chờ thao tác Archive thủ công |
| Đầy đĩa | Không xử lý; lỗi của FFmpeg là tín hiệu duy nhất. \`local_retention_days\` mặc định 0, tức không xóa gì |

Heartbeat là một task gửi heartbeat mỗi 5 giây, ngắn hơn timeout đọc 8 giây, nên một session rảnh nhưng khỏe không nên bị timeout.

\`\`\`rust
// src/tunnel.rs
tokio::spawn(async move {
    loop {
        tokio::time::sleep(Duration::from_secs(5)).await;
        if hb_tx.send(PTCPEvent::Heartbeat).await.is_err() { break; }
    }
});
\`\`\`

Phần làm tôi lo là dòng thứ tư. Khi reader task chết, status mà API báo và status mà \`reconcile\` dùng đều vẫn là \`Running\`. Recorder cứ được khởi động lại, FFmpeg liên tục kết nối vào một listener vẫn accept nhưng vòng accept đang chờ một \`CONN\` không thể tới (\`conn_rx.await\` không có timeout). Nhìn từ bên ngoài, nó giống một camera bị treo chứ không phải camera offline.

Hai điều nhỏ hơn tôi để ý. \`TunnelManager::stop\` abort task giám sát, nhưng \`run_tunnel\` chạy trong một \`tokio::spawn\` lồng bên trong; theo cách tôi hiểu ngữ nghĩa của Tokio, drop handle đó sẽ tách task bên trong chứ không hủy nó, nên listener và các sub-task có thể sống lâu hơn lệnh stop. Và tôi không thấy chỗ nào xóa sender của realm khỏi map channel khi client ngắt kết nối. Cả hai đều chưa được test; cần kiểm chứng bằng một lần chạy thật trước khi tôi tin.

Về frame dở dang: segment muxer của FFmpeg lo việc đó, không phải \`camrelay\`. Chốt chặn duy nhất phía daemon là quy tắc "không rỗng và đã 8 giây" trước khi lập chỉ mục. Tôi chưa kiểm tra segment MP4 trông thế nào sau khi FFmpeg bị kill giữa chừng.`,
      callout: {
        type: "warning",
        text: "As far as I can read, a dead P2P session is never detected at the status level, so the dashboard can show a camera as running while nothing flows. This is the first thing I would test and fix.",
        textVi: "Theo những gì tôi đọc được, session P2P đã chết không bao giờ được phát hiện ở tầng status, nên dashboard có thể hiện camera đang chạy trong khi không có dữ liệu nào chảy. Đây là thứ đầu tiên tôi sẽ test và sửa.",
      },
    },
    {
      id: "deploy-config",
      title: "Deployment and configuration",
      titleVi: "Deploy và cấu hình",
      content: `**Config model.** Four JSON files read from the working directory, all git-ignored, with sanitized \`*.example.json\` in the repo: \`config.json\` (web port and credentials, recording, live and archive options, 21 keys in the example), \`brands.json\` (provider endpoint plus platform credentials), \`cameras.json\` and \`tokens.json\`. A camera is nine fields:

\`\`\`json
// cameras.example.json (shape only)
{
  "id": "cam-example", "name": "Front door", "brand": "Dahua",
  "serial": "<device serial>", "username": "admin", "password": "<device RTSP password>",
  "port": 554, "local_port": 8551, "auto_start": false
}
\`\`\`

\`local_port\` must be unique per camera; \`brand\` must match a name in \`brands.json\`. The SQLite mode (\`database_enabled\`) is opt-in and imports these files idempotently; with providers or cameras present it requires \`CAMRELAY_SECRET_KEY\`, a base64 32-byte key that encrypts stored secrets with ChaCha20-Poly1305. The compose README says to back that key up separately.

**Container.** A three-stage Dockerfile: Node 22 builds the React console, \`rust:1.86\` builds a \`--locked\` release binary, and \`debian:bookworm-slim\` carries the result plus \`ffmpeg\` and \`rclone\`, running as a non-root \`camrelay\` user with \`/data\` as a volume. Compose adds \`restart: unless-stopped\`, a health check against \`/api/v1/health\` every 30 seconds, and mounts \`./data\` and the rclone config. Port 8080 is the only published port. An optional override adds MediaMTX on a private Docker network for a WebRTC preview; the docs call it a foundation, not a verified path, and HLS is the one marked verified. The README warns against exposing the web server directly because there is no built-in TLS.

The tunnel listener binds \`0.0.0.0:<local_port>\`, so on a bare-metal run the raw RTSP tunnel (and its camera login challenge) is reachable from the LAN. In Compose, only 8080 is published, which narrows that.

**Observability and tests.** Logging is \`println!\`/\`eprintln!\` (about 45 call sites, no \`tracing\`), and the PTCP layer prints a line for every packet it sends and reads. The structured pieces are an audit log in SQLite (written without request secrets, per a test) and a \`/api/v1\` SSE system stream that publishes status every 5 seconds. There are 20 unit tests across eight files: PTCP and handshake parsing, RTSP auth headers, live gateway selection, recording checksum and retention, storage hashing, session rotation, import idempotency. CI runs fmt, check, test and \`clippy -D warnings\`, plus web typecheck/build, Flutter analyze/test/APK, and a Docker build without push. None of it touches a camera.`,
      contentVi: `**Mô hình config.** Bốn file JSON đọc từ thư mục làm việc, đều bị git-ignore, repo có bản \`*.example.json\` đã làm sạch: \`config.json\` (cổng web và credential, tùy chọn recording, live, archive; 21 key trong bản example), \`brands.json\` (provider endpoint cùng platform credential), \`cameras.json\` và \`tokens.json\`. Một camera có chín field:

\`\`\`json
// cameras.example.json (shape only)
{
  "id": "cam-example", "name": "Front door", "brand": "Dahua",
  "serial": "<device serial>", "username": "admin", "password": "<device RTSP password>",
  "port": 554, "local_port": 8551, "auto_start": false
}
\`\`\`

\`local_port\` phải khác nhau giữa các camera; \`brand\` phải khớp một tên trong \`brands.json\`. Chế độ SQLite (\`database_enabled\`) là opt-in và import các file này một cách idempotent; khi đã có provider hoặc camera thì cần \`CAMRELAY_SECRET_KEY\`, khóa 32 byte mã hóa base64 dùng để mã hóa secret lưu trữ bằng ChaCha20-Poly1305. README của compose dặn sao lưu khóa này riêng.

**Container.** Dockerfile ba stage: Node 22 build console React, \`rust:1.86\` build binary release với \`--locked\`, và \`debian:bookworm-slim\` chứa kết quả cùng \`ffmpeg\` và \`rclone\`, chạy bằng user \`camrelay\` không phải root với \`/data\` là volume. Compose thêm \`restart: unless-stopped\`, health check tới \`/api/v1/health\` mỗi 30 giây, và mount \`./data\` cùng config rclone. Cổng 8080 là cổng duy nhất được publish. Một override tùy chọn thêm MediaMTX trên mạng Docker riêng cho WebRTC preview; tài liệu gọi nó là foundation chứ không phải đường đã xác minh, và HLS mới là đường được đánh dấu verified. README cảnh báo không expose web server trực tiếp vì không có TLS tích hợp.

Tunnel listener bind \`0.0.0.0:<local_port>\`, nên khi chạy trực tiếp trên máy, raw RTSP tunnel (cùng thử thách đăng nhập camera) truy cập được từ LAN. Trong Compose chỉ 8080 được publish, điều này thu hẹp rủi ro.

**Observability và test.** Logging là \`println!\`/\`eprintln!\` (khoảng 45 vị trí gọi, không có \`tracing\`), và tầng PTCP in một dòng cho mỗi packet gửi và nhận. Phần có cấu trúc là audit log trong SQLite (ghi không kèm secret của request, có test) và một SSE system stream của \`/api/v1\` phát status mỗi 5 giây. Có 20 unit test trong tám file: parse PTCP và handshake, header auth RTSP, chọn live gateway, checksum và retention của recording, hash trong storage, xoay session, tính idempotent của import. CI chạy fmt, check, test và \`clippy -D warnings\`, cộng typecheck/build web, analyze/test/APK Flutter, và build Docker không push. Không test nào chạm tới camera thật.`,
    },
    {
      id: "rough-edges",
      title: "Rough edges, and what I would check next",
      titleVi: "Điểm còn thô, và việc tôi sẽ kiểm tra tiếp",
      content: `I do not have measurements for this project. The repository contains no benchmark, no memory figure and no latency figure, so I make no claim about footprint or delay and the repo documents none, so I state none.

What I consider unfinished, in the order I would work on it:

1. **Session supervision.** Detect a dead reader or writer, set the status to \`Error\`, close client sockets, and re-run the handshake with backoff. Add a timeout around \`conn_rx.await\`.
2. **Make \`stop\` actually stop.** Abort or signal the inner task, and remove realm entries on disconnect.
3. **A real-device test row.** The validation matrix has three \`Unclaimed\` rows. The README's own limitation, "no automated integration test against a real camera", stands; a fake PTCP peer in a test would cover reconnect without hardware.
4. **Failed uploads.** Re-queue \`failed\` segments with a cap instead of waiting for a click, and handle low disk space explicitly.
5. **Logs and crates.** Move per-packet \`println!\` behind \`tracing\` levels, and extract the \`core\` crate the architecture doc names so P2P code tests without Axum.

Not done and not claimed: universal Dahua compatibility, IMOU compatibility, automatic discovery, built-in TLS, a native Frigate integration, and a verified WebRTC path.

Separately, I noticed the repo's default login for a fresh start without a config file is \`admin\` / \`admin\` (the example config uses \`change-me\`). The README says to change it before exposing the service; I would rather the daemon refused to start with the default.`,
      contentVi: `Tôi không có số đo cho dự án này. Repo không chứa benchmark, con số bộ nhớ hay độ trễ nào, nên tôi không khẳng định gì về footprint hay độ trễ, nên tôi không nêu con số nào.

Những gì tôi coi là chưa xong, theo thứ tự tôi sẽ làm:

1. **Giám sát session.** Phát hiện reader hoặc writer đã chết, đặt status thành \`Error\`, đóng socket của client, và chạy lại handshake với backoff. Thêm timeout quanh \`conn_rx.await\`.
2. **Làm cho \`stop\` thực sự dừng.** Abort hoặc báo hiệu cho task bên trong, và xóa realm khỏi map khi client ngắt.
3. **Một dòng test trên thiết bị thật.** Validation matrix có ba dòng \`Unclaimed\`. Hạn chế của chính README, "no automated integration test against a real camera", vẫn còn; một PTCP peer giả trong test sẽ kiểm được reconnect mà không cần phần cứng.
4. **Upload lỗi.** Đưa segment \`failed\` vào hàng đợi lại có giới hạn thay vì chờ một cú click, và xử lý đĩa đầy một cách tường minh.
5. **Log và crate.** Chuyển \`println!\` theo từng packet sang các mức của \`tracing\`, và tách crate \`core\` mà tài liệu kiến trúc đã nêu để test code P2P mà không cần Axum.

Chưa làm và không tuyên bố: tương thích Dahua phổ quát, tương thích IMOU, tự động discovery, TLS tích hợp, native Frigate integration, và đường WebRTC đã xác minh.

Ngoài lề: tôi để ý login mặc định khi khởi động mà không có file config là \`admin\` / \`admin\` (config example dùng \`change-me\`). README dặn đổi trước khi expose service; tôi muốn daemon từ chối khởi động với mật khẩu mặc định hơn.`,
    },
  ],
  content: {
    problemStatement: "Camera ecosystems that are reachable only through a vendor P2P cloud do not fit NVR software that expects a local RTSP URL. For cameras I own, I wanted a small daemon that hides the P2P session and hands local tools an ordinary TCP endpoint.",
    problemStatementVi: "Hệ sinh thái camera chỉ truy cập được qua cloud P2P của hãng không khớp với phần mềm NVR vốn cần một URL RTSP cục bộ. Với camera tôi sở hữu, tôi muốn có một daemon nhỏ che đi phiên P2P và đưa cho công cụ cục bộ một TCP endpoint bình thường.",
    architectureDesign: "camrelay is a Tokio and Axum daemon. For each camera it runs a provider handshake over UDP, opens a PTCP session, and exposes one local TCP port; each local client becomes a multiplexed realm that carries the camera's own RTSP bytes. A loopback RTSP auth proxy lets FFmpeg record MP4 segments and produce HLS without camera credentials on a command line, and rclone uploads closed segments. A reconcile loop restarts recorders and schedules uploads; the tunnel itself has no reconnect logic yet.",
    architectureDesignVi: "camrelay là daemon Tokio và Axum. Với mỗi camera, nó chạy handshake với provider qua UDP, mở một phiên PTCP và mở một cổng TCP cục bộ; mỗi client cục bộ thành một realm được multiplex, mang byte RTSP của chính camera. Một RTSP auth proxy loopback cho phép FFmpeg ghi các segment MP4 và tạo HLS mà không đặt credential của camera lên command line, và rclone upload các segment đã đóng. Một vòng reconcile khởi động lại recorder và lên lịch upload; bản thân tunnel chưa có logic reconnect.",
    technicalDecisions: [
      "Tunnel bytes instead of re-serving RTSP: the daemon never parses media. Consequence: low complexity and any RTSP client works, but there is no frame-level view, no shared upstream stream, and UDP RTP is likely unusable.",
      "One UDP session, one local port and one tunnel task per camera, with clients multiplexed as realms. Consequence: cameras fail independently, but one stalled client can block every realm on that camera through the single reader loop.",
      "Bounded channels (128) and fixed small buffers everywhere. Consequence: memory use cannot grow from a slow consumer, at the price of backpressure that propagates upstream.",
      "A loopback RTSP auth proxy for FFmpeg. Consequence: camera passwords stay out of command lines and process lists, at the cost of about 420 lines of hand-written RTSP/Digest handling that only two tests cover.",
      "Recording and archive as optional layers driven by a periodic reconcile loop, with FFmpeg doing `-c copy` segmenting. Consequence: relay availability does not depend on storage or rclone, and recorder restarts come for free, but failed uploads wait for a manual action.",
      "Opt-in SQLite with encrypted secrets beside legacy JSON files. Consequence: a rollback path and idempotent import, but two sources of truth and a master key that must be backed up separately.",
    ],
    technicalDecisionsVi: [
      "Tunnel byte thay vì phát lại RTSP: daemon không bao giờ parse media. Hệ quả: đơn giản và RTSP client nào cũng dùng được, nhưng không có góc nhìn ở mức frame, không có stream upstream dùng chung, và UDP RTP nhiều khả năng không dùng được.",
      "Một phiên UDP, một cổng cục bộ và một tunnel task cho mỗi camera, client được multiplex thành realm. Hệ quả: các camera lỗi độc lập, nhưng một client bị kẹt có thể chặn mọi realm của camera đó qua vòng reader duy nhất.",
      "Channel bị chặn (128) và buffer nhỏ cố định ở mọi nơi. Hệ quả: bộ nhớ không thể phình lên vì consumer chậm, đổi lại backpressure lan ngược lên upstream.",
      "Một RTSP auth proxy loopback cho FFmpeg. Hệ quả: mật khẩu camera không nằm trên command line hay danh sách process, đổi lại khoảng 420 dòng xử lý RTSP/Digest viết tay mà chỉ có hai test bao phủ.",
      "Recording và archive là các lớp tùy chọn chạy bởi vòng reconcile định kỳ, FFmpeg segment bằng `-c copy`. Hệ quả: tính sẵn sàng của relay không phụ thuộc storage hay rclone, recorder tự khởi động lại, nhưng upload lỗi phải chờ thao tác thủ công.",
      "SQLite opt-in với secret được mã hóa bên cạnh các file JSON cũ. Hệ quả: có đường rollback và import idempotent, nhưng có hai nguồn sự thật và một master key phải sao lưu riêng.",
    ],
    keyTakeaways: [
      "A bridge that tunnels bytes is small and honest, but it inherits every failure of the session underneath it.",
      "Status must reflect the session, not the process: a task that exits quietly while the API says running is worse than a crash.",
      "Compatibility claims belong in a per-device evidence table; the repo's own matrix is empty, so I claim none.",
      "Documented and measured are different things: without a benchmark in the repo, I publish no performance number.",
    ],
    keyTakeawaysVi: [
      "Một bridge tunnel byte thì nhỏ và thẳng thắn, nhưng thừa hưởng mọi lỗi của phiên nằm bên dưới nó.",
      "Status phải phản ánh session chứ không phải process: một task thoát im lặng trong khi API báo running còn tệ hơn một crash.",
      "Tuyên bố tương thích thuộc về bảng bằng chứng theo từng thiết bị; matrix của repo đang trống, nên tôi không tuyên bố gì.",
      "Có tài liệu và có số đo là hai việc khác nhau: repo không có benchmark nên tôi không đăng con số hiệu năng nào.",
    ],
  },
};

export default article;
