'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const categories = ['All', 'Full Stack', 'Shopify', 'WordPress', 'Design']

const projects = [
  { 
    num: '01', 
    title: 'Luxe Commerce Store', 
    category: 'Shopify', 
    tags: ['Shopify', 'Liquid', 'Custom Theme'], 
    desc: 'High-converting fashion e-commerce with 3× revenue growth.',
    image: 'https://placehold.co/800x600/F5F3F0/D4703A?text=Luxe+Store',
    color: '#D4703A'
  },
  { 
    num: '02', 
    title: 'SaaS Analytics Dashboard', 
    category: 'Full Stack', 
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'], 
    desc: 'Real-time analytics platform serving 10k+ daily users.',
    image: 'https://placehold.co/800x600/F5F3F0/4A90C2?text=Analytics',
    color: '#4A90C2'
  },
  { 
    num: '03', 
    title: 'Healthcare Brand Identity', 
    category: 'Design', 
    tags: ['Branding', 'Logo', 'Print'], 
    desc: 'Complete brand identity system for modern healthcare.',
    image: 'https://placehold.co/800x600/F5F3F0/7B6CE8?text=Healthcare',
    color: '#7B6CE8'
  },
  { 
    num: '04', 
    title: 'Real Estate Platform', 
    category: 'WordPress', 
    tags: ['WordPress', 'WooCommerce', 'ACF'], 
    desc: 'Property listing platform with advanced search.',
    image: 'https://placehold.co/800x600/F5F3F0/9AB84A?text=Real+Estate',
    color: '#9AB84A'
  },
  { 
    num: '05', 
    title: 'Restaurant Ordering App', 
    category: 'Full Stack', 
    tags: ['React', 'Node.js', 'Stripe'], 
    desc: 'Full-stack online ordering with real-time dashboard.',
    image: 'https://placehold.co/800x600/F5F3F0/E84E9C?text=Restaurant',
    color: '#E84E9C'
  },
  { 
    num: '06', 
    title: 'Wellness Subscription Store', 
    category: 'Shopify', 
    tags: ['Shopify', 'Custom App', 'Subscriptions'], 
    desc: 'Subscription-based wellness store with 4.9★ rating.',
    image: 'https://placehold.co/800x600/F5F3F0/2DAE85?text=Wellness',
    color: '#2DAE85'
  },
]

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = ref.current?.querySelectorAll('.portfolio-card')
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [active])

  return (
    <section ref={ref} id="portfolio" className="section bg-bg">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-12">
          <div>
            <span className="tag mb-4">Our Work</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Projects we're<br />proud of.
            </h2>
          </div>
          <p className="text-lg text-ink-secondary">
            A curated selection across industries. Every build starts with strategy and ends with measurable results.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                active === cat
                  ? 'bg-ink text-white shadow-lg'
                  : 'bg-bg-surface border border-border text-ink-secondary hover:border-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div key={i} className="portfolio-card card reveal group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span 
                  className="absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: p.color }}
                >
                  {p.category}
                </span>
                <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Link href="#contact" className="btn-primary w-full justify-center">
                    View Project
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <p className="font-display font-bold text-5xl text-border mb-3">{p.num}</p>
                <h3 className="font-display font-bold text-xl mb-2">{p.title}</h3>
                <p className="text-ink-secondary text-sm mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-bg-alt border border-border rounded-full text-xs text-ink-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="#contact" className="btn-outline inline-flex">
            Discuss Your Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}