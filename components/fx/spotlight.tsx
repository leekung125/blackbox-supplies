"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

/** A warm radial glow that follows the cursor across a card. Adds depth + life on hover. */
export function Spotlight({ children, className = "", size = 220 }: { children: ReactNode; className?: string; size?: number }) {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const posRef = useRef({ x: -400, y: -400 });
  const [on, setOn] = useState(false); // enter/leave fire rarely — cheap to keep in React state

  // Pointer moves fire 100+/s. Instead of a setState per event (a re-render storm on hover),
  // rAF-throttle and write the position straight to CSS custom properties on the glow layer —
  // the browser only paints once per frame, and React never re-renders on move.
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    posRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const g = glowRef.current;
        if (g) {
          g.style.setProperty("--sx", `${posRef.current.x}px`);
          g.style.setProperty("--sy", `${posRef.current.y}px`);
        }
      });
    }
  };

  return (
    <div
      onPointerMove={onMove}
      onPointerEnter={() => setOn(true)}
      onPointerLeave={() => setOn(false)}
      className={`relative ${className}`}
    >
      <div
        ref={glowRef}
        className="spotlight-glow pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
        style={{ opacity: on ? 1 : 0, ["--sspot" as string]: `${size}px` }}
      />
      {children}
    </div>
  );
}
