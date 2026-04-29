"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const TESTIMONIALS = [
  { id:"1", name:"Sarah Mitchell",  role:"CEO",                company:"TechStore Inc.", image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", rating:5, quote:"Working with this team transformed our online presence completely. The attention to detail and creative approach exceeded our expectations. Our conversion rate increased by 300% within the first month.", project:"E-Commerce Platform", color:"#ff4d00" },
  { id:"2", name:"Michael Chen",    role:"Creative Director",  company:"Luxe Beauty",    image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", rating:5, quote:"The brand identity they created for us is absolutely stunning. They truly understood our vision and brought it to life in ways we couldn't have imagined. Professional, creative, and incredibly talented.", project:"Brand Identity System", color:"#00c8ff" },
  { id:"3", name:"Emily Rodriguez", role:"Product Manager",    company:"DataFlow",        image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80", rating:5, quote:"The dashboard they built for us is intuitive, beautiful, and powerful. Our team loves using it every day. The development process was smooth and they delivered exactly on time and on budget.", project:"SaaS Dashboard", color:"#a855f7" },
  { id:"4", name:"David Park",      role:"CTO",                company:"FinanceHub",      image:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80", rating:5, quote:"Exceptional technical expertise combined with great design sensibility. The mobile banking app they built is secure, fast, and our users love the interface. Highly recommend for any serious project.", project:"Mobile Banking App", color:"#10d4a0" },
  { id:"5", name:"Amanda Foster",   role:"Owner",              company:"Bistro Moderne",  image:"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80", rating:5, quote:"Our new website has completely transformed how customers interact with our restaurant. The reservation system works flawlessly and the design perfectly captures our ambiance and brand story.", project:"Restaurant Website", color:"#f59e0b" },
  { id:"6", name:"James Wilson",    role:"VP of Operations",   company:"GlobalTech",      image:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80", rating:5, quote:"The corporate portal they developed has streamlined our internal processes significantly. Their understanding of enterprise needs and ability to deliver a polished product is impressive.", project:"Corporate Portal", color:"#ff4d00" },
];

const STATS = [
  { value:"150+", label:"Happy Clients",  icon:"👥" },
  { value:"98%",  label:"Satisfaction",   icon:"⭐" },
  { value:"5.0",  label:"Avg Rating",     icon:"💯" },
  { value:"24/7", label:"Support",        icon:"🎧" },
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
const monoFont  = { fontFamily: "'DM Mono','Courier New',monospace" };

function Stars({ rating, color }: { rating: number; color: string }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={i < rating ? color : "rgba(255,255,255,0.18)"} style={{ filter: i < rating ? `drop-shadow(0 0 6px ${color}88)` : "none" }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

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

export default function TestimonialsSection() {
  const { ref, inView } = useInView(0.08);
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey]   = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const autoRef = useRef<number | null>(null);

  const goTo = useCallback((idx: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => { setCurrent(idx); setAnimKey(k => k + 1); setTransitioning(false); }, 100);
  }, [transitioning]);

  const next = useCallback(() => goTo((current + 1) % TESTIMONIALS.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), [current, goTo]);

  useEffect(() => { autoRef.current = window.setInterval(next, 6000); return () => { if (autoRef.current) clearInterval(autoRef.current); }; }, [next]);
  const resetAuto = () => { if (autoRef.current) clearInterval(autoRef.current); autoRef.current = window.setInterval(next, 6000); };

  const t = TESTIMONIALS[current];

  return (
    <section ref={ref} id="testimonials" className="relative overflow-hidden py-[8vh]"
      style={{ fontFamily: "'DM Mono','Courier New',monospace", background: "linear-gradient(165deg,#050310 0%,#0a0818 45%,#050310 100%)" }}>
      {/* Backgrounds */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(255,77,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.03) 1px,transparent 1px)", backgroundSize: "64px 64px", animation: "sectionGridDrift 28s linear infinite" }} />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 4px)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[800px] h-[800px] -top-48 -left-48" style={{ background: "radial-gradient(circle,rgba(255,77,0,0.10),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[600px] h-[600px] top-[30%] -right-36" style={{ background: "radial-gradient(circle,rgba(0,200,255,0.07),transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 relative z-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 gap-7 xl:grid-cols-2 xl:gap-[60px] mb-16 xl:mb-20 items-end">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
            <div className="flex items-center gap-3.5 mb-3.5">
              <span className="inline-block w-12 h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
              <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase" style={monoFont}>Testimonials</span>
            </div>
            <h2 className="leading-none text-white m-0" style={{ ...bebasFont, fontSize: "clamp(40px,5.5vw,64px)", letterSpacing: "0.03em" }}>
              Client<br />
              <span style={{ color: "#ff4d00", textShadow: "0 0 50px rgba(255,77,0,0.45)" }}>Success Stories</span>
            </h2>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
            <p className="text-[14px] text-white/50 leading-[1.78] mb-0 max-w-[520px]" style={monoFont}>
              Don't just take our word for it. Here's what our clients say about working with Creatovix — from startups to enterprise brands.
            </p>
          </div>
        </div>

        {/* ── Main testimonial card ── */}
        <div key={animKey} className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] mb-5"
          style={{ borderColor: `${t.color}33`, boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 50px ${t.color}14, inset 0 1px 0 rgba(255,255,255,0.06)`, animation: "testiFadeIn 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
          {/* Top-right corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-50 pointer-events-none" style={{ background: `linear-gradient(135deg,${t.color},transparent)`, clipPath: "polygon(100% 0,0 0,100% 100%)" }} />
          {/* Ambient */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at top right,${t.color}10,transparent 60%)` }} />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_400px]">
            {/* Left: quote */}
            <div className="p-7 xl:p-10 flex flex-col justify-between">
              {/* Large open-quote */}
              <div>
                <svg width="52" height="52" viewBox="0 0 24 24" className="mb-6" style={{ color: t.color, opacity: 0.35 }}>
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" fill="currentColor" />
                </svg>
                <blockquote className="text-[15px] xl:text-[16.5px] text-white/78 leading-[1.88] italic mb-8" style={monoFont}>
                  "{t.quote}"
                </blockquote>
              </div>

              <div className="flex flex-col gap-5">
                {/* Stars + project tag */}
                <div className="flex items-center gap-4 flex-wrap">
                  <Stars rating={t.rating} color={t.color} />
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full" style={{ background: "rgba(5,3,16,0.8)", border: `1px solid ${t.color}44` }}>
                    <span className="w-[5px] h-[5px] rounded-full" style={{ background: t.color, boxShadow: `0 0 6px ${t.color}` }} />
                    <span className="text-[9px] tracking-[0.24em] uppercase" style={{ ...monoFont, color: t.color }}>{t.project}</span>
                  </div>
                </div>
                {/* Person info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ border: `2px solid ${t.color}`, boxShadow: `0 0 16px ${t.color}44` }}>
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <div style={{ ...bebasFont, fontSize: 22, color: "#fff", letterSpacing: "0.03em", lineHeight: 1 }}>{t.name}</div>
                    <div className="text-[10.5px] text-white/45 mt-0.5" style={monoFont}>{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: visual panel */}
            <div className="relative hidden lg:block overflow-hidden" style={{ borderLeft: `1px solid ${t.color}18` }}>
              <img src={t.image} alt={t.name} className="w-full h-full object-cover" style={{ filter: "grayscale(100%)", opacity: 0.35 }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg,${t.color}33,transparent 60%)`, mixBlendMode: "overlay" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(270deg,transparent 0%,rgba(5,3,16,0.7) 100%)" }} />
              {/* Stats floating */}
              <div className="absolute bottom-6 left-5 right-5 flex flex-col gap-2.5">
                {[{ v: "5.0", l: "Star Rating" }, { v: "3×", l: "Avg ROI Boost" }].map((s, i) => (
                  <div key={i} className="px-4 py-3 rounded-xl" style={{ background: "rgba(5,3,16,0.9)", border: `1px solid ${t.color}44`, boxShadow: `0 6px 24px rgba(0,0,0,0.3)` }}>
                    <div style={{ ...bebasFont, fontSize: 26, color: t.color, lineHeight: 1 }}>{s.v}</div>
                    <div className="text-[9px] tracking-[0.2em] text-white/45 uppercase mt-0.5" style={monoFont}>{s.l}</div>
                  </div>
                ))}
              </div>
              {/* Ghost name */}
              <div className="absolute top-4 right-4 select-none pointer-events-none" style={{ ...bebasFont, fontSize: 60, color: `${t.color}08`, lineHeight: 1, letterSpacing: "0.04em", writingMode: "vertical-rl" }}>{t.name.split(" ")[0]}</div>
            </div>
          </div>

          {/* Bottom controls */}
          <div className="px-7 xl:px-10 pb-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
            {/* Dot nav */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => { goTo(i); resetAuto(); }}
                  className="rounded-sm border-none cursor-pointer transition-all duration-400"
                  style={{ width: i === current ? 28 : 8, height: 3, background: i === current ? t.color : "rgba(255,255,255,0.18)", boxShadow: i === current ? `0 0 8px ${t.color}` : "none", padding: 0 }} />
              ))}
            </div>
            {/* Prev / Next */}
            <div className="flex gap-2">
              {[{ fn: () => { prev(); resetAuto(); }, icon: "←" }, { fn: () => { next(); resetAuto(); }, icon: "→" }].map((btn, i) => (
                <button key={i} onClick={btn.fn}
                  className="w-10 h-10 flex items-center justify-center border border-white/10 text-white text-sm cursor-pointer bg-transparent transition-all duration-300 font-mono hover:border-[rgba(255,77,0,0.5)] hover:bg-[rgba(255,77,0,0.1)] active:scale-90">
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mini review cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14 xl:mb-20">
          {TESTIMONIALS.slice(0, 3).map((item, i) => (
            <div key={item.id}
              className="p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] cursor-pointer transition-all duration-400 hover:-translate-y-1"
              style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.1}s`, boxShadow: "0 6px 24px rgba(0,0,0,0.3)" }}
              onClick={() => { goTo(i); resetAuto(); }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{ border: `1.5px solid ${item.color}55` }}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <div style={{ ...bebasFont, fontSize: 16, color: "#fff", letterSpacing: "0.03em", lineHeight: 1 }}>{item.name}</div>
                    <div className="text-[9px] text-white/40 mt-0.5" style={monoFont}>{item.company}</div>
                  </div>
                </div>
                <Stars rating={item.rating} color={item.color} />
              </div>
              <p className="text-[11.5px] text-white/45 leading-[1.65] m-0 line-clamp-3" style={monoFont}>"{item.quote}"</p>
            </div>
          ))}
        </div>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xl:gap-5">
          {STATS.map((s, i) => (
            <div key={i} className="p-5 xl:p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] text-center transition-all duration-400 hover:-translate-y-1"
              style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.09}s`, boxShadow: "0 6px 24px rgba(0,0,0,0.3)" }}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div style={{ ...bebasFont, fontSize: 34, color: "#fff", lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
              <div className="text-[9.5px] text-white/45 tracking-[0.22em] uppercase" style={monoFont}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @keyframes sectionGridDrift { 100% { background-position: 64px 64px; } }
        @keyframes testiFadeIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  );
}