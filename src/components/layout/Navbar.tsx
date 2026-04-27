"use client";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "16px 48px" : "20px 100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled
            ? "rgba(4, 2, 10, 0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,77,0,0.12)"
            : "1px solid transparent",
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
          transform: mounted ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
            fontSize: 40,
            letterSpacing: "0.12em",
            color: "#fff",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 0,
            position: "relative",
          }}
        >
          <span style={{ color: "#fff" }}>CREAT</span>
          <span
            style={{
              color: "#ff4d00",
              display: "inline-block",
              animation: "logoPulse 3s ease-in-out infinite",
            }}
          >
            O
          </span>
          <span style={{ color: "#fff" }}>VIX</span>
          {/* Dot accent */}
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              background: "#ff4d00",
              borderRadius: "50%",
              marginLeft: 5,
              marginBottom: 2,
              boxShadow: "0 0 10px #ff4d00",
              animation: "dotBlink 2s ease-in-out infinite",
              alignSelf: "flex-end",
            }}
          />
        </a>

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              delay={i * 60}
              isActive={activeLink === link.href}
              onHover={setActiveLink}
            />
          ))}

          {/* CTA Button */}
          <a
            href="#contact"
            style={{
              marginLeft: 24,
              padding: "11px 28px",
              background: "linear-gradient(135deg, #ff4d00 0%, #ff8c00 100%)",
              color: "#fff",
              fontFamily: "'Courier New', monospace",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
              clipPath:
                "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              transition: "all 0.3s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 8px 30px rgba(255,77,0,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Start Project
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-burger"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: 6,
            padding: 8,
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: i === 1 ? 22 : 30,
                height: 2,
                background:
                  i === 1 ? "#ff4d00" : "#fff",
                transition: "all 0.3s ease",
                transformOrigin: "center",
                transform: menuOpen
                  ? i === 0
                    ? "rotate(45deg) translate(5px, 6px)"
                    : i === 2
                    ? "rotate(-45deg) translate(5px, -6px)"
                    : "scaleX(0)"
                  : "none",
              }}
            />
          ))}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "#04020a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: "clamp(40px, 10vw, 72px)",
              color: "#fff",
              textDecoration: "none",
              letterSpacing: "0.1em",
              transform: menuOpen
                ? "translateX(0)"
                : "translateX(80px)",
              opacity: menuOpen ? 1 : 0,
              transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 80 + 100}ms`,
              position: "relative",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#ff4d00";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: 24,
            padding: "14px 40px",
            background: "linear-gradient(135deg, #ff4d00, #ff8c00)",
            color: "#fff",
            fontFamily: "'Courier New', monospace",
            fontSize: 13,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            clipPath:
              "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            transform: menuOpen ? "translateY(0)" : "translateY(30px)",
            opacity: menuOpen ? 1 : 0,
            transition: "all 0.6s cubic-bezier(0.16,1,0.3,1) 420ms",
          }}
        >
          Start Project
        </a>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        
        @keyframes logoPulse {
          0%, 100% { text-shadow: 0 0 20px rgba(255,77,0,0.6); }
          50% { text-shadow: 0 0 40px rgba(255,77,0,1), 0 0 80px rgba(255,77,0,0.4); }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px #ff4d00; }
          50% { opacity: 0.3; box-shadow: 0 0 4px #ff4d00; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: flex !important; }
          header { padding: 20px 24px !important; }
        }
      `}</style>
    </>
  );
}

function NavLink({
  href,
  label,
  delay,
  isActive,
  onHover,
}: {
  href: string;
  label: string;
  delay: number;
  isActive: boolean;
  onHover: (href: string | null) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => {
        setHovered(true);
        onHover(href);
      }}
      onMouseLeave={() => {
        setHovered(false);
        onHover(null);
      }}
      style={{
        position: "relative",
        padding: "8px 16px",
        fontFamily: "'DM Mono', 'Courier New', monospace",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: hovered ? "#ff4d00" : "rgba(255,255,255,0.7)",
        textDecoration: "none",
        transition: "color 0.3s ease",
        display: "inline-block",
      }}
    >
      {/* Underline bar */}
      <span
        style={{
          position: "absolute",
          bottom: 4,
          left: 16,
          right: 16,
          height: 1,
          background: "linear-gradient(90deg, #ff4d00, #ff8c00)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: "0 0 8px rgba(255,77,0,0.6)",
        }}
      />
      {label}
    </a>
  );
}