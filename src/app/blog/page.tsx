// src/app/blog/page.tsx — SERVER COMPONENT (thin wrapper)
// The interactive category filter lives in BlogClient.tsx ("use client")
import Link from "next/link";
import { sanityClient } from "@/sanity/lib/client";
import { getAllPostsQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Web Design & Development Blog | Creatovix",
  description:
    "Expert insights on web design, Shopify development, conversion optimization, and growing your business online.",
  keywords: [
    "web design blog",
    "Shopify tips",
    "conversion optimization",
    "small business marketing",
  ],
  // ✅ ADD THIS
  alternates: {
    canonical: "https://www.creatovix.com/blog",
  },
};

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

export default async function BlogPage() {
  const posts = await sanityClient.fetch(getAllPostsQuery);
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main
      className="relative min-h-screen overflow-hidden font-sans"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "linear-gradient(165deg,#fafafa 0%,#f5f5f5 45%,#fafafa 100%)",
      }}
    >
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
      {/* Ambient glows - Reduced opacity for light theme */}
      <div
        className="absolute pointer-events-none rounded-full blur-[140px] z-0"
        style={{
          width: 700,
          height: 700,
          top: -150,
          left: -150,
          background: "radial-gradient(circle,rgba(255,77,0,0.05),transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[120px] z-0"
        style={{
          width: 500,
          height: 500,
          top: "40%",
          right: -120,
          background: "radial-gradient(circle,rgba(168,85,247,0.04),transparent 70%)",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-4 xl:px-10 relative z-10 pt-[18vh] pb-24">

        {/* ── Page Header ── */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-[#ff4d00]" style={{ boxShadow: "0 0 12px rgba(255,77,0,0.4)" }} />
            <span
              className="text-[10px] tracking-[0.4em] uppercase text-[#ff4d00] font-semibold"
              style={sansFont}
            >
              Creatovix Journal
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end">
            <h1
              className="text-[#1a1a2e] m-0 leading-none"
              style={{
                ...bebasFont,
                fontSize: "clamp(52px,8vw,100px)",
                letterSpacing: "0.01em",
                lineHeight: 0.88,
              }}
            >
              Insights &{" "}
              <span
                style={{
                  color: "#ff4d00",
                  textShadow: "0 0 40px rgba(255,77,0,0.3)",
                }}
              >
                Resources
              </span>
            </h1>
            <p
              className="text-[#4a5568] max-w-[340px] leading-[1.75] text-[13.5px] lg:text-right font-medium"
              style={sansFont}
            >
              Practical strategies on web design, Shopify development, and
              growing your business. No fluff — only what works.
            </p>
          </div>

          {/* Divider with post count - Light Theme */}
          <div
            className="flex items-center gap-4 mt-10"
            style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 20 }}
          >
            <span
              className="text-[11px] tracking-[0.3em] uppercase text-[#6b7280] font-medium"
              style={sansFont}
            >
              {posts.length} articles published
            </span>
            <span className="flex-1 h-px bg-black/[0.06]" />
            <span
              className="text-[11px] tracking-[0.3em] uppercase text-[#6b7280] font-medium"
              style={sansFont}
            >
              Updated regularly
            </span>
          </div>
        </div>

        {/* ── Featured Post (Hero card) - Light Theme ── */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group block mb-16 no-underline"
            style={{ textDecoration: "none" }}
          >
            <div
              className="relative rounded-2xl overflow-hidden border transition-all duration-500 group-hover:border-[#ff4d00]/50"
              style={{
                borderColor: "rgba(0,0,0,0.1)",
                background: "rgba(0,0,0,0.03)",
              }}
            >
              {/* Featured label */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff4d00] text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-white" style={{ animation: "pulse 1.8s ease-in-out infinite" }} />
                <span className="text-[9px] tracking-[0.35em] uppercase" style={sansFont}>
                  Featured
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px]">
                {/* Cover image */}
                {featured.coverImage && (
                  <div className="relative aspect-[16/9] lg:min-h-[380px] overflow-hidden">
                    <img
                      src={featured.coverImage.url || featured.coverImage}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />
                    {/* Light theme gradients */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#fafafa]/80 hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa]/70 to-transparent lg:hidden" />
                  </div>
                )}

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="px-2.5 py-1 rounded-full text-[9px] tracking-[0.25em] uppercase border font-medium"
                      style={{
                        color: getCategoryColor(featured.category),
                        borderColor: `${getCategoryColor(featured.category)}40`,
                        background: `${getCategoryColor(featured.category)}12`,
                        ...sansFont,
                      }}
                    >
                      {featured.category}
                    </span>
                    <span className="text-[10px] text-[#6b7280] font-medium" style={sansFont}>
                      {new Date(featured.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h2
                    className="text-[#1a1a2e] m-0 mb-4 leading-tight transition-colors duration-300 group-hover:text-[#ff4d00]"
                    style={{
                      ...bebasFont,
                      fontSize: "clamp(28px,3.5vw,44px)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    className="text-[#4a5568] leading-[1.8] mb-6 font-medium"
                    style={{ ...sansFont, fontSize: 14 }}
                  >
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center gap-4">
                    <span
                      className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-[#ff4d00] font-semibold"
                      style={sansFont}
                    >
                      Read Article
                      <span
                        className="transition-transform duration-300 group-hover:translate-x-1.5"
                        style={{ display: "inline-block" }}
                      >
                        →
                      </span>
                    </span>
                    <span
                      className="text-[10px] text-[#6b7280] font-medium"
                      style={sansFont}
                    >
                      {featured.readingTime} min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* ── Section label ── */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#6b7280] font-medium" style={sansFont}>
            All Articles
          </span>
          <span className="flex-1 h-px bg-black/[0.06]" />
        </div>

        {/* ── Post Grid - Light Theme ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {rest.map((post: any, i: number) => {
            const accent = getCategoryColor(post.category);
            return (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border overflow-hidden no-underline transition-all duration-400"
                style={{
                  borderColor: "rgba(0,0,0,0.1)",
                  background: "rgba(0,0,0,0.025)",
                  textDecoration: "none",
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                {/* Thumbnail */}
                {post.coverImage && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={post.coverImage.url || post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Light theme gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa]/70 to-transparent" />
                    {/* Category badge over image - Light Theme */}
                    <div className="absolute bottom-3 left-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-[9px] tracking-[0.22em] uppercase font-medium"
                        style={{
                          ...sansFont,
                          color: accent,
                          background: `${accent}18`,
                          border: `1px solid ${accent}40`,
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Body */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] text-[#6b7280] font-medium" style={sansFont}>
                      {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-[#9ca3af]">·</span>
                    <span className="text-[10px] text-[#6b7280] font-medium" style={sansFont}>
                      {post.readingTime} min read
                    </span>
                  </div>

                  <h2
                    className="text-[#1a1a2e] m-0 mb-3 leading-snug flex-1 transition-colors duration-300 group-hover:text-[#ff4d00]"
                    style={{
                      ...bebasFont,
                      fontSize: "clamp(18px,1.8vw,22px)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {post.title}
                  </h2>

                  <p
                    className="text-[#4a5568] leading-[1.72] mb-4 font-medium"
                    style={{ ...sansFont, fontSize: 12.5 }}
                  >
                    {post.excerpt?.length > 110
                      ? post.excerpt.slice(0, 110) + "…"
                      : post.excerpt}
                  </p>

                  {/* Read link */}
                  <div
                    className="flex items-center gap-2 pt-4 mt-auto"
                    style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <span
                      className="text-[10px] tracking-[0.22em] uppercase transition-colors duration-300 font-semibold"
                      style={{ ...sansFont, color: accent }}
                    >
                      Read Article
                    </span>
                    <span
                      className="text-xs transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: accent, display: "inline-block" }}
                    >
                      →
                    </span>
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div
                  className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg,${accent},transparent)` }}
                />
              </Link>
            );
          })}
        </div>

        {/* ── Newsletter / CTA strip - Light Theme ── */}
        <div
          className="mt-20 relative rounded-2xl overflow-hidden p-10 md:p-14"
          style={{
            background: "linear-gradient(135deg,rgba(255,77,0,0.08),rgba(0,0,0,0.02),rgba(168,85,247,0.04))",
            border: "1px solid rgba(255,77,0,0.25)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.08), 0 0 60px rgba(255,77,0,0.06)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
            style={{
              background: "radial-gradient(circle at top right,rgba(255,77,0,0.1),transparent 65%)",
            }}
          />
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="text-[10px] tracking-[0.35em] uppercase text-[#ff4d00] mb-3 font-semibold" style={sansFont}>
                Work with us
              </div>
              <h2
                className="text-[#1a1a2e] m-0 mb-3 leading-none"
                style={{ ...bebasFont, fontSize: "clamp(32px,4vw,52px)" }}
              >
                Ready to grow your business?
              </h2>
              <p className="text-[#4a5568] m-0 text-[14px] leading-[1.7] font-medium" style={sansFont}>
                From web design to full-stack development — let's build something that drives real results.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2.5 py-4 px-8 text-white text-[11px] tracking-[0.28em] uppercase no-underline transition-all duration-300 hover:-translate-y-1 active:scale-95 font-semibold"
                style={{
                  ...sansFont,
                  background: "linear-gradient(135deg,#ff4d00,#cc3d00)",
                  clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
                  boxShadow: "0 10px 40px rgba(255,77,0,0.35)",
                }}
              >
                Book Free Strategy Call →
              </a>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-8 text-[11px] tracking-[0.22em] uppercase no-underline border transition-all duration-300 hover:bg-black/[0.05] font-medium"
                style={{
                  ...sansFont,
                  color: "#4a5568",
                  borderColor: "rgba(0,0,0,0.12)",
                  borderRadius: 4,
                }}
              >
                View Services ↗
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes gridDrift { 100% { background-position: 64px 64px; } }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.6)} }
        a { text-decoration: none !important; }
        /* Light theme scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #fafafa; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#cbd5e1,#94a3b8 50%,#cbd5e1); border-radius: 3px; }
      `}</style>
    </main>
  );
}