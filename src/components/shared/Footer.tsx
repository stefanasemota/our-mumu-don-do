
'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { Share2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const pathname = usePathname();
  const isAdminPage =
    pathname.startsWith('/admin-dashboard') || pathname.startsWith('/admin-login');

  const handleShare = async () => {
    const shareData = {
      title: 'Our Mumu Don Do',
      text: 'An educational platform for young Nigerians, fostering critical thinking and celebrating our heritage.',
      url: 'https://our-mumu-don-do.sabiai.work/',
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: 'Link Copied!',
          description: 'The app link has been copied to your clipboard.',
        });
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to Copy',
          description: 'Could not copy the link to your clipboard.',
        });
      }
    }
  };

  if (isAdminPage) {
    return null;
  }

  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto flex flex-col items-start justify-center gap-4 px-4 py-6">
        <Button onClick={handleShare}>
          <Share2 className="mr-2" />
          Share App
        </Button>
        <p className="space-x-2 text-sm text-muted-foreground">
          <span>&copy; {currentYear} Our Mumu Don Do.</span>
          <span className="font-semibold text-primary">v1.0</span>
          <span className="text-border">|</span>
          <Link
            href="/about"
            className="font-semibold text-primary hover:underline"
          >
            About
          </Link>
        </p>
      </div>
    </footer>
  );
}
