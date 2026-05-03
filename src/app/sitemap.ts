// app/sitemap.ts
import { MetadataRoute } from "next";
import { sanityClient } from "@/sanity/lib/client"; // adjust path if needed

const baseUrl = "https://www.creatovix.com";

async function getBlogSlugs(): Promise<string[]> {
  return sanityClient.fetch<string[]>(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getBlogSlugs();

  const blogPosts: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
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
    ...blogPosts,
  ];
}