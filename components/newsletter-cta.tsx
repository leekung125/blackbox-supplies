import { NewsletterForm } from "@/components/newsletter-form";

/**
 * Reusable newsletter band — an elevated lit-card lit by one amber lamp, with a glowing focal
 * mark, atmospheric grid, and premium form treatment. Used on the homepage, finds, gear, and
 * guide footers.
 */
export function NewsletterCta({
  heading = "The gear actually worth buying — one email a week.",
  dek = "The car, power, cooling, and work-utility gear worth owning — with the honest catch on each. One genuinely useful email a week. No spam, no fake reviews, unsubscribe anytime.",
}: {
  heading?: string;
  dek?: string;
}) {
  return (
    <section className="lit-card grad-border-amber ground-field relative isolate overflow-hidden px-6 py-14 sm:px-12 sm:py-16">
      {/* layered atmosphere: night grid + amber lamp behind the focal mark */}
      <div className="atmo-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div className="glow-amber pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/3" aria-hidden />
      <div className="bbx-aurora pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-2xl text-center">
        {/* glowing focal mark */}
        <span
          className="focal-glow mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            border: "1px solid #edba66bb",
            background: "radial-gradient(125% 125% at 50% 22%, #d99a453d, transparent 72%)",
            boxShadow: "0 0 20px -5px #d99a45, inset 0 0 12px -6px #edba66",
          }}
          aria-hidden
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
            style={{ filter: "drop-shadow(0 0 5px #d99a45) drop-shadow(0 0 1.5px #edba66)" }}
          >
            <defs>
              <linearGradient id="nl-mail" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f2d49a" />
                <stop offset="1" stopColor="#c88a35" />
              </linearGradient>
            </defs>
            <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="url(#nl-mail)" strokeWidth="1.6" />
            <path d="M4 7.5l8 5 8-5" stroke="url(#nl-mail)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <span className="eyebrow eyebrow-accent mt-5 inline-block">The newsletter</span>
        <h2 className="section-title headline-glow mt-3 text-balance">{heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink-2">{dek}</p>

        <div className="mx-auto mt-8 max-w-md">
          <NewsletterForm tone="dark" />
        </div>

        {/* trust strip — glowing amber dots, honest signals */}
        <ul className="mono mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">
          {["No spam", "One email a week", "Unsubscribe anytime"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#edba66", boxShadow: "0 0 8px 0 #d99a45" }}
                aria-hidden
              />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
