'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

export function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  if (success) {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center text-primary mt-8">
        <h3 className="font-bold text-lg mb-2">تم الإرسال بنجاح!</h3>
        <p>شكراً لتواصلك معنا. سيقوم فريقنا بالرد عليك في أقرب وقت.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 bg-card border border-border rounded-3xl p-6 shadow-sm text-right space-y-4 max-w-md mx-auto">
      <h3 className="font-bold text-xl mb-4 font-display">أو اترك لنا رسالة</h3>
      
      <div className="space-y-2">
        <Input name="name" placeholder="الاسم الكريم" required disabled={isPending} className="bg-background" />
      </div>
      <div className="space-y-2">
        <Input name="phone" placeholder="رقم الجوال (05xxxxxxx)" required disabled={isPending} className="bg-background text-right" dir="ltr" />
      </div>
      <div className="space-y-2">
        <Textarea name="message" placeholder="اكتب رسالتك أو استفسارك هنا..." required disabled={isPending} className="bg-background min-h-[100px]" />
      </div>
      
      <Button type="submit" className="w-full" disabled={isPending}>
        <Send className="w-4 h-4 ml-2" />
        {isPending ? 'جاري الإرسال...' : 'إرسال الرسالة'}
      </Button>
    </form>
  );
}
