
'use client';

import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Share2, HandHeart } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Footer() {
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
    <footer className="w-full mt-auto py-6 border-t border-border bg-background/60 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm font-medium text-foreground/80 flex items-center gap-2">
            Built with <HandHeart className="h-4 w-4 text-amber-500 animate-pulse" /> by{' '}
            <a
              href="https://sabiai.work/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-primary transition-colors"
            >
              sabiai.work
            </a>
          </p>
          <p className="text-xs text-muted-foreground">&copy; 2026 NaijaSpeak Ecosystem</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>
          <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20 shadow-[0_0_10px_rgba(243,141,21,0.2)]">
            v1.3.0
          </div>
          <Link
            href="/about"
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
