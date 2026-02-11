'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProfileEditHeader } from '@/src/components/edit/ProfileEditHeader';
import { ProfileEditSection } from '@/src/components/edit/ProfileEditSection';
import { ExperienceEditItem } from '@/src/components/edit/ExperienceEditItem';
import { SkillEditItem } from '@/src/components/edit/SkillEditItem';
import { DaySelector } from '@/src/components/edit/DaySelector';
import { PreferenceEditItem } from '@/src/components/edit/PreferenceEditItem';
import { SkillRegisterModal } from '@/src/components/edit/SkillRegisterModal';
import { useProfileEdit } from '@/src/hooks/useProfileEdit';

export default function ProfileEditPage() {
  const {
    localProfile,
    setLocalProfile,
    isLoading,
    isDirty,
    isValid,
    updateField,
    handleSave,
    setIsDirty,
  } = useProfileEdit();

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(
    null,
  );
  const [activeDay, setActiveDay] = useState('월');

  if (isLoading || !localProfile)
    return <div className="py-20 text-center">로딩 중...</div>;

  const selectedDayNames = Array.from(
    new Set(localProfile.availableSchedules?.map((s) => s.dayOfWeek) || []),
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
              alt="배너"
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
                {localProfile.skills?.map((skill, idx) => (
                  <SkillEditItem
                    key={idx}
                    skill={skill}
                    onEdit={() => {
                      setEditingSkillIndex(idx);
                      setIsSkillModalOpen(true);
                    }}
                    onDelete={() => {
                      const filtered = localProfile.skills.filter(
                        (_, i) => i !== idx,
                      );
                      if (filtered.length === 0) {
                        setLocalProfile((prev: any) => ({
                          ...prev,
                          skills: [],
                          availableSchedules: [],
                          exchangeType: null,
                          preferredRegion: '',
                          detailedLocation: '',
                        }));
                        setIsDirty(true);
                      } else {
                        updateField('skills', filtered);
                      }
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
            <div
              className={`${!(localProfile.skills?.length > 0) ? 'pointer-events-none opacity-40' : ''} transition-all duration-300`}
            >
              <ProfileEditSection title="선호 시간대">
                <DaySelector
                  selectedDays={selectedDayNames}
                  activeDay={activeDay}
                  onActiveDayChange={setActiveDay}
                  onChange={(days) => {
                    const filteredSchedules =
                      localProfile.availableSchedules?.filter((s) =>
                        days.includes(s.dayOfWeek),
                      ) || [];
                    const addedSchedules = days
                      .filter(
                        (d) =>
                          !filteredSchedules.some((s) => s.dayOfWeek === d),
                      )
                      .map((day) => ({
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
            return {
              ...prev,
              skills:
                editingSkillIndex !== null
                  ? currentSkills.map((s, i) =>
                      i === editingSkillIndex ? updatedEntry : s,
                    )
                  : [...currentSkills, updatedEntry],
            };
          });
          setIsSkillModalOpen(false);
          setEditingSkillIndex(null);
          setIsDirty(true);
        }}
      />
    </div>
  );
}
