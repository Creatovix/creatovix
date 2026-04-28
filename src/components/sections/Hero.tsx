"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

// Make type for NodeJS.Timeout (for both node and browser)
type Timeout = ReturnType<typeof setTimeout>;
type Interval = ReturnType<typeof setInterval>;

const SLIDES = [
  {
    id: 0,
    tagline: "WEB DESIGN",
    headline: ["PIXELS THAT", "SPEAK LOUDER"],
    sub: "Crafting digital experiences that captivate, convert, and leave a lasting impression.",
    accent: "#ff4d00",
    bg: "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,77,0,0.18) 0%, transparent 70%)",
    stat: { value: "150+", label: "Projects Delivered" },
    shape: "circle",
  },
  {
    id: 1,
    tagline: "GRAPHIC DESIGN",
    headline: ["VISUALS THAT", "DEFY GRAVITY"],
    sub: "Brand identities, visual systems and graphic assets that make your audience stop scrolling.",
    accent: "#00c8ff",
    bg: "radial-gradient(ellipse 80% 60% at 30% 60%, rgba(0,200,255,0.15) 0%, transparent 70%)",
    stat: { value: "98%", label: "Client Satisfaction" },
    shape: "triangle",
  },
  {
    id: 2,
    tagline: "WEB DEVELOPMENT",
    headline: ["CODE THAT", "POWERS DREAMS"],
    sub: "Blazing-fast, scalable web applications built with modern tech stacks and clean architecture.",
    accent: "#a855f7",
    bg: "radial-gradient(ellipse 80% 60% at 60% 30%, rgba(168,85,247,0.18) 0%, transparent 70%)",
    stat: { value: "99.9%", label: "Uptime Guarantee" },
    shape: "diamond",
  },
  {
    id: 3,
    tagline: "FULL STACK",
    headline: ["END-TO-END", "EXCELLENCE"],
    sub: "From database architecture to pixel-perfect UIs — we handle the entire digital stack.",
    accent: "#10d4a0",
    bg: "radial-gradient(ellipse 80% 60% at 40% 70%, rgba(16,212,160,0.15) 0%, transparent 70%)",
    stat: { value: "5x", label: "Faster Delivery" },
    shape: "hexagon",
  },
  {
    id: 4,
    tagline: "SHOPIFY",
    headline: ["STORES BUILT", "TO SELL MORE"],
    sub: "Custom Shopify themes and apps that transform browsers into loyal buyers.",
    accent: "#f59e0b",
    bg: "radial-gradient(ellipse 80% 60% at 65% 45%, rgba(245,158,11,0.15) 0%, transparent 70%)",
    stat: { value: "3x", label: "Average ROI Boost" },
    shape: "star",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [transitioning, setTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const autoRef = useRef<Interval | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (nextIdx: number, dir: "next" | "prev") => {
      if (transitioning) return;
      setTransitioning(true);
      setPrev(current);
      setDirection(dir);
      setCurrent(nextIdx);
      setTimeout(() => {
        setPrev(null);
        setTransitioning(false);
      }, 900);
    },
    [current, transitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length, "next");
    // Do not reset auto here, only when user acts
  }, [current, goTo]);

  const goToPrev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length, "prev");
    // Do not reset auto here, only when user acts
  }, [current, goTo]);

  useEffect(() => {
    if (autoRef.current) clearInterval(autoRef.current as any);
    autoRef.current = setInterval(next, 5000) as any;
    return () => {
      if (autoRef.current) clearInterval(autoRef.current as any);
    };
  }, [next]);

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current as any);
    autoRef.current = setInterval(next, 5000) as any;
  }, [next]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const slide = SLIDES[current];

  return (
    <section
      className="px-[100px]"
      ref={containerRef}
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 700,
        overflow: "hidden",
        background: "#04020a",
      }}
    >
      {/* Parallax grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,77,0,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(255,77,0,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 20}px)`,
          transition: "transform 0.8s ease-out",
          pointerEvents: "none",
        }}
      />

      {/* Scanline effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* Current slide bg glow */}
      <div
        key={`bg-${current}`}
        style={{
          position: "absolute",
          inset: 0,
          background: slide.bg,
          opacity: 1,
          animation: "bgFadeIn 0.8s ease-out",
          transition: "all 0.8s ease",
        }}
      />

      {/* Slide counter */}
      <div
        style={{
          position: "absolute",
          right: 48,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          zIndex: 20,
        }}
      >
        {SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => {
              goTo(i, i > current ? "next" : "prev");
              resetAuto();
            }}
            style={{
              height: i === current ? 40 : 20,
              background:
                i === current ? slide.accent : "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 2,
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              boxShadow:
                i === current
                  ? `0 0 12px ${slide.accent}`
                  : "none",
              width: i === current ? "3px" : "2px",
              minWidth: i === current ? "3px" : "2px",
              padding: 0,
              outline: "none",
            }}
            aria-label={`Show slide ${i + 1}`}
            tabIndex={0}
          />
        ))}
      </div>

      {/* Slide number display */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          right: 48,
          zIndex: 20,
          fontFamily: "'Bebas Neue', 'Impact', sans-serif",
          fontSize: 80,
          color: "rgba(255,255,255,0.04)",
          lineHeight: 1,
          userSelect: "none",
          letterSpacing: "0.05em",
        }}
      >
        {String(current + 1).padStart(2, "0")}
      </div>

      {/* 3D Floating shape */}
      <FloatingShape shape={slide.shape} color={slide.accent} mousePos={mousePos} />

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 100px",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 760 }}>
          {/* Tagline */}
          <div
            key={`tag-${current}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
              animation: "slideInUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 32,
                height: 2,
                background: slide.accent,
                boxShadow: `0 0 8px ${slide.accent}`,
              }}
            />
            <span
              style={{
                fontFamily: "'DM Mono', 'Courier New', monospace",
                fontSize: 11,
                letterSpacing: "0.35em",
                color: slide.accent,
                textTransform: "uppercase",
              }}
            >
              {slide.tagline}
            </span>
          </div>

          {/* Headline */}
          {slide.headline.map((line, i) => (
            <div
              key={`h-${current}-${i}`}
              style={{
                overflow: "hidden",
                lineHeight: 1,
                marginBottom: i === 0 ? 4 : 0,
              }}
            >
              <h1
                style={{
                  fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                  fontSize: "clamp(52px, 9vw, 110px)",
                  lineHeight: 1,
                  letterSpacing: "0.03em",
                  color: i === 0 ? "#fff" : slide.accent,
                  margin: 0,
                  animation: `slideInUp 0.8s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.1}s both`,
                  willChange: "transform, opacity",
                }}
              >
                {line}
              </h1>
            </div>
          ))}

          {/* Sub */}
          <p
            key={`sub-${current}`}
            style={{
              fontFamily: "'DM Mono', 'Courier New', monospace",
              fontSize: "clamp(13px, 1.4vw, 16px)",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.5)",
              maxWidth: 480,
              marginTop: 28,
              marginBottom: 48,
              animation: "slideInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both",
            }}
          >
            {slide.sub}
          </p>

          {/* CTAs */}
          <div
            key={`cta-${current}`}
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              flexWrap: "wrap",
              animation: "slideInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s both",
            }}
          >
            <a
              href="#contact"
              style={{
                padding: "14px 36px",
                background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}cc)`,
                color: "#fff",
                fontFamily: "'DM Mono', 'Courier New', monospace",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                clipPath:
                  "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                transition: "all 0.3s ease",
                boxShadow: `0 0 30px ${slide.accent}44`,
                display: "inline-block",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(-3px) scale(1.02)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  `0 12px 40px ${slide.accent}66`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(0) scale(1)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  `0 0 30px ${slide.accent}44`;
              }}
            >
              Get Started
            </a>
            <a
              href="#work"
              style={{
                padding: "14px 36px",
                background: "transparent",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "'DM Mono', 'Courier New', monospace",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.15)",
                transition: "all 0.3s ease",
                display: "inline-block",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  slide.accent;
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255,255,255,0.15)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.7)";
              }}
            >
              View Work →
            </a>
          </div>

          {/* Stat badge */}
          <div
            key={`stat-${current}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 56,
              animation: "slideInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both",
            }}
          >
            <div
              style={{
                padding: "12px 24px",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${slide.accent}33`,
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                  fontSize: 32,
                  color: slide.accent,
                  lineHeight: 1,
                }}
              >
                {slide.stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                {slide.stat.label}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow nav */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: "clamp(24px, 8vw, 120px)",
          display: "flex",
          gap: 12,
          zIndex: 20,
        }}
      >
        {[
          { fn: goToPrev, icon: "←" },
          { fn: () => { next(); }, icon: "→" },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={() => { btn.fn(); resetAuto(); }}
            style={{
              width: 52,
              height: 52,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid rgba(255,255,255,0.1)`,
              color: "#fff",
              fontSize: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              fontFamily: "monospace",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background =
                `${slide.accent}22`;
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                slide.accent;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.1)";
            }}
            aria-label={i === 0 ? "Previous slide" : "Next slide"}
            tabIndex={0}
          >
            {btn.icon}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(255,255,255,0.05)",
          zIndex: 20,
        }}
      >
        <div
          key={`progress-${current}`}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${slide.accent}, ${slide.accent}88)`,
            animation: "progressBar 5s linear forwards",
            boxShadow: `0 0 8px ${slide.accent}`,
          }}
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bgFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes float3d {
          0%, 100% { transform: translateY(0px) rotateY(0deg) rotateX(5deg); }
          33% { transform: translateY(-20px) rotateY(120deg) rotateX(10deg); }
          66% { transform: translateY(10px) rotateY(240deg) rotateX(-5deg); }
        }
        @keyframes rotateStar {
          from { transform: rotate(0deg) rotateX(20deg); }
          to { transform: rotate(360deg) rotateX(20deg); }
        }
      `}</style>
    </section>
  );
}

type FloatingShapeProps = {
  shape: string;
  color: string;
  mousePos: { x: number; y: number };
};

function FloatingShape({ shape, color, mousePos }: FloatingShapeProps) {
  const x = 55 + (mousePos.x - 0.5) * 8;
  const y = 50 + (mousePos.y - 0.5) * 8;

  const shapeStyle: React.CSSProperties = {
    position: "absolute",
    right: `${100 - x}%`,
    top: `${y - 20}%`,
    transform: "translate(50%, -50%)",
    zIndex: 3,
    pointerEvents: "none",
    transition: "right 0.6s ease-out, top 0.6s ease-out",
    animation: "float3d 8s ease-in-out infinite",
    perspective: "600px",
    filter: `drop-shadow(0 0 40px ${color}66)`,
    opacity: 0.85,
  };

  const size = "clamp(200px, 25vw, 380px)";

  if (shape === "circle") {
    return (
      <div style={shapeStyle}>
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: `conic-gradient(from 0deg, ${color}44, transparent, ${color}22, transparent, ${color}44)`,
            border: `1px solid ${color}33`,
            boxShadow: `inset 0 0 60px ${color}22, 0 0 80px ${color}22`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "15%",
            borderRadius: "50%",
            border: `1px solid ${color}22`,
          }}
        />
      </div>
    );
  }

  if (shape === "triangle") {
    const s = "clamp(160px, 20vw, 300px)";
    return (
      <div style={{ ...shapeStyle }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 300"
          style={{ overflow: "visible", width: s, height: s }}
        >
          <polygon
            points="150,20 290,260 10,260"
            fill={`${color}18`}
            stroke={color}
            strokeWidth={1}
            strokeOpacity={0.5}
          />
          <polygon
            points="150,60 250,240 50,240"
            fill="none"
            stroke={color}
            strokeWidth={0.5}
            strokeOpacity={0.3}
          />
        </svg>
      </div>
    );
  }

  if (shape === "diamond") {
    return (
      <div style={{ ...shapeStyle }}>
        <div
          style={{
            width: size,
            height: size,
            background: `linear-gradient(135deg, ${color}22, transparent, ${color}11)`,
            border: `1px solid ${color}44`,
            transform: "rotate(45deg)",
            boxShadow: `inset 0 0 40px ${color}11`,
          }}
        />
      </div>
    );
  }

  if (shape === "hexagon") {
    const s = "clamp(160px, 22vw, 320px)";
    return (
      <div style={{ ...shapeStyle }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 300"
          style={{ overflow: "visible", width: s, height: s }}
        >
          <polygon
            points="150,10 270,75 270,225 150,290 30,225 30,75"
            fill={`${color}14`}
            stroke={color}
            strokeWidth={1}
            strokeOpacity={0.5}
          />
          <polygon
            points="150,50 240,97 240,203 150,250 60,203 60,97"
            fill="none"
            stroke={color}
            strokeWidth={0.5}
            strokeOpacity={0.25}
          />
        </svg>
      </div>
    );
  }

  if (shape === "star") {
    const s = "clamp(160px, 22vw, 320px)";
    return (
      <div
        style={{
          ...shapeStyle,
          animation: "rotateStar 12s linear infinite",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 300"
          style={{ overflow: "visible", width: s, height: s }}
        >
          <polygon
            points="150,10 190,110 300,120 220,195 245,295 150,245 55,295 80,195 0,120 110,110"
            fill={`${color}18`}
            stroke={color}
            strokeWidth={1}
            strokeOpacity={0.5}
          />
        </svg>
      </div>
    );
  }

  return null;
}