"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Check, Copy, Terminal, ExternalLink } from "lucide-react";

interface ChatMessageRendererProps {
  content: string;
  isStreaming?: boolean;
}

export function ChatMessageRenderer({
  content,
  isStreaming = false,
}: ChatMessageRendererProps) {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div className="chat-markdown text-left text-xs sm:text-sm text-zinc-200 leading-relaxed space-y-3">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // 1. Table & Cells
          table: ({ children }) => (
            <div className="my-4 w-full overflow-x-auto custom-scrollbar rounded-xl border border-zinc-800 bg-zinc-950/70 shadow-xl">
              <table className="w-full border-collapse text-left text-xs min-w-[550px]">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-zinc-900/90 border-b border-zinc-800 text-zinc-200 font-mono text-[11px]">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-zinc-800/50 bg-zinc-950/40">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-zinc-900/40 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="p-3.5 font-semibold text-zinc-300 whitespace-nowrap bg-zinc-900/80">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-3.5 align-top text-zinc-300 leading-relaxed min-w-[140px]">
              {children}
            </td>
          ),

          // 2. Code blocks & Inline code
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const isCodeBlock = Boolean(match) || String(children).includes("\n");
            const codeString = String(children).replace(/\n$/, "");

            if (isCodeBlock) {
              const language = match ? match[1] : "code";
              const codeId = Math.abs(
                codeString.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)
              );

              return (
                <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 bg-[#09090b] shadow-xl text-left">
                  <div className="flex items-center justify-between px-3.5 py-2 bg-zinc-900/90 border-b border-zinc-800 text-[11px] font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-zinc-300 font-semibold">{language}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(codeString, codeId)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                      title="Copy code"
                    >
                      {copiedCodeIndex === codeId ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3.5 font-mono text-xs text-zinc-200 overflow-x-auto custom-scrollbar leading-relaxed">
                    <code>{codeString}</code>
                  </pre>
                </div>
              );
            }

            return (
              <code
                className="px-1.5 py-0.5 mx-0.5 rounded font-mono text-[11px] bg-zinc-900 text-emerald-400 border border-zinc-800 font-medium"
                {...props}
              >
                {children}
              </code>
            );
          },

          // 3. Headings
          h1: ({ children }) => (
            <h2 className="text-base sm:text-lg font-extrabold text-white pt-3 pb-1 border-b border-zinc-800/80">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h3 className="text-sm sm:text-base font-bold text-white pt-2.5 pb-1">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="text-xs sm:text-sm font-bold text-emerald-400 pt-2 pb-0.5">
              {children}
            </h4>
          ),
          h4: ({ children }) => (
            <h5 className="text-xs font-semibold text-zinc-300 pt-1 pb-0.5">
              {children}
            </h5>
          ),

          // 4. Links
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-0.5 text-emerald-400 hover:text-emerald-300 underline font-medium break-all"
              >
                <span>{children}</span>
                {isExternal && <ExternalLink className="w-2.5 h-2.5 ml-0.5 shrink-0" />}
              </a>
            );
          },

          // 5. Lists
          ul: ({ children }) => (
            <ul className="space-y-1.5 pl-4 list-disc marker:text-emerald-400 my-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-1.5 pl-4 list-decimal marker:text-emerald-400 marker:font-mono my-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-zinc-300 leading-relaxed">
              {children}
            </li>
          ),

          // 6. Blockquote
          blockquote: ({ children }) => (
            <blockquote className="pl-3.5 py-1.5 my-2 border-l-2 border-emerald-500/60 bg-emerald-950/15 text-zinc-300 italic rounded-r-lg">
              {children}
            </blockquote>
          ),

          // 7. Divider
          hr: () => <hr className="my-3 border-zinc-800" />,

          // 8. Paragraph
          p: ({ children }) => (
            <p className="leading-relaxed text-zinc-200">{children}</p>
          ),
        }}
      >
        {content}
      </ReactMarkdown>

      {isStreaming && (
        <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-0.5 align-middle" />
      )}
    </div>
  );
}
