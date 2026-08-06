import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export interface FilterBarProps {
  children: ReactNode;
  className?: string;
}

export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2 rounded-(--radius-md) border border-border-default bg-surface p-2.5', className)}>
      {children}
    </div>
  );
}
