'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      if (navRef.current) {
        gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 })
      }
    }
    init()
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s ease',
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'rgba(250,250,248,0.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #E8E6E1' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, background: '#1A1916', color: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 800, letterSpacing: '-0.02em' }}>
            DC
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, letterSpacing: '-0.03em', color: '#1A1916' }}>
            DevCraft<span style={{ color: '#C4622D' }}>Studio</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none', margin: 0, padding: 0 }} className="hidden-mobile">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} style={{ fontSize: 14, fontWeight: 500, color: '#6B6860', padding: '8px 14px', borderRadius: 9999, textDecoration: 'none', transition: 'all 0.2s', display: 'block' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = '#1A1916'; (e.target as HTMLElement).style.background = '#F4F3EF'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = '#6B6860'; (e.target as HTMLElement).style.background = 'transparent'; }}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Burger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="#contact" className="btn-primary hidden-mobile">Start a Project</Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile"
            style={{ width: 36, height: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, border: '1px solid #E8E6E1', borderRadius: 8, background: 'transparent', cursor: 'pointer' }}
            aria-label="Toggle menu"
          >
            <span style={{ display: 'block', width: 16, height: 1.5, background: '#1A1916', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 16, height: 1.5, background: '#1A1916', borderRadius: 2, transition: 'all 0.25s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 16, height: 1.5, background: '#1A1916', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div style={{ overflow: 'hidden', maxHeight: menuOpen ? 400 : 0, transition: 'max-height 0.35s ease', borderTop: menuOpen ? '1px solid #E8E6E1' : 'none', background: 'rgba(250,250,248,0.98)' }}>
        <div className="container" style={{ paddingTop: 12, paddingBottom: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ fontSize: 16, fontWeight: 500, color: '#6B6860', padding: '10px 12px', borderRadius: 12, textDecoration: 'none' }}>
              {link.label}
            </Link>
          ))}
          <Link href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ marginTop: 8, alignSelf: 'flex-start' }}>
            Start a Project
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 1023px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </nav>
  )
}