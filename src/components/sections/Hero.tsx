'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useHeroEntrance } from '@/sanity/lib/animations'

const badges = [
  { icon: '⚡', label: 'Full Stack Dev' },
  { icon: '🎨', label: 'Web Design' },
  { icon: '🛒', label: 'Shopify' },
  { icon: '📝', label: 'WordPress' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  useHeroEntrance(ref)

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-gradient-to-b from-bg-soft via-bg to-bg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-warm/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-sky/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="tag hero-tag mb-8 opacity-0">
              <span className="w-2 h-2 rounded-full bg-accent-warm animate-pulse" />
              We build digital experiences
            </div>

            <h1 className="font-display font-extrabold leading-tight tracking-tight mb-6 text-5xl md:text-6xl lg:text-7xl">
              <span className="hero-line block opacity-0">We Design.</span>
              <span className="hero-line block text-accent-warm opacity-0">We Build.</span>
              <span className="hero-line block opacity-0">We Deliver.</span>
            </h1>

            <p className="hero-sub text-lg text-ink-secondary leading-relaxed mb-8 max-w-xl opacity-0">
              A full-service digital studio crafting high-performance websites, e-commerce stores, and brand identities that convert visitors into loyal customers.
            </p>

            <div className="hero-cta flex flex-wrap gap-4 mb-10 opacity-0">
              <Link href="#contact" className="btn-primary">
                Start a Project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="#portfolio" className="btn-outline">View Our Work</Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {badges.map((b) => (
                <span key={b.label} className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-bg-surface border border-border-soft rounded-full text-sm font-medium text-ink-secondary opacity-0 hover:border-accent-warm/50 hover:shadow-md transition-all cursor-default">
                  <span>{b.icon}</span>{b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            {/* Main Browser Window */}
            <div className="hero-card absolute top-0 right-0 w-96 bg-bg-surface rounded-3xl shadow-2xl border border-border overflow-hidden opacity-0">
              <div className="flex items-center gap-2 px-4 py-3 bg-bg-alt border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-ink-tertiary font-mono">devcraft.io/project</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <img src="https://placehold.co/600x400/F5F3F0/2D2A26?text=Modern+Website" alt="Project Preview" className="w-full h-48 object-cover rounded-xl" />
                <div className="h-3 bg-bg-alt rounded-full w-3/4" />
                <div className="h-3 bg-bg-alt rounded-full w-1/2" />
                <div className="flex gap-3 pt-2">
                  <div className="flex-1 h-10 bg-ink rounded-full" />
                  <div className="w-10 h-10 rounded-full border-2 border-border" />
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="hero-card absolute bottom-32 left-0 w-64 bg-ink rounded-3xl p-6 shadow-2xl opacity-0">
              <p className="font-display font-extrabold text-4xl text-white mb-2">140+</p>
              <p className="text-sm text-white/60 mb-4">Projects Shipped</p>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-accent-warm rounded-full" />
              </div>
            </div>

            {/* Floating Badge */}
            <div className="hero-card absolute bottom-8 right-8 bg-bg-surface border border-border rounded-2xl p-4 shadow-xl flex items-center gap-3 opacity-0">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-warm to-accent-sky border-2 border-white" />
                ))}
              </div>
              <div>
                <p className="font-semibold text-ink text-sm">98% Satisfaction</p>
                <p className="text-xs text-ink-tertiary">From 140+ clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs font-mono uppercase tracking-widest text-ink-tertiary">Scroll</span>
        <div className="w-6 h-10 border-2 border-ink-tertiary rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-ink-tertiary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}