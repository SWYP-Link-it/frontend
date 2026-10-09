export async function register() {
  const shouldStartMsw = process.env.NEXT_PUBLIC_ENABLE_MSW === 'true';

  if (shouldStartMsw && process.env.NEXT_RUNTIME === 'nodejs') {
    const { server } = await import('./src/lib/mocks/node');

    server.listen({
      onUnhandledRequest: 'bypass',
    });
  }
}
