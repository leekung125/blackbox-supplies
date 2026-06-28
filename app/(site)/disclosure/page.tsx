import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Disclosure",
  description: "Affiliate, sourcing, and AI disclosure for Blackbox Supply.",
};

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="flex items-center gap-2">
        <span className="h-px w-6 bg-accent/60" aria-hidden />
        <span className="kicker text-accent-bright">Transparency</span>
      </div>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">Disclosure</h1>
      <p className="mono mt-3 text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
        Reviewed at launch · {BRAND.name}
      </p>

      <div className="mt-10 space-y-2">
        <Section title="Affiliate links">
          Some outbound links on {BRAND.name} are affiliate links. If you buy through one, we may earn a
          commission at no additional cost to you. It never changes the price you pay, and it does not decide
          what we feature — selection is based on how well a product answers a specific failure moment.
        </Section>
        <Section title="We have not personally tested these products">
          {BRAND.name} is a sourcing catalog, not a testing lab. We have{" "}
          <strong className="text-ink">not</strong> bought, used, or tested the products shown. Details —
          features, prices, specs — are drawn from public research and manufacturer listings, are marked
          approximate, and vary by model and change over time. Confirm current details on the
          retailer&rsquo;s page before buying.
        </Section>
        <Section title="No fake reviews or testimonials">
          We do not publish reviews, testimonials, star ratings, or claims of personal experience. We do not
          use &ldquo;best,&rdquo; &ldquo;guaranteed,&rdquo; or safety/medical guarantees. Product copy is
          limited to factual function and category statements plus honest trade-offs.
        </Section>
        <Section title="AI-assisted production">
          Our short videos are produced with AI-assisted tools under human creative direction. They depict
          products and scenarios for illustration — they are not real-world performance tests, and do not
          present any real, identifiable person or event as fact.
        </Section>
        <Section title="Contact">
          Questions? Reach us on Instagram <span className="mono text-ink">@{BRAND.instagram}</span>.
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line-soft py-6">
      <h2 className="kicker text-ink-faint">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-dim">{children}</p>
    </section>
  );
}
