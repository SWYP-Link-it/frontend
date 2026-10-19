import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/market/sitemap`,
    { next: { revalidate: 3600 } },
  ).catch(() => null);

  const skills: { skillId: number; modifiedAt: Date }[] = res?.ok
    ? ((await res.json()).data ?? [])
    : [];

  // 목록 페이지의 수정일 = 가장 최근에 수정된 스킬의 수정일 (요청 시각 X)
  const latestModifiedAt = skills.length
    ? new Date(Math.max(...skills.map((s) => new Date(s.modifiedAt).getTime())))
    : undefined;

  return [
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/skills`,
      lastModified: latestModifiedAt,
    },

    // 동적 상세 페이지
    ...skills.map(({ skillId, modifiedAt }) => ({
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/skills/detail/${skillId}`,
      lastModified: new Date(modifiedAt),
    })),
  ];
}
