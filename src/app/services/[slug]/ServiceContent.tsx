// src/app/services/[slug]/ServiceContent.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Service } from "@/lib/services";
import { SERVICES } from "@/lib/services";
import ContactSection from "@/components/sections/Contact";

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
const monoFont = { fontFamily: "'DM Mono','Courier New',monospace" };

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

interface ServiceContentProps {
  service: Service;
}

export default function ServiceContent({ service }: ServiceContentProps) {
  const { ref, inView } = useInView(0.02);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const relatedServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <main
      ref={ref}
      className="relative min-h-screen overflow-hidden"
      style={{
        fontFamily: "'DM Mono','Courier New',monospace",
        background: "linear-gradient(165deg,#050310 0%,#0a0818 45%,#050310 100%)",
      }}
    >
      {/* ── Grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,77,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.025) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          animation: "gridDrift 28s linear infinite",
        }}
      />
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.03) 3px,rgba(0,0,0,0.03) 4px)",
        }}
      />

      {/* ── Ambient glows ── */}
      <div
        className="absolute pointer-events-none rounded-full blur-[130px] z-0"
        style={{
          width: 900,
          height: 900,
          top: -200,
          left: -200,
          background: `radial-gradient(circle,${service.accent}20,transparent 70%)`,
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[100px] z-0"
        style={{
          width: 600,
          height: 600,
          top: "50%",
          right: -150,
          background: `radial-gradient(circle,${service.accent}10,transparent 70%)`,
        }}
      />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        className="relative z-10 pt-[18vh] pb-0"
        style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
      >
        <div className="max-w-[1600px] mx-auto px-4 xl:px-10">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 mb-10 text-[11px] tracking-[0.25em] uppercase"
            style={{
              ...monoFont,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.55s ease 0.05s",
            }}
          >
            <Link href="/" className="text-[#4e5e74] hover:text-[#ff4d00] transition-colors">Home</Link>
            <span className="text-[#2a3a4e]">/</span>
            <Link href="/#services" className="text-[#4e5e74] hover:text-[#ff4d00] transition-colors">Services</Link>
            <span className="text-[#2a3a4e]">/</span>
            <span style={{ color: service.accent }}>{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 xl:gap-16 items-end pb-14 md:pb-20">
            {/* Left: Title block */}
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
                transition: "all 0.75s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              {/* Service number + tagline pill */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: `${service.accent}40`,
                    background: `${service.accent}0d`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: service.accent, boxShadow: `0 0 8px ${service.accent}` }}
                  />
                  <span
                    className="text-[10px] tracking-[0.35em] uppercase"
                    style={{ ...monoFont, color: service.accent }}
                  >
                    {service.number} — {service.tagline}
                  </span>
                </div>
              </div>

              <h1
                className="text-white leading-none m-0 mb-6"
                style={{
                  ...bebasFont,
                  fontSize: "clamp(52px,7.5vw,96px)",
                  letterSpacing: "0.01em",
                  lineHeight: 0.9,
                }}
              >
                {service.h1}
                <span
                  className="block"
                  style={{
                    color: service.accent,
                    textShadow: `0 0 80px ${service.accent}55`,
                    fontSize: "clamp(28px,4vw,48px)",
                    fontFamily: "'DM Mono','Courier New',monospace",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                    marginTop: "0.2em",
                  }}
                >
                  — {service.tagline}
                </span>
              </h1>

              {/* SEO lead paragraph */}
              <p
                className="text-[#8a9ab4] leading-[1.8] max-w-[580px]"
                style={{ ...monoFont, fontSize: 15 }}
              >
                {service.seo?.description ||
                  `Professional ${service.title.toLowerCase()} services designed to drive real business results. We combine strategic thinking with flawless execution to deliver outcomes that matter.`}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 mt-8">
                {[
                  { value: "5×", label: "Faster Delivery" },
                  { value: "3×", label: "Avg. ROI Boost" },
                  { value: "99.9%", label: "Uptime SLA" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span
                      style={{
                        ...bebasFont,
                        fontSize: 32,
                        color: service.accent,
                        textShadow: `0 0 30px ${service.accent}60`,
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-[10px] tracking-[0.25em] uppercase text-[#4e6070]"
                      style={monoFont}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero card */}
            <div
              className="relative rounded-2xl border overflow-hidden"
              style={{
                borderColor: `${service.accent}33`,
                background: `linear-gradient(135deg,${service.accent}10,rgba(255,255,255,0.03))`,
                boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 60px ${service.accent}15`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.75s cubic-bezier(0.16,1,0.3,1) 0.22s",
              }}
            >
              {/* Corner decoration */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-40 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg,${service.accent},transparent)`,
                  clipPath: "polygon(100% 0,0 0,100% 100%)",
                }}
              />
              <div className="p-8 flex flex-col items-center text-center gap-5">
                {/* Icon */}
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl"
                  style={{
                    background: `${service.accent}18`,
                    border: `1px solid ${service.accent}44`,
                    color: service.accent,
                    boxShadow: `0 0 40px ${service.accent}30`,
                  }}
                >
                  {service.icon}
                </div>

                <div>
                  <div
                    style={{
                      ...bebasFont,
                      fontSize: 28,
                      color: "#fff",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {service.title}
                  </div>
                  <div
                    className="text-[11px] tracking-[0.28em] uppercase mt-1"
                    style={{ ...monoFont, color: service.accent }}
                  >
                    Premium Service
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 text-white text-[11px] tracking-[0.28em] uppercase no-underline transition-all duration-300 hover:-translate-y-0.5 active:scale-95 mt-2"
                  style={{
                    ...monoFont,
                    background: `linear-gradient(135deg,${service.accent},${service.accent}cc)`,
                    clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
                    boxShadow: `0 8px 32px ${service.accent}44`,
                  }}
                >
                  Start Your Project →
                </a>

                <div
                  className="w-full pt-4 border-t flex items-center justify-between"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#4e5e74]" style={monoFont}>
                    Free Consultation
                  </span>
                  <span className="text-[10px] text-[#4e5e74]" style={monoFont}>24hr Response</span>
                </div>
              </div>

              {/* Ghost number */}
              <div
                className="absolute -bottom-4 -right-2 pointer-events-none select-none"
                style={{
                  ...bebasFont,
                  fontSize: 120,
                  color: `${service.accent}06`,
                  lineHeight: 1,
                  letterSpacing: "0.04em",
                }}
              >
                {service.number}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHAT IS + BENEFITS  (2-col)
      ════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="max-w-[1600px] mx-auto px-4 xl:px-10">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-14 xl:gap-20">

            {/* What Is */}
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.7s ease 0.2s",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-8 h-px"
                  style={{ background: service.accent, boxShadow: `0 0 10px ${service.accent}` }}
                />
                <span
                  className="text-[10px] tracking-[0.38em] uppercase"
                  style={{ ...monoFont, color: service.accent }}
                >
                  Overview
                </span>
              </div>
              <h2
                className="text-white mb-6"
                style={{ ...bebasFont, fontSize: "clamp(30px,4vw,42px)", letterSpacing: "0.02em" }}
              >
                What Is {service.title}?
              </h2>
              <div
                className="text-[#8a9ab4] leading-[1.85] space-y-4"
                style={{ ...monoFont, fontSize: 14.5 }}
                dangerouslySetInnerHTML={{ __html: service.content.whatIs }}
              />
            </div>

            {/* Benefits */}
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.7s ease 0.32s",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-8 h-px"
                  style={{ background: service.accent, boxShadow: `0 0 10px ${service.accent}` }}
                />
                <span
                  className="text-[10px] tracking-[0.38em] uppercase"
                  style={{ ...monoFont, color: service.accent }}
                >
                  Why Choose Us
                </span>
              </div>
              <h2
                className="text-white mb-6"
                style={{ ...bebasFont, fontSize: "clamp(30px,4vw,42px)", letterSpacing: "0.02em" }}
              >
                Key Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.content.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="group p-4 rounded-xl border transition-all duration-300 hover:bg-white/[0.05]"
                    style={{
                      borderColor: `${service.accent}20`,
                      background: "rgba(255,255,255,0.025)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {benefit.icon && (
                        <span className="text-xl flex-shrink-0 mt-0.5">{benefit.icon}</span>
                      )}
                      <div>
                        <h3
                          className="text-white font-medium mb-1 leading-snug"
                          style={{ ...monoFont, fontSize: 13 }}
                        >
                          {benefit.title}
                        </h3>
                        <p
                          className="text-[#6e808e] leading-[1.65]"
                          style={{ ...monoFont, fontSize: 12.5 }}
                        >
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROCESS  (horizontal timeline)
      ════════════════════════════════════════ */}
      <section
        className="relative z-10 py-20 md:py-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1600px] mx-auto px-4 xl:px-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="w-8 h-px"
              style={{ background: service.accent, boxShadow: `0 0 10px ${service.accent}` }}
            />
            <span
              className="text-[10px] tracking-[0.38em] uppercase"
              style={{ ...monoFont, color: service.accent }}
            >
              How We Work
            </span>
          </div>
          <div className="flex items-end justify-between gap-4 mb-14 flex-wrap">
            <h2
              className="text-white m-0"
              style={{ ...bebasFont, fontSize: "clamp(32px,4.5vw,52px)", letterSpacing: "0.02em" }}
            >
              Our {service.title} Process
            </h2>
            <p
              className="text-[#5e7080] max-w-[340px] text-[13px] leading-[1.7]"
              style={monoFont}
            >
              A proven, structured approach that keeps every project on time, on budget, and above expectations.
            </p>
          </div>

          {/* Steps grid */}
          <div
            className="grid gap-0"
            style={{
              gridTemplateColumns: `repeat(${Math.min(service.content.process.length, 4)}, 1fr)`,
            }}
          >
            {service.content.process.map((step, i) => (
              <div
                key={i}
                className="relative group"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${0.15 + i * 0.1}s`,
                }}
              >
                {/* Connector line */}
                {i < service.content.process.length - 1 && (
                  <div
                    className="absolute top-[26px] left-[calc(50%+26px)] right-0 h-px hidden md:block"
                    style={{
                      background: `linear-gradient(90deg,${service.accent}40,transparent)`,
                    }}
                  />
                )}

                <div className="p-5 md:p-6">
                  {/* Step number circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg,${service.accent},${service.accent}90)`,
                      boxShadow: `0 0 24px ${service.accent}44`,
                      ...monoFont,
                      fontSize: 14,
                    }}
                  >
                    {step.step}
                  </div>
                  <h3
                    className="text-white font-medium mb-2"
                    style={{ ...monoFont, fontSize: 14 }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[#6a7d8e] leading-[1.7]"
                    style={{ ...monoFont, fontSize: 13 }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          KEYWORDS / TRUST STRIP
      ════════════════════════════════════════ */}
      <div
        className="relative z-10 py-6 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: `${service.accent}06`,
        }}
      >
        <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
          {[
            `Professional ${service.title}`,
            "Results-Driven Agency",
            `${service.title} Experts`,
            "UK & Worldwide",
            "Fast Delivery",
            `Custom ${service.title} Solutions`,
            "Trusted by Startups & Enterprises",
            `${service.title} Strategy`,
            "Award-Winning Work",
            `Professional ${service.title}`,
            "Results-Driven Agency",
            `${service.title} Experts`,
            "UK & Worldwide",
            "Fast Delivery",
          ].map((kw, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 flex-shrink-0"
              style={{ ...monoFont, fontSize: 11, color: "#3a4e60", letterSpacing: "0.2em" }}
            >
              <span style={{ color: `${service.accent}60`, fontSize: 8 }}>◆</span>
              {kw.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          FAQ
      ════════════════════════════════════════ */}
      <section
        className="relative z-10 py-20 md:py-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1600px] mx-auto px-4 xl:px-10">
          <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-14 xl:gap-20 items-start">

            {/* Left sticky label */}
            <div className="xl:sticky xl:top-32">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-8 h-px"
                  style={{ background: service.accent, boxShadow: `0 0 10px ${service.accent}` }}
                />
                <span
                  className="text-[10px] tracking-[0.38em] uppercase"
                  style={{ ...monoFont, color: service.accent }}
                >
                  FAQ
                </span>
              </div>
              <h2
                className="text-white mb-4"
                style={{ ...bebasFont, fontSize: "clamp(30px,4vw,44px)", letterSpacing: "0.02em" }}
              >
                Frequently Asked Questions
              </h2>
              <p
                className="text-[#5e7080] leading-[1.75]"
                style={{ ...monoFont, fontSize: 13.5 }}
              >
                Everything you need to know about our {service.title.toLowerCase()} services. Can't find an answer? Reach out directly.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 mt-6 text-[11px] tracking-[0.2em] uppercase no-underline transition-colors"
                style={{ ...monoFont, color: service.accent }}
              >
                Ask a question →
              </a>
            </div>

            {/* FAQ accordion */}
            <div className="space-y-2">
              {service.content.faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="rounded-xl border overflow-hidden transition-all duration-300"
                    style={{
                      borderColor: isOpen ? `${service.accent}40` : "rgba(255,255,255,0.07)",
                      background: isOpen ? `${service.accent}08` : "rgba(255,255,255,0.025)",
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left bg-transparent border-0 cursor-pointer"
                    >
                      <span
                        className="text-white font-medium pr-6 leading-snug"
                        style={{ ...monoFont, fontSize: 14 }}
                      >
                        {faq.question}
                      </span>
                      <div
                        className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300"
                        style={{
                          borderColor: isOpen ? service.accent : "rgba(255,255,255,0.15)",
                          color: isOpen ? service.accent : "#4e6070",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        <span className="text-lg leading-none" style={{ marginTop: -2 }}>+</span>
                      </div>
                    </button>
                    <div
                      style={{
                        maxHeight: isOpen ? 400 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.38s cubic-bezier(0.16,1,0.3,1)",
                      }}
                    >
                      <p
                        className="px-5 pb-5 text-[#7e90a4] leading-[1.78]"
                        style={{ ...monoFont, fontSize: 13.5 }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════ */}
      <section
        className="relative z-10 py-20 md:py-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1600px] mx-auto px-4 xl:px-10">
          <div
            className="relative rounded-2xl overflow-hidden p-10 md:p-14"
            style={{
              background: `linear-gradient(135deg,${service.accent}15,rgba(255,255,255,0.04),${service.accent}08)`,
              border: `1px solid ${service.accent}33`,
              boxShadow: `0 30px 80px rgba(0,0,0,0.4), 0 0 60px ${service.accent}12`,
            }}
          >
            {/* BG decoration */}
            <div
              className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
              style={{
                background: `radial-gradient(circle at top right,${service.accent}18,transparent 65%)`,
              }}
            />
            <div
              className="absolute -bottom-8 -left-8 pointer-events-none select-none"
              style={{
                ...bebasFont,
                fontSize: 200,
                color: `${service.accent}04`,
                lineHeight: 1,
              }}
            >
              {service.number}
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div
                  className="text-[10px] tracking-[0.38em] uppercase mb-3"
                  style={{ ...monoFont, color: service.accent }}
                >
                  Ready to get started?
                </div>
                <h2
                  className="text-white m-0 mb-3"
                  style={{
                    ...bebasFont,
                    fontSize: "clamp(36px,5vw,60px)",
                    letterSpacing: "0.02em",
                    lineHeight: 0.95,
                  }}
                >
                  Let's Build Something
                  <span style={{ color: service.accent }}> Exceptional</span>
                </h2>
                <p
                  className="text-[#7e90a4] m-0"
                  style={{ ...monoFont, fontSize: 14 }}
                >
                  Talk to a {service.title.toLowerCase()} expert today. Free consultation, no commitment.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2.5 py-4 px-8 text-white text-[12px] tracking-[0.28em] uppercase no-underline transition-all duration-300 hover:-translate-y-1 active:scale-95"
                  style={{
                    ...monoFont,
                    background: `linear-gradient(135deg,${service.accent},${service.accent}cc)`,
                    clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
                    boxShadow: `0 10px 40px ${service.accent}50`,
                  }}
                >
                  Start Your Project →
                </a>
                <Link
                  href="/#work"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-8 text-[12px] tracking-[0.22em] uppercase no-underline border transition-all duration-300 hover:bg-white/[0.05]"
                  style={{
                    ...monoFont,
                    color: "#7e90a4",
                    borderColor: "rgba(255,255,255,0.12)",
                    borderRadius: 4,
                  }}
                >
                  View Our Work ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          RELATED RESOURCES + SERVICES
      ════════════════════════════════════════ */}
      <section
        className="relative z-10 py-20 md:py-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1600px] mx-auto px-4 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 xl:gap-20">

            {/* Related resources */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-8 h-px"
                  style={{ background: service.accent, boxShadow: `0 0 10px ${service.accent}` }}
                />
                <span
                  className="text-[10px] tracking-[0.38em] uppercase"
                  style={{ ...monoFont, color: service.accent }}
                >
                  Learn More
                </span>
              </div>
              <h3
                className="text-white mb-6"
                style={{ ...bebasFont, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "0.02em" }}
              >
                Related Resources
              </h3>
              <div className="space-y-3">
                <Link
                  href="/#work"
                  className="flex items-start gap-4 p-4 rounded-xl border group transition-all duration-300 no-underline hover:bg-white/[0.05]"
                  style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-sm"
                    style={{ background: `${service.accent}18`, border: `1px solid ${service.accent}30`, color: service.accent }}
                  >
                    📊
                  </div>
                  <div>
                    <div className="text-[9px] tracking-[0.3em] uppercase text-[#4a5a6a] mb-1" style={monoFont}>
                      Case Study
                    </div>
                    <div
                      className="text-white font-medium text-[13.5px] leading-snug group-hover:text-[#ff4d00] transition-colors"
                      style={monoFont}
                    >
                      {service.title === "Shopify"
                        ? "Shopify Development Case Study: 3× ROI Increase"
                        : service.title === "Web Design"
                          ? "Web Design Case Study: 250% Conversion Lift"
                          : `${service.title} Project: Client Success Story`}
                    </div>
                    <div className="text-[11px] text-[#4a5a6a] mt-1" style={monoFont}>
                      Real results from our {service.title.toLowerCase()} clients →
                    </div>
                  </div>
                </Link>

                <Link
                  href="/blog"
                  className="flex items-start gap-4 p-4 rounded-xl border group transition-all duration-300 no-underline hover:bg-white/[0.05]"
                  style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-sm"
                    style={{ background: `${service.accent}18`, border: `1px solid ${service.accent}30`, color: service.accent }}
                  >
                    📝
                  </div>
                  <div>
                    <div className="text-[9px] tracking-[0.3em] uppercase text-[#4a5a6a] mb-1" style={monoFont}>
                      Blog Post
                    </div>
                    <div
                      className="text-white font-medium text-[13.5px] leading-snug group-hover:text-[#ff4d00] transition-colors"
                      style={monoFont}
                    >
                      {service.title === "Web Design"
                        ? "10 Web Design Trends That Convert in 2026"
                        : service.title === "Shopify"
                          ? "How to Optimise Your Shopify Store for Higher Conversions"
                          : `The Ultimate Guide to ${service.title} for Growing Businesses`}
                    </div>
                    <div className="text-[11px] text-[#4a5a6a] mt-1" style={monoFont}>
                      Expert {service.title.toLowerCase()} insights →
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Related services */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-8 h-px"
                  style={{ background: service.accent, boxShadow: `0 0 10px ${service.accent}` }}
                />
                <span
                  className="text-[10px] tracking-[0.38em] uppercase"
                  style={{ ...monoFont, color: service.accent }}
                >
                  Also Available
                </span>
              </div>
              <h3
                className="text-white mb-6"
                style={{ ...bebasFont, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "0.02em" }}
              >
                Other Services
              </h3>
              <div className="space-y-3">
                {relatedServices.map((related, i) => (
                  <Link
                    key={related.id}
                    href={`/services/${related.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl border group transition-all duration-300 no-underline hover:bg-white/[0.05]"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.02)",
                      opacity: inView ? 1 : 0,
                      transform: inView ? "translateY(0)" : "translateY(12px)",
                      transition: `all 0.55s ease ${0.5 + i * 0.08}s`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${related.accent}18`,
                        border: `1px solid ${related.accent}33`,
                        color: related.accent,
                      }}
                    >
                      {related.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[9px] tracking-[0.28em] uppercase mb-0.5"
                        style={{ ...monoFont, color: "#4a5a6a" }}
                      >
                        {related.number}
                      </div>
                      <div
                        className="text-white text-[15px] font-medium truncate group-hover:text-[#ff4d00] transition-colors"
                        style={bebasFont}
                      >
                        {related.title}
                      </div>
                      <div
                        className="text-[11px] truncate"
                        style={{ ...monoFont, color: "#4a5a6a" }}
                      >
                        {related.tagline}
                      </div>
                    </div>
                    <span
                      className="text-[11px] transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: related.accent }}
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />

      <style>{`
        @keyframes gridDrift { 100% { background-position: 64px 64px; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 28s linear infinite; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050310; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#050310,#7BB6FF 50%,#050310); border-radius: 3px; }
        details summary::-webkit-details-marker { display: none; }
        .prose p { margin-bottom: 1em; }
      `}</style>
    </main>
  );
}