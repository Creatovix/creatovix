'use client'

import { useEffect, useRef } from 'react'

type GSAPInstance = typeof import('gsap').gsap
type ScrollTriggerPlugin = typeof import('gsap/ScrollTrigger').ScrollTrigger

let gsapCache: GSAPInstance | null = null
let stCache: ScrollTriggerPlugin | null = null

async function loadGSAP() {
  if (gsapCache && stCache) return { gsap: gsapCache, ScrollTrigger: stCache }
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])
  gsap.registerPlugin(ScrollTrigger)
  gsapCache = gsap
  stCache = ScrollTrigger
  return { gsap, ScrollTrigger }
}

/** Fade up + stagger on scroll */
export function useFadeUp(
  selector: string,
  opts: { stagger?: number; y?: number; delay?: number; start?: string } = {}
) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    let ctx: any
    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      ctx = gsap.context(() => {
        const els = ref.current?.querySelectorAll(selector)
        if (!els?.length) return
        gsap.fromTo(
          els,
          { opacity: 0, y: opts.y ?? 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: opts.stagger ?? 0.12,
            delay: opts.delay ?? 0,
            scrollTrigger: {
              trigger: ref.current,
              start: opts.start ?? 'top 82%',
              once: true,
            },
          }
        )
      }, ref)
    })
    return () => ctx?.revert()
  }, [selector])
  return ref
}

/** Slide in from left */
export function useSlideLeft(selector: string, stagger = 0.1) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    let ctx: any
    loadGSAP().then(({ gsap }) => {
      ctx = gsap.context(() => {
        const els = ref.current?.querySelectorAll(selector)
        if (!els?.length) return
        gsap.fromTo(
          els,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }, ref)
    })
    return () => ctx?.revert()
  }, [selector, stagger])
  return ref
}

/** Counter animation */
export function useCountUp(end: number, suffix = '', duration = 2) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let ctx: any
    loadGSAP().then(({ gsap }) => {
      ctx = gsap.context(() => {
        if (!ref.current) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: end,
          duration,
          ease: 'power2.out',
          onUpdate() {
            if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix
          },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once: true,
          },
        })
      })
    })
    return () => ctx?.revert()
  }, [end, suffix, duration])
  return ref
}

/** Scale + fade in */
export function useScaleFade(selector: string) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    let ctx: any
    loadGSAP().then(({ gsap }) => {
      ctx = gsap.context(() => {
        const els = ref.current?.querySelectorAll(selector)
        if (!els?.length) return
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.94, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }, ref)
    })
    return () => ctx?.revert()
  }, [selector])
  return ref
}

/** Hero entrance timeline */
export function useHeroEntrance(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    loadGSAP().then(({ gsap }) => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo('.hero-tag', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        .fromTo(
          '.hero-line',
          { opacity: 0, y: 60, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'power4.out', stagger: 0.13 },
          '-=0.2'
        )
        .fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .fromTo('.hero-cta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
        .fromTo('.hero-badge', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 }, '-=0.3')
        .fromTo('.hero-card', { opacity: 0, y: 40, scale: 0.93 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12 }, 0.4)
    })
  }, [])
}