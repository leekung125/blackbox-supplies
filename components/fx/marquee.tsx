/** Infinite horizontal marquee (CSS-driven). Duplicates the row so the loop is seamless. */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${className}`} aria-hidden>
      <div className="marquee-track">
        {row.map((it, i) => (
          <span key={i} className="marquee-item">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
