import { db } from '@/lib/db';
import { cache } from 'react';

export const getCachedSettings = cache(async () => {
  try {
    const raw = await db.siteSetting.findMany();
    const map: Record<string, string> = {};
    raw.forEach(s => {
      map[s.key] = s.value || '';
    });
    return map;
  } catch (error) {
    return {};
  }
});
