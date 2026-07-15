"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Fires `system_view` once on mount for a Systems landing page (the L3 owned-product surface).
 * A pure side-effect island — renders nothing — so the landing page stays a server component
 * (metadata + JSON-LD) while still instrumenting the view in the existing taxonomy.
 */
export function TrackSystemView({ slug, slot = "landing" }: { slug: string; slot?: string }) {
  useEffect(() => {
    track("system_view", { product: slug, path: `/systems/${slug}`, slot, tier: "landing" });
  }, [slug, slot]);
  return null;
}
