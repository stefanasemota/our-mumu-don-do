
'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';

interface ConditionalHeaderProps {
  isLoggedIn: boolean;
}

export function ConditionalHeader({ isLoggedIn }: ConditionalHeaderProps) {
  const pathname = usePathname();
  const isAdminPage =
    pathname.startsWith('/admin-dashboard') || pathname.startsWith('/admin-login');

  if (isAdminPage) {
    return null; // Don't render the main header on admin pages
  }

  return <Header isLoggedIn={isLoggedIn} />;
}
