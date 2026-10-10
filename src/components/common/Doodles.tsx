import React from "react";

/** Pen circle drawn around inline text; place inside a `relative inline-block` span. */
export function HandCircle({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`draw pointer-events-none absolute overflow-visible ${className}`}
      viewBox="0 0 330 110"
      preserveAspectRatio="none"
      fill="none"
    >
      <ellipse
        cx="165"
        cy="55"
        rx="160"
        ry="46"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        transform="rotate(-2.5 165 55)"
      />
    </svg>
  );
}

/** Curved pen arrow. `direction` picks which way the tip points. */
export function HandArrow({
  direction = "down-right",
  className = "",
  width = 90,
}: {
  direction?: "down-right" | "down-left";
  className?: string;
  width?: number;
}) {
  const d =
    direction === "down-right"
      ? "M6 8 C 20 50, 50 54, 84 36 M84 36 l-14 -2 M84 36 l-7 12"
      : "M84 8 C 70 50, 40 54, 6 36 M6 36 l14 -2 M6 36 l7 12";
  return (
    <svg aria-hidden="true" className={`draw shrink-0 ${className}`} width={width} height={(width * 2) / 3} viewBox="0 0 90 60" fill="none">
      <path d={d} stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Hoan AI's doodled face. */
export function BotFace({ size = 42 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 42 42" className="shrink-0">
      <rect x="3" y="4" width="36" height="34" rx="9" fill="#FFE66D" stroke="var(--ink)" strokeWidth="2.2" />
      <circle cx="15" cy="19" r="2.6" fill="#1F2430" />
      <circle cx="27" cy="19" r="2.6" fill="#1F2430" />
      <path d="M15 27 Q21 32 27 27" fill="none" stroke="#1F2430" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** Wavy pen underline for section labels. */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`draw block ${className}`} width="120" height="10" viewBox="0 0 120 10" fill="none">
      <path d="M2 6 C 14 1, 24 9, 36 5 S 58 1, 70 5 S 92 9, 104 5 S 116 2, 118 4" stroke="var(--marker)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
