import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cairo, Tajawal, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
})

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '800', '900'],
  variable: '--font-sora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://one-tire.com'),
  title: 'ون تاير One Tire | بنشر متنقل ومساعدة على الطريق',
  description:
    'خدمة بنشر متنقل، تغيير وإصلاح الإطارات، ومساعدة على الطريق على مدار الساعة في الرياض، الدمام، الخبر، والجبيل. سياراتنا المتنقلة تصلك أينما كنت.',
  generator: 'v0.app',
  keywords: [
    'بنشر متنقل',
    'مساعدة على الطريق',
    'تغيير إطارات',
    'بنشر الرياض',
    'بنشر الدمام',
    'تصليح كفرات',
    'ون تاير',
    'One Tire',
  ],
  openGraph: {
    title: 'ون تاير One Tire | بنشر متنقل ومساعدة على الطريق',
    description: 'خدمة بنشر متنقل، تغيير وإصلاح الإطارات، ومساعدة على الطريق على مدار الساعة في الرياض، الدمام، الخبر، والجبيل.',
    type: 'website',
    locale: 'ar_SA',
    url: 'https://one-tire.com',
    siteName: 'One Tire',
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
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value === 'en' ? 'en' : 'ar'
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} className={`${cairo.variable} ${tajawal.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground transition-colors duration-500" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
