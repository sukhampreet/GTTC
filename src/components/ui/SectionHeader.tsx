import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export interface SectionHeaderProps {
  title: string;
  actions?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, actions, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between pb-3', className)}>
      <h2 className="text-[13px] font-semibold uppercase tracking-wide text-text-secondary">{title}</h2>
      {actions}
    </div>
  );
}
