/**
 * BLACKBOX SUPPLIES — identity system (SVG, scalable).
 * Mark: a minimal rounded "black box" with a top lid-slot (the subtle opening) and a single
 * surgical cold-blue access dash. Wordmark: BlackBox (bold) + Supplies (regular).
 * No mirrored-B, no cube, no crate, no glow. Off-white + a tiny blue accent only.
 */

const INK = "#e6e9f0";
const ACCENT = "#5b93b8";

/** The box mark on its own. `mono` renders box+slot+dash all in currentColor. */
export function BrandMark({
  className = "h-8 w-8",
  mono = false,
}: {
  className?: string;
  mono?: boolean;
}) {
  const stroke = mono ? "currentColor" : INK;
  const dash = mono ? "currentColor" : ACCENT;
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="7" y="7" width="26" height="26" rx="7.5" stroke={stroke} strokeWidth="2.5" />
      <line x1="15.5" y1="14" x2="24.5" y2="14" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14.5" y1="20.5" x2="25.5" y2="20.5" stroke={dash} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** Horizontal lockup: mark + BlackBoxSupplies. */
export function Wordmark({
  className = "",
  markClassName = "h-7 w-7",
  size = "text-[1.05rem]",
  showMark = true,
}: {
  className?: string;
  markClassName?: string;
  size?: string;
  showMark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {showMark ? <BrandMark className={markClassName} /> : null}
      <span className={`${size} leading-none tracking-tight text-ink`}>
        <span className="font-bold">BlackBox</span>
        <span className="font-normal text-ink-dim">Supplies</span>
      </span>
    </span>
  );
}

/** Stacked lockup: mark over the wordmark (used on the link-in-bio). */
export function WordmarkStacked({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center gap-4 ${className}`}>
      <BrandMark className="h-12 w-12" />
      <span className="text-xl leading-none tracking-tight text-ink">
        <span className="font-bold">BlackBox</span>
        <span className="font-normal text-ink-dim">Supplies</span>
      </span>
    </span>
  );
}
