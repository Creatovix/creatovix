// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.creatovix.com";
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly", // Update if you add blog/projects later
      priority: 1,
    },
  ];
}