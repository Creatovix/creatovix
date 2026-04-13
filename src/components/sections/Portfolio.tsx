'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { getPortfolioSection, resolveImageUrl } from '@/sanity/lib/queries'
import type { SanityProject } from '@/sanity/lib/queries'

// ─── Hardcoded Fallback Data ──────────────────────────────────────────────────
// Shown when Sanity has no portfolioSection document yet.

const FALLBACK_SECTION = {
  sectionTag: 'Our Work',
  heading: "Projects we're\nproud of.",
  subheading:
    'A curated selection across industries. Every build starts with strategy and ends with measurable results.',
}

const FALLBACK_PROJECTS = [
  {
    num: '01', title: 'Luxe Commerce Store', category: 'Shopify',
    tags: ['Shopify', 'Liquid', 'Custom Theme'],
    desc: 'High-converting fashion e-commerce with 3× revenue growth.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    color: '#C4622D', result: '3× Revenue', caseStudyUrl: '#contact',
  },
  {
    num: '02', title: 'SaaS Analytics Dashboard', category: 'Full Stack',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    desc: 'Real-time analytics platform serving 10k+ daily active users.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    color: '#4A90C2', result: '10k+ DAU', caseStudyUrl: '#contact',
  },
  {
    num: '03', title: 'Healthcare Brand Identity', category: 'Design',
    tags: ['Branding', 'Logo', 'Print'],
    desc: 'Complete brand identity system for a modern healthcare provider.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    color: '#7B6CE8', result: 'Full Rebrand', caseStudyUrl: '#contact',
  },
  {
    num: '04', title: 'Real Estate Platform', category: 'WordPress',
    tags: ['WordPress', 'WooCommerce', 'ACF'],
    desc: 'Property listing platform with advanced search and CRM sync.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    color: '#9AB84A', result: '+60% Leads', caseStudyUrl: '#contact',
  },
  {
    num: '05', title: 'Restaurant Ordering App', category: 'Full Stack',
    tags: ['React', 'Node.js', 'Stripe'],
    desc: 'Full-stack online ordering with real-time kitchen dashboard.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    color: '#E84E9C', result: '$1.2M Orders', caseStudyUrl: '#contact',
  },
  {
    num: '06', title: 'Wellness Subscription Store', category: 'Shopify',
    tags: ['Shopify', 'Custom App', 'Subscriptions'],
    desc: 'Subscription-based wellness store with 4.9★ rating.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop',
    color: '#2DAE85', result: '4.9★ Rating', caseStudyUrl: '#contact',
  },
]

// ─── Normalised project type used inside this component ─────────────────────
interface NormalizedProject {
  num: string
  title: string
  category: string
  tags: string[]
  desc: string
  image: string
  color: string
  result: string
  caseStudyUrl: string
}

function normalizeSanityProject(p: SanityProject): NormalizedProject {
  return {
    num: p.num,
    title: p.title,
    category: p.category,
    tags: p.tags ?? [],
    desc: p.description,
    image: resolveImageUrl(p.image, 800, 600),
    color: p.color ?? '#C4622D',
    result: p.result,
    caseStudyUrl: p.caseStudyUrl || '#contact',
  }
}

// Derive unique category filters from the active project list
function buildCategories(projects: NormalizedProject[]): string[] {
  const cats = Array.from(new Set(projects.map((p) => p.category)))
  return ['All', ...cats]
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState('All')

  // Sanity data state
  const [section, setSection] = useState(FALLBACK_SECTION)
  const [projects, setProjects] = useState<NormalizedProject[]>(FALLBACK_PROJECTS)
  const [categories, setCategories] = useState(() => buildCategories(FALLBACK_PROJECTS))
  const [dataSource, setDataSource] = useState<'fallback' | 'sanity'>('fallback')

  // Fetch from Sanity on mount
  useEffect(() => {
    getPortfolioSection().then((data) => {
      if (!data) {
        console.info('[Portfolio] No Sanity data found, using fallback content.')
        return
      }
      const normalized = data.projects.map(normalizeSanityProject)
      setSection({
        sectionTag: data.sectionTag || FALLBACK_SECTION.sectionTag,
        heading: data.heading || FALLBACK_SECTION.heading,
        subheading: data.subheading || FALLBACK_SECTION.subheading,
      })
      setProjects(normalized)
      setCategories(buildCategories(normalized))
      setDataSource('sanity')
      console.info('[Portfolio] Loaded from Sanity CMS.')
    })
  }, [])

  // Reset active filter to 'All' when project list changes
  useEffect(() => { setActive('All') }, [projects])

  // GSAP header animation
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo(
        '.portfolio-header-el',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
        }
      )
    }
    init()
  }, [])

  // Animate cards on filter change
  useEffect(() => {
    const items = document.querySelectorAll('.port-card')
    items.forEach((el, i) => {
      const elem = el as HTMLElement
      elem.style.opacity = '0'
      elem.style.transform = 'translateY(24px)'
      setTimeout(() => {
        elem.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
        elem.style.opacity = '1'
        elem.style.transform = 'translateY(0)'
      }, i * 80)
    })
  }, [active])

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)
  const headingLines = section.heading.split('\n')

  return (
    <section ref={ref} id="portfolio" style={{ background: '#F5F3F0', padding: 'clamp(4rem, 8vw, 8rem) 0' }}>
      <div className="container">

        {/* Dev indicator — remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div
            style={{
              position: 'fixed', bottom: 52, right: 16, zIndex: 9999,
              padding: '4px 12px',
              background: dataSource === 'sanity' ? '#2DAE85' : '#C4622D',
              color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 700,
              letterSpacing: '0.06em', pointerEvents: 'none',
            }}
          >
            PORTFOLIO: {dataSource.toUpperCase()}
          </div>
        )}

        {/* Header */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(1.5rem, 4vw, 4rem)', alignItems: 'flex-end', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
          className="port-header-grid"
        >
          <div>
            <span className="tag portfolio-header-el" style={{ marginBottom: '1.25rem', display: 'inline-flex', opacity: 0 }}>
              {section.sectionTag}
            </span>
            <h2
              className="portfolio-header-el"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1.0, fontSize: 'clamp(2rem, 4vw, 3.5rem)', margin: 0, opacity: 0 }}
            >
              {headingLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headingLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>
          <p
            className="portfolio-header-el"
            style={{ fontSize: 16, color: '#6B6860', lineHeight: 1.75, opacity: 0, margin: 0 }}
          >
            {section.subheading}
          </p>
        </div>

        {/* Filters — generated dynamically from the active project list */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: '8px 20px', borderRadius: 9999, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.22s',
                background: active === cat ? '#1A1916' : '#fff',
                color: active === cat ? '#fff' : '#6B6860',
                border: active === cat ? '1px solid #1A1916' : '1px solid #E0DDD8',
                letterSpacing: '-0.01em',
                boxShadow: active === cat ? '0 4px 12px rgba(26,25,22,0.18)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(1rem, 2vw, 1.5rem)' }}
          className="port-grid"
        >
          {filtered.map((p) => (
            <div
              key={p.num + active}
              className="port-card"
              style={{
                background: '#fff', borderRadius: 20, border: '1px solid #E8E6E1',
                overflow: 'hidden', transition: 'all 0.38s cubic-bezier(0.4,0,0.2,1)',
                cursor: 'default', position: 'relative',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-8px)'
                el.style.boxShadow = '0 20px 60px rgba(26,25,22,0.12)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'none'
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.15) 0%, transparent 50%)' }} />
                <div style={{
                  position: 'absolute', top: 14, left: 14,
                  background: p.color, color: '#fff',
                  padding: '5px 12px', borderRadius: 9999, fontSize: 11.5, fontWeight: 700,
                  letterSpacing: '-0.01em', boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}>
                  {p.result}
                </div>
                <div style={{
                  position: 'absolute', top: 14, right: 14,
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
                  color: '#6B6860', padding: '5px 12px', borderRadius: 9999,
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', fontFamily: 'var(--font-mono)',
                }}>
                  {p.category}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: '#C4622D', letterSpacing: '0.06em' }}>{p.num}</span>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: p.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
                  </div>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.03em', color: '#1A1916', marginBottom: 8, lineHeight: 1.3 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 15, color: '#6B6860', lineHeight: 1.65, marginBottom: 14 }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {p.tags.map((tag) => (
                    <span key={tag} style={{ padding: '3px 9px', background: '#F4F3EF', border: '1px solid #E8E6E1', borderRadius: 5, fontSize: 12, color: '#6B6860', fontFamily: 'var(--font-mono)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={p.caseStudyUrl}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: p.color, textDecoration: 'none', transition: 'gap 0.2s', letterSpacing: '-0.01em' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = '10px' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = '6px' }}
                >
                  View Case Study
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <Link href="#contact" className="btn-outline">
            Discuss Your Project
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .port-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .port-grid { grid-template-columns: 1fr !important; } .port-header-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}