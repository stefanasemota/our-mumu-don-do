import { createAdminMiddleware } from '@stefan/sabi-auth';

// This is the correct "Sabi" way. 
// We pass the password to the factory, and it returns the middleware function.
export const middleware = createAdminMiddleware(process.env.ADMIN_PASSWORD);

export const config = {
  matcher: [
    '/admin-dashboard',          // Protect the main dashboard
    '/admin-dashboard/:path*',   // Protect all sub-pages
    '/admin-login'               // Loop protection
  ],
};
