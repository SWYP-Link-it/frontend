import { useAuthStore } from '@/src/stores/authStore';

export const ProfileTab = () => {
  const logout = useAuthStore((state) => state.logout);

  const tabs = [
    { label: '내 프로필 보기', active: true },
    // { label: '내 크레딧 보기', active: false },
  ];

  return (
    <div className="w-full">
      <nav className="flex flex-col gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
              tab.active
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
        <button
          onClick={() => {
            if (confirm('로그아웃 하시겠습니까?')) {
              logout();
            }
          }}
          className="mt-4 w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-400 transition-colors hover:text-gray-600"
        >
          로그아웃
        </button>
      </nav>
    </div>
  );
};
