import Link from "next/link";
import { SYSTEMS_DISCLOSURE } from "@/lib/systems";

/**
 * The "Made by us, sold by us" disclosure block — the trust-separation mechanic (IA §5.3):
 * Systems are verbally distinct from affiliate picks everywhere they appear. Rendered on /systems
 * and every /systems/[slug] page. DISTINCT styling from the affiliate disclosure (this is the
 * we-earn-the-full-price frame, not the we-earn-a-commission one). Links to /disclosure.
 */
export function SystemsDisclosure({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`relative overflow-hidden rounded-2xl border border-accent/30 bg-accent-tint p-5 sm:p-6 ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <svg className="h-4 w-4 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 3 L20 6 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V6 Z" />
          <path d="M9 12 l2 2 l4 -4" />
        </svg>
        <span className="mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-accent-strong">
          Made by us, sold by us
        </span>
      </div>
      <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-2">{SYSTEMS_DISCLOSURE}</p>
      <p className="mt-3 text-sm">
        <Link href="/disclosure" className="ulink font-medium text-accent">
          How we make money →
        </Link>
      </p>
    </aside>
  );
}
