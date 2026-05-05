"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    id: 1,
    value: 150,
    suffix: "+",
    label: "Projects Delivered",
    icon: "🚀",
    accent: "#ff4d00",
    accentRgb: "255,77,0",
    description:
      "From startups to enterprises, we've shipped digital products that scale and convert.",
    barWidth: "92%",
  },
  {
    id: 2,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    icon: "⭐",
    accent: "#00c8ff",
    accentRgb: "0,200,255",
    description:
      "Long-term partnerships built on trust, transparency, and measurable results.",
    barWidth: "98%",
  },
  {
    id: 3,
    value: 99.9,
    suffix: "%",
    label: "Uptime Guarantee",
    icon: "⚡",
    accent: "#a855f7",
    accentRgb: "168,85,247",
    description:
      "Blazing-fast, reliable infrastructure that keeps your business running 24/7.",
    barWidth: "99%",
  },
  {
    id: 4,
    value: 5,
    suffix: "x",
    label: "Faster Delivery",
    icon: "🎯",
    accent: "#10d4a0",
    accentRgb: "16,212,160",
    description:
      "Agile workflows and modern tooling to accelerate your time-to-market.",
    barWidth: "85%",
  },
];

const MILESTONES = [
  { year: "2019", event: "Founded", detail: "Started with 2 people & a vision" },
  { year: "2020", event: "First 10 Clients", detail: "Grew to full-service studio" },
  { year: "2022", event: "50+ Projects", detail: "Expanded to full-stack dev" },
  { year: "2024", event: "150+ Projects", detail: "Trusted by brands worldwide" },
];

// Utility for Bebas Neue font (kept for headlines)
const bebasFont = { fontFamily: "'Bebas Neue', sans-serif" };

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const isDecimal = target % 1 !== 0;
    const steps = 60;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? Math.round(start * 10) / 10 : Math.floor(start));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return count;
}

function StatCard({
  stat,
  index,
  visible,
}: {
  stat: typeof STATS[0];
  index: number;
  visible: boolean;
}) {
  const count = useCountUp(stat.value, 1800, visible);

  return (
    <div
      className={`
        relative p-7 pt-7 pb-5 rounded-2xl overflow-hidden
        bg-gradient-to-br from-white to-[#fafafa]
        border border-black/10
        shadow-[0_8px_40px_rgba(0,0,0,0.08),_inset_0_1px_0_rgba(255,255,255,0.8)]
        opacity-0 scale-95 translate-y-12
        transition-all duration-700
        will-change-transform
        ${visible ? "opacity-100 scale-100 translate-y-0" : ""}
        group
      `}
      style={
        {
          "--accent": stat.accent,
          "--rgb": stat.accentRgb,
          "--bar-w": stat.barWidth,
          "--delay": `${index * 0.1}s`,
          transitionDelay: visible ? `${index * 0.1}s` : undefined,
        } as React.CSSProperties
      }
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = stat.accent;
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 0 1px ${stat.accent}, 0 20px 60px rgba(0,0,0,0.12), 0 0 40px rgba(${stat.accentRgb},0.15), inset 0 1px 0 rgba(255,255,255,0.9)`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.1)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)";
      }}
    >
      {/* Card Top */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-[14px] bg-black/5 border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: stat.accent,
            boxShadow: `0 0 20px rgba(${stat.accentRgb},0.2)`,
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
        >
          <span className="text-[22px]">{stat.icon}</span>
        </div>
        <div
          className="select-none"
          style={{
            ...bebasFont,
            fontSize: "36px",
            color: "rgba(26,26,46,0.25)",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
      {/* Card Value */}
      <div className="flex items-end gap-0.5 mb-1">
        <span
          style={{
            ...bebasFont,
            fontSize: "clamp(44px,5vw,56px)",
            color: stat.accent,
            textShadow: `0 0 25px rgba(${stat.accentRgb},0.35)`,
            letterSpacing: "0.02em",
            lineHeight: 0.9,
          }}
          className="transition-all duration-300"
        >
          {count}
        </span>
        <span
          style={{
            ...bebasFont,
            fontSize: "28px",
            color: stat.accent,
            opacity: 0.75,
            marginBottom: "4px",
          }}
        >
          {stat.suffix}
        </span>
      </div>
      {/* Card Label */}
      <div className="uppercase text-[12px] tracking-[0.25em] text-[#4a5568] font-medium mb-3">
        {stat.label}
      </div>
      {/* Card Description */}
      <p className="text-[13px] text-[#4a5568] leading-[1.48] mb-4 font-medium">
        {stat.description}
      </p>
      {/* Bar */}
      <div className="h-[3px] bg-black/10 rounded overflow-hidden mb-1.5">
        <div
          className={`
            h-full
            rounded
            transition-all duration-[1400ms]
            ${visible ? "" : "w-0"}
          `}
          style={{
            width: visible ? stat.barWidth : 0,
            background: `linear-gradient(90deg, ${stat.accent}, rgba(${stat.accentRgb},0.6))`,
            boxShadow: `0 0 10px rgba(${stat.accentRgb},0.4)`,
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: `${index * 0.1 + 0.3}s`,
          }}
        />
      </div>
      <div className="flex items-center justify-between text-[10px] text-[#4a5568] tracking-widest uppercase font-medium">
        <span>Progress</span>
        <span style={{ color: stat.accent }}>{stat.barWidth}</span>
      </div>
      {/* Decorations */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top right, rgba(${stat.accentRgb},0.06), transparent 60%)`,
          opacity: 0,
          transition: "opacity 0.4s",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 origin-left"
        style={{
          background: `linear-gradient(90deg, ${stat.accent}, transparent)`,
        }}
      />
    </div>
  );
}

export default function StatsSection() {
  const [visible, setVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            STATS.forEach((stat, i) => {
              setTimeout(() => {
                setVisibleCards((prev) =>
                  prev.includes(stat.id) ? prev : [...prev, stat.id]
                );
              }, i * 120);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getMilestoneTransitionStyle = (i: number) => ({
    transitionDelay: visible ? `${0.15 + i * 0.12}s` : undefined,
  });

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-[8vh] font-sans`}
      style={{
        fontFamily: `'Inter', sans-serif`,
      }}
    >
      {/* Decorative Backgrounds - Light Theme */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(165deg, #fafafa 0%, #f5f5f5 45%, #fafafa 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          animation: "stGridDrift 28s linear infinite",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.01) 3px, rgba(0,0,0,0.01) 4px)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[100px] z-0"
        style={{
          width: "800px",
          height: "800px",
          top: "-200px",
          left: "-200px",
          background:
            "radial-gradient(circle, rgba(255,77,0,0.06), transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[100px] z-0"
        style={{
          width: "600px",
          height: "600px",
          top: "20%",
          right: "-150px",
          background:
            "radial-gradient(circle, rgba(0,200,255,0.05), transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[100px] z-0"
        style={{
          width: "500px",
          height: "500px",
          bottom: "-100px",
          left: "40%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.04), transparent 70%)",
        }}
      />

      <div className="max-w-[1600px] mx-auto xl:px-10 px-4 relative z-10">
        {/* Header */}
        <div
          className="grid grid-cols-1 gap-7 xl:grid-cols-2 xl:gap-[60px] md:mb-16 xl:mb-20 items-end"
        >
          <div>
            <div className="flex items-center gap-3.5 mb-3.5">
              <span className="inline-block w-12 h-px bg-[#ff4d00] shadow-[0_0_12px_rgba(255,77,0,0.4)]" />
              <span className="uppercase text-[10.5px] tracking-[0.38em] text-[#ff4d00] font-semibold">
                By The Numbers
              </span>
            </div>
            <h2
              className="leading-none text-[#1a1a2e]"
              style={{
                ...bebasFont,
                fontSize: "clamp(40px,5.5vw,64px)",
                letterSpacing: "0.03em",
              }}
            >
              Results That
              <br />
              <span
                className="inline-block"
                style={{
                  color: "#ff4d00",
                  textShadow: "0 0 35px rgba(255,77,0,0.3)",
                }}
              >
                Speak For Us
              </span>
            </h2>
          </div>
          <div>
            <p className="lg:text-[16px] text-[14px] text-[#4a5568] leading-[1.78] mb-6 max-w-[520px] font-medium">
              We don't just build websites — we build businesses. Every metric here
              represents real clients, real projects, and real growth we've delivered together.
            </p>
            <div className="flex items-center gap-5 flex-wrap">
              <a
                href="#contact"
                className={`
                  inline-flex items-center gap-2.5 px-7 py-3
                  bg-gradient-to-br from-[#ff4d00] to-[#ff8c00]
                  text-white no-underline
                  text-[12px] tracking-[0.22em] uppercase font-semibold
                  shadow-[0_6px_28px_rgba(255,77,0,0.3)]
                  transition-transform duration-200
                  hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,77,0,0.45)]
                `}
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Start a Project <span>→</span>
              </a>
              <div className="flex items-center gap-2.5 text-[12px] text-[#4a5568] tracking-[0.08em] font-medium">
                <span
                  className="w-[7px] h-[7px] rounded-full"
                  style={{
                    background: "#10d4a0",
                    boxShadow: "0 0 10px rgba(16,212,160,0.5)",
                    animation: "stPulse 1.8s ease-in-out infinite",
                  }}
                />
                <span>Trusted by 80+ brands</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className={`
            grid grid-cols-1 gap-5 mb-18
            sm:grid-cols-2
            lg:grid-cols-4 lg:gap-4
          `}
        >
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={i}
              visible={visibleCards.includes(stat.id)}
            />
          ))}
        </div>

        {/* Clients logos - Light Theme */}
        <div
          className={`
            md:px-8 px-3 pt-9 pb-9 rounded-2xl
            bg-gradient-to-br from-white to-[#fafafa]
            border border-black/10
            opacity-0 translate-y-6
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : ""}
            text-[#1a1a2e]
          `}
        >
          <p className="uppercase text-center text-[12px] tracking-[0.32em] mb-7 font-semibold text-[#4a5568]">
            Trusted by innovative brands worldwide
          </p>
          <div className="md:flex grid grid-cols-2 md:flex-wrap md:justify-center text-center items-center gap-x-3 gap-y-3">
            {[
              "TechCorp",
              "DesignHub",
              "StartupX",
              "GlobalCo",
              "Innovate",
              "BuildCo",
            ].map((name, i) => (
              <div key={i} className="md:px-6">
                <div
                  className={`
                    md:px-5 px-3 py-2.5 border border-black/10 rounded
                    bg-white hover:border-orange-500/40
                    hover:bg-orange-500/8
                    transition-colors duration-200
                  `}
                >
                  <span
                    className="uppercase"
                    style={{
                      ...bebasFont,
                      fontSize: "20px",
                      color: "#1a1a2e",
                      letterSpacing: "0.12em",
                      transition: "color 0.25s",
                    }}
                  >
                    {name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inline keyframes for pulses and grid drift */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes stPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.6)} }
        @keyframes stGridDrift { 100% { background-position: 64px 64px; } }
        `}
      </style>
    </section>
  );
}