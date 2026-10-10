import React from "react";

/** Little cartoon train used on line tracks and the reading rail. */
export function TransitTrain({ color, smoke = true, className = "" }: { color: string; smoke?: boolean; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`} aria-hidden="true">
      {smoke && (
        <>
          <span className="toon-puff" />
          <span className="toon-puff" style={{ animationDelay: "0.45s" }} />
          <span className="toon-puff" style={{ animationDelay: "0.9s" }} />
        </>
      )}
      <svg className="toon-bob" width="64" height="30" viewBox="0 0 64 30">
        <rect x="3" y="3" width="54" height="20" rx="8" fill={color} stroke="var(--ink)" strokeWidth="2.5" />
        <rect x="10" y="8" width="10" height="7" rx="2" fill="#09090B" />
        <rect x="24" y="8" width="10" height="7" rx="2" fill="#09090B" />
        <path d="M44 8h6a3 3 0 0 1 3 3v4h-9z" fill="#FAFAFA" />
        <circle cx="16" cy="25" r="3.5" fill="#09090B" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="44" cy="25" r="3.5" fill="#09090B" stroke="var(--ink)" strokeWidth="2" />
      </svg>
    </span>
  );
}

/** Square-faced Hoan AI mascot that opens the assistant. */
export function HoanBot({
  message,
  label,
  onClick,
  size = "md",
}: {
  message: string;
  label: string;
  onClick: () => void;
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "w-[72px] h-[62px]" : "w-[84px] h-[72px]";
  return (
    <div className="toon-float flex flex-col items-end gap-3.5">
      <div
        className="rounded-[16px_16px_4px_16px] border-2 border-[var(--ink)] bg-[var(--ink)] px-4 py-3 text-[15px] leading-snug text-[var(--paper)]"
        style={{ boxShadow: "4px 4px 0 var(--line-a)" }}
      >
        {message}
      </div>
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={`toon-btn ${box} flex flex-col items-center justify-center gap-2 rounded-[18px] bg-[var(--line-a)]`}
      >
        <span aria-hidden="true" className="flex gap-3.5">
          <span className="toon-eye block h-3.5 w-2.5 rounded-full bg-[#09090B]" />
          <span className="toon-eye block h-3.5 w-2.5 rounded-full bg-[#09090B]" />
        </span>
        <span aria-hidden="true" className="block h-1.5 w-[18px] rounded-b-full bg-[#09090B]" />
      </button>
    </div>
  );
}

export function Sticker({ children, color, className = "" }: { children: React.ReactNode; color: string; className?: string }) {
  return (
    <span
      className={`toon-sticker toon-sm rounded-lg px-3 py-1.5 font-mono text-xs font-bold text-[#09090B] ${className}`}
      style={{ background: color }}
    >
      {children}
    </span>
  );
}

export function LineBadge({ id, color, className = "" }: { id: string; color: string; className?: string }) {
  return (
    <span
      className={`toon-sm font-display inline-flex items-center justify-center rounded-[10px] px-3 py-0.5 text-base font-bold text-[#09090B] ${className}`}
      style={{ background: color }}
    >
      {id}
    </span>
  );
}

/** Station marker; interchanges get an ink ring, the current stop pings. */
export function StationDot({
  color,
  interchange = false,
  current = false,
  size = 24,
}: {
  color: string;
  interchange?: boolean;
  current?: boolean;
  size?: number;
}) {
  return (
    <span className="relative block shrink-0" style={{ width: size, height: size }} aria-hidden="true">
      {current && <span className="toon-ping" />}
      <span
        className="toon-dot relative block rounded-full"
        style={{
          width: size,
          height: size,
          border: `${Math.round(size / 4)}px solid ${interchange || current ? "var(--ink)" : color}`,
          background: current ? color : "var(--paper)",
        }}
      />
    </span>
  );
}

export function MiniFlow({ nodes }: { nodes: string[] }) {
  if (nodes.length === 0) return null;
  return (
    <span aria-hidden="true" className="flex flex-wrap items-center gap-1.5">
      {nodes.map((n, i) => (
        <React.Fragment key={n + i}>
          <span className="whitespace-nowrap rounded-md border-2 border-[var(--rail)] px-2 py-0.5 font-mono text-[11px] text-[var(--muted)]">
            {n}
          </span>
          {i < nodes.length - 1 && <span className="text-[11px] text-[var(--subtle)]">→</span>}
        </React.Fragment>
      ))}
    </span>
  );
}

export function Squiggle({ color, className = "", width = 420 }: { color: string; className?: string; width?: number }) {
  return (
    <svg
      className={`toon-draw block max-w-full ${className}`}
      width={width}
      height="24"
      viewBox="0 0 420 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 14 C 40 2, 70 22, 106 12 S 172 2, 208 12 S 276 22, 312 12 S 380 2, 416 12"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sparkle({ color, size, style, delay = 0 }: { color: string; size: number; style: React.CSSProperties; delay?: number }) {
  return (
    <svg
      className="toon-spark"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ ...style, animationDelay: `${delay}s` }}
    >
      <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill={color} />
    </svg>
  );
}

/** Horizontal request trace: nodes joined by wires with hopping blobs. */
export function RequestTrace({ nodes, highlight }: { nodes: string[]; highlight?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-y-3">
      {nodes.map((n, i) => (
        <React.Fragment key={n}>
          <span
            className="toon-sm whitespace-nowrap rounded-xl px-4 py-3 font-mono text-[13px] font-bold"
            style={
              i === highlight
                ? { background: "var(--line-a)", color: "#09090B" }
                : { background: "var(--paper)", color: "var(--ink)" }
            }
          >
            {n}
          </span>
          {i < nodes.length - 1 && (
            <span className="toon-wire" aria-hidden="true">
              <span
                className="toon-blob"
                style={{ background: i % 2 ? "var(--line-b)" : "var(--line-a)", animationDelay: `${i * 0.4}s` }}
              />
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
