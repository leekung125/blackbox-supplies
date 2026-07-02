"use client";

import { useRef, useState, type ReactNode } from "react";

/** A warm radial glow that follows the cursor across a card. Adds depth + life on hover. */
export function Spotlight({ children, className = "", size = 220 }: { children: ReactNode; className?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [on, setOn] = useState(false);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onPointerEnter={() => setOn(true)}
      onPointerLeave={() => setOn(false)}
      className={`relative ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: on ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, rgba(224,163,82,0.16), transparent 68%)`,
        }}
      />
      {children}
    </div>
  );
}
