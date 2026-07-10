import type { ComparisonGuide } from "@/lib/comparison-guides";

/**
 * The de-selection pair, attached to the editorial #1 pick:
 *  · "The catch" — the real, non-dealbreaker flaws of our top pick (we chose it anyway, and say why).
 *  · "Skip our pick if…" — concrete situations where a buyer should walk away, not toward.
 * Both are pure honesty surfaces — they steer people AWAY when we're the wrong tool. Renders only
 * the halves that have content.
 */
export function PickCaveats({
  topPickName,
  winnerFlaws,
  skipThisIf,
}: {
  topPickName?: string;
  winnerFlaws?: ComparisonGuide["winnerFlaws"];
  skipThisIf?: ComparisonGuide["skipThisIf"];
}) {
  const hasFlaws = Boolean(winnerFlaws?.length);
  const hasSkip = Boolean(skipThisIf?.length);
  if (!hasFlaws && !hasSkip) return null;

  return (
    <section className="mt-12 grid gap-4 sm:grid-cols-2">
      {hasFlaws ? (
        <div className="rounded-2xl border border-amber/30 bg-amber-tint p-5">
          <div className="flex items-center gap-2">
            <WarnIcon />
            <h3 className="mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-amber-bright">
              The catch — flaws of our top pick
            </h3>
          </div>
          <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-dim">
            {topPickName ? (
              <>
                Even the {topPickName} isn&rsquo;t perfect. Here&rsquo;s what we know before you buy
                — and we still ranked it #1 anyway.
              </>
            ) : (
              <>Nothing wins on every axis. Here&rsquo;s the honest catch on our top pick.</>
            )}
          </p>
          <ul className="mt-3.5 space-y-2.5">
            {winnerFlaws!.map((f) => (
              <li key={f} className="flex gap-2.5 text-[0.92rem] leading-relaxed text-ink-2">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
                  aria-hidden
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {hasSkip ? (
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-center gap-2">
            <SkipIcon />
            <h3 className="mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-faint">
              Skip our pick if&hellip;
            </h3>
          </div>
          <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-dim">
            When we&rsquo;re the wrong tool for the job, we&rsquo;d rather you knew now.
          </p>
          <ul className="mt-3.5 space-y-2.5">
            {skipThisIf!.map((s) => (
              <li key={s} className="flex gap-2.5 text-[0.92rem] leading-relaxed text-ink-2">
                <span className="mt-0.5 shrink-0 text-ink-faint" aria-hidden>
                  ✕
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function WarnIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-amber-bright"
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
function SkipIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-ink-faint"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M6 6 L18 18" />
    </svg>
  );
}
