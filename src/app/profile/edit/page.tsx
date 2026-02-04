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
import { TimeSelectModal } from '@/src/components/edit/TimeSelectModal';

/** 매핑 테이블 */
const REGION_MAP: Record<string, string> = {
  서울: 'SEOUL',
  경기도: 'GYEONGGI',
  강원도: 'GANGWON',
  충청도: 'CHUNGCHEONG',
  경상도: 'GYEONGSANG',
  전라도: 'JEOLLA',
  제주도: 'JEJU',
};

const WEEKDAY_MAP: Record<string, string> = {
  월: 'MON',
  화: 'TUE',
  수: 'WED',
  목: 'THU',
  금: 'FRI',
  토: 'SAT',
  일: 'SUN',
};

const PROFICIENCY_MAP: Record<string, string> = {
  상: 'HIGH',
  중: 'MEDIUM',
  하: 'LOW',
};

const SKILL_CATEGORY_MAP: Record<string, string> = {
  'IT · 개발': 'DEVELOPMENT',
  '디자인 · 크리에이티브': 'DESIGN',
  '영상 · 사진 · 편집': 'EDITING',
  '마케팅 · 콘텐츠': 'MARKETING',
  외국어: 'LANGUAGE',
  '재테크 · 경제': 'FINANCE',
  운동: 'SPORTS',
  음악: 'MUSIC',
  기타: 'ETC',
};

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
  ); // [추가] 수정 중인 스킬 인덱스

  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [activeDay, setActiveDay] = useState('월');

  /** 1. 페이지 진입 시 데이터 조회 */
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

  /** 2. 저장 유효성 검사 */
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

  /** 3. 저장 실행 */
  /** 3. 저장 실행 */
  const handleSave = async () => {
    if (!localProfile) return;

    try {
      const formData = new FormData();

      // 1. 시간 포맷 정리 함수 (초 단위 제거)
      const formatTime = (time: string) => {
        if (!time) return '09:00';
        return time.length > 5 ? time.substring(0, 5) : time;
      };

      // 2. 페이로드 구성
      const payload = {
        // 닉네임, 경력
        nickname: localProfile.nickname,
        experienceDescription: localProfile.experienceDescription || '',

        // 교환 방식, 지역 (Enum 매핑 안전 장치)
        exchangeType: localProfile.exchangeType || 'ONLINE',
        preferredRegion:
          REGION_MAP[localProfile.preferredRegion] ||
          localProfile.preferredRegion ||
          null,
        detailedLocation: localProfile.detailedLocation?.trim() || null,

        // 스케줄: 기존 ID가 있다면 반드시 포함해서 보내야 함
        availableSchedules: (localProfile.availableSchedules || []).map(
          (s: any) => ({
            id: s.id || null, // [중요] ID가 있으면 보내고, 없으면 null (신규)
            dayOfWeek: WEEKDAY_MAP[s.dayOfWeek] || s.dayOfWeek,
            startTime: formatTime(s.startTime),
            endTime: formatTime(s.endTime),
          }),
        ),

        // 스킬: 마찬가지로 ID 포함
        skills: (localProfile.skills || []).map((s: any) => ({
          id: s.id || null, // [중요] 기존 스킬 수정 시 ID 필수
          skillCategoryType:
            SKILL_CATEGORY_MAP[s.skillCategoryName] ||
            s.skillCategoryType ||
            'ETC', // 매핑 안전장치
          skillCategoryName: s.skillCategoryName,
          skillName: s.skillName || '',
          skillTitle: s.skillTitle || '',
          skillProficiency:
            PROFICIENCY_MAP[s.skillProficiency] || s.skillProficiency,
          skillDescription: s.skillDescription || '',
          exchangeDuration: Number(s.exchangeDuration) || 60,
          isVisible: true,
          imageUrls: Array.isArray(s.imageUrls) ? s.imageUrls : [],
        })),
      };

      // [디버깅] 실제 서버로 날아가는 JSON 데이터를 콘솔에서 확인하세요!
      console.log('Final Payload:', payload);

      formData.append(
        'profile',
        new Blob([JSON.stringify(payload)], { type: 'application/json' }),
      );

      // 이미지 파일 처리
      localProfile.skills.forEach((skill: any, idx: number) => {
        if (skill.imageFiles?.length > 0) {
          skill.imageFiles.forEach((file: File) => {
            formData.append(`skill-${idx}-images`, file);
          });
        }
      });

      // API 호출
      const response = isNewProfile
        ? await api.post('/profile', formData)
        : await api.put('/profile', formData);

      if (response.data.success) {
        alert('저장되었습니다.');
        router.push('/profile');
      }
    } catch (err: any) {
      // 에러 상세 내용을 콘솔에 출력
      console.error('저장 에러 상세:', err);
      console.error('서버 응답 데이터:', err.response?.data);

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
                    // [추가됨]
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
                  setEditingSkillIndex(null); // 신규 등록 모드
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
        // [참고] editingSkillIndex가 있으면 기존 데이터를 모달에 넘겨주는 로직이 있으면 더 좋습니다.
        // initialData={
        //   editingSkillIndex !== null
        //     ? localProfile.skills[editingSkillIndex]
        //     : null
        // }
        onClose={() => {
          setIsSkillModalOpen(false);
          setEditingSkillIndex(null);
        }}
        onRegister={(skillData) => {
          const newSkill = {
            id:
              editingSkillIndex !== null
                ? localProfile.skills[editingSkillIndex].id
                : Date.now(),
            skillCategoryType: SKILL_CATEGORY_MAP[skillData.category] || 'ETC',
            skillCategoryName: skillData.category,
            skillName: skillData.name,
            skillTitle: skillData.title,
            skillProficiency: skillData.proficiency,
            skillDescription: skillData.description,
            exchangeDuration: 60,
            isVisible: true,
            imageUrls:
              editingSkillIndex !== null
                ? localProfile.skills[editingSkillIndex].imageUrls
                : [],
          };

          if (editingSkillIndex !== null) {
            const updatedSkills = [...localProfile.skills];
            updatedSkills[editingSkillIndex] = newSkill;
            updateField('skills', updatedSkills);
          } else {
            updateField('skills', [...(localProfile.skills || []), newSkill]);
          }
          setIsSkillModalOpen(false);
          setEditingSkillIndex(null);
        }}
      />
    </div>
  );
}
