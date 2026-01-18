// src/app/chat/layout.tsx
import { ChatSidebar } from '@/src/components/chat/ChatSidebar';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full bg-white">
      <div className="min-w-0 flex-1">{children}</div>
      <ChatSidebar />
    </div>
  );
}
