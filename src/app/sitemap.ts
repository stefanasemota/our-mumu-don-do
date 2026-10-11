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

  const storyRoutes: MetadataRoute.Sitemap = Object.keys(REAL_STORIES).map((id) => ({
    url: `${baseUrl}/story/${id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...storyRoutes];
}

