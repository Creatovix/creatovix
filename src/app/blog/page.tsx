import { sanityClient } from "@/sanity/lib/client";
import { getAllPostsQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Web Design & Development Blog | Creatovix",
  description: "Expert insights on web design, Shopify development, conversion optimization, and growing your business online.",
  keywords: ["web design blog", "Shopify tips", "conversion optimization", "small business marketing"],
  
  // 🔹 Canonical URL
  alternates: { 
    canonical: "https://www.creatovix.com/blog" 
  },

  // 🔹 Open Graph
  openGraph: {
    title: "Web Design & Development Blog | Creatovix",
    description: "Expert insights on web design, Shopify development, conversion optimization, and growing your business online.",
    url: "https://www.creatovix.com/blog",
    type: "website",
    siteName: "Creatovix",
    locale: "en_US",
    images: [
      {
        url: "https://www.creatovix.com/blog-og.webp",
        width: 1200,
        height: 630,
        alt: "Creatovix Blog — Web Design & Development Insights",
        type: "image/webp",
      },
    ],
  },

  // 🔹 Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Web Design & Development Blog | Creatovix",
    description: "Expert insights on web design, Shopify development, conversion optimization, and growing your business online.",
    site: "@creatovix",
    creator: "@creatovix",
    images: ["https://www.creatovix.com/blog-og.webp"],
  },
};

export default async function BlogPage() {
  const posts = await sanityClient.fetch(getAllPostsQuery);
  
  console.log("BLOG POSTS FETCHED:", posts?.length, JSON.stringify(posts?.[0], null, 2));
  
  return <BlogClient posts={posts ?? []} />;
}