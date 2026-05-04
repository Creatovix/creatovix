"use client";
import { useEffect, useRef, useState } from "react";

const VALUES = [
  { id: 1, icon: "✦", title: "Craftsmanship", description: "Every pixel, line of code, and interaction is meticulously crafted with purpose and precision.", accent: "#ff4d00" },
  { id: 2, icon: "◈", title: "Innovation",    description: "We embrace emerging technologies and creative approaches to solve complex challenges.", accent: "#00c8ff" },
  { id: 3, icon: "⬡", title: "Partnership",   description: "Your success is our success. We work as an extension of your team, not just a vendor.", accent: "#a855f7" },
  { id: 4, icon: "⬢", title: "Excellence",    description: "We don't settle for good enough. We push boundaries to deliver exceptional results.", accent: "#10d4a0" },
];

const MILESTONES = [
  { year: "2019", event: "Founded", detail: "Started with 2 people & a bold vision" },
  { year: "2021", event: "Full-Service Studio", detail: "Expanded to design, dev & strategy" },
  { year: "2023", event: "Shopify Division", detail: "Launched global e-commerce practice" },
  { year: "2024", event: "150+ Projects", detail: "Top 50 Digital Agency recognition" },
];

const TEAM = [
  { id: 1, name: "Alex Rivera",  role: "Creative Director",    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", accent: "#ff4d00" },
  { id: 2, name: "Jordan Chen",  role: "Lead Developer",       image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", accent: "#00c8ff" },
  { id: 3, name: "Sam Taylor",   role: "UX Strategist",        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", accent: "#a855f7" },
  { id: 4, name: "Morgan Lee",   role: "Full Stack Engineer",  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80", accent: "#10d4a0" },
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
// Updated to Inter font
const sansFont  = { fontFamily: "'Inter', sans-serif" };

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function AboutSection() {
  const { ref, inView } = useInView(0.08);
  const [teamVisible, setTeamVisible] = useState(false);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = teamRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTeamVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden py-[8vh] font-sans"
      style={{ fontFamily: "'Inter', sans-serif", background: "linear-gradient(165deg,#fafafa 0%,#f5f5f5 45%,#fafafa 100%)" }}
    >
      {/* Backgrounds - Light Theme */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)", backgroundSize: "64px 64px", animation: "sectionGridDrift 28s linear infinite" }} />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.01) 3px,rgba(0,0,0,0.01) 4px)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[800px] h-[800px] -top-48 -left-48" style={{ background: "radial-gradient(circle,rgba(255,77,0,0.06),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[600px] h-[600px] top-[30%] -right-36" style={{ background: "radial-gradient(circle,rgba(168,85,247,0.04),transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[500px] h-[500px] -bottom-24 left-[30%]" style={{ background: "radial-gradient(circle,rgba(16,212,160,0.04),transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 relative z-10">

        {/* ── Section Header ── */}
        <div className="grid grid-cols-1 gap-7 xl:grid-cols-2 xl:gap-[60px] mb-16 xl:mb-20 items-end">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
            <div className="flex items-center gap-3.5 mb-3.5">
              <span className="inline-block w-12 h-px bg-[#ff4d00] shadow-[0_0_12px_rgba(255,77,0,0.4)]" />
              <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase font-semibold" style={sansFont}>Who We Are</span>
            </div>
            <h2 className="leading-none text-[#1a1a2e] m-0" style={{ ...bebasFont, fontSize: "clamp(40px,5.5vw,64px)", letterSpacing: "0.03em" }}>
              Building Digital<br />
              <span style={{ color: "#ff4d00", textShadow: "0 0 35px rgba(255,77,0,0.3)" }}>Excellence Since 2019</span>
            </h2>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
            <p className="text-[16px] text-[#4a5568] leading-[1.78] mb-6 max-w-[520px] font-medium" style={sansFont}>
              We're a passionate team of designers, developers, and strategists dedicated to transforming bold ideas into exceptional digital experiences that drive real business results.
            </p>
            <div className="flex items-center gap-5 flex-wrap">
              <a href="#contact" className="inline-flex items-center gap-2.5 px-7 py-3 bg-gradient-to-br from-[#ff4d00] to-[#ff8c00] text-white no-underline text-[12px] tracking-[0.22em] uppercase shadow-[0_6px_28px_rgba(255,77,0,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,77,0,0.45)] font-semibold"
                style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))", ...sansFont }}>
                Work With Us <span>→</span>
              </a>
              <div className="flex items-center gap-2.5 text-[12px] text-[#6b7280] tracking-[0.08em] font-medium" style={sansFont}>
                <span className="w-[7px] h-[7px] rounded-full" style={{ background: "#10d4a0", boxShadow: "0 0 10px rgba(16,212,160,0.5)", animation: "aboutPulse 1.8s ease-in-out infinite" }} />
                <span>Est. 2019 · Remote Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main 2-col: Story + Image Stack ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 mb-16 xl:mb-20 items-start">

          {/* Left: Story text + Values grid */}
          <div className="space-y-8">
            {/* Story */}
            <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s" }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block w-6 h-px bg-[#ff4d00]" />
                <span className="text-[12px] tracking-[0.32em] text-[#ff4d00] uppercase font-semibold" style={sansFont}>Our Story</span>
              </div>
              <p className="text-[16px] text-[#4a5568] leading-[1.82] mb-3 font-medium" style={sansFont}>
                Founded in 2019 with a simple belief: great digital experiences shouldn't be complicated. What began as a two-person studio obsessed with craft has grown into a full-service agency trusted by startups and enterprises worldwide.
              </p>
              <p className="text-[16px] text-[#4a5568] leading-[1.82] font-medium" style={sansFont}>
                Today, we combine strategic thinking, creative excellence, and technical depth to deliver products that don't just look great — they drive measurable growth.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-3">
              {VALUES.map((v, i) => (
                <ValueCard key={v.id} value={v} index={i} inView={inView} />
              ))}
            </div>
          </div>

          {/* Right: 3D stacked images + floating badge */}
          <div className="relative" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
            {/* Front image */}
            <div className="relative -top-4 lg:-left-4 lg:mr-4 rounded-2xl overflow-hidden border border-black/10 bg-white"
              style={{ height: "clamp(320px,50vw,535px)", boxShadow: "0 30px 80px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Our team" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 40%,rgba(250,250,250,0.95) 100%)" }} />
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-70" style={{ background: "linear-gradient(135deg,#ff4d00,transparent)", clipPath: "polygon(100% 0,0 0,100% 100%)" }} />
            </div>
          </div>
        </div>

        {/* ── Timeline Rail ── */}
        <div id="team" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s" }}
          className="mb-16 xl:mb-20 px-7 pt-8 pb-8 rounded-2xl bg-gradient-to-br from-white to-[#fafafa] border border-black/10 shadow-[0_8px_40px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
          <div className="flex items-center gap-3.5 mb-8">
            <span className="inline-block w-10 h-px bg-[#ff4d00] shadow-[0_0_12px_rgba(255,77,0,0.4)]" />
            <span className="text-[12px] tracking-[0.36em] text-[#ff4d00] uppercase font-semibold" style={sansFont}>Our Journey</span>
          </div>
          {/* Timeline */}
          <div className="relative">
            {/* Horizontal line — hidden on mobile */}
            <div className="hidden md:block absolute left-[14px] right-[14px] top-[20px] h-px bg-gradient-to-r from-[#ff4d00] via-black/10 to-transparent" style={{ boxShadow: "0 0 8px rgba(255,77,0,0.3)" }} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex flex-col gap-3" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.45 + i * 0.1}s` }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,77,0,0.12)", border: "1px solid rgba(255,77,0,0.5)", boxShadow: "0 0 16px rgba(255,77,0,0.25)" }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff4d00", boxShadow: "0 0 10px rgba(255,77,0,0.6)", animation: "aboutPulse 2s ease-in-out infinite" }} />
                  </div>
                  <div>
                    <span style={{ ...bebasFont, fontSize: 22, color: "#ff4d00", letterSpacing: "0.05em", lineHeight: 1, display: "block" }}>{m.year}</span>
                    <span className="text-[14px] text-[#1a1a2e] font-semibold tracking-wide block mt-0.5" style={sansFont}>{m.event}</span>
                    <span className="text-[15px] text-[#6b7280] leading-[1.5] block mt-1 font-medium" style={sansFont}>{m.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Team Grid ── */}
        <div ref={teamRef}>
          <div className="flex items-center gap-3.5 mb-8" style={{ opacity: teamVisible ? 1 : 0, transform: teamVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)" }}>
            <span className="inline-block w-12 h-px bg-[#ff4d00] shadow-[0_0_12px_rgba(255,77,0,0.4)]" />
            <span className="text-[13px] tracking-[0.38em] text-[#ff4d00] uppercase font-semibold" style={sansFont}>Meet The Team</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 xl:gap-5">
            {TEAM.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} visible={teamVisible} />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes sectionGridDrift { 100% { background-position: 64px 64px; } }
        @keyframes aboutPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.6)} }
      `}</style>
    </section>
  );
}

function ValueCard({ value, index, inView }: { value: typeof VALUES[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white to-[#fafafa] p-4 transition-all duration-500 cursor-default"
      style={{
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.25 + index * 0.08}s`,
        borderColor: hovered ? value.accent : undefined,
        boxShadow: hovered ? `0 0 0 1px ${value.accent}, 0 16px 40px rgba(0,0,0,0.12), 0 0 30px rgba(${value.accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.15)` : "0 4px 20px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-0 right-0 w-10 h-10 opacity-60" style={{ background: `linear-gradient(135deg,${value.accent},transparent)`, clipPath: "polygon(100% 0,0 0,100% 100%)" }} />
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base mb-3" style={{ background: "rgba(255,255,255,0.9)", border: `1px solid ${value.accent}55`, color: value.accent, boxShadow: `0 0 14px rgba(${value.accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.2)` }}>
        {value.icon}
      </div>
      <h4 style={{ ...bebasFont, fontSize: 20, color: hovered ? value.accent : "#1a1a2e", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 6, transition: "color 0.3s" }}>{value.title}</h4>
      <p className="text-[13px] text-[#4a5568] leading-[1.65] m-0 font-medium" style={sansFont}>{value.description}</p>
    </div>
  );
}

function TeamCard({ member, index, visible }: { member: typeof TEAM[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white to-[#fafafa] transition-all duration-500 cursor-default"
      style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
        borderColor: hovered ? member.accent : undefined,
        boxShadow: hovered ? `0 0 0 1px ${member.accent}, 0 20px 60px rgba(0,0,0,0.15), 0 0 40px rgba(${member.accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.15)` : "0 8px 32px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ height: "clamp(160px,20vw,220px)" }}>
        <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700" style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }} loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 40%,rgba(250,250,250,0.95) 100%)" }} />
        <div className="absolute top-0 right-0 w-10 h-10 opacity-70" style={{ background: `linear-gradient(135deg,${member.accent},transparent)`, clipPath: "polygon(100% 0,0 0,100% 100%)" }} />
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at top,rgba(${member.accent.replace("#", "").match(/.{1,2}/g)?.map((hex) => parseInt(hex, 16)).join(",")},0.12),transparent 65%)`, opacity: hovered ? 1 : 0 }} />
      </div>
      <div className="p-4">
        <div style={{ ...bebasFont, fontSize: 20, color: "#1a1a2e", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 4, transition: "color 0.3s", ...(hovered ? { color: member.accent } : {}) }}>{member.name}</div>
        <div className="text-[9.5px] tracking-[0.22em] text-[#6b7280] uppercase font-medium" style={sansFont}>{member.role}</div>
      </div>
    </div>
  );
}