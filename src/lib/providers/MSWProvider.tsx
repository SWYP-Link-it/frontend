'use client';

import { ReactNode, useEffect, useState } from 'react';

const shouldStartMsw =
  process.env.NODE_ENV === 'development' ||
  process.env.NEXT_PUBLIC_ENABLE_MSW === 'true';

export const MSWProvider = ({ children }: { children: ReactNode }) => {
  const [ready, setReady] = useState(!shouldStartMsw);

  useEffect(() => {
    if (shouldStartMsw) {
      import('../mocks/browser').then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest: 'bypass',
        });
        setReady(true);
      });
    }
  }, []);

  if (!ready) return null;

  return children;
};
