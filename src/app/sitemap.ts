import type { MetadataRoute } from 'next';
import { REAL_STORIES } from '@/lib/curated-topics';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://our-mumu-don-do.sabiai.work';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const canonicalSlugs = [
    'the-glass-of-milk',
    'the-river-was-always-there',
    'the-kings-signature',
    'understanding-colonisation',
    'we-were-never-lost',
    'the-river-of-a-thousand-songs',
    'the-great-giants-of-zazzau',
    'arhuan-the-giant-prince-of-benin',
  ];

  const storyRoutes: MetadataRoute.Sitemap = canonicalSlugs.map((slug) => ({
    url: `${baseUrl}/story/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...storyRoutes];
}

