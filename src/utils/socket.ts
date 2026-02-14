// src/utils/socket.ts
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// 백엔드 소켓 주소 (환경변수 없으면 하드코딩)
const SOCKET_URL = process.env.NEXT_PUBLIC_SERVER_URL
  ? `${process.env.NEXT_PUBLIC_SERVER_URL}/ws`
  : 'http://localhost:8080/ws';

let stompClient: Client | null = null;

// [타입 정의] 가이드 내용 반영
export interface ChatPayload {
  roomId: number;
  messageId: number;
  senderId: number;
  senderRole: 'MENTOR' | 'MENTEE';
  text: string;
  fileUrl?: string | null;
  sentAtEpochMs: number;
  system: boolean;
  readUpToMessageId?: number;
  readerId?: number;
}

// 1. 소켓 연결
export const connectSocket = (accessToken: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 이미 연결되어 있으면 통과
    if (stompClient?.connected) {
      resolve();
      return;
    }

    stompClient = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`, // 헤더에 토큰 실어 보냄
      },
      reconnectDelay: 5000, // 끊기면 5초 뒤 재연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log('✅ STOMP 연결 성공');
        resolve();
      },
      onStompError: (frame) => {
        console.error('❌ STOMP 에러:', frame.headers.message);
        reject(new Error(frame.headers.message));
      },
      onWebSocketError: (event) => {
        console.error('❌ WebSocket 에러:', event);
        reject(event);
      },
    });

    stompClient.activate();
  });
};

// 2. 채팅방 구독 (메시지 수신 대기)
export const subscribeToRoom = (
  roomId: number,
  onMessage: (payload: ChatPayload) => void,
): StompSubscription | null => {
  if (!stompClient?.connected) return null;

  return stompClient.subscribe(
    `/topic/chat.room.${roomId}`,
    (message: IMessage) => {
      if (message.body) {
        const payload: ChatPayload = JSON.parse(message.body);
        onMessage(payload);
      }
    },
  );
};

// 3. 입장 알림 전송
export const enterRoom = (roomId: number) => {
  if (stompClient?.connected) {
    stompClient.publish({ destination: `/app/chat/room/${roomId}/enter` });
  }
};

// 4. 퇴장 알림 전송
export const exitRoom = (roomId: number) => {
  if (stompClient?.connected) {
    stompClient.publish({ destination: `/app/chat/room/${roomId}/exit` });
  }
};

export const sendMessage = (
  roomId: number,
  text: string,
  imageUrl?: string | null,
) => {
  if (stompClient?.connected) {
    const payload = {
      roomId: roomId,
      text: text || '',
      messageType: imageUrl ? 'IMAGE' : 'TEXT',
      imageUrl: imageUrl || null,
    };

    // console.log('[백엔드 가이드 반영 전송]:', payload);

    stompClient.publish({
      destination: '/app/chat/send',
      body: JSON.stringify(payload),
    });
  }
};

// 6. 연결 해제
export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
    console.log('🔌 소켓 연결 해제');
  }
};
