'use client';

import Link from 'next/link';
import { RequestIcon } from '@/src/components/icons/RequestIcon';
import { MessageIcon } from '@/src/components/icons/MessageIcon';
import { RequiredAuth } from '@/src/features/auth/RequiredAuth';
import { Button } from '@/src/components/Button';
import { api } from '@/src/lib/api/api';
import { useRouter } from 'next/navigation';
import { useUserInfoStore } from '@/src/stores/userInfoStore';

type RequestFooterProps = {
  mentorId: number;
  skillId: number;
};

export const RequestFooter = ({ mentorId, skillId }: RequestFooterProps) => {
  const router = useRouter();

  const myId = useUserInfoStore((state) => state.userId);

  const handleContact = async () => {
    try {
      const response = await api.post('/chat/rooms', null, {
        params: {
          mentorId: mentorId,
          menteeId: myId,
        },
      });

      if (response.data.success) {
        const roomId = response.data.data.roomId;

        // 3. 채팅방 페이지로 이동
        router.push(`/messages/${roomId}`);
      }
    } catch (error) {
      console.error('채팅방 연결 실패:', error);
      alert('채팅방을 여는 중 오류가 발생했습니다.');
    }
  };
  return (
    <div className="sticky bottom-0 flex w-full items-center justify-between gap-6 bg-white px-28 py-6">
      <span className="text-brand-600 w-fit rounded-lg bg-[#F4F2FF] px-3 py-[5px] leading-6 font-semibold">
        내 크레딧 | 30
      </span>
      <div className="flex flex-1 gap-[15px]">
        <RequiredAuth>
          <Link
            className="ml-auto w-full max-w-[380px]"
            href={`/skills/request?mentorId=${mentorId}&skillId=${skillId}`}
          >
            <Button
              text={'스킬 요청하기'}
              mode="active"
              icon={<RequestIcon size={20} />}
            />
          </Link>
        </RequiredAuth>
        <RequiredAuth>
          <div className="w-full max-w-[380px]">
            <Button
              text={'메세지 보내기'}
              icon={<MessageIcon size={20} />}
              onClick={() => handleContact()}
            />
          </div>
        </RequiredAuth>
      </div>
    </div>
  );
};
