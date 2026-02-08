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

export default function ProfileEditPage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const { userInfo } = useUserStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isNewProfile, setIsNewProfile] = useState(false);
  const [localProfile, setLocalProfile] = useState<any>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(
    null,
  );
  const [activeDay, setActiveDay] = useState('월');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken || !userInfo?.userId) return;
      try {
        setIsLoading(true);
        const res = await api.get(`/profile/${userInfo.userId}/edit`);
        if (res.data.success && res.data.data) {
          const profileData = res.data.data;

          const splitSchedules: any[] = [];
          if (profileData.availableSchedules) {
            profileData.availableSchedules.forEach((s: any) => {
              let currentStart = s.startTime.substring(0, 5);
              const endStr = s.endTime.substring(0, 5);

              while (currentStart < endStr) {
                const [h, m] = currentStart.split(':').map(Number);
                const date = new Date(2000, 0, 1, h, m);
                date.setMinutes(date.getMinutes() + 30);
                const nextEnd = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

                splitSchedules.push({
                  id: s.id,
                  dayOfWeek: s.dayOfWeek,
                  startTime: currentStart,
                  endTime: nextEnd,
                });
                currentStart = nextEnd;
              }
            });
          }

          const skillsWithImages = (profileData.skills || []).map((s: any) => ({
            ...s,
            imageUrls: s.imageUrls || [],
            imageFiles: [],
          }));

          setLocalProfile({
            ...profileData,
            availableSchedules: splitSchedules,
            skills: skillsWithImages,
          });
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

      const mergedSchedules: any[] = [];
      const schedulesByDay: Record<string, any[]> = {};

      localProfile.availableSchedules.forEach((s: any) => {
        const day = s.dayOfWeek;
        if (!schedulesByDay[day]) schedulesByDay[day] = [];
        schedulesByDay[day].push({ ...s });
      });

      Object.keys(schedulesByDay).forEach((day) => {
        const sorted = schedulesByDay[day].sort((a, b) =>
          a.startTime.localeCompare(b.startTime),
        );

        if (sorted.length === 0) return;

        let current = { ...sorted[0] };
        for (let i = 1; i < sorted.length; i++) {
          const next = sorted[i];
          if (formatTime(current.endTime) === formatTime(next.startTime)) {
            current.endTime = next.endTime;
          } else {
            mergedSchedules.push(current);
            current = { ...next };
          }
        }
        mergedSchedules.push(current);
      });

      const payload = {
        nickname: localProfile.nickname,
        experienceDescription: localProfile.experienceDescription || '',
        exchangeType: localProfile.exchangeType || 'ONLINE',
        preferredRegion:
          REGION_MAP[localProfile.preferredRegion] ||
          localProfile.preferredRegion ||
          null,
        detailedLocation: localProfile.detailedLocation?.trim() || null,
        availableSchedules: mergedSchedules.map((s: any) => ({
          dayOfWeek: WEEKDAY_MAP[s.dayOfWeek] || s.dayOfWeek,
          startTime: formatTime(s.startTime),
          endTime: formatTime(s.endTime),
        })),
        skills: localProfile.skills.map((s: any) => ({
          id: s.id || null,
          skillCategoryType: s.skillCategoryType,
          skillName: s.skillName || '',
          skillTitle: s.skillTitle || '',
          skillProficiency:
            PROFICIENCY_MAP[s.skillProficiency] || s.skillProficiency,
          skillDescription: s.skillDescription || '',
          exchangeDuration: Number(s.exchangeDuration) || 60,
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
        <div className="overflow-hidden rounded-[40px] border border-gray-50 bg-white shadow-xl">
          <div className="flex px-12 pt-10">
            <Image
              src="/icons/profile_banner.svg"
              alt="프로필 배너"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full"
              priority
            />
          </div>
          <div className="p-12">
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
                  className="h-[48px] w-full rounded-[12px] border border-gray-200 text-xl text-gray-300"
                >
                  +
                </button>
              </div>
            </ProfileEditSection>

            <ProfileEditSection title="선호 시간대">
              <DaySelector
                selectedDays={selectedDayNames}
                activeDay={activeDay}
                onActiveDayChange={setActiveDay}
                onChange={(days) => {
                  const filteredSchedules =
                    localProfile.availableSchedules?.filter((s: any) =>
                      days.includes(s.dayOfWeek),
                    ) || [];

                  const newDays = days.filter(
                    (d) =>
                      !filteredSchedules.some((s: any) => s.dayOfWeek === d),
                  );

                  const addedSchedules = newDays.map((day) => ({
                    dayOfWeek: day,
                    startTime: '09:00',
                    endTime: '09:30',
                  }));

                  updateField('availableSchedules', [
                    ...filteredSchedules,
                    ...addedSchedules,
                  ]);
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
              exchangeDuration: skillData.exchangeDuration,
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
