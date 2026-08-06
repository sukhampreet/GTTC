import type { ReactNode } from 'react';
import { X } from 'lucide-react';

import { cn } from '@/utils/cn';

export interface RightDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

/**
 * Reusable slide-over panel mounted at the layout level. Closed by default
 * in Sprint 1 — future sprints wire specific triggers (e.g. camera detail,
 * event detail) into this same shell.
 */
export function RightDrawer({ open, onClose, title, children }: RightDrawerProps) {
  return (
    <div className={cn('fixed inset-0 z-40', !open && 'pointer-events-none')} aria-hidden={!open}>
      <div
        className={cn(
          'absolute inset-0 bg-overlay transition-opacity duration-150',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'absolute right-0 top-0 flex h-full w-[380px] flex-col border-l border-border-default bg-surface shadow-(--shadow-token-lg) transition-transform duration-200',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-(--header-height) shrink-0 items-center justify-between border-b border-border-default px-4">
          <p className="text-sm font-semibold text-text-primary">{title}</p>
          <button
            onClick={onClose}
            className="rounded-(--radius-sm) p-1 text-text-tertiary hover:bg-surface-hover hover:text-text-primary"
            aria-label="Close panel"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </aside>
    </div>
  );
}
