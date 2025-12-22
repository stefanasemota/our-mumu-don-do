'use client';

import Link from 'next/link';
import { Icons } from './Icons';
import { Button } from '../ui/button';
import { LogoutButton } from '../admin/LogoutButton';
import { LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  isLoggedIn: boolean;
}

export function Header({ isLoggedIn }: HeaderProps) {
  const pathname = usePathname();
  const isAdminPage =
    pathname.startsWith('/admin-dashboard') || pathname.startsWith('/admin-login');

  if (isAdminPage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-start justify-center gap-2 px-4 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.gorilla className="h-8 w-8 text-primary" />
          <span className="inline-block font-headline text-xl font-bold text-primary">
            Our Mumu Don Do
          </span>
        </Link>
        <div className="flex items-center">
          {isLoggedIn && (
            <div className="flex items-center space-x-2">
              <Button asChild variant="secondary" size="sm">
                <Link href="/admin-dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Admin
                </Link>
              </Button>
              <LogoutButton />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
