'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_COOKIE_NAME = 'auth_token';

export async function login(prevState: any, formData: FormData) {
  let isSuccess = false;
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
      isSuccess = true;
    } else {
      return { error: 'Invalid password.' };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return { error: error.message };
    }
    return { error: 'An unknown error occurred.' };
  }

  if (isSuccess) {
    redirect('/admin-dashboard');
  }

  // This part should not be reached if redirect happens,
  // but it's good practice for type safety and clarity.
  return { error: 'Invalid credentials' };
}

export async function logout() {
  cookies().delete(AUTH_COOKIE_NAME);
  redirect('/admin-login');
}
