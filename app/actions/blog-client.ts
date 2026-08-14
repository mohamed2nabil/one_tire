'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateBlogPostAction(id: number, data: any) {
  try {
    const post = await db.contentItem.update({
      where: { id },
      data
    });
    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update post' };
  }
}

export async function deleteBlogPostAction(id: number) {
  try {
    await db.contentItem.delete({ where: { id } });
    revalidatePath('/blog');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete post' };
  }
}
