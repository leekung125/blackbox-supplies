import type { Metadata } from "next";
import Link from "next/link";
import { WordmarkStacked } from "@/components/wordmark";
import { ProductThumb } from "@/components/product-thumb";
import { NewsletterForm } from "@/components/newsletter-form";
import { BRAND } from "@/lib/content";
import { getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Links",
  description:
    "BlackBox Supply — the car, roadside, and backup-power gear worth owning. The top picks, the buying guides, and the kits, in one place.",
  // Link-in-bio utility page — real content lives on the guides; keep it out of the index.
  robots: { index: false, follow: true },
};

export default function LinksPage() {
  const heroes = getFeaturedProducts();
  const featured = heroes.find((p) => p.image) ?? heroes[0];

  const rows = [
    { href: "/gear", label: "The five to know", sub: "Our top gear picks" },
    { href: "/guides/best-portable-jump-starters", label: "Best jump starters", sub: "Buying guide" },
    { href: "/guides/best-cordless-tire-inflators", label: "Best tire inflators", sub: "Buying guide" },
    { href: "/guides/best-dash-cams", label: "Best dash cams", sub: "Buying guide" },
    { href: "/kits/roadside-kit", label: "The Roadside Kit", sub: "What to keep in your car" },
    { href: "/guides", label: "All buying guides", sub: "Know what to buy" },
  ];

  return (
    <main className="min-h-screen bg-paper px-5 py-12">
      <div className="mx-auto flex max-w-md flex-col">
        <header className="flex flex-col items-center text-center">
          <WordmarkStacked light />
          <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-2">{BRAND.shortPositioning}</p>
        </header>

        {featured ? (
          <Link
            href={`/products/${featured.id}`}
            className="group mt-8 overflow-hidden rounded-2xl border border-line bg-surface transition-shadow hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.6)]"
          >
            <div className="relative">
              <ProductThumb product={featured} className="aspect-[16/9] w-full" pad="p-8" />
              <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[0.7rem] font-semibold text-ink">Featured pick</span>
              <span className="nums absolute right-3 top-3 rounded-full bg-dark/80 px-2.5 py-1 text-xs font-semibold text-on-dark ring-1 ring-white/10">{featured.priceRange}</span>
            </div>
            <div className="p-4">
              <h2 className="font-display text-lg font-semibold text-ink group-hover:text-accent">{featured.name}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-ink-2">{featured.verdict}</p>
            </div>
          </Link>
        ) : null}

        <div className="mt-3 space-y-2.5">
          {rows.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors hover:border-accent/40"
            >
              <span>
                <span className="block text-sm font-semibold text-ink">{r.label}</span>
                <span className="block text-xs text-ink-faint">{r.sub}</span>
              </span>
              <span className="text-ink-faint transition-colors group-hover:text-accent" aria-hidden>→</span>
            </Link>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
          <h2 className="font-display text-base font-semibold text-ink">The gear worth knowing about, in your inbox</h2>
          <p className="mt-1 text-sm text-ink-2">A few times a month. No spam.</p>
          <div className="mt-3">
            <NewsletterForm />
          </div>
        </div>

        <a
          href={`https://instagram.com/${BRAND.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors hover:border-accent/40"
        >
          <span>
            <span className="block text-sm font-semibold text-ink">Instagram</span>
            <span className="block text-xs text-ink-faint">@{BRAND.instagram}</span>
          </span>
          <span className="text-ink-faint transition-colors group-hover:text-accent" aria-hidden>→</span>
        </a>

        <Link href="/disclosure" className="mt-6 text-center text-xs text-ink-faint underline decoration-line underline-offset-2 hover:text-ink-2">
          How we work &amp; disclosure
        </Link>
      </div>
    </main>
  );
}
