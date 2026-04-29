"use client";
import { useEffect, useRef, useState, useCallback } from "react";

// For tailwind animation injection
const bebassFont =
  "font-['Bebas_Neue',sans-serif]"; // Not all tailwind configs have this, but you can add! Use as needed.

const SLIDES = [
  // ...unchanged (all slide objects)
  {
    id: 0,
    tagline: "WEB DESIGN",
    headline: ["PIXELS THAT", "SPEAK LOUDER"],
    sub: "Crafting digital experiences that captivate, convert, and leave a lasting impression.",
    accent: "#ff4d00",
    accentRgb: "255,77,0",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80",
    stat: { value: "150+", label: "Projects Delivered" },
    badges: [
      { icon: "⭐", text: "4.9/5 Rating" },
      { icon: "🚀", text: "Free Consult" },
      { icon: "⚡", text: "24h Response" },
    ],
    tags: ["UI/UX", "Figma", "Webflow", "Responsive"],
  },
  {
    id: 1,
    tagline: "GRAPHIC DESIGN",
    headline: ["VISUALS THAT", "DEFY GRAVITY"],
    sub: "Brand identities and visual systems that make your audience stop scrolling instantly.",
    accent: "#00c8ff",
    accentRgb: "0,200,255",
    image: "https://images.unsplash.com/photo-1626785774573-4b7993125651?auto=format&fit=crop&w=1600&q=80",
    stat: { value: "98%", label: "Client Satisfaction" },
    badges: [
      { icon: "🎨", text: "Award-Winning" },
      { icon: "🔄", text: "Free Revisions" },
      { icon: "📦", text: "Brand Guide" },
    ],
    tags: ["Branding", "Illustration", "Motion", "Print"],
  },
  {
    id: 2,
    tagline: "WEB DEVELOPMENT",
    headline: ["CODE THAT", "POWERS DREAMS"],
    sub: "Blazing-fast, scalable web applications built with modern tech stacks and clean architecture.",
    accent: "#a855f7",
    accentRgb: "168,85,247",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
    stat: { value: "99.9%", label: "Uptime Guarantee" },
    badges: [
      { icon: "🔒", text: "Secure & Fast" },
      { icon: "⚙️", text: "Modern Stack" },
      { icon: "📱", text: "Mobile-First" },
    ],
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    id: 3,
    tagline: "FULL STACK",
    headline: ["END-TO-END", "EXCELLENCE"],
    sub: "From database architecture to pixel-perfect UIs — we handle the entire digital stack.",
    accent: "#10d4a0",
    accentRgb: "16,212,160",
    image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&w=1600&q=80",
    stat: { value: "5x", label: "Faster Delivery" },
    badges: [
      { icon: "🗄️", text: "DB Expertise" },
      { icon: "🔗", text: "API Pro" },
      { icon: "🛡️", text: "99.9% Uptime" },
    ],
    tags: ["PostgreSQL", "AWS", "Docker", "CI/CD"],
  },
  {
    id: 4,
    tagline: "SHOPIFY",
    headline: ["STORES BUILT", "TO SELL MORE"],
    sub: "Custom Shopify themes and apps that transform browsers into loyal, repeat buyers.",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    stat: { value: "3x", label: "Average ROI Boost" },
    badges: [
      { icon: "💰", text: "3x ROI" },
      { icon: "🛒", text: "Conversion-First" },
      { icon: "📈", text: "Analytics" },
    ],
    tags: ["Liquid", "Shopify+", "Klaviyo", "Analytics"],
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearTimers = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const startProgress = useCallback(() => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    const step = 100 / (5000 / 50);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 50);
  }, []);

  const goTo = useCallback(
    (nextIdx: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setCurrent(nextIdx);
      setTimeout(() => setTransitioning(false), 800);
      startProgress();
    },
    [transitioning, startProgress]
  );

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  const resetAuto = useCallback(() => {
    clearTimers();
    startProgress();
    autoRef.current = setInterval(() => {
      setCurrent((c) => {
        const n = (c + 1) % SLIDES.length;
        return n;
      });
      startProgress();
    }, 5000);
  }, [startProgress]);

  useEffect(() => {
    setMounted(true);
    startProgress();
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
      startProgress();
    }, 5000);
    return clearTimers;
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const slide = SLIDES[current];
  // Responsive breakpoint helpers (for tailwind responsive conditionals):
  // sm = 640, md = 768, lg = 1024, xl = 1280

  return (
    <section
      ref={containerRef}
      className={`relative h-[100svh] min-h-[700px] overflow-hidden bg-[#04020a] font-mono ${
        mounted ? "" : "opacity-0"
      } transition-opacity duration-700`}
      style={{
        fontFamily: "'DM Mono', 'Courier New', monospace",
      }}
    >
      {/* Layered Background */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,_#04020a_0%,_#07051a_50%,_#04020a_100%)] z-0"></div>

      {/* Animated slide images */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 z-10 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt={s.tagline}
            className={`w-full h-full object-cover transition-transform duration-[8s] ease-out ${
              i === current ? "scale-100" : "scale-105"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(4,2,10,0.96)_0%,rgba(4,2,10,0.65)_50%,rgba(4,2,10,0.85)_100%)]" />
        </div>
      ))}

      {/* Accent color overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 75% 45%, rgba(${slide.accentRgb},0.14) 0%, transparent 65%)`,
        }}
        key={`accent-${current}`}
      />

      {/* Parallax grid */}
      <div
        className={
          "absolute inset-0 z-30 pointer-events-none transition-transform duration-500"
        }
        style={{
          transform: `translate(${(mousePos.x - 0.5) * 22}px, ${(mousePos.y - 0.5) * 22}px)`,
          backgroundImage: `linear-gradient(rgba(255,77,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,77,0,0.035)_1px,transparent_1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 z-40 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.025) 3px,rgba(0,0,0,0.025) 4px)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 z-40 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Slide counter dots - right rail */}
      <div className="absolute right-6 xl:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-[10px] z-50">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            className={`rounded-sm border-none cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-[2px] h-[20px] bg-white/20
              ${
                i === current
                  ? ""
                  : "hover:bg-white/50 hover:h-[28px]"
              }
              ${i === current ? "" : ""}
              ${i === current ? "" : ""}
            `}
            style={
              i === current
                ? {
                    background: s.accent,
                    height: 44,
                    width: 3,
                    boxShadow: `0 0 12px ${s.accent}`,
                  }
                : { "--dot-accent": s.accent } as React.CSSProperties
            }
            onClick={() => {
              goTo(i);
              resetAuto();
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Watermark number */}
      <div
        className="hidden lg:block absolute right-[60px] bottom-[60px] z-10 pointer-events-none select-none"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 110,
          lineHeight: 1,
          letterSpacing: "0.05em",
          color: `rgba(${slide.accentRgb},0.06)`,
          transition: "color 0.8s",
        }}
      >
        {String(current + 1).padStart(2, "0")}
      </div>

      {/* Main content */}
      <div className="absolute inset-0 z-50 flex items-center px-4 xl:px-10 max-w-[1600px] mx-auto left-0 right-0">
        <div className="w-full grid grid-cols-1 gap-[40px] items-center lg:grid-cols-[1fr_420px] lg:gap-[60px] xl:grid-cols-[1fr_460px]">
          {/* Left col */}
          <div className="max-w-[760px]">
            {/* Tagline */}
            <div
              key={`tag-${current}`}
              className="flex items-center gap-3 mb-5"
            >
              <span
                className="inline-block w-8 h-[1.5px] flex-shrink-0"
                style={{
                  background: slide.accent,
                  boxShadow: `0 0 12px rgba(${slide.accentRgb},0.8)`,
                }}
              />
              <span
                className="text-[11px] tracking-[0.38em] uppercase"
                style={{ color: slide.accent }}
              >
                {slide.tagline}
              </span>
              <span
                className="text-[9px] tracking-[0.2em] border rounded-2xl px-2 py-0.5 ml-auto"
                style={{
                  borderColor: `rgba(${slide.accentRgb},0.35)`,
                  color: slide.accent,
                }}
              >
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>

            {/* Headline */}
            <div key={`head-${current}`} className="mb-6">
              {slide.headline.map((line, i) => (
                <div key={i} className="overflow-hidden leading-[0.95] mb-1">
                  <h1
                    className={`${bebassFont} text-[clamp(44px,7vw,88px)] leading-[0.95] tracking-[0.03em] m-0 block`}
                    style={{
                      color: i === 0 ? "#fff" : slide.accent,
                      textShadow:
                        i === 1
                          ? `0 0 60px rgba(${slide.accentRgb},0.5)`
                          : "none",
                      animationDelay: `${0.1 + i * 0.12}s`,
                      animation:
                        "heroSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) both",
                    }}
                  >
                    {line}
                  </h1>
                </div>
              ))}
            </div>

            {/* Sub */}
            <p
              key={`sub-${current}`}
              className="text-[clamp(13px,1.4vw,15px)] text-white/50 leading-[1.75] max-w-[500px] mb-5"
              style={{
                animation:
                  "heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both",
              }}
            >
              {slide.sub}
            </p>

            {/* Tags */}
            <div
              key={`tags-${current}`}
              className="flex flex-wrap gap-2 mb-7"
            >
              {slide.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] tracking-[0.15em] uppercase text-white/45 border px-3 py-1 rounded-2xl bg-white/5"
                  style={{
                    animationDelay: `${0.3 + i * 0.06}s`,
                    borderColor: `rgba(${slide.accentRgb},0.25)`,
                    animation:
                      "heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div
              key={`cta-${current}`}
              className="flex gap-3.5 items-center flex-wrap mb-6"
              style={{
                animation:
                  "heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.42s both",
              }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-8 py-[14px] text-white no-underline text-[11.5px] tracking-[0.22em] uppercase transition-transform duration-200"
                style={{
                  background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}cc)`,
                  boxShadow: `0 0 32px rgba(${slide.accentRgb},0.45)`,
                  clipPath:
                    "polygon(0 0, calc(100% - 13px) 0, 100% 13px, 100% 100%, 13px 100%, 0 calc(100% - 13px))",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-3px) scale(1.03)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 14px 44px rgba(${slide.accentRgb},0.65)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0) scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px rgba(${slide.accentRgb},0.45)`;
                }}
              >
                Get Started
                <span className="text-[16px]">→</span>
              </a>
              <a
                href="#work"
                className="inline-flex items-center px-7 py-[13px] border bg-transparent text-white/65 no-underline text-[11.5px] tracking-[0.22em] uppercase transition-colors duration-200"
                style={{
                  borderColor: `rgba(${slide.accentRgb},0.25)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    slide.accent;
                  (e.currentTarget as HTMLElement).style.background = `rgba(${slide.accentRgb},0.1)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `rgba(${slide.accentRgb},0.25)`;
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                }}
              >
                View Work
              </a>
            </div>

            {/* Badges */}
            <div
              key={`badges-${current}`}
              className="flex flex-wrap gap-2"
              style={{
                animation:
                  "heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.55s both",
              }}
            >
              {slide.badges.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-[30px] bg-white/10 border backdrop-blur-[6px]"
                  style={{
                    animationDelay: `${0.5 + i * 0.08}s`,
                    borderColor: `rgba(${slide.accentRgb},0.18)`,
                    animation:
                      "heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
                  }}
                >
                  <span className="text-[13px]">{b.icon}</span>
                  <span className="text-[10.5px] text-white/65 tracking-[0.05em]">
                    {b.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right col (only on lg+) */}
          <div
            key={`right-${current}`}
            className="hidden lg:flex flex-col items-end gap-4 relative"
            style={{
              animation:
                "heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both",
            }}
          >
            {/* Big stat card */}
            <div
              className="w-full bg-[#04020a]/90 border rounded-[20px] overflow-hidden backdrop-blur-[20px] relative transition duration-700"
              style={{
                borderColor: `rgba(${slide.accentRgb},0.35)`,
                boxShadow: `0 20px 70px rgba(${slide.accentRgb},0.18), inset 0 0 60px rgba(0,0,0,0.3)`,
              }}
            >
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: `rgba(${slide.accentRgb},0.2)` }}
              >
                <span
                  className="flex items-center gap-2 text-[9.5px] tracking-[0.3em] uppercase"
                  style={{ color: slide.accent }}
                >
                  <span
                    className="w-[7px] h-[7px] rounded-full"
                    style={{
                      background: slide.accent,
                      boxShadow: `0 0 10px ${slide.accent}`,
                      animation: "heroPulse 1.6s ease-in-out infinite",
                    }}
                  />
                  Live Metrics
                </span>
                <span
                  className="text-[9px] tracking-[0.2em] uppercase"
                  style={{
                    color: `rgba(${slide.accentRgb},0.5)`,
                  }}
                >
                  {slide.tagline}
                </span>
              </div>
              <div className="px-6 pt-6 pb-4">
                <div
                  className={`${bebassFont} text-[72px] leading-[.9] tracking-[0.02em] mb-1`}
                  style={{
                    color: slide.accent,
                    textShadow: `0 0 60px rgba(${slide.accentRgb},0.7)`,
                  }}
                >
                  {slide.stat.value}
                </div>
                <div className="text-[11px] tracking-[0.25em] text-white/40 uppercase mb-4">
                  {slide.stat.label}
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="h-[3px] bg-white/10 rounded overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        background: `linear-gradient(90deg, ${slide.accent}, ${slide.accent}88)`,
                        boxShadow: `0 0 12px rgba(${slide.accentRgb},0.7)`,
                        width: "100%",
                        animation:
                          "heroBarFill 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s both",
                      }}
                      key={`bar-${current}`}
                    />
                  </div>
                  <span className="text-[9px] text-white/25 tracking-[0.18em] uppercase">
                    Performance Index
                  </span>
                </div>
              </div>
              <div className="px-6 pt-3 pb-4">
                <div className="flex items-center">
                  <div className="flex flex-col gap-0.5 flex-1 items-center">
                    <span
                      className={`${bebassFont} text-[22px] leading-1`}
                      style={{ color: slide.accent }}
                    >
                      24/7
                    </span>
                    <span className="text-[8px] text-white/30 tracking-[0.18em] uppercase">
                      Support
                    </span>
                  </div>
                  <div
                    className="w-px h-[30px] mx-3"
                    style={{
                      background: `rgba(${slide.accentRgb},0.2)`,
                    }}
                  />
                  <div className="flex flex-col gap-0.5 flex-1 items-center">
                    <span
                      className={`${bebassFont} text-[22px] leading-1`}
                      style={{ color: slide.accent }}
                    >
                      ∞
                    </span>
                    <span className="text-[8px] text-white/30 tracking-[0.18em] uppercase">
                      Revisions
                    </span>
                  </div>
                  <div
                    className="w-px h-[30px] mx-3"
                    style={{
                      background: `rgba(${slide.accentRgb},0.2)`,
                    }}
                  />
                  <div className="flex flex-col gap-0.5 flex-1 items-center">
                    <span
                      className={`${bebassFont} text-[22px] leading-1`}
                      style={{ color: slide.accent }}
                    >
                      100%
                    </span>
                    <span className="text-[8px] text-white/30 tracking-[0.18em] uppercase">
                      Dedicated
                    </span>
                  </div>
                </div>
              </div>
              {/* Corner glow */}
              <div
                className="absolute bottom-[-40px] right-[-40px] w-[180px] h-[180px] rounded-full pointer-events-none"
                style={{
                  filter: "blur(40px)",
                  opacity: 0.7,
                  background: `radial-gradient(circle,rgba(${slide.accentRgb},0.2),transparent 70%)`,
                }}
              />
              {/* Corner slash */}
              <div
                className="absolute top-0 right-0 w-[50px] h-[50px]"
                style={{
                  clipPath: "polygon(100% 0,0 0,100% 100%)",
                  opacity: 0.6,
                  background: `linear-gradient(135deg, ${slide.accent}, transparent)`,
                }}
              />
            </div>

            {/* Floating tag */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-[30px] bg-[#04020a]/90 border backdrop-blur-[16px]"
              style={{
                borderColor: `rgba(${slide.accentRgb},0.4)`,
                boxShadow: `0 8px 32px rgba(${slide.accentRgb},0.2)`,
                animation: "heroFloat 4s ease-in-out infinite",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: slide.accent,
                  boxShadow: `0 0 8px ${slide.accent}`,
                }}
              />
              <span
                className="text-[10.5px] tracking-[0.18em] uppercase"
                style={{ color: slide.accent }}
              >
                Available Now
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow controls */}
      <div className="absolute bottom-9 left-4 xl:left-10 flex gap-2.5 z-50">
        {[
          {
            fn: () => {
              prev();
              resetAuto();
            },
            icon: "←",
          },
          {
            fn: () => {
              next();
              resetAuto();
            },
            icon: "→",
          },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={btn.fn}
            className="w-12 h-12 bg-white/5 border border-white/10 text-white/70 text-[18px] cursor-pointer flex items-center justify-center font-mono transition-all duration-200 rounded"
            style={
              {
                "--arr-accent": slide.accent,
                "--arr-rgb": slide.accentRgb,
              } as React.CSSProperties
            }
          >
            {btn.icon}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-50">
        <div
          className="h-full transition-[width] duration-75"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${slide.accent}, ${slide.accent}88)`,
            boxShadow: `0 0 10px rgba(${slide.accentRgb},0.7)`,
          }}
        />
      </div>
      {/* Animations */}
      <style>
        {`
            @keyframes heroPulse {
              0%,100% { opacity:1; transform: scale(1); }
              50%      { opacity:0.4; transform: scale(0.65); }
            }
            @keyframes heroBarFill { from { width: 0 !important; } }
            @keyframes heroSlideUp {
              from { opacity: 0; transform: translateY(50px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes heroFadeUp {
              from { opacity: 0; transform: translateY(28px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes heroFloat {
              0%,100% { transform: translateY(0); }
              50%      { transform: translateY(-6px); }
            }
          `}
      </style>
    </section>
  );
}