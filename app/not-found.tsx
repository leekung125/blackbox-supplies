import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { SiteSearch } from "@/components/site-search";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That page has moved or never existed. Search the catalog, or jump into one of our most-read buying guides.",
  robots: { index: false, follow: true },
};

/** The most-read comparison guides — the honest landing spots for a lost visitor. */
const TOP_GUIDES: { href: string; label: string; note: string }[] = [
  { href: "/guides/best-portable-air-conditioners", label: "Best Portable Air Conditioners", note: "Cooling" },
  { href: "/guides/best-power-stations-compared", label: "Best Portable Power Stations", note: "Backup power" },
  { href: "/guides/best-jump-starters-compared", label: "Best Jump Starters", note: "Car & roadside" },
  { href: "/guides/best-dash-cams-compared", label: "Best Dash Cams", note: "Car & roadside" },
  { href: "/guides/best-tire-inflators-compared", label: "Best Tire Inflators", note: "Car & roadside" },
];

export default function NotFound() {
  return (
    <div className="ground-field flex min-h-screen flex-col items-center px-4 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-2xl">
        <Reveal blur={false}>
          <Link href="/" aria-label="BlackBox Supplies — home" className="inline-flex">
            <Wordmark light size="text-[1.1rem]" markClassName="h-8 w-8" />
          </Link>
        </Reveal>

        <Reveal blur={false}>
          <span className="eyebrow eyebrow-accent mt-12 block">404 · Signal lost</span>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
            This page isn&rsquo;t in the box.
          </h1>
          <p className="lede mt-4 max-w-xl">
            The page you were after has moved, been retired, or never existed. Nothing&rsquo;s broken on
            your end. Search the catalog below, or pick up one of our most-read guides.
          </p>
        </Reveal>

        <Reveal blur={false}>
          <div className="mt-8">
            <SiteSearch placeholder="Search gear, guides…" />
          </div>
        </Reveal>

        <Reveal blur={false}>
          <div className="mt-10">
            <span className="mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-faint">
              Most-read guides
            </span>
            <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-surface">
              <ul className="divide-y divide-line">
                {TOP_GUIDES.map((g) => (
                  <li key={g.href}>
                    <Link
                      href={g.href}
                      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.02]"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-base font-semibold text-ink">
                          {g.label}
                        </span>
                        <span className="mono block text-[0.66rem] uppercase tracking-[0.14em] text-ink-faint">
                          {g.note}
                        </span>
                      </span>
                      <svg
                        className="h-4 w-4 shrink-0 text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:text-accent"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal blur={false}>
          <p className="mt-8 text-sm text-ink-dim">
            Or head back to{" "}
            <Link href="/" className="ulink font-semibold">the home page</Link>, browse{" "}
            <Link href="/guides" className="ulink font-semibold">all guides</Link>, or see{" "}
            <Link href="/products" className="ulink font-semibold">every product</Link> we track.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
