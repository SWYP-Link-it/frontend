'use client';

import { useEffect, useState, useCallback } from 'react';
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
  const [creditBalance, setCreditBalance] = useState<number>(0);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const loadData = useCallback(async () => {
    if (!accessToken) {
      setProfileData(null);
      setCreditBalance(0);
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

      if (currentUserId) {
        try {
          const profileRes = await api.get(`/profile/${currentUserId}`);
          if (profileRes.data.success) {
            setProfileData(profileRes.data.data);
          }
        } catch (profileError: any) {
          const errorCode = profileError.response?.data?.code;
          if (errorCode === 'UP001' || profileError.response?.status === 404) {
            setProfileData(null);
          } else {
            console.error('Profile fetch error:', profileError);
          }
        }

        try {
          const creditRes = await api.get('/credits/balance');
          if (creditRes.data.success) {
            setCreditBalance(creditRes.data.data.creditBalance);
          }
        } catch (creditError) {
          console.error('Failed to fetch credits');
        }
      }
    } catch (error) {
      console.error('Data loading error:', error);
    } finally {
      setIsPageLoading(false);
    }
  }, [accessToken, userInfo?.userId, setUserInfo]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleWithdrawConfirm = async () => {
    setIsWithdrawModalOpen(false);
    const { withdraw } = useAuthStore.getState();
    await withdraw();
  };

  const handleEditSave = () => {
    setIsEditModalOpen(false);
    loadData();
  };

  if (isPageLoading) {
    return (
      <div className="mx-auto flex max-w-284 justify-center px-28 py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white">
      <div className="w-full bg-white px-28">
        <div className="mx-auto max-w-284">
          <div className="my-6 flex flex-col justify-center">
            <h1 className="text-[24px] font-semibold text-gray-800">
              마이프로필
            </h1>
            <p className="text-[12px] text-gray-400">
              내 정보와 활동 내역을 확인해요.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-28 pb-[126px]">
        <div className="mx-auto flex max-w-284">
          <aside className="sticky top-[100px] mr-[100px] w-full max-w-64 flex-shrink">
            <ProfileTab />
          </aside>

          <main className="min-w-0 flex-1">
            <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="text-xl font-semibold text-gray-900">내 프로필</h2>
            </div>

            <ProfileCard
              name={profileData?.nickname || userInfo?.nickname || '사용자'}
              credit={creditBalance}
              onEditClick={() => setIsEditModalOpen(true)}
            />

            <ProfileContent
              data={profileData}
              onWithdrawClick={() => setIsWithdrawModalOpen(true)}
            />
          </main>
        </div>
      </div>

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialName={profileData?.nickname || userInfo?.nickname || ''}
        onSave={handleEditSave}
      />

      <WithdrawalModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={handleWithdrawConfirm}
      />
    </div>
  );
}
