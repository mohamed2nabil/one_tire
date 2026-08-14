import { SmoothScroll } from '@/components/site/smooth-scroll'
import { cookies } from 'next/headers'

import { SiteNav } from '@/components/site/site-nav'
import { WhatsappFab } from '@/components/site/whatsapp-fab'
import { Hero } from '@/components/site/hero'
import { Why } from '@/components/site/why'
import { Services } from '@/components/site/services'
import { Brands } from '@/components/site/brands'
import { Coverage } from '@/components/site/coverage'
import { Emergency } from '@/components/site/emergency'
import { OffersStrip } from '@/components/site/offers-strip'
import { Testimonials } from '@/components/site/testimonials'
import { Faq } from '@/components/site/faq'
import { Blog } from '@/components/site/blog'
import { FinalCta } from '@/components/site/final-cta'
import { SiteFooter } from '@/components/site/site-footer'
import { Locale } from '@/lib/dictionaries'

import { Metadata } from 'next'
import { db } from '@/lib/db'

import { generateSiteMeta } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'ar') as Locale;
  return generateSiteMeta(locale);
}

import { getCachedSettings } from '@/lib/settings'

export default async function Page() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'ar') as Locale
  const settings = await getCachedSettings();

  return (
    <>
      <SmoothScroll />

      <SiteNav locale={locale} />
      <WhatsappFab />
      <main>
        <Hero locale={locale} />
        <Why locale={locale} />
        <Services locale={locale} />
        <OffersStrip locale={locale} />
        <Brands />
        <Coverage locale={locale} settings={settings} />
        <Emergency locale={locale} />
        <Testimonials locale={locale} />
        <Faq locale={locale} />
        <Blog />
        <FinalCta locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  )
}
