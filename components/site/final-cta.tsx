import { Phone, MessageCircle, Star, ShieldCheck, Clock } from 'lucide-react'
import { Reveal } from './reveal'
import { VanImage } from './van-image'
import { site } from '@/lib/site'
import { dictionaries, Locale } from '@/lib/dictionaries'
import { db } from '@/lib/db'
import { getCachedSettings } from '@/lib/settings'
import { ContactForm } from './contact-form'

export async function FinalCta({ locale = 'ar' }: { locale?: Locale }) {
  const dict = dictionaries[locale].contact
  const settings = await getCachedSettings();
  
  let ctaImage = settings.cta_image || "/images/site/one-tire-van.jpeg"
  const title1 = locale === 'ar' ? (settings.cta_title1_ar || dict.title1) : (settings.cta_title1_en || dict.title1);
  const title2 = locale === 'ar' ? (settings.cta_title2_ar || dict.title2) : (settings.cta_title2_en || dict.title2);

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-background py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 0%, rgba(255,122,26,0.16), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="text-sm font-semibold tracking-widest text-primary">{dict.tag}</span>
          <h2 className="mt-4 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
            {title1}
            <br />
            <span className="text-chrome">{title2}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
            {dict.desc}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-transform hover:scale-105 sm:w-auto shadow-lg shadow-primary/20"
            >
              <MessageCircle className="size-5" />
              {dict.cta1}
            </a>
            <a
              href={`tel:${site.phoneTel}`}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-base font-bold text-foreground transition-all hover:bg-secondary hover:border-primary/50 sm:w-auto"
            >
              <Phone className="size-5" />
              <span dir="ltr">{site.phoneDisplay}</span>
            </a>
          </div>

          <ContactForm />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
              <Star className="size-4 fill-primary text-primary" />
              {dict.stat1}
            </span>
            <span className="inline-flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
              <ShieldCheck className="size-4 text-primary" />
              {dict.stat2}
            </span>
            <span className="inline-flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
              <Clock className="size-4 text-primary" />
              {dict.stat3}
            </span>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 w-full max-w-5xl px-4">
        <VanImage lightPool src={ctaImage} />
      </div>
    </section>
  )
}
