'use client';

import Link from 'next/link';
import { Icons } from './Icons';
import { Button } from '../ui/button';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Header() {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: 'Our Mumu Don Do',
      text: 'An educational platform for young Nigerians, fostering critical thinking and celebrating our heritage.',
      url: window.location.origin,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // User cancelled the share, no need to show an error.
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
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
          <Button onClick={handleShare} variant="secondary">
            <Share2 className="mr-2 h-4 w-4" />
            Share App
          </Button>
        </div>
      </div>
    </header>
  );
}
