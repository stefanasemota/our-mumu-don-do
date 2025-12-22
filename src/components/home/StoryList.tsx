'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { WeeklyEducationalTopic } from '@/types';
import { collection, query, orderBy } from 'firebase/firestore';
import { TopicAccordion } from './TopicAccordion';
import { Skeleton } from '../ui/skeleton';

export function StoryList() {
  const firestore = useFirestore();

  const topicsQuery = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'weeklyEducationalTopics'), orderBy('date', 'desc'))
        : null,
    [firestore]
  );

  const {
    data: topics,
    isLoading,
    error,
  } = useCollection<WeeklyEducationalTopic>(topicsQuery);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  if (error) {
    // This will be caught by the FirebaseErrorListener
    throw error;
  }

  // Convert date objects to strings for serializability, which StoryPlayer expects
  const serializedTopics =
    topics?.map((topic) => ({
      ...topic,
      date:
        topic.date instanceof Date
          ? topic.date.toISOString()
          : String(topic.date),
    })) || [];


  return <TopicAccordion topics={serializedTopics} />;
}
