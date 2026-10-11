'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { WeeklyEducationalTopic } from '@/types';
import { collection, query, orderBy } from 'firebase/firestore';
import { DiscoverStoriesKidsEdition } from './DiscoverStoriesKidsEdition';
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
      <div className="space-y-6 pt-2">
        <Skeleton className="h-44 w-full rounded-3xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error) {
    // Graceful fallback to curated kids catalog
    return <DiscoverStoriesKidsEdition topics={[]} />;
  }

  // Prepend description to the first page's text for consistent display
  const processedTopics =
    topics?.map((topic) => {
      const newTopic = { ...topic };
      if (newTopic.description && newTopic.pages && newTopic.pages.length > 0) {
        newTopic.pages = [...newTopic.pages];
        newTopic.pages[0] = { ...newTopic.pages[0] };

        if (!newTopic.pages[0].text.startsWith(newTopic.description)) {
          newTopic.pages[0].text = `${newTopic.description}\n\n${newTopic.pages[0].text}`;
        }
      }
      newTopic.date =
        newTopic.date instanceof Date
          ? newTopic.date.toISOString()
          : String(newTopic.date);

      return newTopic;
    }) || [];

  return <DiscoverStoriesKidsEdition topics={processedTopics} />;
}
