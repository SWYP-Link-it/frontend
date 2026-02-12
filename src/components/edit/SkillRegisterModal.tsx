'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { BaseModal } from '../BaseModal';
import {
  SKILL_CATEGORY_MAP,
  PROFICIENCY_OPTIONS,
} from '@/src/constants/profile';
import { SkillData, SkillFormData } from '@/src/types/profile';

interface SkillRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (skill: SkillFormData) => void;
  initialData?: SkillData | null;
}

export const SkillRegisterModal = ({
  isOpen,
  onClose,
  onRegister,
  initialData,
}: SkillRegisterModalProps) => {
  const getDefaultValues = useCallback((): SkillFormData => {
    if (initialData) {
      const rawCategory =
        initialData.skillCategoryType || initialData.category || '';
      const categoryValue = SKILL_CATEGORY_MAP[rawCategory] || rawCategory;

      return {
        category: categoryValue || '',
        name: initialData.skillName || initialData.name || '',
        proficiency: (initialData.skillProficiency ||
          initialData.proficiency ||
          'MEDIUM') as 'LOW' | 'MEDIUM' | 'HIGH',
        exchangeDuration: initialData.exchangeDuration || 0,
        title: initialData.skillTitle || initialData.title || '',
        description:
          initialData.skillDescription || initialData.description || '',
        existingImages: Array.isArray(initialData.imageUrls)
          ? [...initialData.imageUrls]
          : [],
        newFiles: Array.isArray(initialData.imageFiles)
          ? [...initialData.imageFiles]
          : [],
      };
    }
    return {
      category: '',
      name: '',
      proficiency: 'MEDIUM',
      exchangeDuration: 0,
      title: '',
      description: '',
      existingImages: [],
      newFiles: [],
    };
  }, [initialData]);

  const [form, setForm] = useState<SkillFormData>(getDefaultValues);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProficiencyOpen, setIsProficiencyOpen] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);

  const durationOptions = [30, 60, 90, 120, 150, 180];

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        setForm(getDefaultValues());
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, getDefaultValues]);

  const previews = useMemo(() => {
    if (!form.newFiles || form.newFiles.length === 0) return [];
    return form.newFiles.map((file) => URL.createObjectURL(file));
  }, [form.newFiles]);

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const validateText = (text: string) => {
    return text.replace(/[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\s0-9]/g, '');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const currentTotal = form.existingImages.length + form.newFiles.length;
      if (currentTotal + selectedFiles.length > 5) {
        alert('이미지는 최대 5장까지 등록 가능합니다.');
        return;
      }
      setForm((prev) => ({
        ...prev,
        newFiles: [...prev.newFiles, ...selectedFiles],
      }));
    }
    e.target.value = '';
  };

  const removeExistingImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index),
    }));
  };

  const removeNewFile = (index: number) => {
    setForm((prev) => ({
      ...prev,
      newFiles: prev.newFiles.filter((_, i) => i !== index),
    }));
  };

  const isFormValid = Boolean(
    form.category &&
    form.name &&
    form.exchangeDuration > 0 &&
    form.title &&
    form.title.length > 0 &&
    form.title.length <= 39 &&
    form.name.length <= 20 &&
    form.description.length <= 500,
  );

  const handleSubmit = () => {
    onRegister({ ...form });
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-[750px]"
      height="h-[720px]"
    >
      <div className="flex h-full flex-col p-10">
        <h2 className="mb-8 text-[24px] font-bold text-gray-900">스킬</h2>

        <div className="custom-scrollbar flex-1 space-y-10 overflow-y-auto pr-2">
          <div className="flex flex-col gap-4">
            <label className="text-[16px] font-bold text-gray-900">
              스킬 카테고리
            </label>
            <div
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`w-full cursor-pointer rounded-[12px] border p-4 transition-all ${
                isCategoryOpen ? 'border-blue-400' : 'border-gray-200'
              } ${form.category ? 'text-gray-800' : 'text-gray-400'}`}
            >
              {Object.keys(SKILL_CATEGORY_MAP).find(
                (key) => SKILL_CATEGORY_MAP[key] === form.category,
              ) || '어떤 분야의 스킬인지 알려주세요.'}
            </div>

            {isCategoryOpen && (
              <div className="flex flex-wrap gap-2 rounded-[12px] border border-gray-100 bg-white p-4">
                {Object.entries(SKILL_CATEGORY_MAP).map(
                  ([korLabel, engEnum]) => (
                    <button
                      key={engEnum}
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({ ...prev, category: engEnum }));
                        setIsCategoryOpen(false);
                      }}
                      className={`rounded-lg border px-4 py-2 text-[14px] transition-all ${
                        form.category === engEnum
                          ? 'border-blue-500 bg-blue-50 font-bold text-blue-600'
                          : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {korLabel}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-[16px] font-bold text-gray-900">
                  스킬명
                </label>
                <span className="text-[12px] text-gray-400">
                  {form.name.length}/20
                </span>
              </div>
              <input
                placeholder="구체적인 스킬명을 입력해주세요."
                value={form.name}
                onChange={(e) => {
                  const filtered = validateText(e.target.value);
                  setForm((prev) => ({ ...prev, name: filtered.slice(0, 20) }));
                }}
                className="w-full rounded-[12px] border border-gray-200 p-4 text-[16px] outline-none focus:border-blue-400"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[16px] font-bold text-gray-900">
                숙련도
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProficiencyOpen(!isProficiencyOpen)}
                  className="flex w-full items-center justify-between rounded-[12px] border border-gray-200 p-4 text-[16px] outline-none focus:border-blue-400"
                >
                  <span
                    className={
                      form.proficiency ? 'text-gray-800' : 'text-gray-400'
                    }
                  >
                    {PROFICIENCY_OPTIONS.find(
                      (opt) => opt.value === form.proficiency,
                    )?.label || '선택'}
                  </span>
                  <svg
                    className={`h-5 w-5 transition-transform ${isProficiencyOpen ? 'rotate-180' : ''}`}
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
                </button>
                {isProficiencyOpen && (
                  <div className="absolute z-50 mt-2 w-full rounded-[12px] border border-gray-100 bg-white shadow-lg">
                    {PROFICIENCY_OPTIONS.map((opt) => (
                      <div
                        key={opt.value}
                        onClick={() => {
                          setForm((prev) => ({
                            ...prev,
                            proficiency: opt.value as 'LOW' | 'MEDIUM' | 'HIGH',
                          }));
                          setIsProficiencyOpen(false);
                        }}
                        className="flex cursor-pointer items-center justify-between border-b border-gray-50 p-4 last:border-none hover:bg-blue-50"
                      >
                        <div>
                          <div className="font-bold text-gray-900">
                            {opt.label}
                          </div>
                          <div className="text-[12px] text-gray-500">
                            {opt.description}
                          </div>
                        </div>
                        {form.proficiency === opt.value && (
                          <svg
                            className="h-5 w-5 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-[16px] font-bold text-gray-900">
              스킬 거래 시간
            </label>
            <div
              onClick={() => setIsDurationOpen(!isDurationOpen)}
              className={`w-full cursor-pointer rounded-[12px] border p-4 transition-all ${
                isDurationOpen ? 'border-blue-400' : 'border-gray-200'
              } ${form.exchangeDuration > 0 ? 'text-gray-800' : 'text-gray-400'}`}
            >
              {form.exchangeDuration > 0
                ? `${form.exchangeDuration}분`
                : '스킬을 가르칠 시간을 선택해주세요.'}
            </div>

            {isDurationOpen && (
              <div className="flex flex-wrap gap-2 rounded-[12px] border border-gray-100 bg-white p-4">
                {durationOptions.map((min) => (
                  <button
                    key={min}
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, exchangeDuration: min }));
                      setIsDurationOpen(false);
                    }}
                    className={`rounded-lg border px-4 py-2 text-[14px] transition-all ${
                      form.exchangeDuration === min
                        ? 'border-blue-500 bg-blue-50 font-bold text-blue-600'
                        : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {min}분
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-[16px] font-bold text-gray-900">
                스킬 제목
              </label>
              <span className="text-[12px] text-gray-400">
                {form.title.length}/39
              </span>
            </div>
            <input
              placeholder="게시글 제목을 입력해주세요."
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  title: e.target.value.slice(0, 39),
                }))
              }
              className="w-full rounded-[12px] border border-gray-200 p-4 text-[16px] outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-[16px] font-bold text-gray-900">
                스킬 소개
              </label>
              <span className="text-[12px] text-gray-400">
                {form.description.length}/500
              </span>
            </div>
            <textarea
              placeholder="스킬을 소개해주세요."
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description: e.target.value.slice(0, 500),
                }))
              }
              className="min-h-[120px] w-full resize-none rounded-[12px] border border-gray-200 p-4 text-[16px] outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[16px] font-bold text-gray-900">
              포트폴리오
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-[12px] border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400">
                <span className="text-[14px]">
                  {form.existingImages.length + form.newFiles.length}/5
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {form.existingImages.map((url, i) => (
                <div
                  key={`existing-${i}`}
                  className="relative h-[120px] w-[120px]"
                >
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full rounded-xl object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(i)}
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <span className="text-[12px] leading-none">✕</span>
                  </button>
                </div>
              ))}
              {previews.map((url, i) => (
                <div key={`new-${i}`} className="relative h-[120px] w-[120px]">
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full rounded-xl object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewFile(i)}
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-black"
                  >
                    <span className="text-[12px] leading-none">✕</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`mt-10 w-full shrink-0 rounded-[12px] py-5 text-[18px] font-bold transition-all ${
            isFormValid
              ? 'bg-brand-500 hover:bg-brand-600 text-white'
              : 'bg-gray-100 text-gray-300'
          }`}
        >
          {initialData ? '수정 완료' : '스킬 등록'}
        </button>
      </div>
    </BaseModal>
  );
};
