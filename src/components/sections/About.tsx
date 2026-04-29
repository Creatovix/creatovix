"use client";
import { useEffect, useRef, useState } from "react";

const VALUES = [
  {
    id: 1,
    icon: "✦",
    title: "Craftsmanship",
    description: "Every pixel, line of code, and interaction is meticulously crafted with purpose and precision.",
    accent: "#ff4d00",
  },
  {
    id: 2,
    icon: "◈",
    title: "Innovation",
    description: "We embrace emerging technologies and creative approaches to solve complex challenges.",
    accent: "#00c8ff",
  },
  {
    id: 3,
    icon: "⬡",
    title: "Partnership",
    description: "Your success is our success. We work as an extension of your team, not just a vendor.",
    accent: "#a855f7",
  },
  {
    id: 4,
    icon: "⬢",
    title: "Excellence",
    description: "We don't settle for good enough. We push boundaries to deliver exceptional results.",
    accent: "#10d4a0",
  },
];

const TEAM = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    accent: "#ff4d00",
  },
  {
    id: 2,
    name: "Jordan Chen",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    accent: "#00c8ff",
  },
  {
    id: 3,
    name: "Sam Taylor",
    role: "UX Strategist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    accent: "#a855f7",
  },
  {
    id: 4,
    name: "Morgan Lee",
    role: "Full Stack Engineer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    accent: "#10d4a0",
  },
];

const MILESTONES = [
  { year: "2019", event: "Founded with a vision to redefine digital experiences" },
  { year: "2021", event: "Expanded to full-stack development & enterprise solutions" },
  { year: "2023", event: "Launched Shopify division & global client partnerships" },
  { year: "2024", event: "Recognized as Top 50 Digital Agency by Industry Awards" },
];

export default function AboutSection() {
  const [visibleItems, setVisibleItems] = useState<{ values: boolean; team: boolean; milestones: boolean }>({
    values: false,
    team: false,
    milestones: false,
  });
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let hasAnimated = false;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            // Staggered reveal
            setTimeout(() => setVisibleItems((p) => ({ ...p, values: true })), 200);
            setTimeout(() => setVisibleItems((p) => ({ ...p, team: true })), 500);
            setTimeout(() => setVisibleItems((p) => ({ ...p, milestones: true })), 800);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-[10vh] xl:py-[14vh] overflow-hidden font-mono"
      style={{
        fontFamily: `'DM Mono', 'Courier New', monospace`,
        background: "linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)",
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255,77,0,0.10) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(0,200,255,0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,77,0,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(255,77,0,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          animation: "aboutGridDrift 30s linear infinite",
          opacity: 0.6,
        }}
      />

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 4px)",
          opacity: 0.4,
        }}
      />

      {/* Decorative glows */}
      <div className="absolute pointer-events-none rounded-full blur-[90px] w-[700px] h-[700px] top-[-120px] left-[-180px]" style={{ background: "radial-gradient(circle, rgba(255,77,0,0.11), transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[90px] w-[550px] h-[550px] bottom-[-80px] right-[-100px]" style={{ background: "radial-gradient(circle, rgba(16,212,160,0.09), transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto xl:px-10 px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-16 xl:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="inline-block w-[52px] h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
            <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase">Who We Are</span>
            <span className="inline-block w-[52px] h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
          </div>
          <h2 className="font-bebas text-[clamp(38px,5.5vw,62px)] text-white leading-[1.02] tracking-[0.03em] m-0 mb-4">
            Building Digital<br />
            <span className="text-[#ff4d00] drop-shadow-[0_0_50px_rgba(255,77,0,0.45)]">Excellence Since 2019</span>
          </h2>
          <p className="text-[13.5px] text-white/50 leading-[1.75] max-w-[480px] mx-auto">
            We're a passionate team of designers, developers, and strategists dedicated to transforming bold ideas into exceptional digital experiences.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center mb-20 xl:mb-24">
          
          {/* Left: Image Collage */}
          <div className="relative">
            {/* Main Image */}
            <div
              className={`
                relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm
                transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${visibleItems.values ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{
                boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Our team collaborating"
                className="w-full h-[420px] xl:h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(180deg, transparent 0%, rgba(10,10,15,0.85) 100%)"
              }} />
              
              {/* Floating badge */}
              <div
                className="absolute bottom-6 left-6 px-4 py-3 rounded-xl backdrop-blur-md border"
                style={{
                  background: "rgba(5,3,13,0.85)",
                  borderColor: "#ff4d0044",
                  boxShadow: "0 0 25px rgba(255,77,0,0.3)",
                }}
              >
                <div className="font-bebas text-[28px] text-[#ff4d00] leading-none">5+ Years</div>
                <div className="font-dmMono text-[9px] text-white/50 tracking-[0.2em] uppercase mt-1">Of Excellence</div>
              </div>

              {/* Accent corner */}
              <div
                className="absolute top-0 right-0 w-20 h-20"
                style={{
                  background: "linear-gradient(135deg, #ff4d00, transparent)",
                  clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  opacity: 0.75,
                }}
              />
            </div>

            {/* Secondary Image (overlapping) */}
            <div
              className={`
                absolute -bottom-6 -right-6 xl:-right-10 w-[180px] xl:w-[220px] rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm
                transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150
                ${visibleItems.values ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{
                boxShadow: "0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80"
                alt="Design process"
                className="w-full h-[140px] xl:h-[160px] object-cover"
                loading="lazy"
              />
              <div className="p-3">
                <div className="font-dmMono text-[9px] text-white/60 tracking-[0.2em] uppercase">Creative Process</div>
              </div>
            </div>

            {/* Decorative elements */}
            <div
              className="absolute -top-4 -left-4 w-24 h-24 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,77,0,0.15), transparent 70%)",
                filter: "blur(20px)",
              }}
            />
          </div>

          {/* Right: Content */}
          <div className="space-y-8">
            {/* Story */}
            <div
              className={`
                transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${visibleItems.values ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
            >
              <h3 className="font-bebas text-[28px] xl:text-[32px] text-white leading-none mb-4 tracking-[0.02em]">
                Our Story
              </h3>
              <p className="text-[13.5px] text-white/60 leading-[1.75] mb-4">
                Founded in 2019, we started with a simple belief: great digital experiences shouldn't be complicated. 
                What began as a small studio has grown into a full-service agency serving clients worldwide.
              </p>
              <p className="text-[13.5px] text-white/60 leading-[1.75]">
                Today, we combine strategic thinking, creative excellence, and technical expertise to deliver 
                solutions that don't just look great — they drive real business results.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUES.map((value, i) => (
                <div
                  key={value.id}
                  className={`
                    p-4 rounded-xl backdrop-blur-sm border transition-all duration-500
                    ${visibleItems.values ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  `}
                  style={{
                    transitionDelay: `${i * 80}ms`,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-lg mb-3"
                    style={{
                      background: `rgba(5,3,13,0.8)`,
                      border: `1px solid ${value.accent}44`,
                      color: value.accent,
                      boxShadow: `0 0 16px ${value.accent}33`,
                    }}
                  >
                    {value.icon}
                  </div>
                  <h4 className="font-bebas text-[18px] text-white leading-none mb-1.5">{value.title}</h4>
                  <p className="text-[11px] text-white/50 leading-[1.6]">{value.description}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div
              className={`
                transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200
                ${visibleItems.milestones ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
            >
              <h4 className="font-dmMono text-[10px] tracking-[0.3em] text-white/40 uppercase mb-4">Our Journey</h4>
              <div className="space-y-3">
                {MILESTONES.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{
                        background: "#ff4d00",
                        boxShadow: "0 0 8px rgba(255,77,0,0.6)",
                      }}
                    />
                    <div>
                      <span className="font-bebas text-[16px] text-[#ff4d00] leading-none">{item.year}</span>
                      <p className="text-[12px] text-white/50 leading-[1.5] ml-0.5">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20 xl:mb-24">
          <div className="text-center mb-10 xl:mb-12">
            <h3 className="font-bebas text-[clamp(28px,4vw,38px)] text-white leading-none mb-3 tracking-[0.02em]">
              Meet The Team
            </h3>
            <p className="text-[13px] text-white/50 max-w-[420px] mx-auto">
              The talented individuals behind every pixel and line of code.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 xl:gap-6">
            {TEAM.map((member, i) => (
              <div
                key={member.id}
                className={`
                  group relative rounded-xl overflow-hidden backdrop-blur-sm border transition-all duration-500
                  hover:-translate-y-1 hover:shadow-xl
                  ${visibleItems.team ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                `}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              >
                {/* Image */}
                <div className="relative h-[180px] xl:h-[200px] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(180deg, transparent 0%, rgba(5,3,13,0.9) 100%)"
                  }} />
                  
                  {/* Accent corner */}
                  <div
                    className="absolute top-0 right-0 w-12 h-12"
                    style={{
                      background: `linear-gradient(135deg, ${member.accent}, transparent)`,
                      clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                      opacity: 0.7,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="font-bebas text-[18px] text-white leading-none mb-0.5">{member.name}</h4>
                  <p className="font-dmMono text-[10px] text-white/50 tracking-[0.2em] uppercase">{member.role}</p>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top, ${member.accent}18, transparent 65%)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-3.5 py-4 px-[42px] bg-gradient-to-br from-[#ff4d00] to-[#ff8c00] text-white no-underline font-mono text-[12px] tracking-[.22em] uppercase rounded-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
              boxShadow: "0 10px 42px rgba(255,77,0,0.42)",
            }}
          >
            <span>Let's Work Together</span>
            <span className="text-[18px]">→</span>
          </a>
          <p className="font-mono text-[11px] text-white/30 mt-4 tracking-[.08em]">
            Free consultation&nbsp;&nbsp;·&nbsp;&nbsp;No obligation&nbsp;&nbsp;·&nbsp;&nbsp;24h response
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes aboutGridDrift {
          0% { background-position: 0 0; }
          100% { background-position: 64px 64px; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        
        @font-face {
          font-family: 'Bebas Neue';
          font-style: normal;
          font-weight: 400;
          src: local('Bebas Neue'), url('https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg1_i6t8kCHKm459WxRxC7m0dR7G4w.woff2') format('woff2');
        }
        @font-face {
          font-family: 'DM Mono';
          font-style: normal;
          font-weight: 400;
          src: local('DM Mono'), url('https://fonts.gstatic.com/s/dmmono/v5/aFTR7PB1QTsUX8KYvrGyDQ.woff2') format('woff2');
        }
      `}</style>
    </section>
  );
}