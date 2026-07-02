import { NewsletterForm } from "@/components/newsletter-form";

/**
 * Reusable newsletter band — a rich dark panel with an ambient glow. Used on the homepage, finds,
 * gear, and guide footers.
 */
export function NewsletterCta({
  heading = "Get useful gear notes before you need them.",
  dek = "A few times a month: practical buying guides, Amazon finds, and simple kit picks for power, car, travel and home. No hype, no fake reviews.",
}: {
  heading?: string;
  dek?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-line bg-card-2 px-6 py-12 sm:px-12 sm:py-14">
      <div className="bbx-aurora absolute inset-0 -z-10 opacity-70" aria-hidden />
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow eyebrow-accent">The newsletter</span>
        <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-ink sm:text-4xl">{heading}</h2>
        <p className="mx-auto mt-3 max-w-xl text-[0.98rem] leading-relaxed text-ink-2">{dek}</p>
        <div className="mx-auto mt-7 max-w-md">
          <NewsletterForm tone="dark" />
        </div>
      </div>
    </section>
  );
}
