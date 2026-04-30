"use client";
import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    id: 1,
    number: "01",
    icon: "◈",
    title: "Web Design",
    tagline: "Websites that convert",
    accent: "#ff4d00",
    accentRgb: "255,77,0",
    problem: "Most websites look generic, load slowly, and fail to communicate value — costing you leads every day.",
    solution: "We design high-converting, pixel-perfect websites tailored to your brand — built to guide visitors toward action.",
    result: "Clients typically see 2–3× improvement in conversion rates and measurable drop in bounce within 30 days.",
    features: ["Responsive & mobile-first", "Conversion-optimized layouts", "Brand-aligned UI system", "Lightning fast load times"],
  },
  {
    id: 2,
    number: "02",
    icon: "✦",
    title: "Graphic Design",
    tagline: "Visuals that build trust",
    accent: "#00c8ff",
    accentRgb: "0,200,255",
    problem: "Inconsistent branding makes businesses look unreliable and forgettable, losing trust before a word is read.",
    solution: "We craft cohesive brand identities — logos, color systems, typography, and assets that work across every touchpoint.",
    result: "A strong visual identity increases perceived value, improves brand recall, and accelerates client trust-building.",
    features: ["Logo & brand identity", "Social media assets", "Marketing collateral", "Style guides & systems"],
  },
  {
    id: 3,
    number: "03",
    icon: "⬡",
    title: "Web Development",
    tagline: "Code built to perform",
    accent: "#a855f7",
    accentRgb: "168,85,247",
    problem: "Slow, buggy, or poorly architected websites frustrate users and hurt SEO — both costing you revenue.",
    solution: "We build clean, scalable front-end and back-end solutions using modern frameworks with performance as a priority.",
    result: "Fast, stable applications with 99.9% uptime that scale seamlessly as your business grows.",
    features: ["Next.js & React", "TypeScript & clean code", "API integrations", "SEO & performance optimized"],
  },
  {
    id: 4,
    number: "04",
    icon: "⬢",
    title: "Full Stack",
    tagline: "End-to-end excellence",
    accent: "#10d4a0",
    accentRgb: "16,212,160",
    problem: "Coordinating separate design and dev teams wastes time, creates miscommunication, and delays your launch.",
    solution: "We handle everything — database architecture, APIs, UI, and deployment — under one roof with total alignment.",
    result: "Faster delivery (5× average), lower cost, and a product that's cohesive from the first pixel to the final query.",
    features: ["Database & API design", "Auth & security", "Cloud deployment", "Full project ownership"],
  },
  {
    id: 5,
    number: "05",
    icon: "◉",
    title: "Shopify",
    tagline: "Stores built to sell more",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    problem: "Default Shopify themes are generic, slow, and don't reflect your brand — leaving revenue on the table.",
    solution: "We build fully custom Shopify themes and apps, optimised for conversion, speed, and seamless UX.",
    result: "Clients average 3× ROI boost post-launch through better UX, faster checkout, and higher average order values.",
    features: ["Custom Shopify themes", "App integration & dev", "Checkout optimisation", "Shopify Plus expertise"],
  },
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
const monoFont  = { fontFamily: "'DM Mono','Courier New',monospace" };

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function ServicesSection() {
  const { ref, inView } = useInView(0.06);
  const [activeId, setActiveId] = useState(1);
  const active = SERVICES.find(s => s.id === activeId)!;

  return (
    <section
      ref={ref}
      id="services"
      className="relative overflow-hidden pt-[6vh] md:pb-[14vh] pb-[8vh]"
      style={{ fontFamily: "'DM Mono','Courier New',monospace", background: "linear-gradient(165deg,#050310 0%,#0a0818 45%,#050310 100%)" }}
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(255,77,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.03) 1px,transparent 1px)", backgroundSize: "64px 64px", animation: "servGridDrift 28s linear infinite" }} />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 4px)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[110px] z-0 w-[800px] h-[800px] -top-48 -left-48" style={{ background: "radial-gradient(circle,rgba(255,77,0,0.10),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[600px] h-[600px] top-[40%] -right-36" style={{ background: `radial-gradient(circle,${active.accent}14,transparent 70%)`, transition: "all 0.8s ease" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[500px] h-[500px] -bottom-24 left-[25%]" style={{ background: "radial-gradient(circle,rgba(168,85,247,0.07),transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 relative z-10">

        {/* ── Section header ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 xl:gap-[60px] mb-14 xl:mb-16 items-end">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
            <div className="flex items-center gap-3.5 mb-3.5">
              <span className="inline-block w-12 h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
              <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase" style={monoFont}>What We Do</span>
            </div>
            <h2 className="leading-none text-white m-0" style={{ ...bebasFont, fontSize: "clamp(40px,5.5vw,64px)", letterSpacing: "0.03em" }}>
              Services That Help<br />
              <span style={{ color: "#ff4d00", textShadow: "0 0 50px rgba(255,77,0,0.45)" }}>Your Business Grow</span>
            </h2>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
            <p className="text-[15px] text-[#a8b4cc] leading-[1.78] mb-6 max-w-[520px]" style={monoFont}>
              Every service is built around one goal: real, measurable results for your business. We solve problems, craft solutions, and deliver outcomes that matter.
            </p>
            <div className="flex items-center gap-2.5">
              <span className="w-[7px] h-[7px] rounded-full" style={{ background: "#10d4a0", boxShadow: "0 0 10px #10d4a0", animation: "servPulse 1.8s ease-in-out infinite" }} />
              <span className="text-[10.5px] text-[#7688a0] tracking-[0.08em]" style={monoFont}>5 core services · end-to-end delivery</span>
            </div>
          </div>
        </div>

        {/* ── Main layout: tab list left + detail right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr] gap-5 xl:gap-6">

          {/* ── Left: service selector tabs ── */}
          <div className="flex flex-col gap-2.5"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-28px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.18s" }}>
            {SERVICES.map((s) => {
              const isActive = activeId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className="relative flex items-center gap-4 px-5 py-4 text-left bg-transparent border cursor-pointer transition-all duration-350 group overflow-hidden"
                  style={{
                    borderColor: isActive ? `${s.accent}55` : "rgba(255,255,255,0.08)",
                    background: isActive ? `linear-gradient(135deg,${s.accent}12,rgba(255,255,255,0.02))` : "rgba(255,255,255,0.025)",
                    borderRadius: 14,
                    boxShadow: isActive ? `0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)` : "none",
                  }}
                >
                  {/* Active left bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-sm transition-all duration-350"
                    style={{ background: isActive ? s.accent : "transparent", boxShadow: isActive ? `0 0 10px ${s.accent}` : "none" }} />

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isActive ? `${s.accent}20` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isActive ? s.accent + "55" : "rgba(255,255,255,0.1)"}`,
                      color: isActive ? s.accent : "rgba(255,255,255,0.4)",
                      boxShadow: isActive ? `0 0 16px ${s.accent}33` : "none",
                    }}>
                    {s.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span style={{ ...monoFont, fontSize: 9, color: isActive ? s.accent : "#6e8098", letterSpacing: "0.28em", textTransform: "uppercase" }}>{s.number}</span>
                    </div>
                    <div style={{ ...bebasFont, fontSize: 19, color: isActive ? "#fff" : "rgba(255,255,255,0.55)", letterSpacing: "0.03em", lineHeight: 1, transition: "color 0.3s" }}>{s.title}</div>
                    <div className="text-[10px] text-[#5e6e84] mt-0.5 transition-colors duration-300"
                      style={{ ...monoFont, color: isActive ? "rgba(255,255,255,0.5)" : undefined }}>{s.tagline}</div>
                  </div>

                  {/* Arrow */}
                  <span className="text-[12px] transition-all duration-300 flex-shrink-0"
                    style={{ color: isActive ? s.accent : "#697a90", transform: isActive ? "translateX(2px)" : "translateX(0)" }}>→</span>
                </button>
              );
            })}
          </div>

          {/* ── Right: active service detail ── */}
          <div
            key={activeId}
            className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white/[0.07] to-white/[0.03]"
            style={{
              borderColor: `${active.accent}33`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 50px ${active.accent}10, inset 0 1px 0 rgba(255,255,255,0.06)`,
              animation: "servFadeIn 0.42s cubic-bezier(0.16,1,0.3,1) both",
              opacity: inView ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-28 h-28 opacity-45 pointer-events-none"
              style={{ background: `linear-gradient(135deg,${active.accent},transparent)`, clipPath: "polygon(100% 0,0 0,100% 100%)" }} />
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at top right,${active.accent}0e,transparent 60%)` }} />
            {/* Ghost number */}
            <div className="absolute bottom-5 right-7 select-none pointer-events-none"
              style={{ ...bebasFont, fontSize: 110, color: `${active.accent}06`, lineHeight: 1, letterSpacing: "0.04em" }}>
              {active.number}
            </div>

            <div className="relative p-7 xl:p-10">

              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="inline-block w-6 h-px" style={{ background: active.accent, boxShadow: `0 0 8px ${active.accent}` }} />
                    <span className="text-[9.5px] tracking-[0.32em] uppercase" style={{ ...monoFont, color: active.accent }}>{active.number} — {active.tagline}</span>
                  </div>
                  <h3 style={{ ...bebasFont, fontSize: "clamp(34px,4vw,52px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 1, margin: 0 }}>{active.title}</h3>
                </div>
                <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-2xl flex items-center justify-center text-2xl xl:text-3xl flex-shrink-0"
                  style={{ background: `${active.accent}1e`, border: `1px solid ${active.accent}44`, color: active.accent, boxShadow: `0 0 24px ${active.accent}28` }}>
                  {active.icon}
                </div>
              </div>

              {/* Problem / Solution / Result */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Problem", text: active.problem, accent: "#ef4444", icon: "✕" },
                  { label: "Solution", text: active.solution, accent: active.accent, icon: "→" },
                  { label: "Result", text: active.result, accent: "#10d4a0", icon: "✓" },
                ].map((item, i) => (
                  <div key={i}
                    className="flex flex-col gap-3 p-4 rounded-xl border bg-white/[0.04]"
                    style={{ borderColor: `${item.accent}28`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04)` }}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[12.5px] font-bold flex-shrink-0"
                        style={{ background: `${item.accent}20`, border: `1px solid ${item.accent}44`, color: item.accent }}>
                        {item.icon}
                      </div>
                      <span className="text-[9px] tracking-[0.28em] uppercase font-semibold" style={{ ...monoFont, color: item.accent }}>{item.label}</span>
                    </div>
                    <p className="text-[13.5px] text-[#9eb0c8] leading-[1.7] m-0" style={monoFont}>{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mb-8">
                <span className="text-[9px] tracking-[0.3em] text-[#5e6e84] uppercase block mb-3" style={monoFont}>What's included</span>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/10">
                      <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: active.accent, boxShadow: `0 0 6px ${active.accent}` }} />
                      <span className="text-[13px] text-[#b0bdd0]" style={monoFont}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-4 flex-wrap">
                <a href="#contact"
                  className="inline-flex items-center gap-2.5 py-3 px-7 text-white text-[12.5px] tracking-[0.22em] uppercase no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(255,77,0,0.5)] active:scale-95"
                  style={{ ...monoFont, background: `linear-gradient(135deg,${active.accent},${active.accent}cc)`, clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))", boxShadow: `0 6px 24px ${active.accent}44` }}>
                  Start This Service <span>→</span>
                </a>
                <a href="#work"
                  className="inline-flex items-center gap-2 text-[12.5px] text-[#7688a0] no-underline transition-colors duration-300 hover:text-white"
                  style={monoFont}>
                  See Case Studies <span style={{ color: active.accent }}>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom: mini service pills (mobile quick nav) ── */}
        <div className="flex flex-wrap gap-2.5 mt-8 lg:hidden"
          style={{ opacity: inView ? 1 : 0, transition: "opacity 0.7s ease 0.4s" }}>
          {SERVICES.map(s => (
            <button key={s.id} onClick={() => setActiveId(s.id)}
              className="px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase border transition-all duration-300 cursor-pointer"
              style={{ ...monoFont, background: activeId === s.id ? s.accent : "rgba(255,255,255,0.04)", color: activeId === s.id ? "#fff" : "rgba(255,255,255,0.45)", borderColor: activeId === s.id ? s.accent : "rgba(255,255,255,0.1)", boxShadow: activeId === s.id ? `0 0 16px ${s.accent}44` : "none" }}>
              {s.title}
            </button>
          ))}
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @keyframes servGridDrift { 100% { background-position: 64px 64px; } }
        @keyframes servPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.6)} }
        @keyframes servFadeIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  );
}