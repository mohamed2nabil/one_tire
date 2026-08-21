import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SiteNav } from '@/components/site/site-nav';
import { SiteFooter } from '@/components/site/site-footer';
import { cookies } from 'next/headers';
import { Locale } from '@/lib/dictionaries';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = parseInt(params.id);
  
  if (isNaN(id)) {
    notFound();
  }

  const post = await db.contentItem.findUnique({
    where: { id: id }
  });

  if (!post || (post.status !== 'PUBLISHED' && process.env.NODE_ENV !== 'development')) {
    notFound();
  }

  const isPromo = post.type === 'PROMOTION';
  const cookieStore = await cookies();
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || 'ar') as Locale;

  return (
    <>
      <SiteNav locale={locale} />
      <div className="min-h-screen bg-background text-foreground pt-28 pb-12" dir="rtl">
        <article className="container mx-auto max-w-4xl px-5 sm:px-8">
          <Link 
            href={isPromo ? "/offers" : "/blog"} 
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), "mb-6 hover:bg-muted font-semibold")}
          >
            <ArrowRight className="ml-2 h-4 w-4" /> {isPromo ? 'العودة إلى العروض' : 'العودة إلى المدونة'}
          </Link>
          
          <header className="mb-10 space-y-4 text-center">
            <span className="text-sm font-semibold tracking-widest text-primary">
              {isPromo ? 'عرض خاص' : 'مقال'}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-balance leading-tight">
              {post.title}
            </h1>
            <p className="text-muted-foreground font-medium text-sm">
              {new Date(post.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          {post.coverImage && (
            <div className="relative w-full aspect-[16/9] max-w-3xl mx-auto rounded-3xl overflow-hidden mb-12 border border-border shadow-md">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <div 
            className="prose prose-lg dark:prose-invert mx-auto max-w-3xl prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-img:rounded-2xl text-right prose-p:leading-relaxed prose-p:text-lg" 
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} 
          />
        </article>
      </div>
      <SiteFooter locale={locale} />
    </>
  );
}
