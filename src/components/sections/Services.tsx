"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    id: 1,
    number: "01",
    icon: "◈",
    title: "Web Design",
    slug: "web-design",
    tagline: "Websites that convert",
    accent: "#ff4d00",
    accentRgb: "255,77,0",
    problem:
      "Most websites look generic, load slowly, and fail to communicate value — costing you leads every day.",
    solution:
      "We design high-converting, pixel-perfect websites tailored to your brand — built to guide visitors toward action.",
    result:
      "Clients typically see 2–3× improvement in conversion rates and measurable drop in bounce within 30 days.",
    features: [
      "Responsive & mobile-first",
      "Conversion-optimized layouts",
      "Brand-aligned UI system",
      "Lightning fast load times",
    ],
  },
  {
    id: 2,
    number: "02",
    icon: "✦",
    title: "Graphic Design",
    slug: "graphic-design",
    tagline: "Visuals that build trust",
    accent: "#00c8ff",
    accentRgb: "0,200,255",
    problem:
      "Inconsistent branding makes businesses look unreliable and forgettable, losing trust before a word is read.",
    solution:
      "We craft cohesive brand identities — logos, color systems, typography, and assets that work across every touchpoint.",
    result:
      "A strong visual identity increases perceived value, improves brand recall, and accelerates client trust-building.",
    features: [
      "Logo & brand identity",
      "Social media assets",
      "Marketing collateral",
      "Style guides & systems",
    ],
  },
  {
    id: 3,
    number: "03",
    slug: "web-development",
    icon: "⬡",
    title: "Web Development",
    tagline: "Code built to perform",
    accent: "#a855f7",
    accentRgb: "168,85,247",
    problem:
      "Slow, buggy, or poorly architected websites frustrate users and hurt SEO — both costing you revenue.",
    solution:
      "We build clean, scalable front-end and back-end solutions using modern frameworks with performance as a priority.",
    result:
      "Fast, stable applications with 99.9% uptime that scale seamlessly as your business grows.",
    features: [
      "Next.js & React",
      "TypeScript & clean code",
      "API integrations",
      "SEO & performance optimized",
    ],
  },
  {
    id: 4,
    slug: "full-stack",
    number: "04",
    icon: "⬢",
    title: "Full Stack",
    tagline: "End-to-end excellence",
    accent: "#10d4a0",
    accentRgb: "16,212,160",
    problem:
      "Coordinating separate design and dev teams wastes time, creates miscommunication, and delays your launch.",
    solution:
      "We handle everything — database architecture, APIs, UI, and deployment — under one roof with total alignment.",
    result:
      "Faster delivery (5× average), lower cost, and a product that's cohesive from the first pixel to the final query.",
    features: [
      "Database & API design",
      "Auth & security",
      "Cloud deployment",
      "Full project ownership",
    ],
  },
  {
    slug: "shopify",
    id: 5,
    number: "05",
    icon: "◉",
    title: "Shopify",
    tagline: "Stores built to sell more",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    problem:
      "Default Shopify themes are generic, slow, and don't reflect your brand — leaving revenue on the table.",
    solution:
      "We build fully custom Shopify themes and apps, optimised for conversion, speed, and seamless UX.",
    result:
      "Clients average 3× ROI boost post-launch through better UX, faster checkout, and higher average order values.",
    features: [
      "Custom Shopify themes",
      "App integration & dev",
      "Checkout optimisation",
      "Shopify Plus expertise",
    ],
  },
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
// Updated to Inter font
const sansFont = { fontFamily: "'Inter', sans-serif" };

function useInView(threshold = 0.08) {
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

export default function ServicesSection() {
  const { ref, inView } = useInView(0.06);
  const [activeId, setActiveId] = useState(1);
  const active = SERVICES.find((s) => s.id === activeId)!;

  return (
    <section
      ref={ref}
      id="services"
      className="relative overflow-hidden pt-[6vh] md:pb-[14vh] pb-[8vh] font-sans"
      style={{
        fontFamily: "'Inter', sans-serif",
        background:
          "linear-gradient(165deg,#fafafa 0%,#f5f5f5 45%,#fafafa 100%)",
      }}
    >
      {/* Backgrounds - Light Theme */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          animation: "servGridDrift 28s linear infinite",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.01) 3px,rgba(0,0,0,0.01) 4px)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[110px] z-0 w-[800px] h-[800px] -top-48 -left-48"
        style={{
          background:
            "radial-gradient(circle,rgba(255,77,0,0.06),transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[600px] h-[600px] top-[40%] -right-36"
        style={{
          background: `radial-gradient(circle,${active.accent}0f,transparent 70%)`,
          transition: "all 0.8s ease",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[500px] h-[500px] -bottom-24 left-[25%]"
        style={{
          background:
            "radial-gradient(circle,rgba(168,85,247,0.04),transparent 70%)",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 relative z-10">
        {/* ── Section header ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 xl:gap-[60px] mb-14 xl:mb-16 items-end">
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="flex items-center gap-3.5 mb-3.5">
              <span className="inline-block w-12 h-px bg-[#ff4d00] shadow-[0_0_12px_rgba(255,77,0,0.4)]" />
              <span
                className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase font-semibold"
                style={sansFont}
              >
                What We Do
              </span>
            </div>
            <h2
              className="leading-none text-[#1a1a2e] m-0"
              style={{
                ...bebasFont,
                fontSize: "clamp(40px,5.5vw,64px)",
                letterSpacing: "0.03em",
              }}
            >
              Services That Help
              <br />
              <span
                style={{
                  color: "#ff4d00",
                  textShadow: "0 0 35px rgba(255,77,0,0.3)",
                }}
              >
                Your Business Grow
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
              className="text-[16px] text-[#4a5568] leading-[1.78] mb-6 max-w-[520px] font-medium"
              style={sansFont}
            >
              Every service is built around one goal: real, measurable results
              for your business. We solve problems, craft solutions, and deliver
              outcomes that matter.
            </p>
            <div className="flex items-center gap-2.5">
              <span
                className="w-[7px] h-[7px] rounded-full"
                style={{
                  background: "#10d4a0",
                  boxShadow: "0 0 10px rgba(16,212,160,0.5)",
                  animation: "servPulse 1.8s ease-in-out infinite",
                }}
              />
              <span
                className="text-[12px] text-[#6b7280] tracking-[0.08em] font-medium"
                style={sansFont}
              >
                5 core services · end-to-end delivery
              </span>
            </div>
          </div>
        </div>

        {/* ── Main layout: tab list left + detail right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr] gap-5 xl:gap-6">
          {/* ── Left: service selector tabs ── */}
          <div
            className="flex flex-col gap-2.5"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-28px)",
              transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.18s",
            }}
          >
            {SERVICES.map((s) => {
              const isActive = activeId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className="relative flex items-center gap-4 px-5 py-4 text-left bg-transparent border cursor-pointer transition-all duration-350 group overflow-hidden"
                  style={{
                    borderColor: isActive
                      ? `${s.accent}66`
                      : "rgba(0,0,0,0.12)",
                    background: isActive
                      ? `linear-gradient(135deg,${s.accent}14,rgba(0,0,0,0.02))`
                      : "rgba(0,0,0,0.03)",
                    borderRadius: 14,
                    boxShadow: isActive
                      ? `0 4px 24px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)`
                      : "none",
                  }}
                >
                  {/* Active left bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-sm transition-all duration-350"
                    style={{
                      background: isActive ? s.accent : "transparent",
                      boxShadow: isActive ? `0 0 10px rgba(${s.accentRgb},0.4)` : "none",
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isActive
                        ? `${s.accent}18`
                        : "rgba(0,0,0,0.04)",
                      border: `1px solid ${isActive ? s.accent + "66" : "rgba(0,0,0,0.12)"}`,
                      color: isActive ? s.accent : "rgba(26,26,46,0.4)",
                      boxShadow: isActive ? `0 0 16px rgba(${s.accentRgb},0.2)` : "none",
                    }}
                  >
                    {s.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        style={{
                          ...sansFont,
                          fontSize: 9,
                          color: isActive ? s.accent : "#6b7280",
                          letterSpacing: "0.28em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        {s.number}
                      </span>
                    </div>
                    <div
                      style={{
                        ...bebasFont,
                        fontSize: 19,
                        color: isActive ? "#1a1a2e" : "rgba(26,26,46,0.55)",
                        letterSpacing: "0.03em",
                        lineHeight: 1,
                        transition: "color 0.3s",
                      }}
                    >
                      {s.title}
                    </div>
                    <div
                      className="text-[10px] text-[#6b7280] mt-0.5 transition-colors duration-300 font-medium"
                      style={{
                        ...sansFont,
                        color: isActive ? "rgba(26,26,46,0.6)" : undefined,
                      }}
                    >
                      {s.tagline}
                    </div>
                  </div>

                  {/* Arrow */}
                  <span
                    className="text-[12px] transition-all duration-300 flex-shrink-0"
                    style={{
                      color: isActive ? s.accent : "#9ca3af",
                      transform: isActive ? "translateX(2px)" : "translateX(0)",
                    }}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Right: active service detail ── */}
          <div
            key={activeId}
            className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-[#fafafa]"
            style={{
              borderColor: `${active.accent}44`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.08), 0 0 50px rgba(${active.accentRgb},0.08), inset 0 1px 0 rgba(255,255,255,0.9)`,
              animation: "servFadeIn 0.42s cubic-bezier(0.16,1,0.3,1) both",
              opacity: inView ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            {/* Corner accent */}
            <div
              className="absolute top-0 right-0 w-28 h-28 opacity-55 pointer-events-none"
              style={{
                background: `linear-gradient(135deg,${active.accent},transparent)`,
                clipPath: "polygon(100% 0,0 0,100% 100%)",
              }}
            />
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at top right,rgba(${active.accentRgb},0.05),transparent 60%)`,
              }}
            />
            {/* Ghost number */}
            <div
              className="absolute bottom-5 right-7 select-none pointer-events-none"
              style={{
                ...bebasFont,
                fontSize: 110,
                color: `rgba(${active.accentRgb},0.05)`,
                lineHeight: 1,
                letterSpacing: "0.04em",
              }}
            >
              {active.number}
            </div>

            <div className="relative p-7 xl:p-10">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span
                      className="inline-block w-6 h-px"
                      style={{
                        background: active.accent,
                        boxShadow: `0 0 8px rgba(${active.accentRgb},0.4)`,
                      }}
                    />
                    <span
                      className="text-[9.5px] tracking-[0.32em] uppercase font-semibold"
                      style={{ ...sansFont, color: active.accent }}
                    >
                      {active.number} — {active.tagline}
                    </span>
                  </div>
                  <h3
                    style={{
                      ...bebasFont,
                      fontSize: "clamp(34px,4vw,52px)",
                      color: "#1a1a2e",
                      letterSpacing: "0.03em",
                      lineHeight: 1,
                      margin: 0,
                    }}
                  >
                    {active.title}
                  </h3>
                </div>
                <div
                  className="w-14 h-14 xl:w-16 xl:h-16 rounded-2xl flex items-center justify-center text-2xl xl:text-3xl flex-shrink-0"
                  style={{
                    background: `rgba(${active.accentRgb},0.12)`,
                    border: `1px solid rgba(${active.accentRgb},0.44)`,
                    color: active.accent,
                    boxShadow: `0 0 24px rgba(${active.accentRgb},0.2)`,
                  }}
                >
                  {active.icon}
                </div>
              </div>

              {/* Problem / Solution / Result */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    label: "Problem",
                    text: active.problem,
                    accent: "#ef4444",
                    icon: "✕",
                  },
                  {
                    label: "Solution",
                    text: active.solution,
                    accent: active.accent,
                    icon: "→",
                  },
                  {
                    label: "Result",
                    text: active.result,
                    accent: "#10d4a0",
                    icon: "✓",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-3 p-4 rounded-xl border bg-white"
                    style={{
                      borderColor: `rgba(${item.accent === active.accent ? active.accentRgb : item.accent === "#ef4444" ? "239,68,68" : "16,212,160"},0.3)`,
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.9)`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-[12.5px] font-bold flex-shrink-0"
                        style={{
                          background: item.accent === active.accent 
                            ? `rgba(${active.accentRgb},0.15)` 
                            : item.accent === "#ef4444" 
                              ? "rgba(239,68,68,0.12)" 
                              : "rgba(16,212,160,0.12)",
                          border: `1px solid ${item.accent}44`,
                          color: item.accent,
                        }}
                      >
                        {item.icon}
                      </div>
                      <span
                        className="text-[9px] tracking-[0.28em] uppercase font-semibold"
                        style={{ ...sansFont, color: item.accent }}
                      >
                        {item.label}
                      </span>
                    </div>
                    <p
                      className="text-[13.5px] text-[#4a5568] leading-[1.7] m-0 font-medium"
                      style={sansFont}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mb-8">
                <span
                  className="text-[9px] tracking-[0.3em] text-[#6b7280] uppercase block mb-3 font-semibold"
                  style={sansFont}
                >
                  What's included
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.features.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white border border-black/10"
                    >
                      <span
                        className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                        style={{
                          background: active.accent,
                          boxShadow: `0 0 6px rgba(${active.accentRgb},0.4)`,
                        }}
                      />
                      <span
                        className="text-[13px] text-[#4a5568] font-medium"
                        style={sansFont}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href={`/services/${active.slug}`}
                  className="inline-flex items-center gap-2.5 py-3 px-7 text-white text-[12.5px] tracking-[0.22em] uppercase no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(255,77,0,0.35)] active:scale-95 font-semibold"
                  style={{
                    ...sansFont,
                    background: `linear-gradient(135deg,${active.accent},${active.accent}cc)`,
                    clipPath:
                      "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
                    boxShadow: `0 6px 24px rgba(${active.accentRgb},0.35)`,
                  }}
                >
                  Learn More <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom: mini service pills (mobile quick nav) ── */}
        <div
          className="flex flex-wrap gap-2.5 mt-8 lg:hidden"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.7s ease 0.4s",
          }}
        >
          {SERVICES.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.slug}`}
              className="px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase border transition-all duration-300 font-semibold"
              style={{
                ...sansFont,
                background:
                  activeId === s.id ? s.accent : "rgba(0,0,0,0.04)",
                color: activeId === s.id ? "#fff" : "rgba(26,26,46,0.6)",
                borderColor:
                  activeId === s.id ? s.accent : "rgba(0,0,0,0.15)",
                boxShadow:
                  activeId === s.id ? `0 0 16px rgba(${s.accentRgb},0.35)` : "none",
              }}
            >
              {s.title}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes servGridDrift { 100% { background-position: 64px 64px; } }
        @keyframes servPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.6)} }
        @keyframes servFadeIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  );
}