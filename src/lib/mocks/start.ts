const shouldStartMsw = process.env.NEXT_PUBLIC_ENABLE_MSW === 'true';

let promise: Promise<void> | null = null;

export const startMsw = (): Promise<void> => {
  if (!shouldStartMsw || typeof window === 'undefined') {
    return Promise.resolve();
  }
  promise ??= import('./browser').then(async ({ worker }) => {
    await worker.start({ onUnhandledRequest: 'bypass' });
  });
  return promise;
};
