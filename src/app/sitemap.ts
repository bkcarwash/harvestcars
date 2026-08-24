import type { MetadataRoute } from "next";
import { vehicles, businessInfo } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = businessInfo.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/inventory`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/financing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const vehicleRoutes: MetadataRoute.Sitemap = vehicles.map((v) => ({
    url: `${base}/inventory/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: v.images
      .filter((img) => !img.endsWith(".svg"))
      .map((img) => `${base}${img}`),
  }));

  return [...staticRoutes, ...vehicleRoutes];
}
