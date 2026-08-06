import { Construction } from 'lucide-react';

import { cn } from '@/utils/cn';

export interface ComingSoonProps {
  moduleName: string;
  className?: string;
}

export function ComingSoon({ moduleName, className }: ComingSoonProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-(--radius-lg) border border-dashed border-border-strong bg-surface py-24 text-center',
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-primary-900 text-primary-300">
        <Construction className="size-5" />
      </div>
      <div>
        <p className="text-sm font-medium text-text-primary">{moduleName}</p>
        <p className="mt-1 text-xs text-text-secondary">
          This module is scheduled for a future development sprint.
        </p>
      </div>
    </div>
  );
}
