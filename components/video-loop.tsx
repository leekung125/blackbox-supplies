"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Performant editorial video loop.
 * - poster paints instantly (aspect-ratio reserved → zero layout shift)
 * - the <video> only loads when within 200px of the viewport (lazy)
 * - muted + loop + playsInline + autoplay (no audio, mobile-safe)
 * - prefers-reduced-motion → poster only, never loads the video
 * Always pass a poster (the keyframe JPG) so there's a premium frame before/without motion.
 */
export function VideoLoop({
  src,
  webm,
  poster,
  className = "",
  videoClassName = "",
  aspect = "16 / 9",
  objectPosition = "center",
  priority = false,
  fill = false,
}: {
  src: string;
  webm?: string;
  poster: string;
  className?: string;
  videoClassName?: string;
  aspect?: string;
  objectPosition?: string;
  priority?: boolean;
  /** Fill the parent (absolute inset-0) instead of imposing an aspect-ratio box — for hero backgrounds. */
  fill?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [reduce, setReduce] = useState(true); // assume reduced until we confirm motion is OK

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduce) return;
    if (priority) { setLoad(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, priority]);

  return (
    <div
      ref={ref}
      className={`${fill ? "absolute inset-0 h-full w-full" : "relative"} overflow-hidden ${className}`}
      style={fill ? undefined : { aspectRatio: aspect }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
      {load && !reduce ? (
        <video
          className={`absolute inset-0 h-full w-full object-cover ${videoClassName}`}
          style={{ objectPosition }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
        >
          {webm ? <source src={webm} type="video/webm" /> : null}
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
