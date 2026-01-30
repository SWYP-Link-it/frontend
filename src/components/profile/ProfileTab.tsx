interface ProfileTabsProps {
  activeTab: 'profile' | 'credits';
  onTabChange: (tab: 'profile' | 'credits') => void;
}

export const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  return (
    <nav className="space-y-1">
      <button
        onClick={() => onTabChange('profile')}
        className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
          activeTab === 'profile'
            ? 'bg-gray-100 text-gray-900'
            : 'bg-transparent text-gray-500 hover:bg-gray-50'
        }`}
      >
        내 프로필 보기
      </button>
      <button
        onClick={() => onTabChange('credits')}
        className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
          activeTab === 'credits'
            ? 'bg-gray-100 text-gray-900'
            : 'bg-transparent text-gray-500 hover:bg-gray-50'
        }`}
      >
        내 크레딧 보기
      </button>
      <button className="w-full rounded-xl px-4 pt-[40px] text-left text-sm font-semibold text-gray-400">
        로그아웃
      </button>
    </nav>
  );
};
