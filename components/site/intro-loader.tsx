'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { site } from '@/lib/site'

interface IntroLoaderProps {
  isReady?: boolean;
}

export function IntroLoader({ isReady = true }: IntroLoaderProps) {
  const root = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDone(true)
      return
    }

    if (!isReady) return; // Wait until parent signals readiness

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setDone(true),
      })
      tl.set('.beam', { opacity: 0, scaleX: 0.2 })
        .to('.io-brand', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.1)
        .to('.beam', { opacity: 1, scaleX: 1, duration: 0.9, ease: 'power2.out' }, 0.3)
        .to('.io-flood', { opacity: 1, duration: 0.5, ease: 'power2.in' }, 0.8)
        .to('.io-root', { opacity: 0, duration: 0.7, ease: 'power2.inOut' }, 1.3)
    }, root)

    return () => ctx.revert()
  }, [isReady])

  if (done) return null

  return (
    <div
      ref={root}
      className="io-root fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#070707]"
      aria-hidden
    >
      <div className="io-flood absolute inset-0 bg-white opacity-0" />

      {/* twin headlight beams */}
      <div className="beam absolute left-1/2 top-1/2 h-[3px] w-[42vw] -translate-y-6 origin-left rounded-full bg-gradient-to-l from-transparent via-primary/70 to-white blur-[1px]" />
      <div className="beam absolute right-1/2 top-1/2 h-[3px] w-[42vw] translate-y-6 origin-right rounded-full bg-gradient-to-r from-transparent via-primary/70 to-white blur-[1px]" />

      <div className="io-brand relative z-10 translate-y-4 text-center opacity-0">
        <p className="font-display text-3xl font-extrabold tracking-[0.3em] text-white sm:text-4xl">
          {site.brandEn}
        </p>
        <p className="mt-2 text-sm tracking-widest text-primary">{site.tagline}</p>
      </div>
    </div>
  )
}
