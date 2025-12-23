// app/admin-login/actions.ts
'use server';

import { loginAdmin, logoutAdmin as sabiLogout } from '@stefan/sabi-auth';
import { redirect } from 'next/navigation';

export async function handleLoginAction(prevState: any, formData: FormData) {
  // Pass the password from your environment to your library
  const result = await loginAdmin(formData, process.env.ADMIN_PASSWORD);

  if (result.success) {
    redirect('/admin-dashboard');
  }

  return { error: "Invalid password. Please try again." };
}

export async function handleLogoutAction() {
  // This runs on the SERVER, where cookies() is allowed
  await sabiLogout();
  
  // After deleting the cookie, redirect to login
  redirect('/admin-login');
}