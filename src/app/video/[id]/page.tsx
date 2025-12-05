import { getFeaturedVideoById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import type { FeaturedVideo } from '@/types';

interface VideoPageProps {
  params: {
    id: string;
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const videoData = await getFeaturedVideoById(params.id);

  if (!videoData) {
    notFound();
  }

  // Ensure video data is serializable for the client component
  const video: FeaturedVideo = {
    ...videoData,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <VideoPlayer video={video} />
    </div>
  );
}
