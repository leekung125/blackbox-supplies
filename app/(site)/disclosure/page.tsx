import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { webPageSchema } from "@/lib/schema";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "How We Work & Disclosure",
  description: "How BlackBox Supplies chooses products, how we make money, and what we will and won't claim.",
  alternates: { canonical: "/disclosure" },
};

const SECTIONS: { n: string; title: string; body: ReactNode }[] = [
  {
    n: "01",
    title: "How we choose",
    body: (
      <>
        BlackBox is a curation and buying-guide publication. We pick products from manufacturer specs and
        public research, and we explain what each is good for and what to watch for. Selection is based on
        how well something solves a real, everyday problem — never on who pays us.
      </>
    ),
  },
  {
    n: "02",
    title: "How we make money",
    body: (
      <>
        Outbound links are <strong className="text-ink">affiliate links</strong>. BlackBox is a member of the
        Amazon Associates program, so when you buy through one we may earn a small commission — at no extra cost
        to you. It never changes your price, and it never decides what we recommend: selection is based on how
        well something solves a real, everyday problem, not on who pays us. As an Amazon Associate, BlackBox
        earns from qualifying purchases.{" "}
        <strong className="text-ink">Amazon handles all orders, payment, shipping, returns, and customer
        support — BlackBox Supplies is an independent publisher and does not sell or ship products.</strong>
      </>
    ),
  },
  {
    n: "03",
    title: "Specs & prices",
    body: (
      <>
        Features, prices, and specs are drawn from public sources and change over time — we mark prices as
        approximate. Always confirm the exact model, current price, and details on the retailer&rsquo;s page
        before buying.
      </>
    ),
  },
  {
    n: "04",
    title: "No fabricated reviews or ratings",
    body: (
      <>
        We never invent reviews, star ratings, or testimonials, and we skip &ldquo;best ever,&rdquo;
        &ldquo;guaranteed,&rdquo; and safety or medical guarantees. Copy sticks to honest function, who a
        product is for, and its real tradeoffs.
      </>
    ),
  },
  {
    n: "05",
    title: "Product imagery",
    body: (
      <>
        Most visuals on this site are original BlackBox editorial images — generated or designed from
        manufacturer and category references to show the gear in real use. They are not the retailer&rsquo;s
        own photos, and they are not a substitute for them. Where we have no usable reference we show a clean
        spec tile instead. Always confirm the exact model, current options, appearance, and price on the
        product&rsquo;s Amazon page before buying.
      </>
    ),
  },
  {
    n: "06",
    title: "Contact",
    body: (
      <>
        Questions or corrections? Reach us on Instagram{" "}
        <a href={`https://instagram.com/${BRAND.instagram}`} target="_blank" rel="noopener noreferrer" className="ulink font-semibold">@{BRAND.instagram}</a>{" "}
        or email <a href={`mailto:${BRAND.email}`} className="ulink font-semibold">{BRAND.email}</a>.
      </>
    ),
  },
];

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <JsonLd data={[webPageSchema("/disclosure", "How We Work & Disclosure", "How BlackBox Supplies chooses products, how we make money, and what we will and won't claim.")]} />
      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">How we work</span>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
          Useful because it&rsquo;s honest.
        </h1>
        <p className="lede mt-4 max-w-2xl">
          BlackBox helps people find useful everyday gear before they need it. Here&rsquo;s exactly how the
          site is built, how we make money, and what we will and won&rsquo;t claim — in plain terms.
        </p>
        <p className="mono mt-4 text-xs uppercase tracking-wider text-ink-dim">Last updated: July 9, 2026</p>
      </Reveal>

      <div className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {SECTIONS.map((s) => (
          <Reveal key={s.n} blur={false}>
            <section className="flex gap-4 p-6 sm:gap-6 sm:p-7">
              <span className="nums shrink-0 font-display text-lg font-semibold text-accent-strong">{s.n}</span>
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">{s.title}</h2>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">{s.body}</p>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-ink-dim">
        Looking for the gear? <Link href="/gear" className="ulink font-semibold">Browse all gear</Link> or{" "}
        <Link href="/guides" className="ulink font-semibold">read the buying guides</Link>.
      </p>
    </div>
  );
}
