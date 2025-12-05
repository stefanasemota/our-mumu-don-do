'use client';

import type { FeaturedVideo } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface VideoPlayerProps {
  video: FeaturedVideo;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-2xl shadow-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
          {video.title}
        </CardTitle>
        {video.videographer && (
          <CardDescription>By {video.videographer}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full rounded-lg overflow-hidden border mb-4 bg-black">
          <video controls className="w-full h-full">
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-foreground/80">{video.summary}</p>
      </CardContent>
    </Card>
  );
}
