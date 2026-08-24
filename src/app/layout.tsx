import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { buildAutoDealerSchema, buildWebSiteSchema } from "@/lib/schema";
import { businessInfo } from "@/lib/data";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(businessInfo.url),
  verification: {
    google: "ewNQnEtPtc0hQR4XfCwSwX5AWufPPgvJozYsPjPl05c",
  },
  title: {
    default: "Harvest Cars | Trusted Used Car Dealer | 5.0★ Google Rating",
    template: "%s | Harvest Cars",
  },
  description:
    "Harvest Cars is a 5.0-star rated used car dealership offering transparent, no-pressure sales. Full service histories, test drives welcome, fair pricing, and same-day delivery available. Browse our latest stock.",
  keywords: [
    "used cars",
    "second hand cars",
    "used car dealer",
    "Harvest Cars",
    "buy used car",
    "car dealer",
    "used Audi",
    "used VW",
    "used BMW",
    "nearly new cars",
    "5 star car dealer",
  ],
  // og:locale signals UK English to Google and Facebook
  openGraph: {
    type: "website",
    siteName: "Harvest Cars",
    locale: "en_GB",
    title: "Harvest Cars | Trusted Used Car Dealer | 5.0★ Google Rating",
    description:
      "Browse quality used cars from Harvest Cars — a 5-star rated dealership known for transparency, fair pricing, and hassle-free buying.",
    url: businessInfo.url,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Harvest Cars — Trusted Used Car Dealership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harvest Cars | Trusted Used Car Dealer",
    description:
      "5.0-star rated used car dealer. Transparent, no-pressure sales with full service histories. Browse our latest stock.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Hreflang via alternates — UK English with x-default self-reference
  alternates: {
    canonical: businessInfo.url,
    languages: {
      "en-GB": businessInfo.url,
      "x-default": businessInfo.url,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/android-chrome-512x512.png" },
    ],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#D4AF37",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const dealerSchema = buildAutoDealerSchema();
  const websiteSchema = buildWebSiteSchema();

  return (
    <html
      lang="en-GB"
      className={`${geist.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <head>
        {/* Preconnect hints for Google Fonts — reduces font TTFB */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Hreflang — explicit because Next.js 16 deduplicates when lang URL equals canonical */}
        <link rel="alternate" hrefLang="en-GB" href={businessInfo.url} />
        <link rel="alternate" hrefLang="x-default" href={businessInfo.url} />

        {/* AutoDealer JSON-LD — primary entity, server-rendered for all crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerSchema) }}
        />
        {/* WebSite JSON-LD — enables Sitelinks Searchbox + entity disambiguation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        {/* Skip navigation — WCAG 2.1 AA + Google accessibility quality signal */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0A0A0B] focus:bg-gold focus:rounded-md focus:outline-none"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* Sticky mobile CTA bar — local-service conversion pattern */}
        <MobileCTABar />
        {/* Floating WhatsApp button — desktop only (MobileCTABar handles mobile) */}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
