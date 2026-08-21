import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Percent, Calendar } from 'lucide-react'
import { Reveal } from './reveal'
import { db } from '@/lib/db'
import { Locale } from '@/lib/dictionaries'

export async function OffersStrip({ locale = 'ar' }: { locale?: Locale }) {
  let offers: any[] = []
  try {
    offers = await db.contentItem.findMany({
      where: { type: 'PROMOTION', status: 'PUBLISHED' },
      take: 3,
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.warn('Failed to fetch published offers for homepage:', error)
    // Ponytail fallback: safe empty array
    offers = []
  }

  if (offers.length === 0) {
    return null
  }

  return (
    <section id="offers" className="relative border-t border-border bg-card/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-widest text-primary">
              <Percent className="size-4" />
              {locale === 'ar' ? 'العروض الترويجية' : 'Promotions & Offers'}
            </span>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              {locale === 'ar' ? 'أحدث الخصومات والعروض الحصرية' : 'Latest Exclusive Offers'}
            </h2>
          </div>
          <Link
            href="/offers"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-transform hover:-translate-x-1"
          >
            {locale === 'ar' ? 'جميع العروض' : 'All Offers'}
            <ArrowLeft className="size-4" />
          </Link>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <Link
              key={offer.id}
              href={`/offers/${offer.id}`}
              className="group overflow-hidden rounded-3xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {offer.coverImage ? (
                  <Image
                    src={offer.coverImage}
                    alt={offer.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-orange-500/20" />
                )}
                <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
                  {locale === 'ar' ? 'خصم خاص' : 'Special Offer'}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {new Date(offer.createdAt).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                </span>
                <h3 className="text-balance font-display text-lg font-bold leading-snug transition-colors group-hover:text-primary line-clamp-2">
                  {offer.title}
                </h3>
                <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {locale === 'ar' ? 'تفاصيل العرض' : 'Offer Details'}
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
