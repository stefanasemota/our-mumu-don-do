
import { getTopicById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ShareCard } from './_components/ShareCard';
import type { WeeklyEducationalTopic } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import type { Metadata } from 'next';

interface SharePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const topic = await getTopicById(params.id);

  if (!topic) {
    return {
      title: 'Story Not Found',
    };
  }

  // Use the first page's image as the preview image for social sharing
  const imageUrl =
    topic.pages.length > 0 && topic.pages[0].imageUrl
      ? `https://our-mumu-don-do.sabiai.work${topic.pages[0].imageUrl}`
      : 'https://our-mumu-don-do.sabiai.work/images/og-image.png'; // A fallback image

  return {
    title: topic.title,
    description: topic.description,
    openGraph: {
      title: topic.title,
      description: topic.description,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: topic.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: topic.title,
      description: topic.description,
      images: [imageUrl],
    },
  };
}


export default async function SharePage({ params }: SharePageProps) {
  const topicData = await getTopicById(params.id);

  if (!topicData) {
    notFound();
  }

  // The data is now correctly formatted by getTopicById, so we can pass it directly.
  const topic: WeeklyEducationalTopic = topicData;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="absolute top-4 right-4">
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="mr-2" /> Go to App
          </Link>
        </Button>
      </div>
      <ShareCard topic={topic} />
    </div>
  );
}
