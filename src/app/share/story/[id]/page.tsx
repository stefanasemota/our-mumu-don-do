'use client';

import { notFound, useParams } from 'next/navigation';
import { ShareCard } from './_components/ShareCard';
import type { WeeklyEducationalTopic } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Loader2 } from 'lucide-react';
import { useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function SharePage() {
  const params = useParams();
  const id = params.id as string;
  const firestore = useFirestore();

  const topicRef = doc(firestore, 'weeklyEducationalTopics', id);
  const { data: topic, isLoading, error } = useDoc<WeeklyEducationalTopic>(topicRef);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-lg text-foreground">Loading Story...</p>
      </div>
    );
  }

  if (error) {
    console.error('Failed to load topic:', error);
    // You could show a more user-friendly error message here
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
