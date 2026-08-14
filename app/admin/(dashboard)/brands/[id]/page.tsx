import { db } from '@/lib/db';
import { saveBrand, deleteBrand } from '@/app/actions/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { redirect } from 'next/navigation';
import { ImagePickerField } from '@/components/admin/image-picker-field';

export default async function BrandEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const isNew = params.id === 'new';
  const brand = isNew ? null : await db.brand.findUnique({ where: { id: parseInt(params.id) } });

  async function handleSave(formData: FormData) {
    'use server';
    await saveBrand({
      id: isNew ? undefined : parseInt(params.id),
      name: formData.get('name') as string,
      logoUrl: formData.get('logoUrl') as string,
      isVisible: formData.get('isVisible') === 'on',
      order: parseInt(formData.get('order') as string) || 0,
    });
    redirect('/admin/brands');
  }

  async function handleDelete() {
    'use server';
    if (!isNew) {
      await deleteBrand(parseInt(params.id));
      redirect('/admin/brands');
    }
  }

  return (
    <div className="max-w-2xl space-y-6 text-right" dir="rtl">
      <h1 className="text-3xl font-bold">{isNew ? 'إضافة ماركة جديدة' : 'تعديل الماركة'}</h1>
      
      <form action={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">اسم الماركة</label>
          <Input name="name" defaultValue={brand?.name || ''} required className="text-right" />
        </div>
        
        <ImagePickerField
          name="logoUrl"
          label="شعار الماركة"
          defaultValue={brand?.logoUrl || ''}
          placeholder="/uploads/brands/logo.png"
        />
        
        <div>
          <label className="block text-sm font-medium mb-1">ترتيب العرض</label>
          <Input name="order" type="number" defaultValue={brand?.order || 0} className="text-right" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="isVisible" id="isVisible" defaultChecked={brand?.isVisible ?? true} />
          <label htmlFor="isVisible" className="mr-2">عرض الماركة على الموقع</label>
        </div>

        <div className="flex gap-2 pt-4 justify-end">
          <Button type="submit">حفظ الماركة</Button>
          {!isNew && (
            <Button type="submit" variant="destructive" formAction={handleDelete}>
              حذف الماركة
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
