import React from "react";
import Link from "next/link";
import { TransitLine, getInterchange, getStopInfo } from "@/data/transitMap";

/** Line code set in mono on the line's colour, e.g. "A". */
export function LineCode({ line, suffix }: { line: Pick<TransitLine, "id" | "color">; suffix?: string }) {
  return (
    <span className="inline-flex items-baseline gap-1 font-mono text-xs font-medium" style={{ color: line.color }}>
      <span
        aria-hidden="true"
        className="inline-block h-2 w-2 translate-y-[-1px] rounded-full"
        style={{ background: line.color }}
      />
      {line.id}
      {suffix && <span className="text-faint">{suffix}</span>}
    </span>
  );
}

/** Request path such as "session cookie → BFF → Kratos". */
export function MiniFlow({ nodes }: { nodes: string[] }) {
  if (nodes.length === 0) return null;
  return <p className="font-mono text-xs text-faint">{nodes.join(" → ")}</p>;
}

/**
 * One line drawn as a rail with a station per article.
 * `current` marks the stop being read; `progress` (0–1) moves the car from it
 * toward the next stop. Without `current` the car drifts along the whole line.
 */
export function LineRail({
  line,
  language,
  current,
  progress,
  labels = true,
}: {
  line: TransitLine;
  language: "en" | "vi";
  current?: number;
  progress?: number;
  labels?: boolean;
}) {
  const n = line.stops.length;
  const tracking = current !== undefined && progress !== undefined && n > 1;
  const carPct = tracking ? Math.min(1, (current + progress) / (n - 1)) : 0;

  return (
    <div className="relative" style={{ minWidth: labels ? n * 120 : undefined, color: line.color }}>
      <span aria-hidden="true" className="transit-rail" style={{ background: line.color, opacity: 0.35 }} />
      {tracking && (
        <span
          aria-hidden="true"
          className="transit-rail transition-[right] duration-150"
          style={{ background: line.color, right: `${(1 - carPct) * 100}%` }}
        />
      )}
      <span
        aria-hidden="true"
        className="transit-car"
        style={
          tracking
            ? { animation: "none", left: `calc((100% - 22px) * ${carPct})`, background: line.color }
            : { background: line.color }
        }
      />
      <ol className="relative flex justify-between">
        {line.stops.map((slug, i) => {
          const info = getStopInfo(slug);
          const ix = getInterchange(slug);
          const label = language === "vi" ? info.shortVi : info.short;
          const isCurrent = current === i;
          return (
            <li key={slug} className={labels ? "min-w-0 flex-1 pr-3 last:flex-none last:pr-0" : ""}>
              <Link
                href={`/writing/${slug}`}
                className="transit-stop group flex flex-col gap-2"
                aria-label={labels ? undefined : `${String(i + 1).padStart(2, "0")} ${label}`}
                aria-current={isCurrent ? "page" : undefined}
              >
                <span className="transit-station" data-interchange={Boolean(ix) && !isCurrent} data-current={isCurrent} />
                <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                {labels && (
                  <span className="max-w-[11rem] text-sm leading-snug text-muted group-hover:text-accent">
                    {label}
                    {ix && (
                      <span className="mt-1 block font-mono text-[11px] text-ink">
                        ⇄ {language === "vi" ? ix.topicVi : ix.topic}
                      </span>
                    )}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
