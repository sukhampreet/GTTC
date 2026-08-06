import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon: Icon = Inbox, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16 text-center', className)}>
      <div className="flex size-11 items-center justify-center rounded-full bg-surface-hover text-text-tertiary">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-sm font-medium text-text-primary">{title}</p>
        {description && <p className="mt-1 max-w-sm text-xs text-text-secondary">{description}</p>}
      </div>
      {action}
    </div>
  );
}
