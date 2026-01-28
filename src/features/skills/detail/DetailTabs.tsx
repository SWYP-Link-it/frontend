'use client';

import { Tabbar } from '@/src/components/Tabbar';
import { useState } from 'react';

const tabs = ['스킬 정보', '소개', '시간', '포트폴리오', '후기'] as const;

export const TAB_ELEMENT = {
  '스킬 정보': 'overview',
  소개: 'introduction',
  시간: 'time',
  포트폴리오: 'portfolio',
  후기: 'reviews',
};

export const DetailTabs = () => {
  const [currentTab, setCurrentTab] = useState<(typeof tabs)[number]>(tabs[0]);

  const handleTabClick = (tab: string) => {
    console.log('Clicked tab:', tab);
    setCurrentTab(tab as (typeof tabs)[number]);

    const element = document.getElementById(
      `skill-detail-${TAB_ELEMENT[tab as keyof typeof TAB_ELEMENT]}`,
    );
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 120,
        behavior: 'smooth',
      });
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Tabbar
      items={tabs}
      currentItem={currentTab}
      onClickItem={handleTabClick}
    />
  );
};
