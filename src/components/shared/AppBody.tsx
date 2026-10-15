'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

export function AppBody({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
  const pathname = usePathname();

  const isAdminPage =
    pathname.startsWith('/admin-dashboard') ||
    pathname.startsWith('/admin-login');
  const isSharePage = pathname.startsWith('/share/story');
  const isStoryPage = pathname.startsWith('/story/');

  // Hide the global header on admin, share, and story reader pages (story player has its own header)
  const showHeader = !isAdminPage && !isSharePage && !isStoryPage;
  // Render the footer on all standard pages including story reader pages
  const showFooter = !isAdminPage && !isSharePage;

  return (
    <div className="relative flex min-h-screen flex-col">
      {showHeader && <Header isLoggedIn={isLoggedIn} />}
      <div className="flex-1">{children}</div>
      {showFooter && <Footer />}
    </div>
  );
}
