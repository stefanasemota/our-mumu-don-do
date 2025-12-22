'use server';

import { cookies } from 'next/headers';
import AdminDashboardClientPage from './client-page';

export default async function AdminDashboardPage() {
  const authToken = cookies().get('auth_token')?.value;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const isLoggedIn = !!ADMIN_PASSWORD && authToken === ADMIN_PASSWORD;

  return <AdminDashboardClientPage isLoggedIn={isLoggedIn} />;
}
