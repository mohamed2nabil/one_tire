"use server";

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// --- Testimonials ---
export async function getTestimonials() {
  return await db.testimonial.findMany({ orderBy: { order: 'asc' } });
}

export async function saveTestimonial(data: any) {
  if (data.id) {
    await db.testimonial.update({ where: { id: data.id }, data });
  } else {
    await db.testimonial.create({ data });
  }
  revalidatePath('/');
  revalidatePath('/admin/testimonials');
}

export async function deleteTestimonial(id: number) {
  await db.testimonial.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/testimonials');
}

// --- Brands ---
export async function getBrands() {
  return await db.brand.findMany({ orderBy: { order: 'asc' } });
}

export async function saveBrand(data: any) {
  if (data.id) {
    await db.brand.update({ where: { id: data.id }, data });
  } else {
    await db.brand.create({ data });
  }
  revalidatePath('/');
  revalidatePath('/admin/brands');
}

export async function deleteBrand(id: number) {
  await db.brand.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/brands');
}

// --- Service Items ---
export async function getServiceItems() {
  return await db.serviceItem.findMany({ orderBy: { order: 'asc' } });
}

export async function saveServiceItem(data: any) {
  if (data.id) {
    await db.serviceItem.update({ where: { id: data.id }, data });
  } else {
    await db.serviceItem.create({ data });
  }
  revalidatePath('/');
  revalidatePath('/admin/services');
}

export async function deleteServiceItem(id: number) {
  await db.serviceItem.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/services');
}

import { deleteLocalFile } from '@/lib/upload-utils';

export async function getSiteSettings() {
  try {
    const settings = await db.siteSetting.findMany();
    const map: Record<string, any> = {};
    for (const s of settings) {
      map[s.key] = s.jsonValue ?? s.value;
    }
    return map;
  } catch (error) {
    console.warn("DB fetch error in getSiteSettings:", error);
    return {};
  }
}

export async function saveSiteSettings(settings: Record<string, any>) {
  try {
    const existing = await getSiteSettings();

    for (const [key, value] of Object.entries(settings)) {
      const oldValue = existing[key];
      // ponytail: delete old file if it was replaced with a new upload file
      if (
        typeof oldValue === 'string' &&
        typeof value === 'string' &&
        oldValue !== value &&
        oldValue.startsWith('/uploads/')
      ) {
        deleteLocalFile(oldValue).catch((e) => console.warn('Failed to delete old image:', oldValue, e));
      }

      const isJson = typeof value === 'object';
      await db.siteSetting.upsert({
        where: { key },
        update: { 
          value: isJson ? null : String(value), 
          jsonValue: isJson ? value : null 
        },
        create: { 
          key, 
          value: isJson ? null : String(value), 
          jsonValue: isJson ? value : null 
        },
      });
    }
  } catch (error) {
    console.warn("DB error in saveSiteSettings:", error);
  }
  revalidatePath('/');
  revalidatePath('/admin/settings');
}
