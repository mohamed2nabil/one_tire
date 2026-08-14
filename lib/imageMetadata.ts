import { db } from '@/lib/db';
import { cache } from 'react';

export const fetchImageMetadata = cache(async (id: number) => {
  try {
    return await db.mediaItem.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching image metadata:', error);
    return null;
  }
});

export async function updateImageMetadata(data: {
  id: number;
  altText?: string;
  caption?: string;
  tags?: string[];
  categories?: string[];
  keywords?: string;
}) {
  try {
    return await db.mediaItem.update({
      where: { id: data.id },
      data: {
        altText: data.altText,
        caption: data.caption,
        tags: data.tags || [],
        categories: data.categories || [],
        seoMetadata: data.keywords ? { keywords: data.keywords } : undefined,
      },
    });
  } catch (error) {
    console.error('Error updating image metadata:', error);
    throw new Error('Failed to update media metadata');
  }
}
