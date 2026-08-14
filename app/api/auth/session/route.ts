import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();
    if (!idToken) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const adminAuth = getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    const { createLocalSession } = await import('@/lib/auth-session');
    const sessionCookie = await createLocalSession({ 
      uid: decodedToken.uid, 
      email: decodedToken.email,
      role: 'ADMIN' // Default to admin for now, or fetch from DB
    });

    const response = NextResponse.json({ status: 'success' });
    response.cookies.set('__session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });

    return response;
  } catch (error: any) {
    console.error('Session creation failed:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
