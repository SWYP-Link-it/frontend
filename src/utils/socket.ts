// src/utils/socket.ts
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient: Client | null = null;

// 1. 소켓 연결 (JWT 토큰 필수)
export const connectSocket = (accessToken: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (stompClient && stompClient.connected) {
      resolve();
      return;
    }
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL + 'ws';
    stompClient = new Client({
      // ✅ 변경점 1: SockJS Fallback 설정 (백엔드: http://localhost:8080/ws)
      webSocketFactory: () => new SockJS(serverUrl),

      // ✅ 변경점 2: 인증 헤더 표준화 (Authorization: Bearer ...)
      connectHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImlhdCI6MTc2ODgyNzk3MCwiZXhwIjoxNzY5NDMyNzcwfQ.myEBcWG_hLFSt0nRpBOTZ7TRZ9NE-2tsT-cd7CCe7t0`,
      },

      reconnectDelay: 5000, // 끊기면 5초 뒤 재연결 시도
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log('✅ STOMP 연결 성공!');
        resolve();
      },
      onStompError: (frame) => {
        console.error('❌ STOMP 에러 발생:', frame);
        reject(frame);
      },
    });

    stompClient.activate();
  });
};

// 2. 채팅방 구독 (메시지 받기)
export const subscribeToRoom = (
  roomId: number,
  callback: (msg: any) => void,
) => {
  if (!stompClient?.connected) return null;

  // ✅ 변경점 3: 구독 주소 변경 (/topic/chat.room.{id})
  return stompClient.subscribe(
    `/topic/chat.room.${roomId}`,
    (message: IMessage) => {
      if (message.body) {
        const parsedBody = JSON.parse(message.body);
        callback(parsedBody);
      }
    },
  );
};

// 3. 메시지 전송
export const sendMessage = (roomId: number, text: string) => {
  if (!stompClient?.connected) {
    console.error('❌ 소켓이 연결되지 않았습니다.');
    return;
  }

  // ✅ 변경점 4: 전송 주소 변경 (/app/chat/send) & Request DTO 맞춤
  stompClient.publish({
    destination: '/app/chat/send',
    body: JSON.stringify({
      roomId: roomId, // DTO 필수값
      text: text, // DTO 필수값
    }),
  });
};

// 4. 연결 해제
export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
    console.log('🔌 소켓 연결 해제');
  }
};
