'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  src: string;
  alt: string;
  title: string;
  desc: string;
  bullets?: string[];
  reverse?: boolean;
}

export function ImageFeatureBlock({ src, alt, title, desc, bullets, reverse }: Props) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const ctx = gsap.context(() => {
      // opacity 0 → 1, translateY 20px → 0, scale 0.98 → 1, duration 0.8s
      gsap.fromTo(
        el,
        { y: 20, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          }
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="mt-16 lg:mt-24 px-4 w-full opacity-0">
      <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-center lg:justify-between gap-10 lg:gap-16 max-w-6xl mx-auto`}>
        
        {/* Image Card (45% Width on Desktop) */}
        <div className="w-full max-w-[420px] lg:w-[45%] flex-shrink-0">
          <div className="w-full rounded-[24px] lg:rounded-[28px] overflow-hidden border border-border/60 shadow-lg dark:shadow-md bg-card">
            <Image 
              src={src}
              alt={alt}
              width={800}
              height={1000}
              className="w-full h-auto object-contain block"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text Content (55% Width on Desktop) */}
        <div className="flex-1 w-full lg:w-[55%] text-center lg:text-start max-w-lg mx-auto lg:mx-0">
          <h3 className="text-3xl lg:text-4xl font-display font-bold text-foreground">
            {title}
          </h3>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            {desc}
          </p>
          
          {bullets && bullets.length > 0 && (
            <ul className="mt-6 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:justify-start">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium bg-card border border-border/50 px-4 py-2.5 rounded-full shadow-sm w-fit mx-auto lg:mx-0">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}
