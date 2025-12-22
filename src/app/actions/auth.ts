'use server';

import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_COOKIE_NAME = 'auth_token';

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password');

  if (!ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD environment variable not set.');
    return { error: 'Server configuration error.' };
  }

  if (password === ADMIN_PASSWORD) {
    const cookieStore = cookies();
    cookieStore.set(AUTH_COOKIE_NAME, ADMIN_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
    });
    // The redirect will be handled on the client side based on the success state.
    return { success: true };
  } else {
    return { error: 'Invalid password.' };
  }
}

export async function logout() {
  const { redirect } = await import('next/navigation');
  cookies().delete(AUTH_COOKIE_NAME);
  redirect('/admin-login');
}
