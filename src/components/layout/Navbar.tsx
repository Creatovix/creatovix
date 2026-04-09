'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Team', href: '#team' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      if (navRef.current) {
        gsap.fromTo(navRef.current,
          { y: -64, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15 }
        )
      }
    }
    init()
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          padding: scrolled ? '10px 0' : '22px 0',
          background: scrolled
            ? 'rgba(245,243,240,0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.8)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.8)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(224,221,216,0.6)' : 'none',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 38, height: 38,
              background: 'linear-gradient(135deg, #1A1916 0%, #3a3632 100%)',
              color: '#fff', borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 800,
              letterSpacing: '-0.02em',
              boxShadow: '0 2px 8px rgba(26,25,22,0.2)',
            }}>DC</div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.04em', color: '#1A1916' }}>
              Code<span style={{ color: '#C4622D' }}>Craft</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 2, listStyle: 'none', margin: 0, padding: 0 }} className="nav-desktop">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link"
                  style={{ fontSize: 17, fontWeight: 500, color: '#6B6860', padding: '7px 14px', borderRadius: 9999, textDecoration: 'none', transition: 'all 0.2s', display: 'block', letterSpacing: '-0.01em' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#1A1916'; (e.target as HTMLElement).style.background = 'rgba(26,25,22,0.06)'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = '#6B6860'; (e.target as HTMLElement).style.background = 'transparent'; }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a href="tel:+1234567890" className="nav-desktop" style={{ fontSize: 13, fontWeight: 500, color: '#6B6860', textDecoration: 'none', letterSpacing: '-0.01em' }}>+1 (234) 567-8900</a>
            <Link href="#contact" className="btn-primary nav-desktop" style={{ fontSize: 13, padding: '9px 20px' }}>
              Start a Project
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" /></svg>
            </Link>
            {/* Burger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-mobile"
              style={{ width: 38, height: 38, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, border: '1px solid rgba(26,25,22,0.12)', borderRadius: 10, background: 'transparent', cursor: 'pointer', flexShrink: 0 }}
              aria-label="Toggle menu"
            >
              <span style={{ display: 'block', width: 16, height: 1.5, background: '#1A1916', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
              <span style={{ display: 'block', width: 16, height: 1.5, background: '#1A1916', borderRadius: 2, transition: 'all 0.25s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: 16, height: 1.5, background: '#1A1916', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? 480 : 0,
          transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
          background: 'rgba(245,243,240,0.98)',
          backdropFilter: 'blur(24px)',
          borderTop: menuOpen ? '1px solid rgba(224,221,216,0.6)' : 'none',
        }}>
          <div className="container" style={{ paddingTop: 16, paddingBottom: 24, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                style={{ fontSize: 16, fontWeight: 500, color: '#6B6860', padding: '11px 14px', borderRadius: 12, textDecoration: 'none', letterSpacing: '-0.02em' }}>
                {link.label}
              </Link>
            ))}
            <div style={{ height: 1, background: 'rgba(224,221,216,0.6)', margin: '8px 0' }} />
            <Link href="#contact" onClick={() => setMenuOpen(false)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, padding: '12px 20px', borderRadius: 9999, background: '#1A1916', color: '#fff', textDecoration: 'none', alignSelf: 'flex-start', marginTop: 4 }}>
              Start a Project
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" /></svg>
            </Link>
          </div>
        </div>
      </nav>

      <style>{`
        @media (min-width: 1024px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile { display: none !important; }
        }
        @media (max-width: 1023px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}