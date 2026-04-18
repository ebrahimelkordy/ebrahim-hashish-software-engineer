import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = request.cookies.get('session_auth');

  // Protect /admin and /dashboard routes
  const isProtectedPath = path.startsWith('/admin') || path.startsWith('/dashboard');

  if (isProtectedPath && !session) {
    const url = new URL('/login', request.url);
    // Optional: add a redirect param so we can return after login
    url.searchParams.set('from', path);
    return NextResponse.redirect(url);
  }

  // Prevent logged-in users from hitting /login
  if (path === '/login' && session) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*', 
    '/dashboard/:path*', 
    '/login'
  ],
}
