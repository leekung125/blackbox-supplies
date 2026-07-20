import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { BRAND, EDITOR } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us — Corrections & Product Tips",
  description:
    "Reach BlackBox Supplies with corrections, product suggestions, or partnership questions. One inbox, read by a real person, and corrections fixed fast. Placement is never for sale.",
  alternates: { canonical: "/contact" },
};

const REASONS: { title: string; body: ReactNode }[] = [
  {
    title: "A correction",
    body: (
      <>
        Spotted a spec that&rsquo;s off, a price that&rsquo;s long out of date, or a link that&rsquo;s broken?
        This is the most useful email you can send us. Include the page and what looks wrong — we fix corrections
        fast and quietly.
      </>
    ),
  },
  {
    title: "A product to consider",
    body: (
      <>
        Own something genuinely useful you think belongs in a guide? Tell us what it is and what problem it solved
        for you. We can&rsquo;t promise coverage — everything still has to earn its place on evidence — but real
        owner experience is exactly what we want to hear.
      </>
    ),
  },
  {
    title: "Partnerships & press",
    body: (
      <>
        Media questions, syndication, or a brand inquiry? Reach out here. To be clear up front: placement is never
        for sale, and payment never decides a pick. If that&rsquo;s compatible with what you have in mind,
        we&rsquo;re glad to talk.
      </>
    ),
  },
  {
    title: "Anything else",
    body: (
      <>
        A question about how we work, a general note, or something that doesn&rsquo;t fit a box above — the same
        inbox handles it. A real person reads it.
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <Reveal blur={false}>
        <span className="eyebrow eyebrow-accent">Get in touch</span>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
          Contact BlackBox
        </h1>
        <p className="lede mt-4 max-w-2xl">
          One inbox, read by a real person. Whether it&rsquo;s a correction, a product worth a look, or a partnership
          question — here&rsquo;s how to reach us.
        </p>
      </Reveal>

      <Reveal blur={false}>
        <div className="mt-8 rounded-2xl border border-accent/25 bg-accent-tint p-6 sm:p-7">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent-strong">
            Email us
          </h2>
          <a
            href={`mailto:${BRAND.email}`}
            className="mt-2 block font-display text-2xl font-semibold text-ink hover:text-accent-strong sm:text-3xl"
          >
            {BRAND.email}
          </a>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
            We aim to reply within a few business days. Corrections usually move faster — accuracy is the whole point
            of this site. Prefer social? We&rsquo;re on Instagram at{" "}
            <a
              href={`https://instagram.com/${BRAND.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ulink font-semibold"
            >
              @{BRAND.instagram}
            </a>
            .
          </p>
        </div>
      </Reveal>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">What to reach out about</h2>
        <div className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {REASONS.map((r) => (
            <Reveal key={r.title} blur={false}>
              <section className="p-6 sm:p-7">
                <h3 className="font-display text-lg font-semibold text-ink">{r.title}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">{r.body}</p>
              </section>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">Who you&rsquo;re reaching</h2>
        <p className="article mt-3 text-[0.98rem] leading-relaxed text-ink-2">
          {EDITOR.name}, {EDITOR.role.toLowerCase()}, is personally accountable for how every pick is made.
          There&rsquo;s a real name behind the byline — verdicts come from cross-checked research and original
          analysis of hundreds of verified-buyer reviews, not anonymous copy. If you&rsquo;re writing about how
          a pick was made or a standard we hold, that&rsquo;s who your email reaches.
        </p>
      </section>

      <p className="mt-10 text-center text-sm text-ink-dim">
        Before you write, our{" "}
        <Link href="/disclosure" className="ulink font-semibold">disclosure</Link> and{" "}
        <Link href="/methodology" className="ulink font-semibold">methodology</Link> answer most questions about how
        we work and how we make money.
      </p>
    </div>
  );
}
