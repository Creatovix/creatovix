'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const steps = [
  {
    num: '01', icon: '🔍',
    title: 'Discovery & Strategy',
    desc: 'We deeply understand your business, goals, target audience, and competition before writing a single line of code.',
    duration: '1–2 days',
    color: '#C4622D',
  },
  {
    num: '02', icon: '🎨',
    title: 'Design & Prototyping',
    desc: 'Wireframes and high-fidelity mockups crafted in Figma, reviewed together until every detail is approved.',
    duration: '3–7 days',
    color: '#4A90C2',
  },
  {
    num: '03', icon: '⚙️',
    title: 'Development',
    desc: 'Clean, scalable code built with daily progress updates so you always know where things stand.',
    duration: '1–4 weeks',
    color: '#9AB84A',
  },
  {
    num: '04', icon: '✅',
    title: 'Review & Refine',
    desc: 'Rigorous testing across devices and browsers, with rounds of iteration until everything is polished.',
    duration: '3–5 days',
    color: '#7B6CE8',
  },
  {
    num: '05', icon: '🚀',
    title: 'Launch & Support',
    desc: 'Smooth deployment, performance monitoring, and ongoing support to keep everything running perfectly.',
    duration: 'Ongoing',
    color: '#2DAE85',
  },
]

export default function Process() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo('.process-header-el', { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true }
      })
      gsap.fromTo('.process-step', { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '.process-steps', start: 'top 75%', once: true }
      })
    }
    init()
  }, [])

  return (
    <section ref={ref} id="process" style={{ background: '#1A1916', padding: 'clamp(4rem, 8vw, 8rem) 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', opacity: 0.03, backgroundImage: 'radial-gradient(circle at 30% 50%, #C4622D 0%, transparent 60%), radial-gradient(circle at 70% 50%, #4A90C2 0%, transparent 60%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'flex-end', marginBottom: 'clamp(3rem, 6vw, 5rem)' }} className="process-hdr-grid">
          <div>
            <span className="process-header-el tag" style={{ marginBottom: '1.25rem', display: 'inline-flex', opacity: 0, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}>Our Process</span>
            <h2 className="process-header-el" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.0, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#fff', margin: 0, opacity: 0 }}>
              From idea to<br /><span style={{ color: '#C4622D' }}>shipped product.</span>
            </h2>
          </div>
          <p className="process-header-el" style={{ fontSize: 16, color: 'rgba(255,255,255)', lineHeight: 1.75, margin: 0, opacity: 0 }}>
            Our proven 5-step process ensures every project is delivered on time, on budget, and beyond expectations — with full transparency throughout.
          </p>
        </div>

        {/* Steps */}
        <div className="process-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, position: 'relative' }}>
          {steps.map((step, i) => (
            <div key={i} className="process-step" style={{
              opacity: 0,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: 'clamp(1.5rem, 2.5vw, 2rem)',
              position: 'relative',
              transition: 'all 0.3s ease',
              borderRadius: i === 0 ? '20px 0 0 20px' : i === 4 ? '0 20px 20px 0' : 0,
              cursor: 'default',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = `${step.color}14`;
                (e.currentTarget as HTMLElement).style.borderColor = `${step.color}40`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
              }}
            >
              {/* Step number */}
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500,
                color: step.color, letterSpacing: '0.08em', display: 'block', marginBottom: 16,
              }}>{step.num}</span>

              {/* Icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: step.color + '18', border: `1.5px solid ${step.color}35`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, marginBottom: 16,
              }}>
                {step.icon}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700,
                letterSpacing: '-0.03em', color: '#fff', marginBottom: 10, lineHeight: 1.35,
              }}>{step.title}</h3>

              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.64)', lineHeight: 1.65, marginBottom: 16 }}>
                {step.desc}
              </p>

              {/* Duration pill */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                background: step.color + '20', border: `1px solid ${step.color}35`,
                borderRadius: 6, padding: '4px 10px',
              }}>
                <svg width="10" height="10" fill="none" stroke={step.color} viewBox="0 0 24 24" strokeWidth={2.5}>
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" strokeLinecap="round" />
                </svg>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: step.color, letterSpacing: '0.04em' }}>{step.duration}</span>
              </div>

              {/* Connector arrow (except last) */}
              {i < 4 && (
                <div style={{
                  position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)',
                  zIndex: 10, width: 22, height: 22, background: '#1A1916',
                  border: `1px solid rgba(255,255,255,0.12)`, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }} className="process-arrow">
                  <svg width="8" height="8" fill="none" stroke="rgba(255,255,255,0.4)" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', letterSpacing: '-0.01em' }}>
            Ready to start the journey? → We typically onboard new clients within 48 hours.
          </p>
          <Link href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600,
            padding: '11px 24px', borderRadius: 9999, background: '#C4622D', color: '#fff',
            textDecoration: 'none', transition: 'all 0.2s',
            boxShadow: '0 4px 16px rgba(196,98,45,0.3)',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(196,98,45,0.4)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(196,98,45,0.3)'; }}
          >
            Start Your Project
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .process-steps { grid-template-columns: 1fr 1fr !important; border-radius: 16px !important; } .process-arrow { display: none !important; } }
        @media (max-width: 640px) { .process-steps { grid-template-columns: 1fr !important; } .process-hdr-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}