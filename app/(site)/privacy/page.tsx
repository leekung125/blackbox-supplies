import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What data BlackBox Supplies collects, how affiliate links and analytics work, how we handle your email and purchases, and how to reach us with a data request.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS: { n: string; title: string; body: ReactNode }[] = [
  {
    n: "01",
    title: "The short version",
    body: (
      <>
        BlackBox Supplies is a buying-guide publication. We don&rsquo;t sell your data, we don&rsquo;t run
        intrusive ad networks, and we only collect what&rsquo;s needed to run the site, email you if you ask
        for it, and deliver anything you buy from us. This page explains exactly what that means in plain terms.
      </>
    ),
  },
  {
    n: "02",
    title: "Affiliate links & Amazon",
    body: (
      <>
        BlackBox is a member of the <strong className="text-ink">Amazon Associates</strong> program. Our outbound
        &ldquo;Check price on Amazon&rdquo; links carry an affiliate tag, and when you click one Amazon may set its
        own cookies to attribute a purchase to us and pay us a small commission — at no extra cost to you. What
        Amazon does with that data is governed by Amazon&rsquo;s own privacy notice, not ours. The affiliate
        relationship never changes your price and never decides what we recommend.
      </>
    ),
  },
  {
    n: "03",
    title: "Analytics",
    body: (
      <>
        We use privacy-friendly, aggregate analytics (Vercel Analytics) to understand which pages and guides are
        useful — for example, how many people viewed a comparison or clicked out to a product. This is measured in
        aggregate to improve the site; we don&rsquo;t use it to build advertising profiles of you, and we
        don&rsquo;t sell it.
      </>
    ),
  },
  {
    n: "04",
    title: "Email, if you opt in",
    body: (
      <>
        If you enter your email to get new guides, we store that address with our email provider (Brevo) solely
        to send you BlackBox updates. We never sell or rent it, and every email includes a one-click unsubscribe —
        using it removes you for good. Don&rsquo;t want email? Simply don&rsquo;t submit the form; nothing else on
        the site requires it.
      </>
    ),
  },
  // === ATTORNEY REVIEW (pre-launch, section 05): selling internationally through a merchant of record brings
  // GDPR/UK-GDPR/CCPA exposure. Confirm (a) controller/processor roles with Lemon Squeezy and Brevo,
  // (b) that data-processing agreements are in place with both, and (c) whether a fuller statutory
  // rights section (access/deletion/portability, legal bases) is required beyond the plain-language promise below.
  {
    n: "05",
    title: "If you buy a System from us",
    body: (
      <>
        When you buy one of our digital products (like The Digital Glovebox),{" "}
        <strong className="text-ink">payment is handled by Lemon Squeezy</strong>, our merchant of record — your
        card number goes to them, never to us, and how they handle it is governed by Lemon Squeezy&rsquo;s own
        privacy policy. What we receive is only what&rsquo;s needed to deliver and support your purchase:{" "}
        <strong className="text-ink">your email address, what you bought, and the order reference</strong>. We use
        that to send your download, honor the 30-day refund promise, and answer support email. Your address is
        stored with our email provider (Brevo) to deliver the files; anything beyond delivery — like seasonal
        reminders — only happens if you opt in. We never sell or rent purchase data, and you can ask us to delete
        what we hold at any time (below).
      </>
    ),
  },
  {
    n: "06",
    title: "Cookies & your controls",
    body: (
      <>
        Beyond the affiliate and analytics cookies above, we don&rsquo;t set advertising or cross-site tracking
        cookies. You can block or clear cookies in your browser at any time — the site keeps working. To request
        access to or deletion of any data we hold about you, just email us (below) and we&rsquo;ll take care of it.
      </>
    ),
  },
  {
    n: "07",
    title: "Contact & updates",
    body: (
      <>
        Questions, corrections, or a data request? Email{" "}
        <a href={`mailto:${BRAND.email}`} className="ulink font-semibold">{BRAND.email}</a> or reach us on Instagram{" "}
        <a href={`https://instagram.com/${BRAND.instagram}`} target="_blank" rel="noopener noreferrer" className="ulink font-semibold">@{BRAND.instagram}</a>.
        If this policy changes, we&rsquo;ll update this page.
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">Privacy</span>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
          Your data, in plain terms.
        </h1>
        <p className="lede mt-4 max-w-2xl">
          We collect as little as possible, never sell it, and tell you exactly how affiliate links, analytics,
          email, and purchases work on this site.
        </p>
        <p className="mono mt-4 text-xs uppercase tracking-wider text-ink-dim">Last updated: July 15, 2026</p>
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
        See also{" "}
        <Link href="/disclosure" className="ulink font-semibold">how we work &amp; disclosure</Link> and{" "}
        <Link href="/methodology" className="ulink font-semibold">how we pick</Link>.
      </p>
    </div>
  );
}
