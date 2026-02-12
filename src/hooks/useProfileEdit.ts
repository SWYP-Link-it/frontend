'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/src/lib/api/api';
import { useUserStore } from '@/src/stores/userStore';
import { ProfileData } from '@/src/types/profile';
import {
  REGION_MAP,
  WEEKDAY_MAP,
  PROFICIENCY_MAP,
} from '@/src/constants/profile';

export function useProfileEdit() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { userInfo } = useUserStore();

  const [localProfile, setLocalProfile] = useState<ProfileData | null>(null);
  const [isNewProfile, setIsNewProfile] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { isLoading } = useQuery({
    queryKey: ['profile', userInfo?.userId, 'edit'],
    queryFn: async () => {
      try {
        const res = await api.get(`/profile/${userInfo?.userId}/edit`);
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

        const processed = {
          ...profileData,
          availableSchedules: splitSchedules,
          skills: skillsWithImages,
          exchangeType: profileData.exchangeType || null,
        };

        if (!localProfile && !isDirty) {
          setLocalProfile(processed);
        }

        return processed;
      } catch (err: any) {
        if (err.response?.status === 404) {
          setIsNewProfile(true);
          const newData = {
            nickname: userInfo?.nickname || '',
            experienceDescription: '',
            timesTaught: 0,
            skills: [],
            availableSchedules: [],
            exchangeType: null,
            preferredRegion: '',
            detailedLocation: '',
          };
          if (!localProfile && !isDirty) {
            setLocalProfile(newData);
          }
          return newData;
        }
        throw err;
      }
    },
    enabled: Boolean(userInfo?.userId),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const isValid = useMemo(() => {
    if (!localProfile) return false;
    const hasNickname = Boolean(localProfile.nickname?.trim());
    if (isNewProfile) {
      return (
        hasNickname &&
        Boolean(localProfile.experienceDescription?.trim()) &&
        localProfile.skills?.length > 0
      );
    }
    return hasNickname;
  }, [localProfile, isNewProfile]);

  const updateField = (field: string, value: any) => {
    setLocalProfile((prev: any) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const { mutate: handleSave } = useMutation({
    mutationFn: async () => {
      if (!localProfile) return;
      const currentSkills = localProfile.skills || [];
      const hasSkills = currentSkills.length > 0;
      const currentExchangeType = localProfile.exchangeType;

      if (hasSkills && currentExchangeType === null) {
        toast.warning('교환 방식을 선택해주세요.');
        return;
      }

      const schedulesByDay: Record<string, any[]> = {};
      localProfile.availableSchedules?.forEach((s) => {
        if (!schedulesByDay[s.dayOfWeek]) schedulesByDay[s.dayOfWeek] = [];
        schedulesByDay[s.dayOfWeek].push({ ...s });
      });

      const mergedSchedules: any[] = [];
      const formatTime = (time: string) =>
        !time ? '09:00' : time.length > 5 ? time.substring(0, 5) : time;

      Object.keys(schedulesByDay).forEach((day) => {
        const sorted = schedulesByDay[day].sort((a, b) =>
          a.startTime.localeCompare(b.startTime),
        );
        let current = { ...sorted[0] };
        for (let i = 1; i < sorted.length; i++) {
          if (formatTime(current.endTime) === formatTime(sorted[i].startTime)) {
            current.endTime = sorted[i].endTime;
          } else {
            mergedSchedules.push(current);
            current = { ...sorted[i] };
          }
        }
        mergedSchedules.push(current);
      });

      const payload = {
        nickname: localProfile.nickname,
        experienceDescription:
          localProfile.experienceDescription?.trim() || null,
        exchangeType: hasSkills ? currentExchangeType : null,
        preferredRegion:
          REGION_MAP[localProfile.preferredRegion] ||
          localProfile.preferredRegion ||
          null,
        detailedLocation: localProfile.detailedLocation?.trim() || null,
        availableSchedules:
          hasSkills && mergedSchedules.length > 0
            ? mergedSchedules.map((s) => ({
                dayOfWeek: WEEKDAY_MAP[s.dayOfWeek] || s.dayOfWeek,
                startTime: formatTime(s.startTime),
                endTime: formatTime(s.endTime),
              }))
            : null,
        skills: currentSkills.map((s) => ({
          id: s.id || null,
          skillCategoryType: s.skillCategoryType,
          skillName: s.skillName,
          skillTitle: s.skillTitle,
          skillProficiency:
            PROFICIENCY_MAP[s.skillProficiency] || s.skillProficiency,
          skillDescription: s.skillDescription,
          exchangeDuration: Number(s.exchangeDuration) || 60,
          isVisible: true,
          imageUrls: s.imageUrls,
        })),
      };

      const formData = new FormData();
      formData.append(
        'profile',
        new Blob([JSON.stringify(payload)], { type: 'application/json' }),
      );

      currentSkills.forEach((skill: any, idx: number) => {
        if (skill.imageFiles?.length > 0) {
          skill.imageFiles.forEach((file: File) =>
            formData.append(`skill-${idx}-images`, file),
          );
        }
      });

      return isNewProfile
        ? api.post('/profile', formData)
        : api.put('/profile', formData);
    },
    onSuccess: (res) => {
      if (res?.data.success) {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        toast.success('저장되었습니다.');
        router.push('/profile');
      }
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || '저장 중 오류가 발생했습니다.',
      );
    },
  });

  return {
    localProfile,
    setLocalProfile,
    isLoading,
    isDirty,
    isValid,
    updateField,
    handleSave,
    setIsDirty,
  };
}
