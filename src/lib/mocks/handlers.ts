import { http, HttpResponse } from 'msw';

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const handlers = [
  http.post(`${API_URL}/login`, async ({ request }) => {
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

  http.get(`${API_URL}/refresh`, async () => {
    // return HttpResponse.json({}, { status: 401 });
    return HttpResponse.json(
      {
        accessToken: 'New_Access_Token',
      },
      { status: 200 },
    );
  }),

  http.post(`${API_URL}/signup`, async ({ request }) => {
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

  http.get(`${API_URL}/me`, async ({ request }) => {
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
