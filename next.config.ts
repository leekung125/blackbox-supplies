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
};

export default nextConfig;
