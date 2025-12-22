
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_COOKIE_NAME = 'auth_token';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Add the pathname to the request headers for access in server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-next-pathname', pathname);

  // 1. Guard against missing configuration (Fail-Closed principle)
  if (!ADMIN_PASSWORD) {
    console.error("CRITICAL: ADMIN_PASSWORD environment variable is not set.");
    // If we are already on the login page, do not redirect to prevent a loop.
    // This path is already excluded by the matcher, but this is an extra safeguard.
    if (pathname === '/admin-login') {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    // For any other admin-related route, redirect to login because the system is not secure.
    const url = request.nextUrl.clone();
    url.pathname = '/admin-login';
    return NextResponse.redirect(url);
  }

  // 2. Normal Authentication Logic for Admin Routes
  // This logic only runs for paths that match the config below.
  const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (authToken !== ADMIN_PASSWORD) {
    // If the token is invalid, redirect to the login page.
    const url = request.nextUrl.clone();
    url.pathname = '/admin-login';
    return NextResponse.redirect(url);
  }

  // 3. If all checks pass, continue to the requested page.
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  /*
   * Match all admin-related request paths.
   * This ensures the middleware only runs on the routes that need protection,
   * and avoids running on public pages, the login page, or asset routes.
   */
  matcher: ['/admin-dashboard/:path*'],
};
