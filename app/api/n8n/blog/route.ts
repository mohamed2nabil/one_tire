import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-n8n-api-key');

  if (!apiKey || apiKey !== process.env.N8N_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = await db.contentItem.findMany({
      where: { type: 'ARTICLE', status: 'PUBLISHED' },
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch posts for n8n:', error);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}
