import { ArrowLeft, Phone } from 'lucide-react'
import { HeroSequenceDynamic as HeroSequence } from './hero-sequence-dynamic'
import { site } from '@/lib/site'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { dictionaries, Locale } from '@/lib/dictionaries'
import { getCachedSettings } from '@/lib/settings'

export async function Hero({ locale = 'ar' }: { locale?: Locale }) {
  const dict = dictionaries[locale].hero
  const settings = await getCachedSettings();

  const title1 = locale === 'ar' ? (settings.hero_title1_ar || dict.title1) : (settings.hero_title1_en || dict.title1);
  const title2 = locale === 'ar' ? (settings.hero_title2_ar || dict.title2) : (settings.hero_title2_en || dict.title2);
  const desc = locale === 'ar' ? (settings.hero_desc_ar || dict.desc) : (settings.hero_desc_en || dict.desc);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden text-foreground transition-colors duration-500"
    >
      {/* Background Cinematic Canvas */}
      <HeroSequence />

      {/* Gradient Overlays (Crossfading for smooth theme transitions) */}
      <div 
        aria-hidden 
        className="absolute inset-0 z-1 bg-gradient-to-t from-white/95 via-white/80 to-white/40 opacity-100 transition-opacity duration-500 dark:opacity-0" 
      />
      <div 
        aria-hidden 
        className="absolute inset-0 z-1 bg-gradient-to-t from-background via-background/60 to-background/20 mix-blend-multiply opacity-0 transition-opacity duration-500 dark:opacity-100" 
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background: 'radial-gradient(120% 50% at 50% 0%, rgba(255,122,26,0.08), transparent 70%)',
        }}
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 z-1 opacity-20 mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 pt-28 text-center sm:px-8">
        
        <span className="hero-fade-1 inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-md">
          <span className="size-2 rounded-full bg-primary" />
          {dict.tag}
        </span>

        <h1 className="mt-8 text-balance font-display text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl text-shadow-sm text-foreground">
          <span className="hero-fade-2 block">{title1}</span>
          <span className="hero-fade-3 block text-primary mt-2">{title2}</span>
        </h1>

        <p className="hero-fade-4 mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl text-shadow-sm font-medium">
          {desc}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: 'lg' }), "h-14 rounded-full px-8 text-base font-bold shadow-lg shadow-primary/20 transition-transform hover:scale-105")}
          >
            <Phone className="size-5" />
            {dict.cta1}
          </a>
          <a
            href="#services"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), "h-14 rounded-full px-8 text-base font-bold backdrop-blur-sm transition-colors")}
          >
            {dict.cta2}
            <ArrowLeft className={cn("size-5", locale === 'en' && "rotate-180")} />
          </a>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 w-full border-t border-border bg-white/70 dark:bg-background/40 backdrop-blur-md pb-safe transition-colors duration-500">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-x-reverse divide-border/30 px-5 sm:px-8">
          {[
            { k: dict.stat1, v: dict.stat1desc, d: 6 },
            { k: dict.stat2, v: dict.stat2desc, d: 7 },
            { k: dict.stat3, v: dict.stat3desc, d: 8 },
          ].map((s) => (
            <div key={s.v} className="hero-fade-6 px-3 py-6 text-center" style={{ animationDelay: `${s.d * 0.1}s` }}>
              <p className="font-display text-2xl font-extrabold sm:text-4xl text-shadow-sm">
                {s.k}
              </p>
              <p className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
