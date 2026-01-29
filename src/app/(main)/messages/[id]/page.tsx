// src/app/chat/[id]/page.tsx
'use client';

import { ChatSection } from '@/src/components/chat/ChatSection';
import { useParams } from 'next/navigation';

export default function ChatRoomPage() {
  const params = useParams();
  const roomId = (Array.isArray(params.id) ? params.id[0] : params.id) ?? '';

  return <ChatSection roomId={roomId} />;
}
