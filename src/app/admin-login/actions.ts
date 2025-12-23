'use server';

import { login as sabiLogin, logout as sabiLogout } from '@stefan/sabi-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password') as string;

  if (!ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD environment variable not set.');
    return { error: 'Server configuration error.' };
  }

  if (password === ADMIN_PASSWORD) {
    await sabiLogin();
    // Invalidate the cache for the entire site to ensure a clean state
    revalidatePath('/', 'layout');
    return { success: true };
  }

  // If the password is not correct, return an error message.
  return { error: 'Invalid password.' };
}

export async function logout() {
  await sabiLogout();
  redirect('/admin-login');
}
