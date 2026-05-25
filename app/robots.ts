import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://cloaqgroup-q4dt0c8no-ddaniely0606-ais-projects.vercel.app/sitemap.xml",
  };
}
