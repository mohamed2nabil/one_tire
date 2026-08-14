import { db } from '@/lib/db';
import { saveServiceItem, deleteServiceItem } from '@/app/actions/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { redirect } from 'next/navigation';
import { ImagePickerField } from '@/components/admin/image-picker-field';

export default async function ServiceEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const isNew = params.id === 'new';
  const service = isNew ? null : await db.serviceItem.findUnique({ where: { id: parseInt(params.id) } });

  async function handleSave(formData: FormData) {
    'use server';
    await saveServiceItem({
      id: isNew ? undefined : parseInt(params.id),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      iconName: formData.get('iconName') as string || null,
      imageUrl: formData.get('imageUrl') as string || null,
      isVisible: formData.get('isVisible') === 'on',
      order: parseInt(formData.get('order') as string) || 0,
    });
    redirect('/admin/services');
  }

  async function handleDelete() {
    'use server';
    if (!isNew) {
      await deleteServiceItem(parseInt(params.id));
      redirect('/admin/services');
    }
  }

  return (
    <div className="max-w-2xl space-y-6 text-right" dir="rtl">
      <h1 className="text-3xl font-bold">{isNew ? 'إضافة خدمة جديدة' : 'تعديل الخدمة'}</h1>
      
      <form action={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">اسم الخدمة</label>
          <Input name="title" defaultValue={service?.title || ''} required className="text-right" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">الوصف والتفاصيل</label>
          <Textarea name="description" defaultValue={service?.description || ''} required rows={3} className="text-right" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">اسم الأيقونة (اختياري - من Lucide)</label>
          <Input name="iconName" defaultValue={service?.iconName || ''} className="text-right font-mono" />
        </div>
        
        <ImagePickerField
          name="imageUrl"
          label="صورة الخدمة (اختياري)"
          defaultValue={service?.imageUrl || ''}
          placeholder="/uploads/services/service.jpg"
        />

        <div>
          <label className="block text-sm font-medium mb-1">ترتيب العرض</label>
          <Input name="order" type="number" defaultValue={service?.order || 0} className="text-right" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="isVisible" id="isVisible" defaultChecked={service?.isVisible ?? true} />
          <label htmlFor="isVisible" className="mr-2">عرض الخدمة على الموقع</label>
        </div>

        <div className="flex gap-2 pt-4 justify-end">
          <Button type="submit">حفظ الخدمة</Button>
          {!isNew && (
            <Button type="submit" variant="destructive" formAction={handleDelete}>
              حذف الخدمة
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
