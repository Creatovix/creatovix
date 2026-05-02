"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    _id: "1",
    title: "E-Commerce Platform",
    category: "Web Development",
    color: "#ff4d00",
    mainImage: "/projects/proj-1.webp",
    year: "2024",
    client: "TechStore Inc.",
  },
  {
    _id: "2",
    title: "Brand Identity System",
    category: "Graphic Design",
    color: "#00c8ff",
    mainImage: "/projects/proj-2.webp",
    year: "2024",
    client: "Luxe Beauty",
  },
  {
    _id: "3",
    title: "SaaS Dashboard",
    category: "Web Design",
    color: "#a855f7",
    mainImage: "/projects/proj-3.webp",
    year: "2023",
    client: "DataFlow",
  },
  {
    _id: "4",
    title: "Mobile Banking App",
    category: "Full Stack",
    color: "#10d4a0",
    mainImage: "/projects/proj-4.webp",
    year: "2023",
    client: "FinanceHub",
  },
  {
    _id: "5",
    title: "Restaurant Website",
    category: "Web Design",
    color: "#f59e0b",
    mainImage: "/projects/proj-5.webp",
    year: "2024",
    client: "Bistro Moderne",
  },
  {
    _id: "6",
    title: "Corporate Portal",
    category: "Web Development",
    color: "#ff4d00",
    mainImage: "/projects/proj-6.webp",
    year: "2023",
    client: "GlobalTech",
  },
  {
    _id: "7",
    title: "Fitness Tracking App",
    category: "Full Stack",
    color: "#10d4a0",
    mainImage: "/projects/proj-7.webp",
    year: "2024",
    client: "FitLife",
  },
  {
    _id: "8",
    title: "Real Estate Platform",
    category: "Web Development",
    color: "#a855f7",
    mainImage: "/projects/proj-8.webp",
    year: "2023",
    client: "HomeFind",
  },
  {
    _id: "9",
    title: "Fashion E-Commerce",
    category: "Shopify",
    color: "#f59e0b",
    mainImage: "/projects/proj-9.webp",
    year: "2024",
    client: "StyleHub",
  },
  {
    _id: "10",
    title: "Healthcare Portal",
    category: "Full Stack",
    color: "#00c8ff",
    mainImage: "/projects/proj-10.webp",
    year: "2023",
    client: "MediCare+",
  },
  {
    _id: "11",
    title: "Travel Booking App",
    category: "Full Stack",
    color: "#ff4d00",
    mainImage: "/projects/proj-11.webp",
    year: "2024",
    client: "Wanderlust",
  },
  {
    _id: "12",
    title: "Education Platform",
    category: "Web Design",
    color: "#10d4a0",
    mainImage: "/projects/proj-12.webp",
    year: "2023",
    client: "EduLearn",
  },
];

const CATEGORIES = [
  "All",
  "Web Design",
  "Web Development",
  "Graphic Design",
  "Full Stack",
  "Shopify",
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
const monoFont = { fontFamily: "'DM Mono','Courier New',monospace" };

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function PortfolioSection() {
  const { ref, inView } = useInView(0.05);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((c) => c + 6);
      setLoadingMore(false);
    }, 700);
  };

  return (
    <section
      ref={ref}
      id="work"
      className="relative overflow-hidden pt-[20vh] pb-[10vh]"
      style={{
        fontFamily: "'DM Mono','Courier New',monospace",
        background:
          "linear-gradient(165deg,#050310 0%,#0a0818 45%,#050310 100%)",
      }}
    >
      {/* Backgrounds */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,77,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.03) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          animation: "portGridDrift 26s linear infinite",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 4px)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[110px] z-0 w-[900px] h-[900px] -top-56 -left-56"
        style={{
          background:
            "radial-gradient(circle,rgba(255,77,0,0.09),transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[600px] h-[600px] -bottom-28 -right-36"
        style={{
          background:
            "radial-gradient(circle,rgba(16,212,160,0.07),transparent 70%)",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 relative z-10">
        {/* ── Section header ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 xl:gap-[60px] mb-12 xl:mb-14 items-end">
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="flex items-center gap-3.5 mb-3.5">
              <span className="inline-block w-12 h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
              <span
                className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase"
                style={monoFont}
              >
                Our Work
              </span>
            </div>
            <h2
              className="leading-none text-white m-0"
              style={{
                ...bebasFont,
                fontSize: "clamp(40px,5.5vw,64px)",
                letterSpacing: "0.03em",
              }}
            >
              Featured
              <br />
              <span
                style={{
                  color: "#ff4d00",
                  textShadow: "0 0 50px rgba(255,77,0,0.45)",
                }}
              >
                Projects
              </span>
            </h2>
          </div>

          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <p
              className="text-[14px] text-[#a8b4cc] leading-[1.78] mb-6 max-w-[520px]"
              style={monoFont}
            >
              Explore our latest work and see how we've helped brands transform
              their digital presence with bold design and clean code.
            </p>
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(6);
                  }}
                  className="px-4 py-2 text-[10px] tracking-[0.22em] uppercase border transition-all duration-300 cursor-pointer rounded-full"
                  style={{
                    ...monoFont,
                    background:
                      activeCategory === cat
                        ? "#ff4d00"
                        : "rgba(255,255,255,0.04)",
                    color:
                      activeCategory === cat ? "#fff" : "rgba(255,255,255,0.5)",
                    borderColor:
                      activeCategory === cat
                        ? "#ff4d00"
                        : "rgba(255,255,255,0.12)",
                    boxShadow:
                      activeCategory === cat
                        ? "0 0 20px rgba(255,77,0,0.35)"
                        : "none",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5 mb-12 xl:mb-14">
          {visible.map((p, i) => (
            <div
              key={p._id}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView
                  ? "translateY(0) scale(1)"
                  : "translateY(36px) scale(0.97)",
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
              }}
            >
              <ProjectCard project={p} />
            </div>
          ))}

          {/* Skeleton placeholders while loading */}
          {loadingMore &&
            [...Array(3)].map((_, i) => (
              <div
                key={`sk-${i}`}
                className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden"
                style={{ height: 340 }}
              >
                <div className="h-full animate-pulse bg-white/[0.06]" />
              </div>
            ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <div
            className="flex justify-center"
            style={{
              opacity: inView ? 1 : 0,
              transition: "opacity 0.6s ease 0.4s",
            }}
          >
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="inline-flex items-center gap-3 py-4 px-10 text-white text-[12px] tracking-[0.22em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_44px_rgba(255,77,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              style={{
                ...monoFont,
                background: "linear-gradient(135deg,#ff4d00,#ff8c00)",
                clipPath:
                  "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))",
                boxShadow: "0 8px 32px rgba(255,77,0,0.38)",
              }}
            >
              {loadingMore ? "Loading…" : "Load More Projects"}
              <span className="text-base">→</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @keyframes portGridDrift { 100% { background-position: 64px 64px; } }
      `}</style>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false);
  const imgRef  = useRef<HTMLImageElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const IMAGE_HEIGHT_PCT = 500; // Image is 500% of container height
  // Calculate max scroll as % of IMAGE height (not container)
  const MAX_SCROLL_PCT = ((IMAGE_HEIGHT_PCT - 100) / IMAGE_HEIGHT_PCT) * 100; // = 80%
  const DURATION = 3200; // ms to scroll top → bottom

  function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  useEffect(() => {
    const img = imgRef.current;
    const dot = dotRef.current;
    if (!img || !dot) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (!hovered) {
      // Smoothly return image to the very top
      img.style.transition = "transform 0.7s cubic-bezier(0.16,1,0.3,1)";
      img.style.transform  = "translateY(0%)";
      dot.style.transform  = "translateX(-50%) translateY(0%)";
      startRef.current = null;
      return;
    }

    // Kick off scroll animation
    img.style.transition = "none";

    const tick = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const t = Math.min(elapsed / DURATION, 1);
      const e = easeInOut(t);

      // Scroll image: 0% → -80% of its own height
      const scrollPct = e * MAX_SCROLL_PCT;
      img.style.transform = `translateY(-${scrollPct}%)`;
      
      // Move progress dot from bottom → top of its track
      dot.style.transform = `translateX(-50%) translateY(-${e * 100}%)`;

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    startRef.current = null;
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [hovered]);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 cursor-pointer"
      style={{
        height: 340,
        borderColor: hovered ? project.color : undefined,
        boxShadow: hovered
          ? `0 0 0 1px ${project.color}, 0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${project.color}18`
          : "0 8px 30px rgba(0,0,0,0.35)",
        transition: "border-color 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image — 500% tall so it can scroll within the fixed card height */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={project.mainImage}
          alt={project.title}
          loading="lazy"
          className="w-full object-cover"
          style={{
            height: `${IMAGE_HEIGHT_PCT}%`,
            objectPosition: "top",
            transform: "translateY(0%)",
            willChange: "transform",
            display: "block",
          }}
        />
      </div>

      {/* Subtle dark vignette — fades out on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: "linear-gradient(180deg,rgba(5,3,16,0.08) 0%,rgba(5,3,16,0.25) 100%)",
          opacity: hovered ? 0 : 1,
        }}
      />

      {/* Colour glow overlay on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at top,${project.color}16,transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-14 h-14 opacity-60 pointer-events-none"
        style={{
          background: `linear-gradient(135deg,${project.color},transparent)`,
          clipPath: "polygon(100% 0,0 0,100% 100%)",
        }}
      />

      {/* Category badge — top left */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className="px-3 py-1 text-[8.5px] tracking-[0.22em] uppercase"
          style={{
            fontFamily: "'DM Mono','Courier New',monospace",
            background: "rgba(5,3,16,0.9)",
            border: `1px solid ${project.color}44`,
            color: project.color,
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Year — top right */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className="text-[8.5px] tracking-[0.18em] text-white/30 uppercase"
          style={{ fontFamily: "'DM Mono','Courier New',monospace" }}
        >
          {project.year}
        </span>
      </div>

      {/* Scroll progress indicator — right edge, visible on hover */}
      <div
        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-px z-10 transition-opacity duration-400"
        style={{
          height: 50,
          background: `linear-gradient(180deg,${project.color},transparent)`,
          boxShadow: `0 0 10px ${project.color}`,
          opacity: hovered ? 1 : 0,
        }}
      >
        <div
          ref={dotRef}
          className="absolute left-1/2 w-[6px] h-[6px] rounded-full"
          style={{
            background: project.color,
            bottom: 0,
            transform: "translateX(-50%) translateY(0%)",
          }}
        />
      </div>
    </div>
  );
}
