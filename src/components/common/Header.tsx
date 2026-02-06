'use client';

import Image from 'next/image';
import { SearchIcon } from '../icons/SearchIcon';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useRef } from 'react';

export const Header = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex h-[77px] w-full items-center justify-between bg-white px-[112px] py-5">
        {/* TODO: 로고 바뀌면 재조정 */}
        <Image src="/icons/logo.svg" alt="logo" width={67} height={26} />
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="border-brand-600 flex h-[37px] w-[342px] cursor-pointer items-center gap-[7px] rounded-lg border p-[10px]"
        >
          <SearchIcon className="text-gray-600" size={14} />
          <div className="text-sm font-medium text-gray-700 opacity-65 outline-none">
            찾는 스킬을 입력해주세요.
          </div>
        </button>
      </header>
      {isSearchModalOpen
        ? createPortal(
            <div
              className="fixed top-0 left-20 z-[999] flex h-screen w-[calc(100vw-80px)] justify-center bg-gray-300 pt-[18px]"
              onClick={() => {
                setIsSearchModalOpen(false);
              }}
            >
              <div
                className="flex h-fit w-[728px] flex-col gap-7 rounded-[22px] bg-white p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="flex h-16 items-center gap-[10px] rounded-[15px] bg-[#F5F6FA] px-4 py-[18px]"
                  onClick={() => {
                    searchInputRef.current?.focus();
                  }}
                >
                  <SearchIcon size={24} className="text-gray-400" />
                  <input
                    ref={searchInputRef}
                    placeholder="찾는 스킬을 입력해주세요."
                    className="w-full text-lg text-gray-800 placeholder-gray-400 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-8 px-[18.5px]">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between text-lg font-semibold text-gray-700">
                      인기 검색어
                      <span className="text-base font-normal text-gray-400">
                        최근 일주일 기준
                      </span>
                    </div>
                    <div className="flex flex-col gap-4 text-lg font-medium text-gray-700">
                      {popularKeyword.map((keyword, idx) => (
                        <div key={idx} className="cursor-pointer">
                          <span className="text-brand-600 mr-6 font-semibold">
                            {idx + 1}
                          </span>
                          {keyword}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-700">
                      핫한 게시글
                      <span className="text-base text-gray-600">더보기</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto">
                      {popularPosts.map((post, idx) => (
                        <div
                          key={idx + 1}
                          className="flex w-65 shrink-0 flex-col gap-3 rounded-lg bg-[#F5F6FA] px-6 py-4 font-semibold"
                        >
                          <span className="text-gray-400">{post.nickname}</span>
                          <p className="text-gray-700">{post.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
};

const popularKeyword = [
  '리액트',
  '그래픽디자인',
  '자바(Spring)',
  '프로덕트 디자인',
  'C4D',
];

const popularPosts = [
  {
    nickname: '블루팬더',
    content: '수준높은 강의 보여드립니다.',
  },
  {
    nickname: '블루팬더2',
    content: '수준높은 강의 보여드립니다.',
  },
  {
    nickname: '블루팬더2',
    content: '수준높은 강의 보여드립니다.',
  },
  {
    nickname: '블루팬더2',
    content: '수준높은 강의 보여드립니다.',
  },
];
