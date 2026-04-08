'use client'

import { useEffect, useRef } from 'react'

const steps = [
  { 
    num: '01', 
    title: 'Discovery & Strategy', 
    desc: 'We deeply understand your business, goals, and competition.', 
    duration: '1–2 days',
    icon: '🔍'
  },
  { 
    num: '02', 
    title: 'Design & Prototyping', 
    desc: 'Wireframes and high-fidelity mockups for your approval.', 
    duration: '3–7 days',
    icon: '🎨'
  },
  { 
    num: '03', 
    title: 'Development', 
    desc: 'Clean, scalable code with daily updates.', 
    duration: '1–4 weeks',
    icon: '⚙️'
  },
  { 
    num: '04', 
    title: 'Review & Refine', 
    desc: 'Rigorous testing and iteration until perfect.', 
    duration: '3–5 days',
    icon: '✨'
  },
  { 
    num: '05', 
    title: 'Launch & Support', 
    desc: 'Deployment, monitoring, and ongoing support.', 
    duration: 'Ongoing',
    icon: '🚀'
  },
]

export default function Process() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('active')
            }, index * 100)
          }
        })
      },
      { threshold: 0.2 }
    )

    const items = ref.current?.querySelectorAll('.timeline-item')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="section bg-bg my-[-15vh]">
      <div className="container">
        <div className="section-header">
          <span className="tag mb-4">Our Process</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            How we go from idea<br />to <span className="text-accent-warm">shipped product.</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-warm via-accent-sky to-accent-lime md:-translate-x-1/2" />

          {steps.map((step, i) => (
            <div 
              key={i} 
              className={`timeline-item reveal relative flex flex-col md:flex-row gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Content */}
              <div className="flex-1 md:text-right pl-20 md:pl-0 md:pr-12">
                <div className="bg-bg-surface border border-border-soft rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-3 md:justify-end">
                    <span className="text-3xl">{step.icon}</span>
                    <span className="font-mono text-sm text-ink-tertiary">{step.duration}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-ink-secondary">{step.desc}</p>
                </div>
              </div>

              {/* Center Node */}
              <div className="absolute left-8 md:left-1/2 top-6 w-12 h-12 bg-bg-surface border-4 border-accent-warm rounded-full flex items-center justify-center shadow-lg md:-translate-x-1/2 z-10">
                <span className="font-display font-bold text-sm text-ink">{step.num}</span>
              </div>

              {/* Spacer for alternating layout */}
              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}