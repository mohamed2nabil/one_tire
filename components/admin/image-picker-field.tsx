'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePicker } from './image-picker';
import { Image as ImageIcon, X } from 'lucide-react';

interface ImagePickerFieldProps {
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
}

export function ImagePickerField({ name, label, defaultValue = '', placeholder = '' }: ImagePickerFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div className="space-y-2 text-right">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      
      {/* Hidden input to pass value in form actions */}
      <input type="hidden" name={name} value={value} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border p-4 bg-muted/40">
        {/* Preview image */}
        <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-xs text-muted-foreground truncate max-w-full font-mono dir-ltr text-left">
            {value || placeholder || 'لا توجد صورة محددة'}
          </p>
          
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPickerOpen(true)}
            >
              اختر من الوسائط
            </Button>
            
            {value && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setValue('')}
              >
                <X className="h-4 w-4 mr-1" />
                حذف الصورة
              </Button>
            )}
          </div>
        </div>
      </div>

      {pickerOpen && (
        <ImagePicker
          onSelect={(url) => {
            setValue(url);
            setPickerOpen(false);
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  );
}
