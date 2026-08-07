import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { cn } from '@/utils/cn';
import { networkStats } from '@/mock/dashboard';
import type { StatusTone } from '@/types/common';

const TONE_TEXT_CLASSES: Record<StatusTone, string> = {
  success: 'text-success-400',
  danger: 'text-danger-400',
  warning: 'text-warning-400',
  info: 'text-info-400',
  neutral: 'text-text-primary',
};

export function NetworkWidget() {
  return (
    <AppCard className="h-full">
      <AppCardHeader>
        <AppCardTitle>Network</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="grid grid-cols-2 gap-3">
        {networkStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="flex items-center gap-2.5 rounded-(--radius-md) border border-border-default bg-surface-raised p-2.5">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-(--radius-sm) bg-surface-hover text-text-secondary">
                <Icon className="size-3.5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[10px] uppercase tracking-wide text-text-tertiary">{stat.label}</p>
                <p className={cn('truncate text-[13px] font-semibold tabular-nums', TONE_TEXT_CLASSES[stat.tone])}>
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </AppCardContent>
    </AppCard>
  );
}
