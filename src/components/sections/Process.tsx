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
const monoFont  = { fontFamily: "'DM Mono','Courier New',monospace" };

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
      className="relative overflow-hidden py-28 xl:py-36"
      style={{ fontFamily: "'DM Mono','Courier New',monospace", background: "linear-gradient(160deg,#04020f 0%,#080618 50%,#04020f 100%)" }}
    >
      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.015]" style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff,#fff 1px,transparent 1px,transparent 4px)" }} />
      {/* Glow orbs */}
      <div className="absolute pointer-events-none rounded-full blur-[120px] z-0" style={{ width: 700, height: 700, top: "-20%", left: "-10%", background: "radial-gradient(circle,rgba(255,77,0,0.08),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[120px] z-0" style={{ width: 600, height: 600, bottom: "-15%", right: "-8%", background: "radial-gradient(circle,rgba(16,212,160,0.07),transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">

        {/* ── Header ── */}
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-8"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block w-10 h-px" style={{ background: "#ff4d00", boxShadow: "0 0 14px #ff4d00" }} />
              <span className="text-[10px] tracking-[0.42em] text-[#ff4d00] uppercase" style={monoFont}>How We Work</span>
            </div>
            <h2 className="text-white m-0 leading-[0.95]" style={{ ...bebasFont, fontSize: "clamp(44px,5.5vw,70px)", letterSpacing: "0.03em" }}>
              A Process Built<br />
              <span style={{ color: "#ff4d00", textShadow: "0 0 60px rgba(255,77,0,0.5)" }}>For Results</span>
            </h2>
          </div>
          <div className="lg:max-w-[380px]">
            <p className="text-[13.5px] text-[#7a8fa8] leading-[1.8] m-0 mb-6" style={monoFont}>
              From discovery to launch, our proven methodology ensures clarity, collaboration, and exceptional outcomes at every stage.
            </p>
            <div className="flex items-center gap-6">
              {["50+ Projects", "4.9★ Rating", "Since 2019"].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#ff4d00]" />
                  <span className="text-[10px] tracking-[0.2em] text-[#5e6e84] uppercase" style={monoFont}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Timeline connector (desktop) ── */}
        <div className="relative hidden lg:flex items-center justify-between mb-0 px-[calc(12.5%-18px)]" style={{ height: 72 }}>
          <div className="absolute inset-x-[calc(12.5%-18px)] top-1/2 h-px -translate-y-1/2 bg-white/[0.07]" />
          <div
            className="absolute left-[calc(12.5%-18px)] top-1/2 h-px -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              width: highlighted ? `${((highlighted - 1) / (STEPS.length - 1)) * 100}%` : "0%",
              background: "linear-gradient(90deg,#ff4d00,#00c8ff,#a855f7,#10d4a0)",
              boxShadow: "0 0 16px rgba(255,77,0,0.5)",
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
                    background: isLit ? step.accent : "rgba(10,8,24,1)",
                    border: `2px solid ${isLit ? step.accent : "rgba(255,255,255,0.15)"}`,
                    boxShadow: isLit ? `0 0 0 4px ${step.accent}22, 0 0 20px ${step.accent}55` : "none",
                  }}
                >
                  <span style={{ fontSize: 12, color: isLit ? "#fff" : "#5e6e84" }}>{step.icon}</span>
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
                  opacity: inView ? (isDimmed ? 0.45 : 1) : 0,
                  transform: inView
                    ? isActive ? "translateY(-8px)" : "translateY(0)"
                    : "translateY(36px)",
                  transition: `opacity 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease, opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.11}s`,
                  filter: isDimmed ? "saturate(0.3)" : "saturate(1)",
                }}
              >
                {isActive && (
                  <div
                    className="absolute -inset-px rounded-2xl pointer-events-none z-0"
                    style={{ background: `linear-gradient(135deg,${step.accent}44,transparent,${step.accent}22)`, filter: "blur(1px)" }}
                  />
                )}

                <div
                  className="relative rounded-2xl border overflow-hidden transition-all duration-400 flex flex-col"
                  style={{
                    background: isActive
                      ? `linear-gradient(145deg,rgba(${step.accentRgb},0.12) 0%,rgba(5,3,16,0.95) 60%)`
                      : isHovered
                      ? "linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))"
                      : "linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",
                    borderColor: isActive ? `${step.accent}55` : isHovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)",
                    boxShadow: isActive
                      ? `0 24px 60px rgba(0,0,0,0.5), 0 0 50px ${step.accent}1a, inset 0 1px 0 rgba(255,255,255,0.07)`
                      : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="h-[2px] w-full transition-all duration-500"
                    style={{
                      background: isActive
                        ? `linear-gradient(90deg,${step.accent},${step.accent}44,transparent)`
                        : isHovered
                        ? `linear-gradient(90deg,${step.accent}66,transparent)`
                        : "transparent",
                    }}
                  />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <span className="text-[9px] tracking-[0.38em] uppercase block mb-1.5" style={{ ...monoFont, color: step.accent }}>
                          Step {step.number}
                        </span>
                        <div
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                          style={{ background: `${step.accent}15`, border: `1px solid ${step.accent}33` }}
                        >
                          <span className="w-[5px] h-[5px] rounded-full" style={{ background: step.accent, boxShadow: `0 0 6px ${step.accent}` }} />
                          <span className="text-[9px] tracking-[0.22em] uppercase" style={{ ...monoFont, color: step.accent }}>{step.duration}</span>
                        </div>
                      </div>
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isActive ? `${step.accent}22` : "rgba(255,255,255,0.04)",
                          border: `1px solid ${isActive ? step.accent + "44" : "rgba(255,255,255,0.08)"}`,
                          boxShadow: isActive ? `0 0 24px ${step.accent}44` : "none",
                          transform: isActive ? "rotate(15deg) scale(1.05)" : "rotate(0deg) scale(1)",
                        }}
                      >
                        <span style={{ color: isActive || isHovered ? step.accent : "#697a90", transition: "color 0.3s" }}>{step.icon}</span>
                      </div>
                    </div>

                    {/* Title & tagline */}
                    <h3 className="m-0 mb-1 leading-[0.95]"
                      style={{ ...bebasFont, fontSize: 32, color: isActive || isHovered ? "#fff" : "rgba(255,255,255,0.65)", letterSpacing: "0.03em", transition: "color 0.3s" }}>
                      {step.title}
                    </h3>
                    <p className="text-[10px] tracking-[0.18em] uppercase mb-4 transition-colors duration-300"
                      style={{ ...monoFont, color: isActive ? step.accent : "#4d5f75" }}>
                      {step.tagline}
                    </p>

                    {/* Divider */}
                    <div className="h-px mb-4 transition-all duration-500"
                      style={{ background: isActive ? `linear-gradient(90deg,${step.accent}44,transparent)` : "rgba(255,255,255,0.06)" }} />

                    {/* Description */}
                    <p className="text-[12px] leading-[1.8] mb-5 flex-1 transition-all duration-300"
                      style={{ ...monoFont, color: isActive ? "#a8bdd4" : "#5a6e84" }}>
                      {step.description}
                    </p>

                    {/* Stat callout */}
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl mb-4 transition-all duration-400"
                      style={{
                        background: isActive ? `${step.accent}12` : "rgba(255,255,255,0.03)",
                        border: `1px solid ${isActive ? step.accent + "33" : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      <span style={{ ...bebasFont, fontSize: 26, color: isActive ? step.accent : "#4a5a6e", letterSpacing: "0.04em", lineHeight: 1 }}>{step.stat}</span>
                      <span className="text-[10px] tracking-[0.14em] uppercase text-[#5a6e84] leading-tight" style={monoFont}>{step.statLabel}</span>
                    </div>

                    {/* Deliverables — expand on active */}
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{ maxHeight: isActive ? "220px" : "0px", opacity: isActive ? 1 : 0 }}
                    >
                      <span className="text-[8.5px] tracking-[0.36em] text-[#4d5f75] uppercase block mb-3" style={monoFont}>Deliverables</span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {step.deliverables.map((d, di) => (
                          <div key={di} className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <span className="w-[4px] h-[4px] rounded-full flex-shrink-0" style={{ background: step.accent, boxShadow: `0 0 6px ${step.accent}` }} />
                            <span className="text-[11px] text-[#8a9eb8]" style={monoFont}>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expand hint */}
                    <div className="flex items-center gap-2 mt-4">
                      <span className="text-[9px] tracking-[0.24em] uppercase transition-colors duration-300"
                        style={{ ...monoFont, color: isActive ? step.accent : "#3a4a5a" }}>
                        {isActive ? "Click to collapse" : "Click to explore"}
                      </span>
                      <span className="transition-all duration-300"
                        style={{ color: isActive ? step.accent : "#3a4a5a", transform: isActive ? "rotate(180deg)" : "rotate(0deg)", fontSize: 10 }}>
                        ▾
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div
          className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-6 rounded-2xl border border-white/[0.07]"
          style={{
            background: "linear-gradient(135deg,rgba(255,77,0,0.06),rgba(255,255,255,0.02))",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base"
              style={{ background: "rgba(255,77,0,0.15)", border: "1px solid rgba(255,77,0,0.3)" }}>
              ⚡
            </div>
            <div>
              <p className="text-white m-0 mb-0.5" style={{ ...bebasFont, fontSize: 18, letterSpacing: "0.04em" }}>Ready to start your project?</p>
              <p className="text-[11px] text-[#5e6e84] m-0" style={monoFont}>Typical kickoff within 48 hours of first contact.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-white no-underline text-[11px] tracking-[0.26em] uppercase whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5"
            style={{
              ...monoFont,
              background: "linear-gradient(135deg,#ff4d00,#ff7a00)",
              clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
              boxShadow: "0 8px 32px rgba(255,77,0,0.4)",
            }}
          >
            Start Your Project <span>→</span>
          </a>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}