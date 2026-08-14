import { db } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { SiteNav } from '@/components/site/site-nav';
import { SiteFooter } from '@/components/site/site-footer';
import { cookies } from 'next/headers';
import { Locale } from '@/lib/dictionaries';

export const dynamic = 'force-dynamic';

export default async function BlogListPage() {
  const posts = await db.contentItem.findMany({
    where: { type: 'ARTICLE', status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' }
  });

  const cookieStore = await cookies();
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'ar') as Locale;

  return (
    <>
      <SiteNav locale={locale} />
      <div className="min-h-screen bg-background text-foreground pt-28 pb-12" dir="rtl">
        <div className="container mx-auto max-w-6xl px-5 sm:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-sm font-semibold tracking-widest text-primary">المدونة</span>
            <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-balance">
              مقالات ونصائح تهمّك على الطريق
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              ابقَ على اطلاع بأحدث الأخبار، والنصائح، والمعلومات حول صيانة السيارات والإطارات.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">لم يتم نشر أي مقالات بعد.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group h-full">
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 bg-card rounded-3xl">
                    <div className="relative aspect-[16/10] w-full bg-muted overflow-hidden">
                      {post.coverImage && (
                        <Image 
                          src={post.coverImage} 
                          alt={post.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                      )}
                      <span className="absolute right-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                        مقال
                      </span>
                    </div>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-2 line-clamp-2 font-display group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {post.metaDescription || post.content.substring(0, 150).replace(/<[^>]*>?/gm, '') + '...'}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        اقرأ المزيد
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <SiteFooter locale={locale} />
    </>
  );
}
