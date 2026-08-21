import { Metadata } from 'next';
import { getCachedSettings } from '@/lib/settings';

export async function generateSiteMeta(locale: 'ar' | 'en' = 'ar', path: string = ''): Promise<Metadata> {
  const settings = await getCachedSettings();
  
  const title = locale === 'ar' ? (settings.seo_title_ar || 'وان تاير | بنشر متنقل وصلتك 24/7') : (settings.seo_title_en || 'ONE TIRE | Premium Mobile Tire Service');
  const description = locale === 'ar' ? (settings.seo_desc_ar || 'وان تاير — خدمة متنقلة لتغيير الإطارات والإصلاح الطارئ في المنطقة الشرقية.') : (settings.seo_desc_en || 'ONE TIRE — Mobile tire replacement and emergency repair in the Eastern Province.');
  const ogImage = settings.seo_og_image || '/images/site/one-tire-van.jpeg'; // ponytail: Fixed missing OG image path
  
  const defaultKeywords = [
    'وان تاير', 'ONE TIRE', 'بنشر متنقل', 'تغيير كفرات', 'إصلاح بنشر', 'تبديل كفرات عند البيت', 'مساعدة على الطريق'
  ];
  
  const keywords = settings.seo_keywords
    ? settings.seo_keywords.split(',').map((k: string) => k.trim())
    : defaultKeywords;

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'وان تاير' }],
    alternates: {
      canonical: `https://one-tire.com${path}`,
      languages: {
        'ar-SA': `https://one-tire.com${path}`,
        'en-US': `https://one-tire.com/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://one-tire.com${path}`,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'وان تاير — خدمة الإطارات المتنقلة',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/icon.png', type: 'image/png', sizes: '512x512' }
      ],
      apple: '/apple-icon.png'
    }
  };
}
