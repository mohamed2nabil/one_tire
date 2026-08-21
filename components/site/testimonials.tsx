import { Star } from 'lucide-react'
import { Reveal } from './reveal'
import { dictionaries, Locale } from '@/lib/dictionaries'
import { db } from '@/lib/db'

import { ReviewForm } from './review-form'
import { TestimonialList } from './testimonial-list'

export async function Testimonials({ locale = 'ar' }: { locale?: Locale }) {
  const dict = dictionaries[locale].testimonials
  let dbTestimonials: any[] = [];
  try {
    dbTestimonials = await db.testimonial.findMany({ where: { isVisible: true } });
  } catch (e) {}

  const baseTestimonials = dbTestimonials.map(t => ({ 
    name: t.clientName, 
    city: t.city || '', 
    text: t.text, 
    rating: t.rating || 5 
  }));

  const avgRating = baseTestimonials.length > 0 
    ? (baseTestimonials.reduce((acc, t) => acc + t.rating, 0) / baseTestimonials.length).toFixed(1)
    : '4.9';

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
                <Star key={i} className={`size-5 ${i < Math.round(Number(avgRating)) ? 'fill-primary text-primary' : 'text-muted'}`} />
              ))}
            </div>
            <div>
              <p className="font-display text-xl font-extrabold">{avgRating}</p>
              <p className="text-xs text-muted-foreground">{dict.rating}</p>
            </div>
          </div>
        </Reveal>

        <TestimonialList testimonials={baseTestimonials} />
        
        <Reveal>
          <ReviewForm />
        </Reveal>
      </div>
    </section>
  )
}
