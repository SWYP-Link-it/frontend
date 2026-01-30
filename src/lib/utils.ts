import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const scrollToTop = () => {
  const main = document.querySelector('main');

  main?.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
