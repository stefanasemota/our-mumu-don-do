
'use server';

import { StoryPlayer } from '@/components/story/StoryPlayer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { WeeklyEducationalTopic } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

interface StoryPageProps {
  params: {
    id: string;
  };
}

async function getTopic(id: string): Promise<WeeklyEducationalTopic | null> {
  try {
    const docRef = doc(db, 'weeklyEducationalTopics', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    if (!data) {
      return null;
    }
    
    // Handle date conversion safely
    let dateString = '';
    if (data.date?.toDate) {
      dateString = data.date.toDate().toISOString();
    } else if (data.date) {
      dateString = new Date(data.date).toISOString();
    }


    return {
      ...data,
      id: docSnap.id,
      date: dateString,
    } as WeeklyEducationalTopic;
  } catch (error) {
    console.error(`Failed to fetch topic ${id}:`, error);
    return null;
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const topic = await getTopic(params.id);

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
