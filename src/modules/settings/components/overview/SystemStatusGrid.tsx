import { AppCard, AppCardContent } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { systemOverviewStatus } from '@/modules/settings/mock';
import { SYSTEM_STATUS_LABEL, SYSTEM_STATUS_TONE } from '@/modules/settings/components/shared/statusTone';

export function SystemStatusGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {systemOverviewStatus.map((item) => (
        <AppCard key={item.id}>
          <AppCardContent className="flex items-start justify-between gap-2 p-4">
            <div className="min-w-0">
              <p className="text-[12.5px] font-medium text-text-primary">{item.label}</p>
              <p className="mt-0.5 truncate text-[11px] text-text-tertiary">{item.detail}</p>
            </div>
            <StatusBadge tone={SYSTEM_STATUS_TONE[item.state]} className="shrink-0">
              {SYSTEM_STATUS_LABEL[item.state]}
            </StatusBadge>
          </AppCardContent>
        </AppCard>
      ))}
    </div>
  );
}
