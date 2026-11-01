
'use server';

import { StoryPlayer } from '@/components/story/StoryPlayer';
import { notFound } from 'next/navigation';
import { fetchTopicWithCuratedFallback } from '@/repositories';

interface StoryPageProps {
  params: {
    id: string;
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const topic = await fetchTopicWithCuratedFallback(params.id);

  if (!topic) {
    notFound();
  }

  // Prepend description to the first page's text for consistent display
  if (topic.description && topic.pages && topic.pages.length > 0) {
    // Clone the pages array and the first page object to avoid direct mutation
    topic.pages = [...topic.pages];
    topic.pages[0] = { ...topic.pages[0] };
    
    // Prepend description only if it's not already there
    if (!topic.pages[0].text.startsWith(topic.description)) {
        topic.pages[0].text = `${topic.description}\n\n${topic.pages[0].text}`;
    }
  }

  return (
    <main className="min-h-screen bg-surface text-on-surface pb-safe">
      <StoryPlayer topic={topic} standalone={true} />
    </main>
  );
}
