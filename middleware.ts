import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/server/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow the login page to be accessed without a session
  if (path === '/admin/login') {
    return NextResponse.next();
  }

  // Protect all other admin routes
  if (path.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const payload = await decrypt(sessionCookie);

    if (!payload) {
        // Invalid or expired token
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
