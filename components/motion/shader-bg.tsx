/**
 * Ambient aurora — pure CSS, GPU-cheap. The blur is computed once on two static gradient
 * blobs; only `transform` is animated (composited on the GPU), so it never repaints and adds
 * no scroll cost. Renders for ALL users (no WebGL); pauses under prefers-reduced-motion.
 * Restraint rule: it must never compete with the hero object — dark + cold + subtle.
 */
export function ShaderBackground({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="bbx-aurora" />
    </div>
  );
}
