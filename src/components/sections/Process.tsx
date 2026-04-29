"use client";
import { useEffect, useRef, useState } from "react";

const PROCESS_STEPS = [
  {
    id: 1,
    number: "01",
    title: "Discover",
    tagline: "UNDERSTAND YOUR VISION",
    description: "We start by diving deep into your goals, audience, and challenges. Through workshops and research, we uncover the insights that will guide every decision.",
    icon: "✦",
    accent: "#ff4d00",
    glowColor: "rgba(255,77,0,0.35)",
    deliverables: ["Stakeholder Interviews", "User Research", "Competitive Analysis", "Project Brief"],
    duration: "1-2 Weeks",
  },
  {
    id: 2,
    number: "02",
    title: "Design",
    tagline: "CRAFT THE EXPERIENCE",
    description: "Our designers transform insights into wireframes, prototypes, and stunning visuals. Every interaction is tested and refined before development begins.",
    icon: "◈",
    accent: "#00c8ff",
    glowColor: "rgba(0,200,255,0.35)",
    deliverables: ["Wireframes", "UI Mockups", "Interactive Prototypes", "Design System"],
    duration: "2-4 Weeks",
  },
  {
    id: 3,
    number: "03",
    title: "Develop",
    tagline: "BUILD WITH PRECISION",
    description: "Our developers bring designs to life with clean, scalable code. We build with modern frameworks, ensuring performance, accessibility, and maintainability.",
    icon: "⬡",
    accent: "#a855f7",
    glowColor: "rgba(168,85,247,0.35)",
    deliverables: ["Frontend Development", "Backend Integration", "API Development", "QA Testing"],
    duration: "3-6 Weeks",
  },
  {
    id: 4,
    number: "04",
    title: "Launch",
    tagline: "DEPLOY & OPTIMIZE",
    description: "We handle deployment, monitoring, and post-launch optimization. Your success doesn't end at launch — we're here to support growth and iteration.",
    icon: "⬢",
    accent: "#10d4a0",
    glowColor: "rgba(16,212,160,0.35)",
    deliverables: ["Deployment", "Performance Monitoring", "Analytics Setup", "Ongoing Support"],
    duration: "1-2 Weeks",
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let hasAnimated = false;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            PROCESS_STEPS.forEach((step, i) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, step.id]);
              }, i * 200);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-progress through steps on desktop
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= PROCESS_STEPS.length ? 1 : prev + 1));
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  // Scroll to step when clicked
  const scrollToStep = (stepId: number) => {
    setActiveStep(stepId);
    const index = stepId - 1;
    if (stepRefs.current[index]) {
      stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

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
          animation: "processGridDrift 32s linear infinite",
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
            <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase">How We Work</span>
            <span className="inline-block w-[52px] h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
          </div>
          <h2 className="font-bebas text-[clamp(38px,5.5vw,62px)] text-white leading-[1.02] tracking-[0.03em] m-0 mb-4">
            A Process Built<br />
            <span className="text-[#ff4d00] drop-shadow-[0_0_50px_rgba(255,77,0,0.45)]">For Results</span>
          </h2>
          <p className="text-[13.5px] text-white/50 leading-[1.75] max-w-[480px] mx-auto">
            From discovery to launch, our proven methodology ensures clarity, collaboration, and exceptional outcomes at every stage.
          </p>
        </div>

        {/* Process Steps - Desktop Horizontal */}
        <div className="hidden lg:block relative">
          {/* Connection Line */}
          <div className="absolute top-[72px] left-0 right-0 h-px z-0">
            <div 
              className="h-full bg-white/10 rounded-full"
              style={{ width: "100%" }}
            />
            {/* Animated progress line */}
            <div 
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: `${((activeStep - 1) / (PROCESS_STEPS.length - 1)) * 100}%`,
                background: "linear-gradient(90deg, #ff4d00, #00c8ff, #a855f7, #10d4a0)",
                boxShadow: "0 0 20px rgba(255,77,0,0.5), 0 0 40px rgba(0,200,255,0.3)",
              }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-4 gap-6 xl:gap-8 relative z-10">
            {PROCESS_STEPS.map((step, index) => {
              const isVisible = visibleSteps.includes(step.id);
              const isActive = activeStep === step.id;
              const isCompleted = activeStep > step.id;
              
              return (
                <div
                  key={step.id}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className={`
                    relative flex flex-col items-center text-center
                    transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                  `}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Step Number Badge */}
                  <button
                    onClick={() => scrollToStep(step.id)}
                    className={`
                      relative w-[72px] h-[72px] xl:w-[84px] xl:h-[84px] rounded-2xl
                      flex items-center justify-center mb-5 cursor-pointer
                      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                      backdrop-blur-md border
                      ${isActive 
                        ? "scale-110 shadow-2xl" 
                        : isCompleted 
                          ? "opacity-80 hover:opacity-100" 
                          : "hover:scale-105"
                      }
                    `}
                    style={{
                      background: isActive 
                        ? `linear-gradient(135deg, ${step.accent}, ${step.accent}cc)` 
                        : isCompleted
                          ? `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))`
                          : `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))`,
                      border: isActive 
                        ? `2px solid ${step.accent}` 
                        : `1px solid rgba(255,255,255,0.12)`,
                      boxShadow: isActive
                        ? `0 0 0 4px ${step.glowColor}, 0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${step.glowColor}`
                        : isCompleted
                          ? `0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)`
                          : `0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)`,
                    }}
                  >
                    {/* Icon */}
                    <span 
                      className="text-[24px] xl:text-[28px] transition-transform duration-300"
                      style={{ 
                        color: isActive || isCompleted ? step.accent : "rgba(255,255,255,0.4)",
                        transform: isActive ? "scale(1.1)" : "scale(1)",
                        textShadow: isActive ? `0 0 24px ${step.glowColor}` : "none",
                      }}
                    >
                      {step.icon}
                    </span>
                    
                    {/* Number */}
                    <span 
                      className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{
                        background: isActive ? "#0a0a0f" : "rgba(5,3,13,0.9)",
                        border: `2px solid ${step.accent}`,
                        color: step.accent,
                        boxShadow: isActive ? `0 0 16px ${step.glowColor}` : "none",
                      }}
                    >
                      {step.number}
                    </span>

                    {/* Active pulse ring */}
                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-2xl animate-ping opacity-30"
                        style={{
                          background: `radial-gradient(circle, ${step.accent}44, transparent 70%)`,
                          animation: "processPulse 2s ease-in-out infinite",
                        }}
                      />
                    )}
                  </button>

                  {/* Step Content */}
                  <div className="px-2">
                    <span 
                      className="font-dmMono text-[9px] tracking-[0.3em] uppercase mb-2 block"
                      style={{ color: step.accent }}
                    >
                      {step.tagline}
                    </span>
                    <h3 className="font-bebas text-[22px] xl:text-[24px] text-white leading-none mb-2 tracking-[0.02em]">
                      {step.title}
                    </h3>
                    <p className="text-[12px] text-white/50 leading-[1.6] line-clamp-3">
                      {step.description}
                    </p>
                    
                    {/* Duration badge */}
                    <div 
                      className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase"
                      style={{
                        background: `rgba(5,3,13,0.8)`,
                        border: `1px solid ${step.accent}44`,
                        color: step.accent,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: step.accent }} />
                      {step.duration}
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                    style={{
                      background: `radial-gradient(ellipse at center, ${step.glowColor}, transparent 70%)`,
                      filter: "blur(20px)",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Steps - Mobile Vertical Timeline */}
        <div className="lg:hidden relative pl-8">
          {/* Vertical Connection Line */}
          <div className="absolute left-[23px] top-4 bottom-4 w-px">
            <div className="h-full bg-white/10" />
            <div 
              className="absolute top-0 left-0 w-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                height: `${((activeStep - 1) / (PROCESS_STEPS.length - 1)) * 100}%`,
                background: "linear-gradient(180deg, #ff4d00, #00c8ff, #a855f7, #10d4a0)",
                boxShadow: "0 0 16px rgba(255,77,0,0.5)",
              }}
            />
          </div>

          {/* Mobile Steps */}
          <div className="space-y-8">
            {PROCESS_STEPS.map((step, index) => {
              const isVisible = visibleSteps.includes(step.id);
              const isActive = activeStep === step.id;
              const isCompleted = activeStep > step.id;
              
              return (
                <div
                  key={step.id}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className={`
                    relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
                  `}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Step Marker */}
                  <button
                    onClick={() => scrollToStep(step.id)}
                    className={`
                      absolute -left-[39px] top-0 w-12 h-12 rounded-xl
                      flex items-center justify-center cursor-pointer
                      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                      backdrop-blur-md border
                      ${isActive 
                        ? "scale-110 shadow-xl" 
                        : isCompleted 
                          ? "opacity-80 hover:opacity-100" 
                          : "hover:scale-105"
                      }
                    `}
                    style={{
                      background: isActive 
                        ? `linear-gradient(135deg, ${step.accent}, ${step.accent}cc)` 
                        : isCompleted
                          ? `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))`
                          : `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))`,
                      border: isActive 
                        ? `2px solid ${step.accent}` 
                        : `1px solid rgba(255,255,255,0.12)`,
                      boxShadow: isActive
                        ? `0 0 0 3px ${step.glowColor}, 0 12px 40px rgba(0,0,0,0.35)`
                        : `0 4px 16px rgba(0,0,0,0.15)`,
                    }}
                  >
                    <span 
                      className="text-[18px]"
                      style={{ 
                        color: isActive || isCompleted ? step.accent : "rgba(255,255,255,0.4)",
                        textShadow: isActive ? `0 0 16px ${step.glowColor}` : "none",
                      }}
                    >
                      {step.icon}
                    </span>
                    <span 
                      className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
                      style={{
                        background: "#0a0a0f",
                        border: `2px solid ${step.accent}`,
                        color: step.accent,
                      }}
                    >
                      {step.number}
                    </span>
                  </button>

                  {/* Step Card */}
                  <div
                    className="p-5 rounded-2xl backdrop-blur-md border transition-all duration-500"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
                      border: isActive 
                        ? `1.5px solid ${step.accent}` 
                        : "1px solid rgba(255,255,255,0.12)",
                      boxShadow: isActive
                        ? `0 8px 32px rgba(0,0,0,0.3), 0 0 30px ${step.glowColor}`
                        : "0 4px 20px rgba(0,0,0,0.15)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span 
                          className="font-dmMono text-[9px] tracking-[0.3em] uppercase"
                          style={{ color: step.accent }}
                        >
                          {step.tagline}
                        </span>
                        <h3 className="font-bebas text-[24px] text-white leading-none mt-1">
                          {step.title}
                        </h3>
                      </div>
                      <div 
                        className="px-3 py-1.5 rounded-full text-[9px] tracking-[0.2em] uppercase"
                        style={{
                          background: `rgba(5,3,13,0.8)`,
                          border: `1px solid ${step.accent}44`,
                          color: step.accent,
                        }}
                      >
                        {step.duration}
                      </div>
                    </div>
                    
                    <p className="text-[12.5px] text-white/60 leading-[1.7] mb-4">
                      {step.description}
                    </p>
                    
                    {/* Deliverables */}
                    <div className="space-y-2">
                      <span className="font-dmMono text-[9px] text-white/40 tracking-[0.2em] uppercase">Deliverables</span>
                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map((item, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg text-[10px] bg-white/5 border border-white/10 text-white/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Benefits */}
        <div className="mt-20 xl:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
          {[
            { icon: "🔄", title: "Iterative Approach", desc: "Regular check-ins and feedback loops ensure we're always aligned with your vision." },
            { icon: "📊", title: "Data-Driven", desc: "Every decision is backed by research, analytics, and measurable outcomes." },
            { icon: "🤝", title: "Collaborative", desc: "You're part of the team. We work transparently, together, from start to finish." },
          ].map((benefit, i) => (
            <div
              key={i}
              className={`
                p-6 rounded-2xl backdrop-blur-md border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:-translate-y-1 hover:shadow-xl
                ${visibleSteps.length === PROCESS_STEPS.length ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{
                transitionDelay: `${1000 + i * 100}ms`,
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
            >
              <div className="text-[24px] mb-4">{benefit.icon}</div>
              <h4 className="font-bebas text-[20px] text-white leading-none mb-2">{benefit.title}</h4>
              <p className="text-[12px] text-white/50 leading-[1.6]">{benefit.desc}</p>
            </div>
          ))}
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
            <span>Start Your Project</span>
            <span className="text-[18px]">→</span>
          </a>
          <p className="font-mono text-[11px] text-white/30 mt-4 tracking-[.08em]">
            Free consultation&nbsp;&nbsp;·&nbsp;&nbsp;No obligation&nbsp;&nbsp;·&nbsp;&nbsp;24h response
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes processGridDrift {
          0% { background-position: 0 0; }
          100% { background-position: 64px 64px; }
        }
        @keyframes processPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
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