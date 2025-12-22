'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_COOKIE_NAME = 'auth_token';

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password');

  if (!ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD environment variable not set.');
    return { error: 'Server configuration error.' };
  }

  if (password !== ADMIN_PASSWORD) {
    return { error: 'Invalid password.' };
  }

  // If password is correct, proceed with setting cookie and redirecting.
  try {
    cookies().set(AUTH_COOKIE_NAME, ADMIN_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
    });

    revalidatePath('/admin-dashboard', 'layout');
    
    redirect('/admin-dashboard');
  } catch (error) {
    // The redirect() function throws a NEXT_REDIRECT error, which we need to handle.
    // We re-throw it to allow Next.js to complete the redirect.
    // For any other error, we return a generic error message.
    if (error instanceof Error && error.name === 'NEXT_REDIRECT') {
      throw error;
    }

    console.error('An unexpected error occurred during login:', error);
    return { error: 'An unexpected error occurred.' };
  }
}

export async function logout() {
  cookies().delete(AUTH_COOKIE_NAME);
  redirect('/admin-login');
}
