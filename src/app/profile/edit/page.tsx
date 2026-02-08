'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/src/lib/api/api';
import { useUserStore } from '@/src/stores/userStore';
import { useAuthStore } from '@/src/stores/authStore';
import { ProfileEditHeader } from '@/src/components/edit/ProfileEditHeader';
import { ProfileEditSection } from '@/src/components/edit/ProfileEditSection';
import { ExperienceEditItem } from '@/src/components/edit/ExperienceEditItem';
import { SkillEditItem } from '@/src/components/edit/SkillEditItem';
import { DaySelector } from '@/src/components/edit/DaySelector';
import { PreferenceEditItem } from '@/src/components/edit/PreferenceEditItem';
import { SkillRegisterModal } from '@/src/components/edit/SkillRegisterModal';
import {
  PROFICIENCY_MAP,
  REGION_MAP,
  WEEKDAY_MAP,
} from '@/src/constants/profile';
import Image from 'next/image';
import { useUserInfoStore } from '@/src/stores/userInfoStore';

export default function ProfileEditPage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const { userInfo } = useUserStore();
  const { setUserInfo: setUserCreditInfo, userInfo: userCreditInfo } =
    useUserInfoStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isNewProfile, setIsNewProfile] = useState(false);
  const [localProfile, setLocalProfile] = useState<any>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(
    null,
  );
  const [activeDay, setActiveDay] = useState('월');

  const fetchUserCreditInfo = () => {
    api.get(`/credits/balance-user-details`).then((response) => {
      const { userId, userNickname, creditBalance } = response.data.data;
      setUserCreditInfo({ userId, userNickname, creditBalance });
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken || !userInfo?.userId) return;
      try {
        setIsLoading(true);
        const res = await api.get(`/profile/${userInfo.userId}/edit`);
        if (res.data.success && res.data.data) {
          const profileData = res.data.data;
          const skillsWithImages = (profileData.skills || []).map((s: any) => ({
            ...s,
            imageUrls: s.imageUrls || [],
            imageFiles: [],
          }));
          setLocalProfile({ ...profileData, skills: skillsWithImages });
          setIsNewProfile(false);
        }
      } catch (err: any) {
        if (err.response?.status === 404) {
          setIsNewProfile(true);
          setLocalProfile({
            nickname: userInfo.nickname || '',
            experienceDescription: '',
            skills: [],
            availableSchedules: [],
            exchangeType: 'ONLINE',
            preferredRegion: '',
            detailedLocation: '',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [accessToken, userInfo?.userId]);

  const isValid = useMemo(() => {
    if (!localProfile) return false;
    return Boolean(
      localProfile.experienceDescription?.trim().length > 0 &&
      localProfile.skills?.length > 0,
    );
  }, [localProfile]);

  const handleSave = async () => {
    if (!localProfile) return;

    try {
      const formData = new FormData();
      const formatTime = (time: string) =>
        !time ? '09:00' : time.length > 5 ? time.substring(0, 5) : time;

      const payload = {
        nickname: localProfile.nickname,
        experienceDescription: localProfile.experienceDescription || '',
        exchangeType: localProfile.exchangeType || 'ONLINE',
        preferredRegion:
          REGION_MAP[localProfile.preferredRegion] ||
          localProfile.preferredRegion ||
          null,
        detailedLocation: localProfile.detailedLocation?.trim() || null,
        availableSchedules: (localProfile.availableSchedules || []).map(
          (s: any) => ({
            id: s.id || null,
            dayOfWeek: WEEKDAY_MAP[s.dayOfWeek] || s.dayOfWeek,
            startTime: formatTime(s.startTime),
            endTime: formatTime(s.endTime),
          }),
        ),
        skills: localProfile.skills.map((s: any) => ({
          id: s.id || null,
          skillCategoryType: s.skillCategoryType,
          skillName: s.skillName || '',
          skillTitle: s.skillTitle || '',
          skillProficiency:
            PROFICIENCY_MAP[s.skillProficiency] || s.skillProficiency,
          skillDescription: s.skillDescription || '',
          exchangeDuration: 60,
          isVisible: true,
          imageUrls: s.imageUrls || [],
        })),
      };

      formData.append(
        'profile',
        new Blob([JSON.stringify(payload)], { type: 'application/json' }),
      );

      localProfile.skills.forEach((skill: any, idx: number) => {
        if (skill.imageFiles && skill.imageFiles.length > 0) {
          skill.imageFiles.forEach((file: File) => {
            formData.append(`skill-${idx}-images`, file);
          });
        }
      });

      const response = isNewProfile
        ? await api.post('/profile', formData)
        : await api.put('/profile', formData);

      if (response.data.success) {
        alert('저장되었습니다.');
        fetchUserCreditInfo();

        router.push('/profile');
      }
    } catch (err: any) {
      alert(`저장 실패: ${err.response?.data?.message || '서버 오류'}`);
    }
  };

  const updateField = (field: string, value: any) => {
    setLocalProfile((prev: any) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  if (isLoading || !localProfile)
    return <div className="py-20 text-center">로딩 중...</div>;

  const selectedDayNames = Array.from(
    new Set(
      localProfile.availableSchedules?.map((s: any) => s.dayOfWeek) || [],
    ),
  ) as string[];

  return (
    <div className="bg-brand-50 min-h-screen pb-32">
      <ProfileEditHeader
        onSave={handleSave}
        isDirty={isDirty}
        isValid={isValid}
      />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-[40px] border border-gray-50 bg-white p-12 shadow-xl">
          <div className="relative mb-8 h-full w-full">
            <Image
              src="/icons/profile_banner.svg"
              alt="프로필 배너"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>
          <ProfileEditSection title="경력과 경험">
            <ExperienceEditItem
              value={localProfile.experienceDescription || ''}
              onChange={(val) => updateField('experienceDescription', val)}
            />
          </ProfileEditSection>

          <ProfileEditSection title="스킬">
            <div className="grid grid-cols-1 gap-4">
              {localProfile.skills?.map((skill: any, idx: number) => (
                <SkillEditItem
                  key={idx}
                  skill={skill}
                  onEdit={() => {
                    setEditingSkillIndex(idx);
                    setIsSkillModalOpen(true);
                  }}
                  onDelete={() => {
                    const filtered = localProfile.skills.filter(
                      (_: any, i: number) => i !== idx,
                    );
                    updateField('skills', filtered);
                  }}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  setEditingSkillIndex(null);
                  setIsSkillModalOpen(true);
                }}
                className="h-20 w-full rounded-2xl border-2 border-dashed border-gray-100 font-bold text-gray-300"
              >
                + 스킬 추가하기
              </button>
            </div>
          </ProfileEditSection>

          <ProfileEditSection title="선호 시간대">
            <DaySelector
              selectedDays={selectedDayNames}
              activeDay={activeDay}
              onActiveDayChange={setActiveDay}
              onChange={(days) => {
                const newSchedules = days.map(
                  (day) =>
                    localProfile.availableSchedules?.find(
                      (s: any) => s.dayOfWeek === day,
                    ) || {
                      dayOfWeek: day,
                      startTime: '09:00',
                      endTime: '18:00',
                    },
                );
                updateField('availableSchedules', newSchedules);
              }}
            />
            <PreferenceEditItem
              activeDay={activeDay}
              times={localProfile.availableSchedules || []}
              exchangeType={localProfile.exchangeType}
              location={{
                region: localProfile.preferredRegion || '',
                detail: localProfile.detailedLocation || '',
              }}
              onTimesChange={(newSchedules) =>
                updateField('availableSchedules', newSchedules)
              }
              onExchangeChange={(type) => updateField('exchangeType', type)}
              onLocationChange={(loc) => {
                updateField('preferredRegion', loc.region);
                updateField('detailedLocation', loc.detail);
              }}
            />
          </ProfileEditSection>
        </div>
      </main>

      <SkillRegisterModal
        isOpen={isSkillModalOpen}
        initialData={
          editingSkillIndex !== null
            ? localProfile.skills[editingSkillIndex]
            : null
        }
        onClose={() => {
          setIsSkillModalOpen(false);
          setEditingSkillIndex(null);
        }}
        onRegister={(skillData: any) => {
          setLocalProfile((prev: any) => {
            const currentSkills = [...(prev.skills || [])];
            const updatedEntry = {
              ...(editingSkillIndex !== null
                ? currentSkills[editingSkillIndex]
                : {}),
              skillCategoryType: skillData.category,
              skillName: skillData.name,
              skillProficiency: skillData.proficiency,
              skillTitle: skillData.title,
              skillDescription: skillData.description,
              imageUrls: skillData.existingImages || [],
              imageFiles: skillData.newFiles || [],
            };

            const nextSkills =
              editingSkillIndex !== null
                ? currentSkills.map((s, i) =>
                    i === editingSkillIndex ? updatedEntry : s,
                  )
                : [...currentSkills, updatedEntry];

            return { ...prev, skills: nextSkills };
          });
          setIsSkillModalOpen(false);
          setEditingSkillIndex(null);
          setIsDirty(true);
        }}
      />
    </div>
  );
}
