import { getSiteSettings, saveSiteSettings } from '@/app/actions/admin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImagePickerField } from '@/components/admin/image-picker-field';
import { dictionaries } from '@/lib/dictionaries';

export const dynamic = 'force-dynamic';

export default async function SettingsAdminPage() {
  let settings: Record<string, any> = {};
  try {
    settings = await getSiteSettings();
  } catch (error) {
    console.warn("DB offline, settings will use website defaults.");
  }

  async function handleSave(formData: FormData) {
    'use server';
    const payload: Record<string, any> = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    await saveSiteSettings(payload);
  }

  const ar = dictionaries.ar;
  const en = dictionaries.en;

  return (
    <div className="max-w-5xl space-y-8 pb-12 text-right" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">إعدادات الموقع والمحتوى</h1>
        <p className="text-muted-foreground mt-1">
          إدارة النصوص العامة والصور التوضيحية والأقسام المختلفة. تظهر القيم الحالية للموقع تلقائياً لمساعدتك.
        </p>
      </div>

      <form action={handleSave} className="space-y-8">
        
        {/* MEDIA SETTINGS */}
        <Card>
          <CardHeader>
            <CardTitle className="text-right">الصور الرئيسية للموقع (المواقع والصور التوضيحية)</CardTitle>
            <CardDescription className="text-right">
              اختر أو غيّر الصور الظاهرة في الأقسام الرئيسية. كل صورة موضح مكانها بدقة.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <ImagePickerField 
              name="hero_bg" 
              label="1. صورة خلفية قسم الهيرو (أعلى الصفحة الرئيسية)" 
              defaultValue={settings.hero_bg || ''} 
              placeholder="/images/hero-bg.jpg (افتراضي)" 
            />
            <ImagePickerField 
              name="why_image" 
              label="2. صورة سيارة الخدمة / قسم (لماذا تختارنا)" 
              defaultValue={settings.why_image || ''} 
              placeholder="/images/why-van.png (صورة الفان الأبيض)" 
            />
            <ImagePickerField 
              name="cta_image" 
              label="3. صورة خلفية قسم (اتصل بنا والأسفل)" 
              defaultValue={settings.cta_image || ''} 
              placeholder="/images/cta-bg.jpg (خلفية اتصل بنا)" 
            />
            <ImagePickerField 
              name="seo_og_image" 
              label="4. صورة المشاركة على منصات التواصل (OG Social Share Image)" 
              defaultValue={settings.seo_og_image || ''} 
              placeholder="/uploads/site/og.jpg (صورة كارت الواتساب وتويتر)" 
            />
          </CardContent>
        </Card>

        {/* SEO SETTINGS */}
        <Card>
          <CardHeader>
            <CardTitle className="text-right">تهيئة محركات البحث (SEO & Meta)</CardTitle>
            <CardDescription className="text-right">العناوين والوصف للظهور بشكل ممتاز في نتائج جوجل بالسعودية.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>عنوان الموقع - عربي (Title Tag)</Label>
              <Input 
                name="seo_title_ar" 
                defaultValue={settings.seo_title_ar || 'تواير ون | خدمة الإطارات المتنقلة الفاخرة في المنطقة الشرقية'} 
                className="text-right" 
              />
            </div>
            <div className="space-y-2">
              <Label>عنوان الموقع - إنجليزي (Title Tag)</Label>
              <Input 
                name="seo_title_en" 
                defaultValue={settings.seo_title_en || 'ONE TIRE | Premium Mobile Tire Service'} 
                className="text-right" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>وصف الموقع - عربي (Meta Description)</Label>
              <Textarea 
                name="seo_desc_ar" 
                defaultValue={settings.seo_desc_ar || ar.hero.desc} 
                rows={2} 
                className="text-right" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>وصف الموقع - إنجليزي (Meta Description)</Label>
              <Textarea 
                name="seo_desc_en" 
                defaultValue={settings.seo_desc_en || en.hero.desc} 
                rows={2} 
                className="text-right" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>الكلمات المفتاحية المستهدفة (SEO Keywords - افصل بينها بفاصلة)</Label>
              <Textarea 
                name="seo_keywords" 
                defaultValue={settings.seo_keywords || 'بنشر متنقل, كفرات سيارات, تبديل كفرات, ترصيص كفرات, ميزان كفرات, وزن أذرعة, بنشري قريب مني, رقع كفر, إصلاح بنشر, تبديل كفرات عند البيت, ورشة سيارات متنقلة, تغيير زيت وسيفون, كهربائي سيارات متنقل, سطحة'} 
                rows={3} 
                className="text-right font-medium" 
              />
            </div>
          </CardContent>
        </Card>

        {/* HERO SECTION */}
        <Card>
          <CardHeader>
            <CardTitle className="text-right">القسم الرئيسي بالواجهة (Hero Section)</CardTitle>
            <CardDescription className="text-right">العناوين الرئيسية الكبيرة في بداية الواجهة والموقع.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>العنوان الأول - عربي</Label>
              <Input name="hero_title1_ar" defaultValue={settings.hero_title1_ar || ar.hero.title1} className="text-right" />
            </div>
            <div className="space-y-2">
              <Label>العنوان الأول - إنجليزي</Label>
              <Input name="hero_title1_en" defaultValue={settings.hero_title1_en || en.hero.title1} className="text-right" />
            </div>
            <div className="space-y-2">
              <Label>العنوان الثاني - المميز - عربي</Label>
              <Input name="hero_title2_ar" defaultValue={settings.hero_title2_ar || ar.hero.title2} className="text-right" />
            </div>
            <div className="space-y-2">
              <Label>العنوان الثاني - المميز - إنجليزي</Label>
              <Input name="hero_title2_en" defaultValue={settings.hero_title2_en || en.hero.title2} className="text-right" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>الوصف الرئيسي - عربي</Label>
              <Textarea name="hero_desc_ar" defaultValue={settings.hero_desc_ar || ar.hero.desc} rows={2} className="text-right" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>الوصف الرئيسي - إنجليزي</Label>
              <Textarea name="hero_desc_en" defaultValue={settings.hero_desc_en || en.hero.desc} rows={2} className="text-right" />
            </div>
          </CardContent>
        </Card>

        {/* WHY CHOOSE US */}
        <Card>
          <CardHeader>
            <CardTitle className="text-right">قسم لماذا تختارنا (Why Choose Us)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>عنوان القسم - عربي</Label>
              <Input name="why_title_ar" defaultValue={settings.why_title_ar || ar.why.title} className="text-right" />
            </div>
            <div className="space-y-2">
              <Label>عنوان القسم - إنجليزي</Label>
              <Input name="why_title_en" defaultValue={settings.why_title_en || en.why.title} className="text-right" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>الوصف - عربي</Label>
              <Textarea name="why_desc_ar" defaultValue={settings.why_desc_ar || ar.why.desc} rows={2} className="text-right" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>الوصف - إنجليزي</Label>
              <Textarea name="why_desc_en" defaultValue={settings.why_desc_en || en.why.desc} rows={2} className="text-right" />
            </div>
          </CardContent>
        </Card>

        {/* SERVICES SECTION */}
        <Card>
          <CardHeader>
            <CardTitle className="text-right">قسم الخدمات (Services Section)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>عنوان قسم الخدمات - عربي</Label>
              <Input name="srv_title_ar" defaultValue={settings.srv_title_ar || ar.services.title} className="text-right" />
            </div>
            <div className="space-y-2">
              <Label>عنوان قسم الخدمات - إنجليزي</Label>
              <Input name="srv_title_en" defaultValue={settings.srv_title_en || en.services.title} className="text-right" />
            </div>
          </CardContent>
        </Card>

        {/* COVERAGE SECTION */}
        <Card>
          <CardHeader>
            <CardTitle className="text-right">قسم مناطق التغطية (Coverage Section)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>عنوان القسم - عربي</Label>
              <Input name="cov_title_ar" defaultValue={settings.cov_title_ar || ar.coverage.title} className="text-right" />
            </div>
            <div className="space-y-2">
              <Label>عنوان القسم - إنجليزي</Label>
              <Input name="cov_title_en" defaultValue={settings.cov_title_en || en.coverage.title} className="text-right" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>الوصف - عربي</Label>
              <Textarea name="cov_desc_ar" defaultValue={settings.cov_desc_ar || ar.coverage.desc} rows={2} className="text-right" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>الوصف - إنجليزي</Label>
              <Textarea name="cov_desc_en" defaultValue={settings.cov_desc_en || en.coverage.desc} rows={2} className="text-right" />
            </div>
          </CardContent>
        </Card>

        {/* CONTACT / CTA SECTION */}
        <Card>
          <CardHeader>
            <CardTitle className="text-right">قسم اتصل بنا / الدعوة للإجراء (Contact & CTA)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>العنوان الأول - عربي</Label>
              <Input name="cta_title1_ar" defaultValue={settings.cta_title1_ar || ar.contact.title1} className="text-right" />
            </div>
            <div className="space-y-2">
              <Label>العنوان الأول - إنجليزي</Label>
              <Input name="cta_title1_en" defaultValue={settings.cta_title1_en || en.contact.title1} className="text-right" />
            </div>
            <div className="space-y-2">
              <Label>العنوان الثاني - المميز - عربي</Label>
              <Input name="cta_title2_ar" defaultValue={settings.cta_title2_ar || ar.contact.title2} className="text-right" />
            </div>
            <div className="space-y-2">
              <Label>العنوان الثاني - المميز - إنجليزي</Label>
              <Input name="cta_title2_en" defaultValue={settings.cta_title2_en || en.contact.title2} className="text-right" />
            </div>
          </CardContent>
        </Card>

        <div className="sticky bottom-6 flex justify-end p-4 bg-background/80 backdrop-blur border rounded-xl shadow-sm">
          <Button type="submit" size="lg">حفظ جميع الإعدادات</Button>
        </div>
      </form>
    </div>
  );
}
