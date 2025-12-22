import { SeedDatabaseButton } from '@/components/admin/SeedDatabaseButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getTopics } from '@/lib/data';

export default function AdminDashboardPage() {
  const localTopics = getTopics(true); // Get local topics for seeding

  return (
    <Card className="w-full max-w-md">
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
  );
}
