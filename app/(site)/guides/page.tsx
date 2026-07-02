import type { Metadata } from "next";
import { GuideCard } from "@/components/guide-card";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Buying Guides",
  description:
    "Practical buying guides for everyday gear — power banks, car emergency kits, useful gear under $50, travel tech, and power-outage basics. Source-linked picks, honest tradeoffs.",
};

export default function GuidesPage() {
  const guides = getAllGuides();
  const [lead, ...rest] = guides;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">Buying guides</span>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
          Figure out what to buy — before you need it.
        </h1>
        <p className="lede mt-4 max-w-2xl">
          Clear, research-based guides to the gear that matters when normal plans fail. Each one ends in
          source-linked picks with honest tradeoffs — no fluff, no fake testing, no pressure.
        </p>
      </Reveal>

      <Reveal blur={false} className="mt-10">
        <GuideCard guide={lead} featured />
      </Reveal>

      <Stagger className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((g) => (
          <StaggerItem key={g.slug}>
            <GuideCard guide={g} />
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-16">
        <NewsletterCta />
      </div>
    </div>
  );
}
