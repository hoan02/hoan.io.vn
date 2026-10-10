import React from "react";
import { Squiggle } from "@/components/common/Doodles";

interface SectionHeaderProps {
  id?: string;
  label: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
}

/** Notebook section opener: handwritten label, bold title, optional intro and action. */
export function SectionHeader({ label, title, intro, action }: Omit<SectionHeaderProps, "id">) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl space-y-2">
        <p className="eyebrow -rotate-1">{label}</p>
        <Squiggle />
        <h2 className="text-3xl sm:text-4xl">{title}</h2>
        {intro && <p className="text-muted">{intro}</p>}
      </div>
      {action && <div className="hand shrink-0 text-lg">{action}</div>}
    </div>
  );
}
