'use client';

import { Button } from '../ui/button';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ShareButton() {
  const { toast } = useToast();

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
    <Button onClick={handleShare} variant="secondary">
      <Share2 className="mr-2 h-4 w-4" />
      Share App
    </Button>
  );
}
