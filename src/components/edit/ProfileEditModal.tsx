'use client';

import { useState, useEffect } from 'react';
import { BaseModal } from '../BaseModal';
import { Input } from '../Input';
import { api } from '@/src/lib/api/api';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName: string;
  onSave: () => void;
}

export const ProfileEditModal = ({
  isOpen,
  onClose,
  initialName,
  onSave,
}: ProfileEditModalProps) => {
  const [name, setName] = useState(initialName);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(initialName);
  }, [initialName, isOpen]);

  const handleNicknameChange = async () => {
    if (!name.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (name === initialName) {
      onClose();
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.patch('/user/nickname', {
        nickname: name,
      });

      if (response.data.success) {
        alert('닉네임이 성공적으로 변경되었습니다.');
        onSave();
      }
    } catch (error: any) {
      const errorData = error.response?.data;
      if (errorData?.code === 'U002') {
        alert('이미 존재하는 닉네임입니다.');
      } else if (errorData?.code === 'U003') {
        alert('기존 닉네임과 동일합니다.');
      } else {
        alert(errorData?.message || '닉네임 변경에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-[520px]">
      <div className="flex flex-col items-center p-12">
        <h2 className="mb-10 self-start text-[22px] font-bold text-gray-900">
          프로필 수정하기
        </h2>

        <div className="relative mb-12">
          <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#EBF3FF] shadow-sm">
            <svg
              className="h-20 w-20 text-[#B4D3FF]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
          <button className="absolute right-1 bottom-1 flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-white shadow-lg transition-colors hover:bg-gray-50">
            <svg
              className="h-4 w-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        <div className="mb-12 w-full">
          <Input
            label="닉네임"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="닉네임을 입력해주세요"
          />
        </div>

        <div className="flex w-full gap-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 rounded-[15px] border border-gray-200 py-[18px] text-xl font-bold text-gray-400 transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={handleNicknameChange}
            disabled={isLoading}
            className="flex-1 rounded-[15px] bg-[#62A1FF] py-[18px] text-xl font-bold text-white shadow-lg shadow-blue-100 transition-colors hover:bg-blue-500 disabled:opacity-50"
          >
            {isLoading ? '처리 중...' : '수정하기'}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
