'use server';

import { loginAdmin, logoutAdmin } from '@stefan/sabi-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function handleLoginAction(prevState: any, formData: FormData) {
  // 1. Call the correct library function: loginAdmin
  // We pass the formData and the secret from the server environment
  const result = await loginAdmin(formData, process.env.ADMIN_PASSWORD);

  if (result.success) {
    // 2. Clear the cache and go to dashboard
    revalidatePath('/', 'layout');
    redirect('/admin-dashboard');
  }

  // 3. Return the error if login failed
  return { error: "Invalid password. Please try again." };
}

export async function handleLogoutAction() {
  await logoutAdmin();
  revalidatePath('/', 'layout');
  redirect('/admin-login');
}
