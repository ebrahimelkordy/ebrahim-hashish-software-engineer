import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect /admin routes
  if (path.startsWith('/admin')) {
    const basicAuth = request.headers.get('authorization')
    
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1]
      const [user, pwd] = atob(authValue).split(':')

      const validUser = process.env.ADMIN_USERNAME;
      const validPwd = process.env.ADMIN_PASSWORD;

      // Ensure credentials are configured before allowing access
      if (validUser && validPwd && user === validUser && pwd === validPwd) {
        return NextResponse.next()
      }
    }
    
    // Request Authentication
    return new NextResponse('Auth Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Dashboard"',
      },
    })
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}
