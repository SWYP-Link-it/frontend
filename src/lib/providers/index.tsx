'use client';

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
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </MSWProvider>
  );
};
