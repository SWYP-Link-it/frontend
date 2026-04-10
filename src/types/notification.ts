const NotificationType = {
  CHAT_MESSAGE: 'CHAT_MESSAGE',
  REQUEST_RECEIVED: 'REQUEST_RECEIVED',
  REQUEST_SENT: 'REQUEST_SENT',
  REQUEST_STATUS_CHANGED: 'REQUEST_STATUS_CHANGED',
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

export type Notification = {
  id: number;
  notificationType: NotificationType;
  message: string;
  refId: number;
  read: boolean;
  createdAt: string;
};
