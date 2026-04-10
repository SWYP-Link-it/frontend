'use client';

import { ReactNode, useEffect, useState } from 'react';

const isDev = process.env.NODE_ENV === 'development';

export const MSWProvider = ({ children }: { children: ReactNode }) => {
  const [ready, setReady] = useState(isDev ? false : true);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
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
