import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_COOKIE_NAME = 'auth_token';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin-dashboard')) {
    const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    // A real app would have a more secure check, e.g., verifying a JWT
    if (authToken !== ADMIN_PASSWORD) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin-login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-dashboard/:path*'],
};
