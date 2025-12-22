'use client';

import { usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import { Header } from './Header';
import { Footer } from './Footer';

export function AppBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();

  const isAdminPage =
    pathname.startsWith('/admin-dashboard') || pathname.startsWith('/admin-login');
  const isSharePage = pathname.startsWith('/share/story');

  const isLoggedIn = !!user;

  // Do not render the main header or footer on admin or share pages
  const showChrome = !isAdminPage && !isSharePage;

  return (
    <div className="relative flex min-h-screen flex-col">
      {showChrome && <Header isLoggedIn={isLoggedIn} />}
      <div className="flex-1">{children}</div>
      {showChrome && <Footer />}
    </div>
  );
}
