import { db } from '@/lib/db';
import { saveTestimonial, deleteTestimonial } from '@/app/actions/admin';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function TestimonialEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const isNew = params.id === 'new';
  let testimonial: any = null;

  try {
    if (!isNew) {
      testimonial = await db.testimonial.findUnique({ where: { id: parseInt(params.id, 10) } });
    }
  } catch (error) {
    console.warn("DB fetch error in testimonial edit page:", error);
  }

  async function handleSave(formData: FormData) {
    'use server';
    await saveTestimonial({
      id: isNew ? undefined : parseInt(params.id, 10),
      clientName: formData.get('clientName') as string,
      city: formData.get('city') as string,
      text: formData.get('text') as string,
      rating: parseInt(formData.get('rating') as string, 10) || 5,
      isVisible: formData.get('isVisible') === 'on',
      order: parseInt(formData.get('order') as string, 10) || 0,
    });
    redirect('/admin/testimonials');
  }

  async function handleDelete() {
    'use server';
    if (!isNew) {
      await deleteTestimonial(parseInt(params.id, 10));
      redirect('/admin/testimonials');
    }
  }

  return (
    <div className="max-w-2xl space-y-6 text-foreground text-right" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {isNew ? 'إضافة تقييم جديد' : 'تعديل تقييم العميل'}
        </h1>
        <p className="text-muted-foreground mt-1">تأكد من ملء بيانات اسم العميل والمدينة والنص.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-right">تفاصيل التقييم</CardTitle>
          <CardDescription className="text-right">بيانات التقييم التي تظهر للزوار في قسم آراء العملاء.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label>اسم العميل</Label>
              <Input name="clientName" defaultValue={testimonial?.clientName || ''} placeholder="مثال: عبدالله القحطاني" required className="text-right" />
            </div>
            <div className="space-y-2">
              <Label>المدينة</Label>
              <Input name="city" defaultValue={testimonial?.city || ''} placeholder="مثال: الدمام" className="text-right" />
            </div>
            <div className="space-y-2">
              <Label>نص التقييم / الرأي</Label>
              <Textarea name="text" defaultValue={testimonial?.text || ''} placeholder="اكتب رأي العميل هنا..." required rows={4} className="text-right" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label>التقييم من 5</Label>
                <Input name="rating" type="number" min="1" max="5" defaultValue={testimonial?.rating || 5} className="text-right" />
              </div>
              <div className="flex-1 space-y-2">
                <Label>ترتيب الظهور</Label>
                <Input name="order" type="number" defaultValue={testimonial?.order || 0} className="text-right" />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" name="isVisible" id="isVisible" defaultChecked={testimonial?.isVisible ?? true} className="size-4 accent-primary" />
              <Label htmlFor="isVisible" className="cursor-pointer">إظهار التقييم على الموقع</Label>
            </div>

            <div className="flex justify-between items-center pt-6 border-t mt-4">
              <div className="flex gap-2">
                <Button type="submit">حفظ</Button>
                <Link href="/admin/testimonials" className={buttonVariants({ variant: 'ghost' })}>
                  إلغاء
                </Link>
              </div>
              {!isNew && (
                <Button type="submit" variant="destructive" formAction={handleDelete}>
                  حذف التقييم
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
