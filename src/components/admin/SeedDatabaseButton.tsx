
'use client';

import { useFirestore, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { WeeklyEducationalTopic } from '@/types';
import { collection, writeBatch } from 'firebase/firestore';
import { useState } from 'react';
import { Database } from 'lucide-react';

interface SeedDatabaseButtonProps {
  localTopics: WeeklyEducationalTopic[];
}

export function SeedDatabaseButton({ localTopics }: SeedDatabaseButtonProps) {
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedDatabase = async () => {
    if (!firestore || !user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to seed the database.',
      });
      return;
    }

    setIsSeeding(true);

    try {
      const batch = writeBatch(firestore);
      const topicsCollection = collection(firestore, 'weeklyEducationalTopics');

      localTopics.forEach((topic) => {
        // Create a deep copy to avoid modifying the original local data
        const topicWithPrependedDesc = JSON.parse(
          JSON.stringify(topic)
        ) as WeeklyEducationalTopic;

        // Ensure the description is prepended to the first page text
        if (
          topicWithPrependedDesc.description &&
          topicWithPrependedDesc.pages &&
          topicWithPrependedDesc.pages.length > 0
        ) {
          const firstPageText = topicWithPrependedDesc.pages[0].text;
          // Prepend only if it's not already there
          if (!firstPageText.includes(topicWithPrependedDesc.description)) {
            topicWithPrependedDesc.pages[0].text = `${topicWithPrependedDesc.description}\n\n${firstPageText}`;
          }
        }
        
        // Use the topic's own ID for the document reference
        const docRef = collection(topicsCollection).doc(topic.id);
        batch.set(docRef, topicWithPrependedDesc);
      });

      await batch.commit();

      toast({
        title: 'Database Seeded!',
        description: `${localTopics.length} stories have been successfully uploaded to Firestore.`,
      });
    } catch (error: any) {
      console.error('Error seeding database:', error);
      toast({
        variant: 'destructive',
        title: 'Seeding Failed',
        description:
          error.message || 'An unknown error occurred while seeding.',
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button
      onClick={handleSeedDatabase}
      disabled={isSeeding || !user || !firestore}
    >
      <Database className="mr-2 h-4 w-4" />
      {isSeeding ? 'Seeding...' : 'Seed Database'}
    </Button>
  );
}
