'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_COOKIE_NAME = 'auth_token';

export async function login(prevState: any, formData: FormData) {
  try {
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
      // This is the fix: Clear the cache for the dashboard layout
      revalidatePath('/admin-dashboard', 'layout');
      // Then redirect
      redirect('/admin-dashboard');
    } else {
      return { error: 'Invalid password.' };
    }
  } catch (error) {
    if (error instanceof Error) {
      // The redirect() function throws a NEXT_REDIRECT error, which we can safely ignore.
      // We only want to catch other unexpected errors.
      if (error.name === 'NEXT_REDIRECT') {
        throw error;
      }
      console.error('An unexpected error occurred during login:', error);
      return { error: 'An unexpected error occurred.' };
    }
    return { error: 'An unknown error occurred.' };
  }
}

export async function logout() {
  cookies().delete(AUTH_COOKIE_NAME);
  redirect('/admin-login');
}
