"use client";
import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    id: 1,
    title: "Web Design",
    tagline: "PIXELS THAT SPEAK",
    number: "01",
    description:
      "We craft visually stunning, user-centric websites that captivate your audience and drive conversions. Every pixel is purposeful.",
    icon: "✦",
    accent: "#ff4d00",
    glowColor: "rgba(255,77,0,0.35)",
    image:
      "/web-design.webp",
    features: ["UI/UX Strategy", "Responsive Design", "Prototyping", "Design Systems"],
    link: "#contact",
    stat: { value: "150+", label: "Projects" },
  },
  {
    id: 2,
    title: "Graphic Design",
    tagline: "VISUALS THAT DEFY",
    number: "02",
    description:
      "From brand identities to marketing assets, we create visual systems that make your brand unforgettable and scroll-stopping.",
    icon: "◈",
    accent: "#00c8ff",
    glowColor: "rgba(0,200,255,0.35)",
    image:
      "/graphic-design.webp",
    features: ["Brand Identity", "Print Design", "Illustration", "Motion Graphics"],
    link: "#contact",
    stat: { value: "98%", label: "Satisfaction" },
  },
  {
    id: 3,
    title: "Web Development",
    tagline: "CODE THAT POWERS",
    number: "03",
    description:
      "Blazing-fast, scalable web applications built with modern tech stacks. Clean code, robust architecture, seamless performance.",
    icon: "⬡",
    accent: "#a855f7",
    glowColor: "rgba(168,85,247,0.35)",
    image:
      "/web-dev.webp",
    features: ["React/Next.js", "API Integration", "Performance", "Testing & QA"],
    link: "#contact",
    stat: { value: "99.9%", label: "Uptime" },
  },
  {
    id: 4,
    title: "Full Stack",
    tagline: "END-TO-END EXCELLENCE",
    number: "04",
    description:
      "From database architecture to pixel-perfect UIs — we handle your entire digital stack with expertise and precision.",
    icon: "⬢",
    accent: "#10d4a0",
    glowColor: "rgba(16,212,160,0.35)",
    image:
      "/full-stack.webp",
    features: ["Backend Architecture", "Cloud Infrastructure", "DevOps", "Security"],
    link: "#contact",
    stat: { value: "5x", label: "Faster" },
  },
  {
    id: 5,
    title: "Shopify",
    tagline: "STORES THAT SELL",
    number: "05",
    description:
      "Custom Shopify themes and apps engineered to convert browsers into loyal buyers. Built for growth, optimized for sales.",
    icon: "◉",
    accent: "#f59e0b",
    glowColor: "rgba(245,158,11,0.35)",
    image:
      "/shopify.webp",
    features: ["Custom Themes", "App Development", "Conversion Optimization", "Analytics"],
    link: "#contact",
    stat: { value: "3x", label: "ROI Boost" },
  },
];

export default function ServicesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const monoFont = { fontFamily: "'DM Mono', 'Courier New', monospace" };
  const bebasFont = { fontFamily: "'Bebas Neue', 'Impact', sans-serif" };

  useEffect(() => {
    let hasAnimated = false;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            SERVICES.forEach((service, i) => {
              setTimeout(() => {
                setVisibleCards((prev) =>
                  prev.includes(service.id) ? prev : [...prev, service.id]
                );
              }, i * 130);
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

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative pt-[7vh] pb-[8vh] overflow-hidden font-mono"
      style={{
        fontFamily: `'DM Mono', 'Courier New', monospace`,
      }}
    >

      {/* Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#05030d] via-[#0a0818] to-[#05030d]" />
      {/* Grid background with animation */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,77,0,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(255,77,0,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          animation: "svcGridDrift 24s linear infinite",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.022) 3px, rgba(0,0,0,0.022) 4px)",
        }}
      />
      <div className="absolute pointer-events-none rounded-full blur-[90px] w-[700px] h-[700px] top-[-120px] left-[-180px]" style={{ background: "radial-gradient(circle, rgba(255,77,0,0.11), transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[90px] w-[550px] h-[550px] top-[25%] right-[-120px]" style={{ background: "radial-gradient(circle, rgba(0,200,255,0.09), transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[90px] w-[450px] h-[450px] bottom-0 left-[30%]" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.07), transparent 70%)" }} />
      <div className="absolute pointer-events-none rounded-full blur-[90px] w-[380px] h-[380px] bottom-[-60px] right-[8%]" style={{ background: "radial-gradient(circle, rgba(16,212,160,0.07), transparent 70%)" }} />

      <div className="max-w-[1600px] mx-auto xl:px-10 px-4 relative z-10">

        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-[6vh]">
          <div className="flex items-center justify-center gap-3.5 mb-4">
            <span className="inline-block w-10 h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
            <span className="text-[10.5px] tracking-[0.38em] text-[#ff4d00] uppercase" style={monoFont}>What we Do</span>
            <span className="inline-block w-10 h-px bg-[#ff4d00] shadow-[0_0_12px_#ff4d00,0_0_24px_rgba(255,77,0,0.3)]" />
          </div>
          <h2 className="leading-none text-white m-0 mb-4" style={{ ...bebasFont, fontSize: "clamp(38px,5.5vw,62px)", letterSpacing: "0.03em" }}>
            Services That<br />
            <span style={{ color: "#ff4d00", textShadow: "0 0 50px rgba(255,77,0,0.45)" }}>Deliver Results</span>
          </h2>
          <p className="text-[13px] text-white/45 leading-[1.75] m-0" style={monoFont}>
            From concept to launch, we provide end-to-end digital solutions tailored to your unique goals and vision.
          </p>
        </div>

        {/* Grid */}
        <div className="
          grid gap-[22px]
          sm:grid-cols-2
          lg:grid-cols-3 lg:gap-[18px]
        ">
          {SERVICES.map((service, idx) => {
            const isVisible = visibleCards.includes(service.id);
            const isFlipped = flippedCard === service.id;
            return (
              <div
                key={service.id}
                className={`
                  [perspective:1100px]
                  h-[490px]
                  opacity-0
                  translate-y-[52px]
                  scale-95
                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${isVisible ? "opacity-100 translate-y-0 scale-100" : ""}
                `}
                style={{
                  transitionDelay: `${idx * 0.08}s`,
                }}
                onMouseEnter={() => setFlippedCard(service.id)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <div
                  className={`
                    relative w-full h-full
                    [transform-style:preserve-3d]
                    rounded-[20px]
                    transition-transform duration-700 ease-[cubic-bezier(0.35,0,0.15,1)]
                    ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
                  `}
                >
                  {/* FRONT */}
                  <div
                    className={`
                      absolute inset-0
                      rounded-[20px]
                      overflow-hidden
                      flex flex-col
                      bg-gradient-to-br from-white/10 via-white/[0.075] to-white/[0.02]
                      border border-white/10
                      shadow-[0_8px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.07)]
                      transition-all
                      duration-300
                      ease-in-out
                    `}
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      borderColor: isFlipped ? service.accent : undefined,
                      boxShadow: isFlipped
                        ? `0 0 0 1px ${service.accent}, 0 20px 60px rgba(0,0,0,0.55), 0 0 40px ${service.glowColor}, inset 0 1px 0 rgba(255,255,255,0.1)`
                        : undefined,
                    }}
                  >
                    <div className="relative h-[210px] overflow-hidden flex-shrink-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className={`
                          w-full h-full object-cover
                          transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                          ${isFlipped ? "scale-110" : ""}
                        `}
                        loading="lazy"
                      />
                      <div className="absolute inset-0" style={{
                        background: "linear-gradient(180deg, rgba(5,3,13,0.05) 0%, rgba(5,3,13,0.93) 100%)"
                      }} />
                      <div className="
                        absolute bottom-[-14px] right-[10px]
                        font-bebas text-[88px] leading-none
                        text-white/5 pointer-events-none select-none tracking-[.04em]
                      ">
                        {service.number}
                      </div>
                      <div
                        className="
                          absolute top-[14px] left-[14px]
                          w-[46px] h-[46px] rounded-[12px]
                          flex items-center justify-center
                          bg-[#05030d]/[0.78]
                          border
                          shadow-[0_0_22px] backdrop-blur-[10px]
                          transition-all duration-300
                        "
                        style={{
                          borderColor: service.accent,
                          boxShadow: `0 0 22px ${service.glowColor}, inset 0 0 12px rgba(0,0,0,0.3)`,
                        }}
                      >
                        <span className="text-[20px]" style={{
                          color: service.accent
                        }}>
                          {service.icon}
                        </span>
                      </div>
                      <div className="absolute top-0 right-0 w-[64px] h-[64px]" style={{
                        background: `linear-gradient(135deg, ${service.accent}, transparent)`,
                        clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                        opacity: 0.7,
                      }} />
                      <div className="
                        absolute bottom-[10px] right-[12px]
                        flex items-center gap-[5px]
                        text-[9px] tracking-[0.18em] text-white/35 uppercase
                      ">
                        <span>Hover</span>
                        <span
                          className="text-[12px]"
                          style={{
                            color: service.accent,
                            animation: "svcSpin 3s ease-in-out infinite"
                          }}
                        >
                          ↻
                        </span>
                      </div>
                    </div>
                    <div className="px-5 pt-4 pb-3.5 flex-1 flex flex-col">
                      <span
                        className="text-[9px] tracking-[.33em] uppercase mb-1.5"
                        style={{ color: service.accent, display: 'block' }}
                      >
                        {service.tagline}
                      </span>
                      <h3 className="font-bebas text-[29px] text-white leading-[1] tracking-[.03em] mb-2 mt-0">
                        {service.title}
                      </h3>
                      <p className="text-[12px] text-white/60 leading-[1.68] m-0 flex-1 line-clamp-3">
                        {service.description}
                      </p>
                      <div className="flex items-end justify-between mt-3 gap-2">
                        <div className="flex flex-col gap-[1px]">
                          <span
                            className="font-bebas text-[24px] leading-[1]"
                            style={{
                              color: service.accent,
                              textShadow: `0 0 20px ${service.glowColor}`,
                            }}
                          >
                            {service.stat.value}
                          </span>
                          <span className="text-[8.5px] text-white/30 tracking-[.2em] uppercase">{service.stat.label}</span>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          {service.features.slice(0, 2).map((f, i) => (
                            <span
                              key={i}
                              className="text-[9px] text-white/50 border border-white/10 py-0.5 px-2 rounded-full bg-white/5 whitespace-nowrap"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div
                      className="h-[2px] scale-x-0 origin-left transition-transform duration-500"
                      style={{
                        background: `linear-gradient(90deg, ${service.accent}, transparent)`,
                        boxShadow: `0 0 10px ${service.glowColor}`,
                        ...(isFlipped ? { transform: "scaleX(1)" } : {}),
                      }}
                    />
                  </div>

                  {/* BACK */}
                  <div
                    className={`
                      absolute inset-0
                      rounded-[20px]
                      overflow-hidden
                      flex flex-col
                      border
                      shadow-[0_0_70px,0_0_80px_rgba(0,0,0,0.25)_inset]
                      bg-gradient-to-br from-[#05030d]/[0.97] to-[#0c0916]/[0.99]
                    `}
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      borderColor: service.accent,
                      boxShadow: `0 0 70px ${service.glowColor}, inset 0 0 80px rgba(0,0,0,0.25)`,
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[60px] rounded-t-[20px]"
                      style={{
                        background: `linear-gradient(90deg, ${service.accent}, transparent)`,
                        opacity: 0.13,
                        pointerEvents: "none",
                      }}
                    />
                    <div className="flex items-center justify-between px-[22px] py-4 border-b" style={{ borderBottomColor: service.accent }}>
                      <div className="flex items-center gap-2 text-[9px] tracking-[.32em] uppercase" style={{ color: service.accent }}>
                        <span
                          className="inline-block w-[7px] h-[7px] rounded-full"
                          style={{
                            background: service.accent,
                            boxShadow: `0 0 12px ${service.accent}`,
                            animation: "svcPulse 1.6s ease-in-out infinite"
                          }}
                        />
                        <span>Service Details</span>
                      </div>
                      <span className="font-bebas text-[18px]" style={{ color: service.accent, opacity: 0.45 }}>
                        {service.number}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 px-[22px] pt-3.5 pb-4">
                      <div
                        className="text-[30px] mb-2"
                        style={{
                          color: service.accent,
                          textShadow: `0 0 24px ${service.glowColor}`,
                          animation: "svcFloat 4s ease-in-out infinite"
                        }}
                      >
                        {service.icon}
                      </div>
                      <h3 className="font-bebas text-[27px] text-white leading-[1] tracking-[.03em] mb-2 mt-0">
                        {service.title}
                      </h3>
                      <p className="text-[12px] text-white/70 leading-[1.68] mb-4 mt-0">
                        {service.description}
                      </p>
                      <div className="grid grid-cols-2 gap-[7px] mb-4">
                        {service.features.map((f, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-white/80"
                          >
                            <span
                              className="inline-block w-[5px] h-[5px] rounded-full flex-shrink-0"
                              style={{
                                background: service.accent,
                                boxShadow: `0 0 7px ${service.glowColor}`,
                              }}
                            />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                      <a
                        href={service.link}
                        className="flex items-center justify-center gap-2.5 py-3 px-6 rounded-[10px] text-white text-[11px] tracking-[.22em] uppercase no-underline font-mono mt-auto"
                        style={{
                          background: service.accent,
                          clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                          boxShadow: `0 6px 26px ${service.glowColor}`,
                          transition: "transform 0.25s, box-shadow 0.25s",
                        }}
                      >
                        <span>Get Started</span>
                        <span className="text-[16px]">→</span>
                      </a>
                    </div>
                    <div
                      className="absolute bottom-0 right-0 w-[200px] h-[200px] pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${service.glowColor}, transparent 70%)`,
                        filter: "blur(35px)", opacity: 0.55
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{
                        background: `linear-gradient(90deg, ${service.accent}, rgba(255,255,255,0.1), transparent)`,
                        opacity: 0.9,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-[12vh]">
          <a
            href="#contact"
            className="inline-flex items-center gap-3.5 py-4 px-[42px] bg-gradient-to-br from-[#ff4d00] to-[#ff8c00] text-white no-underline font-mono text-[12px] tracking-[.22em] uppercase rounded-none"
            style={{
              clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
              boxShadow: "0 10px 42px rgba(255,77,0,0.42)",
              transition: "transform 0.3s, box-shadow 0.3s"
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
      {/* CSS animations – must inject globally, so we use a small inline <style> block */}
      <style>{`
        @keyframes svcGridDrift {
          0%   { background-position: 0 0; }
          100% { background-position: 64px 64px; }
        }
        @keyframes svcSpin {
          0%,75%,100% { transform: rotate(0deg); }
          88% { transform: rotate(200deg); }
        }
        @keyframes svcPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.65); }
        }
        @keyframes svcFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
      `}</style>
      {/* Bebas Neue font in head; you can optimize this with @fontsource or other library */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap" />
    </section>
  );
}