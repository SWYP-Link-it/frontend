'use client';

import { Tabbar } from '@/src/components/Tabbar';
import { useState } from 'react';

const tabs = [
  'overview',
  'introduction',
  'time',
  'portfolio',
  'reviews',
] as const;

export const TAB_LABELS = {
  overview: '스킬 정보',
  introduction: '소개',
  time: '시간',
  portfolio: '포트폴리오',
  reviews: '후기',
};

export const DetailTabs = () => {
  const [currentTab, setCurrentTab] = useState<(typeof tabs)[number]>(tabs[0]);

  const handleTabClick = (tab: string) => {
    console.log('Clicked tab:', tab);
    setCurrentTab(tab as (typeof tabs)[number]);

    const element = document.getElementById(`skill-detail-${tab}`);
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
      items={Object.entries(TAB_LABELS).map(([tab, label]) => ({
        key: tab,
        label,
      }))}
      currentItem={currentTab}
      onClickItem={handleTabClick}
    />
  );
};
