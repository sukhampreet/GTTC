import { create } from 'zustand';

import { notifications as mockNotifications } from '@/mock/notifications';
import type { NotificationItem } from '@/types/common';

interface NotificationsState {
  items: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationsStore = create<NotificationsState>()((set) => ({
  items: mockNotifications,
  unreadCount: mockNotifications.filter((n) => !n.read).length,

  markAsRead: (id) =>
    set((state) => {
      const items = state.items.map((item) => (item.id === id ? { ...item, read: true } : item));
      return { items, unreadCount: items.filter((n) => !n.read).length };
    }),

  markAllAsRead: () =>
    set((state) => ({
      items: state.items.map((item) => ({ ...item, read: true })),
      unreadCount: 0,
    })),
}));
