'use client';

import Link from 'next/link';
import { Icons } from './Icons';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.gorilla className="h-8 w-8 text-primary" />
            <span className="inline-block font-headline text-xl font-bold">
              Our Mumu Don Do
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
