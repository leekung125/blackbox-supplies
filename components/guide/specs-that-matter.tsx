import type { SpecsThatMatter } from "@/lib/comparison-guides";

/**
 * Signal vs noise — the block that separates the spec that actually decides the purchase from the
 * marketing number printed biggest on the box. Two lit columns: the decisive figures (amber, kept)
 * and the marketing figures (muted, struck). Server component — pure content, no interactivity.
 */
export function SpecsThatMatterBlock({ data }: { data: SpecsThatMatter }) {
  return (
    <section className="mt-14">
      <div className="max-w-2xl">
        <span className="eyebrow eyebrow-accent">Signal vs noise</span>
        <h2 className="section-title mt-2">What actually matters — and what&rsquo;s just marketing</h2>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-2">
          Every category has one or two specs that decide whether you&rsquo;re happy in a year — and a
          louder number the box leads with that barely predicts anything. Here&rsquo;s how to read
          past the headline.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {/* what decides the buy */}
        <div className="lit-card grad-border-amber rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="pill-amber">Buy on this</span>
            <span className="mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">The decisive spec</span>
          </div>
          <ul className="mt-4 space-y-3">
            {data.decisive.map((d) => (
              <li key={d} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink">
                <svg
                  className="mt-1 h-4 w-4 shrink-0 text-accent-bright"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 13 L9 17 L19 6" />
                </svg>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* what to discount */}
        <div className="lit-card rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-faint">
              Discount this
            </span>
            <span className="mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">The marketing number</span>
          </div>
          <ul className="mt-4 space-y-3">
            {data.noise.map((n) => (
              <li key={n} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-dim">
                <svg
                  className="mt-1 h-4 w-4 shrink-0 text-ink-faint"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M18 6 L6 18 M6 6 L18 18" />
                </svg>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
