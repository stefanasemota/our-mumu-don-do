import { getFeaturedVideoById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface VideoPageProps {
  params: {
    id: string;
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const video = await getFeaturedVideoById(params.id);

  if (!video) {
    notFound();
  }

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
          <div className="aspect-video w-full rounded-lg overflow-hidden border mb-4">
            <video src={video.videoUrl} controls className="w-full h-full" />
          </div>
          <p className="text-foreground/80">{video.summary}</p>
        </CardContent>
      </Card>
    </div>
  );
}
