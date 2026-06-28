import type { ReactNode } from "react";

/** Consistent kicker + title block used across the site. */
export function SectionHeading({
  kicker,
  title,
  description,
  action,
  className = "",
}: {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}
    >
      <div className="max-w-2xl">
        <div className="flex items-center gap-2">
          <span className="h-px w-6 bg-accent/60" aria-hidden />
          <span className="kicker text-accent-bright">{kicker}</span>
        </div>
        <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
