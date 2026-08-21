import Link from 'next/link';
import { db } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';

export default async function OffersPage() {
  let posts: any[] = [];
  try {
    posts = await db.contentItem.findMany({
      where: { type: 'PROMOTION' },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.warn("DB offline, falling back to empty state.");
  }

  return (
    <div className="space-y-6 text-foreground text-right" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">إدارة العروض</h1>
          <p className="text-muted-foreground mt-1">
            إنشاء وتعديل ونشر العروض الترويجية والخصومات لموقع وان تاير.
          </p>
        </div>
        <Link href="/admin/offers/new" className={buttonVariants({ variant: 'default' })}>
          إنشاء عرض جديد
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-right">قائمة العروض والخصومات</CardTitle>
          <CardDescription className="text-right">إدارة العروض الترويجية النشطة والمسودات.</CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              لا توجد عروض حالياً. اضغط على "إنشاء عرض جديد" لإضافة عرضك الأول!
            </div>
          ) : (
            <div className="divide-y">
              {posts.map((post: any) => (
                <div key={post.id} className="flex items-center justify-between py-4">
                  <div className="space-y-1 text-right">
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <p className="text-xs text-muted-foreground">الرابط الفريد: /{post.slug}</p>
                    <p className="text-xs text-muted-foreground">
                      تاريخ الإنشاء: {new Date(post.createdAt).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={post.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                      {post.status === 'PUBLISHED' ? 'منشور' : 'مسودة'}
                    </Badge>
                    <Link href={`/admin/offers/${post.id}`} className={buttonVariants({ variant: 'default', size: 'sm' })}>
                      تعديل
                    </Link>
                    <Link href={`/offers`} target="_blank" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                      عرض الكل
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
