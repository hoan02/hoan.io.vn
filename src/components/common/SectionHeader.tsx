import React from "react";

interface SectionHeaderProps {
  id?: string;
  label: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
}

/** Editorial section opener: mono label, serif title, optional intro and action. */
export function SectionHeader({ label, title, intro, action }: Omit<SectionHeaderProps, "id">) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-t border-ink pt-4 mb-10">
      <div className="space-y-3 max-w-2xl">
        <p className="eyebrow">{label}</p>
        <h2 className="text-3xl sm:text-4xl">{title}</h2>
        {intro && <p className="text-muted">{intro}</p>}
      </div>
      {action && <div className="text-sm shrink-0">{action}</div>}
    </div>
  );
}
