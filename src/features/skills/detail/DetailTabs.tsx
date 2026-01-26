'use client';

import { Tabbar } from '@/src/components/Tabbar';
import { useState } from 'react';

const tabs = ['스킬 정보', '소개', '시간', '포트폴리오', '후기'] as const;

export const DetailTabs = () => {
  const [currentTab, setCurrentTab] = useState<(typeof tabs)[number]>(tabs[0]);

  const handleTabClick = (tab: string) => {
    console.log('Clicked tab:', tab);
    setCurrentTab(tab as (typeof tabs)[number]);
    // TODO: 탭 클릭시 해당 위치로 이동
  };

  return (
    <Tabbar
      items={tabs}
      currentItem={currentTab}
      onClickItem={handleTabClick}
    />
  );
};
