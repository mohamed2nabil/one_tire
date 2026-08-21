'use client'

import { useState } from 'react'
import { Star, MessageSquarePlus } from 'lucide-react'
import { submitForm } from '@/app/actions/submissions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ReviewForm() {
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    formData.append('rating', rating.toString())
    formData.append('type', 'REVIEW')
    
    try {
      await submitForm(formData)
      setSuccess(true)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) {
    return (
      <div className="mt-16 text-center">
        <Button 
          onClick={() => setIsOpen(true)} 
          className="rounded-full px-8 py-6 text-base font-bold shadow-lg transition-transform hover:scale-105"
        >
          <MessageSquarePlus className="mr-2 size-5" />
          أضف تقييمك الآن
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-16 mx-auto max-w-xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
      <div className="bg-primary/5 px-6 py-4 border-b border-border/50">
        <h3 className="text-xl font-bold font-display text-foreground">شاركنا رأيك في خدماتنا</h3>
      </div>
      
      <div className="p-6">
        {success ? (
          <div className="text-green-600 dark:text-green-400 text-center font-medium py-8">
            شكرًا لك! تم إرسال تقييمك بنجاح وسوف يظهر بعد مراجعته.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-right">
            <div>
              <label className="mb-2 block text-sm font-bold text-foreground">تقييمك للخدمة</label>
              <div className="flex justify-end gap-2 bg-background/50 p-3 rounded-xl border border-border" dir="ltr">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star 
                      className={`size-8 transition-colors ${
                        star <= (hoveredRating || rating) 
                          ? 'fill-[#FFB400] text-[#FFB400]' 
                          : 'fill-transparent text-muted-foreground opacity-30'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-bold text-foreground">الاسم</label>
              <Input 
                name="name" 
                required 
                placeholder="اكتب اسمك هنا" 
                className="h-12 rounded-xl text-right bg-background"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-foreground">المدينة / الموقع</label>
              <Input 
                name="location" 
                required 
                placeholder="مثال: الرياض، حي الملقا" 
                className="h-12 rounded-xl text-right bg-background"
              />
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-bold text-foreground">تفاصيل التقييم</label>
              <Textarea 
                name="content" 
                required 
                placeholder="رأيك يهمنا..." 
                rows={4} 
                className="rounded-xl resize-none text-right bg-background"
              />
            </div>
            
            <div className="flex gap-3 pt-4 justify-end border-t border-border/50">
              <Button 
                type="button" 
                variant="ghost" 
                className="rounded-full"
                onClick={() => setIsOpen(false)}
              >
                إلغاء
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="rounded-full px-8 font-bold shadow-md"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال التقييم'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
