'use client'

import { useEffect, useState } from 'react'
import { Menu, X, Phone, HelpCircle, Wrench, Tag, MapPin, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { nav, site } from '@/lib/site'

const navIcons = {
  why: HelpCircle,
  services: Wrench,
  offers: Tag,
  coverage: MapPin,
  contact: MessageCircle,
} as const
import { dictionaries, Locale } from '@/lib/dictionaries'
import { LanguageToggle } from './language-toggle'
import { ThemeToggle } from './theme-toggle'

export function SiteNav({ locale = 'ar' }: { locale?: Locale }) {
  const dict = dictionaries[locale].nav
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="/" className="flex items-center gap-2">
          <span className="font-display text-lg font-extrabold tracking-[0.2em] text-foreground">
            ONE<span className="text-primary">TIRE</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const Icon = navIcons[item.id as keyof typeof navIcons]
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {Icon && <Icon className="size-4" />}
                  {dict[item.id as keyof typeof dict] || item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LanguageToggle currentLocale={locale} />
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 sm:flex"
          >
            <Phone className="size-4" />
            {locale === 'ar' ? 'احجز الآن' : 'Book Now'}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
            aria-label="القائمة"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {nav.map((item) => {
              const Icon = navIcons[item.id as keyof typeof navIcons]
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 py-3 text-base font-medium text-foreground/90"
                  >
                    {Icon && <Icon className="size-5 text-muted-foreground" />}
                    {dict[item.id as keyof typeof dict] || item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
