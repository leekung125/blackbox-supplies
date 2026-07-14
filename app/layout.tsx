import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { OutboundTracker } from "@/components/outbound-tracker";
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
  metadataBase: new URL("https://www.blackboxsupplies.com"),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.positioning,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name }],
  // No global canonical — it was inherited by EVERY page, so guides/products/kits all
  // declared the homepage as their canonical (a self-canonicalization SEO leak). Each page
  // now sets its own canonical; the home page's lives in app/(site)/page.tsx.
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
  // Amazon OneLink scaffold — localizes affiliate clicks for non-US visitors so an
  // international shopper lands on their own Amazon storefront (with the matching
  // regional Associates tag) instead of amazon.com + the US-only blackboxsuppl-20 tag.
  // INACTIVE until the operator pastes their OneLink ID here: create OneLink in Amazon
  // Associates Central (Tools → OneLink), link all regional accounts, then copy the ID
  // from the generated snippet's script URL (…/onelink/<THIS_ID>/ or ?pubId=<THIS_ID>)
  // into NEXT_PUBLIC_AMAZON_ONELINK_ID in the environment. If unset, nothing renders —
  // US behavior is unchanged and no broken/erroring script is emitted.
  const oneLinkId = process.env.NEXT_PUBLIC_AMAZON_ONELINK_ID;

  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">
        {oneLinkId ? (
          <Script
            id="amzn-onelink"
            strategy="afterInteractive"
            src={`https://z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=${oneLinkId}`}
          />
        ) : null}
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        <Atmosphere />
        <div className="grain-fixed" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
        <OutboundTracker />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
