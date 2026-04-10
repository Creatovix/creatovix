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

      // Header animation
      gsap.fromTo('.process-header-el', { opacity: 0, y: 28 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: true
        }
      })

      // STACKED CARDS EFFECT
      const cards = gsap.utils.toArray('.process-step')

      cards.forEach((card: any, i) => {
        gsap.to(card, {
          scale: 1 - (cards.length - i) * 0.04,
          y: -i * 50,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top center',
            end: 'bottom top',
            scrub: true,
          }
        })
      })
    }

    init()
  }, [])

  return (
    <section
      ref={ref}
      id="process"
      style={{
        background: '#1A1916',
        padding: 'clamp(4rem, 8vw, 8rem) 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.03,
        backgroundImage: 'radial-gradient(circle at 30% 50%, #C4622D 0%, transparent 60%), radial-gradient(circle at 70% 50%, #4A90C2 0%, transparent 60%)'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* HEADER */}
        <div className="process-hdr-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'flex-end',
          marginBottom: 'clamp(3rem, 6vw, 5rem)'
        }}>
          <div>
            <span className="process-header-el tag" style={{
              marginBottom: '1.25rem',
              display: 'inline-flex',
              opacity: 0,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.5)'
            }}>
              Our Process
            </span>

            <h2 className="process-header-el" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#fff',
              margin: 0,
              opacity: 0
            }}>
              From idea to<br />
              <span style={{ color: '#C4622D' }}>shipped product.</span>
            </h2>
          </div>

          <p className="process-header-el" style={{
            fontSize: 16,
            color: 'rgba(255,255,255)',
            lineHeight: 1.75,
            margin: 0,
            opacity: 0
          }}>
            Our proven 5-step process ensures every project is delivered on time, on budget, and beyond expectations.
          </p>
        </div>

        {/* STACKED CARDS */}
        <div
          className="process-steps"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem',
            minHeight: `${100}vh`
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="process-step"
              style={{
                position: 'sticky',
                top: '120px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                borderRadius: '20px',
                transformOrigin: 'top center',
                zIndex: steps.length - i,
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Number */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 18,
                color: step.color,
                marginBottom: 16,
                display: 'block'
              }}>
                {step.num}
              </span>

              {/* Icon */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: step.color + '18',
                border: `1.5px solid ${step.color}35`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                marginBottom: 16
              }}>
                {step.icon}
              </div>

              <h3 style={{
                fontSize: 20,
                color: '#fff',
                marginBottom: 10
              }}>
                {step.title}
              </h3>

              <p style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.64)',
                marginBottom: 16
              }}>
                {step.desc}
              </p>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: step.color + '20',
                border: `1px solid ${step.color}35`,
                borderRadius: 6,
                padding: '4px 10px'
              }}>
                <span style={{
                  fontSize: 13,
                  color: step.color
                }}>
                  {step.duration}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '4rem',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.65)' }}>
            Ready to start the journey?
          </p>

          <Link href="#contact" style={{
            padding: '12px 24px',
            borderRadius: 999,
            background: '#C4622D',
            color: '#fff',
            textDecoration: 'none'
          }}>
            Start Your Project →
          </Link>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-hdr-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}