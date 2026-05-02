// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"], // Block sensitive routes if added later
    },
    sitemap: "https://www.creatovix.com/sitemap.xml",
    host: "https://www.creatovix.com",
  };
}