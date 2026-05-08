// src/app/blog/page.tsx
import { sanityClient } from "@/sanity/lib/client";
import { getAllPostsQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Web Design & Development Blog | Creatovix",
  description: "Expert insights on web design, Shopify development, conversion optimization, and growing your business online.",
  keywords: ["web design blog", "Shopify tips", "conversion optimization", "small business marketing"],
  alternates: { canonical: "https://www.creatovix.com/blog" },
};

export default async function BlogPage() {
  const posts = await sanityClient.fetch(getAllPostsQuery);
  
  console.log("BLOG POSTS FETCHED:", posts?.length, JSON.stringify(posts?.[0], null, 2));
  
  return <BlogClient posts={posts ?? []} />;
}