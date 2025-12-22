
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_COOKIE_NAME = 'auth_token';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Add the pathname to the request headers for access in server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-next-pathname', pathname);

  if (pathname.startsWith('/admin-dashboard')) {
    const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!ADMIN_PASSWORD) {
        console.error('ADMIN_PASSWORD environment variable not set.');
        // In this case, block access for safety.
        const url = request.nextUrl.clone();
        url.pathname = '/admin-login';
        return NextResponse.redirect(url);
    }
    
    if (authToken !== ADMIN_PASSWORD) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin-login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
}

export const config = {
  matcher: [
    '/admin-dashboard/:path*',
    // We also need to match the root layout to pass the pathname
    '/',
    '/about',
    '/story/:path*',
    '/video/:path*',
    '/admin-login',
    '/share/story/:path*',
    ],
};
