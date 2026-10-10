import type { Article } from "@/types";

const article: Article = {
  slug: "reliable-domain-events-nats-transactional-outbox",
  title: "Transactional Outbox on NATS JetStream: What Arda's Six Relays Actually Guarantee",
  titleVi: "Transactional Outbox trên NATS JetStream: Sáu relay của Arda thực sự bảo đảm điều gì",
  summary:
    "A decision record read from the code: how arda-be writes events in the same Postgres transaction as state, how six services relay them to one JetStream stream, where at-least-once ends, and where the implementations disagree.",
  summaryVi:
    "Bản ghi quyết định đọc từ mã nguồn: arda-be ghi sự kiện cùng transaction Postgres với dữ liệu, sáu service chuyển chúng vào một stream JetStream ra sao, at-least-once dừng ở đâu và các cài đặt khác nhau chỗ nào.",
  date: "Jan 2026",
  updated: "Oct 2026",
  readTime: "10 min read",
  tags: ["Arda Labs", "NATS JetStream", "Transactional Outbox", "Go", "PostgreSQL", "Event-Driven", "Decision Record"],
  featured: true,
  format: "decision-record",
  project: "arda",
  relatedProject: "arda-finops-platform",
  diagramKey: "reliable-domain-events-nats-transactional-outbox",
  evidenceIds: ["arda-transactional-outbox-nats"],
  repositoryUrl: "https://github.com/arda-labs/arda-be",
  highlights: [
    {
      value: "6",
      label: "JetStream relays",
      labelVi: "Relay JetStream",
      detail: "finance, workflow, loan, statistical, notification, media",
      detailVi: "finance, workflow, loan, statistical, notification, media",
    },
    {
      value: "7",
      label: "Outbox tables",
      labelVi: "Bảng outbox",
      detail: "Six drain to NATS, one drains to a gRPC call",
      detailVi: "Sáu bảng đổ vào NATS, một bảng đổ vào lời gọi gRPC",
    },
    {
      value: "2 s",
      label: "Fixed poll interval",
      labelVi: "Chu kỳ poll cố định",
      detail: "Hard-coded in every relay; no measured latency",
      detailVi: "Hard-code trong mọi relay; chưa có số đo độ trễ",
    },
    {
      value: "2",
      label: "Relay tests",
      labelVi: "Test cho relay",
      detail: "Both in finance-service; the other relays have none",
      detailVi: "Cả hai nằm ở finance-service; các relay còn lại chưa có",
    },
  ],
  sections: [
    {
      id: "problem",
      title: "The problem: a commit and a publish are two writes",
      titleVi: "Vấn đề: commit và publish là hai lần ghi",
      content: `A handler that commits to Postgres and then calls the broker has two failure windows. If the process dies between the two, the state changed and nobody was told. If the order is reversed and the commit fails, consumers react to something that never happened. The outbox pattern removes the second write from the request path: the event is a row in the same database, inserted in the same transaction as the state change, and a separate loop moves it to the broker.

In arda-be that loop exists six times, once per service that emits to NATS. I read all six, plus the one shared library, \`libs/go/arda-events\`. This note records what the code guarantees, which is **at-least-once delivery into a JetStream stream and at-least-once handling by consumers that dedupe**. It does not provide exactly-once, and the repo's own ADR says part of the consumer side is still unproven (more on that below).

Two claims in my older version of this article were wrong and I removed them. The event ID is not a UUIDv7 produced by the envelope: \`newID()\` in \`libs/go/arda-events/events.go\` is 18 random bytes, base64url-encoded. And I found no \`processed_events\` table anywhere in the repo; the consumer-side table is \`noti_event_inbox\`. I also had a "< 1 ms" figure for JetStream. Nothing in the repo measures it (the only file under \`perf/\` is \`api-load.js\`, an HTTP load script), so it is gone.`,
      contentVi: `Một handler commit vào Postgres rồi mới gọi broker có hai cửa sổ lỗi. Nếu process chết giữa hai bước, trạng thái đã đổi mà không ai được báo. Nếu đảo thứ tự và commit thất bại, consumer phản ứng với một việc chưa từng xảy ra. Mẫu outbox bỏ lần ghi thứ hai khỏi đường xử lý request: sự kiện là một dòng trong cùng database, được insert trong cùng transaction với thay đổi trạng thái, và một vòng lặp riêng chuyển nó sang broker.

Trong arda-be, vòng lặp đó được cài sáu lần, mỗi service phát lên NATS một lần. Tôi đã đọc cả sáu, cùng thư viện dùng chung \`libs/go/arda-events\`. Ghi chú này chỉ ra mã nguồn bảo đảm điều gì: **at-least-once khi đưa vào stream JetStream và at-least-once khi consumer xử lý (có dedupe)**. Không có exactly-once, và ADR của repo cũng ghi rằng một phần phía consumer vẫn chưa được chứng minh (xem phần sau).

Hai nhận định trong bản cũ của bài này là sai nên tôi đã bỏ. ID sự kiện không phải UUIDv7 do envelope sinh ra: \`newID()\` trong \`libs/go/arda-events/events.go\` là 18 byte ngẫu nhiên mã hóa base64url. Và tôi không tìm thấy bảng \`processed_events\` nào trong repo; bảng phía consumer là \`noti_event_inbox\`. Con số "< 1 ms" của JetStream cũng bị bỏ: không có gì trong repo đo nó (thư mục \`perf/\` chỉ có \`api-load.js\`, một script tải HTTP).`,
    },
    {
      id: "write-side",
      title: "The write side: what is really atomic",
      titleVi: "Phía ghi: thứ gì thực sự nguyên tử",
      content: `Each service owns its outbox table in its own schema. The insert takes the caller's \`*sql.Tx\`, so it commits or rolls back with the state change. Finance does this inside the posting transaction, after journal lines and balances:

~~~go
// apps/finance-service/internal/service/posting_service.go
if err := s.postLinesToBalances(ctx, tx, tenantID, resolved); err != nil {
    return nil, err
}
if err := s.repo.InsertOutbox(ctx, tx, tenantID, entryID, outboxPayload(entryID, req)); err != nil {
    return nil, fmt.Errorf("enqueue outbox: %w", err)
}
if err := tx.Commit(); err != nil {
~~~

Workflow, loan and statistical add a \`dedupe_key\` with a unique constraint, so a retried command cannot enqueue the same event twice:

~~~go
// apps/workflow-service/internal/repository/outbox.go
_, err = tx.ExecContext(ctx, \`
    INSERT INTO workflow_outbox (id, subject, event_code, dedupe_key, payload)
    VALUES ($1, $2, $3, $4, $5::jsonb)
    ON CONFLICT (dedupe_key) DO NOTHING\`, id, subject, eventCode, dedupeKey, encoded)
~~~

The keys are deterministic business facts such as \`task:<id>:assigned:<jobKey>\` or \`disbursement:<id>:approved\`. In loan the outbox row's primary key *is* the dedupe key.

**The exception is statistical-service.** \`EnqueueAlertEvent\` runs on \`r.db\`, not on a transaction, after \`UpsertAlert\` has already committed, and the caller only logs a failure (\`slog.Warn("indicator alert enqueue failed")\`). A crash between the two statements loses that event. The migration comment says the dedupe key makes enqueue idempotent across COB re-runs, so a re-run would enqueue it again, but that is a repair by re-running, not the atomicity the pattern is named for.`,
      contentVi: `Mỗi service sở hữu bảng outbox trong schema riêng. Lệnh insert nhận \`*sql.Tx\` của caller nên commit hoặc rollback cùng thay đổi trạng thái. Finance làm việc này ngay trong transaction ghi sổ, sau khi ghi journal line và số dư:

~~~go
// apps/finance-service/internal/service/posting_service.go
if err := s.postLinesToBalances(ctx, tx, tenantID, resolved); err != nil {
    return nil, err
}
if err := s.repo.InsertOutbox(ctx, tx, tenantID, entryID, outboxPayload(entryID, req)); err != nil {
    return nil, fmt.Errorf("enqueue outbox: %w", err)
}
if err := tx.Commit(); err != nil {
~~~

Workflow, loan và statistical thêm cột \`dedupe_key\` có unique constraint, nên một lệnh bị retry không thể enqueue cùng sự kiện hai lần:

~~~go
// apps/workflow-service/internal/repository/outbox.go
_, err = tx.ExecContext(ctx, \`
    INSERT INTO workflow_outbox (id, subject, event_code, dedupe_key, payload)
    VALUES ($1, $2, $3, $4, $5::jsonb)
    ON CONFLICT (dedupe_key) DO NOTHING\`, id, subject, eventCode, dedupeKey, encoded)
~~~

Các key là sự kiện nghiệp vụ xác định như \`task:<id>:assigned:<jobKey>\` hay \`disbursement:<id>:approved\`. Ở loan, khóa chính của dòng outbox chính là dedupe key.

**Ngoại lệ là statistical-service.** \`EnqueueAlertEvent\` chạy trên \`r.db\` chứ không phải transaction, sau khi \`UpsertAlert\` đã commit, và caller chỉ ghi log khi lỗi (\`slog.Warn("indicator alert enqueue failed")\`). Crash giữa hai câu lệnh sẽ mất sự kiện đó. Comment trong migration nói dedupe key làm enqueue idempotent khi chạy lại COB, nên chạy lại sẽ enqueue lại; nhưng đó là sửa bằng cách chạy lại, không phải tính nguyên tử mà tên của mẫu này hứa hẹn.`,
      callout: {
        type: "warning",
        text: "Only five of the six emitters write the event in the state transaction. Statistical-service enqueues in a separate statement and tolerates the loss.",
        textVi: "Chỉ năm trong sáu bên phát ghi sự kiện trong transaction của trạng thái. Statistical-service enqueue bằng câu lệnh riêng và chấp nhận khả năng mất.",
      },
    },
    {
      id: "relay",
      title: "The relay: claim, publish, mark",
      titleVi: "Relay: claim, publish, đánh dấu",
      content: `Every relay polls every 2 seconds (a constant in each file), publishes to the JetStream stream \`ARDA_EVENTS\` (subjects \`arda.>\`, file storage, created on first use by whichever service starts first), and sets the outbox row ID as the \`Nats-Msg-Id\` header. Finance's version:

~~~go
// apps/finance-service/internal/service/outbox_relay.go
rows, err := tx.QueryContext(ctx, \`
    SELECT id, payload FROM fin_outbox
    WHERE published_at IS NULL
    ORDER BY created_at LIMIT 50
    FOR UPDATE SKIP LOCKED\`)
// ... scan batch, close rows ...
for _, p := range batch {
    msg := &nats.Msg{Subject: ardaevents.SubjectFinanceTransactionPosted, Data: p.payload, Header: nats.Header{}}
    msg.Header.Set(nats.MsgIdHdr, p.id)
    if _, err := r.js.PublishMsg(msg, nats.Context(ctx)); err != nil {
        // UPDATE fin_outbox SET publish_attempts = publish_attempts + 1, last_error = $2
        continue
    }
    // UPDATE fin_outbox SET published_at = now() WHERE id = $1
}
tx.Commit()
~~~

The row is marked published only after \`PublishMsg\` returns a PubAck. \`SKIP LOCKED\` lets replicas split the pending rows; the finance test starts a second relay while the first is blocked inside the publisher and asserts one publish call in total (\`TestOutboxRelayConcurrentReplicasPublishOnePendingRow\`).

The six implementations are not the same:

| Service | Table | Claim | Retry limit and backoff | After the limit |
|---|---|---|---|---|
| finance | \`fin_outbox\` | \`FOR UPDATE SKIP LOCKED\`, lock held across publishes | none, retried every tick | stays pending, \`publish_attempts\` grows |
| workflow | \`workflow_outbox\` | same as finance | none | same |
| loan | \`loan_outbox\` | same as finance | none | same |
| statistical | \`rpt_outbox_events\` | same as finance | none | same |
| notification | \`noti_outbox\` | status \`publishing\` plus 30 s \`locked_until\` lease | 10 attempts, delay 30 s x attempts | \`dead_lettered\` plus a row in \`notification_outbox_dlq\` |
| media | \`media_outbox_events\` | one \`UPDATE ... RETURNING\` with a 30 s lease | 20 attempts, delay 30 s x attempts capped at 3600 s | status \`failed\`, no replay path found |

Loan has a seventh table, \`lnm_disbursement_workflow_outbox\`, that drains to a gRPC \`CreateCase\` call instead of NATS. It is the most complete one: status \`PENDING\`/\`PROCESSING\`/\`DELIVERED\`/\`DEAD\`, a one-minute lease, 8 attempts, exponential backoff capped at 5 minutes, and on \`DEAD\` the batch moves to \`SUBMIT_FAILED\` and held contract reservations are released in the same transaction. A test walks it through exhaustion and resubmission (\`TestDisbursementOutboxExhaustionCanBeResubmitted\`).`,
      contentVi: `Mọi relay poll mỗi 2 giây (hằng số trong từng file), publish vào stream JetStream \`ARDA_EVENTS\` (subject \`arda.>\`, file storage, được tạo ở lần dùng đầu tiên bởi service nào khởi động trước), và đặt ID của dòng outbox vào header \`Nats-Msg-Id\`. Bản của finance:

~~~go
// apps/finance-service/internal/service/outbox_relay.go
rows, err := tx.QueryContext(ctx, \`
    SELECT id, payload FROM fin_outbox
    WHERE published_at IS NULL
    ORDER BY created_at LIMIT 50
    FOR UPDATE SKIP LOCKED\`)
// ... scan batch, close rows ...
for _, p := range batch {
    msg := &nats.Msg{Subject: ardaevents.SubjectFinanceTransactionPosted, Data: p.payload, Header: nats.Header{}}
    msg.Header.Set(nats.MsgIdHdr, p.id)
    if _, err := r.js.PublishMsg(msg, nats.Context(ctx)); err != nil {
        // UPDATE fin_outbox SET publish_attempts = publish_attempts + 1, last_error = $2
        continue
    }
    // UPDATE fin_outbox SET published_at = now() WHERE id = $1
}
tx.Commit()
~~~

Dòng chỉ được đánh dấu đã publish sau khi \`PublishMsg\` trả về PubAck. \`SKIP LOCKED\` cho phép các replica chia nhau các dòng pending; test của finance khởi động relay thứ hai khi relay đầu đang bị chặn trong publisher và kiểm tra tổng cộng chỉ có một lần publish (\`TestOutboxRelayConcurrentReplicasPublishOnePendingRow\`).

Sáu bản cài đặt không giống nhau:

| Service | Bảng | Cách claim | Giới hạn retry và backoff | Sau khi hết giới hạn |
|---|---|---|---|---|
| finance | \`fin_outbox\` | \`FOR UPDATE SKIP LOCKED\`, giữ lock suốt lúc publish | không có, thử lại mỗi tick | vẫn pending, \`publish_attempts\` tăng mãi |
| workflow | \`workflow_outbox\` | giống finance | không có | giống finance |
| loan | \`loan_outbox\` | giống finance | không có | giống finance |
| statistical | \`rpt_outbox_events\` | giống finance | không có | giống finance |
| notification | \`noti_outbox\` | status \`publishing\` cùng lease \`locked_until\` 30 s | 10 lần, trễ 30 s x số lần | \`dead_lettered\` và một dòng trong \`notification_outbox_dlq\` |
| media | \`media_outbox_events\` | một câu \`UPDATE ... RETURNING\` với lease 30 s | 20 lần, trễ 30 s x số lần, tối đa 3600 s | status \`failed\`, không tìm thấy đường replay |

Loan còn một bảng thứ bảy, \`lnm_disbursement_workflow_outbox\`, đổ vào lời gọi gRPC \`CreateCase\` chứ không phải NATS. Đây là bản đầy đủ nhất: status \`PENDING\`/\`PROCESSING\`/\`DELIVERED\`/\`DEAD\`, lease một phút, 8 lần thử, backoff lũy thừa tối đa 5 phút, và khi \`DEAD\` thì batch chuyển sang \`SUBMIT_FAILED\` đồng thời các reservation hợp đồng đang giữ được nhả trong cùng transaction. Một test đi qua cả quá trình cạn lần thử rồi submit lại (\`TestDisbursementOutboxExhaustionCanBeResubmitted\`).`,
    },
    {
      id: "failure-modes",
      title: "Failure modes",
      titleVi: "Các kiểu lỗi",
      content: `**Crash after commit, before publish.** The row is pending; the next relay tick finds it. This is the case the pattern exists for.

**Crash after the PubAck, before the row is marked.** In the four \`SKIP LOCKED\` relays the mark and the claim share one transaction, so the rollback leaves the row pending and the event is published again. The stable \`Nats-Msg-Id\` is the only protection, and JetStream honours it only inside its duplicate-tracking window. No \`StreamConfig\` in the repo sets \`Duplicates\`, so the server default applies (I am relying on the NATS documentation for that default, not on the repo). Past the window, a republish is stored twice. The finance test (\`TestOutboxRelayRetryAfterPublishFailureUsesStableMessageID\`) proves the header does not change between attempts, but it uses a fake publisher, so it shows the contract and not JetStream's behaviour. Notification and media have the same gap through their lease: a worker that dies after publishing leaves \`publishing\` until the lease expires, then the row is claimed and sent again.

**Poison rows.** For finance, workflow, loan and statistical, a row that always fails is retried every two seconds for ever, with only \`publish_attempts\` and \`last_error\` changing. It does not block other rows, because the loop \`continue\`s past it, but nothing alerts and nothing parks it. Notification and media park after 10 and 20 attempts.

**Ordering.** \`ORDER BY created_at\` is a preference, not a guarantee. A failed row is skipped while later rows go out; two replicas claim disjoint rows concurrently; notification's retry delay is 30 s times the attempt count, so a retried event arrives after its successors. ADR-007 in \`docs/refactor-program/phase-0/adr-register.md\` lists "stream naming/partition/order" under open decisions. Consumers have to treat events as unordered.

**Tenant isolation.** The outbox is where a missing tenant would first leak into a shared stream (\`arda.>\` carries everyone's events). The tables differ: \`fin_outbox\`, \`rpt_outbox_events\`, \`media_outbox_events\` and \`noti_outbox\` have a \`tenant_id\` column; \`workflow_outbox\` and \`loan_outbox\` do not, and carry the tenant only inside the JSON payload. Notification's migration \`20260825167000_enforce_outbox_tenant_scope.sql\` drops the column default and adds a CHECK rejecting empty and \`default\`, created \`NOT VALID\`; \`20260826110000_backfill_legacy_tenant.sql\` then assigns old rows to one fixed tenant UUID and runs \`VALIDATE CONSTRAINT\`. The repo's progress notes say the finance and platform checks are still \`NOT VALID\` pending an operator-approved assignment.`,
      contentVi: `**Crash sau commit, trước khi publish.** Dòng đang pending; tick tiếp theo của relay sẽ thấy nó. Đây là trường hợp mẫu này sinh ra để xử lý.

**Crash sau PubAck, trước khi đánh dấu dòng.** Ở bốn relay dùng \`SKIP LOCKED\`, việc đánh dấu và claim nằm chung một transaction, nên rollback để dòng vẫn pending và sự kiện bị publish lần nữa. \`Nats-Msg-Id\` ổn định là lớp bảo vệ duy nhất, và JetStream chỉ tôn trọng nó trong cửa sổ theo dõi trùng lặp của nó. Không có \`StreamConfig\` nào trong repo đặt \`Duplicates\`, nên giá trị mặc định của server được áp dụng (tôi dựa vào tài liệu NATS cho giá trị mặc định này, không phải repo). Quá cửa sổ đó, một lần publish lại sẽ được lưu hai lần. Test của finance (\`TestOutboxRelayRetryAfterPublishFailureUsesStableMessageID\`) chứng minh header không đổi giữa các lần thử, nhưng nó dùng publisher giả, nên chỉ cho thấy hợp đồng chứ không phải hành vi của JetStream. Notification và media có cùng khoảng hở qua cơ chế lease: worker chết sau khi publish để dòng ở \`publishing\` đến khi lease hết hạn, rồi dòng được claim và gửi lại.

**Poison row.** Với finance, workflow, loan và statistical, một dòng luôn lỗi sẽ được thử lại mỗi hai giây mãi mãi, chỉ \`publish_attempts\` và \`last_error\` thay đổi. Nó không chặn các dòng khác vì vòng lặp \`continue\` qua nó, nhưng không có gì cảnh báo và không có gì đưa nó ra khỏi hàng đợi. Notification và media dừng sau 10 và 20 lần thử.

**Thứ tự.** \`ORDER BY created_at\` chỉ là ưu tiên, không phải bảo đảm. Dòng lỗi bị bỏ qua trong khi các dòng sau vẫn đi; hai replica claim các dòng rời nhau cùng lúc; độ trễ retry của notification là 30 s nhân số lần thử, nên sự kiện được retry đến sau các sự kiện đứng sau nó. ADR-007 trong \`docs/refactor-program/phase-0/adr-register.md\` liệt kê "stream naming/partition/order" trong các quyết định còn mở. Consumer phải coi sự kiện là không có thứ tự.

**Cô lập tenant.** Outbox là nơi tenant bị thiếu sẽ rò đầu tiên vào một stream dùng chung (\`arda.>\` chứa sự kiện của mọi tenant). Các bảng khác nhau: \`fin_outbox\`, \`rpt_outbox_events\`, \`media_outbox_events\` và \`noti_outbox\` có cột \`tenant_id\`; \`workflow_outbox\` và \`loan_outbox\` thì không, tenant chỉ nằm trong JSON payload. Migration \`20260825167000_enforce_outbox_tenant_scope.sql\` của notification bỏ default của cột và thêm CHECK từ chối giá trị rỗng và \`default\`, tạo ở dạng \`NOT VALID\`; \`20260826110000_backfill_legacy_tenant.sql\` sau đó gán các dòng cũ cho một tenant UUID cố định rồi chạy \`VALIDATE CONSTRAINT\`. Ghi chú tiến độ của repo nói các check của finance và platform vẫn ở \`NOT VALID\` chờ operator duyệt việc gán tenant.`,
      callout: {
        type: "info",
        text: "Delivery to the stream is at-least-once, and the dedupe window is the only guard against duplicates created by the relay itself. Everything past that guard is the consumer's job.",
        textVi: "Việc chuyển vào stream là at-least-once, và cửa sổ dedupe là lớp bảo vệ duy nhất trước các bản trùng do chính relay tạo ra. Mọi thứ sau đó là việc của consumer.",
      },
    },
    {
      id: "consumer",
      title: "The consumer side: dedupe and dead letters",
      titleVi: "Phía consumer: dedupe và dead letter",
      content: `Only notification-service consumes these subjects in this repo. Its shared \`Consumer\` binds a durable queue subscription with manual ack:

~~~go
// apps/notification-service/internal/events/consumer.go
sub, err := c.js.QueueSubscribeSync(c.subject, c.durable,
    nats.Durable(c.durable),
    nats.ManualAck(),
    nats.AckWait(30*time.Second),
    nats.MaxDeliver(10),
    nats.BindStream(c.stream),
)
// in the loop:
if metadata.NumDelivered >= consumerMaxDeliver {
    if err := c.publishDLQ(ctx, msg); err != nil { continue } // not acked, stays redeliverable
    msg.AckSync(...)
    continue
}
if err := handler(ctx, msg); err != nil { msg.NakWithDelay(consumerAckWait); continue }
msg.AckSync(nats.Context(ctx))
~~~

Because the DLQ check runs before the handler, a message gets at most nine handler invocations; the tenth delivery goes straight to \`arda.dlq.<subject>\` with a \`Nats-Msg-Id\` of \`arda-dlq:<source id>\` so that an interrupted ack does not duplicate the dead letter. I found no consumer of \`arda.dlq.*\` in the repo: dead letters are stored and nothing reads them yet.

Idempotency is a table, not a promise. \`ProcessEventOnce\` takes a transaction-scoped advisory lock on \`consumer_name:event_id\`, inserts into \`noti_event_inbox\` (primary key \`(consumer_name, event_id)\`), runs the handler in that same transaction, and sets \`processed_at\`. A redelivered, already-processed event hits the conflict clause, matches no row, and returns nil so the message is acked:

~~~go
// apps/notification-service/internal/repository/notification_repository.go
tx.ExecContext(ctx, \`SELECT pg_advisory_xact_lock(hashtextextended($1, 0))\`, consumerName+":"+eventID)
err = tx.QueryRowContext(ctx, \`
    INSERT INTO noti_event_inbox (consumer_name, event_id, subject, tenant_id)
    VALUES ($1,$2,$3,$4)
    ON CONFLICT (consumer_name, event_id) DO UPDATE SET attempts = noti_event_inbox.attempts + 1
    WHERE noti_event_inbox.processed_at IS NULL
    RETURNING event_id\`, ...).Scan(&claimed)
if errors.Is(err, sql.ErrNoRows) { return tx.Commit() } // already processed
~~~

The workflow and loan notification handlers use it, with the payload's \`event_id\` (the outbox dedupe key) as the event ID, so the key chosen on the write side is the one that deduplicates on the read side. The statistical-breach consumer does not: it relies on the unique \`(tenant_id, idempotency_key)\` on \`noti_notifications\` and builds the key from \`alert_id\`. Reading the code, \`UpsertAlert\` keeps one row, and so one \`alert_id\`, per rule, period and slice, while the outbox dedupe key includes the value so that "a materially different value notifies again". I did not run it, but those two keys look inconsistent: the second notification would be accepted by the outbox and then dropped as a duplicate by the consumer. It is the check I would make first.`,
      contentVi: `Trong repo này chỉ có notification-service tiêu thụ các subject đó. \`Consumer\` dùng chung của nó bind một durable queue subscription với manual ack:

~~~go
// apps/notification-service/internal/events/consumer.go
sub, err := c.js.QueueSubscribeSync(c.subject, c.durable,
    nats.Durable(c.durable),
    nats.ManualAck(),
    nats.AckWait(30*time.Second),
    nats.MaxDeliver(10),
    nats.BindStream(c.stream),
)
// in the loop:
if metadata.NumDelivered >= consumerMaxDeliver {
    if err := c.publishDLQ(ctx, msg); err != nil { continue } // not acked, stays redeliverable
    msg.AckSync(...)
    continue
}
if err := handler(ctx, msg); err != nil { msg.NakWithDelay(consumerAckWait); continue }
msg.AckSync(nats.Context(ctx))
~~~

Vì kiểm tra DLQ chạy trước handler, một message có tối đa chín lần gọi handler; lần giao thứ mười đi thẳng sang \`arda.dlq.<subject>\` với \`Nats-Msg-Id\` là \`arda-dlq:<source id>\` để một lần ack bị gián đoạn không tạo ra dead letter trùng. Tôi không tìm thấy consumer nào của \`arda.dlq.*\` trong repo: dead letter được lưu và chưa có gì đọc chúng.

Idempotency là một bảng chứ không phải lời hứa. \`ProcessEventOnce\` lấy advisory lock theo transaction trên \`consumer_name:event_id\`, insert vào \`noti_event_inbox\` (khóa chính \`(consumer_name, event_id)\`), chạy handler trong cùng transaction rồi đặt \`processed_at\`. Một sự kiện giao lại đã xử lý rồi sẽ chạm mệnh đề conflict, không khớp dòng nào và trả nil để message được ack:

~~~go
// apps/notification-service/internal/repository/notification_repository.go
tx.ExecContext(ctx, \`SELECT pg_advisory_xact_lock(hashtextextended($1, 0))\`, consumerName+":"+eventID)
err = tx.QueryRowContext(ctx, \`
    INSERT INTO noti_event_inbox (consumer_name, event_id, subject, tenant_id)
    VALUES ($1,$2,$3,$4)
    ON CONFLICT (consumer_name, event_id) DO UPDATE SET attempts = noti_event_inbox.attempts + 1
    WHERE noti_event_inbox.processed_at IS NULL
    RETURNING event_id\`, ...).Scan(&claimed)
if errors.Is(err, sql.ErrNoRows) { return tx.Commit() } // already processed
~~~

Các handler thông báo của workflow và loan dùng nó, với \`event_id\` trong payload (chính là dedupe key của outbox) làm ID sự kiện, nên key chọn ở phía ghi cũng là key khử trùng ở phía đọc. Consumer statistical-breach thì không: nó dựa vào unique \`(tenant_id, idempotency_key)\` trên \`noti_notifications\` và dựng key từ \`alert_id\`. Theo mã nguồn, \`UpsertAlert\` giữ một dòng, tức một \`alert_id\`, cho mỗi rule, period và slice, trong khi dedupe key của outbox có cả giá trị để "giá trị khác đáng kể sẽ thông báo lại". Tôi chưa chạy thử, nhưng hai key này có vẻ không khớp: thông báo thứ hai được outbox chấp nhận rồi bị consumer bỏ như một bản trùng. Đây là điều tôi sẽ kiểm tra đầu tiên.`,
    },
    {
      id: "limits",
      title: "Trade-offs, limits and what I would check next",
      titleVi: "Đánh đổi, giới hạn và việc tôi sẽ kiểm tra tiếp",
      content: `**Why this shape.** The repo's integration plan (\`docs/refactor-program/04-data-and-service-integration.md\`) states the intent: state and outbox row commit in one transaction; the publisher claims rows safely, waits for the JetStream ack, then marks published; poison records move to a dead-letter path without blocking. ADR-007 is "accepted-with-follow-up": the PubAck, stable \`Nats-Msg-Id\`, bounded redelivery and DLQ/replay reference are landed, and consumer inbox dedupe and replay must still be proven. The docs do not explain why the relays were copied per service instead of moved into \`arda-events\`; the practical result is six code paths that have already drifted (the table above).

**What is not done yet, from the repo's own notes:**

- Replay is manual and narrow: \`cmd/notification-replay\` replays exactly one dead-lettered outbox row, needs an operator name and the confirmation string \`REPLAY_ONE\`. Notification runtime replay evidence is listed as open.
- Only finance's relay has tests. Workflow, loan (NATS relay), statistical, notification and media relays, and \`ProcessEventOnce\`, have none that I could find.
- The envelope in \`arda-events\` (\`schema_version\`, tenant, trace, actor) is built only by notification-service and ai-service. Finance, workflow, loan, statistical and media publish bare JSON payloads, so schema evolution is by convention, with \`.v1\` in some subjects.
- \`arda.finance.transaction.posted\` is published, and I found no consumer in the repo.
- Event IDs are inconsistent: \`uuidv7()\` defaults in Postgres for finance, statistical and the loan submission table, random hex in workflow, \`gen_random_uuid()\` in notification, a dedupe string in loan. No code depends on time-ordering of IDs.
- No latency or throughput figure exists. All I can say from the code is that a published event waits for at most one 2-second tick plus claim and publish time.

**When I would not do this.** If every event consumer could be reached in the same transaction, a plain table read would be simpler. If events must be ordered per aggregate, this outbox needs a sequence column and a single claimer per aggregate; JetStream subjects alone will not give that.

**What I would check next.** First the statistical key mismatch. Then a cap and a parking state for the four relays that retry forever, ideally by moving the claim logic into one shared library with the notification-style lease, so a slow publish does not hold row locks. Then a test against a real JetStream that republishes after the duplicate window, to learn what the system does when the header stops protecting it.`,
      contentVi: `**Vì sao có hình dạng này.** Kế hoạch tích hợp của repo (\`docs/refactor-program/04-data-and-service-integration.md\`) nêu ý định: trạng thái và dòng outbox commit trong một transaction; publisher claim dòng an toàn, chờ ack của JetStream rồi mới đánh dấu đã publish; poison record chuyển sang đường dead-letter mà không chặn hàng đợi. ADR-007 ở trạng thái "accepted-with-follow-up": PubAck, \`Nats-Msg-Id\` ổn định, redelivery có giới hạn và bản tham chiếu DLQ/replay đã có, còn consumer inbox dedupe và replay vẫn phải được chứng minh. Tài liệu không giải thích vì sao relay được sao chép theo từng service thay vì đưa vào \`arda-events\`; hệ quả thực tế là sáu đường mã đã lệch nhau (bảng ở trên).

**Những gì chưa xong, theo chính ghi chú của repo:**

- Replay là thủ công và hẹp: \`cmd/notification-replay\` replay đúng một dòng outbox đã dead-letter, cần tên operator và chuỗi xác nhận \`REPLAY_ONE\`. Bằng chứng replay ở runtime của notification được liệt kê là còn mở.
- Chỉ relay của finance có test. Các relay workflow, loan (NATS), statistical, notification, media và \`ProcessEventOnce\` không có test nào mà tôi tìm được.
- Envelope trong \`arda-events\` (\`schema_version\`, tenant, trace, actor) chỉ được notification-service và ai-service dùng. Finance, workflow, loan, statistical và media publish JSON thô, nên tiến hóa schema theo quy ước, với \`.v1\` trong một số subject.
- \`arda.finance.transaction.posted\` được publish và tôi không thấy consumer nào trong repo.
- ID sự kiện không thống nhất: default \`uuidv7()\` trong Postgres cho finance, statistical và bảng submission của loan, hex ngẫu nhiên ở workflow, \`gen_random_uuid()\` ở notification, chuỗi dedupe ở loan. Không đoạn mã nào dựa vào thứ tự thời gian của ID.
- Không có số liệu độ trễ hay thông lượng. Từ mã nguồn chỉ nói được rằng một sự kiện chờ tối đa một tick 2 giây cộng thời gian claim và publish.

**Khi nào tôi sẽ không làm thế này.** Nếu mọi consumer có thể nằm trong cùng transaction thì đọc bảng trực tiếp đơn giản hơn. Nếu sự kiện phải có thứ tự theo aggregate, outbox này cần cột sequence và một bên claim duy nhất cho mỗi aggregate; chỉ riêng subject JetStream không cho điều đó.

**Việc tôi sẽ kiểm tra tiếp.** Trước hết là sự lệch key của statistical. Sau đó là giới hạn số lần thử và trạng thái "đỗ" cho bốn relay đang retry vô hạn, tốt nhất bằng cách gom logic claim vào một thư viện chung theo kiểu lease của notification để publish chậm không giữ row lock. Rồi một test với JetStream thật, publish lại sau cửa sổ duplicate, để biết hệ thống làm gì khi header không còn bảo vệ được nữa.`,
    },
  ],
  content: {
    problemStatement:
      "A handler that commits state and then publishes to a broker can lose or invent events when it dies between the two steps. Arda writes the event as a row in the same Postgres transaction and lets a separate loop move it to NATS JetStream, which turns the problem into delivery that is at-least-once and has to be deduplicated by the reader.",
    problemStatementVi:
      "Một handler commit trạng thái rồi mới publish lên broker có thể mất hoặc bịa ra sự kiện khi chết giữa hai bước. Arda ghi sự kiện thành một dòng trong cùng transaction Postgres và để một vòng lặp riêng chuyển nó sang NATS JetStream, biến vấn đề thành việc giao at-least-once mà phía đọc phải tự khử trùng.",
    architectureDesign:
      "Each emitting service owns an outbox table in its schema and inserts into it inside the business transaction (statistical-service being the exception). A relay polls every 2 seconds, claims rows with SKIP LOCKED or a lease, publishes to the shared ARDA_EVENTS stream with the row ID as Nats-Msg-Id, and marks the row after the PubAck. Notification-service consumes through durable queue subscriptions with manual ack, a noti_event_inbox table for dedupe, and an arda.dlq.* subject after the tenth delivery.",
    architectureDesignVi:
      "Mỗi service phát sự kiện sở hữu một bảng outbox trong schema của mình và insert vào đó trong transaction nghiệp vụ (statistical-service là ngoại lệ). Relay poll mỗi 2 giây, claim dòng bằng SKIP LOCKED hoặc lease, publish vào stream chung ARDA_EVENTS với ID dòng làm Nats-Msg-Id và đánh dấu dòng sau PubAck. Notification-service tiêu thụ qua durable queue subscription với manual ack, bảng noti_event_inbox để dedupe và subject arda.dlq.* sau lần giao thứ mười.",
    technicalDecisions: [
      "Event row in the state transaction: no dual write, except statistical-service, where a crash between two statements can drop an alert event.",
      "Row ID as Nats-Msg-Id: a republish is suppressed only inside JetStream's duplicate window, so consumers must still dedupe.",
      "Per-service relay copies: each service can tune retries, but four of six retry for ever and two cap attempts, so behaviour has drifted.",
      "Best-effort ORDER BY created_at: no ordering guarantee across retries or replicas, and ADR-007 lists ordering as an open decision.",
      "Inbox table with advisory lock in the consumer: redelivery is safe for the handlers that use ProcessEventOnce, not for the statistical-breach consumer.",
    ],
    technicalDecisionsVi: [
      "Dòng sự kiện nằm trong transaction trạng thái: không dual write, trừ statistical-service, nơi crash giữa hai câu lệnh có thể làm rơi sự kiện cảnh báo.",
      "ID dòng làm Nats-Msg-Id: publish lại chỉ bị chặn trong cửa sổ duplicate của JetStream, nên consumer vẫn phải dedupe.",
      "Mỗi service một bản relay: tùy chỉnh retry được, nhưng bốn trên sáu retry vô hạn còn hai giới hạn số lần, nên hành vi đã lệch nhau.",
      "ORDER BY created_at theo kiểu cố gắng: không bảo đảm thứ tự qua retry hay replica, và ADR-007 ghi thứ tự là quyết định còn mở.",
      "Bảng inbox cùng advisory lock ở consumer: giao lại an toàn với handler dùng ProcessEventOnce, không an toàn với consumer statistical-breach.",
    ],
    keyTakeaways: [
      "The guarantee is at-least-once into the stream plus consumer-side dedupe; it is not exactly-once.",
      "Five of six emitters are transactional; the sixth is repaired by re-running a job.",
      "The relays differ in locking, retry limits and dead-lettering, and only finance's relay has tests.",
      "The older claims of UUIDv7 event IDs, a processed_events table and sub-millisecond latency were not supported by the repo.",
    ],
    keyTakeawaysVi: [
      "Bảo đảm là at-least-once vào stream cộng dedupe phía consumer; không phải exactly-once.",
      "Năm trên sáu bên phát có tính transaction; bên thứ sáu được sửa bằng cách chạy lại một job.",
      "Các relay khác nhau về locking, giới hạn retry và dead-letter, và chỉ relay của finance có test.",
      "Các nhận định cũ về ID UUIDv7, bảng processed_events và độ trễ dưới một mili-giây không được repo ủng hộ.",
    ],
  },
};

export default article;
