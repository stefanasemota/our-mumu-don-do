'use server';

import type { Metadata } from 'next';
import { getAdminDB } from '@/lib/firebase-admin';
import type { WeeklyEducationalTopic } from '@/types';
import { ShareCard } from './_components/ShareCard';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SharePageProps {
  params: {
    id: string;
  };
}

async function getTopicById(
  id: string
): Promise<WeeklyEducationalTopic | null> {
  try {
    const db = getAdminDB();
    const docRef = db.collection('weeklyEducationalTopics').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.warn(`Share page: No topic found for ID: ${id}`);
      return null;
    }

    const data = doc.data();
    if (!data) {
      return null;
    }

    // Convert Firestore Timestamp to a serializable string
    const topicData = {
      ...data,
      id: doc.id,
      date: data.date.toDate().toISOString(),
    } as WeeklyEducationalTopic;

    return topicData;
  } catch (error) {
    console.error('Error fetching topic by ID for share page:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const topic = await getTopicById(params.id);

  if (!topic) {
    return {
      title: 'Story Not Found',
      description: 'The story you are looking for could not be found.',
    };
  }

  return {
    title: `Our Mumu Don Do: "${topic.title}"`,
    description:
      topic.description ||
      'An educational story for young Nigerians to foster critical thinking.',
    openGraph: {
      title: topic.title,
      description: topic.description,
      images: [
        {
          url: topic.pages?.[0]?.imageUrl || '',
          width: 1200,
          height: 630,
          alt: topic.title,
        },
      ],
    },
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const topic = await getTopicById(params.id);

  if (!topic) {
    // Use Next.js notFound() to render the nearest 404 page
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <ShareCard topic={topic} />
    </div>
  );
}
