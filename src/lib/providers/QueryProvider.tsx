'use client';

import { QueryClient } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2, // 실패 시 재시도 횟수
            refetchOnWindowFocus: true, // 탭 포커스 시 refetch
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
