// Alternative version with icons (components/sections/SkillsWithIcons.tsx)
'use client'

import { useEffect, useRef } from 'react'

const skillsWithIcons = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'JavaScript', icon: '📜' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Tailwind', icon: '🌊' },
  { name: 'HTML5', icon: '🔶' },
  { name: 'CSS3', icon: '🔷' },
  { name: 'SASS', icon: '💅' },
  { name: 'GraphQL', icon: '◈' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Redis', icon: '🔴' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Vercel', icon: '△' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Shopify', icon: '🛒' },
  { name: 'WordPress', icon: '📝' },
  { name: 'Git', icon: '🔀' },
  { name: 'Docker', icon: '🐳' },
]

export default function SkillsWithIcons() {
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

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  const duplicated = [...skillsWithIcons, ...skillsWithIcons]

  return (
    <section ref={ref} className="section bg-bg-soft reveal">
      <div className="container">
        <div className="text-center mb-[5vh]">
          <span className="tag mb-4">Tech Stack</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Powered by modern<br />
            <span className="gradient-text">technologies.</span>
          </h2>
        </div>

        <div className="marquee-container py-10 bg-gradient-to-r from-bg-surface via-bg-soft to-bg-surface rounded-3xl border border-border-soft shadow-inner">
          <div className="marquee-track">
            {duplicated.map((skill, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 px-6 py-4 bg-bg-surface border-2 border-border rounded-2xl hover:border-accent-warm hover:shadow-lg hover:-translate-y-1 transition-all cursor-default group flex items-center gap-3"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{skill.icon}</span>
                <span className="font-semibold text-ink group-hover:text-accent-warm whitespace-nowrap">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}