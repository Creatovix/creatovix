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
      { threshold },
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
  const { ref, inView } = useInView(0.05);
  const relatedServices = SERVICES.filter((s) => s.id !== service.id).slice(
    0,
    3,
  );
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://creatovix.com";

  return (
    <main
      ref={ref}
      className="relative min-h-screen overflow-hidden pt-[20vh]"
      style={{
        fontFamily: "'DM Mono','Courier New',monospace",
        background:
          "linear-gradient(165deg,#050310 0%,#0a0818 45%,#050310 100%)",
      }}
    >
      {/* Background Elements */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,77,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,0.03) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          animation: "gridDrift 28s linear infinite",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 4px)",
        }}
      />

      {/* Dynamic accent glows */}
      <div
        className="absolute pointer-events-none rounded-full blur-[120px] z-0 w-[900px] h-[900px] -top-56 -left-56 opacity-60"
        style={{
          background: `radial-gradient(circle,${service.accent}25,transparent 70%)`,
          transition: "all 0.8s ease",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full blur-[100px] z-0 w-[600px] h-[600px] top-[30%] -right-40 opacity-40"
        style={{
          background: `radial-gradient(circle,${service.accent}15,transparent 70%)`,
        }}
      />

      <div className="max-w-[1600px] mx-auto px-4 px-10 relative z-10">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 mb-8 text-[11px] tracking-[0.25em] uppercase"
          style={{
            ...monoFont,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          <Link
            href="/"
            className="text-[#5e6e84] hover:text-[#ff4d00] transition-colors"
          >
            Home
          </Link>
          <span className="text-[#3a4a5e]">/</span>
          <Link
            href="/#services"
            className="text-[#5e6e84] hover:text-[#ff4d00] transition-colors"
          >
            Services
          </Link>
          <span className="text-[#3a4a5e]">/</span>
          <span style={{ color: service.accent }}>{service.title}</span>
        </nav>

        {/* Hero Section with SEO-Optimized H1 */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 xl:gap-12 mb-12 xl:mb-16 items-start"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-block w-14 h-px"
                style={{
                  background: service.accent,
                  boxShadow: `0 0 14px ${service.accent}`,
                }}
              />
              <span
                className="text-[11px] tracking-[0.4em] uppercase"
                style={{ ...monoFont, color: service.accent }}
              >
                {service.number} — {service.tagline}
              </span>
            </div>
            <h1
              className="text-white m-0 leading-none"
              style={{
                ...bebasFont,
                fontSize: "clamp(44px,6vw,72px)",
                letterSpacing: "0.02em",
                lineHeight: 0.95,
              }}
            >
              {service.h1}
              <span
                className="block mt-2"
                style={{
                  color: service.accent,
                  textShadow: `0 0 60px ${service.accent}55`,
                  fontSize: "clamp(28px,4vw,42px)",
                  fontFamily: "'DM Mono','Courier New',monospace",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                }}
              >
                {service.tagline}
              </span>
            </h1>
          </div>

          <div
            className="relative p-6 rounded-2xl border bg-gradient-to-br from-white/[0.08] to-white/[0.04] flex items-center justify-center"
            style={{
              borderColor: `${service.accent}44`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 50px ${service.accent}18, inset 0 1px 0 rgba(255,255,255,0.08)`,
            }}
          >
            <div
              className="absolute top-0 right-0 w-24 h-24 opacity-50 pointer-events-none"
              style={{
                background: `linear-gradient(135deg,${service.accent},transparent)`,
                clipPath: "polygon(100% 0,0 0,100% 100%)",
              }}
            />
            <div
              className="w-24 h-24 xl:w-28 xl:h-28 rounded-2xl flex items-center justify-center text-4xl xl:text-5xl"
              style={{
                background: `${service.accent}1a`,
                border: `1px solid ${service.accent}55`,
                color: service.accent,
                boxShadow: `0 0 32px ${service.accent}35`,
              }}
            >
              {service.icon}
            </div>
            <div
              className="absolute bottom-4 right-5 select-none pointer-events-none opacity-20"
              style={{
                ...bebasFont,
                fontSize: 80,
                color: service.accent,
                lineHeight: 1,
                letterSpacing: "0.04em",
              }}
            >
              {service.number}
            </div>
          </div>
        </div>

        {/* What Is [Service] Section */}
        <section
          className="py-12 md:py-16 border-t border-white/10"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.7s ease 0.3s",
          }}
        >
          <h2
            className="text-white mb-6"
            style={{ ...bebasFont, fontSize: "clamp(28px,4vw,36px)" }}
          >
            What Is {service.title} Services?
          </h2>
          <div
            className="prose prose-invert prose-lg max-w-none text-[#a8b4cc]"
            style={monoFont}
            dangerouslySetInnerHTML={{ __html: service.content.whatIs }}
          />
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16">
          <h2
            className="text-white mb-8"
            style={{ ...bebasFont, fontSize: "clamp(28px,4vw,36px)" }}
          >
            Benefits of Our {service.title} Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {service.content.benefits.map((benefit, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border bg-white/[0.04] hover:bg-white/[0.07] transition-all"
                style={{ borderColor: `${service.accent}2a` }}
              >
                <div className="flex items-start gap-4">
                  {benefit.icon && (
                    <span className="text-2xl flex-shrink-0">
                      {benefit.icon}
                    </span>
                  )}
                  <div>
                    <h3
                      className="text-white font-medium mb-2"
                      style={{ fontSize: "18px" }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="text-[#9eb0c8] text-[14px] leading-[1.7]"
                      style={monoFont}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 md:py-16 border-t border-white/10">
          <h2
            className="text-white mb-10"
            style={{ ...bebasFont, fontSize: "clamp(28px,4vw,36px)" }}
          >
            Our {service.title} Process
          </h2>
          <div className="relative">
            <div className="absolute left-6 md:left-8 top-8 bottom-8 w-px bg-gradient-to-b from-[#ff4d00] to-transparent opacity-30 hidden md:block" />

            <div className="space-y-8">
              {service.content.process.map((step, i) => (
                <div
                  key={i}
                  className="relative flex gap-6 md:gap-8"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(-20px)",
                    transition: `all 0.6s ease ${0.4 + i * 0.1}s`,
                  }}
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white z-10"
                    style={{
                      background: service.accent,
                      boxShadow: `0 0 20px ${service.accent}44`,
                    }}
                  >
                    {step.step}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-white font-medium mb-2 text-lg">
                      {step.title}
                    </h3>
                    <p
                      className="text-[#9eb0c8] text-[14px] leading-[1.7]"
                      style={monoFont}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 border-t border-white/10">
          <h2
            className="text-white mb-8"
            style={{ ...bebasFont, fontSize: "clamp(28px,4vw,36px)" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.content.faqs.map((faq, i) => (
              <details
                key={i}
                className="group p-5 rounded-xl border bg-white/[0.04] hover:bg-white/[0.06] transition-all cursor-pointer"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                <summary className="flex items-center justify-between text-white font-medium list-none">
                  <span className="pr-4">{faq.question}</span>
                  <span className="text-[#ff4d00] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p
                  className="mt-3 text-[#9eb0c8] text-[14px] leading-[1.7]"
                  style={monoFont}
                >
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Image Gallery with Alt Tags */}
        {service.images.gallery?.length && (
          <section className="py-12 md:py-16 border-t border-white/10">
            <h2
              className="text-white mb-8"
              style={{ ...bebasFont, fontSize: "clamp(28px,4vw,36px)" }}
            >
              {service.title} Portfolio Examples
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.images.gallery.map((img, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-xl border border-white/10"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={400}
                    height={300}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Internal Linking with Keyword Anchor Text */}
        <section className="py-12 md:py-16 border-t border-white/10">
          <h3
            className="text-white mb-6"
            style={{ ...bebasFont, fontSize: "clamp(24px,3vw,32px)" }}
          >
            Related Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/#work"
              className="p-4 rounded-xl border bg-white/[0.04] hover:bg-white/[0.07] transition-all group"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <span
                className="text-[10px] tracking-[0.25em] uppercase text-[#5e6e84]"
                style={monoFont}
              >
                CASE STUDY
              </span>
              <h4 className="text-white font-medium mt-1 group-hover:text-[#ff4d00] transition-colors">
                {service.title === "Shopify"
                  ? "Shopify Development Case Study: 3× ROI Increase"
                  : service.title === "Web Design"
                    ? "Web Design Case Study: 250% Conversion Lift"
                    : `${service.title} Project: Client Success Story`}
              </h4>
              <p className="text-[#9eb0c8] text-[13px] mt-2" style={monoFont}>
                See how we helped a {service.title.toLowerCase()} client achieve
                measurable results.
              </p>
            </Link>

            <Link
              href="/blog"
              className="p-4 rounded-xl border bg-white/[0.04] hover:bg-white/[0.07] transition-all group"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <span
                className="text-[10px] tracking-[0.25em] uppercase text-[#5e6e84]"
                style={monoFont}
              >
                BLOG POST
              </span>
              <h4 className="text-white font-medium mt-1 group-hover:text-[#ff4d00] transition-colors">
                {service.title === "Web Design"
                  ? "10 Web Design Trends That Convert in 2026"
                  : service.title === "Shopify"
                    ? "How to Optimize Your Shopify Store for Higher Conversions"
                    : `The Ultimate Guide to ${service.title} for Small Businesses`}
              </h4>
              <p className="text-[#9eb0c8] text-[13px] mt-2" style={monoFont}>
                Expert insights to help you get the most from your{" "}
                {service.title.toLowerCase()} investment.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-8 px-6 rounded-2xl border bg-gradient-to-r from-white/[0.06] to-white/[0.03]"
          style={{
            borderColor: `${service.accent}33`,
            boxShadow: `0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)`,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s",
          }}
        >
          <div className="flex-1 min-w-0">
            <h3
              className="text-white m-0 mb-1"
              style={{
                ...bebasFont,
                fontSize: "clamp(24px,3vw,32px)",
                letterSpacing: "0.02em",
              }}
            >
              Ready to get started?
            </h3>
            <p className="text-[14px] text-[#9eb0c8] m-0" style={monoFont}>
              Let's discuss how {service.title.toLowerCase()} can help your
              business grow.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 py-3 px-6 text-white text-[12px] tracking-[0.24em] uppercase no-underline transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              style={{
                ...monoFont,
                background: `linear-gradient(135deg,${service.accent},${service.accent}d9)`,
                clipPath:
                  "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
                boxShadow: `0 8px 28px ${service.accent}44`,
              }}
            >
              Start Project <span>→</span>
            </a>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-[12px] text-[#7688a0] no-underline transition-colors duration-300 hover:text-white"
              style={monoFont}
            >
              View Case Studies <span style={{ color: service.accent }}>↗</span>
            </Link>
          </div>
        </div>

        {/* Related Services */}
        <div
          className="mt-16 pt-10 border-t border-white/10"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.7s ease 0.75s",
          }}
        >
          <h4
            className="text-white mb-6"
            style={{
              ...bebasFont,
              fontSize: "clamp(22px,3vw,28px)",
              letterSpacing: "0.02em",
            }}
          >
            Explore Other Services
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedServices.map((related, i) => (
              <Link
                key={related.id}
                href={`/services/${related.slug}`}
                className="group p-4 rounded-xl border bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(15px)",
                  transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.8 + i * 0.1}s`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      background: `${related.accent}1a`,
                      border: `1px solid ${related.accent}44`,
                      color: related.accent,
                    }}
                  >
                    {related.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-[9px] tracking-[0.3em] uppercase mb-1"
                      style={{ ...monoFont, color: "#5e6e84" }}
                    >
                      {related.number}
                    </div>
                    <div
                      className="text-[15px] text-white font-medium truncate group-hover:text-[#ff4d00] transition-colors"
                      style={bebasFont}
                    >
                      {related.title}
                    </div>
                    <div
                      className="text-[11px] text-[#6e8098] truncate mt-0.5"
                      style={monoFont}
                    >
                      {related.tagline}
                    </div>
                  </div>
                  <span
                    className="text-[11px] transition-transform group-hover:translate-x-1"
                    style={{ color: "#5e6e84" }}
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ContactSection />

      <style>{`
        @keyframes gridDrift { 100% { background-position: 64px 64px; } }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #0a0818; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #000000 0%, #7BB6FF 50%, #000000 100%); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #1a1a2e 0%, #5a9fd4 50%, #1a1a2e 100%); }
        details summary::-webkit-details-marker { display: none; }
      `}</style>
    </main>
  );
}
