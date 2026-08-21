import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Reveal } from './reveal'
import { db } from '@/lib/db'

const fallbackPosts = [
  {
    id: '1',
    slug: '#',
    coverImage: '/images/blog/blog-tire-care.png',
    tag: 'العناية بالإطارات',
    title: 'متى يجب تغيير إطارات سيارتك؟ 5 علامات لا تتجاهلها',
  },
  {
    id: '2',
    slug: '#',
    coverImage: '/images/blog/blog-tpms.png',
    tag: 'حساسات الضغط',
    title: 'كل ما تحتاج معرفته عن نظام مراقبة ضغط الإطارات TPMS',
  },
  {
    id: '3',
    slug: '#',
    coverImage: '/images/blog/blog-battery.png',
    tag: 'البطاريات',
    title: 'كيف تطيل عمر بطارية سيارتك في حرارة الصيف؟',
  },
]

export async function Blog() {
  let posts: any[] = []
  try {
    posts = await db.contentItem.findMany({
      where: { type: 'ARTICLE', status: 'PUBLISHED' },
      take: 3,
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
  }

  // Fallback to mock data if database is empty or offline
  if (!posts || posts.length === 0) {
    posts = fallbackPosts
  }

  return (
    <section id="blog" className="relative border-t border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold tracking-widest text-primary">المدونة</span>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              نصائح تهمّك على الطريق
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-transform hover:-translate-x-1"
          >
            كل المقالات
            <ArrowLeft className="size-4" />
          </Link>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={p.slug !== '#' ? `/blog/${p.id}` : '#'}
              className="group overflow-hidden rounded-3xl border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {p.coverImage && (
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                )}
                <span className="absolute right-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                  {p.tag || 'مقال'}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-balance font-display text-lg font-bold leading-snug transition-colors group-hover:text-primary line-clamp-2">
                  {p.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  اقرأ المزيد
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
