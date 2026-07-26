import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Reveal } from "@/components/motion/reveal";
import { ProductThumb } from "@/components/product-thumb";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { getAllKits } from "@/lib/kits";
import { getProductById } from "@/lib/products";

const BASE = "https://www.blackboxsupplies.com";

export const metadata: Metadata = {
  title: "Gear Kits — Roadside, Winter, Backup Power",
  description:
    "Curated gear kits built around one real problem — roadside breakdowns, road trips, winter driving, and power outages. Start with the essentials, upgrade when ready. Every item links straight to Amazon.",
  alternates: { canonical: "/kits" },
};

export default function KitsPage() {
  const kits = getAllKits();

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Gear kits", path: "/kits" }]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "BlackBox Supplies — gear kits",
          numberOfItems: kits.length,
          itemListElement: kits.map((k, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: k.name,
            url: `${BASE}/kits/${k.id}`,
          })),
        },
      ]} />
      {/* ambient lamp behind the masthead */}
      <div
        aria-hidden
        className="glow-amber-soft pointer-events-none left-1/2 top-[-5rem] h-72 w-[38rem] max-w-[92vw] -translate-x-1/2"
      />

      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">Gear kits</span>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] text-ink headline-glow sm:text-5xl">
          Build the right kit for the drive.
        </h1>
        <p className="lede mt-4 max-w-2xl">
          Each kit is the smallest set that solves one real problem — a breakdown, a long trip, a
          winter road, an outage. Start with the essentials, add the upgrades when you&rsquo;re ready.
          Every item links straight to Amazon.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {kits.map((k) => {
          const lead = getProductById(k.buyFirstId);
          const count = new Set([...k.starterIds, ...k.betterIds, ...k.premiumIds]).size;
          return (
            <Reveal key={k.id} blur={false}>
              <Link
                href={`/kits/${k.id}`}
                className="lit-card grad-border lift group relative flex h-full flex-col overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  {lead ? <ProductThumb product={k.heroImage ? { ...lead, image: k.heroImage } : lead} className="h-full w-full" pad="p-6 sm:p-8" /> : null}
                  {/* just ground the bottom margin into the card body — kept short + soft so it
                      grazes only the dark frame, never washing the real photo on the light plate */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-card/70 to-transparent"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(78% 62% at 50% 42%, rgba(217,154,69,0.16), transparent 72%)",
                    }}
                  />
                  <span className="pill-amber absolute left-4 top-4 z-10">Kit</span>
                </div>

                <div className="relative flex flex-1 flex-col p-5">
                  <h3 className="font-display text-2xl font-semibold text-ink-strong transition-colors group-hover:text-accent-bright">
                    {k.name}
                  </h3>
                  <p className="mt-1 text-[0.95rem] font-medium text-accent-strong">{k.tagline}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">{k.dek}</p>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    {/* count as a glowing stat chip */}
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-bright"
                      style={{
                        border: "1px solid #edba66bb",
                        background:
                          "radial-gradient(125% 125% at 50% 22%, #d99a453d, transparent 72%)",
                        boxShadow: "0 0 20px -5px #d99a45, inset 0 0 12px -6px #edba66",
                      }}
                    >
                      {count} picks
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors group-hover:text-accent-bright">
                      Build the kit
                      <svg
                        className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M5 12 H19 M13 6 L19 12 L13 18" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-16">
        <NewsletterCta />
      </div>
    </div>
  );
}
