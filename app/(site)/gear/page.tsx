import type { Metadata } from "next";
import Link from "next/link";
import { ProductBrowser } from "@/components/product-browser";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Reveal } from "@/components/motion/reveal";
import { getAllProducts, isMainProduct } from "@/lib/products";
import { CAR_CATEGORIES } from "@/lib/site-stats";
import { ARTICLES } from "@/lib/articles";
import { EXTRA_ARTICLES } from "@/lib/articles-extra";
import { JsonLd } from "@/components/json-ld";
import { affiliateListSchema, breadcrumbSchema } from "@/lib/schema";

// The car & roadside vertical. /gear is the Car vertical page, parallel to /heat
// (Cooling) and /useful (Useful) — not a mixed "all catalog" dump. The category set
// lives in lib/site-stats so the homepage card and this page cannot drift apart.

export const metadata: Metadata = {
  title: "Car & Roadside Gear",
  description:
    "Car & roadside gear — jump starters, tire inflators, dash cams, power stations, roadside safety, and car utility. Picks chosen from public research and manufacturer specs, with honest tradeoffs and links straight to Amazon.",
  alternates: { canonical: "/gear" },
};

/** ⛔ /gear IS THE CAR VERTICAL HUB AND IT LINKED TO NO EDITORIAL AT ALL.
 * Measured on the built site: 51 product links and 4 guide links - and all four of those were
 * just the sitewide footer. Its sibling /heat carries a guide rail and shows 20. So the hub for
 * the vertical holding the $449 power stations and the $400 dash cams was passing all of its
 * internal authority straight to product pages and none to the guides that rank for the queries
 * people actually search.
 *
 * Ordered by commission per sale, richest first, on the same reasoning as the footer: when a
 * reader only reads one of these, it should be the one attached to the most valuable decision. */
const CAR_ARTICLE_CATEGORIES = new Set([
  "Jump Starters", "Tire Inflators", "Dash Cams",
  "Power & Charging", "Roadside Safety", "Car Utility",
]);

const CAR_GUIDE_ORDER = [
  "what-size-power-station-to-run-a-refrigerator-in-a-power-outage",
  "best-power-station-apartment-power-outage",
  "do-power-stations-work-in-cold-weather",
  "dash-cam-parking-mode-vs-security-camera",
  "dash-cam-didnt-record-the-incident",
  "portable-power-station-vs-jump-starter-which-do-i-need",
];

const CAR_GUIDES = (() => {
  const all = [...ARTICLES, ...EXTRA_ARTICLES].filter((a) =>
    CAR_ARTICLE_CATEGORIES.has(String(a.category)),
  );
  const rank = (s: string) => {
    const i = CAR_GUIDE_ORDER.indexOf(s);
    return i === -1 ? CAR_GUIDE_ORDER.length : i;
  };
  return all.sort((a, b) => rank(a.slug) - rank(b.slug)).slice(0, 10);
})();

export default function GearPage() {
  // Main grid = on-brand, ≥$25 picks (isMainProduct), so sub-$25 items (e.g. a $10 escape tool)
  // don't rank above the revenue drivers. They stay reachable via /finds, kits, and detail pages.
  const products = getAllProducts().filter(
    (p) => CAR_CATEGORIES.has(p.category as string) && isMainProduct(p),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Car & roadside", path: "/gear" }]),
        affiliateListSchema(
          "Car & roadside gear — researched picks",
          products.map((p) => ({ id: p.id, name: p.name, brand: p.brand, image: p.image ?? "", blurb: p.verdict || p.problemSolved })),
        ),
      ]} />
      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">Car &amp; roadside</span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">Car &amp; roadside gear</h1>
        {/* products.length is the literal length of the grid rendered below, so this number can never
            drift from the page. It is a SUBSET of the sitewide total (car & roadside only, ≥$25) —
            hence the qualifier: a bare number here reads as a contradiction of the homepage's total.
            The homepage's "Car & roadside" card mirrors this exact filter. */}
        <p className="lede mt-4 max-w-2xl">
          {products.length}{" "}car &amp; roadside picks over $25, across six categories — jump starters,
          tire inflators, dash cams, power &amp; charging, roadside safety, and car utility. Every entry
          is researched from manufacturer specs and public sources, and links straight to Amazon.
        </p>
      </Reveal>

      {CAR_GUIDES.length ? (
        <section className="mt-10 rounded-2xl border border-line-strong bg-surface p-5 sm:p-6">
          <span className="eyebrow eyebrow-accent">Read first — car &amp; roadside guides</span>
          <div className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {CAR_GUIDES.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group flex items-baseline gap-2 text-sm">
                <span className="font-medium text-ink transition-colors group-hover:text-accent">{g.title}</span>
                <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-10">
        <ProductBrowser products={products} />
      </div>

      <div className="mt-16">
        <NewsletterCta heading="New finds, picked and explained." dek="A few times a month we send the gear worth knowing about — with the honest tradeoffs, not just the hype." />
      </div>
    </div>
  );
}
