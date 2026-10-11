import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { AppBody } from '@/components/shared/AppBody';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  metadataBase: new URL('https://our-mumu-don-do.sabiai.work'),
  title: {
    default: 'Our Mumu Don Do | Nigerian Heritage, Critical Thinking & Education',
    template: '%s | Our Mumu Don Do',
  },
  description:
    'An educational storytelling platform for Nigerian youth to foster critical thinking, learn authentic history, and celebrate homegrown solutions.',
  keywords: [
    'Our Mumu Don Do',
    'Nigeria',
    'Nigerian education',
    'critical thinking for children',
    'African history',
    'illustrated storytelling',
    'children learning app',
    'Nigerian solutions',
    'Sabi Ecosystem',
  ],
  applicationName: 'Our Mumu Don Do',
  authors: [{ name: 'Sabi AI', url: 'https://sabiai.work' }],
  creator: 'Sabi AI',
  publisher: 'Sabi AI',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Our Mumu Don Do | Nigerian Heritage & Education',
    description:
      'An educational platform for young Nigerians to learn critical thinking, history, and local solutions through engaging stories.',
    type: 'website',
    url: 'https://our-mumu-don-do.sabiai.work',
    siteName: 'Our Mumu Don Do',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Mumu Don Do | Nigerian Heritage & Education',
    description:
      'An educational platform for young Nigerians to learn critical thinking, history, and local solutions through engaging stories.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://our-mumu-don-do.sabiai.work/#organization',
      name: 'Our Mumu Don Do',
      url: 'https://our-mumu-don-do.sabiai.work',
      description:
        'Educational storytelling initiative to empower Nigerian youth with critical thinking and authentic history.',
      parentOrganization: {
        '@type': 'Organization',
        name: 'SABI AI',
        url: 'https://sabiai.work',
      },
    },
    {
      '@type': 'WebApplication',
      name: 'Our Mumu Don Do Platform',
      url: 'https://our-mumu-don-do.sabiai.work',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
