import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyLocalSession } from '@/lib/auth-session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('__session')?.value;

  // Protect admin dashboard routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const payload = await verifyLocalSession(sessionCookie);
      if (!payload) throw new Error('Invalid session');

      const role = (payload.role || 'ADMIN') as 'ADMIN' | 'TECHNICIAN' | 'MARKETING' | 'AUTHOR';

      if (pathname.startsWith('/admin/orders') && !['ADMIN', 'TECHNICIAN'].includes(role)) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      if (pathname.startsWith('/admin/blog') && !['ADMIN', 'MARKETING', 'AUTHOR'].includes(role)) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      if (pathname.startsWith('/admin/media') && !['ADMIN', 'MARKETING', 'AUTHOR'].includes(role)) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }

      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('__session');
      return response;
    }
  }

  // Prevent logged-in users from seeing the login screen again
  if (pathname === '/admin/login' && sessionCookie) {
    const payload = await verifyLocalSession(sessionCookie);
    if (payload) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
};
