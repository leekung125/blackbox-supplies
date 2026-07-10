"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Cinematic hero-image wrapper. Renders the (server-built) product visual passed as `children`
 * and, when a real photo exists, makes it tap-to-enlarge in a focused lightbox — the closest a
 * buyer gets to holding it. Keeps the page a Server Component: this is the only interactive bit.
 * Reduced-motion safe (no scale/spring when the user opts out); Esc + backdrop close; body scroll
 * locked while open. When there is no photo (spec-tile fallback) it renders inert, no zoom UI.
 */
export function ImageZoom({
  image,
  name,
  children,
  className = "",
}: {
  image?: string;
  name: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const zoomable = !!image;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!zoomable) return <div className={className}>{children}</div>;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge photo of ${name}`}
        className={`group/zoom relative block w-full cursor-zoom-in ${className}`}
      >
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line-strong bg-dark/70 text-ink backdrop-blur-sm transition-colors group-hover/zoom:border-accent group-hover/zoom:text-accent-bright"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M11 8 V14 M8 11 H14 M20 20 L16.5 16.5" />
          </svg>
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-5 sm:p-10"
            style={{ background: "rgba(8,5,3,0.9)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
            role="dialog"
            aria-modal="true"
            aria-label={`${name} — enlarged photo`}
          >
            <motion.img
              src={image}
              alt={name}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: reduce ? 0.12 : 0.34, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
              style={{ cursor: "zoom-out" }}
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close enlarged photo"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-dark/70 text-ink transition-colors hover:border-accent hover:text-accent-bright"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 6 L18 18 M18 6 L6 18" />
              </svg>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
