// src/lib/sanity/fetch-related-posts.ts
import { sanityClient } from "@/sanity/lib/client";
import { getRelatedPostsQuery, getAllPostsQuery } from "@/sanity/lib/queries";

// src/lib/sanity/fetch-related-posts.ts
const SERVICE_TO_CATEGORY: Record<string, string> = {
  "web-design": "Web Design",
  "web-development": "Development",  // ✅ ADD THIS
  "shopify-development": "Shopify",
  "custom-development": "Development",
  "digital-marketing": "Marketing",
  "brand-identity": "Business",
  "graphic-design": "Business",
};

export interface RelatedBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: { src: string; alt: string; width: number; height: number };
  tags: string[];
  author: string;
}

export async function fetchRelatedBlogPosts(serviceSlug: string): Promise<RelatedBlogPost[]> {
  const category = SERVICE_TO_CATEGORY[serviceSlug];
  
  console.log(`[fetchRelatedBlogPosts] Service: ${serviceSlug}, Mapped Category: ${category}`);

  try {
    let posts = [];

    // Try category-specific query first
    if (category) {
      posts = await sanityClient.fetch(getRelatedPostsQuery, {
        category,
        currentSlug: "",
      });
      console.log(`[fetchRelatedBlogPosts] Found ${posts?.length || 0} posts for category "${category}"`);
    }

    // Fallback: if no posts found, get any 3 recent posts
    if (!posts || posts.length === 0) {
      console.log(`[fetchRelatedBlogPosts] No posts for category "${category}", fetching fallback posts...`);
      posts = await sanityClient.fetch(getAllPostsQuery);
      console.log(`[fetchRelatedBlogPosts] Fallback: Found ${posts?.length || 0} recent posts`);
    }

    if (!posts || posts.length === 0) {
      console.log(`[fetchRelatedBlogPosts] No posts found at all`);
      return [];
    }

    return posts.map((post: any) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || "",
      date: post.publishedAt,
      image: {
        src: post.coverImage || "",
        alt: post.coverImageAlt || post.title,
        width: post.coverImageWidth || 1200,
        height: post.coverImageHeight || 630,
      },
      tags: post.category ? [post.category.toLowerCase().replace(/\s+/g, "-")] : [],
      author: post.author || "Creatovix Team",
    }));

  } catch (error) {
    console.error("[fetchRelatedBlogPosts] Error:", error);
    return [];
  }
}