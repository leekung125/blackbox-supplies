import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { CATEGORIES } from "@/lib/categories";
import { BRAND, DISCLOSURE_SHORT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Links",
  description: "Blackbox Supply — gear for bad timing. Browse the field catalog.",
};

const LINKS = [
  { href: "/products", label: "All gear", sub: "The full catalog" },
  { href: "/kits", label: "Field kits", sub: "Pack by failure" },
  ...CATEGORIES.map((c) => ({ href: `/category/${c.slug}`, label: c.kitName, sub: c.tagline })),
  { href: "/disclosure", label: "Disclosure", sub: "Affiliate & sourcing" },
];

export default function LinksPage() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-md flex-col items-center px-5 py-16">
      <div className="bloom pointer-events-none absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 opacity-60 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        <Wordmark markClassName="h-11 w-11 text-ink" className="flex-col gap-3" />
        <p className="mono mt-5 text-[0.7rem] uppercase tracking-[0.3em] text-accent-bright">
          {BRAND.tagline}
        </p>
      </div>

      <nav className="relative mt-10 flex w-full flex-col gap-3">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group flex items-center justify-between rounded-lg border border-line bg-card/40 px-5 py-4 transition-colors hover:border-accent/40 hover:bg-card"
          >
            <span>
              <span className="block text-sm font-medium text-ink">{l.label}</span>
              <span className="mono mt-0.5 block text-[0.65rem] uppercase tracking-[0.16em] text-ink-faint">
                {l.sub}
              </span>
            </span>
            <span
              className="text-ink-faint transition-colors group-hover:text-accent-bright"
              aria-hidden
            >
              →
            </span>
          </Link>
        ))}

        <a
          href={`https://instagram.com/${BRAND.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-lg border border-line bg-card/40 px-5 py-4 transition-colors hover:border-accent/40 hover:bg-card"
        >
          <span>
            <span className="block text-sm font-medium text-ink">Instagram</span>
            <span className="mono mt-0.5 block text-[0.65rem] uppercase tracking-[0.16em] text-ink-faint">
              @{BRAND.instagram}
            </span>
          </span>
          <span
            className="text-ink-faint transition-colors group-hover:text-accent-bright"
            aria-hidden
          >
            →
          </span>
        </a>
      </nav>

      <p className="relative mt-10 max-w-xs text-center text-[0.7rem] leading-relaxed text-ink-faint">
        {DISCLOSURE_SHORT}
      </p>
    </main>
  );
}
