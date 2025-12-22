import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <AdminHeader />
      <main className="flex flex-1 items-center justify-center">
        {children}
      </main>
    </div>
  );
}
