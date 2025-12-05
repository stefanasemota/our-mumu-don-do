'use client';

import type { FeaturedVideo } from '@/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { PlayCircle, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface FeaturedVideosProps {
  videos: FeaturedVideo[];
}

export function FeaturedVideos({ videos }: FeaturedVideosProps) {
  const { toast } = useToast();

  const handleShare = async (video: FeaturedVideo) => {
    const shareData = {
      title: video.title,
      text: video.summary,
      url: `${window.location.origin}/video/${video.id}`,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
        // Toast for share cancellation is often not needed, but can be added if desired.
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: 'Link Copied!',
          description: 'The video link has been copied to your clipboard.',
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
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {videos.map((video) => (
          <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full">
              <Card className="overflow-hidden group flex flex-col h-full">
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-primary transition-colors" />
                  </div>
                  <Link
                    href={`/video/${video.id}`}
                    className="absolute inset-0"
                    aria-label={`Play video: ${video.title}`}
                  ></Link>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-lg leading-snug">
                    {video.title}
                  </CardTitle>
                  {video.videographer && (
                    <p className="text-sm text-muted-foreground pt-1">
                      By {video.videographer}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-sm text-muted-foreground">
                    {video.summary}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => handleShare(video)}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
