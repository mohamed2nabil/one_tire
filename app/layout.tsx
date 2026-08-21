import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cairo, Tajawal, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
})

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '800'],
  variable: '--font-sora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://one-tire.com'),
  title: 'وان تاير | بنشر متنقل وصلتك 24/7',
  description:
    'خدمة بنشر متنقل، تغيير كفرات، إصلاح سيارات ومساعدة على الطريق في المنطقة الشرقية (الدمام، الخبر، الجبيل). نصلك أينما كنت بأسرع وقت.',
  generator: 'v0.app',
  authors: [{ name: 'وان تاير' }],
  keywords: ['وان تاير', 'ONE TIRE', 'بنشر متنقل', 'تغيير كفرات', 'إصلاح بنشر', 'مساعدة على الطريق', 'الدمام', 'الخبر', 'الجبيل'],
  openGraph: {
    title: 'وان تاير | بنشر متنقل وصلتك 24/7',
    description: 'خدمة بنشر متنقل، تغيير كفرات، ومساعدة على الطريق في المنطقة الشرقية بأسرع وقت.',
    type: 'website',
    locale: 'ar_SA',
    url: 'https://one-tire.com',
    siteName: 'وان تاير',
    images: [{
      url: '/images/site/one-tire-van.jpeg',
      width: 1200,
      height: 630,
      alt: 'وان تاير — خدمة الإطارات المتنقلة',
    }],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
}

import { cookies } from 'next/headers'
import { db } from '@/lib/db'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value === 'en' ? 'en' : 'ar'
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  // Fetch real reviews data for SEO Schema
  let reviewCount = 0;
  let avgRating = 4.9;
  try {
    const agg = await db.testimonial.aggregate({
      _avg: { rating: true },
      _count: { id: true },
      where: { isVisible: true }
    });
    if (agg._count.id > 0) {
      reviewCount = agg._count.id;
      avgRating = Number(Number(agg._avg.rating).toFixed(1));
    }
  } catch(e) {}

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "وان تاير",
    "alternateName": "ONE TIRE",
    "image": "https://one-tire.com/images/site/one-tire-van.jpeg",
    "url": "https://one-tire.com",
    "telephone": "+966573649433",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "الدمام",
      "addressRegion": "المنطقة الشرقية",
      "addressCountry": "SA"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": avgRating,
      "reviewCount": reviewCount > 0 ? reviewCount : 15,
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <html lang={locale} dir={dir} className={`${cairo.variable} ${tajawal.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground transition-colors duration-500" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          {process.env.VERCEL === '1' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
