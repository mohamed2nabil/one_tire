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
  title: 'تواير ون | خدمة الإطارات المتنقلة الفاخرة في الدمام والخبر والجبيل',
  description:
    'تواير ون — خدمة متنقلة لتغيير الإطارات، الإصلاح الطارئ، استبدال البطاريات وبرمجة حساسات الضغط. نصل إليك أينما كنت في المنطقة الشرقية بسرعة واحترافية. اتصل الآن 057 364 9433.',
  generator: 'v0.app',
  keywords: [
    'تغيير إطارات متنقل',
    'خدمة إطارات الدمام',
    'إطارات الخبر',
    'إطارات الجبيل',
    'برمجة حساسات الإطارات',
    'استبدال بطاريات السيارة',
    'mobile tire service Saudi Arabia',
  ],
  openGraph: {
    title: 'تواير ون | خدمة الإطارات المتنقلة الفاخرة',
    description: 'نصل إليك أينما كنت — تغيير إطارات، إصلاح طارئ، بطاريات وبرمجة حساسات في المنطقة الشرقية.',
    type: 'website',
    locale: 'ar_SA',
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
