'use server';

import type { WeeklyEducationalTopic } from '@/types';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getAdminDB } from '@/lib/firebase-admin';

interface EditStoryPageProps {
  params: {
    id: string;
  };
}

async function getTopic(id: string): Promise<WeeklyEducationalTopic | null> {
  // Per instructions, using the Admin SDK is appropriate here for server-side fetching
  // in a protected route. This differs from the public share page.
  try {
    const db = getAdminDB();
    const docRef = db.collection('weeklyEducationalTopics').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.warn(`[Admin Edit] No topic found for ID: ${id}`);
      return null;
    }

    const data = docSnap.data();
    if (!data) return null;

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
    console.error(`[Admin Edit] Error fetching topic ${id}:`, error);
    // In case of a server error, we can also treat it as 'not found' to the client
    return null;
  }
}

export default async function EditStoryPage({ params }: EditStoryPageProps) {
  const story = await getTopic(params.id);

  if (!story) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Editing: {story.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Edit form will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
