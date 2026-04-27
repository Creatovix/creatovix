"use client";
import { useEffect, useRef, useState } from "react";

const SERVICES = [
  "Web Design",
  "Graphic Design",
  "Web Development",
  "Full Stack",
  "Shopify",
];

const LINKS = {
  Company: ["About Us", "Our Work", "Careers", "Blog"],
  Services: SERVICES,
  Connect: ["hello@creatovix.com", "Instagram", "LinkedIn", "Twitter/X"],
};

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Footer() {
  const { ref, inView } = useInView(0.15);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer
      ref={ref}
      style={{
        background: "#04020a",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,77,0,0.12)",
      }}
    >
      {/* Animated grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,77,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,77,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(255,77,0,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          margin: "0 auto",
          padding: "clamp(60px, 8vw, 100px) 50px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 80px)",
            marginBottom: "clamp(60px, 8vw, 100px)",
            alignItems: "start",
          }}
        >
          {/* Left: Brand */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                fontSize: "clamp(48px, 7vw, 80px)",
                letterSpacing: "0.08em",
                lineHeight: 1,
                marginBottom: 24,
              }}
            >
              <span style={{ color: "#fff" }}>CREAT</span>
              <span
                style={{
                  color: "#ff4d00",
                  textShadow: "0 0 40px rgba(255,77,0,0.6)",
                }}
              >
                O
              </span>
              <span style={{ color: "#fff" }}>VIX</span>
            </div>
            <p
              style={{
                fontFamily: "'DM Mono', 'Courier New', monospace",
                fontSize: 14,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.4)",
                maxWidth: 380,
                marginBottom: 40,
              }}
            >
              We are a digital agency that transforms ideas into extraordinary
              digital experiences. Bold design. Clean code. Real results.
            </p>

            {/* Newsletter */}
            <div
              style={{
                display: "flex",
                gap: 0,
                maxWidth: 380,
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRight: "none",
                  color: "#fff",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  letterSpacing: "0.05em",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,77,0,0.4)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
              <button
                onClick={() => {
                  if (email) {
                    setSubscribed(true);
                    setEmail("");
                  }
                }}
                style={{
                  padding: "12px 20px",
                  background: "linear-gradient(135deg, #ff4d00, #ff8c00)",
                  border: "none",
                  color: "#fff",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                }}
              >
                {subscribed ? "✓ Done" : "Subscribe"}
              </button>
            </div>
          </div>

          {/* Right: Links */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
            }}
          >
            {Object.entries(LINKS).map(([title, items], colIdx) => (
              <div
                key={title}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.1 + colIdx * 0.1}s`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#ff4d00",
                    marginBottom: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 16,
                      height: 1,
                      background: "#ff4d00",
                    }}
                  />
                  {title}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {items.map((item, itemIdx) => (
                    <li key={item} style={{ marginBottom: 12 }}>
                      <FooterLink label={item} delay={itemIdx * 30} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider with animated line */}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.06)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent, #ff4d00, transparent)",
              transform: inView ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 1.5s ease 0.5s",
            }}
          />
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 0",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.1em",
            }}
          >
            © 2025 Creatovix. All rights reserved.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.08em",
            }}
          >
            Crafted with
            <span
              style={{
                color: "#ff4d00",
                animation: "heartbeat 1.5s ease-in-out infinite",
                display: "inline-block",
              }}
            >
              ♥
            </span>
            by Creatovix Team
          </div>

          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.25)",
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#ff4d00";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,0.25)";
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        @media (max-width: 768px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
          footer > div > div:first-child > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </footer>
  );
}

function FooterLink({ label, delay }: { label: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 13,
        color: hovered ? "#fff" : "rgba(255,255,255,0.35)",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: 6,
        transition: "color 0.2s ease",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: hovered ? 16 : 0,
          height: 1,
          background: "#ff4d00",
          transition: "width 0.3s ease",
          flexShrink: 0,
        }}
      />
      {label}
    </a>
  );
}