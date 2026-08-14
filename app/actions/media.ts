"use server";

import { db } from '@/lib/db';
import { deleteLocalFile } from '@/lib/upload-utils';
import { revalidatePath } from 'next/cache';

export async function deleteMediaAction(id: number, url: string) {
  try {
    // Delete from file system if it's an uploaded file
    await deleteLocalFile(url);
    
    // Delete from DB
    await db.mediaItem.delete({ where: { id } });
    
    revalidatePath('/admin/media');
    return { success: true };
  } catch (error) {
    console.error("Delete media error:", error);
    return { error: 'Failed to delete media' };
  }
}

export async function getMediaAction() {
  try {
    const media = await db.mediaItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: media };
  } catch (error) {
    console.error("Get media error:", error);
    return { error: 'Failed to fetch media', data: [] };
  }
}
