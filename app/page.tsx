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

  let ratingValue: string | null = null;
  let reviewCount: string | null = null;

  try {
    const stats = await db.testimonial.aggregate({
      where: {
        isVisible: true
      },
      _avg: { rating: true },
      _count: { id: true }
    });

    if (stats._count.id > 0) {
      ratingValue = stats._avg.rating ? stats._avg.rating.toFixed(1) : "5.0";
      reviewCount = stats._count.id.toString();
    }
  } catch (e) {
    console.error("Failed to fetch aggregate rating for SEO", e);
  }

  const autoRepairSchema: any = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "وان تاير — خدمة الإطارات المتنقلة",
    description: "خدمة متنقلة لتغيير الإطارات والإصلاح الطارئ في المنطقة الشرقية والرياض",
    telephone: "+966573649433",
    url: "https://one-tire.com",
    image: "https://one-tire.com/images/site/one-tire-van.jpeg",
    logo: "https://one-tire.com/android-chrome-512x512.png",
    areaServed: ["الرياض", "الدمام", "الخبر", "الجبيل", "الظهران"]
  };

  if (ratingValue && reviewCount) {
    autoRepairSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      reviewCount: reviewCount
    };
  }

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "وان تاير",
    alternateName: ["ONE TIRE"],
    url: "https://one-tire.com/"
  };

  const schemaData = [autoRepairSchema, webSiteSchema];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
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
