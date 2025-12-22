'use server';

import { StoryPlayer } from '@/components/story/StoryPlayer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { WeeklyEducationalTopic } from '@/types';
import { getAdminDB } from '@/lib/firebase-admin';

interface StoryPageProps {
  params: {
    id: string;
  };
}

async function getTopic(id: string): Promise<WeeklyEducationalTopic | null> {
  try {
    const db = getAdminDB();
    const doc = await db.collection('weeklyEducationalTopics').doc(id).get();

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
      date: data.date.toDate().toISOString(),
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
