import type { ComparisonGuide } from "@/lib/comparison-guides";

/** ISO YYYY-MM-DD → "Jul 1, 2026", timezone-safe (no UTC-vs-local off-by-one). */
function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * The dated "last verified / what changed" line that sits under the header dateline. Surfaces the
 * newest changelog entry inline (the trust signal a live buying guide needs), with the full
 * revision history tucked into a <details> so we can prove the page is maintained, not abandoned.
 * Every date is a real ISO-8601 string. Renders only when a changelog exists.
 */
export function ChangelogLine({
  changelog,
}: {
  changelog: NonNullable<ComparisonGuide["changelog"]>;
}) {
  if (!changelog.length) return null;
  const sorted = [...changelog].sort((a, b) => b.date.localeCompare(a.date));
  const [latest, ...rest] = sorted;

  return (
    <div className="mt-3.5 rounded-xl border border-line-soft bg-surface/60 px-3.5 py-2.5 text-[0.82rem] leading-relaxed">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="mono text-[0.66rem] uppercase tracking-[0.12em] text-accent-strong">
          Last verified
        </span>
        <time dateTime={latest.date} className="mono text-ink-2">
          {fmtDate(latest.date)}
        </time>
        <span className="text-ink-faint" aria-hidden>
          —
        </span>
        <span className="text-ink-2">{latest.note}</span>
      </div>
      {rest.length ? (
        <details className="group mt-1.5">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-[0.74rem] text-ink-dim transition-colors hover:text-accent-strong">
            <span className="mono transition-transform group-open:rotate-90" aria-hidden>
              ›
            </span>
            Full revision history ({sorted.length})
          </summary>
          <ul className="mt-2 space-y-1.5 border-l border-line-soft pl-3.5">
            {rest.map((c) => (
              <li key={`${c.date}-${c.note}`} className="flex flex-wrap items-baseline gap-x-2">
                <time dateTime={c.date} className="mono text-[0.72rem] text-ink-faint">
                  {fmtDate(c.date)}
                </time>
                <span className="text-[0.8rem] text-ink-2">{c.note}</span>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}
