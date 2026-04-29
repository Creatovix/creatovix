"use client";

const TECH_STACK = [
  { name: "React",       category: "Frontend",        accent: "#61dafb", icon: "⚛"  },
  { name: "Next.js",     category: "Framework",       accent: "#ffffff", icon: "▲"  },
  { name: "TypeScript",  category: "Language",        accent: "#3178c6", icon: "📘" },
  { name: "Tailwind",    category: "Styling",         accent: "#38bdf8", icon: "🎨" },
  { name: "Node.js",     category: "Backend",         accent: "#68a063", icon: "🟢" },
  { name: "Python",      category: "Language",        accent: "#ffd43b", icon: "🐍" },
  { name: "PostgreSQL",  category: "Database",        accent: "#336791", icon: "🐘" },
  { name: "MongoDB",     category: "Database",        accent: "#47a248", icon: "🍃" },
  { name: "Docker",      category: "DevOps",          accent: "#2496ed", icon: "🐳" },
  { name: "AWS",         category: "Cloud",           accent: "#ff9900", icon: "☁"  },
  { name: "Vercel",      category: "Deployment",      accent: "#e0e0e0", icon: "▲"  },
  { name: "Figma",       category: "Design",          accent: "#f24e1e", icon: "🎯" },
  { name: "GraphQL",     category: "API",             accent: "#e10098", icon: "◈"  },
  { name: "Stripe",      category: "Payments",        accent: "#635bff", icon: "💳" },
  { name: "Shopify",     category: "E-commerce",      accent: "#96bf48", icon: "🛒" },
  { name: "Redis",       category: "Cache",           accent: "#dc382d", icon: "🔴" },
  { name: "Git",         category: "Version Control", accent: "#f05032", icon: "🗂"  },
  { name: "Linux",       category: "OS",              accent: "#fcc624", icon: "🐧" },
];

// triple-duplicate for seamless infinite loop
const ROW1 = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];
const ROW2 = [...TECH_STACK].reverse().concat([...TECH_STACK].reverse(), [...TECH_STACK].reverse());

const bebasFont = { fontFamily: "'Bebas Neue', 'Impact', sans-serif" };
const monoFont  = { fontFamily: "'DM Mono', 'Courier New', monospace" };

function MarqueeItem({ name, category, accent, icon }: typeof TECH_STACK[0]) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-3 px-5 py-3.5 border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:border-[rgba(255,77,0,0.4)] hover:bg-[rgba(255,77,0,0.07)] group cursor-default"
      style={{ minWidth: 160 }}
    >
      {/* icon box */}
      <div
        className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-[15px] rounded-[8px] transition-all duration-300 group-hover:scale-110"
        style={{
          background: "rgba(5,3,16,0.8)",
          border: `1px solid ${accent}44`,
          boxShadow: `0 0 12px ${accent}22`,
        }}
      >
        {icon}
      </div>

      {/* text */}
      <div className="flex flex-col gap-[2px]">
        <span
          className="text-white leading-none transition-colors duration-300 group-hover:text-[#ff4d00]"
          style={{ ...bebasFont, fontSize: 17, letterSpacing: "0.04em" }}
        >
          {name}
        </span>
        <span
          className="text-white/35 text-[8.5px] uppercase tracking-[0.24em]"
          style={monoFont}
        >
          {category}
        </span>
      </div>

      {/* accent dot */}
      <span
        className="ml-auto w-[5px] h-[5px] rounded-full flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
      />
    </div>
  );
}

export default function TechStackSection() {
  return (
    <section
      className="relative overflow-hidden py-20 xl:py-28"
      style={{ fontFamily: "'DM Mono','Courier New',monospace", background: "linear-gradient(165deg,#050310 0%,#0a0818 45%,#050310 100%)" }}
    >
      {/* grid bg */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255,77,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.03) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          animation: "techGridDrift 28s linear infinite",
        }}
      />
      {/* scanlines */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 4px)" }} />
      {/* ambient glows */}
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[700px] h-[700px] -top-40 -left-40" style={{ background: "radial-gradient(circle,rgba(255,77,0,0.09),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[500px] h-[500px] -bottom-20 right-0" style={{ background: "radial-gradient(circle,rgba(0,200,255,0.07),transparent 70%)" }} />

      <div className="relative z-10">

        {/* ── Section header ── */}
        <div className="text-center max-w-[600px] mx-auto px-4 mb-14 xl:mb-16">
          <div className="flex items-center justify-center gap-3.5 mb-4">
            <span className="inline-block w-10 h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
            <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase" style={monoFont}>Our Toolkit</span>
            <span className="inline-block w-10 h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
          </div>
          <h2 className="leading-none text-white m-0 mb-4" style={{ ...bebasFont, fontSize: "clamp(38px,5.5vw,62px)", letterSpacing: "0.03em" }}>
            Powered By<br />
            <span style={{ color: "#ff4d00", textShadow: "0 0 50px rgba(255,77,0,0.45)" }}>Modern Technology</span>
          </h2>
          <p className="text-[13px] text-white/45 leading-[1.75] m-0" style={monoFont}>
            We wield a battle-tested arsenal of tools and frameworks to build digital products that are fast, scalable, and built to outlast trends.
          </p>
        </div>

        {/* ── Marquee Row 1 — left ── */}
        <div className="relative overflow-hidden mb-4 xl:mb-5">
          {/* fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 xl:w-40 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg,#050310 0%,transparent 100%)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 xl:w-40 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg,#050310 0%,transparent 100%)" }} />
          <div
            className="flex gap-3 xl:gap-4"
            style={{ animation: "marqueeLeft 40s linear infinite", willChange: "transform" }}
          >
            {ROW1.map((t, i) => <MarqueeItem key={i} {...t} />)}
          </div>
        </div>

        {/* ── Marquee Row 2 — right ── */}
        <div className="relative overflow-hidden mb-4 xl:mb-5">
          <div className="absolute left-0 top-0 bottom-0 w-24 xl:w-40 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg,#050310 0%,transparent 100%)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 xl:w-40 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg,#050310 0%,transparent 100%)" }} />
          <div
            className="flex gap-3 xl:gap-4"
            style={{ animation: "marqueeRight 36s linear infinite", willChange: "transform" }}
          >
            {ROW2.map((t, i) => <MarqueeItem key={i} {...t} />)}
          </div>
        </div>

        {/* ── Marquee Row 3 — left (slower) ── */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 xl:w-40 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg,#050310 0%,transparent 100%)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 xl:w-40 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg,#050310 0%,transparent 100%)" }} />
          <div
            className="flex gap-3 xl:gap-4"
            style={{ animation: "marqueeLeft 52s linear infinite", willChange: "transform" }}
          >
            {ROW1.map((t, i) => <MarqueeItem key={i} {...t} />)}
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @keyframes techGridDrift { 100% { background-position: 64px 64px; } }
        @keyframes marqueeLeft  { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }
        @keyframes marqueeRight { 0%{transform:translateX(-33.333%)} 100%{transform:translateX(0)} }
        @media (prefers-reduced-motion: reduce) {
          [style*="marqueeLeft"],[style*="marqueeRight"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}