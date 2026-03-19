'use client';

import { ScrollToTop } from '@/src/components/common/ScrollToTop';
import { AuthProvider } from './AuthProvider';
import { MSWProvider } from './MSWProvider';
import { QueryProvider } from './QueryProvider';

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <MSWProvider>
      <QueryProvider>
        <AuthProvider>
          <ScrollToTop />
          {children}
        </AuthProvider>
      </QueryProvider>
    </MSWProvider>
  );
};
