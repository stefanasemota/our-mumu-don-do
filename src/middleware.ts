import { createAdminMiddleware } from '@stefan/sabi-auth';

export const middleware = createAdminMiddleware(process.env.ADMIN_PASSWORD);

export const config = {
  matcher: [
    '/admin-dashboard',          // Matches the main list page
    '/admin-dashboard/:path*',   // Matches edit, create, etc.
    '/admin-login'               // Loop protection
  ],
};