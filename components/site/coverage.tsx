'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { MapPin, Clock } from 'lucide-react'
import { Reveal } from './reveal'
import { dictionaries, Locale } from '@/lib/dictionaries'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const ROUTE = 'M 60 420 C 100 390, 140 370, 180 360 S 320 200, 430 180 S 640 150, 690 110'

export function Coverage({ locale = 'ar', settings }: { locale?: Locale, settings?: Record<string, string> }) {
  const dict = dictionaries[locale].coverage
  
  const title = settings ? (locale === 'ar' ? (settings.cov_title_ar || dict.title) : (settings.cov_title_en || dict.title)) : dict.title;
  const desc = settings ? (locale === 'ar' ? (settings.cov_desc_ar || dict.desc) : (settings.cov_desc_en || dict.desc)) : dict.desc;
  const root = useRef<HTMLElement>(null)
  
  const [activeVisual, setActiveVisual] = useState<'map' | 'image'>('map')

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 768px)').matches

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
          motionPath: {
            path: ROUTE,
            align: ROUTE,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: 10,
          repeat: -1,
          ease: 'none',
        })
      }
    }, el)

    const interval = setInterval(() => {
      setActiveVisual(prev => prev === 'map' ? 'image' : 'map')
    }, 6000)

    return () => {
      ctx.revert()
      clearInterval(interval)
    }
  }, [])

  return (
    <section id="coverage" ref={root} className="relative overflow-hidden border-t border-border bg-card py-16 sm:py-24">
      {/* subtle bg pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="right" className="order-2 lg:order-1">
          <div className="max-w-xl">
            <span className="text-sm font-semibold tracking-widest text-primary">{dict.tag}</span>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              {title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {desc}
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
              {dict.cities.map((c) => (
                <li key={c.name} className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="size-5" />
                  </div>
                  <span className="font-display text-lg font-bold">{c.name}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-6">
              <Clock className="size-8 text-primary" />
              <div>
                <h4 className="font-display font-bold">{dict.time}</h4>
                <p className="text-sm text-muted-foreground">{dict.timeDesc}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <div className="relative w-full max-w-[600px] aspect-square lg:aspect-[4/3] rounded-[24px] lg:rounded-[28px] overflow-hidden border border-border/40 shadow-xl dark:shadow-2xl bg-card mx-auto">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
              style={{
                background:
                  'radial-gradient(50% 50% at 60% 40%, rgba(255,122,26,0.14), transparent 70%)',
              }}
            />
            
            {/* SVG Existing Interactive Map */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${activeVisual === 'map' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <svg viewBox="0 0 800 500" className="w-full h-full object-cover lg:object-contain bg-background/50" role="img" aria-label="خريطة تغطية المنطقة الشرقية">
                {/* grid */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="800" height="500" fill="url(#grid)" rx="0" />

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
                    { x: 60, y: 420 },   // الرياض
                    { x: 180, y: 360 },  // الدمام
                    { x: 430, y: 180 },  // الخبر
                    { x: 690, y: 110 },  // الجبيل
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
                        className="fill-foreground font-sans drop-shadow-md"
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

            {/* New Image Network Map */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${activeVisual === 'image' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-white/5 to-white/10 dark:from-black/10 dark:to-black/30" />
              <Image
                src="/images/site/Tire1 Saudi Network Map.png"
                alt={locale === 'ar' ? "خريطة تغطية شبكة خدمات ONE TIRE في مدن السعودية" : "ONE TIRE Saudi Arabia tire service network coverage map"}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover lg:object-contain p-0 lg:p-4 transition-transform ease-linear duration-[6000ms] ${activeVisual === 'image' ? 'scale-105' : 'scale-100'}`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
