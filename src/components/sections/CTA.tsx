"use client";
import { useEffect, useRef, useState } from "react";

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const bebasFont = { fontFamily: "'Bebas Neue', 'Impact', sans-serif" };
  const monoFont = { fontFamily: "'DM Mono', 'Courier New', monospace" };

  useEffect(() => {
    let hasAnimated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-[6vh] pb-0 overflow-hidden font-mono"
      style={{
        fontFamily: `'DM Mono', 'Courier New', monospace`,
        background:
          "linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)",
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
          radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255,77,0,0.12) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 80% 60%, rgba(0,200,255,0.09) 0%, transparent 50%)
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
          animation: "ctaGridDrift 26s linear infinite",
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
      <div
        className="absolute pointer-events-none rounded-full blur-[90px] w-[700px] h-[700px] top-[-120px] left-[-180px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,77,0,0.12), transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[90px] w-[550px] h-[550px] bottom-[-80px] right-[-100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(16,212,160,0.10), transparent 70%)",
        }}
      />

      <div className="max-w-[1600px] mx-auto xl:px-10 px-4 relative z-10">
        {/* Main CTA Card */}
        <div
          className={`
          relative rounded-3xl overflow-hidden backdrop-blur-md border border-white/10
          p-8 sm:p-10 xl:p-16
          transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Inner glow overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
              radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,77,0,0.15) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,200,255,0.08) 0%, transparent 50%)
            `,
            }}
          />

          {/* Decorative corners */}
          <div
            className="absolute top-0 left-0 w-20 h-20 pointer-events-none"
            style={{
              borderTop: "2px solid rgba(255,77,0,0.3)",
              borderLeft: "2px solid rgba(255,77,0,0.3)",
              borderRadius: "24px 0 0 0",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none"
            style={{
              borderBottom: "2px solid rgba(0,200,255,0.3)",
              borderRight: "2px solid rgba(0,200,255,0.3)",
              borderRadius: "0 0 24px 0",
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center max-w-[800px] mx-auto">
            {/* Tagline */}
            <div className="flex items-center justify-center gap-3.5 mb-4">
              <span className="inline-block w-10 h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
              <span
                className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase"
                style={monoFont}
              >
                Let's Build Something Great
              </span>
              <span className="inline-block w-10 h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
            </div>

            {/* Headline */}
            <h2
              className={`font-bebas text-[clamp(36px,6vw,64px)] text-white leading-[1.02] tracking-[0.02em] mb-6 transition-all duration-500 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ ...bebasFont, fontSize: "clamp(38px,5.5vw,62px)", letterSpacing: "0.03em" }}>
              Ready to{" "}
              <span className="text-[#ff4d00] drop-shadow-[0_0_50px_rgba(255,77,0,0.45)]">
                Transform
              </span>{" "}
              Your
              <br />
              Digital Presence?
            </h2>

            {/* Description */}
            <p
              className={`text-[14px] xl:text-[16px] text-white/60 leading-[1.75] max-w-[540px] mx-auto mb-10 transition-all duration-500 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={monoFont}>
              Let's discuss your vision, goals, and how we can bring your ideas
              to life with precision, creativity, and cutting-edge technology.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 transition-all duration-500 delay-250 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {/* Primary CTA */}
              <a
                href="#contact"
                className="inline-flex items-center gap-3 py-4 px-8 sm:px-10 bg-gradient-to-br from-[#ff4d00] to-[#ff8c00] text-white font-dmMono text-[12px] tracking-[.22em] uppercase no-underline transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  boxShadow: "0 10px 42px rgba(255,77,0,0.42)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 16px 50px rgba(255,77,0,0.55)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 10px 42px rgba(255,77,0,0.42)";
                }}
              >
                <span>Start Your Project</span>
                <span className="text-[18px]">→</span>
              </a>

              {/* Secondary CTA */}
              <a
                href="#work"
                className="inline-flex items-center gap-3 py-4 px-8 sm:px-10 bg-transparent text-white/80 font-dmMono text-[12px] tracking-[.22em] uppercase no-underline border border-white/15 transition-all duration-300 hover:border-[#ff4d00] hover:text-white"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                }}
              >
                <span>View Our Work</span>
              </a>
            </div>

            {/* Trust / Contact Info */}
            <div
              className={`flex flex-wrap items-center justify-center gap-4 xl:gap-8 transition-all duration-500 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff4d00] shadow-[0_0_8px_#ff4d00] animate-pulse" />
                <span className="font-dmMono text-[11px] text-white/50">
                  Available for new projects
                </span>
              </div>

              <span className="hidden sm:block text-white/20">|</span>

              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white/40"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span className="font-dmMono text-[11px] text-white/50">
                  contact@creativox.com
                </span>
              </div>

              <span className="hidden sm:block text-white/20">|</span>

              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white/40"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="font-dmMono text-[11px] text-white/50">
                  +92 3097909914
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes ctaGridDrift {
          0% { background-position: 0 0; }
          100% { background-position: 64px 64px; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
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
