/**
 * Decorative corner ticks — the small L-shaped marks that frame a panel.
 * Part of the subtle "incident-record" restraint. Purely decorative.
 * Place inside a `relative` parent.
 */
export function CornerTicks({
  className = "border-accent/40",
  size = "h-2.5 w-2.5",
}: {
  className?: string;
  size?: string;
}) {
  const base = `pointer-events-none absolute ${size} ${className}`;
  return (
    <>
      <span className={`${base} left-0 top-0 border-l border-t`} aria-hidden />
      <span className={`${base} right-0 top-0 border-r border-t`} aria-hidden />
      <span
        className={`${base} bottom-0 left-0 border-b border-l`}
        aria-hidden
      />
      <span
        className={`${base} bottom-0 right-0 border-b border-r`}
        aria-hidden
      />
    </>
  );
}
