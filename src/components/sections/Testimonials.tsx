"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const TESTIMONIALS = [
  { id:"1", name:"Sarah Mitchell",  role:"CEO",                company:"TechStore Inc.", image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", rating:5, quote:"Working with this team transformed our online presence. Attention to detail exceeded every expectation — conversion rate up 300% in month one.", project:"E-Commerce Platform", color:"#ff4d00" },
  { id:"2", name:"Michael Chen",    role:"Creative Director",  company:"Luxe Beauty",    image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", rating:5, quote:"The brand identity they created is absolutely stunning. They understood our vision and brought it to life in ways we couldn't have imagined.", project:"Brand Identity System", color:"#00c8ff" },
  { id:"3", name:"Emily Rodriguez", role:"Product Manager",    company:"DataFlow",       image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80", rating:5, quote:"The dashboard is intuitive, beautiful, and powerful. Development was smooth — delivered exactly on time and on budget. Couldn't be happier.", project:"SaaS Dashboard", color:"#a855f7" },
  { id:"4", name:"David Park",      role:"CTO",                company:"FinanceHub",     image:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80", rating:5, quote:"Exceptional technical expertise with great design sensibility. The mobile app is secure, fast, and our users genuinely love the interface.", project:"Mobile Banking App", color:"#10d4a0" },
  { id:"5", name:"Amanda Foster",   role:"Owner",              company:"Bistro Moderne", image:"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80", rating:5, quote:"Our new website transformed how customers interact with us. The reservation system is flawless and the design captures our ambiance perfectly.", project:"Restaurant Website", color:"#f59e0b" },
  { id:"6", name:"James Wilson",    role:"VP of Operations",   company:"GlobalTech",     image:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80", rating:5, quote:"The portal streamlined our internal processes significantly. Their understanding of enterprise needs and ability to deliver polish is impressive.", project:"Corporate Portal", color:"#ff4d00" },
  { id:"7", name:"Lisa Chang",      role:"Marketing Director", company:"NovaBrand",      image:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80", rating:5, quote:"From concept to launch in 3 weeks. The team's speed without sacrificing quality blew us away. Our campaign performance doubled overnight.", project:"Brand Campaign Site", color:"#00c8ff" },
  { id:"8", name:"Ryan Patel",      role:"Founder",            company:"LaunchKit",      image:"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80", rating:5, quote:"They built our entire MVP in 6 weeks. Clean code, great communication, and a final product that our investors genuinely love.", project:"SaaS MVP", color:"#a855f7" },
];

const STATS = [
  { value: "150+", label: "Clients Served", color: "#ff4d00" },
  { value: "98%",  label: "Satisfaction",   color: "#00c8ff" },
  { value: "5.0★", label: "Avg Rating",     color: "#a855f7" },
  { value: "24/7", label: "Support",        color: "#10d4a0" },
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
// Updated to Inter font
const sansFont  = { fontFamily: "'Inter', sans-serif" };

function Stars({ color }: { color: string }) {
  return (
    <div className="flex gap-[3px]">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={color}
          style={{ filter: `drop-shadow(0 0 4px rgba(${color.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.55))` }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function useInView(threshold = 0.06) {
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
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative overflow-hidden pt-[6vh] pb-[10vh] font-sans"
      style={{ fontFamily: "'Inter', sans-serif", background: "linear-gradient(165deg,#fafafa 0%,#f5f5f5 45%,#fafafa 100%)" }}
    >
      {/* ── Backgrounds - Light Theme ── */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)", backgroundSize: "64px 64px", animation: "testiGridDrift 28s linear infinite" }} />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.01) 3px,rgba(0,0,0,0.01) 4px)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[110px] z-0 w-[700px] h-[700px] -top-48 -left-48" style={{ background: "radial-gradient(circle,rgba(255,77,0,0.05),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[500px] h-[500px] top-[20%] -right-36" style={{ background: "radial-gradient(circle,rgba(0,200,255,0.04),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[400px] h-[400px] bottom-0 left-[40%]" style={{ background: "radial-gradient(circle,rgba(168,85,247,0.04),transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 relative z-10 overflow-hidden">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 xl:gap-[60px] mb-14 xl:mb-16 items-end">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
            <div className="flex items-center gap-3.5 mb-3.5">
              <span className="inline-block w-12 h-px bg-[#ff4d00] shadow-[0_0_12px_rgba(255,77,0,0.4)]" />
              <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase font-semibold" style={sansFont}>Testimonials</span>
            </div>
            <h2 className="leading-none text-[#1a1a2e] m-0" style={{ ...bebasFont, fontSize: "clamp(40px,5.5vw,64px)", letterSpacing: "0.03em" }}>
              Client<br />
              <span style={{ color: "#ff4d00", textShadow: "0 0 35px rgba(255,77,0,0.3)" }}>Success Stories</span>
            </h2>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
            <p className="text-[16px] text-[#4a5568] leading-[1.6] mb-6 max-w-[520px] font-medium" style={sansFont}>
              Real results from real clients. Drag, swipe, or use the controls to explore all stories.
            </p>
            <div className="flex items-center gap-2.5" style={sansFont}>
              <span className="w-[7px] h-[7px] rounded-full" style={{ background: "#10d4a0", boxShadow: "0 0 10px rgba(16,212,160,0.5)", animation: "testiPulse 1.8s ease-in-out infinite" }} />
              <span className="text-[12px] text-[#6b7280] tracking-[0.08em] font-medium">Trusted by 150+ brands worldwide</span>
            </div>
          </div>
        </div>

        {/* ── Swiper Container with Blur Edges ── */}
        <div
          className="relative mb-8"
          style={{ opacity: inView ? 1 : 0, transition: "opacity 0.7s ease 0.2s" }}
        >
          {/* Left Fade/Blur Edge - Light Theme */}
          <div className="absolute -left-20 top-0 bottom-0 w-16 md:w-24 xl:w-32 z-20 pointer-events-none" 
               style={{ 
                 background: "linear-gradient(90deg, #fafafa 0%, transparent 100%)",
                 backdropFilter: "blur(2px)" 
               }} 
          />
          
          {/* Right Fade/Blur Edge - Light Theme */}
          <div className="absolute -right-20 top-0 bottom-0 w-16 md:w-24 xl:w-32 z-20 pointer-events-none" 
               style={{ 
                 background: "linear-gradient(270deg, #fafafa 0%, transparent 100%)",
                 backdropFilter: "blur(2px)" 
               }} 
          />

          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={1.15}
            centeredSlides={true}
            spaceBetween={24}
            loop={true}
            speed={600}
            autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ prevEl: ".testi-prev", nextEl: ".testi-next" }}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
              setProgressKey(k => k + 1);
            }}
            className="!overflow-visible !pl-4 !pr-4"
            breakpoints={{
              640: { slidesPerView: 1.3, spaceBetween: 24 },
              1024: { slidesPerView: 2.45, spaceBetween: 28 },
              1440: { slidesPerView: 3.6, spaceBetween: 32 }
            }}
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id} style={{ width: "auto" }}>
                <TestiCard t={t} isActive={swiperRef.current?.activeIndex === swiperRef.current?.realIndex} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Controls row ── */}
        <div
          className="flex items-center justify-between mb-5 relative z-30"
          style={{ opacity: inView ? 1 : 0, transition: "opacity 0.7s ease 0.3s" }}
        >
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { swiperRef.current?.slideToLoop(i); setProgressKey(k => k + 1); }}
                className="border-none cursor-pointer p-0 transition-all duration-400 rounded-sm"
                style={{
                  width: i === activeIndex ? 28 : 8,
                  height: 3,
                  background: i === activeIndex ? "#ff4d00" : "rgba(0,0,0,0.18)",
                  boxShadow: i === activeIndex ? "0 0 8px rgba(255,77,0,0.5)" : "none",
                }}
              />
            ))}
          </div>

          {/* Prev / Next - Light Theme */}
          <div className="flex gap-2">
            <button
              className="testi-prev w-11 h-11 flex items-center justify-center border border-black/10 text-[#4a5568]/60 text-sm bg-transparent cursor-pointer font-sans transition-all duration-300 hover:border-[rgba(255,77,0,0.5)] hover:text-[#1a1a2e] hover:bg-[rgba(255,77,0,0.08)] active:scale-90"
              onClick={() => setProgressKey(k => k + 1)}
            >←</button>
            <button
              className="testi-next w-11 h-11 flex items-center justify-center border border-black/10 text-[#4a5568]/60 text-sm bg-transparent cursor-pointer font-sans transition-all duration-300 hover:border-[rgba(255,77,0,0.5)] hover:text-[#1a1a2e] hover:bg-[rgba(255,77,0,0.08)] active:scale-90"
              onClick={() => setProgressKey(k => k + 1)}
            >→</button>
          </div>
        </div>

        {/* ── Progress bar - Light Theme ── */}
        <div
          className="h-[2px] bg-black/[0.08] overflow-hidden rounded-full mb-12 xl:mb-14"
          style={{ opacity: inView ? 1 : 0, transition: "opacity 0.7s ease 0.35s" }}
        >
          <div
            key={progressKey}
            className="h-full rounded-full bg-gradient-to-r from-[#ff4d00] to-[#ff8c00]"
            style={{ boxShadow: "0 0 8px rgba(255,77,0,0.5)", animation: "testiProgress 6s linear forwards" }}
          />
        </div>

        {/* ── Stats strip - Light Theme ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xl:gap-4">
          {STATS.map((s, i) => (
            <div key={i}
              className="relative overflow-hidden flex items-center gap-4 px-5 py-4 border border-black/10 bg-gradient-to-br from-white to-[#fafafa] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.5 + i * 0.08}s`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)", borderRadius: 12,
              }}>
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-sm" style={{ background: s.color, boxShadow: `0 0 8px rgba(${s.color.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.4)` }} />
              <div>
                <div style={{ ...bebasFont, fontSize: 30, color: s.color, lineHeight: 1, textShadow: `0 0 20px rgba(${s.color.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.25)` }}>{s.value}</div>
                <div className="text-[9px] tracking-[0.22em] text-[#6b7280] uppercase mt-0.5 font-medium" style={sansFont}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes testiGridDrift { 100% { background-position: 64px 64px; } }
        @keyframes testiPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.6)} }
        @keyframes testiProgress { from{width:0%} to{width:100%} }
        .swiper { overflow: visible !important; }
        .swiper-slide { transition: opacity 0.3s ease, transform 0.3s ease; opacity: 0.8; transform: scale(0.96); }
        .swiper-slide-active { opacity: 1; transform: scale(1); }
        @media (prefers-reduced-motion: reduce) {
          [style*="testiGridDrift"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

// ── Card - Light Theme ───────────────────────────────────────────────
function TestiCard({ t, isActive }: { t: typeof TESTIMONIALS[0]; isActive?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isInteractive = hovered || isActive;
  
  return (
    <div
      data-card
      className="relative flex flex-col overflow-hidden border transition-all duration-400 h-full"
      style={{
        borderRadius: 16,
        background: isInteractive
          ? `linear-gradient(135deg,rgba(${t.color.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.08),rgba(255,255,255,0.98))`
          : "linear-gradient(135deg,rgba(0,0,0,0.04),rgba(0,0,0,0.02))",
        borderColor: isInteractive ? `rgba(${t.color.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.55)` : "rgba(0,0,0,0.12)",
        boxShadow: isInteractive
          ? `0 0 0 1px ${t.color}, 0 16px 50px rgba(0,0,0,0.12), 0 0 35px rgba(${t.color.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.15)`
          : "0 6px 28px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Corner accent */}

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Open quote */}
        <div style={{ color: t.color, opacity: 0.2, lineHeight: 1, fontSize: 40, fontFamily: "Georgia,serif", marginBottom: -8 }}>"</div>

        {/* Quote text - Light Theme */}
        <p className="text-[15px] text-[#4a5568] leading-[1.6] m-0 flex-1 font-medium" style={sansFont}>
          {t.quote}
        </p>

        {/* Stars */}
        <Stars color={t.color} />

        {/* Divider - Light Theme */}
        <div className="h-px w-full" style={{ background: `linear-gradient(90deg,rgba(${t.color.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.33),transparent)` }} />

        {/* Person row */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
            style={{ border: `2px solid ${t.color}`, boxShadow: `0 0 10px rgba(${t.color.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.35)` }}>
            <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="min-w-0">
            <div style={{ ...bebasFont, fontSize: 16, color: "#1a1a2e", letterSpacing: "0.04em", lineHeight: 1 }}>{t.name}</div>
            <div className="text-[10px] text-[#6b7280] mt-0.5 truncate font-medium" style={sansFont}>{t.role} · {t.company}</div>
          </div>
          <div className="ml-auto flex-shrink-0">
            <span className="px-2 py-1 text-[8px] tracking-[0.18em] uppercase whitespace-nowrap font-semibold"
              style={{ ...sansFont, background: `rgba(${t.color.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.12)`, border: `1px solid rgba(${t.color.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.44)`, color: t.color, borderRadius: 6 }}>
              {t.project.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}