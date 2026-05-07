// src/app/services/[slug]/ServiceContent.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Service } from "@/lib/services";
import { SERVICES } from "@/lib/services";
import ContactSection from "@/components/sections/Contact";

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
const interFont = { fontFamily: "'Inter', system-ui, -apple-system, sans-serif" };

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

// Type for related blog posts passed from server
export interface RelatedBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  tags: string[];
  author: string;
}

interface ServiceContentProps {
  service: Service;
  relatedPosts?: RelatedBlogPost[];
}

export default function ServiceContent({ service, relatedPosts = [] }: ServiceContentProps) {
  const { ref, inView } = useInView(0.02);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  const relatedServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  // Light theme colors based on service accent
  const lightAccent = service.accent;
  const lightAccentSoft = `${lightAccent}15`;
  const lightAccentBorder = `${lightAccent}30`;
  const bgGradient = "linear-gradient(165deg,#ffffff 0%,#f8fafc 45%,#ffffff 100%)";
  const cardBg = "linear-gradient(135deg,#ffffff,#f8fafc)";
  const subtleBg = "rgba(0,0,0,0.02)";
  const borderColor = "rgba(0,0,0,0.08)";
  const borderColorHover = "rgba(0,0,0,0.15)";
  const textPrimary = "#1a1a1a";
  const textSecondary = "#4a5568";
  const textTertiary = "#64748b";
  const textMuted = "#94a3b8";

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format tag for display (convert kebab-case to Title Case)
  const formatTag = (tag: string) => {
    return tag
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <main
      ref={ref}
      className="relative min-h-screen overflow-hidden"
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: bgGradient,
      }}
    >
      {/* ── Grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          animation: "gridDrift 28s linear infinite",
        }}
      />
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 4px)",
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
          background: `radial-gradient(circle,${lightAccentSoft},transparent 70%)`,
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[100px] z-0"
        style={{
          width: 600,
          height: 600,
          top: "50%",
          right: -150,
          background: `radial-gradient(circle,${lightAccent}08,transparent 70%)`,
        }}
      />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        className="relative z-10 pt-[18vh] pb-0"
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <div className="max-w-[1600px] mx-auto px-4 xl:px-10">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 mb-10 text-[11px] tracking-[0.25em] uppercase"
            style={{
              ...interFont,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.55s ease 0.05s",
              color: textMuted,
            }}
          >
            <Link href="/" className="hover:text-[#ff4d00] transition-colors" style={{ color: textTertiary }}>
              Home
            </Link>
            <span className="text-[#cbd5e1]">/</span>
            <Link href="/#services" className="hover:text-[#ff4d00] transition-colors" style={{ color: textTertiary }}>
              Services
            </Link>
            <span className="text-[#cbd5e1]">/</span>
            <span style={{ color: lightAccent, fontWeight: 500 }}>{service.title}</span>
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
                    borderColor: lightAccentBorder,
                    background: lightAccentSoft,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: lightAccent, boxShadow: `0 0 8px ${lightAccent}40` }}
                  />
                  <span
                    className="text-[10px] tracking-[0.35em] uppercase font-medium"
                    style={{ ...interFont, color: lightAccent }}
                  >
                    {service.number} — {service.tagline}
                  </span>
                </div>
              </div>

              <h1
                className="text-[#1a1a1a] leading-none m-0 mb-6"
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
                    color: lightAccent,
                    textShadow: `0 0 40px ${lightAccent}30`,
                    fontSize: "clamp(28px,4vw,48px)",
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    marginTop: "0.2em",
                  }}
                >
                  — {service.tagline}
                </span>
              </h1>

              {/* SEO lead paragraph */}
              <p
                className={textSecondary}
                style={{ ...interFont, fontSize: 15, lineHeight: 1.8, maxWidth: 580 }}
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
                        color: lightAccent,
                        textShadow: `0 0 20px ${lightAccent}25`,
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-[10px] tracking-[0.25em] uppercase font-medium"
                      style={{ ...interFont, color: textMuted }}
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
                borderColor: lightAccentBorder,
                background: cardBg,
                boxShadow: `0 20px 60px rgba(0,0,0,0.08), 0 0 40px ${lightAccent}10`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.75s cubic-bezier(0.16,1,0.3,1) 0.22s",
              }}
            >
              {/* Corner decoration */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg,${lightAccent},transparent)`,
                  clipPath: "polygon(100% 0,0 0,100% 100%)",
                }}
              />
              <div className="p-8 flex flex-col items-center text-center gap-5">
                {/* Icon */}
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl"
                  style={{
                    background: lightAccentSoft,
                    border: `1px solid ${lightAccentBorder}`,
                    color: lightAccent,
                    boxShadow: `0 0 30px ${lightAccent}20`,
                  }}
                >
                  {service.icon}
                </div>

                <div>
                  <div
                    style={{
                      ...bebasFont,
                      fontSize: 28,
                      color: textPrimary,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {service.title}
                  </div>
                  <div
                    className="text-[11px] tracking-[0.28em] uppercase font-medium mt-1"
                    style={{ ...interFont, color: lightAccent }}
                  >
                    Premium Service
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 text-white text-[11px] tracking-[0.28em] uppercase font-semibold no-underline transition-all duration-300 hover:-translate-y-0.5 active:scale-95 mt-2"
                  style={{
                    ...interFont,
                    background: `linear-gradient(135deg,${lightAccent},${lightAccent}cc)`,
                    clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
                    boxShadow: `0 8px 24px ${lightAccent}30`,
                  }}
                >
                  Start Your Project →
                </a>

                <div
                  className="w-full pt-4 border-t flex items-center justify-between"
                  style={{ borderColor: "rgba(0,0,0,0.08)" }}
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ ...interFont, color: textMuted }}>
                    Free Consultation
                  </span>
                  <span className="text-[10px] font-medium" style={{ ...interFont, color: textMuted }}>24hr Response</span>
                </div>
              </div>

              {/* Ghost number */}
              <div
                className="absolute -bottom-4 -right-2 pointer-events-none select-none"
                style={{
                  ...bebasFont,
                  fontSize: 120,
                  color: `${lightAccent}08`,
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
      <section className="relative z-10 py-[6vh]">
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
                  style={{ background: lightAccent, boxShadow: `0 0 8px ${lightAccent}30` }}
                />
                <span
                  className="text-[10px] tracking-[0.38em] uppercase font-semibold"
                  style={{ ...interFont, color: lightAccent }}
                >
                  Overview
                </span>
              </div>
              <h2
                className="text-[#1a1a1a] mb-6"
                style={{ ...bebasFont, fontSize: "clamp(30px,4vw,42px)", letterSpacing: "0.02em" }}
              >
                What Is {service.title}?
              </h2>
              <div
                className={`${textSecondary} text-[14px] md:text-[16px]`}
                style={{ ...interFont, lineHeight: 1.85 }}
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
                  style={{ background: lightAccent, boxShadow: `0 0 8px ${lightAccent}30` }}
                />
                <span
                  className="text-[10px] tracking-[0.38em] uppercase font-semibold"
                  style={{ ...interFont, color: lightAccent }}
                >
                  Why Choose Us
                </span>
              </div>
              <h2
                className="text-[#1a1a1a] mb-6"
                style={{ ...bebasFont, fontSize: "clamp(30px,4vw,42px)", letterSpacing: "0.02em" }}
              >
                Key Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.content.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="group p-4 rounded-xl border transition-all duration-300 hover:bg-black/[0.02]"
                    style={{
                      borderColor: borderColor,
                      background: subtleBg,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {benefit.icon && (
                        <span className="text-xl flex-shrink-0 mt-0.5">{benefit.icon}</span>
                      )}
                      <div>
                        <h3
                          className="text-[#1a1a1a] font-semibold mb-1 leading-snug"
                          style={{ ...interFont, fontSize: 15 }}
                        >
                          {benefit.title}
                        </h3>
                        <p
                          className={textTertiary}
                          style={{ ...interFont, fontSize: 13, lineHeight: 1.65 }}
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
        className="relative z-10 py-[6vh]"
        style={{ borderTop: `1px solid ${borderColor}` }}
      >
        <div className="max-w-[1600px] mx-auto px-4 xl:px-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="w-8 h-px"
              style={{ background: lightAccent, boxShadow: `0 0 8px ${lightAccent}30` }}
            />
            <span
              className="text-[10px] tracking-[0.38em] uppercase font-semibold"
              style={{ ...interFont, color: lightAccent }}
            >
              How We Work
            </span>
          </div>
          <div className="flex items-end justify-between gap-4 mb-14 flex-wrap">
            <h2
              className="text-[#1a1a1a] m-0"
              style={{ ...bebasFont, fontSize: "clamp(32px,4.5vw,52px)", letterSpacing: "0.02em" }}
            >
              Our {service.title} Process
            </h2>
            <p
              className={textTertiary}
              style={{ ...interFont, fontSize: 13, lineHeight: 1.7, maxWidth: 340 }}
            >
              A proven, structured approach that keeps every project on time, on budget, and above expectations.
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
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
                      background: `linear-gradient(90deg,${lightAccentBorder},transparent)`,
                    }}
                  />
                )}

                <div className="p-5 md:p-6">
                  {/* Step number circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg,${lightAccent},${lightAccent}cc)`,
                      boxShadow: `0 0 20px ${lightAccent}30`,
                      ...interFont,
                      fontSize: 14,
                    }}
                  >
                    {step.step}
                  </div>
                  <h3
                    className="text-[#1a1a1a] font-semibold mb-2"
                    style={{ ...interFont, fontSize: 14 }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={textTertiary}
                    style={{ ...interFont, fontSize: 13, lineHeight: 1.7 }}
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
          borderTop: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
          background: lightAccentSoft,
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
              style={{ ...interFont, fontSize: 11, color: textMuted, letterSpacing: "0.2em", fontWeight: 500 }}
            >
              <span style={{ color: `${lightAccent}70`, fontSize: 8 }}>◆</span>
              {kw.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          FAQ
      ════════════════════════════════════════ */}
      <section
        className="relative z-10 pb-[6vh] pt-[10vh]"
        style={{ borderTop: `1px solid ${borderColor}` }}
      >
        <div className="max-w-[1600px] mx-auto px-4 xl:px-10">
          <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-14 xl:gap-20 items-start">

            {/* Left sticky label */}
            <div className="xl:sticky xl:top-32">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-8 h-px"
                  style={{ background: lightAccent, boxShadow: `0 0 8px ${lightAccent}30` }}
                />
                <span
                  className="text-[10px] tracking-[0.38em] uppercase font-semibold"
                  style={{ ...interFont, color: lightAccent }}
                >
                  FAQ
                </span>
              </div>
              <h2
                className="text-[#1a1a1a] mb-4"
                style={{ ...bebasFont, fontSize: "clamp(30px,4vw,44px)", letterSpacing: "0.02em" }}
              >
                Frequently Asked Questions
              </h2>
              <p
                className={textTertiary}
                style={{ ...interFont, fontSize: 13.5, lineHeight: 1.75 }}
              >
                Everything you need to know about our {service.title.toLowerCase()} services. Can't find an answer? Reach out directly.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 mt-6 text-[11px] tracking-[0.2em] uppercase font-semibold no-underline transition-colors"
                style={{ ...interFont, color: lightAccent }}
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
                      borderColor: isOpen ? lightAccentBorder : borderColor,
                      background: isOpen ? lightAccentSoft : subtleBg,
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left bg-transparent border-0 cursor-pointer"
                    >
                      <span
                        className="text-[#1a1a1a] font-semibold pr-6 leading-snug"
                        style={{ ...interFont, fontSize: 14 }}
                      >
                        {faq.question}
                      </span>
                      <div
                        className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300"
                        style={{
                          borderColor: isOpen ? lightAccent : "rgba(0,0,0,0.15)",
                          color: isOpen ? lightAccent : textMuted,
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
                        className="px-5 pb-5"
                        style={{ ...interFont, fontSize: 13.5, lineHeight: 1.78, color: textTertiary }}
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
        className="relative z-10 py-[6vh]"
        style={{ borderTop: `1px solid ${borderColor}` }}
      >
        <div className="max-w-[1600px] mx-auto px-4 xl:px-10">
          <div
            className="relative rounded-2xl overflow-hidden p-10 md:p-14"
            style={{
              background: `linear-gradient(135deg,${lightAccentSoft},#ffffff,${lightAccent}05)`,
              border: `1px solid ${lightAccentBorder}`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.06), 0 0 40px ${lightAccent}08`,
            }}
          >
            {/* BG decoration */}
            <div
              className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
              style={{
                background: `radial-gradient(circle at top right,${lightAccent}12,transparent 65%)`,
              }}
            />
            <div
              className="absolute -bottom-8 -left-8 pointer-events-none select-none"
              style={{
                ...bebasFont,
                fontSize: 200,
                color: `${lightAccent}06`,
                lineHeight: 1,
              }}
            >
              {service.number}
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div
                  className="text-[10px] tracking-[0.38em] uppercase font-semibold mb-3"
                  style={{ ...interFont, color: lightAccent }}
                >
                  Ready to get started?
                </div>
                <h2
                  className="text-[#1a1a1a] m-0 mb-3"
                  style={{
                    ...bebasFont,
                    fontSize: "clamp(36px,5vw,60px)",
                    letterSpacing: "0.02em",
                    lineHeight: 0.95,
                  }}
                >
                  Let's Build Something
                  <span style={{ color: lightAccent }}> Exceptional</span>
                </h2>
                <p
                  className="m-0"
                  style={{ ...interFont, fontSize: 14, color: textTertiary }}
                >
                  Talk to a {service.title.toLowerCase()} expert today. Free consultation, no commitment.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2.5 py-4 px-8 text-white text-[12px] tracking-[0.28em] uppercase font-semibold no-underline transition-all duration-300 hover:-translate-y-1 active:scale-95"
                  style={{
                    ...interFont,
                    background: `linear-gradient(135deg,${lightAccent},${lightAccent}cc)`,
                    clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
                    boxShadow: `0 10px 30px ${lightAccent}35`,
                  }}
                >
                  Start Your Project →
                </a>
                <Link
                  href="/#work"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-8 text-[12px] tracking-[0.22em] uppercase font-medium no-underline border transition-all duration-300 hover:bg-black/[0.03]"
                  style={{
                    ...interFont,
                    color: textTertiary,
                    borderColor: borderColor,
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
          RELATED RESOURCES + SERVICES + BLOG
      ════════════════════════════════════════ */}
      <section
        className="relative z-10 py-20 md:py-28"
        style={{ borderTop: `1px solid ${borderColor}` }}
      >
        <div className="max-w-[1600px] mx-auto px-4 xl:px-10">
          <div className="grid gap-14 xl:gap-20">

            {/* Related Services */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-8 h-px"
                  style={{ background: lightAccent, boxShadow: `0 0 8px ${lightAccent}30` }}
                />
                <span
                  className="text-[10px] tracking-[0.38em] uppercase font-semibold"
                  style={{ ...interFont, color: lightAccent }}
                >
                  Also Available
                </span>
              </div>
              <h3
                className="text-[#1a1a1a] mb-6"
                style={{ ...bebasFont, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "0.02em" }}
              >
                Other Services
              </h3>
              <div className="space-y-3">
                {relatedServices.map((related, i) => (
                  <Link
                    key={related.id}
                    href={`/services/${related.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl border group transition-all duration-300 no-underline hover:bg-black/[0.03]"
                    style={{
                      borderColor,
                      background: subtleBg,
                      opacity: inView ? 1 : 0,
                      transform: inView ? "translateY(0)" : "translateY(12px)",
                      transition: `all 0.55s ease ${0.5 + i * 0.08}s`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${related.accent}15`,
                        border: `1px solid ${related.accent}30`,
                        color: related.accent,
                      }}
                    >
                      {related.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[9px] tracking-[0.28em] uppercase font-medium mb-0.5"
                        style={{ ...interFont, color: textMuted }}
                      >
                        {related.number}
                      </div>
                      <div
                        className="text-[#1a1a1a] xl:text-[24px] text-[20px] font-normal truncate group-hover:text-[#ff4d00] transition-colors"
                        style={bebasFont}
                      >
                        {related.title}
                      </div>
                      <div
                        className="xl:text-[15px] text-[13px] truncate"
                        style={{ ...interFont, color: textMuted }}
                      >
                        {related.tagline}
                      </div>
                    </div>
                    <span
                      className="text-[11px] transition-transform duration-300 group-hover:translate-x-1 font-medium"
                      style={{ color: related.accent }}
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Blog Posts - DYNAMIC CONTENT FROM SANITY */}
            {relatedPosts.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="w-8 h-px"
                    style={{ background: lightAccent, boxShadow: `0 0 8px ${lightAccent}30` }}
                  />
                  <span
                    className="text-[10px] tracking-[0.38em] uppercase font-semibold"
                    style={{ ...interFont, color: lightAccent }}
                  >
                    From Our Blog
                  </span>
                </div>
                <h3
                  className="text-[#1a1a1a] mb-6"
                  style={{ ...bebasFont, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "0.02em" }}
                >
                  Related Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedPosts.map((post, i) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block rounded-xl border overflow-hidden transition-all duration-300 no-underline hover:bg-black/[0.03] hover:-translate-y-1"
                      style={{
                        borderColor,
                        background: subtleBg,
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0)" : "translateY(12px)",
                        transition: `all 0.55s ease ${0.6 + i * 0.08}s`,
                      }}
                    >
                      {/* Post Image */}
                      <div className="relative aspect-video overflow-hidden bg-gray-100">
                        {post.image?.src ? (
                          <img
                            src={post.image.src}
                            alt={post.image.alt || post.title}
                            width={post.image.width}
                            height={post.image.height}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div 
                            className="w-full h-full flex items-center justify-center"
                            style={{ background: `${lightAccent}10` }}
                          >
                            <span style={{ color: lightAccent, fontSize: 24 }}>📝</span>
                          </div>
                        )}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{ background: `linear-gradient(to top, ${lightAccent}20, transparent)` }}
                        />
                      </div>
                      
                      {/* Post Content */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-[10px] tracking-[0.2em] uppercase font-medium"
                            style={{ ...interFont, color: textMuted }}
                          >
                            {formatDate(post.date)}
                          </span>
                          {post.tags?.[0] && (
                            <>
                              <span className="text-[8px]" style={{ color: textMuted }}>•</span>
                              <span
                                className="text-[10px] tracking-[0.2em] uppercase font-medium"
                                style={{ ...interFont, color: lightAccent }}
                              >
                                {formatTag(post.tags[0])}
                              </span>
                            </>
                          )}
                        </div>
                        <h4
                          className="text-[#1a1a1a] font-semibold mb-2 leading-snug group-hover:text-[#ff4d00] transition-colors"
                          style={{ ...interFont, fontSize: 15 }}
                        >
                          {post.title}
                        </h4>
                        <p
                          className="text-[13px] line-clamp-2"
                          style={{ ...interFont, color: textTertiary, lineHeight: 1.6 }}
                        >
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t" style={{ borderColor }}>
                          <span
                            className="text-[10px] tracking-[0.2em] uppercase font-medium"
                            style={{ ...interFont, color: textMuted }}
                          >
                            {post.author}
                          </span>
                          <span
                            className="text-[10px] transition-transform duration-300 group-hover:translate-x-1"
                            style={{ color: lightAccent }}
                          >
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* View All Blog Link */}
                <div className="mt-6 text-center">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase font-semibold no-underline transition-colors"
                    style={{ ...interFont, color: lightAccent }}
                  >
                    View All Insights →
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <ContactSection />

      <style>{`
        @keyframes gridDrift { 100% { background-position: 64px 64px; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 28s linear infinite; }
        html { scroll-behavior: smooth; }
        
        /* Light theme scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(180deg, #94a3b8, #64748b 50%, #94a3b8); 
          border-radius: 3px; 
        }
        ::-webkit-scrollbar-thumb:hover { 
          background: linear-gradient(180deg, #64748b, #475569 50%, #64748b); 
        }
        
        details summary::-webkit-details-marker { display: none; }
        .prose p { margin-bottom: 1em; }
        
        /* Ensure Inter font loads properly */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        /* Utility for line clamp */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}