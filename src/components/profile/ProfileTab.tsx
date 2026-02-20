'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/src/stores/authStore';

export const ProfileTab = () => {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  const tabs = [
    { label: '내 프로필 보기', href: '/profile' },
    { label: '내 크레딧 보기', href: '/profile/credit' },
    { label: '내 리뷰 보기', href: '/profile/review' },
  ];

  return (
    <div className="w-full">
      <nav className="flex flex-col gap-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="whitespace-nowrap">{tab.label}</span>
            </Link>
          );
        })}

        <button
          onClick={() => {
            if (confirm('로그아웃 하시겠습니까?')) {
              logout();
            }
          }}
          className="mt-4 w-full rounded-lg px-4 py-3 text-left text-sm font-medium whitespace-nowrap text-gray-400 transition-colors hover:text-gray-600"
        >
          로그아웃
        </button>
      </nav>
    </div>
  );
};
