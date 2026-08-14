import { Metadata } from 'next';
import { getCachedSettings } from '@/lib/settings';

export async function generateSiteMeta(locale: 'ar' | 'en' = 'ar'): Promise<Metadata> {
  const settings = await getCachedSettings();
  
  const title = locale === 'ar' ? (settings.seo_title_ar || 'تواير ون | خدمة الإطارات المتنقلة الفاخرة') : (settings.seo_title_en || 'One Tire | Premium Mobile Tire Service');
  const description = locale === 'ar' ? (settings.seo_desc_ar || 'تواير ون — خدمة متنقلة لتغيير الإطارات والإصلاح الطارئ في المنطقة الشرقية.') : (settings.seo_desc_en || 'One Tire — Mobile tire replacement and emergency repair in the Eastern Province.');
  const ogImage = settings.seo_og_image || '/images/site/og-default.jpg';
  
  const defaultKeywords = [
    'بنشر متنقل', 'كفرات سيارات', 'كفر سيارة', 'تبديل كفرات', 'تغيير كفرات', 
    'ترصيص كفرات', 'ميزان كفرات', 'وزن أذرعة', 'بنشري قريب مني', 'أقرب بنشر من موقعي', 
    'رقع كفر', 'إصلاح بنشر', 'أسعار الكفرات في السعودية', 'عروض الكفرات', 
    'تبديل كفرات عند البيت', 'ورشة سيارات', 'ورشة ميكانيكا', 'صيانة سيارات متنقلة', 
    'تغيير زيت وسيفون', 'فحص كمبيوتر للسيارات', 'كهربائي سيارات', 'كهربائي سيارات متنقل', 'سطحة'
  ];
  
  const keywords = settings.seo_keywords
    ? settings.seo_keywords.split(',').map((k: string) => k.trim())
    : defaultKeywords;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    }
  };
}
