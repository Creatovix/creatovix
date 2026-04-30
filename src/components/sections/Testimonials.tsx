"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  { id:"1", name:"Sarah Mitchell",  role:"CEO",               company:"TechStore Inc.", image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", rating:5, quote:"Working with this team transformed our online presence. Attention to detail exceeded every expectation — conversion rate up 300% in month one.", project:"E-Commerce Platform", color:"#ff4d00" },
  { id:"2", name:"Michael Chen",    role:"Creative Director", company:"Luxe Beauty",    image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", rating:5, quote:"The brand identity they created is absolutely stunning. They understood our vision and brought it to life in ways we couldn't have imagined.", project:"Brand Identity System", color:"#00c8ff" },
  { id:"3", name:"Emily Rodriguez", role:"Product Manager",   company:"DataFlow",       image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80", rating:5, quote:"The dashboard is intuitive, beautiful, and powerful. Development was smooth — delivered exactly on time and on budget. Couldn't be happier.", project:"SaaS Dashboard", color:"#a855f7" },
  { id:"4", name:"David Park",      role:"CTO",               company:"FinanceHub",     image:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80", rating:5, quote:"Exceptional technical expertise with great design sensibility. The mobile app is secure, fast, and our users genuinely love the interface.", project:"Mobile Banking App", color:"#10d4a0" },
  { id:"5", name:"Amanda Foster",   role:"Owner",             company:"Bistro Moderne", image:"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80", rating:5, quote:"Our new website transformed how customers interact with us. The reservation system is flawless and the design captures our ambiance perfectly.", project:"Restaurant Website", color:"#f59e0b" },
  { id:"6", name:"James Wilson",    role:"VP of Operations",  company:"GlobalTech",     image:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80", rating:5, quote:"The portal streamlined our internal processes significantly. Their understanding of enterprise needs and ability to deliver polish is impressive.", project:"Corporate Portal", color:"#ff4d00" },
  { id:"7", name:"Lisa Chang",      role:"Marketing Director",company:"NovaBrand",      image:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80", rating:5, quote:"From concept to launch in 3 weeks. The team's speed without sacrificing quality blew us away. Our campaign performance doubled overnight.", project:"Brand Campaign Site", color:"#00c8ff" },
  { id:"8", name:"Ryan Patel",      role:"Founder",           company:"LaunchKit",      image:"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80", rating:5, quote:"They built our entire MVP in 6 weeks. Clean code, great communication, and a final product that our investors genuinely love.", project:"SaaS MVP", color:"#a855f7" },
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
const monoFont  = { fontFamily: "'DM Mono','Courier New',monospace" };

function Stars({ color }: { color: string }) {
  return (
    <div className="flex gap-[3px]">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={color}
          style={{ filter: `drop-shadow(0 0 4px ${color}88)` }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
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
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function TestimonialsSection() {
  const { ref, inView } = useInView(0.06);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Drag-to-scroll
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  // Auto-scroll functionality
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    
    autoScrollRef.current = setInterval(() => {
      if (!trackRef.current || isPaused) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      const maxScroll = scrollWidth / 2; // Only scroll through original set
      
      // If we've scrolled past the original set, jump back seamlessly
      if (scrollLeft >= maxScroll - 1) {
        trackRef.current.scrollLeft = 0;
      } else {
        const card = trackRef.current.querySelector('[data-card]') as HTMLElement;
        const step = card ? card.offsetWidth + 20 : 320;
        trackRef.current.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 4000); // Change every 4 seconds
  }, [isPaused]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  // Start/stop auto-scroll based on pause state and visibility
  useEffect(() => {
    if (inView && !isPaused) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
    return () => stopAutoScroll();
  }, [inView, isPaused, startAutoScroll, stopAutoScroll]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsPaused(true); // Pause while dragging
    drag.current = { active: true, startX: e.pageX - (trackRef.current?.offsetLeft ?? 0), scrollLeft: trackRef.current?.scrollLeft ?? 0 };
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };
  
  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.active || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current.offsetLeft ?? 0);
    trackRef.current.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX) * 1.4;
  };
  
  const onMouseUp = () => {
    drag.current.active = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
    // Resume after a short delay to avoid jarring transition
    setTimeout(() => setIsPaused(false), 800);
  };

  const scrollBy = (dir: "prev" | "next") => {
    if (!trackRef.current) return;
    setIsPaused(true); // Pause on manual interaction
    const card = trackRef.current.querySelector('[data-card]') as HTMLElement;
    const step = card ? card.offsetWidth + 20 : 320;
    trackRef.current.scrollBy({ left: dir === "next" ? step * 2 : -step * 2, behavior: "smooth" });
    // Resume after scroll completes
    setTimeout(() => setIsPaused(false), 1000);
  };

  // Handle seamless loop: when user scrolls to end of duplicated content, jump to start
  const handleScroll = useCallback(() => {
    if (!trackRef.current || isPaused) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth / 2;
    
    // If we've scrolled past the original set, seamlessly jump to start
    if (scrollLeft >= maxScroll - 10) {
      trackRef.current.scrollLeft = 0;
    }
    // If scrolling backwards past start, jump to middle
    else if (scrollLeft <= 10) {
      trackRef.current.scrollLeft = maxScroll;
    }
  }, [isPaused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const STATS = [
    { value: "150+", label: "Clients Served", color: "#ff4d00" },
    { value: "98%",  label: "Satisfaction",   color: "#00c8ff" },
    { value: "5.0★", label: "Avg Rating",     color: "#a855f7" },
    { value: "24/7", label: "Support",        color: "#10d4a0" },
  ];

  return (
    <section ref={ref} id="testimonials" className="relative overflow-hidden py-24 xl:py-32"
      style={{ fontFamily: "'DM Mono','Courier New',monospace", background: "linear-gradient(165deg,#050310 0%,#0a0818 45%,#050310 100%)" }}>

      {/* Backgrounds */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(255,77,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.03) 1px,transparent 1px)", backgroundSize: "64px 64px", animation: "testiGridDrift 28s linear infinite" }} />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 4px)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[110px] z-0 w-[700px] h-[700px] -top-48 -left-48" style={{ background: "radial-gradient(circle,rgba(255,77,0,0.10),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[500px] h-[500px] top-[20%] -right-36" style={{ background: "radial-gradient(circle,rgba(0,200,255,0.07),transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 relative z-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 xl:gap-[60px] mb-12 xl:mb-14 items-end">
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
          <div className="flex items-end justify-between gap-6" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
            <p className="text-[15px] text-[#a8b4cc] leading-[1.78] m-0 max-w-[400px]" style={monoFont}>
              Real results from real clients — drag to explore all stories.
            </p>
            {/* Arrow controls */}
            <div className="flex gap-2 flex-shrink-0">
              {(["prev", "next"] as const).map((dir) => (
                <button key={dir} onClick={() => scrollBy(dir)}
                  className="w-11 h-11 flex items-center justify-center border border-white/10 text-[#9eb0c8] text-sm bg-transparent cursor-pointer transition-all duration-300 hover:border-[rgba(255,77,0,0.5)] hover:text-white hover:bg-[rgba(255,77,0,0.09)] active:scale-90 font-mono flex-shrink-0">
                  {dir === "prev" ? "←" : "→"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Slider track ── */}
        <div className="relative"
          style={{ opacity: inView ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }}>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg,#050310 0%,transparent 100%)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg,#050310 0%,transparent 100%)" }} />

          <div
            ref={trackRef}
            className="flex gap-4 xl:gap-5 overflow-x-auto pb-4 select-none"
            style={{ cursor: "grab", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseEnter={handleMouseEnter}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {/* Duplicate for infinite feel */}
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <TestiCard key={`${t.id}-${i}`} t={t} />
            ))}
          </div>
          
          {/* Pause indicator (optional visual feedback) */}
          {isPaused && (
            <div className="absolute bottom-2 right-4 z-20 px-2 py-1 text-[9px] text-[#6e8098] bg-black/40 rounded" style={monoFont}>
              Paused
            </div>
          )}
        </div>

        {/* ── Stats strip ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xl:gap-4 mt-10 xl:mt-12">
          {STATS.map((s, i) => (
            <div key={i}
              className="relative overflow-hidden flex items-center gap-4 px-5 py-4 border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] transition-all duration-300 hover:-translate-y-0.5"
              style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.35 + i * 0.08}s`, boxShadow: "0 4px 20px rgba(0,0,0,0.28)", borderRadius: 12 }}>
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-sm" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
              <div>
                <div style={{ ...bebasFont, fontSize: 30, color: s.color, lineHeight: 1, textShadow: `0 0 20px ${s.color}44` }}>{s.value}</div>
                <div className="text-[9px] tracking-[0.22em] text-[#6e8098] uppercase mt-0.5" style={monoFont}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @keyframes testiGridDrift { 100% { background-position: 64px 64px; } }
      `}</style>
    </section>
  );
}

function TestiCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      data-card
      className="relative flex-shrink-0 flex flex-col overflow-hidden border transition-all duration-400"
      style={{
        width: "clamp(260px,28vw,320px)",
        borderRadius: 16,
        background: hovered
          ? `linear-gradient(135deg,${t.color}12,rgba(255,255,255,0.04))`
          : "linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))",
        borderColor: hovered ? `${t.color}55` : "rgba(255,255,255,0.09)",
        boxShadow: hovered
          ? `0 0 0 1px ${t.color}, 0 16px 50px rgba(0,0,0,0.45), 0 0 35px ${t.color}18`
          : "0 6px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top-right corner accent */}
      <div className="absolute top-0 right-0 w-14 h-14 opacity-50 pointer-events-none"
        style={{ background: `linear-gradient(135deg,${t.color},transparent)`, clipPath: "polygon(100% 0,0 0,100% 100%)" }} />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Quote mark */}
        <div style={{ color: t.color, opacity: 0.25, lineHeight: 1, fontSize: 40, fontFamily: "Georgia,serif", marginBottom: -8 }}>"</div>

        {/* Quote */}
        <p className="text-[13px] text-[#b8c8de] leading-[1.72] m-0 flex-1" style={monoFont}>
          {t.quote}
        </p>

        {/* Stars */}
        <Stars color={t.color} />

        {/* Divider */}
        <div className="h-px w-full" style={{ background: `linear-gradient(90deg,${t.color}33,transparent)` }} />

        {/* Person */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
            style={{ border: `2px solid ${t.color}`, boxShadow: `0 0 10px ${t.color}44` }}>
            <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="min-w-0">
            <div style={{ ...bebasFont, fontSize: 16, color: "#fff", letterSpacing: "0.04em", lineHeight: 1 }}>{t.name}</div>
            <div className="text-[10px] text-[#6e8098] mt-0.5 truncate" style={monoFont}>{t.role} · {t.company}</div>
          </div>
          {/* Project tag */}
          <div className="ml-auto flex-shrink-0">
            <span className="px-2 py-1 text-[8px] tracking-[0.18em] uppercase whitespace-nowrap"
              style={{ ...monoFont, background: `${t.color}18`, border: `1px solid ${t.color}44`, color: t.color, borderRadius: 6 }}>
              {t.project.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}