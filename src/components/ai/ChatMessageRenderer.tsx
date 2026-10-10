"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageRendererProps {
  content: string;
  isStreaming?: boolean;
}

// Model output is untrusted: no rehype-raw, so raw HTML is never rendered.
export function ChatMessageRenderer({ content, isStreaming = false }: ChatMessageRendererProps) {
  return (
    <div className="text-left text-[15px] leading-relaxed text-ink [&>*+*]:mt-3" aria-busy={isStreaming}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h3 className="font-serif text-lg text-ink">{children}</h3>,
          h2: ({ children }) => <h3 className="font-serif text-base text-ink">{children}</h3>,
          h3: ({ children }) => <h4 className="font-serif text-base text-ink">{children}</h4>,
          h4: ({ children }) => <h4 className="font-serif text-[15px] text-ink">{children}</h4>,
          p: ({ children }) => <p>{children}</p>,
          a: ({ href, children }) => {
            const external = !!href && /^https?:\/\//.test(href);
            return (
              <a
                href={href}
                className="text-accent underline underline-offset-2"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {children}
              </a>
            );
          },
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          ul: ({ children }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal space-y-1 pl-5">{children}</ol>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-rule pl-3 text-muted">{children}</blockquote>
          ),
          hr: () => <hr className="border-rule" />,
          code: ({ className, children }) => {
            const isBlock = /language-/.test(className || "");
            if (isBlock) return <code className="font-mono text-[13px]">{children}</code>;
            return (
              <code className="rounded bg-code px-1 py-0.5 font-mono text-[13px]">{children}</code>
            );
          },
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded bg-code p-3 font-mono text-[13px] leading-snug">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[13px]">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="border-b border-rule">{children}</thead>,
          tr: ({ children }) => <tr className="border-b border-rule">{children}</tr>,
          th: ({ children }) => (
            <th className="px-2 py-1.5 font-mono text-[11px] font-normal uppercase tracking-wide text-muted">
              {children}
            </th>
          ),
          td: ({ children }) => <td className="px-2 py-1.5 align-top">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
