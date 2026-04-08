'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useHeroEntrance } from '@/sanity/lib/animations'

const badges = [
  { icon: '⚡', label: 'Full Stack Dev' },
  { icon: '🎨', label: 'Web Design' },
  { icon: '🛒', label: 'Shopify' },
  { icon: '📝', label: 'WordPress' },
  { icon: '✏️', label: 'Graphic Design' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  useHeroEntrance(ref)

  return (
    <section ref={ref} style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 112, paddingBottom: 64, position: 'relative', overflow: 'hidden', background: '#FAFAF8' }}>
      {/* Grid bg */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none', backgroundImage: 'linear-gradient(#E8E6E1 1px, transparent 1px), linear-gradient(90deg, #E8E6E1 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, #FAFAF8 100%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(3rem, 5vw, 5rem)', alignItems: 'center' }}>

          {/* Left */}
          <div style={{ maxWidth: 580 }}>
            <div className="tag hero-tag" style={{ marginBottom: '2rem', opacity: 0 }}>
              We build digital experiences ✦
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.05em', marginBottom: '1.5rem', fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
              <span className="hero-line" style={{ display: 'block', opacity: 0 }}>We Design.</span>
              <span className="hero-line" style={{ display: 'block', color: '#C4622D', opacity: 0 }}>We Build.</span>
              <span className="hero-line" style={{ display: 'block', opacity: 0 }}>We Deliver.</span>
            </h1>

            <p className="hero-sub" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', color: '#6B6860', lineHeight: 1.75, maxWidth: 480, marginBottom: '2rem', opacity: 0 }}>
              A full-service digital studio crafting high-performance websites, e-commerce stores, and brand identities that convert visitors into loyal customers.
            </p>

            <div className="hero-cta" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: '2.5rem', opacity: 0 }}>
              <Link href="#contact" className="btn-primary">
                Start a Project
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" /></svg>
              </Link>
              <Link href="#portfolio" className="btn-outline">View Our Work</Link>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {badges.map((b) => (
                <span key={b.label} className="hero-badge" style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 500, color: '#6B6860', background: '#fff', border: '1px solid #E8E6E1', borderRadius: 9999, padding: '6px 14px', cursor: 'default' }}>
                  <span>{b.icon}</span>{b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: visual cards — hidden on mobile */}
          <div style={{ position: 'relative', height: 460, display: 'block' }} className="hero-visual">
            {/* Browser card */}
            <div className="hero-card" style={{ opacity: 0, position: 'absolute', top: 0, right: 0, width: 300, background: '#fff', border: '1px solid #E8E6E1', borderRadius: 20, boxShadow: '0 12px 40px rgba(26,25,22,0.1)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: '#F4F3EF', borderBottom: '1px solid #E8E6E1' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', display: 'block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', display: 'block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840', display: 'block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9B9891', marginLeft: 4 }}>devcraft.io/project</span>
              </div>
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ height: 12, background: '#F4F3EF', borderRadius: 6, width: '55%' }} />
                <div style={{ height: 44, background: '#F4F3EF', borderRadius: 12 }} />
                <div style={{ height: 12, background: '#F4F3EF', borderRadius: 6, width: '40%' }} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, height: 36, background: '#1A1916', borderRadius: 9999 }} />
                  <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid #D1CEC7' }} />
                </div>
              </div>
            </div>

            {/* Stats card */}
            <div className="hero-card" style={{ opacity: 0, position: 'absolute', bottom: 80, left: 0, width: 175, background: '#1A1916', borderRadius: 20, padding: 20, boxShadow: '0 12px 40px rgba(26,25,22,0.2)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.05em', color: '#fff', lineHeight: 1, marginBottom: 4 }}>140+</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 14 }}>Projects Shipped</p>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.12)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '75%', background: '#C4622D', borderRadius: 2 }} />
              </div>
            </div>

            {/* Satisfaction card */}
            <div className="hero-card" style={{ opacity: 0, position: 'absolute', bottom: 0, right: 20, background: '#fff', border: '1px solid #E8E6E1', borderRadius: 20, padding: '12px 16px', boxShadow: '0 4px 16px rgba(26,25,22,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex' }}>
                {['#C4622D', '#3A7FBD', '#8CB33A', '#6B5CE7'].map((c, i) => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: '2px solid #fff', marginLeft: i > 0 ? -8 : 0 }} />
                ))}
              </div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#1A1916', whiteSpace: 'nowrap' }}>98% Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9891' }}>Scroll</span>
        <div style={{ width: 40, height: 1, background: '#D1CEC7', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, height: '100%', width: '100%', background: '#1A1916', animation: 'scrollLine 2s ease infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine { 0% { left: -100%; } 100% { left: 100%; } }
        @media (max-width: 900px) { .hero-visual { display: none !important; } }
      `}</style>
    </section>
  )
}