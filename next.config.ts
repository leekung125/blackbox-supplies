import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This site is a self-contained, deployable affiliate catalog.
  // It must never reach outside its own folder.
  reactStrictMode: true,
  // No external image domains — all product imagery is code/CSS placeholders
  // (we hold no licensed product photography).
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
