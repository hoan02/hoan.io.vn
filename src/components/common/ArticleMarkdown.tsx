import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders article section bodies (Markdown, GFM tables and fenced code).
 * No rehype-raw: article text is data, never raw HTML.
 * Typography comes from the .prose-editorial rules in globals.css.
 */
export function ArticleMarkdown({ children }: { children: string }) {
  return (
    <div className="prose-editorial [&>*:first-child]:mt-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
