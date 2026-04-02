'use client';

import { memo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/lib/api/api';
import { BellIcon } from '@/src/components/icons/BellIcon';
import { Popover } from '@/src/components/Popover';

interface Notification {
  id: number;
  notificationType: string;
  message: string;
  refId: number;
  read: boolean;
  createdAt: string;
}

interface UnreadCountResponse {
  messageTabCount: number;
}

const fetchNotifications = async (): Promise<Notification[]> => {
  const res = await api.get('/notifications');
  return res.data?.data.notifications ?? [];
};

const fetchUnreadCount = async (): Promise<UnreadCountResponse> => {
  const res = await api.get('/notifications/unread-count');
  return res.data?.data ?? { messageTabCount: 0 };
};

export const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    enabled: isOpen,
  });

  const { data: unreadData } = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: fetchUnreadCount,
  });

  const badgeCount = unreadData?.messageTabCount ?? 0;

  const handleItemClick = (notification: Notification) => {
    if (notification.notificationType === 'CHAT_MESSAGE') {
      router.push(`/messages/${notification.refId}`);
    }
    setIsOpen(false);
  };

  const trigger = (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className="group hover:text-brand-600 flex flex-col items-center text-gray-400 transition-colors"
    >
      <div className="relative rounded-lg p-[6px] transition-colors group-hover:bg-gray-700">
        <BellIcon size={20} />
        {badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {badgeCount > 99 ? '99+' : badgeCount}
          </span>
        )}
      </div>
    </button>
  );

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={trigger}
      className="top-0 left-full ml-2 w-72"
    >
      <div className="flex h-60 flex-col">
        <div className="px-4 py-3">
          <span className="text-sm font-semibold">알림</span>
        </div>
        <ul className="overflow-y-auto">
          {!notifications || notifications.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-gray-400">
              알림이 없습니다
            </li>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                handleClick={() => handleItemClick(notification)}
              />
            ))
          )}
        </ul>
      </div>
    </Popover>
  );
};

const NotificationItem = memo(
  ({
    notification,
    handleClick,
  }: {
    notification: Notification;
    handleClick: () => void;
  }) => {
    return (
      <li>
        <button
          onClick={() => handleClick()}
          className={`w-full cursor-pointer px-4 py-3 text-left text-sm transition-colors hover:bg-gray-200 ${
            notification.read ? 'text-gray-400' : ''
          }`}
        >
          <p className="leading-snug">{notification.message}</p>
          <p className="mt-1 text-xs text-gray-500">
            {new Date(notification.createdAt).toLocaleString('ko-KR', {
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </button>
      </li>
    );
  },
);

NotificationItem.displayName = 'NotificationItem';
