'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useHeroEntrance } from '@/sanity/lib/animations' // Assuming this exists from your previous code

// --- Data for the image accordion ---
const accordionItems = [
  {
    id: 1,
    title: 'Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Development',
    imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'E-Commerce',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Branding',
    imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
  },
]

const badges = [
  { icon: '⚡', label: 'Full Stack Dev' },
  { icon: '🎨', label: 'Web Design' },
  { icon: '🛒', label: 'Shopify' },
  { icon: '📝', label: 'WordPress' },
  { icon: '✏️', label: 'Graphic Design' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  // Ensure useHeroEntrance handles the new structure or remove if causing issues
  useHeroEntrance(ref)
  
  const [activeIndex, setActiveIndex] = useState(0)

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
      {/* Background texture - Preserved from original */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(196,98,45,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(74,144,194,0.07) 0%, transparent 50%)',
      }} />
      {/* Grid pattern - Preserved from original */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.3,
        backgroundImage: 'linear-gradient(rgba(26,25,22,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,25,22,0.06) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div 
          className="hero-grid"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1.2fr', // Gave slightly more space to the visual side
            alignItems: 'center' 
          }}
        >

          {/* Left Side: Content */}
          <div style={{ maxWidth: 600 }}>
            <div className="hero-tag" style={{
              opacity: 0, display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fff', border: '1px solid #E0DDD8', borderRadius: 9999,
              padding: '8px 16px', marginBottom: 'clamp(1.25rem, 3vw, 2rem)',
              boxShadow: '0 2px 8px rgba(26,25,22,0.05)',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ADE80', display: 'block', animation: 'heroPulse 2.5s ease infinite' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6860' }}>Available for new projects</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 'clamp(1.25rem, 3vw, 1.75rem)', fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
              <span className="hero-line" style={{ opacity: 0, display: 'block', color: '#1A1916' }}>We Design.</span>
              <span className="hero-line" style={{ opacity: 0, display: 'block', color: '#C4622D' }}>We Build.</span>
              <span className="hero-line" style={{ opacity: 0, display: 'block', color: '#1A1916' }}>We Deliver.</span>
            </h1>

            <p className="hero-sub" style={{
              opacity: 0, fontSize: 'clamp(15px, 1.8vw, 17px)', color: '#6B6860',
              lineHeight: 1.75, marginBottom: 'clamp(1.75rem, 4vw, 2.5rem)', maxWidth: 480,
            }}>
              A full-service digital studio crafting high-performance websites, e-commerce stores, and brand identities that convert visitors into loyal customers.
            </p>

            <div className="hero-cta" style={{ opacity: 0, display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              <Link href="#contact" className="btn-primary">
                Start a Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="#portfolio" className="btn-outline">View Our Work</Link>
            </div>

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

          {/* Right Side: Interactive Accordion */}
          <div className="hero-visual xl:max-w-full lg:max-w-[70%] lg:ml-auto md:w-full w-[90vw]" style={{ position: 'relative', height: 520, }}>
             <div className="flex flex-row items-center justify-center gap-3 h-full w-full">
              {accordionItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`
                    relative xl:h-[550px] h-[450px] rounded-2xl overflow-hidden cursor-pointer
                    transition-all duration-700 ease-in-out border border-[#E0DDD8]
                    ${index === activeIndex ? 'w-[300px]' : 'w-[60px]'}
                  `}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {/* Background Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out"
                    style={{ transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)' }}
                  />
                  
                  {/* Dark overlay - stronger when inactive to fade out details, lighter when active */}
                  <div 
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ backgroundColor: '#1A1916', opacity: index === activeIndex ? 0.3 : 0.6 }}
                  ></div>

                  {/* Caption Text */}
                  <span
                    className={`
                      absolute text-white font-semibold whitespace-nowrap
                      transition-all duration-500 ease-in-out
                    `}
                    style={{
                        // Active state: Horizontal, bottom-center
                        ...(index === activeIndex ? {
                            bottom: '24px',
                            left: '50%',
                            transform: 'translateX(-50%) rotate(0deg)',
                            fontSize: '1.125rem', // text-lg
                        } : {
                            // Inactive state: Vertical, centered vertically but rotated
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%) rotate(-90deg)',
                            fontSize: '0.875rem', // text-sm
                            opacity: 0.7
                        })
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              ))}
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