import { Star } from 'lucide-react'
import { Reveal } from './reveal'
import { dictionaries, Locale } from '@/lib/dictionaries'
import { db } from '@/lib/db'

export async function Testimonials({ locale = 'ar' }: { locale?: Locale }) {
  const dict = dictionaries[locale].testimonials
  let dbTestimonials: any[] = [];
  try {
    dbTestimonials = await db.testimonial.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } });
  } catch (e) {}

  const activeTestimonials = dbTestimonials.length > 0 ? dbTestimonials.map(t => ({ name: t.clientName, city: t.city || '', text: t.text })) : dict.reviews;


  return (
    <section id="reviews" className="relative border-t border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold tracking-widest text-primary">{dict.tag}</span>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              {dict.title}
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-primary text-primary" />
              ))}
            </div>
            <div>
              <p className="font-display text-xl font-extrabold">4.9</p>
              <p className="text-xs text-muted-foreground">{dict.rating}</p>
            </div>
          </div>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {activeTestimonials.map((r: any) => (
            <figure key={r.name} className="rounded-3xl border border-border bg-card p-7">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="mt-4 leading-relaxed text-foreground/90">“{r.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-primary/15 font-display text-lg font-bold text-primary">
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
      </div>
    </section>
  )
}
