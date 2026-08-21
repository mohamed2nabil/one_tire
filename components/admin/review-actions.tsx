'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Trash2, Edit2, Check, X } from 'lucide-react'
import { approveTestimonial, deleteTestimonial, updateTestimonial } from '@/app/actions/submissions'

export function ReviewActions({ review }: { review: any }) {
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(review.clientName)
  const [text, setText] = useState(review.text)

  const handleDelete = async () => {
    if (!confirm('هل أنت متأكد من مسح هذا التقييم؟')) return
    setLoading(true)
    await deleteTestimonial(review.id)
    setLoading(false)
  }

  const handleApprove = async () => {
    setLoading(true)
    await approveTestimonial(review.id)
    setLoading(false)
  }

  const handleUpdate = async () => {
    setLoading(true)
    await updateTestimonial(review.id, text, name)
    setEditing(false)
    setLoading(false)
  }

  if (editing) {
    return (
      <div className="mt-4 space-y-3 bg-muted/30 p-4 rounded-xl border">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="اسم العميل" />
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="نص التقييم" />
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>إلغاء</Button>
          <Button size="sm" onClick={handleUpdate} disabled={loading}>حفظ</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {!review.isVisible && (
        <Button variant="outline" size="sm" onClick={handleApprove} disabled={loading}>
          <Check className="size-4 mr-2" /> موافقة ونشر
        </Button>
      )}
      <Button variant="outline" size="sm" onClick={() => setEditing(true)} disabled={loading}>
        <Edit2 className="size-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={handleDelete} disabled={loading}>
        <Trash2 className="size-4 text-destructive" />
      </Button>
    </div>
  )
}
