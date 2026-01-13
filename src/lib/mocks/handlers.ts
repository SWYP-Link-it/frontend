import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/auth/me', () => {
    return HttpResponse.json({
      id: 'user-123',
      email: 'user@example.com',
      name: 'John Doe',
    });
  }),

  http.post('*/login', async ({ request }) => {
    const data = (await request.json()) as { email: string; password: string };

    return HttpResponse.json({
      user: {
        id: 'user-123',
        email: data.email,
        name: 'John Doe',
      },
      token: 'fake-jwt-token',
      expiredAt: '2026-01-25T23:59:59Z',
    });
  }),

  http.post('*/signup', async ({ request }) => {
    const data = (await request.json()) as { email: string; password: string };

    return HttpResponse.json({
      user: {
        id: 'user-123',
        email: data.email,
        name: 'John Doe',
      },
      token: 'fake-jwt-token',
      expiredAt: '2026-01-25T23:59:59Z',
    });
  }),
];
