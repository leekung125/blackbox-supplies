import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { BRAND, DISCLOSURE_LONG } from "@/lib/content";

const COLS: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    // ⛔ THESE FOUR SLOTS ARE THE MOST VALUABLE INTERNAL LINKS ON THE SITE - the footer renders
    // on every page, so each slot carries ~200 inbound links and a real share of the site's
    // internal authority. Two of them used to point at the LOWEST-commission categories.
    //
    // Measured from the catalog, commission per sale at Amazon's ~3% on each guide's top product:
    //     best-portable-air-conditioners   $16.50   (EcoFlow WAVE 3 / Whynter / Midea)
    //     best-power-stations-compared     $13.47   (Jackery / BLUETTI / EcoFlow RIVER 2 Pro)
    //     best-tower-fans-compared         $12.90   (Dyson TP07 / Shark TurboBlade)
    //     best-dash-cams-compared          $12.00   (Nextbase iQ / VIOFO A139 Pro)
    //     ---- replaced ----
    //     best-jump-starters-compared       $3.00
    //     best-tire-inflators-compared      $2.10
    //
    // The two replaced categories are NOT orphaned: the Categories column below still links
    // /category/jump-starters and /category/tire-inflators, so the car audience keeps its path.
    title: "Guides",
    links: [
      { href: "/guides/best-portable-air-conditioners", label: "Portable air conditioners" },
      { href: "/guides/best-power-stations-compared", label: "Power stations" },
      { href: "/guides/best-tower-fans-compared", label: "Tower fans" },
      { href: "/guides/best-dash-cams-compared", label: "Dash cams" },
    ],
  },
  {
    title: "Browse",
    links: [
      { href: "/when", label: "When it breaks" },
      { href: "/gear", label: "Car & Roadside" },
      { href: "/heat", label: "Cooling" },
      { href: "/useful", label: "Work & EDC" },
      { href: "/kits", label: "Gear kits" },
      { href: "/products", label: "Shop all gear" },
      { href: "/finds", label: "Value picks under $50" },
    ],
  },
  {
    title: "Categories",
    links: [
      { href: "/category/jump-starters", label: "Jump starters" },
      { href: "/category/tire-inflators", label: "Tire inflators" },
      { href: "/category/dash-cams", label: "Dash cams" },
      { href: "/category/power", label: "Power & charging" },
      { href: "/category/roadside", label: "Roadside safety" },
      { href: "/category/car-utility", label: "Car utility" },
    ],
  },
  {
    // No /disclosure or /privacy here — the bottom bar below already links both, and listing
    // them twice in one footer reads as padding.
    title: "About",
    links: [
      { href: "/about", label: "About BlackBox" },
      { href: "/methodology", label: "How we pick" },
      { href: "/contact", label: "Contact" },
      { href: "/terms", label: "Terms" },
      { href: `https://instagram.com/${BRAND.instagram}`, label: "Instagram", external: true },
      { href: `https://facebook.com/${BRAND.facebook}`, label: "Facebook", external: true },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-graphite text-on-dark-dim">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
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
          <p className="max-w-3xl text-xs leading-relaxed text-on-dark-dim">{DISCLOSURE_LONG}</p>
          <div className="mt-4 flex flex-col gap-1 text-xs text-on-dark-dim sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {year} {BRAND.name}
            </span>
            <span className="flex items-center gap-4">
              <Link href="/privacy" className="transition-colors hover:text-accent-bright">
                Privacy
              </Link>
              <Link href="/disclosure" className="transition-colors hover:text-accent-bright">
                How we make money →
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
