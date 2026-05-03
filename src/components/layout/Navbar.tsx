"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/#about" },
  { label: "Process", href: "/#process" },
  { label: "Blog", href: "/blog" },
  { label: "Team", href: "/#team" },
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
        className={`
          fixed top-0 left-0 right-0 z-[1000]
          transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
          bg-[rgba(255,252,248,0.92)] backdrop-blur-[20px] saturate-[1.5] border-b border-[rgba(255,77,0,0.15)] shadow-[0_2px_20px_rgba(0,0,0,0.06)] py-2
        `}
      >
        <div className="max-w-[1600px] mx-auto xl:px-10 px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href={"/#"}>
            <Image
              src="/logo.webp"
              alt="logo"
              height={100}
              width={100}
              className="xl:w-[120px] md:w-[120px] w-[90px] h-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav hidden lg:flex items-center gap-1 sm:gap-2 xl:gap-4">
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
              href="/#contact"
              className={`
              ml-3 md:ml-6 py-[9px] px-5 md:py-[11px] md:px-7
              bg-gradient-to-tr from-[#ff4d00] to-[#ff8c00]
              text-white font-mono text-xs md:text-[14px] font-bold tracking-[0.2em] uppercase
              no-underline relative overflow-hidden
              [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))]
              transition-all duration-300
              inline-block
              hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(255,77,0,0.4)]
            `}
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Start Project
            </a>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-burger flex flex-col gap-[6px] p-2 bg-none border-none cursor-pointer lg:hidden"
            aria-label="Toggle menu"
            type="button"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`
                block transition-all duration-300
                ${i === 1 ? "bg-[#ff4d00] w-[22px]" : "bg-[#1a1a2e] w-[30px]"}
                h-[2px]
                origin-center
              `}
                style={{
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
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-[999] bg-[#fffcf8] flex flex-col items-center justify-center
          gap-4 sm:gap-6
          transition-transform duration-600 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)]
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
          lg:hidden
        `}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={`
              font-bebasNeue text-[#1a1a2e] no-underline tracking-[0.1em] relative
              text-[2.25rem] xs:text-[2.5rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.75rem] xl:text-[4.5rem]
              transition-all duration-600
              ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}
            `}
            style={{
              transitionDelay: `${i * 80 + 100}ms`,
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#ff4d00")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#1a1a2e")
            }
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className={`
            mt-6 py-[12px] xs:py-[14px] px-8 xs:px-10
            bg-gradient-to-tr from-[#ff4d00] to-[#ff8c00]
            text-white font-mono text-xs xs:text-[13px] tracking-[0.2em] uppercase
            no-underline
            [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))]
            transition-all duration-600
            ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
          `}
          style={{
            transitionDelay: "420ms",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Start Project
        </a>
      </div>

      {/* ANIMATIONS AND FONTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600&display=swap');
        @keyframes logoPulse {
          0%, 100% { text-shadow: 0 0 20px rgba(255,77,0,0.6); }
          50% { text-shadow: 0 0 40px rgba(255,77,0,1), 0 0 80px rgba(255,77,0,0.4); }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px #ff4d00; }
          50% { opacity: 0.3; box-shadow: 0 0 4px #ff4d00; }
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
      className={`
        relative py-2 px-2 sm:px-4 xl:px-5 2xl:px-6
        font-medium text-xs sm:text-[13px] tracking-[0.12em] uppercase inline-block
        transition-colors duration-300
        ${hovered ? "text-[#ff4d00]" : "text-black"}
      `}
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Underline bar */}
      <span
        className={`
          absolute left-2 right-2 sm:left-4 sm:right-4 bottom-1 h-[1px]
          [background:linear-gradient(90deg,#ff4d00,#ff8c00)]
          shadow-[0_0_8px_rgba(255,77,0,0.6)]
          ${hovered ? "scale-x-100" : "scale-x-0"}
          transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
          origin-left
          block
        `}
      />
      {label}
    </a>
  );
}