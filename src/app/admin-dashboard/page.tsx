import { SeedDatabaseButton } from '@/components/admin/SeedDatabaseButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LogoutButton } from '@/components/admin/LogoutButton';
import { getTopics } from '@/lib/data';

export default function AdminDashboardPage() {
  const localTopics = getTopics(true); // Get local topics for seeding

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      <div className="absolute top-4 right-4">
        <LogoutButton />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Admin Dashboard
          </CardTitle>
          <CardDescription>
            Use these tools to manage the application content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-semibold">Database Tools</h3>
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
