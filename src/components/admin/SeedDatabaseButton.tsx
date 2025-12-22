'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore } from '@/firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import type { WeeklyEducationalTopic } from '@/types';

interface SeedDatabaseButtonProps {
  localTopics: WeeklyEducationalTopic[];
}

export function SeedDatabaseButton({ localTopics }: SeedDatabaseButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const auth = useAuth();

  const handleSeed = async () => {
    setIsLoading(true);
    if (!firestore || !auth) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Firebase is not initialized.',
      });
      setIsLoading(false);
      return;
    }

    // Our security rules require an authenticated user to write.
    // The admin login process should ensure currentUser is available here.
    if (!auth.currentUser) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in as an admin to seed the database.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const batch = writeBatch(firestore);
      const topicsCollection = collection(
        firestore,
        'weeklyEducationalTopics'
      );

      localTopics.forEach((topic) => {
        const docRef = doc(topicsCollection, topic.id);
        // Convert date string back to Date object for Firestore
        const topicDataForFirestore = {
          ...topic,
          date: new Date(topic.date),
        };
        batch.set(docRef, topicDataForFirestore);
      });

      await batch.commit();

      toast({
        title: 'Database Seeded',
        description: `${localTopics.length} topics have been uploaded to Firestore.`,
      });
    } catch (error: any) {
      console.error('Error seeding database:', error);
      toast({
        variant: 'destructive',
        title: 'Database Seed Failed',
        description: error.message || 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSeed} disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Seed Database
    </Button>
  );
}
