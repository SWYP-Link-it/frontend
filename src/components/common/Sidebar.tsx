'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { api } from '@/src/lib/api/api';
import { RequiredAuth } from '@/src/features/auth/RequiredAuth';
import { useIsLoggedIn } from '@/src/stores/selectors';
import {
  LOGGED_IN_MENU_ITEMS,
  LOGGED_OUT_MENU_ITEMS,
} from '@/src/constants/navigation';

export const Sidebar = () => {
  const isLoggedIn = useIsLoggedIn();
  const pathname = usePathname();
  const [unreadStatus, setUnreadStatus] = useState({
    hasRequestUnread: false,
    hasChatUnread: false,
  });

  const menuItems = isLoggedIn ? LOGGED_IN_MENU_ITEMS : LOGGED_OUT_MENU_ITEMS;

  const fetchNotifications = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const requestRes = await api.get('/exchange/request/notification');
      const { hasUnreadSent, hasUnreadReceived } = requestRes.data?.data || {};

      const chatRes = await api.get('/chat/rooms');
      const chatRooms = chatRes.data?.data || [];
      const totalUnreadChat = chatRooms.reduce(
        (acc: number, room: any) => acc + (room.unreadCount || 0),
        0,
      );

      setUnreadStatus({
        hasRequestUnread: Boolean(hasUnreadSent || hasUnreadReceived),
        hasChatUnread: totalUnreadChat > 0,
      });
    } catch (error) {
      console.error('사이드바 알림 조회 실패:', error);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const initFetch = async () => {
      await fetchNotifications();
    };

    initFetch();

    window.addEventListener('chat-update', fetchNotifications);
    return () => {
      window.removeEventListener('chat-update', fetchNotifications);
    };
  }, [fetchNotifications, pathname]);

  return (
    <aside className="flex h-screen w-20 shrink-0 flex-col items-center bg-gray-800">
      <nav className="mt-11 flex flex-col gap-5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === '/'
              ? pathname === '/'
              : pathname.startsWith(item.path);

          const hasNotification =
            (item.name === '요청 관리' && unreadStatus.hasRequestUnread) ||
            (item.name === '메세지' && unreadStatus.hasChatUnread);

          const link = (
            <Link
              href={item.path}
              className={`group hover:text-brand-600 flex flex-col items-center transition-colors ${
                isActive ? 'text-brand-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`relative rounded-lg p-[6px] transition-colors group-hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700' : ''
                }`}
              >
                <Icon size={20} />
                {hasNotification && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                )}
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
