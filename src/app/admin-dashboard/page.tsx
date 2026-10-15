'use server';

import { cookies } from 'next/headers';
import AdminDashboardClientPage from './client-page';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('__session');

  return (
    <AdminDashboardClientPage 
      isLoggedIn={isLoggedIn} 
    />
  );
}
