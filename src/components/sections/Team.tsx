'use client'

import { useEffect, useRef } from 'react'

const team = [
  { 
    name: 'Ahmad Raza', 
    role: 'Lead Full Stack Developer', 
    initials: 'AR', 
    image: 'https://placehold.co/400x400/4A90C2/FFFFFF?text=AR',
    bio: 'Architect of complex applications. 8 years across React, Node.js, and cloud.',
    skills: ['React', 'Next.js', 'Node.js', 'AWS']
  },
  { 
    name: 'Sara Khalid', 
    role: 'UI/UX & Web Designer', 
    initials: 'SK', 
    image: 'https://placehold.co/400x400/E84E9C/FFFFFF?text=SK',
    bio: 'Creates beautiful, intuitive interfaces for fintech and e-commerce brands.',
    skills: ['Figma', 'Webflow', 'Branding', 'Prototyping']
  },
  { 
    name: 'Usman Tariq', 
    role: 'WordPress & Shopify Expert', 
    initials: 'UT', 
    image: 'https://placehold.co/400x400/9AB84A/FFFFFF?text=UT',
    bio: 'Built 60+ Shopify and WordPress sites that rank and convert.',
    skills: ['Shopify', 'WordPress', 'WooCommerce', 'SEO']
  },
  { 
    name: 'Zara Noor', 
    role: 'Graphic Designer', 
    initials: 'ZN', 
    image: 'https://placehold.co/400x400/D4703A/FFFFFF?text=ZN',
    bio: 'Brand identity expert with a sharp eye for detail and visual storytelling.',
    skills: ['Illustrator', 'Photoshop', 'Brand Identity', 'Print']
  },
  { 
    name: 'Hassan Ali', 
    role: 'Backend & DevOps Engineer', 
    initials: 'HA', 
    image: 'https://placehold.co/400x400/7B6CE8/FFFFFF?text=HA',
    bio: 'Ensures applications are fast, secure, and always online.',
    skills: ['Node.js', 'Docker', 'PostgreSQL', 'CI/CD']
  },
  { 
    name: 'Fatima Sheikh', 
    role: 'Project Manager', 
    initials: 'FS', 
    image: 'https://placehold.co/400x400/2DAE85/FFFFFF?text=FS',
    bio: 'Keeps every project on track and bridges strategy with execution.',
    skills: ['Strategy', 'Agile', 'Client Relations', 'Planning']
  },
]

export default function Team() {
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
      { threshold: 0.1 }
    )

    const cards = ref.current?.querySelectorAll('.team-card')
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="team" className="section bg-bg-soft">
      <div className="container">
        <div className="section-header text-center mx-auto">
          <span className="tag mb-4">The Team</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            The people behind<br />your product.
          </h2>
          <p className="text-lg text-ink-secondary max-w-2xl mx-auto">
            A tight-knit team of specialists who bring deep expertise and genuine passion to every project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <div key={i} className="team-card card reveal group overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={m.image} 
                  alt={m.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display font-bold text-xl text-ink mb-1">{m.name}</h3>
                  <p className="text-accent-warm font-medium">{m.role}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-ink-secondary leading-relaxed mb-4">{m.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {m.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-bg-alt border border-border rounded-full text-xs text-ink-secondary">
                      {skill}
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