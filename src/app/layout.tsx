import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/shared/Footer';
import { FirebaseClientProvider } from '@/firebase';
import { Header } from '@/components/shared/Header';
import { cookies, headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Our Mumu Don Do',
  description:
    'A platform promoting Nigerian solutions, critical thinking, and historical context.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authToken = cookies().get('auth_token')?.value;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const isLoggedIn = !!ADMIN_PASSWORD && authToken === ADMIN_PASSWORD;
  
  const headersList = headers();
  const pathname = headersList.get('x-next-pathname') || '';

  return (
    <html lang="en" className="dark">
      <head>
        <title>Our Mumu Don Do</title>
        <meta
          name="description"
          content="A platform promoting Nigerian solutions, critical thinking, and historical context."
        />
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
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <FirebaseClientProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header isLoggedIn={isLoggedIn} pathname={pathname} />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
