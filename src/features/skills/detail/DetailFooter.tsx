'use client';

import { RequestIcon } from '@/src/components/icons/RequestIcon';
import { MessageIcon } from '@/src/components/icons/MessageIcon';
import { RequiredAuth } from '@/src/features/auth/RequiredAuth';
import { Button } from '@/src/components/Button';
import { api } from '@/src/lib/api/api';
import { useRouter } from 'next/navigation';
import { useUserInfoStore } from '@/src/stores/userInfoStore';
import { MyCreditBadge } from '@/src/components/profile/MyCreditBadge';
import { toast } from 'sonner';

type DetailFooterProps = {
  mentorId: number;
  skillId: number;
};

export const DetailFooter = ({ mentorId, skillId }: DetailFooterProps) => {
  const router = useRouter();

  const myId = useUserInfoStore((state) => state.userInfo?.userId);

  const handleContact = async () => {
    try {
      if (!myId) {
        toast.error('로그인이 필요합니다.');
        return;
      }
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
    }
  };

  const isMySkill = mentorId === myId;

  return (
    <div className="sticky bottom-0 w-full bg-white py-6">
      <div className="mx-auto flex w-[calc(100%-224px)] max-w-284 items-center gap-12">
        <MyCreditBadge />
        <div className="flex flex-1 gap-[15px]">
          <RequiredAuth>
            <div className="ml-auto w-full max-w-[380px]">
              <Button
                text={'스킬 요청하기'}
                mode={isMySkill ? 'inactive' : 'active'}
                icon={<RequestIcon size={20} />}
                disabled={isMySkill}
                onClick={() =>
                  router.push(
                    `/skills/request?mentorId=${mentorId}&skillId=${skillId}`,
                  )
                }
              />
            </div>
          </RequiredAuth>
          <RequiredAuth>
            <div className="w-full max-w-[380px]">
              <Button
                text={'메세지 보내기'}
                mode={isMySkill ? 'inactive' : 'default'}
                icon={<MessageIcon size={20} />}
                onClick={() => handleContact()}
              />
            </div>
          </RequiredAuth>
        </div>
      </div>
    </div>
  );
};
