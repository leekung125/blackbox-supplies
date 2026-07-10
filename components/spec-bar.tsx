/**
 * SpecBar — one labeled spec rendered as a glowing proportional data bar + value.
 *
 * Purely presentational: the parent computes `pct` (0–1, relative to the best value in the
 * visible set) and `isBest`, so bars are directly comparable across products at a glance.
 * A null value is shown honestly as "not published" with no bar (BLACKBOX_V2: real or nothing).
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
  const width = empty ? 0 : Math.max(5, Math.round((pct as number) * 100));
  return (
    <div className="grid grid-cols-[5.25rem_1fr_auto] items-center gap-2.5 sm:grid-cols-[7rem_1fr_auto] sm:gap-3">
      <span
        className="mono truncate text-[0.62rem] font-medium uppercase tracking-[0.09em] text-ink-faint"
        title={tooltip}
      >
        {label}
      </span>

      {/* glowing data bar — gradient fill for the leader, quiet amber for the rest */}
      <span className="spec-track w-full" aria-hidden>
        {!empty ? (
          <span
            className={isBest ? "spec-fill" : "absolute inset-y-0 left-0 rounded-full"}
            style={
              isBest
                ? { width: `${width}%`, transition: "width .55s cubic-bezier(.16,1,.3,1)" }
                : {
                    width: `${width}%`,
                    background:
                      "linear-gradient(90deg, rgba(168,111,44,0.35), rgba(217,154,69,0.55))",
                    boxShadow: "0 0 8px -2px rgba(217,154,69,0.4)",
                    transition: "width .55s cubic-bezier(.16,1,.3,1)",
                  }
            }
          />
        ) : null}
      </span>

      <span className="nums flex items-center justify-self-end gap-1.5 text-right text-[0.82rem] font-semibold text-ink">
        {empty ? (
          <span className="font-normal text-ink-faint">not published</span>
        ) : (
          <span className={`whitespace-nowrap ${isBest ? "text-accent-bright" : ""}`}>
            {display}
            {unverified ? (
              <span className="ml-0.5 text-ink-faint" title="Estimated / not officially published">
                ~
              </span>
            ) : null}
          </span>
        )}
        {isBest && !empty ? (
          <span
            className="rounded-full px-1.5 py-[0.15rem] text-[0.55rem] font-bold uppercase tracking-wide text-accent-bright"
            style={{
              border: "1px solid rgba(224,163,82,0.55)",
              background:
                "radial-gradient(125% 125% at 50% 22%, rgba(224,163,82,0.24), transparent 72%)",
              boxShadow:
                "0 0 14px -4px rgba(217,154,69,0.9), inset 0 0 10px -6px rgba(237,186,102,0.9)",
            }}
          >
            {bestLabel}
          </span>
        ) : null}
      </span>
    </div>
  );
}
