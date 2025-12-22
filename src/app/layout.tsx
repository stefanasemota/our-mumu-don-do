import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { AppBody } from '@/components/shared/AppBody';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Our Mumu Don Do',
  description:
    'An educational platform for young Nigerians to learn critical thinking, history, and local solutions through engaging stories.',
  keywords: [
    'Nigeria',
    'education',
    'critical thinking',
    'history',
    'storytelling',
    'children',
    'learning app',
    'African solutions',
  ],
  openGraph: {
    title: 'Our Mumu Don Do',
    description:
      'An educational platform for young Nigerians to learn critical thinking, history, and local solutions through engaging stories.',
    type: 'website',
    url: 'https://our-mumu-don-do.sabiai.work/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authToken = cookies().get('__session')?.value;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const isLoggedIn = !!ADMIN_PASSWORD && authToken === ADMIN_PASSWORD;

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <FirebaseClientProvider>
          <AppBody isLoggedIn={isLoggedIn}>{children}</AppBody>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
