
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_COOKIE_NAME = 'auth_token';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Add the pathname to the request headers for access in server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-next-pathname', pathname);

  // Check if the path is within the admin area
  if (pathname.startsWith('/admin-dashboard')) {
    const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    // Ensure the admin password is set in the environment
    if (!ADMIN_PASSWORD) {
      console.error('ADMIN_PASSWORD environment variable not set.');
      const url = request.nextUrl.clone();
      url.pathname = '/admin-login';
      // For API routes or server actions, might return a JSON response instead
      return NextResponse.redirect(url);
    }
    
    // If the token doesn't match, redirect to the login page
    if (authToken !== ADMIN_PASSWORD) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin-login';
      return NextResponse.redirect(url);
    }
  }

  // If all checks pass, or if it's not an admin route, continue
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
