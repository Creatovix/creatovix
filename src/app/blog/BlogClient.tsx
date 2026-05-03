"use client";

import Link from "next/link";
import { useState } from "react";

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
// Updated to Inter font
const sansFont = { fontFamily: "'Inter', sans-serif" };

const CATEGORY_COLORS: Record<string, string> = {
  All: "#ff4d00",
  "Web Design": "#ff4d00",
  Shopify: "#f59e0b",
  Development: "#a855f7",
  Marketing: "#10d4a0",
  "Full Stack": "#00c8ff",
  "Graphic Design": "#00c8ff",
};

function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? "#ff4d00";
}

interface Post {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  coverImage?: { url?: string } | string;
}

interface BlogClientProps {
  posts: Post[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);
  const featured = active === "All" ? posts[0] : filtered[0];
  const rest = active === "All" ? posts.slice(1) : filtered.slice(1);
  const accent = getCategoryColor(active);

  function getImgSrc(img: Post["coverImage"]): string {
    if (!img) return "";
    if (typeof img === "string") return img;
    return img.url ?? "";
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden font-sans"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "linear-gradient(165deg,#fafafa 0%,#f5f5f5 45%,#fafafa 100%)",
      }}
    >
      {/* Grid texture - Light Theme */}
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
        style={{ width: 600, height: 600, top: -120, left: -150, background: `radial-gradient(circle,rgba(255,77,0,0.05),transparent 70%)`, transition: "background 0.5s" }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[120px] z-0"
        style={{ width: 400, height: 400, top: "50%", right: -100, background: "radial-gradient(circle,rgba(168,85,247,0.04),transparent 70%)" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 pt-[16vh] pb-20">

        {/* ── Header ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px" style={{ background: "#ff4d00", boxShadow: "0 0 10px rgba(255,77,0,0.4)" }} />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#ff4d00] font-semibold" style={sansFont}>
              Creatovix Journal
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h1
              className="text-[#1a1a2e] m-0 leading-none"
              style={{ ...bebasFont, fontSize: "clamp(44px,6.5vw,80px)", letterSpacing: "0.01em", lineHeight: 0.9 }}
            >
              Insights &{" "}
              <span style={{ color: "#ff4d00", textShadow: "0 0 35px rgba(255,77,0,0.3)" }}>
                Resources
              </span>
            </h1>
            <p className="text-[#4a5568] max-w-[300px] leading-[1.7] text-[12.5px] font-medium" style={sansFont}>
              Practical strategies on web design, Shopify & development. No fluff — only what works.
            </p>
          </div>
        </div>

        {/* ── Category Filter Tabs - Light Theme ── */}
        <div
          className="flex items-center gap-2 flex-wrap mb-10 pb-6"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
          {categories.map((cat) => {
            const isActive = active === cat;
            const color = getCategoryColor(cat);
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-4 py-2 rounded-full text-[10px] tracking-[0.22em] uppercase border cursor-pointer transition-all duration-300 font-medium"
                style={{
                  ...sansFont,
                  background: isActive ? color : "rgba(0,0,0,0.04)",
                  color: isActive ? "#fff" : "#4a5568",
                  borderColor: isActive ? color : "rgba(0,0,0,0.12)",
                  boxShadow: isActive ? `0 0 20px rgba(${color.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.3)` : "none",
                }}
              >
                {cat}
                <span
                  className="ml-1.5 opacity-60"
                  style={{ fontSize: 9 }}
                >
                  {cat === "All" ? posts.length : posts.filter((p) => p.category === cat).length}
                </span>
              </button>
            );
          })}

          <span className="ml-auto text-[10px] text-[#6b7280] tracking-[0.2em] font-medium" style={sansFont}>
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Featured Post - Light Theme ── */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group block mb-8 no-underline"
          >
            <div
              className="relative rounded-xl overflow-hidden border transition-all duration-400"
              style={{
                borderColor: `${getCategoryColor(featured.category)}30`,
                background: "rgba(0,0,0,0.03)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">
                {/* Image */}
                {getImgSrc(featured.coverImage) && (
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/7" }}>
                    <img
                      src={getImgSrc(featured.coverImage)}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />
                    {/* Light theme gradients */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#fafafa]/85 hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa]/75 to-transparent lg:hidden" />
                    {/* Featured badge */}
                    <div
                      className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white"
                      style={{ background: "#ff4d00", ...sansFont, fontSize: 9, letterSpacing: "0.3em" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" style={{ animation: "pulse 1.8s ease-in-out infinite" }} />
                      FEATURED
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-7 flex flex-col justify-center gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="px-2.5 py-1 rounded-full text-[9px] tracking-[0.22em] uppercase border font-medium"
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
                      {new Date(featured.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="text-[10px] text-[#6b7280] font-medium" style={sansFont}>
                      · {featured.readingTime}m
                    </span>
                  </div>

                  <h2
                    className="text-[#1a1a2e] m-0 leading-tight transition-colors duration-300 group-hover:text-[#ff4d00]"
                    style={{ ...bebasFont, fontSize: "clamp(24px,3vw,36px)", letterSpacing: "0.02em" }}
                  >
                    {featured.title}
                  </h2>

                  <p className="text-[#4a5568] leading-[1.72] m-0 font-medium" style={{ ...sansFont, fontSize: 13 }}>
                    {featured.excerpt?.length > 130 ? featured.excerpt.slice(0, 130) + "…" : featured.excerpt}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-[10px] tracking-[0.22em] uppercase font-semibold"
                      style={{ ...sansFont, color: getCategoryColor(featured.category) }}
                    >
                      Read Article
                    </span>
                    <span
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                      style={{ color: getCategoryColor(featured.category), display: "inline-block", fontSize: 13 }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div
                className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg,${getCategoryColor(featured.category)},transparent)` }}
              />
            </div>
          </Link>
        )}

        {/* ── Post Grid (compact) - Light Theme ── */}
        {rest.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#6b7280] font-medium" style={sansFont}>
                More Articles
              </span>
              <span className="flex-1 h-px bg-black/[0.06]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {rest.map((post) => {
                const postAccent = getCategoryColor(post.category);
                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group flex gap-4 p-4 rounded-xl border no-underline transition-all duration-300 hover:bg-black/[0.04]"
                    style={{
                      borderColor: "rgba(0,0,0,0.1)",
                      background: "rgba(0,0,0,0.02)",
                    }}
                  >
                    {/* Thumbnail */}
                    {getImgSrc(post.coverImage) && (
                      <div
                        className="relative flex-shrink-0 rounded-lg overflow-hidden"
                        style={{ width: 80, height: 80 }}
                      >
                        <img
                          src={getImgSrc(post.coverImage)}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        {/* Light theme gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa]/50 to-transparent" />
                      </div>
                    )}

                    {/* Text */}
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="text-[8px] tracking-[0.22em] uppercase font-semibold"
                            style={{ ...sansFont, color: postAccent }}
                          >
                            {post.category}
                          </span>
                          <span className="text-[#9ca3af]">·</span>
                          <span className="text-[9px] text-[#6b7280] font-medium" style={sansFont}>
                            {post.readingTime}m
                          </span>
                        </div>
                        <h3
                          className="text-[#1a1a2e] m-0 leading-snug transition-colors duration-300 group-hover:text-[#ff4d00]"
                          style={{ ...bebasFont, fontSize: "clamp(15px,1.5vw,17px)", letterSpacing: "0.02em" }}
                        >
                          {post.title.length > 60 ? post.title.slice(0, 60) + "…" : post.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[9px] text-[#6b7280] font-medium" style={sansFont}>
                          {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                        </span>
                        <span
                          className="text-[10px] transition-transform duration-300 group-hover:translate-x-1"
                          style={{ color: postAccent, display: "inline-block" }}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* Empty state - Light Theme */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)" }}
            >
              📝
            </div>
            <p className="text-[#6b7280] text-[13px] font-medium" style={sansFont}>
              No articles in this category yet.
            </p>
          </div>
        )}

        {/* ── CTA - Light Theme ── */}
        <div
          className="mt-16 relative rounded-2xl overflow-hidden p-8 md:p-12"
          style={{
            background: "linear-gradient(135deg,rgba(255,77,0,0.08),rgba(0,0,0,0.02),rgba(168,85,247,0.04))",
            border: "1px solid rgba(255,77,0,0.25)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 50px rgba(255,77,0,0.06)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-56 h-56 pointer-events-none"
            style={{ background: "radial-gradient(circle at top right,rgba(255,77,0,0.1),transparent 65%)" }}
          />
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="text-[10px] tracking-[0.35em] uppercase text-[#ff4d00] mb-3 font-semibold" style={sansFont}>
                Work with us
              </div>
              <h2
                className="text-[#1a1a2e] m-0 mb-2 leading-none"
                style={{ ...bebasFont, fontSize: "clamp(28px,3.5vw,44px)" }}
              >
                Ready to grow your business?
              </h2>
              <p className="text-[#4a5568] m-0 text-[13px] leading-[1.7] font-medium" style={sansFont}>
                From web design to full-stack development — let's build something that delivers real results.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2.5 py-3.5 px-7 text-white text-[10px] tracking-[0.28em] uppercase no-underline transition-all duration-300 hover:-translate-y-1 active:scale-95 font-semibold"
                style={{
                  ...sansFont,
                  background: "linear-gradient(135deg,#ff4d00,#cc3d00)",
                  clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
                  boxShadow: "0 8px 32px rgba(255,77,0,0.35)",
                }}
              >
                Book Free Strategy Call →
              </a>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center gap-2 py-3 px-7 text-[10px] tracking-[0.22em] uppercase no-underline border transition-all duration-300 hover:bg-black/[0.05] font-medium"
                style={{ ...sansFont, color: "#4a5568", borderColor: "rgba(0,0,0,0.12)", borderRadius: 4 }}
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
        button { font-family: inherit; }
      `}</style>
    </main>
  );
}