'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { deleteBlogPostAction, updateBlogPostAction } from '@/app/actions/blog-client';
import { ImagePicker } from '@/components/admin/image-picker';
import { Image as ImageIcon, X } from 'lucide-react';

export default function EditPostPage({ post, returnUrl = '/admin/blog' }: { post: any, returnUrl?: string }) {
  const [title, setTitle] = useState(post.title || '');
  const [slug, setSlug] = useState(post.slug || '');
  const [content, setContent] = useState(post.content || '');
  const [status, setStatus] = useState(post.status || 'DRAFT');
  const [coverImage, setCoverImage] = useState(post.coverImage || '');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!post.id) {
      setSlug(
        val
          .trim()
          .toLowerCase()
          .replace(/[^\p{L}\p{N}\s-]/gu, '')
          .replace(/\s+/g, '-')
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    
    await updateBlogPostAction(post.id, {
      title,
      slug,
      content,
      coverImage,
      status
    });

    setIsPending(false);
    router.push(returnUrl);
    router.refresh();
  };

  const handleDelete = async () => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا العنصر؟')) {
      setIsPending(true);
      await deleteBlogPostAction(post.id);
      router.push(returnUrl);
      router.refresh();
    }
  };

  const isPromotion = post.type === 'PROMOTION';

  return (
    <div className="space-y-6 text-foreground text-right" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isPromotion ? 'تعديل العرض' : 'تعديل المقال'}
          </h1>
          <p className="text-muted-foreground mt-1">تحديث المحتوى والصور والخصائص العامة.</p>
        </div>
        <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
          حذف
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-right">تفاصيل المحتوى</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} required disabled={isPending} className="text-right" />
              </div>
              <div className="space-y-2">
                <Label>الرابط الفريد (Slug)</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} required disabled={isPending} className="text-right font-mono" />
              </div>
              <div className="space-y-2">
                <Label>المحتوى</Label>
                <textarea
                  rows={15}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-right"
                  required
                  disabled={isPending}
                />
              </div>
            </CardContent>
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
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={isPending}
                >
                  <option value="DRAFT">مسودة</option>
                  <option value="PUBLISHED">منشور</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label>الصورة البارزة</Label>
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
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isPending}>حفظ التغييرات</Button>
            </CardFooter>
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
