/**
 * BLACKBOX SUPPLY — identity (warm-dark editorial).
 * A refined "supply box" mark: a rounded box holding a warm amber slot of light —
 * the useful thing inside the black box. Wordmark: BlackBox (bold) + Supplies (dim).
 * The whole site is dark, so the `light` variant is the one in use almost everywhere.
 */

const INK_DARK = "#211e18";
const INK_LIGHT = "#ece4d2";
const AMBER = "#d99a45";

export function BrandMark({
  className = "h-8 w-8",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const ink = light ? INK_LIGHT : INK_DARK;
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="6.5" y="8" width="27" height="24" rx="6.5" stroke={ink} strokeWidth="2.6" />
      <rect x="13.5" y="18.4" width="13" height="3.2" rx="1.6" fill={AMBER} />
    </svg>
  );
}

/** Horizontal lockup: mark + BlackBoxSupplies. */
export function Wordmark({
  className = "",
  markClassName = "h-7 w-7",
  size = "text-[1.05rem]",
  showMark = true,
  light = false,
}: {
  className?: string;
  markClassName?: string;
  size?: string;
  showMark?: boolean;
  light?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {showMark ? <BrandMark className={markClassName} light={light} /> : null}
      <span className={`${size} font-sans leading-none tracking-[-0.01em] ${light ? "text-[#ece4d2]" : "text-ink"}`}>
        <span className="font-bold">BlackBox</span>
        <span className={`font-normal ${light ? "text-[#b2a78e]" : "text-ink-faint"}`}>Supplies</span>
      </span>
    </span>
  );
}

/** Stacked lockup: mark over the wordmark (used on the link-in-bio). */
export function WordmarkStacked({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex flex-col items-center gap-3.5 ${className}`}>
      <BrandMark className="h-12 w-12" light={light} />
      <span className={`font-sans text-xl leading-none tracking-[-0.01em] ${light ? "text-[#ece4d2]" : "text-ink"}`}>
        <span className="font-bold">BlackBox</span>
        <span className={`font-normal ${light ? "text-[#b2a78e]" : "text-ink-faint"}`}>Supplies</span>
      </span>
    </span>
  );
}
