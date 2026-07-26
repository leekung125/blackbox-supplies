import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { searchItems, bestSellers, type SearchItem, type SearchKind } from "@/lib/search-index";

const POPULAR = ["Portable AC", "Dash cam", "Cooling sheets", "Jump starter", "Power station", "Tire inflator"];

const GROUP_ORDER: { kind: SearchKind; label: string }[] = [
  { kind: "guide", label: "Guides & comparisons" },
  { kind: "product", label: "Products" },
  { kind: "category", label: "Shop by category" },
];

export const metadata: Metadata = {
  title: "Search",
  description: "Search BlackBox Supplies for gear, buying guides, and category picks.",
  alternates: { canonical: "/search" },
  // Query-string result pages shouldn't be indexed (thin/duplicate), but must resolve for the
  // Sitelinks Searchbox (SearchAction) target and for shoppers who land here.
  robots: { index: false, follow: true },
};

function Thumb({ it }: { it: SearchItem }) {
  return (
    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface-2">
      {it.image ? (
        <Image src={it.image} alt="" fill sizes="48px" className="object-cover" />
      ) : it.kind === "category" ? (
        <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
          <path d="M4 6 h7 v7 h-7 z M13 6 h7 v7 h-7 z M4 15 h7 v3 h-7 z M13 15 h7 v3 h-7 z" />
        </svg>
      ) : (
        <svg className="h-5 w-5 text-ink-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
          <path d="M4 8 l8 -4 l8 4 v8 l-8 4 l-8 -4 z M4 8 l8 4 M20 8 l-8 4 M12 12 v8" />
        </svg>
      )}
    </span>
  );
}

function ResultRow({ it }: { it: SearchItem }) {
  return (
    <Link
      href={it.href}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-3.5 transition-colors hover:border-accent/50"
    >
      <Thumb it={it} />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-base font-semibold text-ink-strong">{it.title}</span>
        <span className="block truncate text-sm text-ink-dim">{it.subtitle}</span>
      </span>
      <svg className="h-4 w-4 shrink-0 text-ink-faint transition-colors group-hover:text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9 6 l6 6 l-6 6" />
      </svg>
    </Link>
  );
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const raw = (await searchParams).q;
  const q = ((Array.isArray(raw) ? raw[0] : raw) ?? "").trim();

  const results = q ? searchItems(q, 24) : [];
  const groups = GROUP_ORDER.map((grp) => ({
    ...grp,
    items: results.filter((it) => it.kind === grp.kind),
  })).filter((grp) => grp.items.length);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Search", path: "/search" }])]} />

      <span className="eyebrow eyebrow-accent">Search</span>
      <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
        {q ? <>Results for &ldquo;{q}&rdquo;</> : <>Search BlackBox</>}
      </h1>
      {q ? (
        <p className="lede mt-4">
          {results.length > 0
            ? `${results.length} match${results.length === 1 ? "" : "es"} across guides, products, and categories.`
            : "No exact matches — but you're never at a dead end. Try a broader term, or start with a popular pick below."}
        </p>
      ) : (
        <p className="lede mt-4">
          Find gear, buying guides, and category picks. Search a product name, a symptom
          (&ldquo;car overheating&rdquo;), or a topic.
        </p>
      )}

      {/* Popular searches — quick jump-offs, and the empty-state anchor */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="mono text-xs uppercase tracking-[0.12em] text-ink-faint">Popular</span>
        {POPULAR.map((p) => (
          <Link
            key={p}
            href={`/search?q=${encodeURIComponent(p)}`}
            className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink-dim transition-colors hover:border-accent/50 hover:text-ink-strong"
          >
            {p}
          </Link>
        ))}
      </div>

      {/* Grouped results */}
      {groups.length > 0 ? (
        <div className="mt-10 space-y-8">
          {groups.map((grp) => (
            <section key={grp.kind}>
              <h2 className="mono mb-3 text-xs uppercase tracking-[0.14em] text-accent">{grp.label}</h2>
              <div className="space-y-2.5">
                {grp.items.map((it) => (
                  <ResultRow key={it.href} it={it} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : q ? (
        // Zero results → never a dead end: a few featured products to click.
        <div className="mt-10">
          <h2 className="mono mb-3 text-xs uppercase tracking-[0.14em] text-accent">Popular picks to get started</h2>
          <div className="space-y-2.5">
            {bestSellers(4).map((it) => (
              <ResultRow key={it.href} it={it} />
            ))}
          </div>
        </div>
      ) : null}

      <p className="mt-12 text-sm text-ink-dim">
        Browse instead: <Link href="/heat" className="ulink font-semibold">Cooling</Link> ·{" "}
        <Link href="/useful" className="ulink font-semibold">Useful gear</Link> ·{" "}
        <Link href="/gear" className="ulink font-semibold">Car &amp; roadside</Link> ·{" "}
        <Link href="/guides" className="ulink font-semibold">Buying guides</Link>
      </p>
    </div>
  );
}
