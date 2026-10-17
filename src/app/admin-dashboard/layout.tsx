import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';

// This layout wraps all pages in the admin-dashboard route group.
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionVal = cookieStore.get('__session')?.value;
  const isAuthenticated = Boolean(
    process.env.ADMIN_PASSWORD &&
    sessionVal &&
    sessionVal === process.env.ADMIN_PASSWORD
  );

  if (!isAuthenticated) {
    redirect('/admin-login');
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AdminHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
