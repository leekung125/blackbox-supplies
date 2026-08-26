import { getOwnerEvidence } from "@/lib/owner-evidence";
import { withAffiliateTag } from "@/lib/affiliate-tag";

/** "https://www.rtings.com/…" → "rtings.com" for a tidy chip label. */
function hostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * "What owners actually report" — the Owner Evidence Engine surface. Renders the aggregated,
 * honestly-sourced owner evidence for a product (real-world numbers, real failure modes, longevity)
 * as a premium native panel that matches the guide's trust shell. Returns null when we have no
 * evidence entry for the id, so it degrades gracefully. See lib/owner-evidence.ts for the honesty rules.
 */
export function OwnerEvidence({ id, updated, className = "" }: { id: string; updated?: string; className?: string }) {
  const e = getOwnerEvidence(id);
  if (!e) return null;
  return (
    <section className={`rounded-2xl border border-line bg-surface p-5 sm:p-6 ${className}`}>
      <div className="flex items-center gap-2">
        <Chat />
        <h2 className="mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-accent-strong">
          What owners actually report
        </h2>
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-ink-2">
        Aggregated from real verified-buyer reviews and long-term owner reports — <strong className="font-semibold text-ink">not our own hands-on test</strong>. Basis: {e.reviewsBasis}.
      </p>

      {e.realWorldNumbers.length ? (
        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3.5 sm:grid-cols-3">
          {e.realWorldNumbers.map((n) => (
            <div key={n.label}>
              <div className="font-display text-[1.05rem] font-semibold leading-tight text-ink">{n.value}</div>
              <div className="mono mt-0.5 text-[0.62rem] uppercase tracking-[0.1em] text-ink-dim">{n.label}</div>
            </div>
          ))}
        </div>
      ) : null}

      {e.failureModes.length ? (
        <div className="mt-4 border-t border-line-soft pt-3.5">
          <span className="mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-dim">
            What breaks, and when
          </span>
          <ul className="mt-2 space-y-2">
            {e.failureModes.map((f) => (
              <li key={f.mode} className="flex gap-2.5 text-[0.85rem] leading-relaxed text-ink-2">
                <Dot />
                <span>
                  <strong className="font-semibold text-ink">{f.mode}.</strong> {f.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {e.longevity ? (
        <div className="mt-4 border-t border-line-soft pt-3.5">
          <span className="mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-dim">Longevity</span>
          <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-2">{e.longevity}</p>
        </div>
      ) : null}

      {e.praise.length ? (
        <div className="mt-4 border-t border-line-soft pt-3.5">
          <span className="mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-dim">What owners praise</span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {e.praise.map((p) => (
              <span key={p} className="rounded-full border border-line-strong bg-surface-2 px-2.5 py-1 text-[0.78rem] text-ink-2">
                {p}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line-soft pt-3.5 text-xs text-ink-dim">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>Owner evidence, cited:</span>
          {e.sources.slice(0, 4).map((s) => (
            <a key={s} href={withAffiliateTag(s)} target="_blank" rel="nofollow noopener noreferrer" className="ulink text-ink-2">
              {hostLabel(s)}
            </a>
          ))}
        </span>
        {updated ? <span className="mono">Last reviewed {updated}</span> : null}
      </div>
    </section>
  );
}

function Chat() {
  return (
    <svg className="h-4 w-4 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12Z" />
      <path d="M8.5 11.5h7M8.5 14h4.5" />
    </svg>
  );
}
function Dot() {
  return (
    <svg className="mt-1.5 h-2 w-2 shrink-0 text-accent-strong" viewBox="0 0 8 8" fill="currentColor" aria-hidden>
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}
