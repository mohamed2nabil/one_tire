import { getBrands } from '@/app/actions/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function BrandsAdminPage() {
  let brands: any[] = [];
  try {
    brands = await getBrands();
  } catch (error) {
    console.warn("DB offline or missing table", error);
  }

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة العلامات التجارية</h1>
          <p className="text-muted-foreground mt-1">إدارة شعارات ماركات الإطارات المعروضة في الصفحة الرئيسية.</p>
        </div>
        <Link href="/admin/brands/new">
          <Button>إضافة ماركة جديدة</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-right">جميع العلامات التجارية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {brands.length === 0 && <p className="py-4 text-muted-foreground text-sm text-center">لا توجد ماركات مضافة بعد.</p>}
            {brands.map((b) => (
              <div key={b.id} className="py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {b.logoUrl && (
                    <div className="relative w-16 h-8 bg-gray-100 rounded">
                      <Image src={b.logoUrl} alt={b.name} fill className="object-contain" unoptimized />
                    </div>
                  )}
                  <h3 className="font-semibold">{b.name}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={b.isVisible ? 'default' : 'secondary'}>
                    {b.isVisible ? 'مرئي' : 'مخفي'}
                  </Badge>
                  <Link href={`/admin/brands/${b.id}`}>
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
