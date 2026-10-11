'use client';

import { ScrollToTop } from '@/src/components/common/ScrollToTop';
import { AuthProvider } from './AuthProvider';
import { QueryProvider } from './QueryProvider';

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <ScrollToTop />
        {children}
      </AuthProvider>
    </QueryProvider>
  );
};
