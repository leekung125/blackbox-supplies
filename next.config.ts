import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This site is a self-contained, deployable affiliate catalog.
  // It must never reach outside its own folder.
  reactStrictMode: true,
  // No external image domains — all product imagery is code/CSS placeholders
  // (we hold no licensed product photography).
  images: {
    remotePatterns: [],
    // Serve AVIF (then WebP) — big payload cut for the product imagery when routed through next/image.
    formats: ["image/avif", "image/webp"],
  },
  // NOTE: product image filenames are stable (overwritten in place), so we deliberately do NOT
  // send an `immutable` Cache-Control on /products — that would freeze stale images on clients.
  // Vercel's default (max-age=0, must-revalidate + ETag) re-fetches only when the bytes change.

  // Four legacy article guides were consolidated into the canonical interactive comparison guides.
  // Permanently redirect the old slugs so existing links, bookmarks, and SEO equity don't 404.
  async redirects() {
    return [
      { source: "/guides/best-portable-jump-starters", destination: "/guides/best-jump-starters-compared", permanent: true },
      { source: "/guides/best-cordless-tire-inflators", destination: "/guides/best-tire-inflators-compared", permanent: true },
      { source: "/guides/best-dash-cams", destination: "/guides/best-dash-cams-compared", permanent: true },
      { source: "/guides/best-portable-power-for-road-trips", destination: "/guides/best-power-stations-compared", permanent: true },

      // Vanity destination slugs used by the social funnel (slideshow captions, deck CTA slides,
      // "Full list → blackboxsupplies.com/<vertical>"). They are branded short-links, NOT real
      // routes — without these they 404 every top-of-funnel click. Map each to the best-matching
      // real page by intent. permanent:false — these are aliases and their target may change.
      { source: "/car", destination: "/category/car-utility", permanent: false },
      { source: "/cooling", destination: "/heat", permanent: false },
      { source: "/desk", destination: "/category/desk-tech", permanent: false },
      { source: "/kitchen", destination: "/category/kitchen", permanent: false },
      { source: "/coffee", destination: "/category/kitchen", permanent: false },
      { source: "/travel", destination: "/category/travel-edc", permanent: false },
      { source: "/sleep", destination: "/category/sleep-comfort", permanent: false },
      { source: "/power", destination: "/kits/backup-power-kit", permanent: false },
      { source: "/roadside", destination: "/kits/roadside-kit", permanent: false },
      { source: "/apartment", destination: "/useful", permanent: false },

      // Legacy category slug emitted by an older carousel build ("Power & Charging" → the real
      // category slug is "power", not "power-charging"). Keep any already-published links alive.
      { source: "/category/power-charging", destination: "/category/power", permanent: false },
    ];
  },
};

export default nextConfig;
