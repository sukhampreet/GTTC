import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export interface ToolbarProps {
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
}

export function Toolbar({ left, right, className }: ToolbarProps) {
  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      <div className="flex flex-1 items-center gap-2">{left}</div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}
