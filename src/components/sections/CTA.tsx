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
      gsap.fromTo('.cta-box', { opacity: 0, y: 50, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } })
      gsap.fromTo('.cta-el', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true } })
    }
    init()
  }, [])

  return (
    <section ref={ref} className="section-tight" style={{ background: '#FAFAF8' }}>
      <div className="container">
        <div className="cta-box" style={{ opacity: 0, position: 'relative', background: '#1A1916', borderRadius: 32, overflow: 'hidden', padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 5rem)' }}>
          {/* Decorative rings */}
          <div style={{ position: 'absolute', top: -160, right: -80, width: 420, height: 420, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: -80, right: 0, width: 250, height: 250, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 256, height: 256, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,98,45,0.18) 0%, transparent 70%)', filter: 'blur(40px)', transform: 'translate(-30%, 30%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 680 }}>
            <div className="cta-el" style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 9999, padding: '8px 16px', marginBottom: '2rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', display: 'block', flexShrink: 0, animation: 'ctaPulse 2s ease infinite' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Available for new projects</span>
            </div>

            <h2 className="cta-el" style={{ opacity: 0, fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, color: '#fff', marginBottom: '1.25rem', fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              Ready to build something<br /><span style={{ color: '#C4622D' }}>extraordinary?</span>
            </h2>

            <p className="cta-el" style={{ opacity: 0, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: 560, fontSize: 'clamp(0.9rem, 1.4vw, 1.08rem)' }}>
              Whether you need a full-stack application, a stunning Shopify store, a WordPress site, or a complete brand identity — we are here to make it happen. Let's talk about your vision.
            </p>

            <div className="cta-el" style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <Link href="#contact" className="btn-warm">
                Start Your Project
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" /></svg>
              </Link>
              <Link href="#services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, padding: '0.875rem 1.5rem', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.16)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.16)'; }}>
                Explore Services
              </Link>
            </div>

            <p className="cta-el" style={{ opacity: 0, fontSize: 11.5, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.02em' }}>Free consultation · No commitment · Response within 24 hours</p>
          </div>

          {/* Right decorative stats */}
          <div style={{ position: 'absolute', right: 64, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, pointerEvents: 'none' }} className="cta-deco">
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '4rem', letterSpacing: '-0.05em', color: 'rgba(255,255,255,0.07)', lineHeight: 1 }}>140+</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', marginTop: 4 }}>Projects Shipped</p>
            </div>
            <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '4rem', letterSpacing: '-0.05em', color: 'rgba(255,255,255,0.07)', lineHeight: 1 }}>98%</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', marginTop: 4 }}>Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes ctaPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 1024px) { .cta-deco { display: none !important; } }
      `}</style>
    </section>
  )
}