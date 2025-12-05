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
  CardHeader,
  CardTitle,
} from '../ui/card';
import { PlayCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedVideosProps {
  videos: FeaturedVideo[];
}

export function FeaturedVideos({ videos }: FeaturedVideosProps) {
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
            <div className="p-1">
              <Card className="overflow-hidden group">
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
                   {/* In a real app, you might link to a video player page */}
                  <Link href="#" className="absolute inset-0" aria-label={`Play video: ${video.title}`}></Link>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-lg leading-snug">
                    {video.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">
                    {video.summary}
                  </CardDescription>
                </CardContent>
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
