'use client';

import { SkillCard } from '@/src/features/skill/SkillCard';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <>
      {isSearching ? (
        <div
          className="flex h-full w-full flex-col items-center overflow-y-auto bg-[#CCCCCC] pt-[70px]"
          onClick={() => setIsSearching(false)}
        >
          <div className="border-brand-600 h-[150px] w-[200px] border">
            image
          </div>
          <h1 className="mt-6 mb-4 text-4xl leading-11 font-semibold">
            스킬을 교환하고 함께 성장하세요.
          </h1>
          <div
            className="flex w-[720px] flex-col items-center bg-white px-5 py-10 pt-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-brand-600 h-16 w-[680px] border">
              찾는 스킬을 입력해주세요.
            </div>

            <div className="flex w-full flex-col">
              <div className="flex justify-between">
                <div>인기 스킬</div>
                <span>오늘 19:58 기준</span>
              </div>
              <div className="flex flex-col">
                {POPULAR_SKILLS.map((skill, idx) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex gap-4">
                      <span>{idx + 1}</span>
                      <span>{skill.title}</span>
                    </div>
                    <span className="bg-gray-200 text-sm">
                      {skill.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col">
              <div>내 최근 검색 항목</div>
              <div className="flex gap-2">
                {SKILL_SEARCH_HISTORY.map((history) => (
                  <div
                    key={history.id}
                    className="flex flex-col bg-gray-200 p-4"
                  >
                    <div>{history.nickname}</div>
                    <div>{history.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center overflow-y-auto bg-sky-50 pt-[70px]">
          <div className="border-brand-600 h-[150px] w-[200px] border">
            image
          </div>
          <h1 className="mt-6 mb-4 text-4xl leading-11 font-semibold">
            스킬을 교환하고 함께 성장하세요.
          </h1>
          <div
            onClick={() => setIsSearching(true)}
            className="border-brand-600 h-16 w-[680px] border"
          >
            찾는 스킬을 입력해주세요.
          </div>

          <div className="mt-30 flex w-[1200px] max-w-[1200px] flex-col gap-y-20">
            <Section title="스킬 장터" moreLink="/skills">
              <div className="flex gap-2">
                {EXAMPLE_SKILLS.map((skill) => (
                  <SkillCard key={skill.id} {...skill} />
                ))}
              </div>
            </Section>

            <Section title="생생한 교환 후기" moreLink="/reviews">
              <div className="border-brand-600 h-40 border">content</div>
            </Section>

            <Section title="크레딧 순위" moreLink="/reviews">
              <div className="border-brand-600 h-40 border">content</div>
            </Section>
          </div>
        </div>
      )}
    </>
  );
}

type SectionProps = {
  title: string;
  moreLink?: string;
  children: React.ReactNode;
};

const Section = ({ title, moreLink, children }: SectionProps) => {
  return (
    <div className="w-full">
      <div className="flex">
        <div>icon</div>
        <span className="ml-4 text-2xl leading-8 font-semibold text-gray-600">
          {title}
        </span>
        {moreLink && (
          <Link
            className="ml-auto text-xl font-semibold text-gray-600"
            href={moreLink}
          >
            더보기
          </Link>
        )}
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
};

const EXAMPLE_SKILLS = [
  {
    id: 'skill-1',
    avatarUrl: '/avatars/avatar1.png',
    nickname: 'SkillMaster',
    skillTitle: 'JavaScript Programming',
    rate: 4.8,
    categories: ['Programming', 'Web Development'],
  },
  {
    id: 'skill-2',
    avatarUrl: '/avatars/avatar2.png',
    nickname: 'DesignGuru',
    skillTitle: 'Graphic Design',
    rate: 4.6,
    categories: ['Design', 'Art'],
  },
  {
    id: 'skill-3',
    avatarUrl: '/avatars/avatar3.png',
    nickname: 'MarketingPro',
    skillTitle: 'Digital Marketing',
    rate: 4.7,
    categories: ['Marketing', 'Business'],
  },
  {
    id: 'skill-4',
    avatarUrl: '/avatars/avatar4.png',
    nickname: 'DataWizard',
    skillTitle: 'Data Analysis',
    rate: 4.9,
    categories: ['Data Science', 'Analytics'],
  },
];
const POPULAR_SKILLS = [
  {
    id: 'skill-5',
    title: 'Photography',
    category: 'Art',
  },
  {
    id: 'skill-6',
    title: 'Cooking',
    category: 'Culinary',
  },
  {
    id: 'skill-7',
    title: 'Yoga Instruction',
    category: 'Health & Wellness',
  },
  {
    id: 'skill-8',
    title: 'Web Development',
    category: 'Programming',
  },
  {
    id: 'skill-9',
    title: 'Creative Writing',
    category: 'Writing',
  },
];

const SKILL_SEARCH_HISTORY = [
  {
    id: 'skill-10',
    title: 'Graphic Design',
    nickname: 'DesignGuru',
  },
  { id: 'skill-11', title: 'Digital Marketing', nickname: 'MarketingPro' },
  { id: 'skill-12', title: 'Data Analysis', nickname: 'DataWizard' },
];
