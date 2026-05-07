"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const SLIDES = [
  {
    id: 0,
    index: "01",
    tagline: "Professional Web Design Services",
    headline: ["AWARD-WINNING", "WEB DESIGN", "SERVICES"],
    sub: "Custom website design that ranks on Google, converts visitors into clients, and builds lasting brand trust. Responsive, fast, and built for results.",
    accent: "#E8380D",
    accentLight: "#fff0ec",
    image: "/web-design.webp",
    stat: { value: "150+", label: "Websites Designed" },
    tags: ["Custom Web Design", "UI/UX Design", "Responsive Design", "Webflow"],
    badges: [{ icon: "⭐", text: "4.9/5 Rating" }, { icon: "🚀", text: "Free Consultation" }, { icon: "⚡", text: "Fast Delivery" }],
  },
  {
    id: 1,
    index: "02",
    tagline: "Brand Identity & Graphic Design",
    headline: ["PROFESSIONAL", "GRAPHIC DESIGN", "& BRANDING"],
    sub: "Strategic brand identity design, logo design, and visual systems that make your business instantly recognizable and trusted by your target audience.",
    accent: "#E8380D",
    accentLight: "#fff0ec",
    image: "/graphic-design.webp",
    stat: { value: "98%", label: "Client Satisfaction" },
    tags: ["Logo Design", "Brand Identity", "Visual Design", "Print Design"],
    badges: [{ icon: "🎨", text: "Award-Winning" }, { icon: "🔄", text: "Unlimited Revisions" }, { icon: "📦", text: "Full Brand Guide" }],
  },
  {
    id: 2,
    index: "03",
    tagline: "Custom Web Development Agency",
    headline: ["CUSTOM WEB", "DEVELOPMENT", "SOLUTIONS"],
    sub: "Expert web development using React, Next.js, and Node.js. We build fast-loading, SEO-optimized, scalable web applications tailored to your business needs.",
    accent: "#E8380D",
    accentLight: "#fff0ec",
    image: "/web-dev.webp",
    stat: { value: "99.9%", label: "Uptime Guarantee" },
    tags: ["React Development", "Next.js", "Node.js", "TypeScript"],
    badges: [{ icon: "🔒", text: "Secure & Fast" }, { icon: "⚙️", text: "Clean Code" }, { icon: "📱", text: "Mobile-First" }],
  },
  {
    id: 3,
    index: "04",
    tagline: "Full Stack Development Services",
    headline: ["FULL STACK", "DEVELOPMENT", "EXPERTS"],
    sub: "End-to-end full stack development services — from database architecture to pixel-perfect front-end. One team, complete digital solutions, faster time to market.",
    accent: "#E8380D",
    accentLight: "#fff0ec",
    image: "/full-stack.webp",
    stat: { value: "5×", label: "Faster Time to Market" },
    tags: ["Full Stack Dev", "REST APIs", "Cloud Hosting", "CI/CD"],
    badges: [{ icon: "🗄️", text: "Database Expert" }, { icon: "🔗", text: "API Integration" }, { icon: "🛡️", text: "99.9% Uptime" }],
  },
  {
    id: 4,
    index: "05",
    tagline: "Shopify Development & eCommerce",
    headline: ["SHOPIFY STORE", "DEVELOPMENT", "& DESIGN"],
    sub: "Expert Shopify development and custom theme design that increases conversions, reduces bounce rates, and turns your online store into a revenue-generating machine.",
    accent: "#E8380D",
    accentLight: "#fff0ec",
    image: "/shopify.webp",
    stat: { value: "3×", label: "Average Revenue Increase" },
    tags: ["Shopify Development", "eCommerce Design", "Shopify Plus"],
    badges: [{ icon: "💰", text: "3× Revenue" }, { icon: "🛒", text: "CRO Optimized" }, { icon: "📈", text: "Sales Analytics" }],
  },
];

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}` : "0,0,0";
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const startProgress = useCallback(() => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    const step = 100 / (5500 / 50);
    progressRef.current = setInterval(() => setProgress(p => Math.min(p + step, 100)), 50);
  }, []);

  const goTo = useCallback((next: number) => {
    if (animating || next === current) return;
    setAnimating(true);
    setPrevIdx(current);
    setCurrent(next);
    startProgress();
    setTimeout(() => { setPrevIdx(null); setAnimating(false); }, 800);
  }, [animating, current, startProgress]);

  const goNext = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  const resetAuto = useCallback(() => {
    clearTimers();
    startProgress();
    autoRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
      startProgress();
    }, 5500);
  }, [startProgress]);

  useEffect(() => {
    setMounted(true);
    startProgress();
    autoRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
      startProgress();
    }, 5500);
    return clearTimers;
  }, []);

  const slide = SLIDES[current];
  const prevSlide = prevIdx !== null ? SLIDES[prevIdx] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');
        .hero-wrap { font-family: 'Inter', sans-serif; }

        .img-in  { animation: imgIn  0.95s cubic-bezier(0.16,1,0.3,1) forwards; }
        .img-out { animation: imgOut 0.6s  cubic-bezier(0.4,0,1,1)   forwards; }
        @keyframes imgIn  { from{opacity:0;transform:scale(1.07)} to{opacity:1;transform:scale(1)} }
        @keyframes imgOut { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(0.97)} }

        .fade-up { animation: fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        .line-reveal { overflow: hidden; }
        .line-reveal > span { display:block; animation: lineUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .line-1 > span { animation-delay:0.08s; }
        .line-2 > span { animation-delay:0.17s; }
        .line-3 > span { animation-delay:0.26s; }

        .stagger-1 { animation-delay: 0.12s; }
        .stagger-2 { animation-delay: 0.22s; }
        .stagger-3 { animation-delay: 0.32s; }
        .stagger-4 { animation-delay: 0.42s; }
        .stagger-5 { animation-delay: 0.52s; }

        @keyframes lineUp { from{transform:translateY(110%)} to{transform:translateY(0)} }
        @keyframes barGrow { from{width:0 !important} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .cta-btn { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .cta-btn:hover { transform: translateY(-2px); }
        .outline-btn { transition: background 0.2s, color 0.2s; }

        .tag-pill { transition: background 0.18s, color 0.18s, border-color 0.18s; cursor: default; }

        .nav-arrow { transition: background 0.18s, color 0.18s, border-color 0.18s; }
        .nav-arrow:hover { background: #1C1917 !important; color: #fff !important; border-color: #1C1917 !important; }

        /* ── Mobile / md fixes only (max-width: 1023px) ── */
        @media (max-width: 1023px) {
          /* Shrink headline so long lines never clip */
          .hero-headline-span {
            font-size: clamp(36px, 9vw, 68px) !important;
          }
          /* Lighten overlay so the cream bg bleeds through & dark text stays readable */
          .hero-mobile-overlay {
            display: block !important;
          }
          /* Sub text full width on mobile */
          .hero-sub-text {
            max-width: 100% !important;
            font-size: 15px !important;
          }
          /* Tags: allow full width wrapping */
          .hero-tags-wrap {
            max-width: 100% !important;
          }
        }
      `}</style>

      <section
        className={`hero-wrap relative w-full bg-[#F5F2ED] overflow-hidden transition-opacity duration-500 pt-[10vh] pb-[5vh] ${mounted ? "opacity-100" : "opacity-0"}`}
        style={{ minHeight: "100svh" }}
      >
        <div className="max-w-[1600px] mx-auto px-4 xl:px-10">

          {/* ────────── RIGHT: full-bleed image ────────── */}
          <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[55%] z-0 overflow-hidden">
            {prevSlide && (
              <img key={`out-${prevIdx}`} src={prevSlide.image} alt=""
                className="img-out absolute inset-0 w-full h-full object-cover" />
            )}
            <img key={`in-${current}`} src={slide.image} alt={slide.tagline}
              className="img-in absolute inset-0 w-full h-full object-cover" />

            {/* Desktop left fade — untouched */}
            <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to right, rgba(10,8,20,0.92) 0%, rgba(10,8,20,0.55) 38%, transparent 68%)" }} />

            {/* Mobile/md: cream overlay so bg colour shows and dark text is legible */}
            <div
              className="hero-mobile-overlay absolute inset-0 lg:hidden"
              style={{ background: "linear-gradient(to bottom, rgba(245,242,237,0.80) 0%, rgba(245,242,237,0.65) 50%, rgba(245,242,237,0.88) 100%)" }}
            />

            {/* Bottom vignette */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,20,0.6) 0%, transparent 40%)" }} />
            {/* Per-slide accent wash */}
            <div className="absolute inset-0 transition-all duration-700"
              style={{ background: `linear-gradient(140deg,transparent 35%,rgba(${hexToRgb(slide.accent)},0.13) 100%)` }} />
          </div>

          {/* ────────── Noise ────────── */}
          <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px"
            }} />

          {/* ────────── Main content ────────── */}
          <div className="relative z-20 flex flex-col min-h-[80vh] justify-center pt-[10vh]">

            {/* Top strip */}
            <div className="flex items-center justify-between pt-0 pb-[2vh]">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: slide.accent, boxShadow: `0 0 8px ${slide.accent}`, animation: "blink 1.8s ease-in-out infinite" }} />
                <span key={`tag-${current}`} className="fade-up text-[11px] font-semibold tracking-[0.32em] uppercase"
                  style={{ color: slide.accent }}>
                  {slide.tagline}
                </span>
              </div>
              <span className="text-[11px] tracking-[0.2em] text-[#9a9489] font-medium select-none">
                <span style={{ color: slide.accent, fontWeight: 700 }}>{slide.index}</span>
                <span className="mx-1.5 opacity-40">/</span>
                {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>

            {/* Hero body */}
            <div className="flex items-center py-0">
              <div className="w-full lg:w-[50%] max-w-[740px]">

                {/* Headline */}
                {/* Headline - Only ONE H1 tag */}
                <div key={`h-${current}`} className="mb-7">
                  {slide.headline.map((line, i) => {
                    const isMainHeading = i === 1; // Make the middle line (e.g., "WEB DESIGN") the H1

                    return (
                      <div key={i} className={`line-reveal line-${i + 1}`}>
                        {isMainHeading ? (
                          <h1
                            className="hero-headline-span"
                            style={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize: "clamp(54px,7.5vw,104px)",
                              lineHeight: 0.92,
                              letterSpacing: "0.02em",
                              fontWeight: 400,
                              color: slide.accent,
                              display: "block",
                            }}>
                            {line}
                          </h1>
                        ) : (
                          <h2
                            className="hero-headline-span"
                            style={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize: "clamp(54px,7.5vw,104px)",
                              lineHeight: 0.92,
                              letterSpacing: "0.02em",
                              fontWeight: 400,
                              color: "#1C1917",
                              display: "block",
                            }}>
                            {line}
                          </h2>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Body block */}
                <div key={`b-${current}`}>
                  <p className="hero-sub-text fade-up stagger-1 xl:text-[18px] text-[16px]  lg:text-[#5C5751] text-black leading-[1.72] max-w-[440px] 2xl:max-w-[500px] mb-6 lg:font-light">
                    {slide.sub}
                  </p>

                  {/* CTAs */}
                  <div className="fade-up stagger-3 flex items-center gap-3 flex-wrap mb-8">
                    <a href="#contact"
                      className="cta-btn inline-flex items-center gap-2 px-7 py-[13px] text-white text-[11.5px] font-semibold tracking-[0.18em] uppercase rounded-full no-underline"
                      style={{ background: slide.accent, boxShadow: `0 8px 28px rgba(${hexToRgb(slide.accent)},0.38)` }}>
                      Start a Project
                      <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M1 7h12M8 3l5 4-5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </a>
                    <a href="#work"
                      className="outline-btn inline-flex items-center gap-2 px-7 py-[13px] text-[#1C1917] text-[11.5px] font-semibold tracking-[0.18em] uppercase rounded-full no-underline border lg:border-[#D4CEC6] border-[#1C1917]"
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#1C1917"; el.style.color = "#fff"; el.style.borderColor = "#1C1917"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#1C1917"; el.style.borderColor = "#D4CEC6"; }}>
                      View Work
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom controls — removed the "hidden" class that was hiding these entirely */}
            <div className="flex items-center gap-4 pb-0 hidden">
              {/* Arrows */}
              <div className="flex gap-2">
                <button onClick={() => { goPrev(); resetAuto(); }} aria-label="Previous"
                  className="nav-arrow w-10 h-10 rounded-full border border-[#D4CEC6] bg-white flex items-center justify-center text-[#1C1917]">
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button onClick={() => { goNext(); resetAuto(); }} aria-label="Next"
                  className="nav-arrow w-10 h-10 rounded-full border border-[#D4CEC6] bg-white flex items-center justify-center text-[#1C1917]">
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-[7px]">
                {SLIDES.map((s, i) => (
                  <button key={i} aria-label={`Slide ${i + 1}`}
                    onClick={() => { goTo(i); resetAuto(); }}
                    className="border-0 p-0 cursor-pointer rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 26 : 8, height: 8,
                      background: i === current ? slide.accent : "#D4CEC6",
                      boxShadow: i === current ? `0 0 10px rgba(${hexToRgb(slide.accent)},0.5)` : "none",
                    }} />
                ))}
              </div>

              {/* Progress */}
              <div className="flex-1 h-[2px] bg-[#E0DAD3] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-[width] duration-75"
                  style={{ width: `${progress}%`, background: slide.accent, boxShadow: `0 0 8px rgba(${hexToRgb(slide.accent)},0.45)` }} />
              </div>

              {/* Live badge */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E8E3DC] shadow-sm flex-shrink-0"
                style={{ animation: "floatY 3.5s ease-in-out infinite" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: "#22C55E", boxShadow: "0 0 6px rgba(34,197,94,0.7)" }} />
                <span className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-[#1C1917]">Available Now</span>
              </div>
            </div>
          </div>

          {/* ────────── Floating metrics card — lg+ only, hidden on mobile/md ────────── */}
          <div key={`card-${current}`}
            className="hidden lg:block absolute xl:right-[10%] right-[2%] top-1/2 z-30 xl:w-[350px] w-[250px] fade-up"
            style={{ transform: "translateY(-50%)" }}>
            <div className="bg-white rounded-2xl overflow-hidden border border-[#E8E3DC] shadow-[0_24px_64px_rgba(0,0,0,0.09)]">
              <div className="h-[3px]" style={{ background: slide.accent }} />
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="xl:text-[11px] text-[10px] font-bold tracking-[0.3em] uppercase text-[#9a9489]">Live Metrics</span>
                  <span className="w-2 h-2 rounded-full" style={{ background: slide.accent, animation: "blink 1.8s ease-in-out infinite" }} />
                </div>
                <div className="leading-none mb-1" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 60, fontWeight: 400, color: slide.accent }}>
                  {slide.stat.value}
                </div>
                <div className="xl:text-[13px] text-[11px] font-semibold tracking-[0.2em] uppercase text-[#9a9489] mb-4">
                  {slide.stat.label}
                </div>
                <div className="h-[3px] bg-[#F0EDE8] rounded-full overflow-hidden mb-1">
                  <div key={`bar-${current}`} className="h-full rounded-full"
                    style={{ background: slide.accent, width: "100%", animation: "barGrow 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s both" }} />
                </div>
                <div className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#C0B9B0] mb-5">Performance Index</div>
                <div className="grid grid-cols-3 gap-1 pt-4 border-t border-[#F0EDE8]">
                  {[["24/7", "Support"], ["∞", "Revisions"], ["100%", "Dedicated"]].map(([v, l]) => (
                    <div key={l} className="text-center">
                      <div className="leading-none mb-0.5 xl:text-[22px] text-[18px]" style={{ fontFamily: "'Bebas Neue',sans-serif", fontWeight: 400, color: slide.accent }}>{v}</div>
                      <div className="xl:text-[10px] text-[8px] font-semibold tracking-[0.12em] uppercase text-[#9a9489]">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ────────── Vertical service label ────────── */}
          <div className="hidden absolute right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-none select-none">
            <span key={`vert-${current}`}
              className="fade-up text-[9px] font-bold tracking-[0.4em] uppercase transition-colors duration-500"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed", color: slide.accent, opacity: 0.7 }}>
              {slide.tagline}
            </span>
          </div>
        </div>

      </section>
    </>
  );
}