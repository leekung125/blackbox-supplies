import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How We Pick — Our Research Methodology",
  description:
    "BlackBox Supply doesn't hands-on test products — and we'll never pretend to. Here is exactly what we do instead: spec verification, owner-review analysis, source scoring, and safety checks.",
  alternates: { canonical: "/methodology" },
};

const VERSION = "v1.0 — July 2026";

const DO_STACK = [
  {
    title: "Spec verification against manufacturer documentation",
    detail:
      "Every number we publish — peak amps, PSI, watt-hours, engine ratings — is traced to the manufacturer's own spec sheet, not the retail listing. When a listing claims something the manufacturer doesn't, we flag it or drop the product.",
  },
  {
    title: "Owner-review analysis, weighted for time",
    detail:
      "We read long-term owner feedback — the six-months-later reviews, not the day-one unboxings. Patterns in durability complaints, support experiences, and cold-weather failures count far more than launch-week star averages.",
  },
  {
    title: "Professional source scoring",
    detail:
      "Where hands-on lab testing exists (professional publications, independent test channels), we read it, weigh it by methodology quality, and cite it. We stand on the shoulders of people who actually put products on a bench — and we name them.",
  },
  {
    title: "Safety and recall checks",
    detail:
      "Jump starters are checked for spark-proof and reverse-polarity protection claims; products are screened against CPSC and NHTSA recall databases before they enter a guide.",
  },
  {
    title: "Category expertise over product hype",
    detail:
      "Most of our work is explaining what actually matters in a category — the specs that predict real-world usefulness and the ones that are marketing. If you leave knowing how to judge any jump starter, we did the job.",
  },
];

const NEVER_LIST = [
  "Claim or imply we hands-on tested something we didn't. Every page carries the same disclosure: researched, not personally tested.",
  "Publish fake ratings, fake review counts, or star widgets we invented.",
  "Use fake discounts, countdown timers, or manufactured urgency.",
  "Let a commission decide a pick. Products earn their slot by spec and owner evidence; the affiliate link comes after.",
  "Quote a live price. Prices move constantly — we publish approximate ranges and tell you to confirm on the retailer's page.",
];

const CHANGELOG = [
  {
    date: "July 2026",
    entry: "v1.0 — methodology published: spec verification, time-weighted owner-review analysis, professional source scoring, safety/recall screening.",
  },
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-faint">
        <Link href="/" className="hover:text-accent-strong">Home</Link>
        <span aria-hidden>/</span>
        <span className="text-ink-2">Methodology</span>
      </nav>

      <header className="mt-5">
        <span className="eyebrow eyebrow-accent">{VERSION}</span>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-[2.9rem]">
          How we pick — and what we'll never do
        </h1>
        <p className="lede mt-4">
          BlackBox Supply does not hands-on test products, and we will never pretend we did. That sentence is
          the foundation of everything on this site. Here is exactly what we do instead — with receipts.
        </p>
      </header>

      <div className="mt-8 rounded-2xl border border-accent/25 bg-accent-tint p-5 sm:p-6">
        <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent-strong">The one-paragraph version</h2>
        <p className="mt-2 text-[1.02rem] leading-relaxed text-ink">
          We verify every spec against manufacturer documentation, weigh long-term owner reviews over launch-week
          hype, read and cite the professionals who do lab-test, screen for safety protections and recalls, and
          explain what actually matters in each category. Picks earn their place with evidence. Links may earn us
          a commission — the evidence comes first.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">The research stack</h2>
        <div className="mt-4 space-y-4">
          {DO_STACK.map((item, i) => (
            <div key={item.title} className="rounded-xl border border-line bg-surface p-5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-sans text-[1.02rem] font-semibold text-ink">{item.title}</h3>
              </div>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">What we will never do</h2>
        <ul className="mt-4 space-y-2.5">
          {NEVER_LIST.map((n) => (
            <li key={n} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-2">
              <span aria-hidden className="mt-[2px] font-mono text-accent">×</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">How we make money</h2>
        <p className="article mt-3 text-[0.98rem] leading-relaxed text-ink-2">
          Outbound product links are affiliate links — mostly Amazon. As an Amazon Associate, BlackBox Supply
          earns from qualifying purchases, at no extra cost to you. Commissions never decide a pick, and we say
          so on every page a link appears. The full version is on the{" "}
          <Link href="/disclosure" className="ulink">disclosure page</Link>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">Changelog</h2>
        <p className="mt-2 text-sm text-ink-faint">
          This methodology is versioned. When how we work changes, the change is recorded here — dates never
          get bumped without one.
        </p>
        <div className="mt-4 space-y-3">
          {CHANGELOG.map((c) => (
            <div key={c.date} className="flex gap-4 rounded-xl border border-line bg-surface-2 p-4 text-[0.92rem]">
              <span className="shrink-0 font-mono text-ink-faint">{c.date}</span>
              <span className="leading-relaxed text-ink-2">{c.entry}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
