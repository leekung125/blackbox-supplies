import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Reveal } from "@/components/motion/reveal";
import { ProductThumb } from "@/components/product-thumb";
import { getAllKits } from "@/lib/kits";
import { getProductById } from "@/lib/products";

export const metadata: Metadata = {
  title: "Gear Kits",
  description:
    "Curated gear kits by problem — roadside, road trip, winter, and backup power. Start with the essentials, upgrade when you're ready. Every item links straight to Amazon.",
};

export default function KitsPage() {
  const kits = getAllKits();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">Gear kits</span>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
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
                className="bbx-card card-lift group flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  {lead ? <ProductThumb product={lead} className="h-full w-full" pad="p-8 sm:p-10" /> : null}
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-dark/75 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-on-dark-dim ring-1 ring-white/10">
                    Kit
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-2xl font-semibold text-ink-strong transition-colors group-hover:text-accent">
                    {k.name}
                  </h3>
                  <p className="mt-1 text-[0.95rem] font-medium text-accent-strong">{k.tagline}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">{k.dek}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    {count} picks · Build the kit
                    <svg className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12 H19 M13 6 L19 12 L13 18" />
                    </svg>
                  </span>
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
