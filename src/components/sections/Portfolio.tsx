"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  { _id:"1",  title:"E-Commerce Platform",   category:"Web Development", color:"#ff4d00", mainImage:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",  description:"Custom Shopify Plus solution with advanced analytics and 3x conversion improvement.", tags:["Shopify","React","Node.js"], year:"2024", client:"TechStore Inc.", featured:true },
  { _id:"2",  title:"Brand Identity System",  category:"Graphic Design",   color:"#00c8ff", mainImage:"https://images.unsplash.com/photo-1626785774573-4b7993125651?auto=format&fit=crop&w=800&q=80",  description:"Complete brand overhaul including logo, packaging, and digital assets for luxury cosmetics.", tags:["Branding","UI/UX","Print"], year:"2024", client:"Luxe Beauty", featured:false },
  { _id:"3",  title:"SaaS Dashboard",         category:"Web Design",       color:"#a855f7", mainImage:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",  description:"Analytics dashboard with real-time data visualization and intuitive UX.", tags:["React","TypeScript","D3.js"], year:"2023", client:"DataFlow", featured:false },
  { _id:"4",  title:"Mobile Banking App",     category:"Full Stack",       color:"#10d4a0", mainImage:"https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",  description:"Secure mobile banking solution with biometric auth and instant transfers.", tags:["React Native","Node.js","AWS"], year:"2023", client:"FinanceHub", featured:false },
  { _id:"5",  title:"Restaurant Website",     category:"Web Design",       color:"#f59e0b", mainImage:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",  description:"Elegant online presence with reservation system and menu management.", tags:["Next.js","Sanity CMS","Stripe"], year:"2024", client:"Bistro Moderne", featured:false },
  { _id:"6",  title:"Corporate Portal",       category:"Web Development",  color:"#ff4d00", mainImage:"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",  description:"Enterprise intranet with document management and team collaboration tools.", tags:["Angular","Python","PostgreSQL"], year:"2023", client:"GlobalTech", featured:false },
  { _id:"7",  title:"Fitness Tracking App",   category:"Full Stack",       color:"#10d4a0", mainImage:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",  description:"Cross-platform fitness app with workout plans, progress tracking, and social features.", tags:["React Native","Firebase","HealthKit"], year:"2024", client:"FitLife", featured:false },
  { _id:"8",  title:"Real Estate Platform",   category:"Web Development",  color:"#a855f7", mainImage:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",  description:"Property search platform with virtual tours, mortgage calculator, and agent matching.", tags:["Next.js","Mapbox","Stripe"], year:"2023", client:"HomeFind", featured:false },
  { _id:"9",  title:"Fashion E-Commerce",     category:"Shopify",          color:"#f59e0b", mainImage:"https://images.unsplash.com/photo-1445205170232-277528bb6b53?auto=format&fit=crop&w=800&q=80",  description:"Luxury fashion store with AR try-on, personalised recommendations, and seamless checkout.", tags:["Shopify Plus","Three.js","Klaviyo"], year:"2024", client:"StyleHub", featured:false },
  { _id:"10", title:"Healthcare Portal",      category:"Full Stack",       color:"#00c8ff", mainImage:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",  description:"Patient management system with appointment scheduling, telemedicine, and EHR integration.", tags:["React","Node.js","HIPAA"], year:"2023", client:"MediCare+", featured:false },
  { _id:"11", title:"Travel Booking App",     category:"Full Stack",       color:"#ff4d00", mainImage:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",  description:"All-in-one travel app with flight/hotel booking, itinerary planning, and local guides.", tags:["Flutter","Google Maps","Stripe"], year:"2024", client:"Wanderlust", featured:false },
  { _id:"12", title:"Education Platform",     category:"Web Design",       color:"#10d4a0", mainImage:"https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",  description:"Online learning platform with interactive courses, progress tracking, and certification.", tags:["Next.js","Video.js","Auth0"], year:"2023", client:"EduLearn", featured:false },
];

const CATEGORIES = ["All","Web Design","Web Development","Graphic Design","Full Stack","Shopify"];

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

export default function PortfolioSection() {
  const { ref, inView } = useInView(0.06);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount]     = useState(6);
  const [loadingMore, setLoadingMore]       = useState(false);

  const filtered = activeCategory === "All" ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);
  const visible  = filtered.slice(0, visibleCount);
  const featured = filtered.find(p => p.featured) ?? filtered[0];
  const grid     = visible.filter(p => p._id !== featured._id);

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => { setVisibleCount(c => c + 6); setLoadingMore(false); }, 700);
  };

  return (
    <section ref={ref} id="work" className="relative overflow-hidden py-[10vh]"
      style={{ fontFamily: "'DM Mono','Courier New',monospace", background: "linear-gradient(165deg,#050310 0%,#0a0818 45%,#050310 100%)" }}>
      {/* Backgrounds */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(255,77,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.03) 1px,transparent 1px)", backgroundSize: "64px 64px", animation: "sectionGridDrift 26s linear infinite" }} />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 4px)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[800px] h-[800px] -top-48 -left-48" style={{ background: "radial-gradient(circle,rgba(255,77,0,0.10),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[600px] h-[600px] -bottom-24 -right-36" style={{ background: "radial-gradient(circle,rgba(16,212,160,0.07),transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 relative z-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 gap-7 xl:grid-cols-2 xl:gap-[60px] mb-12 xl:mb-16 items-end">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
            <div className="flex items-center gap-3.5 mb-3.5">
              <span className="inline-block w-12 h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
              <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase" style={monoFont}>Our Work</span>
            </div>
            <h2 className="leading-none text-white m-0" style={{ ...bebasFont, fontSize: "clamp(40px,5.5vw,64px)", letterSpacing: "0.03em" }}>
              Featured<br />
              <span style={{ color: "#ff4d00", textShadow: "0 0 50px rgba(255,77,0,0.45)" }}>Projects</span>
            </h2>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
            <p className="text-[14px] text-white/50 leading-[1.78] mb-6 max-w-[520px]" style={monoFont}>
              Explore our latest work and see how we've helped brands transform their digital presence with bold design and clean code.
            </p>
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
                  className="px-4 py-2 rounded-full text-[10px] tracking-[0.22em] uppercase border transition-all duration-300 cursor-pointer"
                  style={{ ...monoFont, background: activeCategory === cat ? "#ff4d00" : "rgba(255,255,255,0.04)", color: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.5)", borderColor: activeCategory === cat ? "#ff4d00" : "rgba(255,255,255,0.12)", boxShadow: activeCategory === cat ? "0 0 20px rgba(255,77,0,0.4)" : "none" }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Featured card (tall) ── */}
        {featured && (
          <div className="mb-5 xl:mb-6" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
            <FeaturedCard project={featured} />
          </div>
        )}

        {/* ── Uniform grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5 mb-12 xl:mb-16">
          {grid.map((p, i) => (
            <GridCard key={p._id} project={p} index={i} inView={inView} />
          ))}
          {loadingMore && [...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden" style={{ height: 280 }}>
              <div className="h-full animate-pulse bg-white/[0.06]" />
            </div>
          ))}
        </div>

        {/* Load more */}
        {visibleCount < filtered.length && (
          <div className="flex justify-center">
            <button onClick={loadMore} disabled={loadingMore}
              className="inline-flex items-center gap-3 py-4 px-10 text-white text-[11px] tracking-[0.22em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,77,0,0.45)] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ ...monoFont, background: "linear-gradient(135deg,#ff4d00,#ff8c00)", clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))", boxShadow: "0 8px 32px rgba(255,77,0,0.38)" }}>
              {loadingMore ? "Loading…" : "Load More Projects"} <span>→</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @keyframes sectionGridDrift { 100% { background-position: 64px 64px; } }
      `}</style>
    </section>
  );
}

// ── Featured card ────────────────────────────────────────────────────────────
function FeaturedCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 cursor-pointer transition-all duration-500"
      style={{ height: "clamp(340px,45vw,520px)", borderColor: hovered ? project.color : undefined, boxShadow: hovered ? `0 0 0 1px ${project.color}, 0 30px 80px rgba(0,0,0,0.5), 0 0 60px ${project.color}22` : "0 12px 50px rgba(0,0,0,0.4)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <img src={project.mainImage} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700" style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }} loading="lazy" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(5,3,16,0.95) 0%,rgba(5,3,16,0.7) 45%,rgba(5,3,16,0.2) 100%)" }} />
      <div className="absolute top-0 right-0 w-32 h-32 opacity-60 pointer-events-none" style={{ background: `linear-gradient(135deg,${project.color},transparent)`, clipPath: "polygon(100% 0,0 0,100% 100%)" }} />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-7 xl:p-10">
        <div className="flex items-center justify-between">
          <span className="px-4 py-1.5 rounded-full text-[9px] tracking-[0.25em] uppercase" style={{ fontFamily: "'DM Mono',monospace", background: "rgba(5,3,16,0.85)", border: `1px solid ${project.color}44`, color: project.color }}>
            ★ Featured · {project.category}
          </span>
          <span className="text-[9px] tracking-[0.2em] text-white/30 uppercase" style={{ fontFamily: "'DM Mono',monospace" }}>{project.year}</span>
        </div>
        <div className="max-w-[520px]">
          <div className="text-[11px] tracking-[0.2em] text-white/40 uppercase mb-2" style={{ fontFamily: "'DM Mono',monospace" }}>{project.client}</div>
          <h3 style={{ fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: "clamp(32px,4.5vw,60px)", color: "#fff", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 12 }}>{project.title}</h3>
          <p className="text-[13px] text-white/55 leading-[1.7] mb-5 max-w-[420px]" style={{ fontFamily: "'DM Mono',monospace" }}>{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((t, i) => <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] bg-white/[0.08] border border-white/15 text-white/60" style={{ fontFamily: "'DM Mono',monospace" }}>{t}</span>)}
          </div>
          <div className="flex items-center gap-2" style={{ color: project.color }}>
            <span className="text-[11px] tracking-[0.25em] uppercase" style={{ fontFamily: "'DM Mono',monospace" }}>View Case Study</span>
            <span className="text-base">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Grid card ────────────────────────────────────────────────────────────────
function GridCard({ project, index, inView }: { project: typeof PROJECTS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [scrollProg, setScrollProg] = useState(0);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    if (!hovered) { setScrollProg(0); return; }
    const start = performance.now(); const dur = 3000;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const e = t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2;
      setScrollProg(e);
      if (t < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current !== null) cancelAnimationFrame(animRef.current); };
  }, [hovered]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 cursor-pointer transition-all duration-500"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)", transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, border-color 0.4s, box-shadow 0.4s`, borderColor: hovered ? project.color : undefined, boxShadow: hovered ? `0 0 0 1px ${project.color}, 0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${project.color}22` : "0 8px 30px rgba(0,0,0,0.35)" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 260 }}>
        <div className="w-full" style={{ height: 650 }}>
          <img src={project.mainImage} alt={project.title} className="w-full h-full object-cover" loading="lazy"
            style={{ transform: `translateY(-${scrollProg * 58}%)`, transition: hovered ? "none" : "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }} />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(5,3,16,0.1) 0%,rgba(5,3,16,0.88) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at top,${project.color}18,transparent 65%)`, opacity: hovered ? 1 : 0 }} />
        <div className="absolute top-0 right-0 w-14 h-14 opacity-60" style={{ background: `linear-gradient(135deg,${project.color},transparent)`, clipPath: "polygon(100% 0,0 0,100% 100%)" }} />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3.5 py-1.5 rounded-full text-[9px] tracking-[0.22em] uppercase" style={{ fontFamily: "'DM Mono',monospace", background: "rgba(5,3,16,0.88)", border: `1px solid ${project.color}44`, color: project.color }}>{project.category}</span>
        </div>
        {/* Scroll indicator */}
        <div className={`absolute right-3 top-1/2 -translate-y-1/2 w-px h-16 transition-opacity duration-400 ${hovered ? "opacity-100" : "opacity-0"}`}
          style={{ background: `linear-gradient(180deg,${project.color},transparent)`, boxShadow: `0 0 10px ${project.color}` }}>
          <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ background: project.color, transform: `translateY(-${scrollProg * 100}%)`, transition: "none", bottom: 0 }} />
        </div>
        {/* Default title */}
        <div className={`absolute bottom-0 left-0 right-0 p-5 transition-opacity duration-400 ${hovered ? "opacity-0" : "opacity-100"}`}>
          <h4 style={{ fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 24, color: "#fff", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 4 }}>{project.title}</h4>
          <p className="text-[11px] text-white/45 leading-[1.55]" style={{ fontFamily: "'DM Mono',monospace", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{project.description}</p>
        </div>
        {/* Hover content */}
        <div className={`absolute inset-0 p-5 flex flex-col justify-end transition-opacity duration-400 ${hovered ? "opacity-100" : "opacity-0"}`}>
          <div className="text-[9px] tracking-[0.2em] text-white/50 uppercase mb-1" style={{ fontFamily: "'DM Mono',monospace" }}>{project.client} · {project.year}</div>
          <h4 style={{ fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: 26, color: "#fff", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 6 }}>{project.title}</h4>
          <p className="text-[11.5px] text-white/65 leading-[1.6] mb-4" style={{ fontFamily: "'DM Mono',monospace", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">{project.tags.map((t,i) => <span key={i} className="px-2 py-1 rounded-lg text-[9.5px] bg-white/10 border border-white/15 text-white/60" style={{ fontFamily: "'DM Mono',monospace" }}>{t}</span>)}</div>
          <div className="flex items-center gap-2" style={{ color: project.color }}>
            <span className="text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: "'DM Mono',monospace" }}>View Project</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}