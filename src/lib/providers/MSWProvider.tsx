'use client';

import { ReactNode, useEffect } from 'react';

export const MSWProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('../mocks/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'bypass',
        });
      });
    }
  }, []);

  return children;
};
