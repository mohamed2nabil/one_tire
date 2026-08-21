import { db } from '@/lib/db';
import { MediaGrid } from '@/components/admin/media-grid';
import { getSiteSettings, saveSiteSettings } from '@/app/actions/admin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImagePickerField } from '@/components/admin/image-picker-field';

export const dynamic = 'force-dynamic';

export default async function MediaPage() {
  let mediaList: any[] = [];
  try {
    mediaList = await db.mediaItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.warn("Media fetch error", error);
  }

  let settings: Record<string, any> = {};
  try {
    settings = await getSiteSettings();
  } catch (e) {
    console.warn("Settings fetch error", e);
  }

  async function handleSave(formData: FormData) {
    'use server';
    const payload: Record<string, any> = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    await saveSiteSettings(payload);
  }

  return (
    <div className="space-y-12 text-foreground max-w-6xl text-right" dir="rtl">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">إدارة الصور والوسائط (Media)</h1>
        <p className="text-muted-foreground mt-1">
          قم بتغيير الصور الفردية الأساسية في الموقع (مثل صورة "لماذا نحن")، بالإضافة إلى إدارة جميع الملفات المرفوعة.
        </p>
      </div>

      <form action={handleSave}>
        <Card className="border-primary/20 shadow-md">
          <CardHeader>
            <CardTitle className="text-right">الصور الرئيسية للموقع (Site Images)</CardTitle>
            <CardDescription className="text-right">
              غيّر الصور الظاهرة في الأقسام الرئيسية في الصفحة الرئيسية بسهولة.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <ImagePickerField 
              name="why_image" 
              label="صورة سيارة الخدمة (قسم لماذا نحن)" 
              defaultValue={settings.why_image || ''} 
              placeholder="/images/site/one-tire-van.jpeg" 
            />
            <ImagePickerField 
              name="cta_image" 
              label="صورة قسم التواصل (أسفل الموقع)" 
              defaultValue={settings.cta_image || ''} 
              placeholder="/images/site/one-tire-van.jpeg" 
            />
            <ImagePickerField 
              name="seo_og_image" 
              label="صورة المشاركة على منصات التواصل (OG Image)" 
              defaultValue={settings.seo_og_image || ''} 
              placeholder="تظهر عند إرسال الرابط في واتساب" 
            />
          </CardContent>
          <div className="p-4 bg-muted/30 border-t flex justify-end rounded-b-xl">
            <Button type="submit">حفظ الصور الجديدة</Button>
          </div>
        </Card>
      </form>

      <div className="pt-8 border-t">
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-right">مكتبة الوسائط العامة</h2>
        <MediaGrid initialMedia={mediaList} />
      </div>

    </div>
  );
}
