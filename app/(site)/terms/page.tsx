import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { webPageSchema } from "@/lib/schema";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The plain-language terms for using BlackBox Supplies — an independent, research-based buying guide funded by affiliate links.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "July 9, 2026";

const SECTIONS: { n: string; title: string; body: ReactNode }[] = [
  {
    n: "01",
    title: "What this site is",
    body: (
      <>
        BlackBox Supplies is an independent curation and buying-guide publication. Everything here is
        <strong className="text-ink"> information and opinion</strong> — research, comparisons, and recommendations
        meant to help you decide. It is not professional, safety, financial, or medical advice, and using the site
        doesn&rsquo;t create any advisory relationship between us. By browsing, you agree to these terms.
      </>
    ),
  },
  {
    n: "02",
    title: "Verify before you buy",
    body: (
      <>
        Prices, specs, availability, and product details change constantly and are drawn from public sources — treat
        everything here as approximate and time-stamped, not live. Before you purchase anything, confirm the exact
        model, current price, features, and safety details on the retailer&rsquo;s own page. The retailer&rsquo;s
        listing is always the source of truth; ours is a guide to get you there informed.
      </>
    ),
  },
  {
    n: "03",
    title: "Affiliate links & third-party sellers",
    body: (
      <>
        Outbound product links are <strong className="text-ink">affiliate links</strong>. As an Amazon Associate,
        BlackBox Supplies earns from qualifying purchases at no extra cost to you. When you click through, your
        purchase, payment, shipping, returns, warranty, and support are handled entirely by
        <strong className="text-ink"> Amazon or the third-party seller</strong> — not by us. We are not a party to
        that transaction and cannot process orders, refunds, or returns. Any dispute about a purchase is between you
        and the retailer. See our{" "}
        <Link href="/disclosure" className="ulink font-semibold">disclosure</Link> for the full picture.
      </>
    ),
  },
  {
    n: "04",
    title: "Intellectual property",
    body: (
      <>
        The writing, research, layout, design, and original graphics on this site are the property of BlackBox Supplies
        and protected by copyright. You&rsquo;re welcome to link to our pages and quote short passages with credit,
        but please don&rsquo;t republish, scrape, or reproduce substantial portions without written permission.
        Product names, brand names, and logos belong to their respective owners and are shown
        for identification and reference only. Every product image on this site is an original
        rendering created by BlackBox Supplies — we don&rsquo;t use manufacturer photography.
      </>
    ),
  },
  {
    n: "05",
    title: "No warranties",
    body: (
      <>
        We research carefully and correct mistakes when we find them, but the site is provided
        <strong className="text-ink"> &ldquo;as is&rdquo;</strong> without warranties of any kind. We don&rsquo;t
        guarantee that every detail is accurate, complete, or current, that a recommended product will suit your
        specific situation, or that the site will be uninterrupted or error-free. You use the information here at
        your own discretion.
      </>
    ),
  },
  {
    n: "06",
    title: "Limitation of liability",
    body: (
      <>
        To the fullest extent allowed by law, BlackBox Supplies is not liable for any loss, damage, or injury arising
        from your use of the site, from decisions made based on our content, or from products you buy through our
        links. That includes direct, indirect, and incidental damages. A product&rsquo;s performance, safety, and
        fitness for your use are the responsibility of its manufacturer and seller — not this publication.
      </>
    ),
  },
  {
    n: "07",
    title: "Changes to these terms",
    body: (
      <>
        We may update these terms as the site evolves. When we do, we&rsquo;ll revise the &ldquo;Last updated&rdquo;
        date above. Continuing to use the site after a change means you accept the revised terms.
      </>
    ),
  },
  {
    n: "08",
    title: "Governing law",
    body: (
      <>
        These terms are governed by the laws of the United States and the state in which BlackBox Supplies operates,
        without regard to conflict-of-law rules. If any part of these terms is found unenforceable, the rest remains
        in effect.
      </>
    ),
  },
  {
    n: "09",
    title: "Contact",
    body: (
      <>
        Questions about these terms, or a correction to flag? Reach us at{" "}
        <a href={`mailto:${BRAND.email}`} className="ulink font-semibold">{BRAND.email}</a>{" "}
        or visit the <Link href="/contact" className="ulink font-semibold">contact page</Link>.
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <JsonLd data={[webPageSchema("/terms", "Terms of Use", "The plain-language terms for using BlackBox Supplies — an independent, research-based buying guide funded by affiliate links.")]} />
      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">The fine print, in plain words</span>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
          Terms of Use
        </h1>
        <p className="lede mt-4 max-w-2xl">
          BlackBox Supplies is an independent buying guide funded by affiliate links. Here are the terms for using it —
          written to be read, not to hide anything.
        </p>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-ink-dim">
          Last updated: {LAST_UPDATED}
        </p>
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
        See also how we make money on the{" "}
        <Link href="/disclosure" className="ulink font-semibold">disclosure page</Link> and how we pick in our{" "}
        <Link href="/methodology" className="ulink font-semibold">methodology</Link>.
      </p>
    </div>
  );
}
