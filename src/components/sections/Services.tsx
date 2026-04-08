'use client'

import { useEffect, useRef } from 'react'

const services = [
  { 
    icon: '⚙️', 
    title: 'Full Stack Development', 
    desc: 'End-to-end web applications built with React, Next.js, Node.js, and modern databases.', 
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    image: 'https://placehold.co/600x400/F5F3F0/D4703A?text=Full+Stack',
    color: 'accent-warm'
  },
  { 
    icon: '🎨', 
    title: 'Web Design', 
    desc: 'Stunning, conversion-focused website designs translated into live experiences.', 
    tags: ['UI/UX', 'Figma', 'Responsive', 'Branding'],
    image: 'https://placehold.co/600x400/F5F3F0/4A90C2?text=Web+Design',
    color: 'accent-sky'
  },
  { 
    icon: '🛒', 
    title: 'Shopify Development', 
    desc: 'High-converting Shopify stores built for growth with custom themes.', 
    tags: ['Liquid', 'Custom Themes', 'Apps', 'SEO'],
    image: 'https://placehold.co/600x400/F5F3F0/9AB84A?text=Shopify',
    color: 'accent-lime'
  },
  { 
    icon: '📝', 
    title: 'WordPress', 
    desc: 'Custom WordPress themes and plugins tailored to your specific needs.', 
    tags: ['Custom Themes', 'WooCommerce', 'ACF', 'SEO'],
    image: 'https://placehold.co/600x400/F5F3F0/7B6CE8?text=WordPress',
    color: 'accent-violet'
  },
  { 
    icon: '✏️', 
    title: 'Graphic Design', 
    desc: 'Memorable brand identities and visual assets that communicate your story.', 
    tags: ['Logo', 'Branding', 'Print', 'Social'],
    image: 'https://placehold.co/600x400/F5F3F0/E84E9C?text=Graphic+Design',
    color: 'accent-rose'
  },
  { 
    icon: '📱', 
    title: 'UI/UX Strategy', 
    desc: 'User research and strategic design thinking for intuitive products.', 
    tags: ['Research', 'Wireframes', 'Usability', 'Testing'],
    image: 'https://placehold.co/600x400/F5F3F0/2DAE85?text=UI/UX',
    color: 'accent-teal'
  },
]

export default function Services() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    const cards = ref.current?.querySelectorAll('.service-card')
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="services" className="section bg-bg-soft">
      <div className="container">
        <div className="section-header">
          <span className="tag mb-4">Our Services</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Everything your digital<br />
            <span className="gradient-text">business needs.</span>
          </h2>
          <p className="text-lg text-ink-secondary leading-relaxed">
            From concept to launch, we handle every layer of your digital presence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div key={i} className="service-card card reveal group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={svc.image} 
                  alt={svc.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface to-transparent opacity-60" />
                <div className="absolute top-4 right-4 w-12 h-12 bg-bg-surface rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  {svc.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl mb-3 group-hover:text-accent-warm transition-colors">
                  {svc.title}
                </h3>
                <p className="text-ink-secondary leading-relaxed mb-4">
                  {svc.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {svc.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-bg-alt border border-border rounded-full text-xs font-medium text-ink-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}