'use client';

import { api } from '@/src/lib/api/api';
import { useAuthStore } from '@/src/stores/authStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const status = searchParams.get('status');

  useEffect(() => {
    if (status === 'ACTIVE') {
      api
        .get('/auth/success')
        .then((response) => {
          setAccessToken(response.data.data.accessToken);
          router.push('/');
        })
        .catch(() => {
          toast.error('로그인에 실패하였습니다.');
        });
    } else if (status === 'PENDING') {
      router.push('/signup');
    }
  }, []);

  if (status !== 'ACTIVE' && status !== 'PENDING') {
    return <div>잘못된 접근입니다.</div>;
  }

  return null;
}
