// src/app/blog/page.tsx
import Link from "next/link";
import {sanityClient} from "@/sanity/lib/client";
import { getAllPostsQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design & Development Blog | Creatovix",
  description: "Expert insights on web design, Shopify development, conversion optimization, and growing your business online.",
  keywords: ["web design blog", "Shopify tips", "conversion optimization", "small business marketing"],
};

export default async function BlogPage() {
  const posts = await sanityClient.fetch(getAllPostsQuery);

  return (
    <main className="min-h-screen pt-[20vh] pb-16 bg-[#050310]" style={{ fontFamily: "'DM Mono','Courier New',monospace" }}>
      <div className="max-w-[1600px] mx-auto px-4 xl:px-10">
        <h1 className="text-white mb-4" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: "clamp(36px,5vw,52px)" }}>
          Insights & Resources
        </h1>
        <p className="text-[#a8b4cc] mb-12 text-lg">
          Practical advice on web design, development, and growing your business online. No fluff—just actionable strategies.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post: any) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="block p-5 rounded-xl border border-white/10 hover:border-[#ff4d00]/50 transition-all group bg-white/[0.03]">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#ff4d00]">{post.category}</span>
                <span className="text-[10px] text-[#5e6e84]">•</span>
                <span className="text-[10px] text-[#5e6e84]">{new Date(post.publishedAt).toLocaleDateString("en-GB")}</span>
                <span className="text-[10px] text-[#5e6e84]">•</span>
                <span className="text-[10px] text-[#5e6e84]">{post.readingTime} min</span>
              </div>
              <h2 className="text-white text-xl font-medium group-hover:text-[#ff4d00] transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-[#9eb0c8] line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}