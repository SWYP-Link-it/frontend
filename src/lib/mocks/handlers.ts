import { http, HttpResponse, passthrough } from 'msw';

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const handlers = [
  // http.post(`${API_URL}/login`, async ({ request }) => {
  //   const data = (await request.json()) as { email: string; password: string };

  //   return HttpResponse.json({
  //     user: {
  //       id: 'user-123',
  //       email: data.email,
  //       name: 'John Doe',
  //     },
  //     accessToken: 'Access_Token_Example',
  //     refreshToken: 'Refresh_Token_Example',
  //   });
  // }),

  // http.get(`${API_URL}/refresh`, async () => {
  //   // return HttpResponse.json({}, { status: 401 });
  //   return HttpResponse.json(
  //     {
  //       accessToken: 'New_Access_Token',
  //     },
  //     { status: 200 },
  //   );
  // }),

  http.get(`${API_URL}/notifications`, () => {
    return HttpResponse.json({
      data: {
        notifications: [
          {
            id: 1,
            notificationType: 'CHAT_MESSAGE',
            message: '홍길동님이 메시지를 보냈습니다.',
            refId: 42,
            read: false,
            createdAt: '2026-04-02T10:00:00Z',
          },
          {
            id: 2,
            notificationType: 'CHAT_MESSAGE',
            message: '김철수님이 메시지를 보냈습니다.',
            refId: 7,
            read: true,
            createdAt: '2026-04-01T18:30:00Z',
          },
          {
            id: 3,
            notificationType: 'SYSTEM',
            message: '링킷 서비스를 이용해 주셔서 감사합니다.',
            refId: 0,
            read: false,
            createdAt: '2026-03-31T09:00:00Z',
          },
          {
            id: 1,
            notificationType: 'CHAT_MESSAGE',
            message: '홍길동님이 메시지를 보냈습니다.',
            refId: 42,
            read: false,
            createdAt: '2026-04-02T10:00:00Z',
          },
          {
            id: 2,
            notificationType: 'CHAT_MESSAGE',
            message: '김철수님이 메시지를 보냈습니다.',
            refId: 7,
            read: true,
            createdAt: '2026-04-01T18:30:00Z',
          },
          {
            id: 3,
            notificationType: 'SYSTEM',
            message: '링킷 서비스를 이용해 주셔서 감사합니다.',
            refId: 0,
            read: false,
            createdAt: '2026-03-31T09:00:00Z',
          },
          {
            id: 1,
            notificationType: 'CHAT_MESSAGE',
            message: '홍길동님이 메시지를 보냈습니다.',
            refId: 42,
            read: false,
            createdAt: '2026-04-02T10:00:00Z',
          },
          {
            id: 2,
            notificationType: 'CHAT_MESSAGE',
            message: '김철수님이 메시지를 보냈습니다.',
            refId: 7,
            read: true,
            createdAt: '2026-04-01T18:30:00Z',
          },
          {
            id: 3,
            notificationType: 'SYSTEM',
            message: '링킷 서비스를 이용해 주셔서 감사합니다.',
            refId: 0,
            read: false,
            createdAt: '2026-03-31T09:00:00Z',
          },
          {
            id: 1,
            notificationType: 'CHAT_MESSAGE',
            message: '홍길동님이 메시지를 보냈습니다.',
            refId: 42,
            read: false,
            createdAt: '2026-04-02T10:00:00Z',
          },
          {
            id: 2,
            notificationType: 'CHAT_MESSAGE',
            message: '김철수님이 메시지를 보냈습니다.',
            refId: 7,
            read: true,
            createdAt: '2026-04-01T18:30:00Z',
          },
          {
            id: 3,
            notificationType: 'SYSTEM',
            message: '링킷 서비스를 이용해 주셔서 감사합니다.',
            refId: 0,
            isRead: false,
            createdAt: '2026-03-31T09:00:00Z',
          },
          {
            id: 1,
            notificationType: 'CHAT_MESSAGE',
            message: '홍길동님이 메시지를 보냈습니다.',
            refId: 42,
            read: false,
            createdAt: '2026-04-02T10:00:00Z',
          },
          {
            id: 2,
            notificationType: 'CHAT_MESSAGE',
            message: '김철수님이 메시지를 보냈습니다.',
            refId: 7,
            read: true,
            createdAt: '2026-04-01T18:30:00Z',
          },
          {
            id: 3,
            notificationType: 'SYSTEM',
            message: '링킷 서비스를 이용해 주셔서 감사합니다.',
            refId: 0,
            read: false,
            createdAt: '2026-03-31T09:00:00Z',
          },
        ],
      },
    });
  }),

  http.get(`${API_URL}/notifications/unread-count`, () => {
    return HttpResponse.json({
      data: {
        messageTabCount: 120,
      },
    });
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

  // http.get(`${API_URL}/me`, async ({ request }) => {
  //   const accessToken = request.headers.get('Authorization')?.split(' ')[1];

  //   if (accessToken === 'New_Access_Token') {
  //     return HttpResponse.json({
  //       id: 'user-123',
  //       email: 'user@example.com',
  //       name: 'John Doe',
  //     });
  //   }

  //   return HttpResponse.json({}, { status: 401 });
  // }),

  // TODO: 실제 서버와 연동 중이므로 MSW가 가로채지 않도록 설정 (테스트 후 정리 예정)
  // http.get('https://api.desklab.kr/*', () => {
  //   return passthrough();
  // }),

  // http.post('https://api.desklab.kr/*', () => {
  //   return passthrough();
  // }),

  // http.get(
  //   `${API_URL}/exchange/mentors/:mentorId/available-slots?mentorSkillId=:skillId&date=:formattedDate`,
  //   () => {
  //     return HttpResponse.json({
  //       data: {
  //         date: '2026-01-25',
  //         slots: [
  //           {
  //             time: '11:30',
  //             available: true,
  //           },
  //           {
  //             time: '12:00',
  //             available: true,
  //           },
  //           {
  //             time: '13:00',
  //             available: true,
  //           },
  //         ],
  //       },
  //     });
  //   },
  // ),

  // http.get(
  //   `${API_URL}/exchange/mentors/:mentorId/available-dates?month=:formattedDate`,
  //   () => {
  //     return HttpResponse.json({
  //       data: {
  //         month: '2026-02',
  //         availableDates: [
  //           '2026-02-01',
  //           '2026-02-10',
  //           '2026-02-13',
  //           '2026-02-20',
  //         ],
  //       },
  //     });
  //   },
  // ),
];
