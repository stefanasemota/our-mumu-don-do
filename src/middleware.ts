import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. MUST use __session for Firebase Hosting to pass the cookie through
const AUTH_COOKIE_NAME = '__session'; 
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // DEBUG LOG - You will see this in Firebase Logs
  console.log(`Middleware running for: ${pathname}. Password exists: ${!!ADMIN_PASSWORD}`);

  // 2. THE LOOP BREAKER
  // If the user is already going to the login page, STOP checking and let them go there.
  if (pathname.startsWith('/admin-login')) {
    return NextResponse.next();
  }

  // 3. SECURE CHECK: If password isn't set, we can't authenticate.
  if (!ADMIN_PASSWORD) {
    console.error("CRITICAL: ADMIN_PASSWORD is missing in Environment Variables.");
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  // 4. AUTHENTICATION LOGIC
  const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  // Only protect admin dashboard routes
  if (pathname.startsWith('/admin-dashboard')) {
    if (authToken !== ADMIN_PASSWORD) {
      console.log("Auth failed. Redirecting to login.");
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // We match EVERYTHING here to ensure we catch all leaks, 
  // but the 'Short-Circuit' above protects the login page.
  matcher: ['/admin-dashboard/:path*', '/admin-login'],
};