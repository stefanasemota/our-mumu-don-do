'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Icons } from '../shared/Icons';
import { LogoutButton } from './LogoutButton';
import { ArrowLeft } from 'lucide-react';

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between space-x-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.gorilla className="h-8 w-8 text-primary" />
            <span className="inline-block font-headline text-xl font-bold text-primary">
              Admin Dashboard
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Main App
            </Link>
          </Button>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
