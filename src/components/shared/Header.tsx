
'use client';

import Link from 'next/link';
import { Icons } from './Icons';
import { Button } from '../ui/button';
import { ShareButton } from './ShareButton';
import { LogoutButton } from '../admin/LogoutButton';
import { LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { AdminHeader } from '../admin/AdminHeader';

interface HeaderProps {
  isLoggedIn: boolean;
}

export function Header({ isLoggedIn }: HeaderProps) {
  const pathname = usePathname();
  const isAdminPage =
    pathname.startsWith('/admin-dashboard') || pathname.startsWith('/admin-login');

  if (isAdminPage && isLoggedIn) {
    return <AdminHeader />;
  }

  if (isAdminPage && !isLoggedIn) {
    return null; // Don't render any header on login page if not logged in
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between space-x-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.gorilla className="h-8 w-8 text-primary" />
            <span className="inline-block font-headline text-xl font-bold text-primary">
              Our Mumu Don Do
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <>
              <Button asChild variant="secondary">
                <Link href="/admin-dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Admin Dashboard
                </Link>
              </Button>
              <LogoutButton />
            </>
          ) : (
            <ShareButton />
          )}
        </div>
      </div>
    </header>
  );
}
