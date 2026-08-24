import type { NextConfig } from "next";

// Content-Security-Policy — explicit allowlist per directive.
// frame-src must include google.com for the GMB Maps embed on /contact.
// script-src/style-src include 'unsafe-inline' because Next.js injects inline
// scripts and Tailwind produces inline styles at runtime.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "frame-src https://www.google.com",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

// Security & SEO response headers applied to all routes
const securityHeaders = [
  // Prevent DNS prefetch leaking referrer data while keeping performance
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Block clickjacking — protects EEAT signals
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Prevent MIME-type sniffing attacks
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control referrer data sent to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict unnecessary browser features
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
  // HSTS — force HTTPS (set after SSL confirmed live)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  // Compress responses
  compress: true,

  // Image optimisation domains
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // TODO: add CDN or image host domain here when live
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Cache static assets aggressively
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache public images
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },

  // Canonical trailing-slash policy — no trailing slash (matches canonical tags)
  trailingSlash: false,

  // Power-user: redirect www → non-www handled at CDN/Vercel level, not here
};

export default nextConfig;
