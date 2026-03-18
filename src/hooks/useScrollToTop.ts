'use client';

import { useEffect } from 'react';
import { scrollToTop } from '../utils/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export const useScrollToTop = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    scrollToTop();
  }, [pathname, searchParams]);
};
