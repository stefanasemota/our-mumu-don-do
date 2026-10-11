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
    'A vibrant educational digital storybook for children aged 7 to 10. Learn authentic African history, courageous heroes, and critical thinking with interactive audio tales.',
  keywords: [
    'Our Mumu Don Do',
    'Nigeria',
    'Nigerian education',
    'critical thinking for children',
    'African history',
    'Queen Amina',
    'Benin Kingdom',
    'King Jaja of Opobo',
    'illustrated storytelling',
    'children learning app',
    'Nigerian solutions',
    'African audiobooks for kids',
    'Swiss German narration',
    'Naija Speak',
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
    title: 'Our Mumu Don Do | Kids Edition • African History & Stories',
    description:
      'A vibrant digital storybook for young explorers aged 7 to 10. Ancient African history, heroic leaders, riddles, and interactive audio adventures.',
    type: 'website',
    url: 'https://our-mumu-don-do.sabiai.work',
    siteName: 'Our Mumu Don Do',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Mumu Don Do | Kids Edition • African History & Stories',
    description:
      'A vibrant digital storybook for young explorers aged 7 to 10. Ancient African history, heroic leaders, riddles, and interactive audio adventures.',
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
      name: 'Our Mumu Don Do Platform (Kids Edition)',
      url: 'https://our-mumu-don-do.sabiai.work',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'student',
        audienceType: 'Children ages 7 to 10',
      },
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
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLMs.txt"
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
