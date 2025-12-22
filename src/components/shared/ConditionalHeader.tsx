
import { cookies } from 'next/headers';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { AdminHeader } from '../admin/AdminHeader';

// This is a server component
export function ConditionalHeader() {
  const authToken = cookies().get('auth_token')?.value;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const isLoggedIn = !!ADMIN_PASSWORD && authToken === ADMIN_PASSWORD;

  // We can't use usePathname() in a server component, so we'll need a client wrapper
  // For now, let's pass isLoggedIn to both and let them decide to render
  // This logic will be handled inside the layouts and pages
  return <Header isLoggedIn={isLoggedIn} />;
}
