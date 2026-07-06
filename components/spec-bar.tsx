/**
 * SpecBar — one labeled spec rendered as a proportional amber fill bar + value.
 *
 * Purely presentational: the parent computes `pct` (0–1, relative to the best value in the
 * visible set) and `isBest`, so bars are directly comparable across products at a glance.
 * A null value is shown honestly as "—" with no bar (BLACKBOX_V2: real or nothing).
 */
export function SpecBar({
  label,
  display,
  pct,
  isBest = false,
  bestLabel = "best",
  unverified = false,
  tooltip,
}: {
  label: string;
  /** Formatted value + unit, e.g. "12,000 BTU", or "—" when absent. */
  display: string;
  /** Fill fraction 0–1, or null when there is no verified value. */
  pct: number | null;
  isBest?: boolean;
  bestLabel?: string;
  /** Value is an estimate / not officially published. */
  unverified?: boolean;
  tooltip?: string;
}) {
  const empty = pct === null;
  return (
    <div className="grid grid-cols-[5.25rem_1fr_auto] items-center gap-2.5 sm:grid-cols-[7rem_1fr_auto] sm:gap-3">
      <span
        className="mono truncate text-[0.62rem] font-medium uppercase tracking-[0.09em] text-ink-faint"
        title={tooltip}
      >
        {label}
      </span>

      <span className="relative block h-2 overflow-hidden rounded-full bg-[#241d13]" aria-hidden>
        {!empty ? (
          <span
            className={`absolute inset-y-0 left-0 rounded-full ${isBest ? "bg-accent-bright" : "bg-accent/50"}`}
            style={{
              width: `${Math.max(5, Math.round((pct as number) * 100))}%`,
              transition: "width .55s cubic-bezier(.16,1,.3,1)",
            }}
          />
        ) : null}
      </span>

      <span className="nums flex items-center justify-self-end gap-1.5 text-right text-[0.82rem] font-semibold text-ink">
        {empty ? (
          <span className="font-normal text-ink-faint">not published</span>
        ) : (
          <span className="whitespace-nowrap">
            {display}
            {unverified ? (
              <span className="ml-0.5 text-ink-faint" title="Estimated / not officially published">
                ~
              </span>
            ) : null}
          </span>
        )}
        {isBest && !empty ? (
          <span className="rounded-full bg-accent/15 px-1.5 py-[0.15rem] text-[0.55rem] font-bold uppercase tracking-wide text-accent-bright">
            {bestLabel}
          </span>
        ) : null}
      </span>
    </div>
  );
}
