'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { MapPin, Clock } from 'lucide-react'
import { Reveal } from './reveal'
import { dictionaries, Locale } from '@/lib/dictionaries'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const ROUTE = 'M 120 360 C 260 300, 320 200, 430 180 S 640 150, 690 110'

export function Coverage({ locale = 'ar', settings }: { locale?: Locale, settings?: Record<string, string> }) {
  const dict = dictionaries[locale].coverage
  
  const title = settings ? (locale === 'ar' ? (settings.cov_title_ar || dict.title) : (settings.cov_title_en || dict.title)) : dict.title;
  const desc = settings ? (locale === 'ar' ? (settings.cov_desc_ar || dict.desc) : (settings.cov_desc_en || dict.desc)) : dict.desc;
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const path = el.querySelector<SVGPathElement>('.route-line')
      if (path) {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 70%', end: 'center center', scrub: true },
        })
      }

      gsap.from('.city-pin', {
        scale: 0,
        opacity: 0,
        transformOrigin: 'center bottom',
        duration: 0.6,
        stagger: 0.25,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: el, start: 'top 60%' },
      })

      if (!reduce) {
        gsap.to('.route-van', {
          duration: 6,
          repeat: -1,
          ease: 'power1.inOut',
          repeatDelay: 0.6,
          motionPath: { path: ROUTE, align: ROUTE, alignOrigin: [0.5, 0.5] },
        })
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="coverage"
      ref={root}
      className="relative overflow-hidden border-t border-border bg-background py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <span className="text-sm font-semibold tracking-widest text-primary">{dict.tag}</span>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-pretty text-muted-foreground">
            {desc}
          </p>

          <div className="mt-8 space-y-3">
            {dict.cities.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="font-display text-lg font-bold">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.note}</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Clock className="size-3.5" />
                  {dict.status}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
            style={{
              background:
                'radial-gradient(50% 50% at 60% 40%, rgba(255,122,26,0.14), transparent 70%)',
            }}
          />
          <svg viewBox="0 0 800 500" className="w-full" role="img" aria-label="خريطة تغطية المنطقة الشرقية">
            {/* grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="800" height="500" fill="url(#grid)" rx="24" />

            <path
              className="route-line"
              d={ROUTE}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="10 10"
            />

            {dict.cities.map((c, index) => {
              const coords = [
                { x: 120, y: 360 },
                { x: 430, y: 180 },
                { x: 690, y: 110 },
              ]
              const { x, y } = coords[index]
              return (
                <g key={c.name} className="city-pin">
                  <circle cx={x} cy={y} r="26" fill="var(--color-primary)" opacity="0.15" />
                  <circle cx={x} cy={y} r="8" fill="var(--color-primary)" />
                  <circle cx={x} cy={y} r="8" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                    <animate attributeName="r" from="8" to="24" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text
                    x={x}
                    y={y - 34}
                    textAnchor="middle"
                    className="fill-foreground font-sans"
                    fontSize="20"
                    fontWeight="700"
                  >
                    {c.name}
                  </text>
                </g>
              )
            })}

            {/* moving van marker */}
            <g className="route-van">
              <circle r="16" fill="var(--color-primary)" />
              <path
                d="M -9 -3 h 10 l 4 4 v 5 h -18 v -9 z M -12 6 h 20"
                fill="none"
                stroke="var(--color-primary-foreground)"
                strokeWidth="1.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
