'use client';

import { useState } from 'react';
import { BaseModal } from '../BaseModal';
import { Input } from '../Input';

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
  onRegister: (skill: SkillFormData) => void;
}

export const SkillRegisterModal = ({
  isOpen,
  onClose,
  onRegister,
}: SkillRegisterModalProps) => {
  const categories = [
    'IT · 개발',
    '디자인 · 크리에이티브',
    '영상 · 사진 · 편집',
    '마케팅 · 콘텐츠',
    '외국어',
    '재테크 · 경제',
    '운동',
    '음악',
    '기타',
  ];

  const [form, setForm] = useState<SkillFormData>({
    category: '',
    name: '',
    proficiency: 'MEDIUM',
    title: '',
    description: '',
  });

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      <div className="p-10">
        <h2 className="mb-8 text-xl font-bold text-gray-900">스킬 등록</h2>

        <div className="custom-scrollbar max-h-[70vh] space-y-8 overflow-y-auto pr-2">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-gray-900">
              스킬 카테고리
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm({ ...form, category: cat })}
                  className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                    form.category === cat
                      ? 'border-blue-500 bg-blue-50 font-bold text-blue-600'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
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
              <select
                value={form.proficiency}
                onChange={(e) =>
                  setForm({
                    ...form,
                    proficiency: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH',
                  })
                }
                className="focus:border-brand-600 w-full appearance-none rounded-[15px] border-2 border-gray-300 bg-white p-[14px] text-xl transition-all outline-none"
              >
                <option value="LOW">초급</option>
                <option value="MEDIUM">중급</option>
                <option value="HIGH">고급</option>
              </select>
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
              className="focus:border-brand-600 min-h-[120px] w-full resize-none rounded-[15px] border-2 border-gray-300 bg-white p-4 text-xl transition-all outline-none"
            />
          </div>
        </div>

        <button
          onClick={() => onRegister(form)}
          disabled={!form.name || !form.title || !form.category}
          className={`mt-8 w-full rounded-xl py-4 font-bold shadow-lg transition-all ${
            form.name && form.title && form.category
              ? 'bg-blue-500 text-white shadow-blue-100 hover:bg-blue-600'
              : 'cursor-not-allowed bg-gray-100 text-gray-300 shadow-none'
          }`}
        >
          스킬 등록
        </button>
      </div>
    </BaseModal>
  );
};
