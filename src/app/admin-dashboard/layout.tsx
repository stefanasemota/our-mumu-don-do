import { AdminHeader } from '@/components/admin/AdminHeader';

// This layout wraps all pages in the admin-dashboard route group.
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
