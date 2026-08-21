'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteMessage } from '@/app/actions/submissions'

export function MessageActions({ id }: { id: number }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this message?')) return
    setLoading(true)
    await deleteMessage(id)
    setLoading(false)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleDelete} disabled={loading}>
      <Trash2 className="size-4 text-destructive" />
    </Button>
  )
}
