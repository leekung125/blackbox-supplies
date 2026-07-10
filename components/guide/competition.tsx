import type { ComparisonGuide } from "@/lib/comparison-guides";

/**
 * "THE COMPETITION — what didn't make it." The honesty beat that separates a real best-in-class
 * guide from an affiliate list: the models we genuinely considered and set aside, each with the
 * ONE true reason it lost. Every name here is a real, existing model (HONESTY LAW) — never a
 * strawman. Renders only when the guide supplies `competition`.
 */
export function CompetitionSection({
  competition,
}: {
  competition: NonNullable<ComparisonGuide["competition"]>;
}) {
  if (!competition.length) return null;
  return (
    <section className="mt-12">
      <span className="eyebrow eyebrow-accent">The competition</span>
      <h2 className="mt-2 font-display text-2xl font-semibold text-ink-strong">
        What didn&rsquo;t make it
      </h2>
      <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">
        Real models we looked at and left off — and the single honest reason each one lost. No
        strawmen: if it&rsquo;s here, it&rsquo;s a unit people actually cross-shop.
      </p>
      <div className="mt-5 divide-y divide-line-soft overflow-hidden rounded-2xl border border-line bg-surface">
        {competition.map((c) => (
          <div
            key={c.name}
            className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-5 sm:p-5"
          >
            <div className="flex shrink-0 items-baseline gap-2 sm:w-64">
              <span className="mono mt-0.5 text-[0.7rem] text-ink-faint" aria-hidden>
                ✕
              </span>
              <h3 className="font-display text-base font-semibold leading-snug text-ink">
                {c.name}
              </h3>
            </div>
            <p className="text-[0.95rem] leading-relaxed text-ink-2">{c.reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
