'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_COOKIE_NAME = 'auth_token';

export async function login(
  prevState: any,
  formData: FormData
): Promise<{ error: string } | void> {
  const password = formData.get('password');

  if (!ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD environment variable not set.');
    return { error: 'Server configuration error.' };
  }

  if (password === ADMIN_PASSWORD) {
    cookies().set({
      name: AUTH_COOKIE_NAME,
      value: password as string, // In a real app, this should be a secure token
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
    });
  } else {
    return { error: 'Invalid password.' };
  }

  redirect('/admin-dashboard');
}

export async function logout() {
  cookies().delete(AUTH_COOKIE_NAME);
  redirect('/admin-login');
}
