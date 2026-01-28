export const scrollToTop = () => {
  const main = document.querySelector('main');

  main?.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
