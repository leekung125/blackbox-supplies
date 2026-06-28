"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

/** Pointer-parallax 3D tilt toward the cursor + a slight lift. Mouse-only (off on touch). */
export function Tilt({
  children,
  className,
  max = 7,
  scale = 1.025,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const reduce = useReducedMotion();
  const [hoverable, setHoverable] = useState(false);
  useEffect(() => {
    setHoverable(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 15 });

  if (reduce || !hoverable) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      whileHover={{ scale }}
      transition={{ scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
    >
      {children}
    </motion.div>
  );
}
