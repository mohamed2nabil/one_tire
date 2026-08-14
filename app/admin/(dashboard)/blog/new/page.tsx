'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlogPost } from '@/app/actions/blog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ImagePicker } from '@/components/admin/image-picker';
import { Image as ImageIcon, X } from 'lucide-react';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('PUBLISHED');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(
      val
        .trim()
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/\s+/g, '-')
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const result = await createBlogPost({
      title,
      slug,
      content,
      coverImage,
      publishStatus: status,
    });

    setIsPending(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/admin/blog');
      router.refresh();
    }
  };

  return (
    <div className="space-y-6 text-foreground text-right" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">كتابة مقال جديد</h1>
        <p className="text-muted-foreground mt-1">قم بصياغة محتوى المقال وضبط خصائص العرض.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-right">محتوى المقال</CardTitle>
              <CardDescription className="text-right">المحرر الرئيسي لمحتوى مقالك.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="rounded border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive font-medium text-right">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">عنوان المقال</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="مثال: 5 نصائح للحفاظ على كفرات سيارتك"
                  required
                  disabled={isPending}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">الرابط الفريد (Slug)</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="مثال: tips-for-car-tires-maintenance"
                  required
                  disabled={isPending}
                  className="text-right font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">محتوى المقال</Label>
                <textarea
                  id="content"
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-right"
                  placeholder="ابدأ في كتابة تفاصيل مقالك هنا..."
                  required
                  disabled={isPending}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button type="button" variant="ghost" onClick={() => router.push('/admin/blog')}>
                إلغاء
              </Button>
              <Button type="submit" disabled={isPending}>
                {status === 'PUBLISHED' ? 'نشر المقال الآن' : 'حفظ كمسودة'}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-right">الحالة والخصائص</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>حالة النشر</Label>
                <select 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm text-right"
                  value={status} 
                  onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}
                  disabled={isPending}
                >
                  <option value="PUBLISHED">منشور (يظهر للزوار فوراً)</option>
                  <option value="DRAFT">مسودة (مخفي)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>الصورة البارزة للمقال</Label>
                <div className="relative aspect-video w-full rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
                  {coverImage ? (
                    <img src={coverImage} alt="Cover" className="object-cover w-full h-full" />
                  ) : (
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => setPickerOpen(true)}>
                    اختر صورة
                  </Button>
                  {coverImage && (
                    <Button type="button" variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => setCoverImage('')}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>

      {pickerOpen && (
        <ImagePicker
          onSelect={(url) => {
            setCoverImage(url);
            setPickerOpen(false);
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  );
}
