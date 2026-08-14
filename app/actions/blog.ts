"use server";

import { db } from '@/lib/db';

export async function createBlogPost(data: {
  type?: 'ARTICLE' | 'PROMOTION';
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  gallery?: string[];
  tags?: string[];
  categories?: string[];
  metaTitle?: string;
  metaDescription?: string;
  publishStatus?: 'DRAFT' | 'PUBLISHED';
}) {
  try {
    const post = await db.contentItem.create({
      data: {
        type: data.type || 'ARTICLE',
        title: data.title,
        slug: data.slug,
        content: data.content,
        coverImage: data.coverImage || null,
        gallery: data.gallery || [],
        tags: data.tags || [],
        categories: data.categories || [],
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        status: data.publishStatus || 'PUBLISHED',
      },
    });
    return { success: true, id: post.id };
  } catch (error: any) {
    console.error('Failed to create blog post:', error);
    return { error: 'Failed to create blog post' };
  }
}

export async function getBlogPosts() {
  try {
    return await db.contentItem.findMany({
      where: { type: 'ARTICLE' },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Failed to query blog posts:', error);
    return [];
  }
}
