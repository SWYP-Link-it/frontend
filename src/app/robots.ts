import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    // 크롤링 규칙
    rules: [
      { userAgent: '*', disallow: '/' }, // 전부 막기
      { userAgent: '*', allow: '/' }, // 홈 크롤링 허용
      { userAgent: '*', allow: '/skills', disallow: ['/skills/request'] }, // /skills 크롤링 허용
    ],
    sitemap: 'https://linkit.co.kr/sitemap.xml',
  };
}
