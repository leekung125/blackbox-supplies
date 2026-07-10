import type { ComparisonGuide } from "@/lib/comparison-guides";

/**
 * "WHAT OWNERS REPORT OVER TIME." The honest research moat: a QUALITATIVE synthesis of patterns
 * that recur across real verified-buyer reviews — what owners consistently love, and the
 * recurring long-term gripes worth knowing before you buy.
 *
 * HONESTY LAW (this is the whole point): this is NOT our own lab testing, and there are NO invented
 * statistics anywhere — no percentages, no star averages, no review counts. Just the patterns we
 * saw reading owner reviews. Each entry carries a sentiment: "loved" (green check) or "watch"
 * (amber caution). Renders only when the guide supplies `ownerInsights`.
 */
export function OwnerInsights({
  insights,
}: {
  insights: NonNullable<ComparisonGuide["ownerInsights"]>;
}) {
  if (!insights.length) return null;

  return (
    <section className="mt-12">
      <span className="eyebrow eyebrow-accent">Owner reports</span>
      <h2 className="mt-2 font-display text-2xl font-semibold text-ink-strong">
        What owners report over time
      </h2>
      <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">
        A qualitative synthesis of patterns that recur across verified-buyer reviews — not our own
        lab testing, and no invented numbers. Just what owners consistently praise, and the
        long-term gripes worth knowing before you buy.
      </p>

      <div className="mt-5 divide-y divide-line-soft overflow-hidden rounded-2xl border border-line bg-surface">
        {insights.map((ins) => {
          const loved = ins.sentiment === "loved";
          return (
            <div
              key={ins.pattern}
              className="flex flex-col gap-1.5 p-4 sm:flex-row sm:gap-4 sm:p-5"
            >
              <div className="flex shrink-0 items-center gap-2 sm:w-56 sm:items-start">
                {loved ? <LovedIcon /> : <WatchIcon />}
                <div className="flex flex-col gap-0.5">
                  <span
                    className={
                      "mono text-[0.62rem] font-medium uppercase tracking-[0.14em] " +
                      (loved ? "text-accent-strong" : "text-amber-bright")
                    }
                  >
                    {loved ? "Owners love" : "Watch for"}
                  </span>
                  <h3 className="font-display text-base font-semibold leading-snug text-ink">
                    {ins.pattern}
                  </h3>
                </div>
              </div>
              <p className="text-[0.95rem] leading-relaxed text-ink-2 sm:pt-0.5">{ins.detail}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LovedIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5 L11 15.5 L16 9" />
    </svg>
  );
}

function WatchIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-amber-bright"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3 L22 20 H2 Z" />
      <path d="M12 10 V14" />
      <path d="M12 17 h.01" />
    </svg>
  );
}
