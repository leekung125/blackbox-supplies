import type { Metadata, Viewport } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Atmosphere } from "@/components/atmosphere";
import { BRAND } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, webSiteSchema } from "@/lib/schema";

// Editorial serif voice — headlines, guide titles, the "real publication" signal.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});
// Workhorse sans — body copy, UI.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// Mono — eyebrows, labels, specs, prices (the "precision" voice).
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-geist",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blackboxsupplies.com"),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.positioning,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name }],
  keywords: [
    "best portable jump starters",
    "best cordless tire inflators",
    "best dash cams",
    "portable power stations",
    "roadside emergency kit",
    "car gear",
    "backup power",
    "car accessories buying guide",
  ],
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.shortPositioning,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.shortPositioning,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1a1712",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        <Atmosphere />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
