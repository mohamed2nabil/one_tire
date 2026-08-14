import { Phone, MessageCircle, MapPin } from 'lucide-react'
import { nav, site } from '@/lib/site'
import { dictionaries, Locale } from '@/lib/dictionaries'

export function SiteFooter({ locale = 'ar' }: { locale?: Locale }) {
  const dict = dictionaries[locale].footer
  const navDict = dictionaries[locale].nav

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-2xl font-extrabold tracking-[0.2em]">
              ONE<span className="text-primary">TIRE</span>
            </p>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              {dict.desc}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
              >
                <MessageCircle className="size-4" />
                {dict.whatsapp}
              </a>
              <a
                href={`tel:${site.phoneTel}`}
                className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-bold"
              >
                <Phone className="size-4" />
                <span dir="ltr">{site.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div>
            <p className="text-base font-extrabold">{dict.links}</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={n.href} className="transition-colors hover:text-foreground">
                    {navDict[n.id as keyof typeof navDict] || n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-base font-extrabold">{dict.coverage}</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {dict.cities.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} ONE TIRE. {dict.rights}</p>
          <p>{dict.madeBy}</p>
        </div>
      </div>
    </footer>
  )
}
