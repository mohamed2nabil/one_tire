import { getTestimonials } from '@/app/actions/admin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function TestimonialsAdminPage() {
  let testimonials: any[] = [];
  try {
    testimonials = await getTestimonials();
  } catch (error) {
    console.warn("DB offline or missing table", error);
  }

  return (
    <div className="space-y-6 text-foreground text-right" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">إدارة آراء العملاء</h1>
          <p className="text-muted-foreground mt-1">التحكم في تقييمات وآراء العملاء المعروضة على الموقع.</p>
        </div>
        <Link href="/admin/testimonials/new" className={buttonVariants({ variant: 'default' })}>
          إضافة رأي جديد
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-right">قائمة التقييمات وآراء العملاء</CardTitle>
          <CardDescription className="text-right">يمكنك تعديل أي رأي أو التحكم في ظهوره على الموقع الرئيسية.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {testimonials.length === 0 && (
              <p className="py-8 text-center text-muted-foreground text-sm">
                لا توجد تقييمات مضافة حالياً. اضغط على "إضافة رأي جديد" لإضافة تقييمك الأول.
              </p>
            )}
            {testimonials.map((t) => (
              <div key={t.id} className="py-4 flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-semibold text-base">
                    {t.clientName} {t.city ? `(${t.city})` : ''}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={t.isVisible ? 'default' : 'secondary'}>
                    {t.isVisible ? 'ظاهر بالموقع' : 'مخفي'}
                  </Badge>
                  <Link href={`/admin/testimonials/${t.id}`} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                    تعديل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
