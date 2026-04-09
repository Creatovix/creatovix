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

const floatingStats = [
  { value: '140+', label: 'Projects Shipped', color: '#C4622D' },
  { value: '98%', label: 'Satisfaction Rate', color: '#4A90C2' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  useHeroEntrance(ref)

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(6rem, 10vw, 8rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6rem)',
        overflow: 'hidden',
        background: '#F5F3F0',
      }}
    >
      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(196,98,45,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(74,144,194,0.07) 0%, transparent 50%)',
      }} />
      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.3,
        backgroundImage: 'linear-gradient(rgba(26,25,22,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,25,22,0.06) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'center' }} className="hero-grid">

          {/* Left */}
          <div style={{ maxWidth: 600 }}>
            {/* Pill badge */}
            <div className="hero-tag" style={{
              opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fff', border: '1px solid #E0DDD8', borderRadius: 9999,
              padding: '8px 16px', marginBottom: 'clamp(1.25rem, 3vw, 2rem)',
              boxShadow: '0 2px 8px rgba(26,25,22,0.05)',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ADE80', display: 'block', animation: 'heroPulse 2.5s ease infinite' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6860' }}>Available for new projects</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 'clamp(1.25rem, 3vw, 1.75rem)', fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
              <span className="hero-line" style={{ opacity: 0, display: 'block', color: '#1A1916' }}>We Design.</span>
              <span className="hero-line" style={{ opacity: 0, display: 'block', color: '#C4622D' }}>We Build.</span>
              <span className="hero-line" style={{ opacity: 0, display: 'block', color: '#1A1916' }}>We Deliver.</span>
            </h1>

            {/* Sub */}
            <p className="hero-sub" style={{
              opacity: 0, fontSize: 'clamp(15px, 1.8vw, 17px)', color: '#6B6860',
              lineHeight: 1.75, marginBottom: 'clamp(1.75rem, 4vw, 2.5rem)', maxWidth: 480,
            }}>
              A full-service digital studio crafting high-performance websites, e-commerce stores, and brand identities that convert visitors into loyal customers.
            </p>

            {/* CTAs */}
            <div className="hero-cta" style={{ opacity: 0, display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              <Link href="#contact" className="btn-primary">
                Start a Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="#portfolio" className="btn-outline">View Our Work</Link>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {badges.map((b) => (
                <span key={b.label} className="hero-badge" style={{
                  opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', background: '#fff', border: '1px solid #E0DDD8',
                  borderRadius: 9999, fontSize: 12.5, fontWeight: 500, color: '#6B6860',
                  transition: 'all 0.2s', cursor: 'default',
                  boxShadow: '0 1px 4px rgba(26,25,22,0.04)',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C4622D'; (e.currentTarget as HTMLElement).style.color = '#C4622D'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E0DDD8'; (e.currentTarget as HTMLElement).style.color = '#6B6860'; }}
                >
                  <span style={{ fontSize: 14 }}>{b.icon}</span>{b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Visual Cards */}
          <div className="hero-visual" style={{ position: 'relative', height: 520, display: 'none' }}>

            {/* Main browser card */}
            <div className="hero-card" style={{
              opacity: 0, position: 'absolute', top: 20, right: 0, width: 340,
              background: '#fff', borderRadius: 24, border: '1px solid #E0DDD8',
              boxShadow: '0 20px 60px rgba(26,25,22,0.1)', overflow: 'hidden',
            }}>
              {/* Browser chrome */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: '#F5F3F0', borderBottom: '1px solid #E0DDD8' }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  {['#F87171', '#FBBF24', '#34D399'].map((c, i) => (
                    <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div style={{ flex: 1, background: '#fff', borderRadius: 6, padding: '4px 10px', border: '1px solid #E0DDD8' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9B9891' }}>codecraft.com/project</span>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <img
                  src="https://placehold.co/600x350/F5F3F0/2D2A26?text=✦+Modern+Website"
                  alt="Project Preview"
                  style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 14, marginBottom: 12 }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ height: 10, background: '#F0EDE8', borderRadius: 5, width: '80%' }} />
                  <div style={{ height: 10, background: '#F0EDE8', borderRadius: 5, width: '60%' }} />
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <div style={{ flex: 1, height: 36, background: '#1A1916', borderRadius: 9999 }} />
                  <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #E0DDD8' }} />
                </div>
              </div>
            </div>

            {/* Stats card - dark */}
            <div className="hero-card" style={{
              opacity: 0, position: 'absolute', bottom: 100, left: -10, width: 200,
              background: '#1A1916', borderRadius: 20,
              boxShadow: '0 16px 48px rgba(26,25,22,0.2)', padding: '24px 20px',
            }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', letterSpacing: '-0.05em', color: '#fff', lineHeight: 1, marginBottom: 6 }}>140+</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 14, fontWeight: 500 }}>Projects Shipped</p>
              <div style={{ height: 5, background: 'rgba(255,255,255,0.12)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '75%', background: '#C4622D', borderRadius: 3 }} />
              </div>
            </div>

            {/* Satisfaction pill */}
            <div className="hero-card" style={{
              opacity: 0, position: 'absolute', bottom: 30, right: 20,
              background: '#fff', borderRadius: 16, border: '1px solid #E0DDD8',
              boxShadow: '0 8px 28px rgba(26,25,22,0.08)', padding: '14px 18px',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ display: 'flex' }}>
                {['#C4622D', '#4A90C2', '#9AB84A', '#7B6CE8'].map((c, i) => (
                  <div key={i} style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: c, border: '2.5px solid #fff',
                    marginLeft: i > 0 ? -8 : 0, zIndex: 4 - i,
                  }} />
                ))}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 13, color: '#1A1916', lineHeight: 1.2 }}>98% Satisfied</p>
                <p style={{ fontSize: 11, color: '#9B9891' }}>140+ happy clients</p>
              </div>
            </div>

            {/* Tech pill */}
            <div className="hero-card" style={{
              opacity: 0, position: 'absolute', top: 0, left: 20,
              background: '#fff', borderRadius: 14, border: '1px solid #E0DDD8',
              boxShadow: '0 4px 16px rgba(26,25,22,0.06)', padding: '10px 16px',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 18 }}>⚡</span>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#1A1916', lineHeight: 1.2 }}>Fast Delivery</p>
                <p style={{ fontSize: 10, color: '#9B9891' }}>1–4 week turnaround</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.5,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9B9891' }}>Scroll</span>
        <div style={{ width: 22, height: 38, border: '1.5px solid #C9C6C1', borderRadius: 11, display: 'flex', justifyContent: 'center', padding: 4 }}>
          <div style={{ width: 3, height: 8, background: '#9B9891', borderRadius: 2, animation: 'scrollBob 1.8s ease infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes heroPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
        @keyframes scrollBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        @media (min-width: 900px) { .hero-visual { display: block !important; } }
        @media (max-width: 899px) { .hero-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}