'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function submitForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string | null
  const content = formData.get('content') as string
  const ratingStr = formData.get('rating') as string | null
  const type = formData.get('type') as 'MESSAGE' | 'REVIEW' || 'MESSAGE'

  if (!name || !content) {
    throw new Error('Name and content are required')
  }

  if (type === 'REVIEW') {
    const rating = ratingStr ? parseInt(ratingStr, 10) : 5
    const location = formData.get('location') as string || 'موقع غير محدد'
    await db.testimonial.create({
      data: {
        clientName: name,
        city: location,
        text: content,
        rating,
        isVisible: false, // Must be approved by admin
      },
    })
    revalidatePath('/admin/reviews')
  } else {
    await db.contactMessage.create({
      data: {
        name,
        phone: email || '', // using email field for phone temporarily if needed
        message: content,
        status: 'UNREAD',
      },
    })
    revalidatePath('/admin/messages')
  }
}

export async function approveTestimonial(id: number) {
  await db.testimonial.update({
    where: { id },
    data: { isVisible: true },
  })
  
  revalidatePath('/')
  revalidatePath('/admin/reviews')
}

export async function deleteTestimonial(id: number) {
  await db.testimonial.delete({
    where: { id },
  })
  
  revalidatePath('/')
  revalidatePath('/admin/reviews')
}

export async function updateTestimonial(id: number, text: string, clientName: string) {
  await db.testimonial.update({
    where: { id },
    data: { text, clientName },
  })
  revalidatePath('/')
  revalidatePath('/admin/reviews')
}

export async function deleteMessage(id: number) {
  await db.contactMessage.delete({
    where: { id }
  })
  revalidatePath('/admin/messages')
}
