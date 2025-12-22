import { AdminHeader } from '@/components/admin/AdminHeader';
import { FirebaseClientProvider } from '@/firebase';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
      <div className="flex min-h-screen flex-col bg-secondary">
        <AdminHeader />
        <main className="flex flex-1 items-center justify-center">
          {children}
        </main>
      </div>
    </FirebaseClientProvider>
  );
}
