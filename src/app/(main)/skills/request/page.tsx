import { LoaderView } from '@/src/components/LoaderView';
import SkillRequestClient from '@/src/features/skills/request/SkillRequestClient';
import { Suspense } from 'react';

export const metadata = {
  robots: 'noindex',
  title: '스킬 요청하기 | 링킷',
};

export default function SkillRequest() {
  return (
    <Suspense fallback={<LoaderView />}>
      <SkillRequestClient />
    </Suspense>
  );
}
