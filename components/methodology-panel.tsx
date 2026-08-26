import Link from "next/link";
import { withAffiliateTag } from "@/lib/affiliate-tag";

/** True for a real outbound URL we should render as a clickable citation, not plain text. */
function isUrl(s: string): boolean {
  return /^https?:\/\//i.test(s.trim());
}
/** "https://www.rtings.com/…" → "rtings.com" for a tidy chip label. */
function hostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * The Research Trail — BlackBox's trust backbone, rendered as a clean, native panel (not academic
 * citations). Everything here is HONEST: the badges are the research steps we actually take, we
 * state plainly that we don't personally lab-test, and "authorities" only lists outlets a guide
 * genuinely cross-references. When an authority entry is a real URL it renders as a clickable,
 * nofollow citation; plain outlet names stay as text. No fabricated URLs, no invented ratings.
 *
 * `editor` is the named, accountable owner (the honest E-E-A-T byline) — research-based analysis,
 * explicitly NOT hands-on lab testing.
 */
export function MethodologyPanel({
  updated,
  authorities,
  editor,
  className = "",
  specsLabel = "Specs & manuals checked",
}: {
  updated?: string;
  authorities?: string[];
  editor?: { name: string; role: string; bio: string };
  className?: string;
  specsLabel?: string;
}) {
  // ⛔ "Price history tracked" was removed 2026-08-26. It appeared on EVERY money page and
  // nothing in this repo tracks price history - no scraper, no stored series, no Keepa or
  // CamelCamelCamel integration, nothing. It was a fabricated process claim sitting inside a
  // panel headed "Research trail", which is the worst possible place for one: the panel exists
  // to earn trust on a site that cannot show testing. Every remaining badge is a thing that is
  // actually done - owner-review analysis alone has 43 reviewsBasis entries in owner-evidence.ts.
  const badges = [
    specsLabel,
    "Warranty & support reviewed",
    "Owner-review patterns analyzed",
    "Independent reviews cross-referenced",
    "Safety / recall checks where relevant",
  ];
  return (
    <section className={`rounded-2xl border border-line bg-surface p-5 sm:p-6 ${className}`}>
      <div className="flex items-center gap-2">
        <Shield />
        <h2 className="mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-accent-strong">
          Research trail
        </h2>
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-ink-2">
        How every recommendation is built. We research, compare, and cite — we don&rsquo;t take
        payment for placement, and we don&rsquo;t claim to personally lab-test.
      </p>
      <div className="mt-4">
        <span className="mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-dim">
          Our research process
        </span>
        <ul className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          {badges.map((b) => (
            <li key={b} className="flex items-center gap-2 text-[0.85rem] text-ink-2">
              <Step />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {authorities && authorities.length ? (
        <div className="mt-4 border-t border-line-soft pt-3.5">
          <span className="mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-dim">
            Cross-referenced with
          </span>
          <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-[0.85rem] text-ink-2">
            {authorities.map((a, i) => (
              <span key={a} className="inline-flex items-center">
                {isUrl(a) ? (
                  <a
                    href={withAffiliateTag(a)}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="ulink text-ink-2"
                  >
                    {hostLabel(a)}
                  </a>
                ) : (
                  <span>{a}</span>
                )}
                {i < authorities.length - 1 ? (
                  <span className="text-ink-faint" aria-hidden>
                    {" · "}
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {editor ? (
        <div className="mt-4 flex items-start gap-3 border-t border-line-soft pt-3.5">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-surface-2 text-accent-strong"
            aria-hidden
          >
            <Desk />
          </span>
          <div className="min-w-0">
            <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-dim">
              Written &amp; researched by
            </span>
            <p className="mt-0.5 text-[0.9rem] font-semibold text-ink">
              {editor.name}
              <span className="ml-2 font-normal text-ink-dim">· {editor.role}</span>
            </p>
            <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-dim">{editor.bio}</p>
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line-soft pt-3.5 text-xs text-ink-dim">
        <span>Researched &amp; cited — not personally tested.</span>
        <span className="flex items-center gap-3">
          {updated ? <span className="mono">Last reviewed {updated}</span> : null}
          <Link href="/methodology" className="ulink font-semibold text-ink-2">
            Full methodology →
          </Link>
        </span>
      </div>
    </section>
  );
}

function Shield() {
  return (
    <svg className="h-4 w-4 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3 L20 6 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V6 Z" />
      <path d="M9 12 L11 14 L15 9.5" />
    </svg>
  );
}
function Step() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="7" />
      <path d="M9.5 12 L11 13.5 L14.5 10" />
    </svg>
  );
}
function Desk() {
  return (
    <svg className="h-4 w-4 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 4 L20 8 L9 19 L5 19 L5 15 Z" />
      <path d="M13.5 6.5 L17.5 10.5" />
    </svg>
  );
}
