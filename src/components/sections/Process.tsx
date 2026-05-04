"use client";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    id: 1, number: "01", title: "Discover", tagline: "Understand Your Vision",
    description: "We dive deep into your goals, audience, and challenges through workshops and research to uncover insights that guide every decision.",
    icon: "✦", accent: "#ff4d00", accentRgb: "255,77,0",
    deliverables: ["Stakeholder Interviews", "User Research", "Competitive Analysis", "Project Brief"],
    duration: "1–2 Weeks",
    stat: "98%", statLabel: "Client Alignment",
  },
  {
    id: 2, number: "02", title: "Design", tagline: "Craft The Experience",
    description: "Our designers transform insights into wireframes, prototypes, and stunning visuals. Every interaction is tested and refined before development begins.",
    icon: "◈", accent: "#00c8ff", accentRgb: "0,200,255",
    deliverables: ["Wireframes", "UI Mockups", "Interactive Prototypes", "Design System"],
    duration: "2–4 Weeks",
    stat: "3×", statLabel: "Faster Iteration",
  },
  {
    id: 3, number: "03", title: "Develop", tagline: "Build With Precision",
    description: "Our developers bring designs to life with clean, scalable code using modern frameworks that ensure performance, accessibility, and maintainability.",
    icon: "⬡", accent: "#a855f7", accentRgb: "168,85,247",
    deliverables: ["Frontend Development", "Backend Integration", "API Development", "QA Testing"],
    duration: "3–6 Weeks",
    stat: "99.9%", statLabel: "Uptime Delivered",
  },
  {
    id: 4, number: "04", title: "Launch", tagline: "Deploy & Optimise",
    description: "We handle deployment, monitoring, and post-launch optimisation. Your success doesn't end at launch — we're here to support growth and iteration.",
    icon: "⬢", accent: "#10d4a0", accentRgb: "16,212,160",
    deliverables: ["Deployment", "Performance Monitoring", "Analytics Setup", "Ongoing Support"],
    duration: "1–2 Weeks",
    stat: "2×", statLabel: "Avg. ROI Growth",
  },
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
// Updated to Inter font
const sansFont  = { fontFamily: "'Inter', sans-serif" };

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function ProcessSection() {
  const { ref, inView } = useInView();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const highlighted = activeStep ?? hoveredStep;

  return (
    <section
      ref={ref}
      id="process"
      className="relative overflow-hidden py-10 md:py-28 xl:py-24 font-sans"
      style={{ fontFamily: "'Inter', sans-serif", background: "linear-gradient(160deg,#fafafa 0%,#f5f5f5 50%,#fafafa 100%)" }}
    >
      {/* Grid texture - Light Theme */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
      {/* Scanlines - adjusted for light theme */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.01]" style={{ backgroundImage: "repeating-linear-gradient(0deg,#000,#000 1px,transparent 1px,transparent 4px)" }} />
      {/* Glow orbs - reduced opacity for light theme */}
      <div className="absolute pointer-events-none rounded-full blur-[120px] z-0" style={{ width: 700, height: 700, top: "-20%", left: "-10%", background: "radial-gradient(circle,rgba(255,77,0,0.05),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[120px] z-0" style={{ width: 600, height: 600, bottom: "-15%", right: "-8%", background: "radial-gradient(circle,rgba(16,212,160,0.04),transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">

        {/* ── Header ── */}
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-8"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block w-10 h-px" style={{ background: "#ff4d00", boxShadow: "0 0 14px rgba(255,77,0,0.4)" }} />
              <span className="text-[10px] tracking-[0.42em] text-[#ff4d00] uppercase font-semibold" style={sansFont}>How We Work</span>
            </div>
            <h2 className="text-[#1a1a2e] m-0 leading-[0.95]" style={{ ...bebasFont, fontSize: "clamp(44px,5.5vw,70px)", letterSpacing: "0.03em" }}>
              A Process Built<br />
              <span style={{ color: "#ff4d00", textShadow: "0 0 35px rgba(255,77,0,0.3)" }}>For Results</span>
            </h2>
          </div>
          <div className="lg:max-w-[380px]">
            <p className="text-[16px] text-[#4a5568] leading-[1.8] m-0 mb-6 font-medium" style={sansFont}>
              From discovery to launch, our proven methodology ensures clarity, collaboration, and exceptional outcomes at every stage.
            </p>
            <div className="flex items-center gap-6">
              {["50+ Projects", "4.9★ Rating", "Since 2019"].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#ff4d00]" />
                  <span className="text-[11px] tracking-[0.2em] text-[#6b7280] uppercase font-medium" style={sansFont}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Timeline connector (desktop) ── */}
        <div className="relative hidden lg:flex items-center justify-between mb-0 px-[calc(12.5%-18px)]" style={{ height: 72 }}>
          <div className="absolute inset-x-[calc(12.5%-18px)] top-1/2 h-px -translate-y-1/2 bg-black/[0.08]" />
          <div
            className="absolute left-[calc(12.5%-18px)] top-1/2 h-px -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              width: highlighted ? `${((highlighted - 1) / (STEPS.length - 1)) * 100}%` : "0%",
              background: "linear-gradient(90deg,#ff4d00,#00c8ff,#a855f7,#10d4a0)",
              boxShadow: "0 0 16px rgba(255,77,0,0.35)",
            }}
          />
          {STEPS.map((step) => {
            const isLit = highlighted !== null && step.id <= highlighted;
            return (
              <div
                key={step.id}
                className="relative flex flex-col items-center cursor-pointer z-10"
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-400"
                  style={{
                    background: isLit ? step.accent : "rgba(255,255,255,1)",
                    border: `2px solid ${isLit ? step.accent : "rgba(0,0,0,0.15)"}`,
                    boxShadow: isLit ? `0 0 0 4px rgba(${step.accentRgb},0.22), 0 0 20px rgba(${step.accentRgb},0.45)` : "none",
                  }}
                >
                  <span style={{ fontSize: 12, color: isLit ? "#fff" : "#9ca3af" }}>{step.icon}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Cards row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 xl:gap-5">
          {STEPS.map((step, i) => {
            const isActive = activeStep === step.id;
            const isHovered = hoveredStep === step.id;
            const isDimmed = highlighted !== null && step.id !== highlighted;

            return (
              <div
                key={step.id}
                className="relative cursor-pointer"
                onClick={() => setActiveStep(isActive ? null : step.id)}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{
                  opacity: inView ? (isDimmed ? 0.5 : 1) : 0,
                  transform: inView
                    ? isActive ? "translateY(-8px)" : "translateY(0)"
                    : "translateY(36px)",
                  transition: `opacity 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease, opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.11}s`,
                  filter: isDimmed ? "saturate(0.4)" : "saturate(1)",
                }}
              >
                {isActive && (
                  <div
                    className="absolute -inset-px rounded-2xl pointer-events-none z-0"
                    style={{ background: `linear-gradient(135deg,rgba(${step.accentRgb},0.18),transparent,rgba(${step.accentRgb},0.08))`, filter: "blur(1px)" }}
                  />
                )}

                <div
                  className="relative rounded-2xl border overflow-hidden transition-all duration-400 flex flex-col"
                  style={{
                    background: isActive
                      ? `linear-gradient(145deg,rgba(${step.accentRgb},0.08) 0%,rgba(255,255,255,0.98) 60%)`
                      : isHovered
                      ? "linear-gradient(145deg,rgba(0,0,0,0.04),rgba(0,0,0,0.02))"
                      : "linear-gradient(145deg,rgba(0,0,0,0.03),rgba(0,0,0,0.01))",
                    borderColor: isActive ? `rgba(${step.accentRgb},0.55)` : isHovered ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.1)",
                    boxShadow: isActive
                      ? `0 24px 60px rgba(0,0,0,0.12), 0 0 50px rgba(${step.accentRgb},0.12), inset 0 1px 0 rgba(255,255,255,0.9)`
                      : "0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="h-[2px] w-full transition-all duration-500"
                    style={{
                      background: isActive
                        ? `linear-gradient(90deg,${step.accent},rgba(${step.accentRgb},0.44),transparent)`
                        : isHovered
                        ? `linear-gradient(90deg,rgba(${step.accentRgb},0.66),transparent)`
                        : "transparent",
                    }}
                  />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <span className="text-[9px] tracking-[0.38em] uppercase block mb-1.5 font-semibold" style={{ ...sansFont, color: step.accent }}>
                          Step {step.number}
                        </span>
                        <div
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                          style={{ background: `rgba(${step.accentRgb},0.12)`, border: `1px solid rgba(${step.accentRgb},0.33)` }}
                        >
                          <span className="w-[5px] h-[5px] rounded-full" style={{ background: step.accent, boxShadow: `0 0 6px rgba(${step.accentRgb},0.5)` }} />
                          <span className="text-[9px] tracking-[0.22em] uppercase font-semibold" style={{ ...sansFont, color: step.accent }}>{step.duration}</span>
                        </div>
                      </div>
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isActive ? `rgba(${step.accentRgb},0.18)` : "rgba(0,0,0,0.04)",
                          border: `1px solid ${isActive ? `rgba(${step.accentRgb},0.44)` : "rgba(0,0,0,0.12)"}`,
                          boxShadow: isActive ? `0 0 24px rgba(${step.accentRgb},0.35)` : "none",
                          transform: isActive ? "rotate(15deg) scale(1.05)" : "rotate(0deg) scale(1)",
                        }}
                      >
                        <span style={{ color: isActive || isHovered ? step.accent : "#9ca3af", transition: "color 0.3s" }}>{step.icon}</span>
                      </div>
                    </div>

                    {/* Title & tagline */}
                    <h3 className="m-0 mb-1 leading-[0.95]"
                      style={{ ...bebasFont, fontSize: 32, color: isActive || isHovered ? "#1a1a2e" : "rgba(26,26,46,0.65)", letterSpacing: "0.03em", transition: "color 0.3s" }}>
                      {step.title}
                    </h3>
                    <p className="text-[10px] tracking-[0.18em] uppercase mb-4 transition-colors duration-300 font-semibold"
                      style={{ ...sansFont, color: isActive ? step.accent : "#6b7280" }}>
                      {step.tagline}
                    </p>

                    {/* Divider */}
                    <div className="h-px mb-4 transition-all duration-500"
                      style={{ background: isActive ? `linear-gradient(90deg,rgba(${step.accentRgb},0.44),transparent)` : "rgba(0,0,0,0.1)" }} />

                    {/* Description */}
                    <p className="text-[15px] leading-[1.6] mb-5 flex-1 transition-all duration-300 font-medium"
                      style={{ ...sansFont, color: isActive ? "#4a5568" : "#6b7280" }}>
                      {step.description}
                    </p>

                    {/* Stat callout */}
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl mb-4 transition-all duration-400"
                      style={{
                        background: isActive ? `rgba(${step.accentRgb},0.08)` : "rgba(0,0,0,0.03)",
                        border: `1px solid ${isActive ? `rgba(${step.accentRgb},0.33)` : "rgba(0,0,0,0.1)"}`,
                      }}
                    >
                      <span style={{ ...bebasFont, fontSize: 26, color: isActive ? step.accent : "#6b7280", letterSpacing: "0.04em", lineHeight: 1 }}>{step.stat}</span>
                      <span className="text-[10px] tracking-[0.14em] uppercase text-[#6b7280] leading-tight font-medium" style={sansFont}>{step.statLabel}</span>
                    </div>

                    {/* Deliverables — expand on active */}
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{ maxHeight: isActive ? "220px" : "0px", opacity: isActive ? 1 : 0 }}
                    >
                      <span className="text-[8.5px] tracking-[0.36em] text-[#6b7280] uppercase block mb-3 font-semibold" style={sansFont}>Deliverables</span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {step.deliverables.map((d, di) => (
                          <div key={di} className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
                            style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)" }}>
                            <span className="w-[4px] h-[4px] rounded-full flex-shrink-0" style={{ background: step.accent, boxShadow: `0 0 6px rgba(${step.accentRgb},0.4)` }} />
                            <span className="text-[11px] text-[#4a5568] font-medium" style={sansFont}>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div
          className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-6 rounded-2xl border border-black/[0.1]"
          style={{
            background: "linear-gradient(135deg,rgba(255,77,0,0.08),rgba(0,0,0,0.02))",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base"
              style={{ background: "rgba(255,77,0,0.12)", border: "1px solid rgba(255,77,0,0.35)" }}>
              ⚡
            </div>
            <div>
              <p className="text-[#1a1a2e] m-0 mb-0.5" style={{ ...bebasFont, fontSize: 18, letterSpacing: "0.04em" }}>Ready to start your project?</p>
              <p className="text-[11px] text-[#6b7280] m-0 font-medium" style={sansFont}>Typical kickoff within 48 hours of first contact.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-white no-underline text-[11px] tracking-[0.26em] uppercase whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 font-semibold"
            style={{
              ...sansFont,
              background: "linear-gradient(135deg,#ff4d00,#ff7a00)",
              clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
              boxShadow: "0 8px 32px rgba(255,77,0,0.35)",
            }}
          >
            Start Your Project <span>→</span>
          </a>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}