import { LoaderView } from '@/src/components/LoaderView';
import SkillRequestClient from '@/src/features/skills/request/SkillRequestClient';
import { Suspense } from 'react';

export const metadata = {
  robots: 'noindex',
};

export default function SkillRequest() {
  return (
    <Suspense fallback={<LoaderView />}>
      <SkillRequestClient />
    </Suspense>
  );
}
