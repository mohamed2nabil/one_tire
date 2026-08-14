import { AnimatedIcon, IconName } from './animated-icon'
import { Reveal } from './reveal'
import { VanImage } from './van-image'
import { dictionaries, Locale } from '@/lib/dictionaries'
import { getCachedSettings } from '@/lib/settings'

export async function Why({ locale = 'ar' }: { locale?: Locale }) {
  const dict = dictionaries[locale].why
  const settings = await getCachedSettings();

  let whyImage = settings.why_image || "/images/site/one-tire-van.jpeg";
  let title = locale === 'ar' ? (settings.why_title_ar || dict.title) : (settings.why_title_en || dict.title);
  let desc = locale === 'ar' ? (settings.why_desc_ar || dict.desc) : (settings.why_desc_en || dict.desc);

  return (
    <section id="why" className="relative overflow-hidden border-t border-border bg-background py-16 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold tracking-widest text-primary">{dict.tag}</span>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground text-lg">
            {dict.desc}
          </p>
        </Reveal>

        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-4xl">
            <VanImage src={whyImage} />
          </div>
        </div>

        <Reveal
          stagger
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5"
        >
          {dict.features.map((f, index) => {
            const iconNames: IconName[] = ['mechanic-location', 'electric-car', 'path', 'car-insurance', 'car']
            return (
              <div
                key={f.title}
                className="group rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <AnimatedIcon name={iconNames[index]} className="size-full rounded-2xl overflow-hidden" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
