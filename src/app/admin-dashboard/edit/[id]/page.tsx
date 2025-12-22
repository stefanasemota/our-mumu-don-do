'use client';

import { useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface EditStoryPageProps {
  params: {
    id: string;
  };
}

export default function EditStoryPage({ params }: EditStoryPageProps) {
  const firestore = useFirestore();
  const storyRef = doc(firestore, 'weeklyEducationalTopics', params.id);
  const { data: story, isLoading, error } = useDoc(storyRef);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-2xl py-12">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    // This will be caught by the global error handler
    throw error;
  }

  if (!story) {
    return notFound();
  }

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Editing: {story.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Edit form will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
