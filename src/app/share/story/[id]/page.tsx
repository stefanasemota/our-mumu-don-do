import type { Metadata } from 'next';
import { db } from '@/firebase/config'; // Import your standard config
import { doc, getDoc } from 'firebase/firestore'; // Use standard Web SDK
import type { WeeklyEducationalTopic } from '@/types';
import { ShareCard } from './_components/ShareCard';
import { notFound } from 'next/navigation';
import { getCuratedTopic } from '@/lib/curated-topics';

interface SharePageProps {
  params: { id: string };
}

// 1. IMPROVED: Standard Fetcher (No Admin SDK needed)
async function getTopicById(id: string): Promise<WeeklyEducationalTopic | null> {
  const curated = getCuratedTopic(id);

  try {
    const docRef = doc(db, 'weeklyEducationalTopics', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data) {
        let dateString = '';
        if (data.date?.toDate) {
          dateString = data.date.toDate().toISOString();
        } else if (data.date) {
          dateString = new Date(data.date).toISOString();
        }

        return {
          ...curated,
          ...data,
          audioUrlDeCH: data.audioUrlDeCH || curated?.audioUrlDeCH,
          id: docSnap.id,
          date: dateString,
        } as WeeklyEducationalTopic;
      }
    }
  } catch (error) {
    console.warn('[Sabi Share] Error fetching topic from Firestore:', error);
  }

  // Fallback to built-in curated catalog
  if (curated) {
    return curated;
  }

  return null;
}

// 2. Metadata Generation
export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const topic = await getTopicById(params.id);

  if (!topic) {
    return { title: 'Story Not Found' };
  }

  return {
    title: `Our Mumu Don Do: "${topic.title}"`,
    description: topic.description || 'Educational story for young Nigerians.',
    openGraph: {
      title: topic.title,
      description: topic.description,
      images: [{ url: topic.pages?.[0]?.imageUrl || '' }],
    },
  };
}

// 3. The Main Page
export default async function SharePage({ params }: SharePageProps) {
  // IMPORTANT: Ensure we await params if using Next.js 15, 
  // but for 14.2.5 your current destructuring is fine.
  const topic = await getTopicById(params.id);

  if (!topic) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <ShareCard topic={topic} />
    </div>
  );
}