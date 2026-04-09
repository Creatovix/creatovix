'use client'

import { useEffect, useRef } from 'react'

const row1 = [
  { name: 'React', icon: '⚛️' }, { name: 'Next.js', icon: '▲' }, { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' }, { name: 'Tailwind CSS', icon: '🌊' }, { name: 'GraphQL', icon: '◈' },
  { name: 'PostgreSQL', icon: '🐘' }, { name: 'MongoDB', icon: '🍃' }, { name: 'Redis', icon: '🔴' },
  { name: 'AWS', icon: '☁️' },
]

const row2 = [
  { name: 'Shopify', icon: '🛒' }, { name: 'WordPress', icon: '📝' }, { name: 'Figma', icon: '🎨' },
  { name: 'Docker', icon: '🐳' }, { name: 'Vercel', icon: '△' }, { name: 'Git', icon: '🔀' },
  { name: 'Stripe', icon: '💳' }, { name: 'Framer', icon: '✦' }, { name: 'GSAP', icon: '🔥' },
  { name: 'Sass', icon: '💅' },
]

export default function TechStack() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active') }),
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const Chip = ({ item }: { item: { name: string; icon: string } }) => (
    <div style={{
      flexShrink: 0, margin: '0 8px',
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 20px', background: '#fff',
      border: '1px solid #E8E6E1', borderRadius: 12,
      transition: 'all 0.2s', cursor: 'default',
      boxShadow: '0 1px 4px rgba(26,25,22,0.04)',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C4622D40'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(26,25,22,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E8E6E1'; (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(26,25,22,0.04)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
    >
      <span style={{ fontSize: 18 }}>{item.icon}</span>
      <span style={{ fontWeight: 600, fontSize: 13.5, color: '#4A4743', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{item.name}</span>
    </div>
  )

  return (
    <section ref={ref} className="reveal lg:mt-[-8vh] mt-[-5vh]" style={{ background: '#FAFAF8', padding: 'clamp(4rem, 8vw, 8rem) 0', overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
        <div style={{ textAlign: 'center' }}>
          <span className="tag" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>Tech Stack</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.0, fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1rem' }}>
            Powered by modern<br /><span style={{ color: '#C4622D' }}>technologies.</span>
          </h2>
          <p style={{ fontSize: 16.5, color: '#6B6860', maxWidth: 420, margin: '0 auto' }}>
            We work with the best tools available to deliver fast, scalable, maintainable digital products.
          </p>
        </div>
      </div>

      {/* Row 1 */}
      <div style={{ overflow: 'hidden', position: 'relative', marginBottom: 12 }}>
        {/* Fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #FAFAF8, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #FAFAF8, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 32s linear infinite', padding: '8px 0' }}>
          {[...row1, ...row1].map((item, i) => <Chip key={i} item={item} />)}
        </div>
      </div>

      {/* Row 2 (reverse) */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #FAFAF8, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #FAFAF8, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee-reverse 38s linear infinite', padding: '8px 0' }}>
          {[...row2, ...row2].map((item, i) => <Chip key={i} item={item} />)}
        </div>
      </div>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>
    </section>
  )
}