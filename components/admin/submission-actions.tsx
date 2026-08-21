'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { approveSubmission, deleteSubmission, convertToReview } from '@/app/actions/submissions'

export function SubmissionActions({ id, status, type }: { id: number, status: string, type: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex gap-2">
      {status === 'PENDING' && (
        <Button 
          variant="default" 
          size="sm" 
          disabled={isPending}
          onClick={() => startTransition(() => approveSubmission(id))}
        >
          Approve
        </Button>
      )}
      {type === 'MESSAGE' && (
        <Button 
          variant="outline" 
          size="sm" 
          disabled={isPending}
          onClick={() => startTransition(() => convertToReview(id, 5))}
        >
          Convert to Review
        </Button>
      )}
      <Button 
        variant="destructive" 
        size="sm" 
        disabled={isPending}
        onClick={() => startTransition(() => deleteSubmission(id))}
      >
        Delete
      </Button>
    </div>
  )
}
