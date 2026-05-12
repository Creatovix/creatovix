"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";




const SERVICES = [
    {
        id: 1,
        number: "01",
        icon: "◈",
        title: "Web Design",
        slug: "web-design",
        tagline: "Websites that convert",
        accent: "#ff4d00",
        accentRgb: "255,77,0",
        stats: [
            { v: "2–3×", l: "Conversion Lift" },
            { v: "30d", l: "Avg Results" },
            { v: "100%", l: "Mobile First" },
        ],
        problem:
            "Most websites look generic, load slowly, and fail to communicate value — costing you leads every day.",
        solution:
            "We design high-converting, pixel-perfect websites tailored to your brand — built to guide visitors toward action.",
        result:
            "Clients typically see 2–3× improvement in conversion rates and measurable drop in bounce within 30 days.",
        features: [
            "Responsive & mobile-first",
            "Conversion-optimized layouts",
            "Brand-aligned UI system",
            "Lightning fast load times",
        ],
    },
    {
        id: 2,
        number: "02",
        icon: "✦",
        title: "Graphic Design",
        slug: "graphic-design",
        tagline: "Visuals that build trust",
        accent: "#00c8ff",
        accentRgb: "0,200,255",
        stats: [
            { v: "∞", l: "Brand Assets" },
            { v: "100%", l: "Style Consistent" },
            { v: "24h", l: "First Draft" },
        ],
        problem:
            "Inconsistent branding makes businesses look unreliable and forgettable, losing trust before a word is read.",
        solution:
            "We craft cohesive brand identities — logos, color systems, typography, and assets that work across every touchpoint.",
        result:
            "A strong visual identity increases perceived value, improves brand recall, and accelerates client trust-building.",
        features: [
            "Logo & brand identity",
            "Social media assets",
            "Marketing collateral",
            "Style guides & systems",
        ],
    },
    {
        id: 3,
        number: "03",
        icon: "⬡",
        title: "Web Development",
        slug: "web-development",
        tagline: "Code built to perform",
        accent: "#a855f7",
        accentRgb: "168,85,247",
        stats: [
            { v: "99.9%", l: "Uptime SLA" },
            { v: "<1s", l: "Load Time" },
            { v: "A+", l: "Perf Score" },
        ],
        problem:
            "Slow, buggy, or poorly architected websites frustrate users and hurt SEO — both costing you revenue.",
        solution:
            "We build clean, scalable front-end and back-end solutions using modern frameworks with performance as a priority.",
        result:
            "Fast, stable applications with 99.9% uptime that scale seamlessly as your business grows.",
        features: [
            "Next.js & React",
            "TypeScript & clean code",
            "API integrations",
            "SEO & performance optimized",
        ],
    },
    {
        id: 4,
        number: "04",
        icon: "⬢",
        title: "Full Stack",
        slug: "full-stack",
        tagline: "End-to-end excellence",
        accent: "#10d4a0",
        accentRgb: "16,212,160",
        stats: [
            { v: "5×", l: "Faster Delivery" },
            { v: "1", l: "Unified Team" },
            { v: "0", l: "Miscommunication" },
        ],
        problem:
            "Coordinating separate design and dev teams wastes time, creates miscommunication, and delays your launch.",
        solution:
            "We handle everything — database architecture, APIs, UI, and deployment — under one roof with total alignment.",
        result:
            "Faster delivery (5× average), lower cost, and a product that's cohesive from the first pixel to the final query.",
        features: [
            "Database & API design",
            "Auth & security",
            "Cloud deployment",
            "Full project ownership",
        ],
    },
    {
        id: 5,
        number: "05",
        icon: "◉",
        title: "Shopify",
        slug: "shopify",
        tagline: "Stores built to sell more",
        accent: "#f59e0b",
        accentRgb: "245,158,11",
        stats: [
            { v: "3×", l: "Avg ROI Boost" },
            { v: "↑AOV", l: "Higher Orders" },
            { v: "Plus", l: "Expertise" },
        ],
        problem:
            "Default Shopify themes are generic, slow, and don't reflect your brand — leaving revenue on the table.",
        solution:
            "We build fully custom Shopify themes and apps, optimised for conversion, speed, and seamless UX.",
        result:
            "Clients average 3× ROI boost post-launch through better UX, faster checkout, and higher average order values.",
        features: [
            "Custom Shopify themes",
            "App integration & dev",
            "Checkout optimisation",
            "Shopify Plus expertise",
        ],
    },
];

const bebasFont = { fontFamily: "'Bebas Neue','Impact',sans-serif" };
const sansFont = { fontFamily: "'Inter', sans-serif" };

function useInView(threshold = 0.06) {
    const ref = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
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

export default function ServicesPage() {
    const { ref, inView } = useInView(0.04);
    const [activeId, setActiveId] = useState(1);
    const [animKey, setAnimKey] = useState(1);

    const active = SERVICES.find((s) => s.id === activeId)!;

    function select(id: number) {
        setActiveId(id);
        setAnimKey((k) => k + 1);
    }

    const cardItems = [
        {
            label: "Problem",
            text: active.problem,
            color: "#ef4444",
            icon: "✕",
        },
        {
            label: "Solution",
            text: active.solution,
            color: active.accent,
            icon: "→",
        },
        {
            label: "Result",
            text: active.result,
            color: "#10d4a0",
            icon: "✓",
        },
    ];

    return (
        <main
            ref={ref as React.RefObject<HTMLElement>}
            className="relative min-h-screen overflow-hidden"
            style={{
                ...sansFont,
                background: "linear-gradient(165deg,#fafafa 0%,#f5f5f5 45%,#fafafa 100%)",
            }}
        >
            {/* Grid texture */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",
                    backgroundSize: "64px 64px",
                    animation: "gridDrift 30s linear infinite",
                }}
            />
            {/* Scanlines */}
            <div
                className="absolute inset-0 pointer-events-none z-0 opacity-30"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.015) 3px,rgba(0,0,0,0.015) 4px)",
                }}
            />
            {/* Ambient glow – follows active accent */}
            <div
                className="absolute pointer-events-none rounded-full blur-[140px] z-0 transition-all duration-700"
                style={{
                    width: 900,
                    height: 900,
                    top: -200,
                    left: -200,
                    background: `radial-gradient(circle,rgba(255,77,0,0.06),transparent 70%)`,
                }}
            />
            <div
                className="absolute pointer-events-none rounded-full blur-[110px] z-0 transition-all duration-700"
                style={{
                    width: 600,
                    height: 600,
                    top: "40%",
                    right: -150,
                    background: `radial-gradient(circle,rgba(${active.accentRgb},0.07),transparent 70%)`,
                }}
            />

            <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-10 relative z-10 pt-[20vh] pb-[6vh]">

                {/* ── Page header ── */}
                <div
                    className="mb-14"
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0)" : "translateY(32px)",
                        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
                    }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span
                            className="w-10 h-px"
                            style={{ background: "#ff4d00", boxShadow: "0 0 10px rgba(255,77,0,0.4)" }}
                        />
                        <span
                            className="text-[10px] tracking-[0.38em] uppercase font-semibold text-[#ff4d00]"
                            style={sansFont}
                        >
                            What We Do
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <h1
                            className="text-[#1a1a2e] m-0 leading-none"
                            style={{
                                ...bebasFont,
                                fontSize: "clamp(44px,6vw,72px)",
                                letterSpacing: "0.03em",
                                lineHeight: 0.95,
                            }}
                        >
                            Services That Help
                            <br />
                            <span
                                style={{ color: "#ff4d00", textShadow: "0 0 35px rgba(255,77,0,0.3)" }}
                            >
                                Your Business Grow
                            </span>
                        </h1>

                        <div className="max-w-[380px]">
                            <p className="text-[#4a5568] text-[14px] leading-[1.78] mb-4 font-medium" style={sansFont}>
                                Every service is built around one goal: real, measurable results. We solve problems, craft solutions, and deliver outcomes that matter.
                            </p>
                            <div className="flex items-center gap-2.5">
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{
                                        background: "#10d4a0",
                                        boxShadow: "0 0 10px rgba(16,212,160,0.5)",
                                        animation: "pulse 1.8s ease-in-out infinite",
                                    }}
                                />
                                <span className="text-[12px] text-[#6b7280] tracking-[0.08em] font-medium" style={sansFont}>
                                    5 core services · end-to-end delivery
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Main grid: tabs + detail ── */}
                <div
                    className="grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[360px_1fr] gap-5"
                    style={{
                        opacity: inView ? 1 : 0,
                        transition: "opacity 0.9s ease 0.15s",
                    }}
                >
                    {/* ── Left: service tabs ── */}
                    <div className="flex flex-col gap-2.5">
                        {SERVICES.map((s) => {
                            const isActive = s.id === activeId;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => select(s.id)}
                                    className="relative flex items-center gap-4 px-5 py-4 text-left bg-transparent border cursor-pointer overflow-hidden transition-all duration-300 group"
                                    style={{
                                        borderRadius: 14,
                                        borderColor: isActive ? `${s.accent}55` : "rgba(0,0,0,0.1)",
                                        background: isActive
                                            ? `linear-gradient(135deg,${s.accent}12,rgba(0,0,0,0.01))`
                                            : "rgba(0,0,0,0.025)",
                                        boxShadow: isActive
                                            ? `0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)`
                                            : "none",
                                    }}
                                >
                                    {/* Active left bar */}
                                    <div
                                        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r transition-all duration-300"
                                        style={{ background: isActive ? s.accent : "transparent" }}
                                    />

                                    {/* Icon */}
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300"
                                        style={{
                                            background: isActive ? `${s.accent}18` : "rgba(0,0,0,0.04)",
                                            border: `1px solid ${isActive ? s.accent + "55" : "rgba(0,0,0,0.1)"}`,
                                            color: isActive ? s.accent : "rgba(26,26,46,0.35)",
                                        }}
                                    >
                                        {s.icon}
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1 min-w-0">
                                        <div
                                            className="text-[9px] tracking-[0.28em] uppercase font-semibold mb-0.5"
                                            style={{ ...sansFont, color: isActive ? s.accent : "#9ca3af" }}
                                        >
                                            {s.number}
                                        </div>
                                        <div
                                            style={{
                                                ...bebasFont,
                                                fontSize: 19,
                                                color: isActive ? "#1a1a2e" : "rgba(26,26,46,0.5)",
                                                letterSpacing: "0.03em",
                                                lineHeight: 1.1,
                                                transition: "color 0.3s",
                                            }}
                                        >
                                            {s.title}
                                        </div>
                                        <div
                                            className="text-[10.5px] font-medium mt-0.5 transition-colors duration-300"
                                            style={{ ...sansFont, color: isActive ? "#4a5568" : "#9ca3af" }}
                                        >
                                            {s.tagline}
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <span
                                        className="text-[12px] flex-shrink-0 transition-all duration-300"
                                        style={{
                                            color: isActive ? s.accent : "#9ca3af",
                                            transform: isActive ? "translateX(2px)" : "translateX(0)",
                                        }}
                                    >
                                        →
                                    </span>
                                </button>
                            );
                        })}

                        {/* Mobile quick nav pills */}
                        <div className="flex flex-wrap gap-2 mt-2 lg:hidden">
                            {SERVICES.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => select(s.id)}
                                    className="px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold border transition-all duration-300 cursor-pointer"
                                    style={{
                                        ...sansFont,
                                        background: activeId === s.id ? s.accent : "rgba(0,0,0,0.04)",
                                        color: activeId === s.id ? "#fff" : "rgba(26,26,46,0.55)",
                                        borderColor: activeId === s.id ? s.accent : "rgba(0,0,0,0.12)",
                                    }}
                                >
                                    {s.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: detail panel ── */}
                    <div
                        key={animKey}
                        className="relative overflow-hidden rounded-2xl border"
                        style={{
                            borderColor: `${active.accent}44`,
                            background: "linear-gradient(135deg,#ffffff,#fafafa)",
                            boxShadow: `0 20px 60px rgba(0,0,0,0.08), 0 0 50px rgba(${active.accentRgb},0.07), inset 0 1px 0 rgba(255,255,255,0.9)`,
                            animation: "fadeSlideIn 0.38s cubic-bezier(0.16,1,0.3,1) both",
                        }}
                    >
                        {/* Corner accent triangle */}
                        <div
                            className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-40"
                            style={{
                                background: `linear-gradient(135deg,${active.accent},transparent)`,
                                clipPath: "polygon(100% 0,0 0,100% 100%)",
                            }}
                        />
                        {/* Ambient glow overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: `radial-gradient(ellipse at top right,rgba(${active.accentRgb},0.06),transparent 55%)`,
                            }}
                        />
                        {/* Ghost number */}
                        <div
                            className="absolute bottom-6 right-8 pointer-events-none select-none"
                            style={{
                                ...bebasFont,
                                fontSize: 100,
                                color: `rgba(${active.accentRgb},0.055)`,
                                lineHeight: 1,
                                letterSpacing: "0.04em",
                            }}
                        >
                            {active.number}
                        </div>

                        <div className="relative p-7 xl:p-10">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 mb-7">
                                <div>
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <span
                                            className="inline-block w-5 h-px"
                                            style={{ background: active.accent }}
                                        />
                                        <span
                                            className="text-[9.5px] tracking-[0.32em] uppercase font-semibold"
                                            style={{ ...sansFont, color: active.accent }}
                                        >
                                            {active.number} — {active.tagline}
                                        </span>
                                    </div>
                                    <h2
                                        className="m-0 text-[#1a1a2e] leading-none"
                                        style={{
                                            ...bebasFont,
                                            fontSize: "clamp(32px,4vw,50px)",
                                            letterSpacing: "0.03em",
                                        }}
                                    >
                                        {active.title}
                                    </h2>
                                </div>
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                                    style={{
                                        background: `rgba(${active.accentRgb},0.12)`,
                                        border: `1px solid rgba(${active.accentRgb},0.4)`,
                                        color: active.accent,
                                        boxShadow: `0 0 24px rgba(${active.accentRgb},0.18)`,
                                    }}
                                >
                                    {active.icon}
                                </div>
                            </div>

                            {/* Stats row */}
                            <div className="flex gap-6 mb-7 flex-wrap">
                                {active.stats.map((stat, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <span
                                            style={{
                                                ...bebasFont,
                                                fontSize: 30,
                                                color: active.accent,
                                                lineHeight: 1,
                                                textShadow: `0 0 18px rgba(${active.accentRgb},0.2)`,
                                            }}
                                        >
                                            {stat.v}
                                        </span>
                                        <span
                                            className="text-[9px] tracking-[0.22em] uppercase font-medium text-[#6b7280]"
                                            style={sansFont}
                                        >
                                            {stat.l}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Problem / Solution / Result cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-7">
                                {cardItems.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col gap-3 p-4 rounded-xl border"
                                        style={{
                                            borderColor: `${item.color}30`,
                                            background: `${item.color}0a`,
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-6 h-6 rounded-lg flex items-center justify-center text-[12px] font-bold flex-shrink-0"
                                                style={{
                                                    background: `${item.color}18`,
                                                    border: `1px solid ${item.color}40`,
                                                    color: item.color,
                                                }}
                                            >
                                                {item.icon}
                                            </div>
                                            <span
                                                className="text-[9px] tracking-[0.28em] uppercase font-semibold"
                                                style={{ ...sansFont, color: item.color }}
                                            >
                                                {item.label}
                                            </span>
                                        </div>
                                        <p
                                            className="text-[13px] text-[#4a5568] leading-[1.7] m-0 font-medium"
                                            style={sansFont}
                                        >
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Features */}
                            <div className="mb-7">
                                <span
                                    className="text-[9px] tracking-[0.3em] text-[#6b7280] uppercase block mb-3 font-semibold"
                                    style={sansFont}
                                >
                                    What's included
                                </span>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {active.features.map((f, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white border border-black/10"
                                        >
                                            <span
                                                className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                                                style={{
                                                    background: active.accent,
                                                    boxShadow: `0 0 6px rgba(${active.accentRgb},0.4)`,
                                                }}
                                            />
                                            <span className="text-[13px] text-[#4a5568] font-medium" style={sansFont}>
                                                {f}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA buttons */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <Link
                                    href={`/services/${active.slug}`}
                                    className="inline-flex items-center gap-2.5 py-3 px-7 text-white text-[12px] tracking-[0.22em] uppercase no-underline font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                                    style={{
                                        ...sansFont,
                                        background: `linear-gradient(135deg,${active.accent},${active.accent}cc)`,
                                        clipPath:
                                            "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
                                        boxShadow: `0 6px 24px rgba(${active.accentRgb},0.35)`,
                                    }}
                                >
                                    Learn More →
                                </Link>
                                <a
                                    href="/#contact"
                                    className="inline-flex items-center gap-2 py-3 px-6 text-[12px] tracking-[0.2em] uppercase no-underline border transition-all duration-300 hover:bg-black/[0.04] font-medium"
                                    style={{
                                        ...sansFont,
                                        color: "#4a5568",
                                        borderColor: "rgba(0,0,0,0.12)",
                                        borderRadius: 4,
                                    }}
                                >
                                    Get a Quote ↗
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Bottom CTA banner ── */}
                <div
                    className="mt-20 relative rounded-2xl overflow-hidden p-10 md:p-14"
                    style={{
                        background: "linear-gradient(135deg,rgba(255,77,0,0.07),rgba(0,0,0,0.02),rgba(168,85,247,0.04))",
                        border: "1px solid rgba(255,77,0,0.22)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.07), 0 0 50px rgba(255,77,0,0.05)",
                        opacity: inView ? 1 : 0,
                        transition: "opacity 1s ease 0.4s",
                    }}
                >
                    <div
                        className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
                        style={{ background: "radial-gradient(circle at top right,rgba(255,77,0,0.09),transparent 65%)" }}
                    />
                    <div
                        className="absolute -bottom-6 -left-4 pointer-events-none select-none"
                        style={{
                            ...bebasFont,
                            fontSize: 180,
                            color: "rgba(255,77,0,0.04)",
                            lineHeight: 1,
                        }}
                    >
                        GO
                    </div>
                    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
                        <div>
                            <div
                                className="text-[10px] tracking-[0.35em] uppercase text-[#ff4d00] mb-3 font-semibold"
                                style={sansFont}
                            >
                                Ready to get started?
                            </div>
                            <h2
                                className="text-[#1a1a2e] m-0 mb-3 leading-none"
                                style={{ ...bebasFont, fontSize: "clamp(30px,4vw,52px)" }}
                            >
                                Let's Build Something{" "}
                                <span style={{ color: "#ff4d00" }}>Exceptional</span>
                            </h2>
                            <p className="text-[#4a5568] m-0 text-[14px] leading-[1.7] font-medium max-w-[420px]" style={sansFont}>
                                From web design to full-stack development — let's build something that delivers real results for your business.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 flex-shrink-0">
                            <a
                                href="/#contact"
                                className="inline-flex items-center justify-center gap-2.5 py-4 px-8 text-white text-[11px] tracking-[0.28em] uppercase no-underline font-semibold transition-all duration-300 hover:-translate-y-1 active:scale-95"
                                style={{
                                    ...sansFont,
                                    background: "linear-gradient(135deg,#ff4d00,#cc3d00)",
                                    clipPath:
                                        "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
                                    boxShadow: "0 10px 32px rgba(255,77,0,0.35)",
                                }}
                            >
                                Book Free Strategy Call →
                            </a>
                            <Link
                                href="/#work"
                                className="inline-flex items-center justify-center gap-2 py-3.5 px-8 text-[11px] tracking-[0.22em] uppercase no-underline border transition-all duration-300 hover:bg-black/[0.04] font-medium"
                                style={{
                                    ...sansFont,
                                    color: "#4a5568",
                                    borderColor: "rgba(0,0,0,0.12)",
                                    borderRadius: 4,
                                }}
                            >
                                View Our Work ↗
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes gridDrift { 100% { background-position: 64px 64px; } }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.6)} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        a { text-decoration: none !important; }
        button { font-family: inherit; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #fafafa; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg,#cbd5e1,#94a3b8 50%,#cbd5e1);
          border-radius: 3px;
        }
      `}</style>
        </main>
    );
}