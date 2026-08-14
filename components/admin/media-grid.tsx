'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { deleteMediaAction } from '@/app/actions/media';
import { Copy, Trash2, UploadCloud, Check } from 'lucide-react';

export function MediaGrid({ initialMedia }: { initialMedia: any[] }) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleUploadFile = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'site'); // default folder

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (res.ok) {
        router.refresh();
      } else {
        alert('فشل رفع الملف.');
      }
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء الرفع.');
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    handleUploadFile(e.target.files[0]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadFile(e.dataTransfer.files[0]);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = async (id: number, url: string) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا الملف نهائياً؟')) {
      await deleteMediaAction(id, url);
      router.refresh();
    }
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">مكتبة الوسائط والملفات</h1>
          <p className="text-muted-foreground mt-1">
            رفع وإدارة الصور. يمكنك نسخ الروابط أو اختيارها مباشرة من النماذج.
          </p>
        </div>
        <div className="relative">
          <Button disabled={uploading}>
            <UploadCloud className="w-4 h-4 ml-2" />
            {uploading ? 'جاري الرفع...' : 'رفع صورة'}
          </Button>
          <input 
            type="file" 
            accept="image/*" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            onChange={handleUpload}
            disabled={uploading}
          />
        </div>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors flex flex-col items-center justify-center ${
          dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-muted-foreground/30'
        }`}
      >
        <UploadCloud className="h-10 w-10 text-muted-foreground mb-3" />
        <p className="text-sm font-semibold mb-1">
          {uploading ? 'جاري رفع الملف...' : 'اسحب الصور وأفلتها هنا للرفع التلقائي'}
        </p>
        <p className="text-xs text-muted-foreground">أو اضغط على زر "رفع صورة" بالأعلى</p>
      </div>

      {initialMedia.length === 0 ? (
        <div className="border border-dashed rounded-xl p-12 text-center text-muted-foreground">
          لا توجد وسائط مرفوعة بعد.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {initialMedia.map((media) => (
            <div key={media.id} className="group relative border rounded-xl overflow-hidden bg-card transition-all hover:shadow-sm">
              <div className="aspect-square relative bg-muted flex items-center justify-center">
                {media.url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) ? (
                  <Image 
                    src={media.url} 
                    alt={media.fileName} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 20vw"
                    unoptimized
                  />
                ) : (
                  <span className="text-xs">{media.fileName}</span>
                )}
              </div>
              <div className="p-3 text-xs flex justify-between items-center bg-card/50">
                <span className="truncate w-full block text-right text-muted-foreground" title={media.fileName}>
                  {media.fileName}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" onClick={() => copyToClipboard(media.url)} title="نسخ الرابط">
                  {copiedUrl === media.url ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(media.id, media.url)} title="حذف">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
