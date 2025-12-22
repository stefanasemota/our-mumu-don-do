'use client';

import { usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import { Header } from './Header';
import { Footer } from './Footer';

export function AppBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser(); // We can use this hook to get auth state if needed.

  const isAdminPage =
    pathname.startsWith('/admin-dashboard') || pathname.startsWith('/admin-login');

  // For now, we'll base `isLoggedIn` on whether a user object exists.
  // This is simpler and more robust than dealing with cookies on the client.
  const isLoggedIn = !!user;

  return (
    <div className="relative flex min-h-screen flex-col">
      {!isAdminPage && <Header isLoggedIn={isLoggedIn} />}
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
