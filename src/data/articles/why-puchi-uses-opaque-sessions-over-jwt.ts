import type { Article } from "@/types";

const article: Article = {
  "slug": "why-puchi-uses-opaque-sessions-over-jwt",
  "title": "Opaque Sessions Instead of JWT in Puchi: What the Code Does and What It Costs",
  "titleVi": "Opaque Session thay vì JWT trong Puchi: Code thực sự làm gì và tốn gì",
  "summary": "Puchi's auth service is a thin Limen wrapper over Postgres sessions; other Go services introspect over HTTP with a 60-second in-process cache. What that gives, where it leaks, and what is still open.",
  "summaryVi": "Auth service của Puchi là lớp mỏng bọc Limen trên session Postgres; các service Go khác introspect qua HTTP với cache 60 giây trong process. Điều đó mang lại gì, rò rỉ ở đâu, và việc nào còn mở.",
  "date": "Jan 2026",
  "updated": "Oct 2026",
  "readTime": "9 min read",
  "tags": [
    "Puchidemy",
    "Auth",
    "Sessions",
    "Go",
    "Limen",
    "Security",
    "Decision record"
  ],
  "featured": false,
  "project": "puchi",
  "relatedProject": "puchi-language-platform",
  "diagramKey": "why-puchi-uses-opaque-sessions-over-jwt",
  "evidenceIds": [
    "puchi-opaque-session-auth"
  ],
  "repositoryUrl": "https://github.com/puchidemy/puchi-backend",
  "format": "decision-record",
  "formatVi": "Hồ sơ quyết định",
  "highlights": [
    {
      "value": "5",
      "label": "Go services in app/",
      "labelVi": "Go service trong app/",
      "detail": "auth, core, learn, media, notification; each has its own go.mod and is listed in go.work.",
      "detailVi": "auth, core, learn, media, notification; mỗi service có go.mod riêng và nằm trong go.work."
    },
    {
      "value": "4",
      "label": "services that introspect",
      "labelVi": "service gọi introspect",
      "detail": "core, learn, media and notification call auth-service GET /internal/session through pkg/auth.",
      "detailVi": "core, learn, media và notification gọi auth-service GET /internal/session qua pkg/auth."
    },
    {
      "value": "60 s",
      "label": "in-process cache TTL",
      "labelVi": "TTL cache trong process",
      "detail": "Set in InitAuth (pkg/auth/auth.go); also the upper bound on how long a revoked token can still be honoured by one process.",
      "detailVi": "Đặt trong InitAuth (pkg/auth/auth.go); cũng là cận trên thời gian một process còn chấp nhận token đã thu hồi."
    },
    {
      "value": "1",
      "label": "auth replica",
      "labelVi": "replica của auth",
      "detail": "replicas: 1 in puchi-infra/infra/backend/auth/deployment.yaml.",
      "detailVi": "replicas: 1 trong puchi-infra/infra/backend/auth/deployment.yaml."
    }
  ],
  "comparison": {
    "naiveTitle": "Before: custom JWT service",
    "naiveTitleVi": "Trước: service JWT tự viết",
    "naivePoints": [
      "RS256 access token (15 minutes) verified through JWKS",
      "Opaque refresh token with 30-day rotation",
      "A Next route (/api/auth/set-session) to bridge the session",
      "Login, OAuth and session endpoints maintained in-house"
    ],
    "naivePointsVi": [
      "Access token RS256 (15 phút) xác minh qua JWKS",
      "Refresh token opaque, xoay vòng 30 ngày",
      "Một route Next (/api/auth/set-session) để nối session",
      "Các endpoint login, OAuth và session tự duy trì"
    ],
    "solutionTitle": "Now: Limen sessions",
    "solutionTitleVi": "Nay: session Limen",
    "solutionPoints": [
      "Opaque session token as HttpOnly cookie or Bearer header",
      "Sessions in Postgres (auth.sessions), looked up through /internal/session",
      "No JWKS, no refresh rotation, no set-session route",
      "Login, OAuth and email flows come from Limen plugins"
    ],
    "solutionPointsVi": [
      "Session token opaque dạng cookie HttpOnly hoặc Bearer header",
      "Session trong Postgres (auth.sessions), tra qua /internal/session",
      "Không còn JWKS, refresh rotation hay route set-session",
      "Luồng login, OAuth và email đến từ plugin Limen"
    ]
  },
  "sections": [
    {
      "id": "problem",
      "title": "What a browser-held JWT costs this product",
      "titleVi": "JWT nằm trong trình duyệt gây ra những cái giá nào cho sản phẩm này",
      "content": "Puchi is a Next.js PWA for learners, and the same account is used from a phone, a laptop and sometimes a shared device. Three things about that make a self-contained JWT in the browser awkward:\n\n- **Logout and revocation.** A signed JWT stays valid until it expires unless every service also consults a deny-list. Then you have a lookup per request anyway, plus a second store.\n- **Where the token lives.** A JWT a script can read is a token a script can steal. Anything JS can see (localStorage, a non-HttpOnly cookie) is exposed to XSS.\n- **Refresh.** Short-lived access tokens need a refresh flow, and a lesson in progress is a bad place to discover a race between two tabs refreshing at once.\n\nI should be careful about what the repo actually says here. The design doc (`docs/superpowers/specs/2026-07-17-limen-auth-design.md` in puchi-backend) records the move from a custom JWT stack (RS256, JWKS, 15-minute access token, 30-day rotating refresh token) to Limen as a maintenance decision: \"Tự build login/OAuth/session/MFA\" versus \"Plugins chuẩn + thin wrapper\", and fewer endpoints to maintain. It does not argue revocation or latency. The revocation argument above is mine, and the rest of this note checks how far the code delivers on it. The same doc lists the earlier path: Clerk, Supertokens, Zitadel, a custom JWT service, then Limen.",
      "contentVi": "Puchi là một PWA Next.js cho người học, và cùng một tài khoản được dùng trên điện thoại, laptop, đôi khi cả máy dùng chung. Với bối cảnh đó, JWT tự chứa (self-contained) nằm trong trình duyệt có ba điểm vướng:\n\n- **Đăng xuất và thu hồi.** JWT đã ký vẫn hợp lệ cho đến khi hết hạn, trừ khi mọi service đều tra thêm một deny-list. Khi đó vẫn phải tra cứu mỗi request, và có thêm một store thứ hai.\n- **Token nằm ở đâu.** JWT mà script đọc được thì script cũng lấy cắp được. Thứ gì JS nhìn thấy (localStorage, cookie không HttpOnly) đều lộ trước XSS.\n- **Refresh.** Access token ngắn hạn cần luồng refresh, và giữa lúc đang làm bài là lúc tệ nhất để gặp race khi hai tab cùng refresh.\n\nTôi cần nói rõ repo thực sự ghi gì. Tài liệu thiết kế (`docs/superpowers/specs/2026-07-17-limen-auth-design.md` trong puchi-backend) ghi việc chuyển từ stack JWT tự viết (RS256, JWKS, access token 15 phút, refresh token xoay vòng 30 ngày) sang Limen như một quyết định về chi phí bảo trì: \"Tự build login/OAuth/session/MFA\" so với \"Plugins chuẩn + thin wrapper\", ít endpoint phải tự duy trì hơn. Tài liệu không lập luận về thu hồi hay độ trễ. Lập luận về thu hồi ở trên là của tôi, và phần còn lại của bài kiểm tra xem code đáp ứng được đến đâu. Cùng tài liệu đó liệt kê lịch sử: Clerk, Supertokens, Zitadel, service JWT tự viết, rồi Limen."
    },
    {
      "id": "how-it-works",
      "title": "How sessions work in the code",
      "titleVi": "Session hoạt động thế nào trong code",
      "content": "Limen is a Go library (`github.com/thecodearcher/limen v0.1.4` in `app/auth/go.mod`), not a hosted product. Puchi's auth service is a plain `net/http` server, about 310 lines in `app/auth/cmd/auth/main.go`, that mounts Limen's handler at `/auth/` and enables the credential-password plugin plus Google, Facebook and a custom TikTok OAuth provider. Sessions are rows in Postgres (`auth.sessions`, with a unique `token`, `expires_at`, `last_access`, and an index on `user_id`; `app/auth/migrations/001_limen_schema.up.sql`). There is no Valkey in the session path: the Go code has no Redis client, even though Valkey is deployed in the cluster and the service configs mention it.\n\nThe browser gets the token two ways. Limen sets an HttpOnly `limen_session` cookie, and a session transformer also returns the same token in the JSON body so the frontend can send it as a Bearer header:\n\n```go\n// app/auth/cmd/auth/main.go\nlimen.WithHTTPSessionTransformer(func(user map[string]any, sessionResult *limen.SessionResult) (map[string]any, error) {\n    out := map[string]any{\"user\": user}\n    if sessionResult != nil && sessionResult.Token != \"\" {\n        out[\"token\"] = sessionResult.Token\n    }\n    return out, nil\n}),\n```\n\nOther Go services do not parse anything. They accept either form and ask the auth service:\n\n```go\n// pkg/auth/token.go\nfunc SessionTokenFromRequest(r *http.Request) string {\n\tauthHeader := r.Header.Get(\"Authorization\")\n\tif strings.HasPrefix(strings.ToLower(authHeader), \"bearer \") {\n\t\tif token := strings.TrimSpace(authHeader[len(\"Bearer \"):]); token != \"\" {\n\t\t\treturn token\n\t\t}\n\t}\n\tif c, err := r.Cookie(DefaultLimenSessionCookie); err == nil && c != nil {\n\t\t// ... same trim, return c.Value\n\t}\n\treturn \"\"\n}\n```\n\n```go\n// app/auth/cmd/auth/main.go\nmux.HandleFunc(\"GET /internal/session\", func(w http.ResponseWriter, r *http.Request) {\n\tsession, err := auth.GetSession(r)\n\tif err != nil || session == nil || session.User == nil {\n\t\thttp.Error(w, `{\"message\":\"unauthorized\"}`, http.StatusUnauthorized)\n\t\treturn\n\t}\n\t// ... writes {\"user_id\", \"email\", \"username\"} as JSON\n})\n```\n\n`pkg/auth/jwt.go` (the file name is left over from the JWT era; the type is still aliased as `JWTValidator`) calls that endpoint with a 5-second client timeout and keeps an in-process map keyed by the SHA-256 of the token with a fixed 60-second TTL (`InitAuth` in `pkg/auth/auth.go`). Four services wire it up (core, learn, media, notification), each pointed at `http://auth-service.puchi-backend:8000` in `puchi-infra/infra/backend/*/deployment.yaml`. The cookie domain in the deployed auth config is `puchi.io.vn`, and the API sits at `api.puchi.io.vn`.\n\nThe old copy of this article described gRPC introspection and a Valkey cache. Neither exists: introspection is one HTTP GET, and the cache is a Go map in each service process.",
      "contentVi": "Limen là một thư viện Go (`github.com/thecodearcher/limen v0.1.4` trong `app/auth/go.mod`), không phải sản phẩm hosted. Auth service của Puchi là một server `net/http` thuần, khoảng 310 dòng ở `app/auth/cmd/auth/main.go`, mount handler của Limen tại `/auth/` và bật plugin credential-password cùng OAuth Google, Facebook và một provider TikTok tự viết. Session là các dòng trong Postgres (`auth.sessions`, có `token` unique, `expires_at`, `last_access` và index trên `user_id`; `app/auth/migrations/001_limen_schema.up.sql`). Không có Valkey trong đường đi của session: code Go không có Redis client, dù Valkey đã được triển khai trong cluster và config của các service có nhắc đến.\n\nTrình duyệt nhận token theo hai đường. Limen đặt cookie HttpOnly `limen_session`, và một session transformer trả cùng token đó trong JSON body để frontend gửi dưới dạng Bearer header:\n\n```go\n// app/auth/cmd/auth/main.go\nlimen.WithHTTPSessionTransformer(func(user map[string]any, sessionResult *limen.SessionResult) (map[string]any, error) {\n    out := map[string]any{\"user\": user}\n    if sessionResult != nil && sessionResult.Token != \"\" {\n        out[\"token\"] = sessionResult.Token\n    }\n    return out, nil\n}),\n```\n\nCác service Go khác không parse gì cả. Chúng nhận một trong hai dạng và hỏi auth service:\n\n```go\n// pkg/auth/token.go\nfunc SessionTokenFromRequest(r *http.Request) string {\n\tauthHeader := r.Header.Get(\"Authorization\")\n\tif strings.HasPrefix(strings.ToLower(authHeader), \"bearer \") {\n\t\tif token := strings.TrimSpace(authHeader[len(\"Bearer \"):]); token != \"\" {\n\t\t\treturn token\n\t\t}\n\t}\n\tif c, err := r.Cookie(DefaultLimenSessionCookie); err == nil && c != nil {\n\t\t// ... same trim, return c.Value\n\t}\n\treturn \"\"\n}\n```\n\n```go\n// app/auth/cmd/auth/main.go\nmux.HandleFunc(\"GET /internal/session\", func(w http.ResponseWriter, r *http.Request) {\n\tsession, err := auth.GetSession(r)\n\tif err != nil || session == nil || session.User == nil {\n\t\thttp.Error(w, `{\"message\":\"unauthorized\"}`, http.StatusUnauthorized)\n\t\treturn\n\t}\n\t// ... writes {\"user_id\", \"email\", \"username\"} as JSON\n})\n```\n\n`pkg/auth/jwt.go` (tên file là di sản từ thời JWT; type vẫn được alias thành `JWTValidator`) gọi endpoint đó với HTTP client timeout 5 giây và giữ một map trong process, key là SHA-256 của token, TTL cố định 60 giây (`InitAuth` trong `pkg/auth/auth.go`). Bốn service dùng nó (core, learn, media, notification), mỗi service trỏ tới `http://auth-service.puchi-backend:8000` trong `puchi-infra/infra/backend/*/deployment.yaml`. Cookie domain trong config auth đã deploy là `puchi.io.vn`, còn API nằm ở `api.puchi.io.vn`.\n\nBản cũ của bài này mô tả introspection qua gRPC và cache bằng Valkey. Cả hai đều không tồn tại: introspection là một HTTP GET, và cache là một Go map trong mỗi process.",
      "callout": {
        "type": "info",
        "text": "The cache is a Go map in each service process, not Valkey, and introspection is HTTP, not gRPC. Both differ from the earlier version of this article.",
        "textVi": "Cache là một Go map trong mỗi process, không phải Valkey, và introspection đi qua HTTP, không phải gRPC. Cả hai khác với phiên bản trước của bài này."
      }
    },
    {
      "id": "failure-modes",
      "title": "Failure modes I can see in the code",
      "titleVi": "Các failure mode thấy được trong code",
      "content": "**Auth service down or slow.** A cache hit still works for up to 60 seconds. After that, `introspect` returns an error for any non-200/401 response or a timeout. What the user sees depends on the route: protected routes answer 401 `NO_SESSION` (`ErrSessionExpired` is defined but nothing returns it), while learn's optional filter (`app/learn/internal/server/learn_auth.go`) deliberately falls through, so a logged-in learner is treated as a guest. On the client, `tryRefreshToken` in `puchi-frontend/src/lib/token-manager.ts` calls `clearToken()` when `getSession()` fails or throws, so an auth outage can also log the browser out locally. The auth deployment runs `replicas: 1`, so this is not a theoretical path.\n\n**Revocation lag.** Deleting a session row takes effect at the auth service immediately, but each Go process can keep serving the cached identity for up to 60 seconds. \"Instant revocation\", as the old copy put it, is not what the code does. Failed lookups are not cached, so a stale token costs one auth-service call per request.\n\n**Cache growth.** `getCached` ignores expired entries but never deletes them, and nothing sweeps the map. Entries are only replaced if the same token returns. For a small service that is harmless; it is also a leak I would fix before calling it done.\n\n**Cookie theft and XSS.** The cookie is HttpOnly, but the frontend defeats part of that. `setToken` stores the Bearer value in a zustand store persisted to `sessionStorage` under `puchi-auth`, and hands it to the limen-auth bearer plugin (`authClient.bearer.setTokens`). A script that can run on the page can read it. The opaque token is no better than a JWT against XSS in this setup; what it buys is that a stolen token can be killed server-side.\n\n**CSRF.** Every Go service accepts the cookie as a fallback, so a cookie-authenticated POST is possible. The Bearer path is not CSRF-prone; the cookie path relies on SameSite and origin checks. Limen is configured with `trusted_origins`, and Envoy's CORS policy allows only `https://puchi.io.vn` and localhost with credentials. I did not read Limen's source, so I cannot state the exact `SameSite`/`Secure` attributes of `limen_session` or whether Limen checks Origin on mutations. The only option Puchi sets is cross-subdomain cookies for `puchi.io.vn`, and `Secure=false` when the base URL is local HTTP.\n\n**Guest identity.** Anonymous learners get a separate `puchi_guest_id` cookie, which is HttpOnly, `SameSite=Lax`, `Secure`, domain `.puchi.io.vn`, 30 days (`app/learn/internal/service/learn.go`). Its value is a bare UUID, not a signed token. It is an identifier for guest progress, not a credential for anything sensitive, and `ClaimGuest` merges it into the user and clears it at login.\n\n**Fixation, concurrent devices, clock skew.** Session creation and rotation are inside Limen, and I did not audit them. The schema allows many sessions per user, but Puchi's own code adds no \"list my devices\" or \"sign out everywhere\" endpoint. Expiry is decided by `expires_at` in the auth database, so there is one clock; the 60-second cache uses each service's local time only.",
      "contentVi": "**Auth service chết hoặc chậm.** Cache hit vẫn chạy được tối đa 60 giây. Sau đó `introspect` trả lỗi với mọi response khác 200/401 hoặc khi timeout. Người dùng thấy gì tùy route: route bắt buộc đăng nhập trả 401 `NO_SESSION` (`ErrSessionExpired` được khai báo nhưng không nơi nào trả về), còn filter optional của learn (`app/learn/internal/server/learn_auth.go`) cố ý cho đi tiếp, nên người học đã đăng nhập bị coi là guest. Phía client, `tryRefreshToken` trong `puchi-frontend/src/lib/token-manager.ts` gọi `clearToken()` khi `getSession()` lỗi hoặc throw, nên sự cố auth cũng có thể khiến trình duyệt tự đăng xuất cục bộ. Deployment auth chạy `replicas: 1`, nên đây không phải đường đi lý thuyết.\n\n**Độ trễ thu hồi.** Xóa dòng session có hiệu lực ngay tại auth service, nhưng mỗi process Go có thể tiếp tục trả identity đã cache tối đa 60 giây. \"Thu hồi tức thì\" như bản cũ viết không phải điều code làm. Lookup thất bại không được cache, nên token cũ tốn một lời gọi auth-service cho mỗi request.\n\n**Cache phình.** `getCached` bỏ qua entry hết hạn nhưng không xóa, và không có gì dọn map. Entry chỉ bị ghi đè nếu cùng token quay lại. Với service nhỏ thì vô hại; nhưng đó là một chỗ rò rỉ tôi sẽ sửa trước khi gọi là xong.\n\n**Lộ cookie và XSS.** Cookie là HttpOnly, nhưng frontend làm mất một phần lợi ích đó. `setToken` lưu giá trị Bearer vào zustand store được persist vào `sessionStorage` với khóa `puchi-auth`, và đưa cho bearer plugin của limen-auth (`authClient.bearer.setTokens`). Script chạy được trên trang đều đọc được. Với cấu hình này, opaque token không tốt hơn JWT trước XSS; điều nó mang lại là token bị đánh cắp có thể bị hủy phía server.\n\n**CSRF.** Mọi service Go đều chấp nhận cookie làm phương án dự phòng, nên một POST xác thực bằng cookie là khả thi. Đường Bearer không dính CSRF; đường cookie dựa vào SameSite và kiểm tra origin. Limen được cấu hình `trusted_origins`, và CORS của Envoy chỉ cho phép `https://puchi.io.vn` và localhost kèm credentials. Tôi chưa đọc source của Limen, nên không khẳng định được chính xác thuộc tính `SameSite`/`Secure` của `limen_session` hay việc Limen có kiểm tra Origin trên các request thay đổi dữ liệu. Tùy chọn duy nhất Puchi đặt là cookie cross-subdomain cho `puchi.io.vn`, và `Secure=false` khi base URL là HTTP local.\n\n**Danh tính guest.** Người học ẩn danh có cookie riêng `puchi_guest_id`: HttpOnly, `SameSite=Lax`, `Secure`, domain `.puchi.io.vn`, 30 ngày (`app/learn/internal/service/learn.go`). Giá trị chỉ là một UUID trần, không phải token có chữ ký. Nó là định danh cho tiến độ guest, không phải credential cho thứ nhạy cảm, và `ClaimGuest` gộp nó vào user rồi xóa khi đăng nhập.\n\n**Fixation, nhiều thiết bị, lệch đồng hồ.** Việc tạo và xoay session nằm trong Limen, tôi chưa audit. Schema cho phép nhiều session mỗi user, nhưng code của Puchi không thêm endpoint \"xem thiết bị của tôi\" hay \"đăng xuất mọi nơi\". Hết hạn được quyết định bởi `expires_at` trong database auth nên chỉ có một đồng hồ; cache 60 giây chỉ dùng giờ local của từng service.",
      "callout": {
        "type": "warning",
        "text": "Revocation takes effect at the auth service at once, but a service may keep honouring a revoked token for up to 60 seconds.",
        "textVi": "Việc thu hồi có hiệu lực ngay tại auth service, nhưng một service có thể tiếp tục chấp nhận token đã thu hồi tối đa 60 giây."
      }
    },
    {
      "id": "costs-and-gaps",
      "title": "What this costs and what is not done",
      "titleVi": "Cái giá phải trả và những gì chưa làm",
      "content": "What opaque sessions cost here, concretely:\n\n| Cost | In this codebase |\n|---|---|\n| A lookup per uncached request | One HTTP call to auth-service, which reads Postgres via Limen. I did not read Limen's internals, and no benchmark in the repo measures it |\n| A store to run | The `auth` schema in CloudNativePG (`pg-puchi-rw`), in the same Postgres cluster the other Puchi services use |\n| Cross-service propagation | None beyond the HTTP lookup. Each service introspects on its own and the gateway does not authenticate |\n| Revocation latency | Up to 60 s per process because of the local cache |\n\nGaps I noticed and would list as open work:\n\n- **No gateway auth.** An earlier design used Envoy ext_authz and an `X-User-ID` header (`.superpowers/sdd/*.md` reports). `puchi-infra/infra/envoy-gateway/api-securitypolicy.yaml` now only sets CORS. The media service still has an `extractUserID` that reads `x-user-id` from gRPC metadata. I could not find anything in the current tree that sets it, so I do not know whether media uploads authenticate correctly end to end. That needs a test.\n- **gRPC is unauthenticated.** Each service's gRPC server (port 9000) has only the recovery middleware. The gateway routes only the HTTP port and no service calls another over gRPC, so nothing is exposed today, but a future internal client would have no identity to propagate.\n- **No roles.** `SessionInfo.Roles` is never filled, so `HasRole` is always false. RBAC is listed as out of scope in the design doc.\n- **Tests.** `pkg/auth` has three middleware tests and four token-extraction tests. Nothing covers the cache, the introspection call or the failure paths above.\n- **Events are not session-related.** NATS carries `auth.user.created` and `email.send` (`pkg/nats/nats.go`); the publisher is a no-op when the URL is empty and uses fire-and-forget goroutines. There is no \"session revoked\" event, which is why the cache TTL is the only propagation mechanism.\n- **PWA offline.** The PWA has a web manifest (`src/app/manifest.ts`) but I found no service worker in puchi-frontend, so there is no offline auth behavior to describe.",
      "contentVi": "Chi phí cụ thể của opaque session ở đây:\n\n| Chi phí | Trong codebase này |\n|---|---|\n| Một lần tra cứu cho mỗi request chưa cache | Một HTTP call tới auth-service, đọc Postgres qua Limen. Tôi chưa đọc nội bộ Limen, và repo không có benchmark nào đo việc này |\n| Một store phải vận hành | Schema `auth` trong CloudNativePG (`pg-puchi-rw`), cùng cluster Postgres với các service Puchi khác |\n| Lan truyền giữa các service | Không có gì ngoài lời gọi HTTP. Mỗi service tự introspect và gateway không xác thực |\n| Độ trễ thu hồi | Tối đa 60 giây mỗi process do cache cục bộ |\n\nCác lỗ hổng tôi thấy và sẽ liệt kê là việc còn mở:\n\n- **Gateway không xác thực.** Thiết kế trước đây dùng Envoy ext_authz và header `X-User-ID` (các báo cáo `.superpowers/sdd/*.md`). `puchi-infra/infra/envoy-gateway/api-securitypolicy.yaml` hiện chỉ đặt CORS. Service media vẫn có `extractUserID` đọc `x-user-id` từ gRPC metadata. Tôi không tìm thấy gì trong cây code hiện tại đặt giá trị này, nên không biết upload media có xác thực đúng end to end hay không. Cần một bài test.\n- **gRPC không xác thực.** gRPC server của mỗi service (cổng 9000) chỉ có recovery middleware. Gateway chỉ route cổng HTTP và không service nào gọi service khác qua gRPC, nên hiện chưa lộ gì, nhưng một client nội bộ trong tương lai sẽ không có identity để truyền.\n- **Chưa có role.** `SessionInfo.Roles` không bao giờ được điền, nên `HasRole` luôn false. RBAC được ghi là ngoài phạm vi trong tài liệu thiết kế.\n- **Test.** `pkg/auth` có ba test middleware và bốn test trích xuất token. Không có gì bao phủ cache, lời gọi introspection hay các failure path ở trên.\n- **Event không liên quan đến session.** NATS chở `auth.user.created` và `email.send` (`pkg/nats/nats.go`); publisher là no-op khi URL rỗng và dùng goroutine fire-and-forget. Không có event \"session bị thu hồi\", nên TTL cache là cơ chế lan truyền duy nhất.\n- **PWA offline.** PWA có web manifest (`src/app/manifest.ts`) nhưng tôi không thấy service worker nào trong puchi-frontend, nên không có hành vi auth offline nào để mô tả."
    },
    {
      "id": "when-jwt-fits",
      "title": "When JWT would still fit",
      "titleVi": "Khi nào JWT vẫn hợp lý",
      "content": "The repo records nothing about a case where Puchi wants JWT again, so this is my reading, not a documented decision.\n\nThe earlier stack (RS256 with JWKS) existed precisely so that services could verify tokens locally. If the auth service became a bottleneck or a single point of failure, which it currently is with one replica, signed short-lived tokens would remove the hot-path lookup, at the price of the revocation window and a refresh flow. Given the current cache, that window is already up to 60 seconds, so the practical gap between the two designs is smaller than the old article suggested.\n\nWhat I would change first is smaller: sweep the cache, add tests for the failure paths, stop persisting the token to `sessionStorage` if the cookie alone is enough, and decide what media should do about identity.",
      "contentVi": "Repo không ghi trường hợp nào Puchi muốn quay lại JWT, nên đây là cách đọc của tôi chứ không phải quyết định đã tài liệu hóa.\n\nStack trước đó (RS256 với JWKS) tồn tại chính để các service tự xác minh token cục bộ. Nếu auth service trở thành nút cổ chai hoặc điểm chết duy nhất, như hiện tại với một replica, token ký ngắn hạn sẽ bỏ được lần tra cứu trên đường nóng, đổi lại là cửa sổ thu hồi và luồng refresh. Với cache hiện tại, cửa sổ đó đã lên tới 60 giây, nên khoảng cách thực tế giữa hai thiết kế nhỏ hơn bản bài cũ gợi ý.\n\nViệc tôi sẽ đổi trước thì nhỏ hơn: dọn cache, thêm test cho các failure path, thôi persist token vào `sessionStorage` nếu chỉ cookie là đủ, và quyết định media sẽ xử lý identity thế nào."
    }
  ],
  "content": {
    "problemStatement": "A JWT held in the browser cannot be revoked before it expires without a deny-list, and any token script can read is exposed to XSS. Puchi's design doc records the move to opaque Limen sessions as a maintenance decision, not a revocation argument.",
    "problemStatementVi": "JWT nằm trong trình duyệt không thể thu hồi trước hạn nếu thiếu deny-list, và token nào script đọc được đều lộ trước XSS. Tài liệu thiết kế của Puchi ghi việc chuyển sang session opaque của Limen là quyết định về bảo trì, không phải lập luận về thu hồi.",
    "architectureDesign": "The auth service mounts Limen at /auth/ over Postgres and exposes GET /internal/session. core, learn, media and notification take the opaque token from a Bearer header or the limen_session cookie, call that endpoint through pkg/auth, and cache the identity in a per-process map for 60 seconds. NATS carries user-created and email events, not session state.",
    "architectureDesignVi": "Auth service mount Limen tại /auth/ trên Postgres và mở GET /internal/session. core, learn, media và notification lấy token opaque từ Bearer header hoặc cookie limen_session, gọi endpoint đó qua pkg/auth, và cache identity trong map theo process 60 giây. NATS chở event tạo user và email, không chở trạng thái session.",
    "technicalDecisions": [
      "Use Limen (a Go library) instead of the custom JWT stack: fewer endpoints to maintain, per the 2026-07-17 design doc.",
      "Accept both Bearer and the limen_session cookie in pkg/auth: browsers send the HttpOnly cookie, but the cookie path needs CSRF care that the Bearer path does not.",
      "Introspect over HTTP with a 5-second client timeout: simple, but an auth outage degrades to 401 or guest mode after the cache expires.",
      "Cache identities for 60 seconds per process: fewer auth calls, but revocation can lag by up to 60 seconds and the map is never swept.",
      "Keep the Bearer token in sessionStorage as well as the cookie: lets fetchWithAuth send Authorization, but a script can read it."
    ],
    "technicalDecisionsVi": [
      "Dùng Limen (thư viện Go) thay stack JWT tự viết: ít endpoint phải bảo trì hơn, theo tài liệu thiết kế 2026-07-17.",
      "Chấp nhận cả Bearer và cookie limen_session trong pkg/auth: trình duyệt gửi cookie HttpOnly, nhưng đường cookie cần lưu ý CSRF còn đường Bearer thì không.",
      "Introspect qua HTTP với timeout client 5 giây: đơn giản, nhưng khi auth sập thì sau khi cache hết hạn sẽ rơi về 401 hoặc chế độ guest.",
      "Cache identity 60 giây mỗi process: ít lời gọi auth hơn, nhưng thu hồi có thể trễ tới 60 giây và map không bao giờ được dọn.",
      "Giữ Bearer token trong sessionStorage cùng với cookie: cho phép fetchWithAuth gửi Authorization, nhưng script đọc được nó."
    ],
    "keyTakeaways": [
      "The recorded reason for opaque sessions is less custom auth code; revocation and XSS arguments are mine and the code only partly delivers them.",
      "With a 60-second per-process cache, revocation is not instant and the gap to a short-lived JWT is smaller than it looks.",
      "Open work: sweep the cache, test the failure paths, stop persisting the token to sessionStorage, and settle how media identifies users."
    ],
    "keyTakeawaysVi": [
      "Lý do được ghi lại cho session opaque là bớt code auth tự viết; lập luận về thu hồi và XSS là của tôi và code chỉ đáp ứng một phần.",
      "Với cache 60 giây mỗi process, thu hồi không tức thì và khoảng cách với JWT ngắn hạn nhỏ hơn vẻ ngoài.",
      "Việc còn mở: dọn cache, test các failure path, thôi persist token vào sessionStorage, và chốt cách media xác định user."
    ]
  }
};

export default article;
