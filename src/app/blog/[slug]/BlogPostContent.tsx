// src/app/blog/[slug]/BlogPostContent.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SanityContent } from "@/lib/sanity-portabletext";
import StructuredData from "@/components/StructuredData";

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
const monoFont = { fontFamily: "'DM Mono','Courier New',monospace" };

interface BlogPostContentProps {
  post: any;
  relatedPosts: any[];
}

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const totalHeight = el.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min((window.scrollY / totalHeight) * 100, 100));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main ref={ref} className="relative min-h-screen overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24" style={{ ...monoFont, background: "linear-gradient(165deg,#050310 0%,#0a0818 45%,#050310 100%)" }}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#ff4d00] to-[#a855f7] z-50 transition-all duration-100" style={{ width: `${scrollProgress}%` }} />

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(255,77,0,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.02) 1px,transparent 1px)", backgroundSize: "64px 64px", animation: "gridDrift 28s linear infinite" }} />
      
      <div className="max-w-[900px] mx-auto px-4 md:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-[11px] tracking-[0.25em] uppercase">
          <Link href="/" className="text-[#5e6e84] hover:text-[#ff4d00] transition-colors">Home</Link>
          <span className="text-[#3a4a5e]">/</span>
          <Link href="/blog" className="text-[#5e6e84] hover:text-[#ff4d00] transition-colors">Blog</Link>
          <span className="text-[#3a4a5e]">/</span>
          <span className="text-[#ff4d00]">{post.category}</span>
        </nav>

        {/* Post Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block w-8 h-px bg-[#ff4d00]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#5e6e84]" style={monoFont}>
              {formatDate(post.publishedAt)} · {post.readingTime} min read
            </span>
          </div>
          <h1 className="text-white leading-none mb-6" style={{ ...bebasFont, fontSize: "clamp(36px,5.5vw,56px)", letterSpacing: "0.02em" }}>
            {post.title}
          </h1>
          <p className="text-[#a8b4cc] text-[16px] leading-[1.8] border-l-2 border-[#ff4d00]/50 pl-4" style={monoFont}>
            {post.excerpt}
          </p>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 mb-12">
            <img src={post.coverImage.url} alt={post.coverImage.alt || post.title} className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050310]/60 to-transparent" />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-invert max-w-none mb-16">
          <SanityContent content={post.content} />
        </article>

        {/* Tags & Share */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 px-5 rounded-xl border border-white/10 bg-white/[0.03] mb-12">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase bg-[#ff4d00]/20 text-[#ff4d00] border border-[#ff4d00]/30" style={monoFont}>
            {post.category}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[#5e6e84] text-[12px]">Share:</span>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL || "https://creatovix.com"}/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="text-[#5e6e84] hover:text-[#1DA1F2] transition-colors">𝕏</a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL || "https://creatovix.com"}/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="text-[#5e6e84] hover:text-[#0A66C2] transition-colors">in</a>
          </div>
        </div>

        {/* Structured Data */}
        <StructuredData pageType="blog" articleData={{
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          image: post.coverImage?.url || "",
          author: "Creatovix Team"
        }} />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-10 border-t border-white/10">
            <h3 className="text-white mb-6" style={{ ...bebasFont, fontSize: "clamp(24px,3vw,28px)" }}>Read Next</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((p) => (
                <Link key={p._id} href={`/blog/${p.slug}`} className="group p-4 rounded-xl border bg-white/[0.04] hover:bg-white/[0.07] transition-all">
                  <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-3 border border-white/10">
                    <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                  </div>
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#5e6e84]" style={monoFont}>{p.category}</span>
                  <h4 className="text-white text-[15px] font-medium mt-1 group-hover:text-[#ff4d00] transition-colors line-clamp-2">{p.title}</h4>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 p-6 rounded-2xl border border-[#ff4d00]/30 bg-gradient-to-r from-[#ff4d00]/10 to-transparent">
          <h3 className="text-white mb-2" style={{ ...bebasFont, fontSize: "24px" }}>Ready to implement these strategies?</h3>
          <p className="text-[#a8b4cc] text-[14px] mb-4" style={monoFont}>Let's discuss how we can apply these insights directly to your business.</p>
          <a href="/#contact" className="inline-flex items-center gap-2 py-3 px-6 text-white text-[12px] tracking-[0.24em] uppercase no-underline transition-all hover:-translate-y-0.5 active:scale-95" style={{ background: "linear-gradient(135deg,#ff4d00,#ff4d00d9)", clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))", boxShadow: "0 8px 28px rgba(255,77,0,0.44)" }}>
            Book a Free Strategy Call <span>→</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes gridDrift { 100% { background-position: 64px 64px; } }
        html { scroll-behavior: smooth; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </main>
  );
}