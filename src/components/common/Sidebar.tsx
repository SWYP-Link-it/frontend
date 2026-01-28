'use client';

import Link from 'next/link';
import { RequiredAuth } from '@/src/features/auth/RequiredAuth';
import { useIsLoggedIn } from '@/src/stores/selectors';
import {
  LOGGED_IN_MENU_ITEMS,
  LOGGED_OUT_MENU_ITEMS,
} from '@/src/constants/navigation';

export default function Sidebar() {
  const isLoggedIn = useIsLoggedIn();

  const menuItems = isLoggedIn ? LOGGED_IN_MENU_ITEMS : LOGGED_OUT_MENU_ITEMS;

  return (
    <aside className="flex h-screen w-[80px] flex-col items-center bg-gray-800 py-10">
      <h1 className="text-error-400 mb-10 text-xl font-bold">Linkit</h1>

      <nav className="flex flex-col gap-6">
        {menuItems.map((item) => {
          const link = (
            <Link
              href={item.path}
              className="group hover:text-error-400 flex flex-col items-center gap-2 text-gray-400 transition-colors"
            >
              {/* TODO: 디자인 리소스 확정 시 실제 아이콘(SVG)으로 교체 필요 */}
              <div className="group-hover:bg-error-400 h-4 w-4 rounded bg-gray-400" />
              <span className="text-[10px] font-medium">{item.name}</span>
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
}
