'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function CTA() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.cta-box', { opacity: 0, y: 50, scale: 0.97 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.95, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true }
      })
      gsap.fromTo('.cta-el', { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true }
      })
    }
    init()
  }, [])

  return (
    <section ref={ref} style={{ background: '#F5F3F0', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
      <div className="container">
        <div className="cta-box" style={{
          opacity: 0, position: 'relative', background: '#1A1916',
          borderRadius: 28, overflow: 'hidden',
          padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(2rem, 5vw, 5rem)',
        }}>
          {/* Decorative bg */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -120, right: -60, width: 360, height: 360, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
            <div style={{ position: 'absolute', top: -40, right: 80, width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)' }} />
            <div style={{ position: 'absolute', bottom: -40, left: -40, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,98,45,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: 300, height: '100%', background: 'radial-gradient(ellipse at right center, rgba(74,144,194,0.08) 0%, transparent 60%)' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr auto', gap: 'clamp(2rem, 4vw, 4rem)', alignItems: 'center' }} className="cta-inner">

            <div>
              {/* Available badge */}
              <div className="cta-el" style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9999, padding: '7px 14px', marginBottom: '1.5rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', display: 'block', animation: 'ctaPulse 2s ease infinite' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>Available for new projects</span>
              </div>

              <h2 className="cta-el" style={{
                opacity: 0, fontFamily: 'var(--font-display)', fontWeight: 800,
                letterSpacing: '-0.05em', lineHeight: 1.0, color: '#fff',
                marginBottom: '1.25rem', fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
              }}>
                Ready to build something<br /><span style={{ color: '#C4622D' }}>extraordinary?</span>
              </h2>

              <p className="cta-el" style={{ opacity: 0, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: '2rem', maxWidth: 520, fontSize: 'clamp(13.5px, 1.5vw, 15.5px)' }}>
                Whether you need a full-stack application, a Shopify store, a WordPress site, or a complete brand identity — we're here to make it happen.
              </p>

              <div className="cta-el" style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <Link href="#contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 600,
                  padding: '12px 24px', borderRadius: 9999, background: '#C4622D', color: '#fff',
                  textDecoration: 'none', transition: 'all 0.2s',
                  boxShadow: '0 4px 16px rgba(196,98,45,0.35)',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(196,98,45,0.45)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(196,98,45,0.35)'; }}
                >
                  Start Your Project
                  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" />
                  </svg>
                </Link>
                <Link href="#services" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 500,
                  padding: '12px 24px', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.75)',
                  color: 'rgba(255,255,255,0.85)', textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
                >
                  Explore Services
                </Link>
              </div>

              <p className="cta-el" style={{ opacity: 0, fontSize: 14, color: 'rgba(255,255,255,0.72)', marginTop: '1.25rem', letterSpacing: '0.02em' }}>
                Free consultation · No commitment · Response within 24 hours
              </p>
            </div>

            {/* Right stats panel */}
            <div className="cta-stats cta-el" style={{ opacity: 0, display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
              {[
                { num: '140+', label: 'Projects Shipped', color: '#C4622D' },
                { num: '98%', label: 'Satisfaction Rate', color: '#4A90C2' },
                { num: '6+', label: 'Years Building', color: '#9AB84A' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '1.25rem 1.5rem', minWidth: 160, transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'}
                >
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.05em', color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.num}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize:11.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,7)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ctaPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        @media (max-width: 1024px) { .cta-stats { display: none !important; } .cta-inner { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}