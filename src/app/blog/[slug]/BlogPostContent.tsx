// src/app/blog/[slug]/BlogPostContent.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SanityContent } from "@/lib/sanity-portabletext";
import StructuredData from "@/components/StructuredData";

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
const monoFont = { fontFamily: "'DM Mono','Courier New',monospace" };

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
      className="relative min-h-screen overflow-hidden"
      style={{
        fontFamily: "'DM Mono','Courier New',monospace",
        background: "linear-gradient(165deg,#050310 0%,#0a0818 45%,#050310 100%)",
      }}
    >
      {/* ── Reading progress bar ── */}
      <div
        className="fixed top-0 left-0 z-50 h-[2px] transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg,${accent},${accent}90)`,
          boxShadow: `0 0 10px ${accent}80`,
        }}
      />

      {/* ── Grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,77,0,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.018) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          animation: "gridDrift 30s linear infinite",
        }}
      />

      {/* ── Ambient glows ── */}
      <div
        className="absolute pointer-events-none rounded-full blur-[160px] z-0"
        style={{
          width: 700,
          height: 700,
          top: -100,
          left: -200,
          background: `radial-gradient(circle,${accent}14,transparent 70%)`,
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[120px] z-0"
        style={{
          width: 500,
          height: 500,
          top: "60%",
          right: -100,
          background: "radial-gradient(circle,rgba(168,85,247,0.06),transparent 70%)",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-4 xl:px-10 relative z-10 pt-[18vh] pb-24">

        {/* ── Breadcrumb ── */}
        <nav
          className="flex items-center gap-2 mb-10 text-[11px] tracking-[0.25em] uppercase"
          style={monoFont}
        >
          <Link href="/" className="text-[#4e5e74] hover:text-[#ff4d00] transition-colors no-underline">
            Home
          </Link>
          <span className="text-[#2a3a4e]">/</span>
          <Link href="/blog" className="text-[#4e5e74] hover:text-[#ff4d00] transition-colors no-underline">
            Blog
          </Link>
          <span className="text-[#2a3a4e]">/</span>
          <span style={{ color: accent }}>{post.category}</span>
        </nav>

        {/* ── Full-width cover image ── */}
        {post.coverImage && (
          <div className="relative w-full rounded-2xl overflow-hidden mb-12">
            <img
              src={post.coverImage.url || post.coverImage}
              alt={post.coverImage.alt || post.title}
              className="w-full h-auto object-fill max-h-[600px]"
              loading="eager"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,transparent 40%,#050310 100%)" }} />

            {/* Category badge floating on image */}
            <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: `${accent}22`, border: `1px solid ${accent}50`, backdropFilter: "blur(12px)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ ...monoFont, color: accent }}>
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
                <span className="text-[10px] tracking-[0.28em] uppercase text-[#3e5060]" style={monoFont}>
                  {formatDate(post.publishedAt)}
                </span>
                <span className="text-[#2a3a48]">·</span>
                <span className="text-[10px] tracking-[0.28em] uppercase text-[#3e5060]" style={monoFont}>
                  {post.readingTime} min read
                </span>
              </div>

              <h1
                className="text-white m-0 mb-6 leading-none"
                style={{
                  ...bebasFont,
                  fontSize: "clamp(42px,6vw,72px)",
                  letterSpacing: "0.01em",
                  lineHeight: 0.92,
                }}
              >
                {post.title}
              </h1>

              {/* Excerpt / standfirst */}
              <p
                className="text-[#8090a4] leading-[1.82] text-[15.5px]"
                style={{
                  ...monoFont,
                  borderLeft: `3px solid ${accent}`,
                  paddingLeft: 18,
                }}
              >
                {post.excerpt}
              </p>

              {/* Divider */}
              <div
                className="flex items-center gap-4 mt-8"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 20 }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                    style={{ background: `${accent}20`, border: `1px solid ${accent}40`, color: accent }}
                  >
                    C
                  </div>
                  <span className="text-[11px] text-[#4e5e6e]" style={monoFont}>
                    Creatovix Team
                  </span>
                </div>
                <span className="flex-1 h-px bg-white/[0.04]" />
                {/* Share */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#3e5060]" style={monoFont}>Share</span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-lg border flex items-center justify-center text-[12px] text-[#4e5e6e] hover:text-white hover:border-white/30 transition-all no-underline"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    𝕏
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-lg border flex items-center justify-center text-[11px] text-[#4e5e6e] hover:text-white hover:border-white/30 transition-all no-underline"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    in
                  </a>
                </div>
              </div>
            </header>

            {/* Article body */}
            <article
              className="blog-prose"
              style={{ color: "#8090a4" }}
            >
              <SanityContent content={post.content} />
            </article>

            {/* Tags + bottom share */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-14 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#3e5060]" style={monoFont}>
                  Tagged:
                </span>
                <span
                  className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase"
                  style={{
                    ...monoFont,
                    color: accent,
                    background: `${accent}12`,
                    border: `1px solid ${accent}35`,
                  }}
                >
                  {post.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-[#3e5060]" style={monoFont}>Share this article:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4e5e6e] hover:text-[#1DA1F2] transition-colors no-underline text-sm"
                >
                  𝕏
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4e5e6e] hover:text-[#0A66C2] transition-colors no-underline text-sm"
                >
                  in
                </a>
              </div>
            </div>

            {/* ── CTA Banner ── */}
            <div
              className="mt-14 relative rounded-2xl overflow-hidden p-8 md:p-10"
              style={{
                background: `linear-gradient(135deg,${accent}12,rgba(255,255,255,0.03))`,
                border: `1px solid ${accent}30`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 50px ${accent}10`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-56 h-56 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right,${accent}14,transparent 65%)` }}
              />
              <div className="relative">
                <div className="text-[10px] tracking-[0.35em] uppercase mb-3" style={{ ...monoFont, color: accent }}>
                  Ready to implement these strategies?
                </div>
                <h3
                  className="text-white m-0 mb-3 leading-tight"
                  style={{ ...bebasFont, fontSize: "clamp(26px,3.5vw,40px)" }}
                >
                  Let's apply these insights to your business
                </h3>
                <p className="text-[#5e7080] text-[13.5px] leading-[1.72] mb-6 max-w-[520px]" style={monoFont}>
                  Free strategy call. We'll audit your current setup and show you exactly what to improve.
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2.5 py-3.5 px-7 text-white text-[11px] tracking-[0.28em] uppercase no-underline transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                    style={{
                      ...monoFont,
                      background: `linear-gradient(135deg,${accent},${accent}cc)`,
                      clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
                      boxShadow: `0 8px 32px ${accent}44`,
                    }}
                  >
                    Book Free Strategy Call →
                  </a>
                  <Link
                    href="/#work"
                    className="text-[11px] tracking-[0.2em] uppercase no-underline transition-colors"
                    style={{ ...monoFont, color: "#4e6070" }}
                  >
                    View Our Work ↗
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Related Posts ── */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-6 h-px bg-[#ff4d00]" style={{ boxShadow: "0 0 8px #ff4d00" }} />
                  <h3
                    className="text-white m-0"
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
                        className="group flex flex-col rounded-xl border overflow-hidden no-underline transition-all duration-300 hover:border-white/20"
                        style={{
                          borderColor: "rgba(255,255,255,0.07)",
                          background: "rgba(255,255,255,0.022)",
                        }}
                      >
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <img
                            src={p.coverImage?.url || p.coverImage}
                            alt={p.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050310]/60 to-transparent" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <span
                            className="text-[9px] tracking-[0.25em] uppercase mb-2"
                            style={{ ...monoFont, color: relAccent }}
                          >
                            {p.category}
                          </span>
                          <h4
                            className="text-white m-0 leading-snug flex-1 transition-colors duration-300 group-hover:text-[#ff4d00]"
                            style={{ ...monoFont, fontSize: 13.5, fontWeight: 500 }}
                          >
                            {p.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <span className="text-[10px] text-[#3e5060]" style={monoFont}>{p.readingTime} min</span>
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

          {/* ── Right: Sticky sidebar ── */}
          <aside className="hidden xl:flex flex-col gap-5 xl:sticky xl:top-28">
            {/* Post meta card */}
            <div
              className="rounded-xl border p-5"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.025)",
              }}
            >
              <div className="text-[9px] tracking-[0.3em] uppercase text-[#3e5060] mb-4" style={monoFont}>
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
                    <span className="text-[9px] tracking-[0.25em] uppercase text-[#3e5060]" style={monoFont}>
                      {item.label}
                    </span>
                    <span
                      className="text-[12px]"
                      style={{ ...monoFont, color: i === 2 ? accent : "#8090a4" }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reading progress */}
            <div
              className="rounded-xl border p-5"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.025)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#3e5060]" style={monoFont}>
                  Progress
                </span>
                <span className="text-[11px]" style={{ ...monoFont, color: accent }}>
                  {Math.round(scrollProgress)}%
                </span>
              </div>
              <div className="h-1 rounded-full bg-white/[0.07] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-200"
                  style={{
                    width: `${scrollProgress}%`,
                    background: `linear-gradient(90deg,${accent},${accent}80)`,
                    boxShadow: `0 0 8px ${accent}60`,
                  }}
                />
              </div>
            </div>

            {/* Share card */}
            <div
              className="rounded-xl border p-5"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.025)",
              }}
            >
              <div className="text-[9px] tracking-[0.3em] uppercase text-[#3e5060] mb-4" style={monoFont}>
                Share Article
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg border flex items-center justify-center text-[11px] text-[#4e5e6e] hover:text-white hover:border-white/25 transition-all no-underline"
                  style={{ borderColor: "rgba(255,255,255,0.1)", ...monoFont }}
                >
                  𝕏 Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg border flex items-center justify-center text-[11px] text-[#4e5e6e] hover:text-white hover:border-white/25 transition-all no-underline"
                  style={{ borderColor: "rgba(255,255,255,0.1)", ...monoFont }}
                >
                  in LinkedIn
                </a>
              </div>
            </div>

            {/* Mini CTA */}
            <div
              className="rounded-xl overflow-hidden p-5 relative"
              style={{
                background: `linear-gradient(135deg,${accent}14,rgba(255,255,255,0.02))`,
                border: `1px solid ${accent}28`,
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
              <div className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ ...monoFont, color: accent }}>
                Free Consultation
              </div>
              <p className="text-[#5e7080] text-[12px] leading-[1.65] mb-4" style={monoFont}>
                Let's discuss how we can help your business grow with our services.
              </p>
              <a
                href="/#contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-white text-[10px] tracking-[0.28em] uppercase no-underline transition-all hover:-translate-y-0.5"
                style={{
                  ...monoFont,
                  background: `linear-gradient(135deg,${accent},${accent}cc)`,
                  clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
                  boxShadow: `0 6px 24px ${accent}40`,
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
        @keyframes gridDrift { 100% { background-position: 64px 64px; } }
        html { scroll-behavior: smooth; }
        a { text-decoration: none !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050310; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#050310,#7BB6FF 50%,#050310); border-radius: 3px; }

        /* ── Article prose styles ── */
        .blog-prose { line-height: 1.85; font-size: 15px; }
        .blog-prose h2 {
          font-family: 'Bebas Neue','Impact',sans-serif;
          font-size: clamp(28px, 3vw, 38px);
          color: #fff;
          letter-spacing: 0.03em;
          margin: 2.5em 0 0.75em;
          line-height: 1;
        }
        .blog-prose h3 {
          font-family: 'Bebas Neue','Impact',sans-serif;
          font-size: clamp(22px, 2.5vw, 28px);
          color: #e0eaf6;
          letter-spacing: 0.03em;
          margin: 2em 0 0.6em;
        }
        .blog-prose p { margin-bottom: 1.4em; color: #7e90a4; }
        .blog-prose strong { color: #c8d8e8; font-weight: 600; }
        .blog-prose a { color: #ff4d00; text-decoration: underline !important; text-underline-offset: 3px; }
        .blog-prose ul, .blog-prose ol {
          padding-left: 1.5em;
          margin-bottom: 1.4em;
          color: #7e90a4;
        }
        .blog-prose li { margin-bottom: 0.5em; }
        .blog-prose blockquote {
          border-left: 3px solid #ff4d00;
          padding: 1em 1.5em;
          margin: 2em 0;
          background: rgba(255,77,0,0.06);
          border-radius: 0 12px 12px 0;
          color: #a0b4c8;
          font-style: italic;
        }
        .blog-prose code {
          font-family: 'DM Mono','Courier New',monospace;
          font-size: 0.88em;  
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.15em 0.45em;
          border-radius: 4px;
          color: #a0c8e8;
        }
        .blog-prose pre {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
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
          border: 1px solid rgba(255,255,255,0.08);
          margin: 2em 0;
        }
        .blog-prose hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin: 2.5em 0;
        }
      `}</style>
    </main>
  );
}