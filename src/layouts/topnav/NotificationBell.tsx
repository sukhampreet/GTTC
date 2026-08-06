import { useEffect, useRef, useState } from 'react';
import { Bell } from 'lucide-react';

import { useNotificationsStore } from '@/store/notificationsStore';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const items = useNotificationsStore((state) => state.items);
  const unreadCount = useNotificationsStore((state) => state.unreadCount);
  const markAllAsRead = useNotificationsStore((state) => state.markAllAsRead);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex size-8 items-center justify-center rounded-(--radius-md) text-text-secondary hover:bg-surface-hover hover:text-text-primary"
        aria-label="Notifications"
      >
        <Bell className="size-4" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex size-3.5 items-center justify-center rounded-full bg-danger-500 text-[9px] font-semibold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-80 rounded-(--radius-lg) border border-border-default bg-surface shadow-(--shadow-token-lg) animate-fade-in">
          <div className="flex items-center justify-between border-b border-border-default px-3 py-2.5">
            <p className="text-xs font-semibold text-text-primary">Notifications</p>
            <button
              onClick={markAllAsRead}
              className="text-[11px] text-primary-400 hover:text-primary-300"
            >
              Mark all as read
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'flex flex-col gap-1 border-b border-border-default px-3 py-2.5 last:border-b-0',
                  !item.read && 'bg-primary-500/5',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-text-primary">{item.title}</p>
                  <StatusBadge tone={item.tone} className="shrink-0">
                    {item.source}
                  </StatusBadge>
                </div>
                <p className="text-[11px] text-text-secondary">{item.description}</p>
                <p className="text-[10px] text-text-tertiary">{item.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
