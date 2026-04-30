"use client";
import { useEffect, useRef, useState } from "react";

const TRUST_ITEMS = [
  { icon: "⚡", label: "Free Strategy Call" },
  { icon: "✓",  label: "No Obligation" },
  { icon: "↗",  label: "24h Response" },
  { icon: "★",  label: "5-Star Rated Agency" },
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
const monoFont  = { fontFamily: "'DM Mono','Courier New',monospace" };

function useInView(threshold = 0.15) {
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

export default function CTASection() {
  const { ref, inView } = useInView(0.12);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    el.addEventListener("mousemove", handleMouse);
    return () => el.removeEventListener("mousemove", handleMouse);
  }, []);

  // Merge both refs
  const setRef = (el: HTMLElement | null) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = el;
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  return (
    <section
      ref={setRef}
      id="cta"
      className="relative overflow-hidden py-[4vh] xl:px-10 px-4"
      style={{ fontFamily: "'DM Mono','Courier New',monospace", background: "linear-gradient(165deg,#050310 0%,#0a0818 50%,#050310 100%)" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "linear-gradient(rgba(255,77,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.03) 1px,transparent 1px)", backgroundSize: "64px 64px", animation: "ctaGridDrift 28s linear infinite" }} />
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 4px)" }} />

      {/* Parallax glow that follows mouse */}
      <div className="absolute inset-0 pointer-events-none z-0 transition-all duration-700 ease-out"
        style={{ background: `radial-gradient(ellipse 60% 60% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,77,0,0.14) 0%, transparent 65%)` }} />

      {/* Static glows */}
      <div className="absolute pointer-events-none rounded-full blur-[120px] z-0 w-[700px] h-[700px] -top-36 left-[20%]"
        style={{ background: "radial-gradient(circle,rgba(255,77,0,0.12),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[500px] h-[500px] -bottom-24 right-[10%]"
        style={{ background: "radial-gradient(circle,rgba(168,85,247,0.08),transparent 70%)" }} />

      {/* Border frame */}
      <div className="absolute inset-6 xl:inset-10 pointer-events-none z-0 rounded-2xl border border-white/[0.05]" />

      <div className="max-w-[1000px] mx-auto px-4 md:px-8 xl:px-10 relative z-10 text-center">

        {/* Eyebrow */}
        <div
          className="flex items-center justify-center gap-3.5 mb-6"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <span className="inline-block w-12 h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
          <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase" style={monoFont}>Ready to Grow?</span>
          <span className="inline-block w-12 h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
        </div>

        {/* Headline */}
        <div
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s" }}
        >
          <h2
            className="leading-none text-white m-0 mb-6"
            style={{ ...bebasFont, fontSize: "clamp(44px,7vw,88px)", letterSpacing: "0.02em", lineHeight: 0.94 }}
          >
            Ready to Grow<br />
            <span style={{ color: "#ff4d00", textShadow: "0 0 70px rgba(255,77,0,0.55)" }}>Your Business?</span>
          </h2>
          <p
            className="text-[15px] text-[#a8b4cc] leading-[1.82] mb-10 max-w-[580px] mx-auto"
            style={monoFont}
          >
            Let's build something that drives real results. Book a free strategy call and we'll walk through exactly how we'd approach your project.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex items-center justify-center gap-4 flex-wrap mb-12"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.22s" }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 py-4 md:px-9 px-3 text-white text-[13px] tracking-[0.24em] uppercase no-underline transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_20px_60px_rgba(255,77,0,0.55)] active:scale-95"
            style={{ ...monoFont, background: "linear-gradient(135deg,#ff4d00,#ff8c00)", clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))", boxShadow: "0 10px 40px rgba(255,77,0,0.42)" }}
          >
            Book Your Free Strategy Call
            <span className="text-base">→</span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2.5 py-4 px-8 text-[#9eb0c8] text-[13px] tracking-[0.24em] uppercase no-underline border border-white/12 transition-all duration-300 hover:text-white hover:border-white/30 hover:bg-white/[0.04] active:scale-95"
            style={monoFont}
          >
            View Our Work
          </a>
        </div>

        {/* Trust strip */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.34s" }}
        >
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[#ff4d00] text-sm" style={{ textShadow: "0 0 8px rgba(255,77,0,0.6)" }}>{item.icon}</span>
              <span className="text-[10.5px] text-[#6e8098] tracking-[0.12em]" style={monoFont}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Divider dots */}
        <div
          className="flex items-center justify-center gap-2 mt-12"
          style={{ opacity: inView ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} className="rounded-full"
              style={{ width: i === 2 ? 20 : 4, height: 4, background: i === 2 ? "#ff4d00" : "rgba(255,255,255,0.12)", boxShadow: i === 2 ? "0 0 8px #ff4d00" : "none" }} />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @keyframes ctaGridDrift { 100% { background-position: 64px 64px; } }
      `}</style>
    </section>
  );
}