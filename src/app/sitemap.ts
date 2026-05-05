// app/sitemap.ts
import { MetadataRoute } from "next";
import { sanityClient } from "@/sanity/lib/client";
import { SERVICES } from "@/lib/services"; // ✅ import services

const baseUrl = "https://www.creatovix.com";

async function getBlogSlugs(): Promise<string[]> {
  return sanityClient.fetch<string[]>(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getBlogSlugs();

  // ✅ Blog pages
  const blogPosts: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // ✅ Service (sub-service) pages
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9, // higher because money pages 💰
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ✅ add services here
    ...servicePages,

    // ✅ blogs
    ...blogPosts,
  ];
}