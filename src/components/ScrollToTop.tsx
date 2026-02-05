'use client';

import { DependencyList, useEffect } from 'react';
import { scrollToTop } from '../utils/utils';

type ScrollToTopProps = {
  deps: DependencyList;
};

export const ScrollToTop = ({ deps }: ScrollToTopProps) => {
  useEffect(() => {
    scrollToTop();
  }, deps);

  return null;
};
