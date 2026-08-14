import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
      const { db } = await import('@/lib/db');
      await db.contactMessage.create({
        data: {
          name,
          phone,
          message,
        },
      });
    } catch (dbError) {
      console.warn("DB offline, ignoring contact message save", dbError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
