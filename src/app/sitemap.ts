import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/market/sitemap`,
    { next: { revalidate: 3600 } },
  );

  const skills = (await res.json()).data as {
    skillId: number;
    modifiedAt: Date;
  }[];

  return [
    // 정적 페이지
    // {
    //   url: process.env.NEXT_PUBLIC_FRONTEND_URL,
    //   lastModified: new Date(),
    // },
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/skills`,
      lastModified: new Date(),
    },

    // 동적 상세 페이지
    ...skills.map(({ skillId, modifiedAt }) => ({
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/skills/detail/${skillId}`,
      lastModified: new Date(modifiedAt),
    })),
  ];
}
