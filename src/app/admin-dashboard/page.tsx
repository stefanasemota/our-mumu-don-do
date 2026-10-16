'use server';

import { cookies } from 'next/headers';
import AdminDashboardClientPage from './client-page';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const sessionVal = cookieStore.get('__session')?.value;
  const isLoggedIn = Boolean(
    process.env.ADMIN_PASSWORD &&
    sessionVal &&
    sessionVal === process.env.ADMIN_PASSWORD
  );

  return (
    <AdminDashboardClientPage 
      isLoggedIn={isLoggedIn} 
    />
  );
}
