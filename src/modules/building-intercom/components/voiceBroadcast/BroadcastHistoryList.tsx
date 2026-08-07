import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { titleCase } from '@/modules/building-intercom/components/shared/statusTone';
import type { StatusTone } from '@/types/common';
import type { BroadcastHistoryEntry } from '@/modules/building-intercom/types';

export interface BroadcastHistoryListProps {
  history: BroadcastHistoryEntry[];
}

const STATUS_TONE: Record<BroadcastHistoryEntry['status'], StatusTone> = {
  completed: 'success',
  scheduled: 'info',
  failed: 'danger',
};

export function BroadcastHistoryList({ history }: BroadcastHistoryListProps) {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Broadcast History</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="p-0">
        <ul className="divide-y divide-border-default">
          {history.map((entry) => (
            <li key={entry.id} className="flex items-start justify-between gap-3 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-text-primary">{entry.message}</p>
                <p className="truncate text-[11px] text-text-tertiary">{entry.group} · {entry.scheduledAt}</p>
              </div>
              <StatusBadge tone={STATUS_TONE[entry.status]} className="shrink-0">
                {titleCase(entry.status)}
              </StatusBadge>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
