"use client";
import { useEffect, useRef, useState } from "react";

const NAV_COLS = [
  {
    title: "Navigate",
    accent: "#ff4d00",
    links: [
      { label: "Home",       href: "#" },
      { label: "About",      href: "#about" },
      { label: "Services",   href: "#services" },
      { label: "Portfolio",  href: "#work" },
      { label: "Process",    href: "#process" },
      { label: "Contact",    href: "#contact" },
    ],
  },
  {
    title: "Services",
    accent: "#00c8ff",
    links: [
      { label: "Web Design",        href: "#services" },
      { label: "Graphic Design",    href: "#services" },
      { label: "Web Development",   href: "#services" },
      { label: "Full Stack",        href: "#services" },
      { label: "Shopify",           href: "#services" },
    ],
  },
  {
    title: "Connect",
    accent: "#a855f7",
    links: [
      { label: "Instagram",  href: "#" },
      { label: "LinkedIn",   href: "#" },
      { label: "Twitter/X",  href: "#" },
      { label: "Dribbble",   href: "#" },
      { label: "GitHub",     href: "#" },
    ],
  },
];

const BADGES = [
  { value: "150+", label: "Projects" },
  { value: "98%",  label: "Satisfaction" },
  { value: "5 ★",  label: "Rating" },
  { value: "2019", label: "Est." },
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
const monoFont  = { fontFamily: "'DM Mono','Courier New',monospace" };

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Footer() {
  const { ref, inView } = useInView(0.06);
  const [email, setEmail]         = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer
      ref={ref}
      id="footer"
      className="relative overflow-hidden"
      style={{ fontFamily: "'DM Mono','Courier New',monospace", background: "#04020a", borderTop: "1px solid rgba(255,77,0,0.12)" }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "linear-gradient(rgba(255,77,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.025) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 4px)" }} />
      {/* Glow spots */}
      <div className="absolute pointer-events-none rounded-full blur-[120px] z-0 w-[700px] h-[700px] -bottom-48 -left-48"
        style={{ background: "radial-gradient(circle,rgba(255,77,0,0.08),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[500px] h-[500px] top-0 right-0"
        style={{ background: "radial-gradient(circle,rgba(168,85,247,0.06),transparent 70%)" }} />

      {/* ── BIG BRAND STATEMENT ── */}
      <div className="relative z-10 pt-[5vh] pb-0 px-4 md:px-8 xl:px-10 max-w-[1600px] mx-auto overflow-hidden">
        <div
          className="mb-12 xl:mb-16"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(50px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-10 h-px bg-[#ff4d00] shadow-[0_0_10px_#ff4d00]" />
            <span className="text-[10px] tracking-[0.38em] text-[#ff4d00] uppercase" style={monoFont}>Ready to Start?</span>
          </div>

          {/* Giant headline */}
          <div className="relative">
            <h2
              className="leading-none text-white m-0 select-none"
              style={{ ...bebasFont, fontSize: "clamp(52px,9vw,130px)", letterSpacing: "0.02em", lineHeight: 0.92 }}
            >
              LET'S BUILD<br />
              <span style={{ color: "#ff4d00", textShadow: "0 0 80px rgba(255,77,0,0.5)", WebkitTextStroke: "0px" }}>SOMETHING</span>
              <br />
              <span className="text-white/12" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>REMARKABLE</span>
            </h2>
            {/* Ghost large text behind */}
            <div className="absolute -bottom-4 right-0 select-none pointer-events-none hidden xl:block"
              style={{ ...bebasFont, fontSize: 160, color: "rgba(255,77,0,0.04)", lineHeight: 1, letterSpacing: "0.04em" }}>
              2025
            </div>
          </div>

          {/* CTA row */}
          <div className="flex items-center gap-5 mt-10 flex-wrap">
            <a href="#contact"
              className="inline-flex items-center gap-3 py-4 px-9 text-white text-[11px] tracking-[0.24em] uppercase no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(255,77,0,0.5)] active:scale-95"
              style={{ ...monoFont, background: "linear-gradient(135deg,#ff4d00,#ff8c00)", clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))", boxShadow: "0 8px 32px rgba(255,77,0,0.38)" }}>
              Start a Project <span className="text-base">→</span>
            </a>
            <a href="mailto:contact@creatovix.com"
              className="inline-flex items-center gap-2 text-white/45 text-[12px] no-underline transition-colors duration-300 hover:text-white"
              style={monoFont}>
              contact@creatovix.com
              <span className="text-[#ff4d00]">↗</span>
            </a>
          </div>
        </div>

        {/* ── Stats badges row ── */}
        <div className="flex flex-wrap gap-3 mb-16 xl:mb-20"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s" }}>
          {BADGES.map((b, i) => (
            <div key={i}
              className="flex items-center gap-3 px-5 py-3 border border-white/10 bg-white/[0.04]"
              style={{ transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.07}s` }}>
              <span style={{ ...bebasFont, fontSize: 24, color: "#ff4d00", lineHeight: 1, textShadow: "0 0 20px rgba(255,77,0,0.5)" }}>{b.value}</span>
              <span className="text-[9px] tracking-[0.24em] text-white/35 uppercase" style={monoFont}>{b.label}</span>
            </div>
          ))}
        </div>

        {/* ── Animated divider ── */}
        <div className="relative h-px overflow-hidden mb-16 xl:mb-20"
          style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(90deg,transparent,#ff4d00,rgba(168,85,247,0.5),transparent)", transform: inView ? "translateX(0)" : "translateX(-100%)", transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s", boxShadow: "0 0 10px rgba(255,77,0,0.6)" }} />
        </div>

        {/* ── Main footer grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1.5fr] gap-10 xl:gap-12 mb-16 xl:mb-20"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s" }}>

          {/* Brand col */}
          <div>
            <a href="/" className="inline-flex items-end gap-0 no-underline mb-5 block"
              style={{ ...bebasFont }}>
              <span className="text-white text-[1.8rem] tracking-[0.12em] leading-none">CREAT</span>
              <span className="text-[#ff4d00] text-[1.8rem] tracking-[0.12em] leading-none inline-block" style={{ animation: "footerLogoPulse 3s ease-in-out infinite" }}>O</span>
              <span className="text-white text-[1.8rem] tracking-[0.12em] leading-none">VIX</span>
              <span className="inline-block rounded-full ml-[4px] mb-[5px] flex-shrink-0"
                style={{ width: 5, height: 5, background: "#ff4d00", boxShadow: "0 0 8px #ff4d00" }} />
            </a>
            <p className="text-[12.5px] text-white/38 leading-[1.8] mb-6 max-w-[240px]" style={monoFont}>
              Crafting premium digital experiences that captivate, convert, and scale worldwide.
            </p>
            {/* Availability dot */}
            <div className="flex items-center gap-2.5">
              <span className="w-[6px] h-[6px] rounded-full" style={{ background: "#10d4a0", boxShadow: "0 0 8px #10d4a0", animation: "footerPulse 1.8s ease-in-out infinite" }} />
              <span className="text-[9.5px] tracking-[0.18em] text-white/35 uppercase" style={monoFont}>Accepting New Projects</span>
            </div>
          </div>

          {/* Nav link cols */}
          {NAV_COLS.map((col, ci) => (
            <div key={ci}>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="inline-block w-5 h-px" style={{ background: col.accent, boxShadow: `0 0 8px ${col.accent}` }} />
                <h4 className="text-[9.5px] tracking-[0.34em] uppercase m-0" style={{ ...monoFont, color: col.accent }}>{col.title}</h4>
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <FooterLink href={link.href} label={link.label} accent={col.accent} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter col */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="inline-block w-5 h-px bg-[#10d4a0]" style={{ boxShadow: "0 0 8px #10d4a0" }} />
              <h4 className="text-[9.5px] tracking-[0.34em] text-[#10d4a0] uppercase m-0" style={monoFont}>Newsletter</h4>
            </div>
            <p className="text-[12px] text-white/38 leading-[1.72] mb-5" style={monoFont}>
              Design tips, dev insights, and agency updates — no spam.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 text-white text-[12px] placeholder-white/25 focus:outline-none focus:border-[#10d4a0] focus:bg-white/[0.08] transition-all duration-300"
                style={{ ...monoFont, borderRadius: 0 }}
              />
              <button
                type="submit"
                className="w-full py-3 text-white text-[10px] tracking-[0.22em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,212,160,0.35)] active:scale-95"
                style={{ ...monoFont, background: subscribed ? "linear-gradient(135deg,#10d4a0,#0ea87e)" : "linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))", border: `1px solid ${subscribed ? "#10d4a0" : "rgba(255,255,255,0.12)"}`, borderRadius: 0 }}
              >
                {subscribed ? "✓ Subscribed!" : "Subscribe →"}
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="border-t border-white/[0.07] py-7 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s" }}
        >
          <p className="text-[11px] text-white/25 tracking-[0.1em] m-0" style={monoFont}>
            © {new Date().getFullYear()} CREATOVIX. All rights reserved. Made with{" "}
            <span className="text-[#ff4d00]" style={{ animation: "footerHeart 1.4s ease-in-out infinite" }}>♥</span>{" "}
            in Pakistan.
          </p>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
              <a key={i} href="#"
                className="text-[10.5px] text-white/25 no-underline transition-colors duration-200 hover:text-white/70 tracking-[0.1em]"
                style={monoFont}>
                {item}
              </a>
            ))}
            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-[10.5px] text-white/35 bg-transparent border-none cursor-pointer transition-all duration-300 hover:text-[#ff4d00] group"
              style={monoFont}
            >
              <span className="tracking-[0.1em]">Back to Top</span>
              <span
                className="inline-flex items-center justify-center w-7 h-7 border border-white/15 transition-all duration-300 group-hover:border-[#ff4d00] group-hover:bg-[rgba(255,77,0,0.1)]"
                style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
              >↑</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @keyframes footerLogoPulse { 0%,100%{text-shadow:0 0 20px rgba(255,77,0,0.6);} 50%{text-shadow:0 0 40px rgba(255,77,0,1);} }
        @keyframes footerPulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.6)} }
        @keyframes footerHeart     { 0%,100%{transform:scale(1)} 50%{transform:scale(1.35)} }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterLink({ href, label, accent }: { href: string; label: string; accent: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      className="no-underline flex items-center gap-2 transition-all duration-250 group"
      style={{ color: hovered ? "#fff" : "rgba(255,255,255,0.38)", fontFamily: "'DM Mono','Courier New',monospace", fontSize: 13 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="inline-block h-px flex-shrink-0 transition-all duration-300"
        style={{ width: hovered ? 14 : 0, background: accent, boxShadow: hovered ? `0 0 6px ${accent}` : "none" }}
      />
      {label}
    </a>
  );
}