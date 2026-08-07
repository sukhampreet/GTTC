import { HardDrive } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import type { StorageUsage } from '@/modules/building-intercom/types';

export interface StorageUsagePanelProps {
  usage: StorageUsage;
}

export function StorageUsagePanel({ usage }: StorageUsagePanelProps) {
  const pctUsed = Math.round((usage.usedGb / usage.totalGb) * 100);

  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Storage Usage</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-(--radius-md) bg-primary-900 text-primary-300">
            <HardDrive className="size-4.5" />
          </div>
          <div>
            <p className="text-[13px] font-medium text-text-primary">
              {usage.usedGb} GB <span className="text-text-tertiary">of {usage.totalGb} GB used</span>
            </p>
            <p className="text-[11px] text-text-tertiary">Retention policy: {usage.retentionDays} days</p>
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-hover">
          <div
            className={pctUsed >= 85 ? 'h-full bg-danger-500' : pctUsed >= 60 ? 'h-full bg-warning-500' : 'h-full bg-success-500'}
            style={{ width: `${pctUsed}%` }}
          />
        </div>
        <p className="text-[11px] text-text-tertiary">{pctUsed}% of allocated storage in use</p>
      </AppCardContent>
    </AppCard>
  );
}
