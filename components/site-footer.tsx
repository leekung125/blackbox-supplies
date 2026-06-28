import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { CATEGORIES } from "@/lib/categories";
import { BRAND, DISCLOSURE_SHORT } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-panel/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* brand + disclosure */}
          <div className="lg:col-span-2">
            <Wordmark />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-dim">
              {BRAND.tagline} {BRAND.shortPositioning}
            </p>

            <div className="mt-5 rounded-md border border-line bg-card/50 p-3.5">
              <p className="kicker text-accent-bright">Affiliate + AI disclosure</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-faint">
                {DISCLOSURE_SHORT}{" "}
                <Link
                  href="/disclosure"
                  className="text-ink-dim underline decoration-line underline-offset-2 transition-colors hover:text-accent-bright"
                >
                  Read the full disclosure
                </Link>
                .
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <a
                href={`https://instagram.com/${BRAND.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-dim transition-colors hover:text-accent-bright"
              >
                @{BRAND.instagram}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="text-ink-dim transition-colors hover:text-accent-bright"
              >
                {BRAND.email}
              </a>
            </div>
          </div>

          {/* field categories */}
          <div>
            <p className="kicker">Field</p>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-sm text-ink-dim transition-colors hover:text-accent-bright"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* catalog */}
          <div>
            <p className="kicker">Catalog</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-ink-dim transition-colors hover:text-accent-bright"
                >
                  All Gear
                </Link>
              </li>
              <li>
                <Link
                  href="/kits"
                  className="text-sm text-ink-dim transition-colors hover:text-accent-bright"
                >
                  Field Kits
                </Link>
              </li>
              <li>
                <Link
                  href="/disclosure"
                  className="text-sm text-ink-dim transition-colors hover:text-accent-bright"
                >
                  Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="/links"
                  className="text-sm text-ink-dim transition-colors hover:text-accent-bright"
                >
                  Links
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
            © {year} {BRAND.name}
          </p>
          <p className="mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
            Honestly sourced · Never overclaimed
          </p>
        </div>
      </div>
    </footer>
  );
}
