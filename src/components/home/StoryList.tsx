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
        ? query(
            collection(firestore, 'weeklyEducationalTopics'),
            orderBy('date', 'desc')
          )
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

  // Prepend description to the first page's text for consistent display
  const processedTopics =
    topics?.map((topic) => {
      const newTopic = { ...topic };
      if (newTopic.description && newTopic.pages && newTopic.pages.length > 0) {
        // Clone the pages array and the first page object to avoid direct mutation
        newTopic.pages = [...newTopic.pages];
        newTopic.pages[0] = { ...newTopic.pages[0] };
        
        // Prepend description only if it's not already there
        if (!newTopic.pages[0].text.startsWith(newTopic.description)) {
            newTopic.pages[0].text = `${newTopic.description}\n\n${newTopic.pages[0].text}`;
        }
      }
      // Also ensure date is a string for serializability
      newTopic.date =
        newTopic.date instanceof Date
          ? newTopic.date.toISOString()
          : String(newTopic.date);
          
      return newTopic;
    }) || [];

  return <TopicAccordion topics={processedTopics} />;
}
