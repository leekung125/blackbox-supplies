import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/newsletter-form";
import { getAllSystems, getSystem } from "@/lib/systems";

export const dynamicParams = false;

// The receipt is a post-purchase page — never index it (thin, personal, and not a marketing surface).
export const metadata: Metadata = {
  title: "Thank you — your download is on its way",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return getAllSystems().map((s) => ({ slug: s.slug }));
}

/**
 * The post-purchase receipt shell (OFFER_PLACEMENT_MAP §8): download guidance + "print these two
 * pages first" + ONE seasonal-reminder opt-in. NO immediate second-product upsell — deliberately.
 * Files are delivered by Lemon Squeezy email (D0 sequence); this page confirms + orients. The
 * `digital_purchase` event fires from the Lemon Squeezy webhook (owned by the checkout group),
 * not here, so a page refresh never double-counts a sale.
 */
export default async function SystemThankYouPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const system = getSystem(slug);
  if (!system) notFound();

  return (
    <div className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <div
        aria-hidden
        className="glow-amber-soft pointer-events-none left-1/2 top-[-3rem] h-64 w-[34rem] max-w-[92vw] -translate-x-1/2"
      />

      <div className="relative text-center">
        <span
          className="focal-glow mx-auto grid h-14 w-14 place-items-center rounded-2xl"
          style={{
            border: "1px solid #edba66bb",
            background: "radial-gradient(125% 125% at 50% 22%, #d99a453d, transparent 72%)",
            boxShadow: "0 0 20px -5px #d99a45, inset 0 0 12px -6px #edba66",
          }}
          aria-hidden
        >
          <svg className="h-7 w-7 text-accent-bright" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13 L9 17 L19 6" />
          </svg>
        </span>
        <span className="eyebrow eyebrow-accent mt-5 inline-block">Order complete</span>
        <h1 className="mt-3 text-balance font-display text-3xl font-semibold leading-tight text-ink-strong headline-glow sm:text-4xl">
          Thank you — {system.title} is yours.
        </h1>
        <p className="lede mx-auto mt-4 max-w-lg">
          Your download links are on their way by email right now. No account, no login — the files
          are yours to keep.
        </p>
      </div>

      {/* what to do first — the honest quick-start */}
      <section className="lit-card grad-border-amber relative mt-10 overflow-hidden rounded-2xl p-6">
        <span aria-hidden className="glow-amber-soft" style={{ top: "-2.5rem", left: "-2rem", width: "14rem", height: "8rem" }} />
        <h2 className="relative font-display text-lg font-semibold text-ink-strong">Print these two pages first</h2>
        <p className="relative mt-2 text-[0.94rem] leading-relaxed text-ink-2">
          Before anything else: print the <span className="font-semibold text-ink-strong">Contacts Card</span> and the{" "}
          <span className="font-semibold text-ink-strong">Accident Protocol</span>, and put them in the actual glovebox.
          Paper is the only format that works with a dead phone. The rest can be filled in over an evening.
        </p>
        <ol className="relative mt-5 space-y-3">
          {[
            "Open the email from your receipt and save the files to your phone (Files or Drive).",
            "Print the Contacts Card + Accident Protocol and put them in the glovebox.",
            "Spend ten minutes on the Contacts Card and the Roadside Action Plan — the two highest-value pages.",
          ].map((step, i) => (
            <li key={step} className="flex gap-3 text-[0.92rem] leading-relaxed text-ink-2">
              <span className="mono nums mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-accent/50 text-[0.62rem] text-accent-strong">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* the ONE opt-in — seasonal reminders keyed to the replacement schedule. No upsell. */}
      <section className="mt-8 rounded-2xl border border-line bg-surface p-6">
        <h2 className="font-display text-lg font-semibold text-ink-strong">Want the twice-a-year nudge?</h2>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-dim">
          Optional: two emails a year — the first cold week of November and the first hot week of June —
          reminding you to run the seasonal checklist and top up the trunk gear. Nothing else, unsubscribe anytime.
        </p>
        <div className="mt-4">
          <NewsletterForm tone="light" />
        </div>
      </section>

      <div className="mt-10 text-center">
        <p className="text-sm text-ink-dim">
          Trouble with your files? <Link href="/contact" className="ulink">Contact us</Link> — a human replies.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ink-faint">{system.guarantee}</p>
      </div>
    </div>
  );
}
