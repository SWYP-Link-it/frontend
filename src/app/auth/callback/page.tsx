'use client';

import { LoaderView } from '@/src/components/LoaderView';
import AuthCallbackClient from '@/src/features/auth/AuthCallbackClient';
import { Suspense } from 'react';

export default function AuthCallback() {
  return (
    <Suspense fallback={<LoaderView loadingText="로그인 중..." />}>
      <AuthCallbackClient />
    </Suspense>
  );
}
