'use client';

import { useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { ShareCard } from './_components/ShareCard';
import type { WeeklyEducationalTopic } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Loader2, Terminal } from 'lucide-react';
import { useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SharePage() {
  const params = useParams();
  const id = params.id as string;
  const firestore = useFirestore();
  const { toast } = useToast();

  const topicRef = doc(firestore, 'weeklyEducationalTopics', id);
  const { data: topic, isLoading, error } = useDoc<WeeklyEducationalTopic>(topicRef);

  useEffect(() => {
    if (error) {
      console.error('Failed to load topic:', error);
      toast({
        variant: 'destructive',
        title: 'Error Loading Story',
        description:
          'Could not fetch the story from the database. Please try again later.',
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-lg text-foreground">Loading Story...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
        <div className="w-full max-w-md">
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Failed to Load Story</AlertTitle>
            <AlertDescription>
              There was a problem retrieving the story data. It might have been
              moved or deleted.
            </AlertDescription>
          </Alert>
          <Button asChild variant="outline" className="mt-4 w-full">
            <Link href="/">
              <Home className="mr-2" /> Go to App
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!topic) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="absolute top-4 right-4">
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="mr-2" /> Go to App
          </Link>
        </Button>
      </div>
      <ShareCard topic={topic} />
    </div>
  );
}
