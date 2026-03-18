'use client';

import { useScrollToTop } from '@/src/hooks/useScrollToTop';
import { AuthProvider } from './AuthProvider';
import { MSWProvider } from './MSWProvider';
import { QueryProvider } from './QueryProvider';

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useScrollToTop();

  return (
    <MSWProvider>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </MSWProvider>
  );
};
