import { StoryPlayer } from '@/components/story/StoryPlayer';
import { getTopicById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface StoryPageProps {
  params: {
    id: string;
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const topic = await getTopicById(params.id);

  if (!topic) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Topics
          </Link>
        </Button>
      </div>
      <StoryPlayer topic={topic} />
    </div>
  );
}
