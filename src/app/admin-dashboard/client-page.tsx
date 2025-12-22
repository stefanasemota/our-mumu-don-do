'use client';

import { useEffect, useMemo } from 'react';
import {
  useAuth,
  useUser,
  initiateAnonymousSignIn,
  useCollection,
  useFirestore,
  useMemoFirebase,
} from '@/firebase';
import { SeedDatabaseButton } from '@/components/admin/SeedDatabaseButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getTopics } from '@/lib/seed-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Pencil } from 'lucide-react';
import type { WeeklyEducationalTopic } from '@/types';
import { collection, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface AdminDashboardClientPageProps {
  isLoggedIn: boolean;
}

function StoryList() {
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
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error Loading Stories</AlertTitle>
        <AlertDescription>
          Could not fetch stories from the database.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-2">
      {topics &&
        topics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center justify-between rounded-md border p-3"
          >
            <span className="font-medium">{topic.title}</span>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/admin-dashboard/edit/${topic.id}`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          </div>
        ))}
    </div>
  );
}

export default function AdminDashboardClientPage({
  isLoggedIn,
}: AdminDashboardClientPageProps) {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (isLoggedIn && !user && auth) {
      initiateAnonymousSignIn(auth);
    }
  }, [isLoggedIn, user, auth]);

  if (isUserLoading) {
    return (
      <div className="container mx-auto grid max-w-4xl gap-8 py-12 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-40" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto max-w-md py-12">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>
            You are not authorized to view this page. Please log in.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Get the local data only for the seed button.
  const localTopics = getTopics();

  return (
    <div className="container mx-auto grid max-w-4xl gap-8 py-12 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Manage Stories
          </CardTitle>
          <CardDescription>
            Select a story to edit its content and details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StoryList />
        </CardContent>
      </Card>
      <Card className="bg-secondary/50">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Database Tools
          </CardTitle>
          <CardDescription>
            Use these tools for initial setup or bulk data operations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 rounded-md border border-dashed p-4">
            <h3 className="font-semibold">Seed Database</h3>
            <p className="text-sm text-muted-foreground">
              This will upload all stories from the local data file to
              Firestore. Use this for initial setup or to restore content. It
              will overwrite existing stories with the same ID.
            </p>
            <SeedDatabaseButton localTopics={localTopics} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    