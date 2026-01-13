'use client';

import { MSWProvider } from './MSWProvider';

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <MSWProvider>{children}</MSWProvider>;
};
