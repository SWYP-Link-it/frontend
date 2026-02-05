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
  SKILL_CATEGORY_MAP,
  WEEKDAY_MAP,
} from '@/src/constants/profile';

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
        const res = await api.get(`/profile/${userInfo.userId}`);
        if (res.data.success && res.data.data) {
          setLocalProfile(res.data.data);
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
  }, [accessToken, userInfo?.userId, userInfo?.nickname]);

  const isValid = useMemo(() => {
    if (!localProfile) return false;
    const hasExperience = localProfile.experienceDescription?.trim().length > 0;
    const hasSkills = localProfile.skills?.length > 0;
    const hasSchedules = localProfile.availableSchedules?.length > 0;
    const isOffline = ['OFFLINE', 'BOTH'].includes(localProfile.exchangeType);

    let locationValid = true;
    if (isOffline) {
      locationValid = Boolean(
        localProfile.preferredRegion && localProfile.detailedLocation?.trim(),
      );
    }
    return Boolean(hasExperience && hasSkills && hasSchedules && locationValid);
  }, [localProfile]);

  const handleSave = async () => {
    if (!localProfile) return;

    try {
      const formData = new FormData();

      const formatTime = (time: string) => {
        if (!time) return '09:00';
        return time.length > 5 ? time.substring(0, 5) : time;
      };

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

        skills: (localProfile.skills || []).map((s: any) => {
          const finalCategoryType = Object.values(SKILL_CATEGORY_MAP).includes(
            s.skillCategoryType,
          )
            ? s.skillCategoryType
            : SKILL_CATEGORY_MAP[s.skillCategoryName] || 'ETC';

          return {
            id: s.id || null,
            skillCategoryType: finalCategoryType,
            skillName: s.skillName || '',
            skillTitle: s.skillTitle || '',
            skillProficiency:
              PROFICIENCY_MAP[s.skillProficiency] || s.skillProficiency,
            skillDescription: s.skillDescription || '',
            exchangeDuration: Number(s.exchangeDuration) || 60,
            isVisible: true,
            imageUrls: Array.isArray(s.imageUrls) ? s.imageUrls : [],
          };
        }),
      };

      formData.append(
        'profile',
        new Blob([JSON.stringify(payload)], { type: 'application/json' }),
      );

      localProfile.skills.forEach((skill: any, idx: number) => {
        if (skill.imageFiles?.length > 0) {
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
      alert(
        `저장 실패: ${err.response?.data?.message || '서버 내부 오류가 발생했습니다(500).'}`,
      );
    }
  };

  const updateField = (field: string, value: any) => {
    setLocalProfile((prev: any) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  if (isLoading || !localProfile)
    return (
      <div className="py-20 text-center text-gray-500">
        정보를 불러오는 중입니다...
      </div>
    );

  const selectedDayNames = Array.from(
    new Set(
      localProfile.availableSchedules?.map((s: any) => s.dayOfWeek) || [],
    ),
  ) as string[];

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-32">
      <ProfileEditHeader
        onSave={handleSave}
        isDirty={isDirty}
        isValid={isValid}
      />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-[40px] border border-gray-50 bg-white p-12 shadow-xl shadow-gray-100/50">
          <ProfileEditSection
            title="경력과 경험"
            description="전문성을 나타낼 수 있는 본인의 경력이나 프로젝트 경험을 상세히 적어주세요."
          >
            <ExperienceEditItem
              value={localProfile.experienceDescription || ''}
              onChange={(val) => updateField('experienceDescription', val)}
            />
          </ProfileEditSection>

          <ProfileEditSection
            title="스킬"
            description="본인이 가진 스킬을 등록하고 숙련도를 선택해 주세요."
          >
            <div className="grid grid-cols-1 gap-4">
              {localProfile.skills?.map((skill: any, idx: number) => (
                <SkillEditItem
                  key={skill.id || idx}
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
                className="group flex h-20 w-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-100 text-gray-300 transition-all hover:border-blue-100 hover:bg-gray-50 hover:text-blue-300"
              >
                <span className="font-bold">+ 스킬 추가하기</span>
              </button>
            </div>
          </ProfileEditSection>

          <ProfileEditSection title="선호 시간대">
            <div className="space-y-6">
              <DaySelector
                selectedDays={selectedDayNames}
                activeDay={activeDay}
                onActiveDayChange={setActiveDay}
                onChange={(days) => {
                  const newSchedules = days.map((day) => {
                    const existing = localProfile.availableSchedules?.find(
                      (s: any) => s.dayOfWeek === day,
                    );
                    return (
                      existing || {
                        dayOfWeek: day,
                        startTime: '09:00',
                        endTime: '18:00',
                      }
                    );
                  });
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
            </div>
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
          const newSkills = [...(localProfile.skills || [])];
          const skillEntry = {
            ...(editingSkillIndex !== null ? newSkills[editingSkillIndex] : {}),
            skillCategoryType: skillData.category,
            skillName: skillData.name,
            skillProficiency: skillData.proficiency,
            skillTitle: skillData.title,
            skillDescription: skillData.description,
          };

          if (editingSkillIndex !== null) {
            newSkills[editingSkillIndex] = skillEntry;
          } else {
            newSkills.push(skillEntry);
          }

          updateField('skills', newSkills);
          setIsSkillModalOpen(false);
          setEditingSkillIndex(null);
        }}
      />
    </div>
  );
}
