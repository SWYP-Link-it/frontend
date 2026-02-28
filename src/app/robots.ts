import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    // 크롤링 규칙
    rules: [
      {
        userAgent: '*',
        allow: ['/$', '/skills$', '/skills/detail/', '/sitemap.xml$'],
        disallow: '/',
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sitemap.xml`,
  };
}
