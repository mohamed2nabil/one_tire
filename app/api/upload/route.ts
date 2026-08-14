import { NextRequest, NextResponse } from 'next/server';
import { saveLocalFile } from '@/lib/upload-utils';
import { verifyLocalSession } from '@/lib/auth-session';

export async function POST(request: NextRequest) {
  try {
    // Basic auth check
    const sessionCookie = request.cookies.get('__session')?.value;
    if (!sessionCookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const session = await verifyLocalSession(sessionCookie);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'misc';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const url = await saveLocalFile(file, folder);

    // Save to database
    let mediaId = null;
    try {
      const { db } = await import('@/lib/db');
      const media = await db.mediaItem.create({
        data: {
          url,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
        }
      });
      mediaId = media.id;
    } catch (dbError) {
      console.warn("DB offline, uploaded file locally but didn't save to DB.", dbError);
    }

    return NextResponse.json({ url, id: mediaId });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
