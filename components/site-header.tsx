import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { CATEGORIES } from "@/lib/categories";

const NAV = [
  { href: "/products", label: "All Gear" },
  { href: "/kits", label: "Kits" },
  { href: "/disclosure", label: "Disclosure" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Blackbox Supply — home">
          <Wordmark />
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mono whitespace-nowrap rounded-sm px-2 py-1.5 text-[0.64rem] uppercase tracking-[0.1em] text-ink-dim transition-colors hover:bg-card hover:text-accent-bright sm:px-3 sm:text-[0.7rem] sm:tracking-[0.16em]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* category sub-rail */}
      <div className="border-t border-line-soft bg-base/60">
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          <span className="kicker mr-2 shrink-0 text-ink-faint">Field</span>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="mono shrink-0 rounded-sm border border-transparent px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim transition-colors hover:border-accent/30 hover:text-accent-bright"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
