'use client';

import { useEffect, useState } from 'react';
import { ProfileTab } from '@/src/components/profile/ProfileTab';
import { ProfileCard } from '@/src/components/profile/ProfileCard';
import { ProfileContent } from '@/src/components/profile/ProfileContent';
import { ProfileEditModal } from '@/src/components/edit/ProfileEditModal';
import { WithdrawalModal } from '@/src/components/edit/WithdrawalModal';
import { useAuthStore } from '@/src/stores/authStore';
import { useUserStore } from '@/src/stores/userStore';
import { api } from '@/src/lib/api/api';
import { ProfileData } from '@/src/types/profile';

export default function ProfilePage() {
  const { accessToken } = useAuthStore();
  const { userInfo, setUserInfo } = useUserStore();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!accessToken) {
        setIsPageLoading(false);
        return;
      }
      try {
        setIsPageLoading(true);
        let currentUserId = userInfo?.userId;
        if (!currentUserId) {
          const authRes = await api.get('/auth/me');

          if (authRes.data.success) {
            const userData = authRes.data.data;

            setUserInfo({
              userId: userData.id,
              nickname: userData.nickname,
              name: userData.name,
              email: userData.email,
              profileImageUrl: userData.profileImageUrl,
            });
            currentUserId = userData.id;
          }
        }

        console.log(currentUserId);
        if (currentUserId) {
          try {
            const profileRes = await api.get(`/profile/${currentUserId}`);
            console.log(
              '✅ 서버에서 온 원본 상세 데이터:',
              profileRes.data.data,
            );
            console.log('✅ 그 안의 스킬들:', profileRes.data.data.skills); // 이게 [] 빈 배열이면 서버에 저장이 안 된 겁니다.
            setProfileData(profileRes.data.data);
            if (profileRes.data.success) {
              setProfileData(profileRes.data.data);
              console.log(profileRes);
            }
          } catch (profileError: any) {
            if (profileError.response?.status === 404) {
              setProfileData(null);
            } else {
              console.error('프로필 상세 조회 중 에러:', profileError);
            }
          }
        }
      } catch (error) {
        console.error('데이터 로딩 에러:', error);
      } finally {
        setIsPageLoading(false);
      }
    };

    loadData();
  }, [accessToken, userInfo?.userId, setUserInfo]);

  const handleWithdrawConfirm = () => {
    setIsWithdrawModalOpen(false);

    setProfileData(null);
  };

  if (isPageLoading) {
    return (
      <div className="mx-auto flex max-w-6xl justify-center px-6 py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white px-[112px]">
      <div className="flex h-[100px] flex-col justify-center">
        <h1 className="mb-[4px] text-[24px] font-semibold text-gray-800">
          마이프로필
        </h1>
        <p className="text-[12px] text-gray-400">
          내 정보와 활동 내역을 확인해요.
        </p>
      </div>
      <div className="flex items-start justify-between">
        <aside className="sticky top-[100px] mr-[100px] w-64 flex-shrink-0">
          <ProfileTab />
        </aside>
        <main className="flex-1">
          <div className="">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">내 프로필</h2>
            </div>
            <ProfileCard
              name={profileData?.nickname || userInfo?.nickname || '사용자'}
              onEditClick={() => setIsEditModalOpen(true)}
            />
            <ProfileContent
              data={profileData}
              onWithdrawClick={() => setIsWithdrawModalOpen(true)}
            />
          </div>
        </main>
      </div>

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialName={profileData?.nickname || userInfo?.nickname || ''}
        onSave={() => setIsEditModalOpen(false)}
      />

      <WithdrawalModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={handleWithdrawConfirm}
      />
    </div>
  );
}
