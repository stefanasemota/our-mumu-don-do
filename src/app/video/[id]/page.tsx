'use server';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import type { FeaturedVideo } from '@/types';
import { getAdminDB } from '@/lib/firebase-admin';

interface VideoPageProps {
  params: {
    id: string;
  };
}

async function getVideo(id: string): Promise<FeaturedVideo | null> {
  try {
    const db = getAdminDB();
    const doc = await db.collection('videos').doc(id).get();

    if (!doc.exists) {
      return null;
    }

    const data = doc.data();
    if (!data) {
      return null;
    }

    return {
      ...data,
      id: doc.id,
    } as FeaturedVideo;
  } catch (error) {
    console.error(`Failed to fetch video ${id}:`, error);
    return null;
  }
}

export default async function VideoPage({ params }: VideoPageProps) {
  const video = await getVideo(params.id);

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
      <VideoPlayer video={video} />
    </div>
  );
}

    