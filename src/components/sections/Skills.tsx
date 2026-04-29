"use client";
import { useEffect, useRef, useState } from "react";

const TECH_STACK = [
  { id: 1, name: "React", category: "Frontend", accent: "#61dafb", icon: "⚛" },
  { id: 2, name: "Next.js", category: "Framework", accent: "#000000", icon: "▲" },
  { id: 3, name: "TypeScript", category: "Language", accent: "#3178c6", icon: "📘" },
  { id: 4, name: "Tailwind CSS", category: "Styling", accent: "#38bdf8", icon: "🎨" },
  { id: 5, name: "Node.js", category: "Backend", accent: "#339933", icon: "🟢" },
  { id: 6, name: "Python", category: "Language", accent: "#3776ab", icon: "🐍" },
  { id: 7, name: "PostgreSQL", category: "Database", accent: "#336791", icon: "🐘" },
  { id: 8, name: "MongoDB", category: "Database", accent: "#47a248", icon: "🍃" },
  { id: 9, name: "Docker", category: "DevOps", accent: "#2496ed", icon: "🐳" },
  { id: 10, name: "AWS", category: "Cloud", accent: "#ff9900", icon: "☁" },
  { id: 11, name: "Vercel", category: "Deployment", accent: "#ffffff", icon: "▲" },
  { id: 12, name: "Figma", category: "Design", accent: "#f24e1e", icon: "🎯" },
  { id: 13, name: "GraphQL", category: "API", accent: "#e10098", icon: "◈" },
  { id: 14, name: "Stripe", category: "Payments", accent: "#635bff", icon: "💳" },
  { id: 15, name: "Shopify", category: "E-commerce", accent: "#96bf48", icon: "🛒" },
  { id: 16, name: "Redis", category: "Cache", accent: "#dc382d", icon: "🔴" },
  { id: 17, name: "Git", category: "Version Control", accent: "#f05032", icon: "🗂" },
  { id: 18, name: "Linux", category: "OS", accent: "#fcc624", icon: "🐧" },
];

// Duplicate for seamless infinite scroll
const MARQUEE_ITEMS = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

export default function TechStackSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let hasAnimated = false;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            setIsVisible(true);
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
      className="relative py-[8vh] xl:py-[12vh] overflow-hidden font-mono"
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
          animation: "techGridDrift 28s linear infinite",
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

      {/* Corner glows */}
      <div className="absolute pointer-events-none rounded-full blur-[80px] w-[600px] h-[600px] top-[-100px] left-[-150px]" style={{ background: "radial-gradient(circle, rgba(255,77,0,0.12), transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[80px] w-[500px] h-[500px] bottom-[-80px] right-[-100px]" style={{ background: "radial-gradient(circle, rgba(16,212,160,0.10), transparent 70%)" }} />

      <div className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-16 xl:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="inline-block w-[52px] h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
            <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase">Our Toolkit</span>
            <span className="inline-block w-[52px] h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
          </div>
          <h2 className="font-bebas text-[clamp(38px,5.5vw,62px)] text-white leading-[1.02] tracking-[0.03em] m-0 mb-4">
            Powered By<br />
            <span className="text-[#ff4d00] drop-shadow-[0_0_50px_rgba(255,77,0,0.45)]">Modern Technology</span>
          </h2>
          <p className="text-[13.5px] text-white/50 leading-[1.75] max-w-[480px] mx-auto">
            We leverage cutting-edge tools and frameworks to build scalable, 
            high-performance digital solutions that stand the test of time.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden py-8 xl:py-12">
          
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 xl:w-40 z-20 pointer-events-none" style={{
            background: "linear-gradient(90deg, #0a0a0f 0%, transparent 100%)"
          }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 xl:w-40 z-20 pointer-events-none" style={{
            background: "linear-gradient(270deg, #0a0a0f 0%, transparent 100%)"
          }} />

          {/* Row 1 - Left to Right */}
          <div className="flex gap-6 xl:gap-8 animate-marqueeLeft">
            {MARQUEE_ITEMS.map((tech, i) => (
              <TechItem key={`row1-${i}`} tech={tech} isVisible={isVisible} />
            ))}
          </div>

          {/* Row 2 - Right to Left (offset) */}
          <div className="flex gap-6 xl:gap-8 animate-marqueeRight mt-4 xl:mt-6">
            {MARQUEE_ITEMS.slice().reverse().map((tech, i) => (
              <TechItem key={`row2-${i}`} tech={tech} isVisible={isVisible} isReversed />
            ))}
          </div>

          {/* Row 3 - Left to Right (mobile only) */}
          <div className="flex gap-6 xl:gap-8 animate-marqueeLeft mt-4 xl:mt-6 sm:hidden">
            {MARQUEE_ITEMS.map((tech, i) => (
              <TechItem key={`row3-${i}`} tech={tech} isVisible={isVisible} />
            ))}
          </div>
        </div>

        {/* Category Legend */}
        <div className="flex flex-wrap justify-center gap-3 xl:gap-4 mt-12 xl:mt-16">
          {["Frontend", "Backend", "Database", "DevOps", "Design"].map((cat, i) => {
            const colors = ["#61dafb", "#339933", "#336791", "#2496ed", "#f24e1e"];
            return (
              <div
                key={cat}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent)] hover:bg-white/10"
                style={{
                  // @ts-ignore
                  "--accent": colors[i],
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: colors[i], boxShadow: `0 0 8px ${colors[i]}66` }} />
                <span className="font-dmMono text-[10px] tracking-[0.25em] text-white/60 uppercase">
                  {cat}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 xl:mt-20">
          <a
            href="#contact"
            className="inline-flex items-center gap-3.5 py-4 px-[42px] bg-gradient-to-br from-[#ff4d00] to-[#ff8c00] text-white no-underline font-mono text-[12px] tracking-[.22em] uppercase rounded-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
              boxShadow: "0 10px 42px rgba(255,77,0,0.42)",
            }}
          >
            <span>Discuss Your Tech Needs</span>
            <span className="text-[18px]">→</span>
          </a>
          <p className="font-mono text-[11px] text-white/30 mt-4 tracking-[.08em]">
            Free consultation&nbsp;&nbsp;·&nbsp;&nbsp;Expert guidance&nbsp;&nbsp;·&nbsp;&nbsp;Future-proof solutions
          </p>
        </div>
      </div>

      {/* Tech Item Component */}
      {isVisible && <style>{`
        @keyframes techGridDrift {
          0% { background-position: 0 0; }
          100% { background-position: 64px 64px; }
        }
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marqueeLeft {
          animation: marqueeLeft 45s linear infinite;
          will-change: transform;
        }
        .animate-marqueeRight {
          animation: marqueeRight 45s linear infinite;
          will-change: transform;
        }
        .tech-item {
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .tech-item:hover {
          transform: translateY(-3px) scale(1.03);
        }
        .tech-item:hover .tech-glow {
          opacity: 1;
          transform: scale(1.2);
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marqueeLeft,
          .animate-marqueeRight {
            animation: none;
            transform: none;
          }
        }
      `}</style>}

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

// Tech Item Sub-component
function TechItem({ 
  tech, 
  isVisible, 
  isReversed = false 
}: { 
  tech: typeof TECH_STACK[0]; 
  isVisible: boolean;
  isReversed?: boolean;
}) {
  return (
    <div
      className="tech-item flex-shrink-0 w-[140px] xl:w-[160px] p-4 xl:p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm cursor-default"
      style={{
        transitionDelay: isVisible ? "0ms" : "200ms",
      }}
    >
      {/* Glow effect */}
      <div
        className="tech-glow absolute inset-0 rounded-xl opacity-0 transition-all duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${tech.accent}22, transparent 70%)`,
          boxShadow: `0 0 30px ${tech.accent}33`,
        }}
      />
      
      {/* Icon */}
      <div
        className="w-10 h-10 xl:w-12 xl:h-12 rounded-lg flex items-center justify-center text-xl xl:text-2xl mb-3 mx-auto backdrop-blur-sm"
        style={{
          background: `rgba(5,3,13,0.8)`,
          border: `1px solid ${tech.accent}44`,
          color: tech.accent,
          boxShadow: `0 0 18px ${tech.accent}33`,
        }}
      >
        {tech.icon}
      </div>
      
      {/* Name */}
      <div className="text-center">
        <span 
          className="font-bebas text-[18px] xl:text-[20px] text-white leading-none block mb-1"
          style={{ letterSpacing: "0.02em" }}
        >
          {tech.name}
        </span>
        <span className="font-dmMono text-[9px] xl:text-[10px] text-white/40 tracking-[0.25em] uppercase block">
          {tech.category}
        </span>
      </div>
      
      {/* Hover accent bar */}
      <div
        className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.1)" }}
      >
        <div
          className="h-full w-0 transition-all duration-500 group-hover:w-full"
          style={{
            background: `linear-gradient(90deg, ${tech.accent}, ${tech.accent}88)`,
            boxShadow: `0 0 8px ${tech.accent}`,
          }}
        />
      </div>
    </div>
  );
}