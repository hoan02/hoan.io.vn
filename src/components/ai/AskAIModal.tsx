"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { UI_TRANSLATIONS } from "@/data/translations";
import { ChatMessageRenderer } from "@/components/ai/ChatMessageRenderer";
import { readDataStream } from "@/lib/streamHelper";
import { BotFace } from "@/components/common/Doodles";
import { Maximize2, Minimize2 } from "lucide-react";

const EXPANDED_KEY = "hoan-ai-expanded";

interface AskAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DisplayMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  relevantLinks?: { label: string; url: string }[];
  followUps?: string[];
  isStreaming?: boolean;
  error?: string;
  question?: string;
}

const SUGGESTED = {
  en: [
    "How did Hoan architect Arda with 15 Go microservices, gRPC, and React Module Federation?",
    "Tell me about Puchidemy's Go Kratos v3 backend, Next.js PWA, and ArgoCD GitOps.",
    "How does Arda's AI service stop an LLM from acting without human approval?",
    "Does Hoan have hands-on experience running a bare-metal Kubernetes K3s cluster?",
    "Why did Hoan build CamRelay in Rust to bridge P2P camera streams into RTSP?",
    "What companies has Hoan worked at and what were his key deliverables?",
    "How can I download Hoan's CV or get in touch for collaboration?",
  ],
  vi: [
    "Hoan đã thiết kế Arda với 15 Go microservices, gRPC và React Module Federation ra sao?",
    "Kiến trúc Puchidemy kết hợp Go Kratos v3, Next.js PWA và GitOps ArgoCD như thế nào?",
    "AI service của Arda ngăn LLM tự hành động mà không có người duyệt bằng cách nào?",
    "Hoan đã tự vận hành cụm Kubernetes K3s thực tế trên homelab như thế nào?",
    "Tại sao Hoan xây dựng CamRelay bằng Rust để chuyển đổi luồng camera P2P sang RTSP?",
    "Hoan từng làm việc ở những công ty nào và phụ trách những mảng gì?",
    "Làm sao để tải CV hoặc liên hệ trực tiếp với Hoan?",
  ],
};

let messageIdCounter = 0;
function nextId(prefix: string): string {
  messageIdCounter += 1;
  return `${prefix}-${messageIdCounter}`;
}

export function AskAIModal({ isOpen, onClose }: AskAIModalProps) {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  // Side panel by default; the reader can blow it up to a centred window. Remembered per browser.
  const [expanded, setExpanded] = useState(() => {
    try {
      return typeof window !== "undefined" && window.localStorage.getItem(EXPANDED_KEY) === "1";
    } catch {
      return false;
    }
  });
  const toggleExpanded = () =>
    setExpanded((v) => {
      try {
        window.localStorage.setItem(EXPANDED_KEY, v ? "0" : "1");
      } catch {}
      return !v;
    });
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Focus input on open, restore focus on close, lock body scroll.
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  // Esc closes; Tab stays inside the panel.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => () => abortRef.current?.abort(), []);

  // Derive relevant contextual navigation links
  const deriveRelevantLinks = (text: string): { label: string; url: string }[] => {
    const lower = text.toLowerCase();
    const links: { label: string; url: string }[] = [];

    if (lower.includes("arda") || lower.includes("finops")) {
      links.push({ label: "Arda Architecture Note", url: "/writing/designing-arda-cloud-native-finops-platform" });
      links.push({ label: "Arda GitHub", url: "https://github.com/arda-labs" });
    }
    if (lower.includes("puchi") || lower.includes("học tiếng việt")) {
      links.push({ label: "Puchi Architecture Note", url: "/writing/puchi-vietnamese-learning-platform-architecture" });
      links.push({ label: "Puchidemy GitHub", url: "https://github.com/puchidemy" });
    }
    if (lower.includes("camrelay") || lower.includes("dahua") || lower.includes("rtsp")) {
      links.push({ label: "CamRelay GitHub", url: "https://github.com/hoan02/camrelay" });
    }
    if (lower.includes("b4s") || lower.includes("tauri") || lower.includes("bluetooth")) {
      links.push({ label: "B4S GitHub", url: "https://github.com/hoan02/b4s" });
    }
    if (lower.includes("epas") || lower.includes("selected-work") || lower.includes("dự án tiêu biểu")) {
      links.push({ label: "View Projects", url: "/#selected-work" });
    }
    if (lower.includes("ngv") || lower.includes("mochimochi") || lower.includes("kinh nghiệm")) {
      links.push({ label: "View Experience", url: "/#experience" });
    }
    if (lower.includes("homelab") || lower.includes("k3s") || lower.includes("writing") || lower.includes("bài viết")) {
      links.push({ label: "Engineering Notes", url: "/writing" });
    }

    return links.slice(0, 3);
  };

  // Compute 1-3 contextual follow-up questions
  const computeContextualFollowUps = (lastQuery: string, answerText: string): string[] => {
    const combined = `${lastQuery} ${answerText}`.toLowerCase();
    const isVi = language === "vi";

    if (combined.includes("arda") || combined.includes("finops") || combined.includes("ory")) {
      return isVi
        ? [
            "Kiến trúc 15 Go microservices & gRPC trong Arda?",
            "Module Federation (13 remotes) của Arda tổ chức ra sao?",
          ]
        : [
            "How are the 15 Go microservices & gRPC built in Arda?",
            "How does Arda organize its 7 Module Federation remotes?",
          ];
    }

    if (combined.includes("puchi") || combined.includes("kratos") || combined.includes("tiếng việt")) {
      return isVi
        ? [
            "Cách Puchi kết hợp Go Kratos v3 và NATS event-driven?",
            "Hạ tầng K3s và GitOps ArgoCD của Puchi?",
          ]
        : [
            "How does Puchi use Go Kratos v3 & NATS events?",
            "Tell me about Puchi's K3s & ArgoCD GitOps setup.",
          ];
    }

    if (combined.includes("epas") || combined.includes("ngv") || combined.includes("bpm")) {
      return isVi
        ? [
            "Hoan xử lý state synchronization giữa Shell & Remote thế nào?",
            "Quy trình deploy Kubernetes tại NGV Group?",
          ]
        : [
            "How did Hoan handle shell-to-remote state synchronization?",
            "What was the Kubernetes deployment setup at NGV Group?",
          ];
    }

    if (combined.includes("camrelay") || combined.includes("rust") || combined.includes("rtsp")) {
      return isVi
        ? [
            "Tại sao CamRelay dùng Rust thay vì Python/C++?",
            "Cách CamRelay giải mã P2P và stream RTSP cho Home Assistant?",
          ]
        : [
            "Why did Hoan build CamRelay with Rust instead of Python?",
            "How does CamRelay stream Dahua P2P cameras into Home Assistant?",
          ];
    }

    if (combined.includes("b4s") || combined.includes("bluetooth") || combined.includes("tauri") || combined.includes("ble")) {
      return isVi
        ? [
            "Tại sao Hoan chọn Tauri v2 + SolidJS thay vì Electron?",
            "Cách B4S tương tác GATT Bluetooth LE bằng crate btleplug trong Rust?",
          ]
        : [
            "Why did Hoan choose Tauri v2 + SolidJS over Electron?",
            "How does B4S interact with Bluetooth LE GATT characteristics using btleplug in Rust?",
          ];
    }

    if (combined.includes("k8s") || combined.includes("homelab") || combined.includes("kubernetes")) {
      return isVi
        ? [
            "Cấu hình 3-Node K3s cluster và CloudNativePG?",
            "Quy trình GitOps tự động với ArgoCD trên homelab?",
          ]
        : [
            "How is the 3-node K3s cluster & CloudNativePG configured?",
            "How does the automated GitOps pipeline with ArgoCD work?",
          ];
    }

    if (combined.includes("học vấn") || combined.includes("utc") || combined.includes("education")) {
      return isVi
        ? [
            "Xếp loại tốt nghiệp và chuyên ngành của Hoan tại UTC?",
            "Xem các bài viết kỹ thuật và case study trên /writing?",
          ]
        : [
            "What was his graduation honor at UTC?",
            "Where can I read his technical notes on /writing?",
          ];
    }

    return isVi
      ? [
          "Các dự án mã nguồn mở Arda & Puchi trên GitHub?",
          "Làm thế nào để tải CV hoặc liên hệ trực tiếp với Hoan?",
        ]
      : [
          "Tell me about Arda & Puchi projects on GitHub.",
          "How can I download his CV or contact him directly?",
        ];
  };

  const handleSearch = useCallback(
    async (searchQuery: string, retryOfId?: string) => {
      const q = searchQuery.trim().slice(0, 800);
      if (!q || loading) return;

      const assistantId = nextId("assistant");
      const assistantMsg: DisplayMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        isStreaming: true,
        question: q,
      };
      // History excludes failed turns and the message being retried.
      const base = retryOfId
        ? messages.filter((m) => m.id !== retryOfId)
        : messages;
      const historyPayload = base
        .filter((m) => !m.error && m.content)
        .map((m) => ({ role: m.role, content: m.content }));
      // On retry, drop the failed assistant message and re-use the existing user message.
      const retryIdx = retryOfId ? messages.findIndex((m) => m.id === retryOfId) : -1;
      const reuseUser = retryIdx > 0 && messages[retryIdx - 1].role === "user";
      const historyForRequest = reuseUser ? historyPayload.slice(0, -1) : historyPayload;

      setMessages((prev) => {
        const cleaned = retryOfId ? prev.filter((m) => m.id !== retryOfId) : prev;
        return reuseUser
          ? [...cleaned, assistantMsg]
          : [...cleaned, { id: nextId("user"), role: "user", content: q }, assistantMsg];
      });
      setQuery("");
      setLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;
      const update = (patch: Partial<DisplayMessage>) =>
        setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, ...patch } : m)));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q, history: historyForRequest, lang: language }),
          signal: controller.signal,
        });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            typeof errorData?.error === "string" ? errorData.error : t.ai.errorGeneric
          );
        }
        let full = "";
        for await (const chunk of readDataStream(res)) {
          full += chunk;
          update({ content: full });
        }
        if (!full.trim()) throw new Error(t.ai.errorGeneric);
        const links = deriveRelevantLinks(`${q} ${full}`);
        update({
          content: full,
          isStreaming: false,
          relevantLinks: links.length > 0 ? links : undefined,
          followUps: computeContextualFollowUps(q, full),
        });
      } catch (err: unknown) {
        if (controller.signal.aborted) return;
        update({
          isStreaming: false,
          error: err instanceof Error && err.message ? err.message : t.ai.errorGeneric,
        });
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, messages, language]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSearch(query);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex ${expanded ? "items-center justify-center p-3 sm:p-8" : "justify-end"}`}>
      <div className="absolute inset-0 bg-ink/30" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-ai-title"
        className={`relative flex w-full flex-col bg-[var(--code-bg)] text-ink shadow-[var(--shadow)] ${
          expanded ? "h-full max-h-[94vh] max-w-5xl rounded-md" : "h-full md:max-w-xl lg:max-w-2xl"
        }`}
      >
        <header className="flex items-center gap-3 border-b-2 border-dashed border-rule px-5 py-3.5">
          <BotFace />
          <div className="min-w-0 flex-1">
            <h2 id="ask-ai-title" className="text-lg leading-tight">
              {t.ai.title}
            </h2>
            <p className="hand text-base">{t.ai.botNote}</p>
          </div>
          <button
            type="button"
            onClick={toggleExpanded}
            aria-label={expanded ? t.ai.collapse : t.ai.expand}
            aria-pressed={expanded}
            title={expanded ? t.ai.collapse : t.ai.expand}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink text-ink hover:bg-marker sm:flex"
          >
            {expanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.ai.close}
            className="hand flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink text-xl text-ink hover:bg-marker"
          >
            ×
          </button>
        </header>

        <div className="lined margin-rule flex-1 overflow-y-auto py-2 pl-14 pr-5" aria-live="polite">
          {messages.length === 0 ? (
            <div>
              <p className="hand text-xl leading-8 text-ink">{t.ai.emptyIntro}</p>
              <p className="hand mt-8 text-lg leading-8 text-faint">{t.ai.suggestHint}</p>
              <ul>
                {SUGGESTED[language].map((q) => (
                  <li key={q}>
                    <button
                      type="button"
                      onClick={() => handleSearch(q)}
                      className="flex gap-2 py-1 text-left text-[15px] leading-6 text-ink hover:text-accent"
                    >
                      <span aria-hidden="true" className="hand text-lg text-faint">☐</span>
                      <span>{q}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="space-y-6 pt-1">
              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id}>
                    <p className="hand whitespace-pre-wrap text-xl leading-8">
                      {t.ai.you}: {m.content}
                    </p>
                  </div>
                ) : (
                  <div key={m.id}>
                    <p className="sr-only">{t.ai.assistantLabel}</p>
                    <div className="text-[15px] leading-8">
                      {m.content && (
                        <ChatMessageRenderer content={m.content} isStreaming={m.isStreaming} />
                      )}
                      {m.isStreaming && !m.content && (
                        <p className="hand flex items-center gap-3 text-lg text-faint">
                          {t.ai.sending}
                          <span className="scribble" aria-hidden="true"><span /><span /><span /></span>
                        </p>
                      )}
                      {m.error && (
                        <p role="alert" className="hand mt-2 text-lg text-danger">
                          {m.error}{" "}
                          {m.question && (
                            <button
                              type="button"
                              onClick={() => handleSearch(m.question!, m.id)}
                              disabled={loading}
                              className="underline underline-offset-2 disabled:opacity-50"
                            >
                              {t.ai.retry}
                            </button>
                          )}
                        </p>
                      )}
                    </div>
                    {m.relevantLinks && (
                      <p className="hand mt-2 text-lg leading-8">
                        → {t.ai.sources}:{" "}
                        {m.relevantLinks.map((l, i) => (
                          <React.Fragment key={l.url}>
                            {i > 0 && " · "}
                            <a
                              href={l.url}
                              className="link"
                              {...(l.url.startsWith("http")
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : { onClick: onClose })}
                            >
                              {l.label}
                            </a>
                          </React.Fragment>
                        ))}
                      </p>
                    )}
                    {m.followUps && !loading && (
                      <ul className="mt-2">
                        {m.followUps.map((f) => (
                          <li key={f}>
                            <button
                              type="button"
                              onClick={() => handleSearch(f)}
                              className="flex gap-2 py-1 text-left text-sm leading-6 text-muted hover:text-accent"
                            >
                              <span aria-hidden="true" className="hand text-lg text-faint">☐</span>
                              <span>{f}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              )}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form
          className="border-t-2 border-dashed border-rule px-5 py-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
        >
          <div className="flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              rows={2}
              maxLength={800}
              placeholder={t.ai.placeholder}
              aria-label={t.ai.placeholder}
              className="hand min-h-[3rem] flex-1 resize-none border-0 border-b-2 border-ink bg-transparent text-xl text-ink placeholder:text-faint focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="btn btn-marker min-h-11 px-4 disabled:opacity-50"
            >
              {loading ? t.ai.sending : t.ai.send}
            </button>
          </div>
          <p className="hand mt-2 text-sm leading-snug text-faint">{t.ai.disclaimer}</p>
        </form>
      </div>
    </div>
  );
}
