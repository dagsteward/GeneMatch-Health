import type { MetadataRoute } from "next";
import { programmes, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  const staticRoutes = [
    "",
    "/about",
    "/programmes",
    "/research",
    "/community-impact",
    "/partnerships",
    "/funding",
    "/news",
    "/resources",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/accessibility",
  ];

  const programmeRoutes = programmes.map((p) => `/programmes/${p.slug}`);

  return [...staticRoutes, ...programmeRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
