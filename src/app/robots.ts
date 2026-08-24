import type { MetadataRoute } from "next";
import { businessInfo } from "@/lib/data";

// Deliberately allow all major crawlers including AI/Answer Engine bots
// (GPTBot, PerplexityBot, ClaudeBot, Google-Extended) for GEO visibility
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicitly allow AI crawlers for Answer Engine / Generative Engine Optimisation
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
    ],
    sitemap: `${businessInfo.url}/sitemap.xml`,
  };
}
