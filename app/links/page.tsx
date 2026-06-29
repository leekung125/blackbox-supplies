import type { Metadata } from "next";
import Link from "next/link";
import { WordmarkStacked } from "@/components/wordmark";
import { CategoryObject } from "@/components/object-art";
import { CATEGORIES } from "@/lib/categories";
import { BRAND, DISCLOSURE_SHORT, FAILURE_MOMENTS } from "@/lib/content";
import { getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Links",
  description: "Blackbox Supply — gear for bad timing. Start with the moment that went wrong.",
};

/**
 * /links — the Instagram bio router. Mobile-first conversion page.
 * Reel → here → the failure moment that went wrong → the gear that answers it.
 * Source-only (no affiliate links yet); honest by construction.
 */
export default function LinksPage() {
  const lead = getFeaturedProducts()[0];

  return (
    <main className="relative mx-auto flex min-h-screen max-w-md flex-col px-5 py-12">
      <div className="bloom pointer-events-none absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 opacity-50 blur-3xl" />

      <header className="relative flex flex-col items-center text-center">
        <WordmarkStacked />
        <p className="mono mt-5 text-[0.68rem] uppercase tracking-[0.3em] text-accent-bright">
          {BRAND.tagline}
        </p>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-dim">
          {BRAND.shortPositioning}
        </p>
      </header>

      {/* what went wrong — the reel hook, self-select */}
      <section className="relative mt-9">
        <p className="kicker text-ink-faint">What went wrong?</p>
        <div className="mt-3 grid grid-cols-1 gap-2.5">
          {FAILURE_MOMENTS.map((m) => (
            <Link
              key={m.label}
              href={`/category/${m.categorySlug}`}
              className="group flex items-center justify-between rounded-lg border border-line bg-card/40 px-4 py-3.5 transition-colors hover:border-accent/40 hover:bg-card"
            >
              <span className="flex items-baseline gap-2.5">
                <span className="text-sm font-semibold text-ink">{m.label}</span>
                <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-faint">
                  {m.line}
                </span>
              </span>
              <span className="text-ink-faint transition-colors group-hover:text-accent-bright" aria-hidden>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* lead pick — the most likely reel subject */}
      {lead ? (
        <section className="relative mt-7">
          <p className="kicker text-ink-faint">Field pick</p>
          <Link
            href={`/products/${lead.id}`}
            className="group mt-3 flex items-center gap-4 overflow-hidden rounded-xl border border-line bg-card/40 p-4 transition-colors hover:border-accent/40 hover:bg-card"
          >
            <span className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-base/60">
              {lead.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={lead.image}
                  alt={`${lead.name} — generated visual`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <>
                  <div className="grid-faint absolute inset-0 opacity-50" aria-hidden />
                  <CategoryObject category={lead.category} className="relative h-[78%] w-[78%]" />
                </>
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-ink">{lead.name}</span>
              <span className="mt-0.5 block truncate text-[0.8rem] text-ink-dim">{lead.problemSolved}</span>
              <span className="mono mt-1 inline-block text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint">
                {lead.priceRange} · source-only · not tested
              </span>
            </span>
            <span className="text-ink-faint transition-colors group-hover:text-accent-bright" aria-hidden>→</span>
          </Link>
        </section>
      ) : null}

      {/* primary routes */}
      <section className="relative mt-7 grid grid-cols-2 gap-2.5">
        <Link
          href="/products"
          className="rounded-lg border border-accent/40 bg-accent/15 px-4 py-3.5 text-center text-sm font-semibold text-accent-bright transition-colors hover:bg-accent/25"
        >
          Browse all gear
        </Link>
        <Link
          href="/kits"
          className="rounded-lg border border-line bg-card/40 px-4 py-3.5 text-center text-sm font-semibold text-ink transition-colors hover:border-accent/40 hover:bg-card"
        >
          Field kits
        </Link>
      </section>

      {/* fields */}
      <section className="relative mt-3 grid grid-cols-2 gap-2.5">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="mono rounded-lg border border-line bg-card/40 px-4 py-3 text-[0.7rem] uppercase tracking-[0.16em] text-ink-dim transition-colors hover:border-accent/40 hover:text-accent-bright"
          >
            {c.name}
          </Link>
        ))}
      </section>

      {/* instagram + disclosure */}
      <a
        href={`https://instagram.com/${BRAND.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mt-7 flex items-center justify-between rounded-lg border border-line bg-card/40 px-5 py-4 transition-colors hover:border-accent/40 hover:bg-card"
      >
        <span>
          <span className="block text-sm font-medium text-ink">Instagram</span>
          <span className="mono mt-0.5 block text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">
            @{BRAND.instagram}
          </span>
        </span>
        <span className="text-ink-faint transition-colors group-hover:text-accent-bright" aria-hidden>→</span>
      </a>

      <Link
        href="/disclosure"
        className="relative mt-6 text-center text-[0.7rem] leading-relaxed text-ink-faint underline decoration-line underline-offset-2 transition-colors hover:text-ink-dim"
      >
        {DISCLOSURE_SHORT}
      </Link>
    </main>
  );
}
