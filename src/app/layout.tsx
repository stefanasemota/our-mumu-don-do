
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { FirebaseClientProvider } from '@/firebase';
import { usePathname } from 'next/navigation';

// Metadata cannot be exported from a client component.
// We can define it here or move it to a server component parent if needed.
// For now, this is a reasonable approach.
// export const metadata: Metadata = {
//   title: 'Mumu Do More',
//   description:
//     'A platform promoting Nigerian solutions, critical thinking, and historical context.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage =
    pathname.startsWith('/admin-dashboard') || pathname.startsWith('/admin-login');

  return (
    <html lang="en" className="dark">
      <head>
        <title>Mumu Do More</title>
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
            {!isAdminPage && <Header />}
            <main className="flex-1">{children}</main>
            {!isAdminPage && <Footer />}
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
