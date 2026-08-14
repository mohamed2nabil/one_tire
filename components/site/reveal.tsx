'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  /** vertical offset in px */
  y?: number
  delay?: number
  /** stagger direct children instead of the wrapper */
  stagger?: boolean
}

export function Reveal({
  children,
  className,
  as: Tag = 'div',
  y = 44,
  delay = 0,
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el
      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [y, delay, stagger])

  return (
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  )
}
