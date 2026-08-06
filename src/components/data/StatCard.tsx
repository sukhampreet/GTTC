import type { LucideIcon } from 'lucide-react';

import { cn } from '@/utils/cn';
import type { StatusTone } from '@/types/common';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  tone?: StatusTone;
  hint?: string;
  className?: string;
}

const TONE_ICON_CLASSES: Record<StatusTone, string> = {
  success: 'text-success-400 bg-success-bg',
  danger: 'text-danger-400 bg-danger-bg',
  warning: 'text-warning-400 bg-warning-bg',
  info: 'text-info-400 bg-info-bg',
  neutral: 'text-text-secondary bg-surface-hover',
};

export function StatCard({ label, value, icon: Icon, tone = 'neutral', hint, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-(--radius-lg) border border-border-default bg-surface p-4',
        className,
      )}
    >
      {Icon && (
        <div className={cn('flex size-9 shrink-0 items-center justify-center rounded-(--radius-md)', TONE_ICON_CLASSES[tone])}>
          <Icon className="size-4.5" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">{label}</p>
        <p className="mt-0.5 text-xl font-semibold text-text-primary tabular-nums">{value}</p>
        {hint && <p className="mt-0.5 text-[11px] text-text-tertiary">{hint}</p>}
      </div>
    </div>
  );
}
