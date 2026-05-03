// src/app/blog/[slug]/BlogPostContent.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SanityContent } from "@/lib/sanity-portabletext";
import StructuredData from "@/components/StructuredData";

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
// Updated to Inter font
const sansFont = { fontFamily: "'Inter', sans-serif" };

const CATEGORY_COLORS: Record<string, string> = {
  "Web Design": "#ff4d00",
  "Shopify": "#f59e0b",
  "Development": "#a855f7",
  "Marketing": "#10d4a0",
  "Full Stack": "#00c8ff",
  "Graphic Design": "#00c8ff",
};

function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? "#ff4d00";
}

interface BlogPostContentProps {
  post: any;
  relatedPosts: any[];
}

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const accent = getCategoryColor(post.category);

  useEffect(() => {
    const handleScroll = () => {
      const el = mainRef.current;
      if (!el) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min((window.scrollY / totalHeight) * 100, 100));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://creatovix.com";
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return (
    <main
      ref={mainRef}
      className="relative min-h-screen overflow-hidden font-sans"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "linear-gradient(165deg,#fafafa 0%,#f5f5f5 45%,#fafafa 100%)",
      }}
    >
      {/* ── Reading progress bar ── */}
      <div
        className="fixed top-0 left-0 z-50 h-[2px] transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg,${accent},${accent}90)`,
          boxShadow: `0 0 10px rgba(${accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.5)`,
        }}
      />

      {/* ── Grid texture - Light Theme ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          animation: "gridDrift 30s linear infinite",
        }}
      />

      {/* ── Ambient glows - Reduced opacity for light theme ── */}
      <div
        className="absolute pointer-events-none rounded-full blur-[160px] z-0"
        style={{
          width: 700,
          height: 700,
          top: -100,
          left: -200,
          background: `radial-gradient(circle,rgba(${accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.05),transparent 70%)`,
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[120px] z-0"
        style={{
          width: 500,
          height: 500,
          top: "60%",
          right: -100,
          background: "radial-gradient(circle,rgba(168,85,247,0.04),transparent 70%)",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-4 xl:px-10 relative z-10 pt-[18vh] pb-24">

        {/* ── Breadcrumb - Light Theme ── */}
        <nav
          className="flex items-center gap-2 mb-10 text-[11px] tracking-[0.25em] uppercase font-medium"
          style={sansFont}
        >
          <Link href="/" className="text-[#6b7280] hover:text-[#ff4d00] transition-colors no-underline">
            Home
          </Link>
          <span className="text-[#9ca3af]">/</span>
          <Link href="/blog" className="text-[#6b7280] hover:text-[#ff4d00] transition-colors no-underline">
            Blog
          </Link>
          <span className="text-[#9ca3af]">/</span>
          <span style={{ color: accent }}>{post.category}</span>
        </nav>

        {/* ── Full-width cover image - Light Theme ── */}
        {post.coverImage && (
          <div className="relative w-full rounded-2xl overflow-hidden mb-12">
            <img
              src={post.coverImage.url || post.coverImage}
              alt={post.coverImage.alt || post.title}
              className="w-full h-auto object-fill max-h-[600px]"
              loading="eager"
            />
            {/* Light theme gradient overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,transparent 40%,#fafafa 100%)" }} />

            {/* Category badge floating on image */}
            <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: `rgba(${accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.15)`, border: `1px solid ${accent}50`, backdropFilter: "blur(12px)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 8px rgba(${accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.5)` }} />
              <span className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ ...sansFont, color: accent }}>
                {post.category}
              </span>
            </div>
          </div>
        )}

        {/* ── Main layout: article + sidebar ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-10 xl:gap-16 items-start">

          {/* ── Left: Article ── */}
          <div>
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-4 mb-5">
                <span className="text-[10px] tracking-[0.28em] uppercase text-[#6b7280] font-medium" style={sansFont}>
                  {formatDate(post.publishedAt)}
                </span>
                <span className="text-[#9ca3af]">·</span>
                <span className="text-[10px] tracking-[0.28em] uppercase text-[#6b7280] font-medium" style={sansFont}>
                  {post.readingTime} min read
                </span>
              </div>

              <h1
                className="text-[#1a1a2e] m-0 mb-6 leading-none"
                style={{
                  ...bebasFont,
                  fontSize: "clamp(42px,6vw,72px)",
                  letterSpacing: "0.01em",
                  lineHeight: 0.92,
                }}
              >
                {post.title}
              </h1>

              {/* Excerpt / standfirst - Light Theme */}
              <p
                className="text-[#4a5568] leading-[1.82] text-[15.5px] font-medium"
                style={{
                  ...sansFont,
                  borderLeft: `3px solid ${accent}`,
                  paddingLeft: 18,
                }}
              >
                {post.excerpt}
              </p>

              {/* Divider - Light Theme */}
              <div
                className="flex items-center gap-4 mt-8"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", paddingBottom: 20 }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: `${accent}20`, border: `1px solid ${accent}40`, color: accent }}
                  >
                    C
                  </div>
                  <span className="text-[11px] text-[#6b7280] font-medium" style={sansFont}>
                    Creatovix Team
                  </span>
                </div>
                <span className="flex-1 h-px bg-black/[0.06]" />
                {/* Share - Light Theme */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b7280] font-medium" style={sansFont}>Share</span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-lg border flex items-center justify-center text-[12px] text-[#6b7280] hover:text-[#1a1a2e] hover:border-black/30 transition-all no-underline"
                    style={{ borderColor: "rgba(0,0,0,0.12)" }}
                  >
                    𝕏
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-lg border flex items-center justify-center text-[11px] text-[#6b7280] hover:text-[#1a1a2e] hover:border-black/30 transition-all no-underline"
                    style={{ borderColor: "rgba(0,0,0,0.12)" }}
                  >
                    in
                  </a>
                </div>
              </div>
            </header>

            {/* Article body - Light Theme Prose */}
            <article
              className="blog-prose"
              style={{ color: "#4a5568" }}
            >
              <SanityContent content={post.content} />
            </article>

            {/* Tags + bottom share - Light Theme */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-14 pt-8"
              style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#6b7280] font-medium" style={sansFont}>
                  Tagged:
                </span>
                <span
                  className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold"
                  style={{
                    ...sansFont,
                    color: accent,
                    background: `${accent}12`,
                    border: `1px solid ${accent}35`,
                  }}
                >
                  {post.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-[#6b7280] font-medium" style={sansFont}>Share this article:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6b7280] hover:text-[#1DA1F2] transition-colors no-underline text-sm"
                >
                  𝕏
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6b7280] hover:text-[#0A66C2] transition-colors no-underline text-sm"
                >
                  in
                </a>
              </div>
            </div>

            {/* ── CTA Banner - Light Theme ── */}
            <div
              className="mt-14 relative rounded-2xl overflow-hidden p-8 md:p-10"
              style={{
                background: `linear-gradient(135deg,rgba(${accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.08),rgba(0,0,0,0.02))`,
                border: `1px solid rgba(${accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.3)`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.08), 0 0 50px rgba(${accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.1)`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-56 h-56 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right,rgba(${accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.1),transparent 65%)` }}
              />
              <div className="relative">
                <div className="text-[10px] tracking-[0.35em] uppercase mb-3 font-semibold" style={{ ...sansFont, color: accent }}>
                  Ready to implement these strategies?
                </div>
                <h3
                  className="text-[#1a1a2e] m-0 mb-3 leading-tight"
                  style={{ ...bebasFont, fontSize: "clamp(26px,3.5vw,40px)" }}
                >
                  Let's apply these insights to your business
                </h3>
                <p className="text-[#4a5568] text-[13.5px] leading-[1.72] mb-6 max-w-[520px] font-medium" style={sansFont}>
                  Free strategy call. We'll audit your current setup and show you exactly what to improve.
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2.5 py-3.5 px-7 text-white text-[11px] tracking-[0.28em] uppercase no-underline transition-all duration-300 hover:-translate-y-0.5 active:scale-95 font-semibold"
                    style={{
                      ...sansFont,
                      background: `linear-gradient(135deg,${accent},${accent}cc)`,
                      clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
                      boxShadow: `0 8px 32px rgba(${accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.35)`,
                    }}
                  >
                    Book Free Strategy Call →
                  </a>
                  <Link
                    href="/#work"
                    className="text-[11px] tracking-[0.2em] uppercase no-underline transition-colors font-medium"
                    style={{ ...sansFont, color: "#4a5568" }}
                  >
                    View Our Work ↗
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Related Posts - Light Theme ── */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-10" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-6 h-px bg-[#ff4d00]" style={{ boxShadow: "0 0 8px rgba(255,77,0,0.4)" }} />
                  <h3
                    className="text-[#1a1a2e] m-0"
                    style={{ ...bebasFont, fontSize: "clamp(22px,3vw,32px)", letterSpacing: "0.02em" }}
                  >
                    Read Next
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedPosts.map((p: any) => {
                    const relAccent = getCategoryColor(p.category);
                    return (
                      <Link
                        key={p._id}
                        href={`/blog/${p.slug}`}
                        className="group flex flex-col rounded-xl border overflow-hidden no-underline transition-all duration-300 hover:border-black/20"
                        style={{
                          borderColor: "rgba(0,0,0,0.1)",
                          background: "rgba(0,0,0,0.025)",
                        }}
                      >
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <img
                            src={p.coverImage?.url || p.coverImage}
                            alt={p.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          {/* Light theme gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa]/60 to-transparent" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <span
                            className="text-[9px] tracking-[0.25em] uppercase mb-2 font-semibold"
                            style={{ ...sansFont, color: relAccent }}
                          >
                            {p.category}
                          </span>
                          <h4
                            className="text-[#1a1a2e] m-0 leading-snug flex-1 transition-colors duration-300 group-hover:text-[#ff4d00] font-medium"
                            style={{ ...sansFont, fontSize: 13.5 }}
                          >
                            {p.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                            <span className="text-[10px] text-[#6b7280] font-medium" style={sansFont}>{p.readingTime} min</span>
                            <span className="ml-auto text-[10px] transition-transform duration-300 group-hover:translate-x-1" style={{ color: relAccent, display: "inline-block" }}>→</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* ── Right: Sticky sidebar - Light Theme ── */}
          <aside className="hidden xl:flex flex-col gap-5 xl:sticky xl:top-28">
            {/* Post meta card */}
            <div
              className="rounded-xl border p-5"
              style={{
                borderColor: "rgba(0,0,0,0.1)",
                background: "rgba(0,0,0,0.025)",
              }}
            >
              <div className="text-[9px] tracking-[0.3em] uppercase text-[#6b7280] mb-4 font-semibold" style={sansFont}>
                Article Info
              </div>
              <div className="space-y-3">
                {[
                  { label: "Published", value: formatDate(post.publishedAt) },
                  { label: "Reading Time", value: `${post.readingTime} min` },
                  { label: "Category", value: post.category },
                  { label: "Author", value: "Creatovix Team" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <span className="text-[9px] tracking-[0.25em] uppercase text-[#6b7280] font-medium" style={sansFont}>
                      {item.label}
                    </span>
                    <span
                      className="text-[12px] font-medium"
                      style={{ ...sansFont, color: i === 2 ? accent : "#4a5568" }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reading progress - Light Theme */}
            <div
              className="rounded-xl border p-5"
              style={{
                borderColor: "rgba(0,0,0,0.1)",
                background: "rgba(0,0,0,0.025)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#6b7280] font-medium" style={sansFont}>
                  Progress
                </span>
                <span className="text-[11px] font-semibold" style={{ ...sansFont, color: accent }}>
                  {Math.round(scrollProgress)}%
                </span>
              </div>
              <div className="h-1 rounded-full bg-black/[0.08] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-200"
                  style={{
                    width: `${scrollProgress}%`,
                    background: `linear-gradient(90deg,${accent},${accent}80)`,
                    boxShadow: `0 0 8px rgba(${accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.4)`,
                  }}
                />
              </div>
            </div>

            {/* Share card - Light Theme */}
            <div
              className="rounded-xl border p-5"
              style={{
                borderColor: "rgba(0,0,0,0.1)",
                background: "rgba(0,0,0,0.025)",
              }}
            >
              <div className="text-[9px] tracking-[0.3em] uppercase text-[#6b7280] mb-4 font-semibold" style={sansFont}>
                Share Article
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg border flex items-center justify-center text-[11px] text-[#6b7280] hover:text-[#1a1a2e] hover:border-black/25 transition-all no-underline font-medium"
                  style={{ borderColor: "rgba(0,0,0,0.12)", ...sansFont }}
                >
                  𝕏 Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg border flex items-center justify-center text-[11px] text-[#6b7280] hover:text-[#1a1a2e] hover:border-black/25 transition-all no-underline font-medium"
                  style={{ borderColor: "rgba(0,0,0,0.12)", ...sansFont }}
                >
                  in LinkedIn
                </a>
              </div>
            </div>

            {/* Mini CTA - Light Theme */}
            <div
              className="rounded-xl overflow-hidden p-5 relative"
              style={{
                background: `linear-gradient(135deg,rgba(${accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.08),rgba(0,0,0,0.02))`,
                border: `1px solid rgba(${accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.28)`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg,${accent},transparent)`,
                  clipPath: "polygon(100% 0,0 0,100% 100%)",
                  opacity: 0.25,
                }}
              />
              <div className="text-[9px] tracking-[0.3em] uppercase mb-2 font-semibold" style={{ ...sansFont, color: accent }}>
                Free Consultation
              </div>
              <p className="text-[#4a5568] text-[12px] leading-[1.65] mb-4 font-medium" style={sansFont}>
                Let's discuss how we can help your business grow with our services.
              </p>
              <a
                href="/#contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-white text-[10px] tracking-[0.28em] uppercase no-underline transition-all hover:-translate-y-0.5 font-semibold"
                style={{
                  ...sansFont,
                  background: `linear-gradient(135deg,${accent},${accent}cc)`,
                  clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
                  boxShadow: `0 6px 24px rgba(${accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.35)`,
                }}
              >
                Get Started →
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* Structured Data */}
      <StructuredData
        pageType="blog"
        articleData={{
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          image: post.coverImage?.url || post.coverImage || "",
          author: "Creatovix Team",
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes gridDrift { 100% { background-position: 64px 64px; } }
        html { scroll-behavior: smooth; }
        a { text-decoration: none !important; }
        /* Light theme scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #fafafa; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#cbd5e1,#94a3b8 50%,#cbd5e1); border-radius: 3px; }

        /* ── Article prose styles - Light Theme ── */
        .blog-prose { line-height: 1.85; font-size: 15px; }
        .blog-prose h2 {
          font-family: 'Bebas Neue','Impact',sans-serif;
          font-size: clamp(28px, 3vw, 38px);
          color: #1a1a2e;
          letter-spacing: 0.03em;
          margin: 2.5em 0 0.75em;
          line-height: 1;
        }
        .blog-prose h3 {
          font-family: 'Bebas Neue','Impact',sans-serif;
          font-size: clamp(22px, 2.5vw, 28px);
          color: #1a1a2e;
          letter-spacing: 0.03em;
          margin: 2em 0 0.6em;
        }
        .blog-prose p { margin-bottom: 1.4em; color: #4a5568; }
        .blog-prose strong { color: #1a1a2e; font-weight: 600; }
        .blog-prose a { color: #ff4d00; text-decoration: underline !important; text-underline-offset: 3px; }
        .blog-prose ul, .blog-prose ol {
          padding-left: 1.5em;
          margin-bottom: 1.4em;
          color: #4a5568;
        }
        .blog-prose li { margin-bottom: 0.5em; }
        .blog-prose blockquote {
          border-left: 3px solid #ff4d00;
          padding: 1em 1.5em;
          margin: 2em 0;
          background: rgba(255,77,0,0.05);
          border-radius: 0 12px 12px 0;
          color: #4a5568;
          font-style: italic;
        }
        .blog-prose code {
          font-family: 'Inter', sans-serif;
          font-size: 0.88em;  
          background: rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.1);
          padding: 0.15em 0.45em;
          border-radius: 4px;
          color: #1a1a2e;
        }
        .blog-prose pre {
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 1.5em;
          overflow-x: auto;
          margin: 2em 0;
        }
        .blog-prose pre code {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.9em;
        }
        .blog-prose img {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.1);
          margin: 2em 0;
        }
        .blog-prose hr {
          border: none;
          border-top: 1px solid rgba(0,0,0,0.1);
          margin: 2.5em 0;
        }
      `}</style>
    </main>
  );
}