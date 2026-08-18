"use client";

import React, { useState } from "react";
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

  // Custom parser for Markdown blocks
  const parseBlocks = (text: string) => {
    // Split by code blocks first ```lang\ncode```
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, partIdx) => {
      // Code block
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).trim().split("\n");
        const firstLine = lines[0].trim();
        const hasLang = /^[a-zA-Z0-9_\-\+]+$/.test(firstLine);
        const language = hasLang ? firstLine : "text";
        const code = hasLang ? lines.slice(1).join("\n") : lines.join("\n");

        return (
          <div
            key={partIdx}
            className="my-3 rounded-xl overflow-hidden border border-zinc-800 bg-[#09090b] shadow-xl text-left"
          >
            <div className="flex items-center justify-between px-3.5 py-2 bg-zinc-900/90 border-b border-zinc-800 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-zinc-300 font-semibold">{language}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode(code, partIdx)}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                title="Copy code"
              >
                {copiedCodeIndex === partIdx ? (
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
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Regular text block -> parse lines (headers, lists, paragraphs)
      const lines = part.split("\n");
      return (
        <div key={partIdx} className="space-y-2">
          {lines.map((line, lineIdx) => {
            const trimmed = line.trim();
            if (!trimmed) {
              return <div key={lineIdx} className="h-1.5" />;
            }

            // Headers
            if (trimmed.startsWith("### ")) {
              return (
                <h4
                  key={lineIdx}
                  className="text-sm font-bold text-emerald-400 pt-2 pb-1 flex items-center gap-2 border-b border-zinc-800/60"
                >
                  <span>{renderInline(trimmed.slice(4))}</span>
                </h4>
              );
            }
            if (trimmed.startsWith("## ")) {
              return (
                <h3 key={lineIdx} className="text-base font-bold text-white pt-2.5 pb-1">
                  {renderInline(trimmed.slice(3))}
                </h3>
              );
            }
            if (trimmed.startsWith("# ")) {
              return (
                <h2 key={lineIdx} className="text-lg font-extrabold text-white pt-3 pb-1">
                  {renderInline(trimmed.slice(2))}
                </h2>
              );
            }

            // Unordered List (- or *)
            if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
              return (
                <div key={lineIdx} className="flex items-start gap-2 text-xs sm:text-sm pl-1">
                  <span className="text-emerald-400 font-bold text-sm leading-none mt-1">•</span>
                  <div className="flex-1 leading-relaxed text-zinc-200">
                    {renderInline(trimmed.slice(2))}
                  </div>
                </div>
              );
            }

            // Ordered List (1. 2.)
            const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
            if (numMatch) {
              return (
                <div key={lineIdx} className="flex items-start gap-2 text-xs sm:text-sm pl-1">
                  <span className="text-emerald-400 font-mono font-semibold text-xs mt-0.5">
                    {numMatch[1]}.
                  </span>
                  <div className="flex-1 leading-relaxed text-zinc-200">
                    {renderInline(numMatch[2])}
                  </div>
                </div>
              );
            }

            // Blockquote (> )
            if (trimmed.startsWith("> ")) {
              return (
                <blockquote
                  key={lineIdx}
                  className="pl-3.5 py-1.5 my-1.5 border-l-2 border-emerald-500/60 bg-emerald-950/15 text-xs sm:text-sm text-zinc-300 italic rounded-r-lg"
                >
                  {renderInline(trimmed.slice(2))}
                </blockquote>
              );
            }

            // Standard Paragraph
            return (
              <p key={lineIdx} className="text-xs sm:text-sm leading-relaxed text-zinc-200">
                {renderInline(line)}
              </p>
            );
          })}
        </div>
      );
    });
  };

  // Parse inline elements: bold, italic, inline code, links
  const renderInline = (text: string) => {
    // Regex token matcher for `code`, **bold**, *italic*, [link](url)
    const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);

    return tokens.map((token, idx) => {
      // Inline Code: `code`
      if (token.startsWith("`") && token.endsWith("`") && token.length > 2) {
        const codeText = token.slice(1, -1);
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 mx-0.5 rounded font-mono text-[11px] bg-zinc-900 text-emerald-400 border border-zinc-800 font-medium"
          >
            {codeText}
          </code>
        );
      }

      // Bold: **bold**
      if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
        return (
          <strong key={idx} className="font-bold text-white">
            {token.slice(2, -2)}
          </strong>
        );
      }

      // Italic: *italic*
      if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
        return (
          <em key={idx} className="italic text-zinc-300">
            {token.slice(1, -1)}
          </em>
        );
      }

      // Link: [label](url)
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const label = linkMatch[1];
        const url = linkMatch[2];
        return (
          <a
            key={idx}
            href={url}
            target={url.startsWith("http") ? "_blank" : undefined}
            rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-0.5 text-emerald-400 hover:text-emerald-300 underline font-medium"
          >
            <span>{label}</span>
            {url.startsWith("http") && <ExternalLink className="w-2.5 h-2.5 ml-0.5" />}
          </a>
        );
      }

      return token;
    });
  };

  return (
    <div className="chat-markdown space-y-2 text-left">
      {parseBlocks(content)}
      {isStreaming && (
        <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-0.5 align-middle" />
      )}
    </div>
  );
}
