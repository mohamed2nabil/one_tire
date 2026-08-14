import Image from 'next/image'
import { Phone, MessageCircle, Zap } from 'lucide-react'
import { Reveal } from './reveal'
import { site } from '@/lib/site'
import { dictionaries, Locale } from '@/lib/dictionaries'

export function Emergency({ locale = 'ar' }: { locale?: Locale }) {
  const dict = dictionaries[locale].emergency

  return (
    <section className="relative overflow-hidden border-t border-border">
      <Image
        src="/images/site/emergency-night.png"
        alt={locale === 'ar' ? 'سيارة فاخرة متوقفة ليلاً على جانب الطريق بإطار مثقوب' : 'Luxury car stopped at night on road side with flat tire'}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-l from-background/95 via-background/80 to-background/50" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-destructive/15 px-4 py-1.5 text-xs font-bold tracking-wide text-destructive">
            <Zap className="size-3.5" />
            {dict.tag}
          </span>
          <h2 className="mt-5 text-balance font-display text-4xl font-extrabold leading-tight sm:text-6xl">
            {dict.title1}
            <br />
            <span className="text-primary">{dict.title2}</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {dict.desc}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              <MessageCircle className="size-5" />
              {dict.cta1}
            </a>
            <a
              href={`tel:${site.phoneTel}`}
              className="flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-7 py-4 text-base font-bold text-foreground backdrop-blur transition-colors hover:bg-background/70"
            >
              <Phone className="size-5" />
              <span dir="ltr">{site.phoneDisplay}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
