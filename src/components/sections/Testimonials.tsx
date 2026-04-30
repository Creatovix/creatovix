"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  { id:"1", name:"Sarah Mitchell",  role:"CEO",               company:"TechStore Inc.", image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", rating:5, quote:"Working with this team transformed our online presence. Attention to detail and creative approach exceeded our expectations — conversion rate up 300% in month one.", project:"E-Commerce Platform", color:"#ff4d00" },
  { id:"2", name:"Michael Chen",    role:"Creative Director", company:"Luxe Beauty",    image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", rating:5, quote:"The brand identity they created is absolutely stunning. They truly understood our vision and brought it to life in ways we couldn't have imagined. Professional and incredibly talented.", project:"Brand Identity System", color:"#00c8ff" },
  { id:"3", name:"Emily Rodriguez", role:"Product Manager",   company:"DataFlow",       image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80", rating:5, quote:"The dashboard is intuitive, beautiful, and powerful. Our team loves using it every day. Development was smooth — delivered exactly on time and on budget.", project:"SaaS Dashboard", color:"#a855f7" },
  { id:"4", name:"David Park",      role:"CTO",               company:"FinanceHub",     image:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80", rating:5, quote:"Exceptional technical expertise combined with great design sensibility. The mobile banking app is secure, fast, and our users love the interface. Highly recommend.", project:"Mobile Banking App", color:"#10d4a0" },
  { id:"5", name:"Amanda Foster",   role:"Owner",             company:"Bistro Moderne", image:"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80", rating:5, quote:"Our new website transformed how customers interact with us. The reservation system is flawless and the design perfectly captures our restaurant's ambiance.", project:"Restaurant Website", color:"#f59e0b" },
  { id:"6", name:"James Wilson",    role:"VP of Operations",  company:"GlobalTech",     image:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80", rating:5, quote:"The corporate portal streamlined our internal processes significantly. Their understanding of enterprise needs and ability to deliver a polished product is truly impressive.", project:"Corporate Portal", color:"#ff4d00" },
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
const monoFont  = { fontFamily: "'DM Mono','Courier New',monospace" };

function Stars({ color }: { color: string }) {
  return (
    <div className="flex gap-[3px]">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color}88)` }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

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

export default function TestimonialsSection() {
  const { ref, inView } = useInView(0.06);
  const [current, setCurrent]         = useState(0);
  const [animKey, setAnimKey]         = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => { setCurrent(idx); setAnimKey(k => k + 1); setTransitioning(false); }, 90);
  }, [transitioning]);

  const next = useCallback(() => goTo((current + 1) % TESTIMONIALS.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), [current, goTo]);

  useEffect(() => {
    autoRef.current = setInterval(next, 5500);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next]);

  const resetAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 5500);
  };

  const t = TESTIMONIALS[current];

  return (
    <section ref={ref} id="testimonials" className="relative overflow-hidden py-[6vh]"
      style={{ fontFamily: "'DM Mono','Courier New',monospace", background: "linear-gradient(165deg,#050310 0%,#0a0818 45%,#050310 100%)" }}>

      {/* Backgrounds */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "linear-gradient(rgba(255,77,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.03) 1px,transparent 1px)", backgroundSize: "64px 64px", animation: "testiGridDrift 28s linear infinite" }} />
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 4px)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[110px] z-0 w-[700px] h-[700px] -top-48 -left-48"
        style={{ background: "radial-gradient(circle,rgba(255,77,0,0.10),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[500px] h-[500px] top-[20%] -right-36"
        style={{ background: "radial-gradient(circle,rgba(0,200,255,0.07),transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 relative z-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 xl:gap-[60px] mb-14 xl:mb-16 items-end">
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
            <p className="text-[14px] text-white/50 leading-[1.78] m-0 max-w-[520px]" style={monoFont}>
              Don't just take our word for it. Real results from real clients — from startups to enterprise brands around the world.
            </p>
          </div>
        </div>

        {/* ── Main layout: featured quote left + card list right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5 xl:gap-6 mb-10 xl:mb-12">

          {/* ── Left: active testimonial ── */}
          <div
            key={animKey}
            className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white/[0.07] to-white/[0.03]"
            style={{
              borderColor: `${t.color}3a`,
              boxShadow: `0 16px 50px rgba(0,0,0,0.4), 0 0 40px ${t.color}10, inset 0 1px 0 rgba(255,255,255,0.06)`,
              animation: "testiFadeIn 0.45s cubic-bezier(0.16,1,0.3,1) both",
              opacity: inView ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-45 pointer-events-none"
              style={{ background: `linear-gradient(135deg,${t.color},transparent)`, clipPath: "polygon(100% 0,0 0,100% 100%)" }} />
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at top right,${t.color}0d,transparent 60%)` }} />

            <div className="relative p-7 xl:p-8 flex flex-col h-full" style={{ minHeight: 320 }}>

              {/* Top: quote mark + project tag */}
              <div className="flex items-start justify-between mb-5">
                <svg width="38" height="38" viewBox="0 0 24 24" style={{ color: t.color, opacity: 0.28, flexShrink: 0 }}>
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" fill="currentColor" />
                </svg>
                <span className="flex items-center gap-1.5 px-3 py-1 text-[8.5px] tracking-[0.22em] uppercase"
                  style={{ ...monoFont, background: "rgba(5,3,16,0.8)", border: `1px solid ${t.color}44`, color: t.color, borderRadius: 999 }}>
                  <span className="w-[4px] h-[4px] rounded-full" style={{ background: t.color, boxShadow: `0 0 5px ${t.color}` }} />
                  {t.project}
                </span>
              </div>

              {/* Quote text */}
              <blockquote className="flex-1 text-[14px] xl:text-[14.5px] text-white/72 leading-[1.85] italic m-0 mb-7" style={monoFont}>
                "{t.quote}"
              </blockquote>

              {/* Person row */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0"
                    style={{ border: `2px solid ${t.color}`, boxShadow: `0 0 14px ${t.color}33` }}>
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <div style={{ ...bebasFont, fontSize: 19, color: "#fff", letterSpacing: "0.04em", lineHeight: 1 }}>{t.name}</div>
                    <div className="text-[10px] text-white/42 mt-0.5" style={monoFont}>{t.role} · {t.company}</div>
                  </div>
                </div>
                <Stars color={t.color} />
              </div>

              {/* Dot + arrow controls */}
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/[0.07]">
                <div className="flex gap-1.5">
                  {TESTIMONIALS.map((_, i) => (
                    <button key={i}
                      onClick={() => { goTo(i); resetAuto(); }}
                      className="border-none cursor-pointer rounded-sm transition-all duration-400 p-0"
                      style={{ width: i === current ? 24 : 7, height: 2.5, background: i === current ? t.color : "rgba(255,255,255,0.16)", boxShadow: i === current ? `0 0 7px ${t.color}` : "none" }} />
                  ))}
                </div>
                <div className="flex gap-2">
                  {[{ fn: () => { prev(); resetAuto(); }, label: "←" }, { fn: () => { next(); resetAuto(); }, label: "→" }].map((btn, i) => (
                    <button key={i} onClick={btn.fn}
                      className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/60 text-xs bg-transparent cursor-pointer transition-all duration-250 hover:border-[rgba(255,77,0,0.45)] hover:text-white hover:bg-[rgba(255,77,0,0.09)] active:scale-90 font-mono">
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: compact review list ── */}
          <div className="flex flex-col gap-3">
            {TESTIMONIALS.map((item, i) => (
              <ReviewRow
                key={item.id}
                item={item}
                isActive={i === current}
                index={i}
                inView={inView}
                onClick={() => { goTo(i); resetAuto(); }}
              />
            ))}
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xl:gap-4">
          {[
            { value: "150+", label: "Happy Clients",  accent: "#ff4d00" },
            { value: "98%",  label: "Satisfaction",   accent: "#00c8ff" },
            { value: "5.0★", label: "Avg Rating",     accent: "#a855f7" },
            { value: "24/7", label: "Support",        accent: "#10d4a0" },
          ].map((s, i) => (
            <div key={i}
              className="relative overflow-hidden flex items-center gap-4 px-5 py-4 border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] transition-all duration-400 hover:-translate-y-0.5"
              style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.35 + i * 0.08}s`, boxShadow: "0 4px 20px rgba(0,0,0,0.28)" }}>
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-sm" style={{ background: s.accent, boxShadow: `0 0 8px ${s.accent}` }} />
              <div>
                <div style={{ ...bebasFont, fontSize: 28, color: s.accent, lineHeight: 1, textShadow: `0 0 20px ${s.accent}44` }}>{s.value}</div>
                <div className="text-[9px] tracking-[0.22em] text-white/38 uppercase mt-0.5" style={monoFont}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @keyframes testiGridDrift { 100% { background-position: 64px 64px; } }
        @keyframes testiFadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Compact row card (right column)
───────────────────────────────────────────── */
function ReviewRow({
  item, isActive, index, inView, onClick,
}: {
  item: typeof TESTIMONIALS[0];
  isActive: boolean;
  index: number;
  inView: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const lit = isActive || hovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden flex items-start gap-3.5 px-4 py-3.5 border cursor-pointer transition-all duration-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(20px)",
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${0.2 + index * 0.07}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${0.2 + index * 0.07}s, border-color 0.3s, box-shadow 0.3s, background 0.3s`,
        background: isActive ? `linear-gradient(135deg,${item.color}10,rgba(255,255,255,0.02))` : "rgba(255,255,255,0.025)",
        borderColor: isActive ? `${item.color}44` : hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)",
        boxShadow: isActive ? `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)` : "none",
        borderRadius: 12,
      }}
    >
      {/* Active left indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-sm transition-all duration-300"
        style={{ background: isActive ? item.color : "transparent", boxShadow: isActive ? `0 0 8px ${item.color}` : "none" }} />

      {/* Avatar */}
      <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden transition-all duration-300 mt-0.5"
        style={{ border: `1.5px solid ${lit ? item.color : "rgba(255,255,255,0.12)"}`, boxShadow: lit ? `0 0 10px ${item.color}33` : "none" }}>
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <span style={{ ...bebasFont, fontSize: 15, color: lit ? "#fff" : "rgba(255,255,255,0.7)", letterSpacing: "0.04em", lineHeight: 1, transition: "color 0.3s", whiteSpace: "nowrap" }}>
              {item.name}
            </span>
            <span className="text-[9px] text-white/30 truncate" style={monoFont}>{item.company}</span>
          </div>
          <Stars color={lit ? item.color : "rgba(255,255,255,0.25)"} />
        </div>
        <p className="text-[11px] text-white/40 leading-[1.6] m-0 transition-colors duration-300 line-clamp-2"
          style={{ ...monoFont, color: lit ? "rgba(255,255,255,0.58)" : "rgba(255,255,255,0.35)" }}>
          "{item.quote}"
        </p>
      </div>
    </div>
  );
}