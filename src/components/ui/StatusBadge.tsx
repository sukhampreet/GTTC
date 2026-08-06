import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';
import type { StatusTone } from '@/types/common';

const TONE_CLASSES: Record<StatusTone, string> = {
  success: 'bg-success-bg text-success-400 border-success-600/40',
  danger: 'bg-danger-bg text-danger-400 border-danger-600/40',
  warning: 'bg-warning-bg text-warning-400 border-warning-600/40',
  info: 'bg-info-bg text-info-400 border-info-500/40',
  neutral: 'bg-surface-hover text-text-secondary border-border-strong',
};

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone;
  dot?: boolean;
}

export function StatusBadge({ tone = 'neutral', dot = true, className, children, ...props }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-(--radius-sm) border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide',
        TONE_CLASSES[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}
