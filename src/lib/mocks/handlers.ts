import { http, HttpResponse, passthrough } from 'msw';

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

  // TODO: 실제 서버와 연동 중이므로 MSW가 가로채지 않도록 설정 (테스트 후 정리 예정)
  http.get('https://api.desklab.kr/*', () => {
    return passthrough();
  }),

  http.post('https://api.desklab.kr/*', () => {
    return passthrough();
  }),
];
