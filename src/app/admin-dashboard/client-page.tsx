'use client';

import { useEffect } from 'react';
import { useAuth, useUser, initiateAnonymousSignIn } from '@/firebase';
import { SeedDatabaseButton } from '@/components/admin/SeedDatabaseButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getTopics } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface AdminDashboardClientPageProps {
  isLoggedIn: boolean;
}

export default function AdminDashboardClientPage({
  isLoggedIn,
}: AdminDashboardClientPageProps) {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    // If the server confirmed we are logged in, but the client-side
    // Firebase user is not authenticated, we initiate an anonymous sign-in.
    if (isLoggedIn && !user && auth) {
      initiateAnonymousSignIn(auth);
    }
  }, [isLoggedIn, user, auth]);

  // Show a loading state while Firebase checks the auth status.
  if (isUserLoading) {
    return (
      <div className="container mx-auto max-w-md py-12">
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
      </div>
    );
  }

  // If the server says we're not logged in, show an error.
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
  
  // Get local topics for the seeding button
  const localTopics = getTopics(true);

  return (
    <div className="container mx-auto max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Database Management
          </CardTitle>
          <CardDescription>
            Use these tools to manage the application content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-semibold">Seed Database</h3>
            <p className="text-sm text-muted-foreground">
              Click the button below to upload all the stories from the local
              data file into the Firestore database. This should only be done
              once.
            </p>
            <SeedDatabaseButton localTopics={localTopics} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
