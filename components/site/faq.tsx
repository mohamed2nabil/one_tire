'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { dictionaries, Locale } from '@/lib/dictionaries'

export function Faq({ locale = 'ar' }: { locale?: Locale }) {
  const dict = dictionaries[locale].faq
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative border-t border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <span className="text-sm font-semibold tracking-widest text-primary">{dict.tag}</span>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            {dict.title}
          </h2>
        </Reveal>

        <Reveal className="mt-12 divide-y divide-border rounded-3xl border border-border bg-card">
          {dict.items.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={cn("flex w-full items-center justify-between gap-4 px-6 py-5", locale === 'ar' ? "text-right" : "text-left")}
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-bold">{f.q}</span>
                  <Plus
                    className={cn(
                       'size-5 shrink-0 text-primary transition-transform duration-300',
                      isOpen && 'rotate-45',
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid overflow-hidden px-6 transition-all duration-300',
                    isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <p className="min-h-0 leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
