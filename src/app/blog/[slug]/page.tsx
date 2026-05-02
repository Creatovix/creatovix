// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { sanityClient } from "@/sanity/lib/client";
import { getPostBySlugQuery, getRelatedPostsQuery, getAllPostsQuery } from "@/sanity/lib/queries";
import BlogPostContent from "./BlogPostContent";
import { Metadata } from "next";

export async function generateStaticParams() {
  const posts = await sanityClient.fetch(getAllPostsQuery);
  return posts.map((post: any) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityClient.fetch(getPostBySlugQuery, { slug });
  if (!post) return { title: "Post Not Found | Creatovix" };
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://creatovix.com";
  return {
    title: post.seoTitle || `${post.title} | Creatovix Blog`,
    description: post.seoDescription || post.excerpt,
    keywords: ["blog", "web design insights", "shopify tips", "small business growth"],
    alternates: { canonical: `${baseUrl}/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle || `${post.title} | Creatovix Blog`,
      description: post.seoDescription || post.excerpt,
      type: "article",
      url: `${baseUrl}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      images: post.coverImage ? [{ url: post.coverImage.url, width: post.coverImage.width, height: post.coverImage.height, alt: post.coverImage.alt || post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || `${post.title} | Creatovix Blog`,
      description: post.seoDescription || post.excerpt,
      images: post.coverImage ? [post.coverImage.url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await sanityClient.fetch(getPostBySlugQuery, { slug });
  if (!post) notFound();

  const relatedPosts = await sanityClient.fetch(getRelatedPostsQuery, { category: post.category, currentSlug: slug });

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}