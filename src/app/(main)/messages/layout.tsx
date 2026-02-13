import { ChatSidebar } from '@/src/components/chat/ChatSidebar';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex h-[calc(100%-80px)] w-[calc(100%-224px)] max-w-284 flex-col items-center bg-white shadow-[0_0_0_100vh_white]">
      <div className="flex h-full w-full flex-col pb-[28px]">
        <div className="my-6 flex shrink-0 flex-col justify-center gap-1">
          <h2 className="text-[24px] font-semibold text-gray-800">메세지</h2>
          <p className="text-[12px] text-gray-400">
            채팅으로 궁금한 걸 묻고 답해요
          </p>
        </div>

        <div className="flex min-h-0 w-full flex-1 gap-[20px]">
          <aside className="h-full w-[290px] shrink-0 overflow-hidden rounded-[12px] border border-gray-200 bg-white">
            <ChatSidebar />
          </aside>

          <main className="h-full min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
