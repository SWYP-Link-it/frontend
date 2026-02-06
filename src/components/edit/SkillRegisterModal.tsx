'use client';

import { useState } from 'react';
import { BaseModal } from '../BaseModal';
import { Input } from '../Input';
import { SKILL_CATEGORY_MAP } from '@/src/constants/profile';

interface SkillFormData {
  category: string;
  name: string;
  proficiency: 'LOW' | 'MEDIUM' | 'HIGH';
  title: string;
  description: string;
}

interface SkillRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (skill: any) => void;
  initialData?: any;
}

export const SkillRegisterModal = ({
  isOpen,
  onClose,
  onRegister,
  initialData,
}: SkillRegisterModalProps) => {
  // initialData로부터 폼의 초기 상태를 직접 계산하는 함수
  // 이 방식은 useEffect 내부에서 setState를 호출하는 것보다 React의 렌더링 사이클에 안전합니다.
  const getInitialForm = (): SkillFormData => {
    if (initialData) {
      const rawCategory =
        initialData.skillCategoryType ||
        initialData.category ||
        initialData.skillCategoryName ||
        '';

      const categoryEntries = Object.entries(SKILL_CATEGORY_MAP);
      const foundEntry = categoryEntries.find(
        ([kor, eng]) => eng === rawCategory || kor === rawCategory,
      );

      return {
        category: foundEntry ? (foundEntry[1] as string) : 'ETC',
        name: initialData.skillName || '',
        proficiency:
          (initialData.skillProficiency as 'LOW' | 'MEDIUM' | 'HIGH') ||
          'MEDIUM',
        title: initialData.skillTitle || '',
        description: initialData.skillDescription || '',
      };
    }
    return {
      category: '',
      name: '',
      proficiency: 'MEDIUM',
      title: '',
      description: '',
    };
  };

  // 1. useState의 지연 초기화(Lazy initialization) 기능을 사용하여
  // 컴포넌트가 처음 마운트될 때 딱 한 번 초기값을 계산합니다.
  const [form, setForm] = useState<SkillFormData>(() => getInitialForm());

  // 2. 만약 부모 컴포넌트에서 initialData가 바뀔 때 폼을 강제로 동기화해야 한다면,
  // 부모 쪽에서 <SkillRegisterModal key={initialData?.id || 'new'} /> 처럼 key를 주는 것이 베스트입니다.
  // 그렇게 하면 이 컴포넌트가 새로 마운트되면서 useState가 다시 초기화됩니다.

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      <div className="p-10">
        <h2 className="mb-8 text-xl font-bold text-gray-900">
          {initialData ? '스킬 수정' : '스킬 등록'}
        </h2>

        <div className="custom-scrollbar max-h-[70vh] space-y-8 overflow-y-auto pr-2">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-gray-900">
              스킬 카테고리
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(SKILL_CATEGORY_MAP).map(([korLabel, engEnum]) => {
                const isSelected = form.category === engEnum;

                return (
                  <button
                    key={engEnum}
                    type="button"
                    onClick={() => setForm({ ...form, category: engEnum })}
                    className={`rounded-lg border px-4 py-2 text-sm transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 font-bold text-blue-600 ring-2 ring-blue-500/20'
                        : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {korLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="스킬명"
              placeholder="예: React, Figma"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <div className="flex flex-col gap-3">
              <label className="text-xl leading-[30px] font-medium text-gray-900">
                숙련도
              </label>
              <div className="relative">
                <select
                  value={form.proficiency}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      proficiency: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH',
                    })
                  }
                  className="w-full appearance-none rounded-[15px] border-2 border-gray-300 bg-white p-[14px] text-xl transition-all outline-none focus:border-blue-400"
                >
                  <option value="LOW">초급</option>
                  <option value="MEDIUM">중급</option>
                  <option value="HIGH">고급</option>
                </select>
                <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <Input
            label="스킬 제목"
            placeholder="사람들이 보게 될 게시글의 제목을 입력해주세요."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <div className="flex flex-col gap-3">
            <label className="text-xl leading-[30px] font-medium text-gray-900">
              스킬 소개
            </label>
            <textarea
              placeholder="어떤 내용을 알려줄 수 있는지 간단히 적어주세요."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="min-h-[120px] w-full resize-none rounded-[15px] border-2 border-gray-100 bg-white p-4 text-xl transition-all outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            onRegister({
              ...form,
              skillCategoryType: form.category,
            });
          }}
          disabled={!form.name || !form.title || !form.category}
          className={`mt-8 w-full rounded-xl py-4 font-bold shadow-lg transition-all ${
            form.name && form.title && form.category
              ? 'bg-blue-500 text-white shadow-blue-100 hover:bg-blue-600'
              : 'cursor-not-allowed bg-gray-100 text-gray-300 shadow-none'
          }`}
        >
          {initialData ? '수정 완료' : '스킬 등록'}
        </button>
      </div>
    </BaseModal>
  );
};
