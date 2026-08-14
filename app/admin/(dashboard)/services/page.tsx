import { getServiceItems } from '@/app/actions/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ServicesAdminPage() {
  let services: any[] = [];
  try {
    services = await getServiceItems();
  } catch (error) {
    console.warn("DB offline or missing table", error);
  }

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة الخدمات</h1>
          <p className="text-muted-foreground mt-1">إدارة الخدمات المتاحة على الموقع الرئيسي.</p>
        </div>
        <Link href="/admin/services/new">
          <Button>إضافة خدمة جديدة</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-right">جميع الخدمات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {services.length === 0 && <p className="py-4 text-muted-foreground text-sm text-center">لا توجد خدمات حالياً.</p>}
            {services.map((s) => (
              <div key={s.id} className="py-4 flex justify-between items-center">
                <div className="text-right">
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{s.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={s.isVisible ? 'default' : 'secondary'}>
                    {s.isVisible ? 'مرئي' : 'مخفي'}
                  </Badge>
                  <Link href={`/admin/services/${s.id}`}>
                    <Button variant="outline" size="sm">تعديل</Button>
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
