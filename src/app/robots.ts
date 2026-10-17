import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin-dashboard', '/admin-dashboard/', '/admin-login', '/admin-login/', '/api/'],
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
          'Meta-ExternalAgent',
          'Amazonbot',
          'Bytespider',
          'FacebookBot',
        ],
        allow: '/',
        disallow: ['/admin-dashboard', '/admin-dashboard/', '/admin-login', '/admin-login/', '/api/'],
      },
    ],
    sitemap: 'https://our-mumu-don-do.sabiai.work/sitemap.xml',
  };
}
