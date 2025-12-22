
import { getTopicById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ShareCard } from './_components/ShareCard';
import type { WeeklyEducationalTopic } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

interface SharePageProps {
  params: {
    id: string;
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
