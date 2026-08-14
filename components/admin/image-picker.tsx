'use client';

import { useState, useEffect } from 'react';
import { getMediaAction } from '@/app/actions/media';
import { Button } from '@/components/ui/button';
import { X, UploadCloud, Check } from 'lucide-react';

interface ImagePickerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

export function ImagePicker({ onSelect, onClose }: ImagePickerProps) {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    const res = await getMediaAction();
    if (res.success && res.data) {
      setMediaList(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'site');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        await fetchMedia();
      } else {
        alert('فشل الرفع');
      }
    } catch (err) {
      console.error(err);
      alert('خطأ أثناء الرفع');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files[0]);
    }
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
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" dir="rtl">
      <div className="flex h-[80vh] w-full max-w-4xl flex-col rounded-2xl bg-card border shadow-2xl text-foreground">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-xl font-bold">مكتبة الوسائط - اختر صورة</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content Body */}
        <div className="flex flex-1 flex-col overflow-hidden p-6 md:flex-row gap-6">
          
          {/* Main Media Grid */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {loading ? (
              <div className="flex flex-1 items-center justify-center text-muted-foreground text-sm">
                جاري تحميل الصور...
              </div>
            ) : mediaList.length === 0 ? (
              <div className="flex flex-1 items-center justify-center text-muted-foreground text-sm border-2 border-dashed rounded-xl">
                لا توجد صور. قم بالرفع من القائمة الجانبية.
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pr-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {mediaList.map((media) => {
                    const isSelected = selectedUrl === media.url;
                    return (
                      <div
                        key={media.id}
                        onClick={() => setSelectedUrl(media.url)}
                        className={`group relative aspect-square cursor-pointer overflow-hidden rounded-xl border-2 bg-muted transition-all ${
                          isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-muted-foreground/30'
                        }`}
                      >
                        <img
                          src={media.url}
                          alt={media.fileName}
                          className="object-cover w-full h-full"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="rounded-full bg-primary p-1.5 text-primary-foreground shadow">
                              <Check className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-0 inset-x-0 bg-black/60 p-1.5 text-[10px] text-white truncate opacity-0 group-hover:opacity-100 transition-opacity">
                          {media.fileName}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Upload Sidebar / Drag & Drop */}
          <div className="w-full md:w-64 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-r pr-0 md:pr-6 pt-6 md:pt-0">
            
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
                dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/30 hover:border-muted-foreground/50'
              }`}
            >
              <UploadCloud className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-xs font-semibold mb-1 text-foreground">
                {uploading ? 'جاري الرفع...' : 'اسحب الصورة هنا أو اضغط للرفع'}
              </p>
              <p className="text-[10px] text-muted-foreground">يدعم PNG, JPG, WEBP</p>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={uploading}
                onChange={handleFileChange}
              />
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Button
                onClick={() => selectedUrl && onSelect(selectedUrl)}
                disabled={!selectedUrl}
                className="w-full"
              >
                تأكيد الاختيار
              </Button>
              <Button variant="outline" onClick={onClose} className="w-full">
                إلغاء
              </Button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
