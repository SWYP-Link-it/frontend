'use client';

import AuthCallbackClient from '@/src/features/auth/AuthCallbackClient';
import { Suspense } from 'react';

export default function AuthCallback() {
  return (
    <Suspense fallback={<div>로그인 중...</div>}>
      <AuthCallbackClient />
    </Suspense>
  );
}
