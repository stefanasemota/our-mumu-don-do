/** @SABI_LOCKED */
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { db } from '@/firebase/config'; // Use your standard config
import { doc, getDoc } from 'firebase/firestore';
import type { WeeklyEducationalTopic } from '@/types';

interface EditStoryPageProps {
  params: { id: string };
}

async function getTopic(id: string): Promise<WeeklyEducationalTopic | null> {
  try {
    // We use the same 'db' that works on your Share page and Dashboard
    const docRef = doc(db, 'weeklyEducationalTopics', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn(`[Sabi Edit] No topic found for ID: ${id}`);
      return null;
    }

    const data = docSnap.data();

    // Standard date conversion logic
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
    console.error(`[Sabi Edit] Error fetching topic ${id}:`, error);
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
          <CardTitle className="text-2xl font-bold">Editing: {story.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Your form will go here later */}
          <div className="p-4 bg-secondary/20 rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground italic">
              Ready to implement the edit form for story ID: {story.id}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}