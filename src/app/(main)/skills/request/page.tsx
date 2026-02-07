'use client';

import SkillRequestClient from '@/src/features/skills/request/SkillRequestClient';
import { Suspense } from 'react';

export default function SkillRequest() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SkillRequestClient />
    </Suspense>
  );
}
