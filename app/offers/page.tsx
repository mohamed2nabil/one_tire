import { db } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Tag, Calendar, ChevronLeft, ChevronRight, Percent } from 'lucide-react';
import { SiteNav } from '@/components/site/site-nav';
import { SiteFooter } from '@/components/site/site-footer';
import { getCachedSettings } from '@/lib/settings';
import { buttonVariants } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function OffersPage() {
  let posts: any[] = [];
  try {
    posts = await db.contentItem.findMany({
      where: { type: 'PROMOTION', status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.warn("DB offline, falling back to empty state.");
  }

  const settings = await getCachedSettings();
  const title = settings.offers_title_ar || 'عروض وخصومات وان تاير الحصرية';
  const desc = settings.offers_desc_ar || 'اكتشف أقوى العروض والخصومات على خدمات كفرات السيارات، تبديل الإطارات، وتغيير زيت وسيفون السيارة عند البيت.';

  // Top 3 offers for the Hero Slider
  const sliderOffers = posts.slice(0, 3);
  // Rest of the offers
  const gridOffers = posts.slice(3);

  return (
    <>
      <SiteNav locale="ar" />
      
      <div className="min-h-screen bg-background text-foreground pt-28 pb-16" dir="rtl">
        <div className="container mx-auto max-w-6xl px-5 sm:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto pt-6">
            <span className="text-sm font-semibold tracking-widest text-primary flex items-center justify-center gap-2">
              <Percent className="w-4 h-4" />
              خصومات حصرية
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight text-balance leading-none">
              {title}
            </h1>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              {desc}
            </p>
          </div>

          {/* Premium Hero Scroll Slider */}
          {sliderOffers.length > 0 && (
            <div className="relative group">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2.5 h-6 rounded-full bg-primary inline-block" />
                العروض البارزة
              </h2>
              
              {/* Horizontal Scroll Snap Container */}
              <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-none">
                {sliderOffers.map((post) => (
                  <div 
                    key={post.id} 
                    className="w-full md:w-[80vw] lg:w-[100%] shrink-0 snap-center relative rounded-3xl overflow-hidden aspect-[16/7] min-h-[300px] border bg-card"
                  >
                    {/* Cover Image */}
                    {post.coverImage ? (
                      <Image 
                        src={post.coverImage} 
                        alt={post.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-purple-500/20" />
                    )}

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow">
                      عرض مميز
                    </div>

                    {/* Glassmorphism Text Content Panel */}
                    <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 flex flex-col justify-end text-white text-right space-y-4">
                      <div className="space-y-2 max-w-2xl">
                        <span className="text-xs text-primary font-bold tracking-widest flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          عروض الصيف الحالية
                        </span>
                        <h3 className="text-2xl md:text-4xl font-extrabold font-display leading-tight text-shadow">
                          {post.title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-base line-clamp-2 font-medium">
                          {post.metaDescription || post.content.substring(0, 180).replace(/<[^>]*>?/gm, '') + '...'}
                        </p>
                      </div>

                      <div className="pt-2">
                        <Link 
                          href={`/offers/${post.id}`} 
                          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-6 py-3 rounded-full text-sm transition-all hover:translate-x-[-4px] shadow-lg shadow-primary/20"
                        >
                          احصل على العرض الآن
                          <ArrowLeft className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll indicators hint */}
              <div className="flex justify-center gap-1.5 mt-4">
                {sliderOffers.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-primary w-5' : 'bg-muted-foreground/30'} transition-all`} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Grid Offers Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-2.5 h-6 rounded-full bg-primary inline-block" />
              أحدث العروض المتوفرة
            </h2>

            {posts.length === 0 ? (
              <div className="text-center py-20 border border-dashed rounded-3xl text-muted-foreground">
                لا توجد عروض متاحة حالياً. تابعنا قريباً لتصفح أحدث الخصومات!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(sliderOffers.length > 0 ? gridOffers : posts).map((post) => (
                  <Link key={post.id} href={`/offers/${post.id}`} className="group h-full block">
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 bg-card rounded-3xl relative">
                      
                      {/* Percent Tag */}
                      <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-[10px] font-extrabold px-2.5 py-1.5 rounded-full z-10 flex items-center gap-1 shadow">
                        <Percent className="w-3 h-3" />
                        خصم خاص
                      </div>

                      {/* Image Preview */}
                      <div className="relative aspect-[16/10] w-full bg-muted overflow-hidden">
                        {post.coverImage ? (
                          <Image 
                            src={post.coverImage} 
                            alt={post.title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-105" 
                            sizes="(max-width: 768px) 100vw, 33vw"
                            unoptimized
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-orange-500/10" />
                        )}
                      </div>

                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.createdAt).toLocaleDateString('ar-SA')}
                          </span>
                          <h3 className="text-xl font-bold font-display leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                        </div>

                        <p className="text-muted-foreground text-sm line-clamp-3 font-medium">
                          {post.metaDescription || post.content.substring(0, 150).replace(/<[^>]*>?/gm, '') + '...'}
                        </p>
                        
                        <div className="pt-2 border-t flex justify-between items-center text-sm font-bold text-primary">
                          <span>تفاصيل العرض</span>
                          <ArrowLeft className="w-4 h-4 transition-transform group-hover:translate-x-[-4px]" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <SiteFooter locale="ar" />
    </>
  );
}
