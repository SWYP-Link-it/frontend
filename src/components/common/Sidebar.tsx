'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RequiredAuth } from '@/src/features/auth/RequiredAuth';
import { useIsLoggedIn } from '@/src/stores/selectors';
import {
  LOGGED_IN_MENU_ITEMS,
  LOGGED_OUT_MENU_ITEMS,
} from '@/src/constants/navigation';

export const Sidebar = () => {
  const isLoggedIn = useIsLoggedIn();
  const pathname = usePathname();

  const menuItems = isLoggedIn ? LOGGED_IN_MENU_ITEMS : LOGGED_OUT_MENU_ITEMS;

  return (
    <aside className="flex h-screen w-20 flex-col items-center bg-gray-800 py-10">
      <h1 className="text-error-400 text-xl font-bold">Linkit</h1>

      <nav className="mt-11 flex flex-col gap-5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === '/'
              ? pathname === '/'
              : pathname.startsWith(item.path);

          const link = (
            <Link
              href={item.path}
              className={`group hover:text-brand-600 flex flex-col items-center transition-colors ${
                isActive ? 'text-brand-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`rounded-lg p-[6px] transition-colors group-hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700' : ''
                }`}
              >
                <Icon size={20} />
              </div>
              <span className="text-sm leading-[1.5] font-medium">
                {item.name}
              </span>
            </Link>
          );

          return (
            <div key={item.name}>
              {item.requiredAuth ? <RequiredAuth>{link}</RequiredAuth> : link}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
