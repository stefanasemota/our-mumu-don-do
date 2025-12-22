import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = '__session';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const headers = new Headers(request.headers);
  headers.set('x-next-pathname', pathname);

  if (pathname.startsWith('/admin-login')) {
    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  if (pathname.startsWith('/admin-dashboard')) {
    if (!ADMIN_PASSWORD) {
      console.error("CRITICAL: ADMIN_PASSWORD is missing in Environment Variables.");
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
    const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (authToken !== ADMIN_PASSWORD) {
      console.log("Auth failed for admin dashboard. Redirecting to login.");
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
