import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('*/login', async ({ request }) => {
    const data = (await request.json()) as { email: string; password: string };

    return HttpResponse.json({
      user: {
        id: 'user-123',
        email: data.email,
        name: 'John Doe',
      },
      accessToken: 'Access_Token_Example',
      refreshToken: 'Refresh_Token_Example',
    });
  }),

  http.get('*/refresh', async () => {
    // return HttpResponse.json({}, { status: 401 });
    return HttpResponse.json(
      {
        accessToken: 'New_Access_Token',
      },
      { status: 200 },
    );
  }),

  http.post('*/signup', async ({ request }) => {
    const data = (await request.json()) as { email: string; password: string };

    return HttpResponse.json({
      user: {
        id: 'user-123',
        email: data.email,
        name: 'John Doe',
      },
      token: 'Access_Token_Example',
    });
  }),

  http.get('*/me', async ({ request }) => {
    const accessToken = request.headers.get('Authorization')?.split(' ')[1];

    if (accessToken === 'New_Access_Token') {
      return HttpResponse.json({
        id: 'user-123',
        email: 'user@example.com',
        name: 'John Doe',
      });
    }

    return HttpResponse.json({}, { status: 401 });
  }),
];
