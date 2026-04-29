"use client";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    id: 1, number: "01", title: "Discover", tagline: "Understand Your Vision",
    description: "We dive deep into your goals, audience, and challenges through workshops and research to uncover insights that guide every decision.",
    icon: "✦", accent: "#ff4d00", accentRgb: "255,77,0",
    deliverables: ["Stakeholder Interviews", "User Research", "Competitive Analysis", "Project Brief"],
    duration: "1–2 Weeks",
  },
  {
    id: 2, number: "02", title: "Design", tagline: "Craft The Experience",
    description: "Our designers transform insights into wireframes, prototypes, and stunning visuals. Every interaction is tested and refined before development begins.",
    icon: "◈", accent: "#00c8ff", accentRgb: "0,200,255",
    deliverables: ["Wireframes", "UI Mockups", "Interactive Prototypes", "Design System"],
    duration: "2–4 Weeks",
  },
  {
    id: 3, number: "03", title: "Develop", tagline: "Build With Precision",
    description: "Our developers bring designs to life with clean, scalable code using modern frameworks that ensure performance, accessibility, and maintainability.",
    icon: "⬡", accent: "#a855f7", accentRgb: "168,85,247",
    deliverables: ["Frontend Development", "Backend Integration", "API Development", "QA Testing"],
    duration: "3–6 Weeks",
  },
  {
    id: 4, number: "04", title: "Launch", tagline: "Deploy & Optimise",
    description: "We handle deployment, monitoring, and post-launch optimisation. Your success doesn't end at launch — we're here to support growth and iteration.",
    icon: "⬢", accent: "#10d4a0", accentRgb: "16,212,160",
    deliverables: ["Deployment", "Performance Monitoring", "Analytics Setup", "Ongoing Support"],
    duration: "1–2 Weeks",
  },
];

const BENEFITS = [
  { icon: "🔄", title: "Iterative Approach",  desc: "Regular check-ins and feedback loops ensure we stay aligned with your vision throughout." },
  { icon: "📊", title: "Data-Driven",         desc: "Every decision is backed by research, analytics, and measurable business outcomes." },
  { icon: "🤝", title: "Collaborative",       desc: "You're part of the team. We work transparently, together, from discovery to delivery." },
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
const monoFont  = { fontFamily: "'DM Mono','Courier New',monospace" };

function useInView(threshold = 0.1) {
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
  const { ref, inView } = useInView(0.08);
  const [activeStep, setActiveStep] = useState(1);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!inView) return;
    STEPS.forEach((s, i) => setTimeout(() => setVisibleSteps(p => [...p, s.id]), i * 160));
  }, [inView]);

  useEffect(() => {
    const t = setInterval(() => setActiveStep(p => p >= STEPS.length ? 1 : p + 1), 4500);
    return () => clearInterval(t);
  }, []);

  const active = STEPS.find(s => s.id === activeStep)!;

  return (
    <section ref={ref} id="process" className="relative overflow-hidden py-24 xl:py-36"
      style={{ fontFamily: "'DM Mono','Courier New',monospace", background: "linear-gradient(165deg,#050310 0%,#0a0818 45%,#050310 100%)" }}>
      {/* Backgrounds */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(255,77,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.03) 1px,transparent 1px)", backgroundSize: "64px 64px", animation: "sectionGridDrift 32s linear infinite" }} />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 4px)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[800px] h-[800px] -top-48 -left-48" style={{ background: "radial-gradient(circle,rgba(255,77,0,0.10),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[600px] h-[600px] -bottom-24 -right-36" style={{ background: "radial-gradient(circle,rgba(16,212,160,0.08),transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 relative z-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 gap-7 xl:grid-cols-2 xl:gap-[60px] mb-16 xl:mb-20 items-end">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
            <div className="flex items-center gap-3.5 mb-3.5">
              <span className="inline-block w-12 h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
              <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase" style={monoFont}>How We Work</span>
            </div>
            <h2 className="leading-none text-white m-0" style={{ ...bebasFont, fontSize: "clamp(40px,5.5vw,64px)", letterSpacing: "0.03em" }}>
              A Process Built<br />
              <span style={{ color: "#ff4d00", textShadow: "0 0 50px rgba(255,77,0,0.45)" }}>For Results</span>
            </h2>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
            <p className="text-[14px] text-white/50 leading-[1.78] mb-6 max-w-[520px]" style={monoFont}>
              From discovery to launch, our proven methodology ensures clarity, collaboration, and exceptional outcomes at every stage — no surprises, just results.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2.5 px-7 py-3 bg-gradient-to-br from-[#ff4d00] to-[#ff8c00] text-white no-underline text-[11px] tracking-[0.22em] uppercase shadow-[0_6px_28px_rgba(255,77,0,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,77,0,0.55)]"
              style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))", ...monoFont }}>
              Start Your Project <span>→</span>
            </a>
          </div>
        </div>

        {/* ── Process Layout: Steps list left + Active detail right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 xl:gap-12 mb-16 xl:mb-20">

          {/* Left: vertical step list */}
          <div className="relative flex flex-col gap-0">
            {/* Vertical track */}
            <div className="absolute left-[27px] top-8 bottom-8 w-px bg-white/[0.08]" />
            <div className="absolute left-[27px] top-8 w-px transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ height: `${((activeStep - 1) / (STEPS.length - 1)) * 90 + 5}%`, background: "linear-gradient(180deg,#ff4d00,#00c8ff,#a855f7,#10d4a0)", boxShadow: "0 0 16px rgba(255,77,0,0.5)" }} />

            {STEPS.map((step, i) => {
              const isActive = activeStep === step.id;
              const isDone   = activeStep > step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className="relative flex items-start gap-5 text-left px-0 py-5 bg-transparent border-none cursor-pointer group transition-all duration-300"
                  style={{ opacity: visibleSteps.includes(step.id) ? 1 : 0, transform: visibleSteps.includes(step.id) ? "translateX(0)" : "translateX(-24px)", transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s` }}
                >
                  {/* Circle */}
                  <div className="flex-shrink-0 w-[55px] h-[55px] rounded-xl flex items-center justify-center transition-all duration-400 z-10"
                    style={{
                      background: isActive ? `linear-gradient(135deg,${step.accent},${step.accent}cc)` : isDone ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                      border: isActive ? `2px solid ${step.accent}` : "1px solid rgba(255,255,255,0.12)",
                      boxShadow: isActive ? `0 0 0 3px ${step.accent}33, 0 12px 40px rgba(0,0,0,0.4)` : "0 4px 16px rgba(0,0,0,0.2)",
                    }}>
                    <span className="text-xl" style={{ color: isActive || isDone ? step.accent : "rgba(255,255,255,0.3)", transition: "color 0.3s" }}>{step.icon}</span>
                  </div>
                  {/* Text */}
                  <div className="pt-1 flex-1">
                    <div className="flex items-center gap-3 mb-0.5">
                      <span className="text-[9px] tracking-[0.3em] uppercase" style={{ ...monoFont, color: step.accent }}>{step.number}</span>
                      <span className="text-[9px] tracking-[0.2em] uppercase text-white/30" style={monoFont}>{step.duration}</span>
                    </div>
                    <div style={{ ...bebasFont, fontSize: 22, color: isActive ? "#fff" : "rgba(255,255,255,0.55)", letterSpacing: "0.03em", lineHeight: 1, transition: "color 0.3s" }}>{step.title}</div>
                    <div className="text-[10.5px] text-white/30 mt-0.5 transition-colors duration-300" style={{ ...monoFont, ...(isActive ? { color: "rgba(255,255,255,0.55)" } : {}) }}>{step.tagline}</div>
                  </div>
                  {/* Active bar */}
                  {isActive && <div className="absolute right-0 top-0 bottom-0 w-[2px] rounded-full" style={{ background: `linear-gradient(180deg,${step.accent},${step.accent}44)`, boxShadow: `0 0 8px ${step.accent}` }} />}
                </button>
              );
            })}
          </div>

          {/* Right: Active step detail card */}
          <div key={activeStep} className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-7 xl:p-9"
            style={{ boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${active.accent}18, inset 0 1px 0 rgba(255,255,255,0.06)`, borderColor: `${active.accent}33`, animation: "detailFadeIn 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-60 pointer-events-none" style={{ background: `linear-gradient(135deg,${active.accent},transparent)`, clipPath: "polygon(100% 0,0 0,100% 100%)" }} />
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at top right,${active.accent}12,transparent 60%)` }} />

            {/* Ghost number */}
            <div className="absolute bottom-4 right-6 select-none pointer-events-none" style={{ ...bebasFont, fontSize: 100, color: `${active.accent}06`, lineHeight: 1, letterSpacing: "0.04em" }}>{active.number}</div>

            <div className="relative z-10">
              {/* Step header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9.5px] tracking-[0.32em] uppercase" style={{ ...monoFont, color: active.accent }}>{active.number} — {active.tagline}</span>
                  </div>
                  <h3 style={{ ...bebasFont, fontSize: "clamp(36px,4vw,52px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 1, margin: 0 }}>{active.title}</h3>
                </div>
                <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: `${active.accent}20`, border: `1px solid ${active.accent}44`, boxShadow: `0 0 24px ${active.accent}33` }}>
                  {active.icon}
                </div>
              </div>

              <p className="text-[13.5px] text-white/60 leading-[1.8] mb-7" style={monoFont}>{active.description}</p>

              {/* Duration badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7" style={{ background: "rgba(5,3,16,0.8)", border: `1px solid ${active.accent}44` }}>
                <span className="w-[6px] h-[6px] rounded-full" style={{ background: active.accent, boxShadow: `0 0 8px ${active.accent}` }} />
                <span className="text-[10px] tracking-[0.24em] uppercase" style={{ ...monoFont, color: active.accent }}>{active.duration}</span>
              </div>

              {/* Deliverables */}
              <div>
                <span className="text-[9.5px] tracking-[0.3em] text-white/35 uppercase block mb-3" style={monoFont}>Deliverables</span>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/10">
                      <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: active.accent, boxShadow: `0 0 6px ${active.accent}` }} />
                      <span className="text-[11px] text-white/65" style={monoFont}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step progress dots */}
              <div className="flex items-center gap-2 mt-7">
                {STEPS.map(s => (
                  <div key={s.id} className="rounded-sm transition-all duration-400 cursor-pointer" onClick={() => setActiveStep(s.id)}
                    style={{ width: s.id === activeStep ? 28 : 8, height: 3, background: s.id === activeStep ? active.accent : "rgba(255,255,255,0.15)", boxShadow: s.id === activeStep ? `0 0 8px ${active.accent}` : "none" }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Benefits row ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-5">
          {BENEFITS.map((b, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(255,77,0,0.3)]"
              style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.6 + i * 0.1}s`, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
              <div className="text-2xl mb-4">{b.icon}</div>
              <h4 style={{ ...bebasFont, fontSize: 20, color: "#fff", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 8 }}>{b.title}</h4>
              <p className="text-[12px] text-white/45 leading-[1.65] m-0" style={monoFont}>{b.desc}</p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @keyframes sectionGridDrift { 100% { background-position: 64px 64px; } }
        @keyframes detailFadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  );
}