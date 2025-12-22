
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AdminHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
