import { AnimatedIcon, IconName } from './animated-icon'
import { Reveal } from './reveal'
import { ImageFeatureBlock } from './image-feature-block'
import { dictionaries, Locale } from '@/lib/dictionaries'
import { getCachedSettings } from '@/lib/settings'

export async function Why({ locale = 'ar' }: { locale?: Locale }) {
  const dict = dictionaries[locale].why
  const settings = await getCachedSettings();

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
            {desc}
          </p>
        </Reveal>

        <ImageFeatureBlock
          src="/images/site/Always on Time Delivery.png"
          alt={locale === 'ar' ? 'خدمة توصيل ONE TIRE في الوقت المحدد داخل السعودية' : 'ONE TIRE delivery service always on time in Saudi Arabia'}
          title={locale === 'ar' ? 'دائمًا في الموعد' : 'Always on Time'}
          desc={locale === 'ar' 
            ? 'سرعة في الاستجابة، ودقة في الوصول، وخدمة يمكنك الاعتماد عليها أينما كنت.' 
            : 'Fast response, precise arrival, and a service you can rely on wherever you are.'}
          bullets={locale === 'ar' 
            ? ['سرعة الاستجابة', 'الالتزام بالمواعيد', 'خدمة موثوقة'] 
            : ['Fast Response', 'On-time Commitment', 'Reliable Service']}
        />

        <Reveal
          stagger
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-5"
        >
          {dict.features.map((f, index) => {
            const iconNames: IconName[] = ['car', 'mechanic-location', 'path', 'electric-car', 'car-insurance']
            return (
              <div key={index} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-6 text-center transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30">
                <div className="mx-auto flex size-14 sm:size-16 items-center justify-center text-primary transition-transform group-hover:scale-110 mb-3 mix-blend-multiply dark:mix-blend-screen bg-transparent">
                  <AnimatedIcon name={iconNames[index]} className="size-full" />
                </div>
                <h3 className="mt-2 font-display text-base sm:text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3 sm:line-clamp-none">{f.desc}</p>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
