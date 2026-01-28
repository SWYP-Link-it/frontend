'use client';

import { AuthProvider } from './AuthProvider';
import { MSWProvider } from './MSWProvider';

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <MSWProvider>
      <AuthProvider>{children}</AuthProvider>
    </MSWProvider>
  );
};
