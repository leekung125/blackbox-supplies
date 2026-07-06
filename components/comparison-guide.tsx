import Link from "next/link";
import Image from "next/image";
import { ComparisonBoard } from "@/components/comparison-board";
import { NewsletterCta } from "@/components/newsletter-cta";
import type { ComparisonGuide } from "@/lib/comparison-guides";

/**
 * The full interactive comparison guide page. A real magazine buying guide whose centre is a
 * live, sortable side-by-side of the real products (<ComparisonBoard/>), wrapped in the honest
 * editorial shell (short version, who it's for, what to check, mistakes, tradeoffs).
 * Prose reads at a comfortable measure; the board breaks out wider so the comparison breathes.
 */
export function ComparisonGuideView({ guide }: { guide: ComparisonGuide }) {
  const count = guide.products.length;

  return (
    <div className="px-4 py-10 sm:px-6">
      {/* ── narrow editorial intro ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-faint">
          <Link href="/" className="hover:text-accent-strong">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/guides" className="hover:text-accent-strong">Guides</Link>
        </nav>

        <header className="mt-5">
          <div className="flex flex-wrap items-center gap-2 text-[0.78rem]">
            <span className="eyebrow eyebrow-accent">{guide.categoryLabel}</span>
            <span className="text-ink-faint">·</span>
            <span className="text-ink-faint">{guide.readMinutes} min read</span>
            <span className="text-ink-faint">·</span>
            <span className="text-ink-faint">Updated {guide.updated}</span>
            <span className="text-ink-faint">·</span>
            <span className="mono text-[0.72rem] text-accent-strong">{count} compared</span>
          </div>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.08] text-ink-strong sm:text-[2.9rem]">
            {guide.title}
          </h1>
          <p className="lede mt-4">{guide.dek}</p>
        </header>

        {guide.heroImage ? (
          <div className="mt-7 overflow-hidden rounded-2xl border border-line bg-surface-2">
            <div className="relative aspect-[16/9]">
              <Image
                src={guide.heroImage}
                alt={guide.title}
                fill
                priority
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : null}

        {/* the short version */}
        <div className="mt-8 rounded-2xl border border-accent/25 bg-accent-tint p-5 sm:p-6">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent-strong">
            The short version
          </h2>
          <p className="mt-2 text-[1.02rem] leading-relaxed text-ink">{guide.quickAnswer}</p>
        </div>
      </div>

      {/* ── the interactive comparison — the centre of gravity, wider ───────── */}
      <section className="mx-auto mt-12 max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow eyebrow-accent">Compare, then buy</span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink-strong sm:text-3xl">
            Tell us what matters — we&rsquo;ll surface the pick
          </h2>
          <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">
            Cooling, quiet, or price — tap one and the winner rises to the top. Every number is real,
            and each pick links straight to its exact Amazon page.
          </p>
        </div>

        <div className="mt-7">
          <ComparisonBoard products={guide.products} meta={guide.meta} sorts={guide.sorts} />
        </div>
      </section>

      {/* ── the rest of the editorial ──────────────────────────────────────── */}
      <div className="mx-auto mt-14 max-w-3xl">
        <section>
          <h2 className="font-display text-2xl font-semibold text-ink-strong">Who this is for</h2>
          <ul className="mt-4 space-y-2.5">
            {guide.whoFor.map((w) => (
              <li key={w} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-2">
                <Check />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-ink-strong">What to buy first</h2>
          <p className="article mt-3 text-[0.98rem]">{guide.buyFirst}</p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink-strong">
            What to check before buying
          </h2>
          <div className="mt-4 space-y-4">
            {guide.checkBeforeBuying.map((c) => (
              <div key={c.label} className="rounded-xl border border-line bg-surface p-4">
                <h3 className="font-display text-base font-semibold text-ink-strong">{c.label}</h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-2">{c.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink-strong">Common mistakes</h2>
          <ul className="mt-4 space-y-2.5">
            {guide.mistakes.map((m) => (
              <li key={m} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink-strong">The honest tradeoffs</h2>
          <p className="article mt-3 text-[0.98rem]">{guide.tradeoffs}</p>
        </section>

        <p className="mt-10 rounded-xl border border-line bg-surface-2 p-4 text-xs leading-relaxed text-ink-faint">
          How we choose: picks are ranked from manufacturer specs, DOE/SACC data, and independent
          lab reviews — no paid placement, ever. Numbers are real or marked unverified; we never
          invent a spec, rating, or price. Outbound links are Amazon affiliate links: as an Amazon
          Associate, BlackBox Supply earns from qualifying purchases, at no extra cost to you.{" "}
          <Link href="/disclosure" className="ulink font-semibold">Full disclosure</Link>.
        </p>

        <div className="mt-16">
          <NewsletterCta />
        </div>
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg
      className="mt-1 h-4 w-4 shrink-0 text-accent-strong"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13 L9 17 L19 6" />
    </svg>
  );
}
