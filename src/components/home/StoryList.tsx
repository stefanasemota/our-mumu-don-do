'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { WeeklyEducationalTopic, GuidelineCategory } from '@/types';
import { collection, query, orderBy } from 'firebase/firestore';
import { TopicAccordion } from './TopicAccordion';
import { Skeleton } from '../ui/skeleton';
import {
  BrainCircuit,
  Landmark,
  Users,
} from 'lucide-react';

const guidelines: {
  category: GuidelineCategory;
  icon: React.ElementType;
  description: string;
}[] = [
  {
    category: 'Critical Thinking',
    icon: BrainCircuit,
    description: 'Encouraging questions and analytical skills.',
  },
  {
    category: 'Historical Context',
    icon: Landmark,
    description: 'Understanding our past to shape a better future.',
  },
  {
    category: 'Unity & Identity',
    icon: Users,
    description: 'Exploring the diverse cultures that make us one.',
  },
];


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
    
  const groupedTopics = guidelines.map(guideline => ({
    ...guideline,
    stories: processedTopics.filter(topic => 
      Array.isArray(topic.guidelineCategory) 
        ? topic.guidelineCategory.includes(guideline.category)
        : topic.guidelineCategory === guideline.category
    ),
  }));

  return (
    <div className="space-y-12">
      {groupedTopics.map(({ category, icon: Icon, description, stories }) => {
        const isCriticalThinking = category === 'Critical Thinking';
        const defaultOpenStoryId = (isCriticalThinking && stories.length > 0) ? stories[0].id : undefined;

        return (
          <div key={category}>
            <div className="mb-4 flex items-center gap-3">
               <Icon className="h-7 w-7 text-primary" />
               <div>
                  <h2 className="text-2xl font-headline font-semibold text-foreground/90">{category}</h2>
                  <p className="text-muted-foreground">{description}</p>
               </div>
            </div>
            <TopicAccordion topics={stories} defaultValue={defaultOpenStoryId} />
          </div>
        );
      })}
    </div>
  );
}
