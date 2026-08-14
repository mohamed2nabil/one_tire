import { ArrowLeft } from 'lucide-react'
import { AnimatedIcon, IconName } from './animated-icon'
import { Reveal } from './reveal'
import { site } from '@/lib/site'
import { dictionaries, Locale } from '@/lib/dictionaries'
import { db } from '@/lib/db'

import { getCachedSettings } from '@/lib/settings'

export async function Services({ locale = 'ar' }: { locale?: Locale }) {
  const dict = dictionaries[locale].services
  const settings = await getCachedSettings();
  
  let dbServices: any[] = [];
  try {
    dbServices = await db.serviceItem.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } });
  } catch (e) {}

  const activeServices = dbServices.length > 0 ? dbServices : dict.items;
  const title = locale === 'ar' ? (settings.srv_title_ar || dict.title) : (settings.srv_title_en || dict.title);


  return (
    <section id="services" className="relative border-t border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold tracking-widest text-primary">{dict.tag}</span>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              {title}
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-muted-foreground">
            {dict.desc}
          </p>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {activeServices.map((s, index) => {
            const iconNames: IconName[] = ['mechanic-location', 'car', 'electric-car', 'car-insurance']
            const n = `0${index + 1}`
            return (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/50"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-10 -top-10 size-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
                />
                <div className="relative flex items-start justify-between">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white transition-colors group-hover:scale-105">
                    <AnimatedIcon name={iconNames[index]} className="size-full rounded-2xl overflow-hidden" />
                  </div>
                  <span className="font-display text-4xl font-extrabold text-white/5">{n}</span>
                </div>
                <h3 className="relative mt-6 font-display text-2xl font-bold">{s.title}</h3>
                <p className="relative mt-3 leading-relaxed text-muted-foreground">{s.desc}</p>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                >
                  {dict.cta}
                  <ArrowLeft className={cn("size-4 transition-transform group-hover:-translate-x-1", locale === 'en' && "rotate-180")} />
                </a>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
import { cn } from '@/lib/utils'
