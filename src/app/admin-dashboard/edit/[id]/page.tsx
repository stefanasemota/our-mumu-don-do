/** @SABI_LOCKED */
import { notFound } from 'next/navigation';
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import type { WeeklyEducationalTopic } from '@/types';
import EditStoryForm from '@/components/admin/EditStoryForm';

interface EditStoryPageProps {
  params: { id: string };
}

export default async function EditStoryPage({ params }: EditStoryPageProps) {
  const { id } = params;

  let story = null;
  try {
    const docRef = doc(db, 'weeklyEducationalTopics', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      story = { id: docSnap.id, ...docSnap.data() } as WeeklyEducationalTopic;
    }
  } catch (error) {
    console.error("Sabi Fetch Error:", error);
  }

  if (!story) return notFound();

  return (
    <main className="container mx-auto max-w-2xl py-8 px-4">
      <EditStoryForm story={story} />
    </main>
  );
}