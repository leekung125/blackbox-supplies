import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Reveal } from "@/components/motion/reveal";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Finds — smaller car upgrades worth knowing about",
  description:
    "The cheaper, clever car and cabin upgrades that quietly make every drive better — trunk fixes, charging, cleanup, and small roadside gear.",
};

export default function FindsPage() {
  const finds = getAllProducts()
    .filter((p) => p.tier === "support")
    .sort((a, b) => b.priority - a.priority);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">Finds</span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">Smaller upgrades worth knowing about.</h1>
        <p className="lede mt-4 max-w-2xl">
          Not every fix needs a big-ticket buy. These are the cheaper, clever car and cabin upgrades —
          trunk fixes, charging, cleanup, and small roadside gear — that quietly make every drive better.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {finds.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <p className="mt-10 text-sm text-ink-faint">
        Looking for the main gear? <Link href="/gear" className="ulink font-semibold">Browse all gear</Link> or{" "}
        <Link href="/guides" className="ulink font-semibold">read the buying guides</Link>.
      </p>

      <div className="mt-16">
        <NewsletterCta />
      </div>
    </div>
  );
}
