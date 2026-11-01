import type { Metadata } from 'next';
import { ShareCard } from './_components/ShareCard';
import { notFound } from 'next/navigation';
import { fetchTopicWithCuratedFallback } from '@/repositories';

interface SharePageProps {
  params: { id: string };
}

// 1. Metadata Generation
export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const topic = await fetchTopicWithCuratedFallback(params.id);

  if (!topic) {
    return { title: 'Story Not Found' };
  }

  const isArhuan =
    topic.id === 'arhuan-the-giant-prince-of-benin' ||
    (topic.title || '').toLowerCase().includes('arhuan');

  let desc = topic.description || 'Educational story for young Nigerians.';
  if (isArhuan && !desc.toLowerCase().includes('mama africa')) {
    desc = `Tribute to Mama Africa's YouTube storytelling channel. ${desc}`;
  }

  return {
    title: `Our Mumu Don Do: "${topic.title}"`,
    description: desc,
    openGraph: {
      title: topic.title,
      description: desc,
      images: [{ url: topic.pages?.[0]?.imageUrl || '' }],
    },
  };
}

// 2. The Main Page
export default async function SharePage({ params }: SharePageProps) {
  // IMPORTANT: Ensure we await params if using Next.js 15, 
  // but for 14.2.5 your current destructuring is fine.
  const topic = await fetchTopicWithCuratedFallback(params.id);

  if (!topic) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <ShareCard topic={topic} />
    </div>
  );
}