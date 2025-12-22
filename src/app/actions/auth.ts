'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_COOKIE_NAME = '__session';

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password');

  if (!ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD environment variable not set.');
    return { error: 'Server configuration error.' };
  }

  if (password === ADMIN_PASSWORD) {
    cookies().set(AUTH_COOKIE_NAME, ADMIN_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
    });
    // Invalidate the cache for the entire site to ensure a clean state
    revalidatePath('/', 'layout');
    return { success: true };
  }

  // If the password is not correct, return an error message.
  return { error: 'Invalid password.' };
}

export async function logout() {
  cookies().delete(AUTH_COOKIE_NAME);
  redirect('/admin-login');
}
