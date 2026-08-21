'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { Reveal } from './reveal'

export function TestimonialList({ testimonials }: { testimonials: any[] }) {
  const [active, setActive] = useState<any[]>([])

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (testimonials.length > 0) {
      const shuffled = [...testimonials].sort(() => 0.5 - Math.random())
      setActive(shuffled.slice(0, 3))
    }
  }, [testimonials])

  if (!mounted) {
    return (
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-3xl border border-border bg-card/50 animate-pulse" />
        ))}
      </div>
    )
  }

  if (active.length === 0) {
    return (
      <div className="mt-14 text-center py-10 text-muted-foreground font-medium">
        كن أول من يشاركنا تجربته!
      </div>
    )
  }

  return (
    <Reveal stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
      {active.map((r: any) => (
        <figure key={r.name + r.text.substring(0,10)} className="rounded-3xl border border-border bg-card p-7 hover:shadow-lg transition-shadow">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`size-4 ${i < r.rating ? 'fill-[#FFB400] text-[#FFB400]' : 'text-muted-foreground/30'}`} />
            ))}
          </div>
          <blockquote className="mt-4 leading-relaxed text-foreground/90 font-medium">"{r.text}"</blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 font-display text-lg font-bold text-primary">
              {r.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold">{r.name}</p>
              <p className="text-sm text-muted-foreground">{r.city}</p>
            </div>
          </figcaption>
        </figure>
      ))}
    </Reveal>
  )
}
