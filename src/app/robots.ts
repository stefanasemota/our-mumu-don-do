import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin-dashboard', '/admin-login'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'Anthropic-ai',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot',
          'cohere-ai',
          'OAI-SearchBot',
          'Bingbot',
          'Googlebot',
        ],
        allow: '/',
        disallow: ['/admin-dashboard', '/admin-login'],
      },
    ],
    sitemap: 'https://our-mumu-don-do.sabiai.work/sitemap.xml',
  };
}
