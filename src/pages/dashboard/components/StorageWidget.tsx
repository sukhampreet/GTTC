import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { cn } from '@/utils/cn';
import { storageStats } from '@/mock/dashboard';
import type { StatusTone } from '@/types/common';

const TONE_BAR_CLASSES: Record<StatusTone, string> = {
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
  info: 'bg-info-500',
  neutral: 'bg-secondary-500',
};

export function StorageWidget() {
  return (
    <AppCard className="h-full">
      <AppCardHeader>
        <AppCardTitle>Storage</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="space-y-4">
        {storageStats.map((stat) => (
          <div key={stat.id}>
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-medium text-text-primary">{stat.label}</span>
              <span className="text-text-tertiary">
                {stat.used} <span className="text-text-tertiary/70">/ {stat.total}</span>
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
              <div
                className={cn('h-full rounded-full', TONE_BAR_CLASSES[stat.tone])}
                style={{ width: `${stat.usedPct}%` }}
              />
            </div>
          </div>
        ))}
      </AppCardContent>
    </AppCard>
  );
}
