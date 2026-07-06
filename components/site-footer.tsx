import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { BRAND, DISCLOSURE_SHORT } from "@/lib/content";

const COLS: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    title: "Guides",
    links: [
      { href: "/guides/best-portable-air-conditioners", label: "Portable air conditioners" },
      { href: "/guides/best-portable-jump-starters", label: "Jump starters" },
      { href: "/guides/best-cordless-tire-inflators", label: "Tire inflators" },
      { href: "/guides/best-dash-cams", label: "Dash cams" },
    ],
  },
  {
    title: "Browse",
    links: [
      { href: "/heat", label: "Cooling" },
      { href: "/useful", label: "Useful gear" },
      { href: "/gear", label: "Car & roadside" },
      { href: "/kits", label: "Gear kits" },
      { href: "/newsletter", label: "Newsletter" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "About BlackBox" },
      { href: "/methodology", label: "How we pick" },
      { href: "/disclosure", label: "How we make money" },
      { href: `https://instagram.com/${BRAND.instagram}`, label: "Instagram", external: true },
      { href: `mailto:${BRAND.email}`, label: "Contact", external: true },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-graphite text-on-dark-dim">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Wordmark light markClassName="h-7 w-7" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-dark-dim">
              {BRAND.shortPositioning} Chosen on merit, and honest about the catch.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) =>
                  l.external ? (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-on-dark-dim transition-colors hover:text-accent-bright"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-on-dark-dim transition-colors hover:text-accent-bright">
                        {l.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-dark-line pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-on-dark-dim">{DISCLOSURE_SHORT}</p>
          <div className="mt-4 flex flex-col gap-1 text-xs text-on-dark-dim sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {year} {BRAND.name}
            </span>
            <Link href="/disclosure" className="transition-colors hover:text-accent-bright">
              How we make money →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
