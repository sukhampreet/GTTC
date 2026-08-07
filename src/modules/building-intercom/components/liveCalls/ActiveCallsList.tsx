import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { LIVE_CALL_STATUS_TONE, titleCase } from '@/modules/building-intercom/components/shared/statusTone';
import type { LiveCall } from '@/modules/building-intercom/types';

export interface ActiveCallsListProps {
  calls: LiveCall[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ActiveCallsList({ calls, selectedId, onSelect }: ActiveCallsListProps) {
  return (
    <AppCard className="h-fit">
      <AppCardHeader>
        <AppCardTitle>Active Calls ({calls.length})</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="p-0">
        {calls.length === 0 ? (
          <p className="px-4 py-6 text-center text-[12.5px] text-text-tertiary">No active calls at this time.</p>
        ) : (
          <ul className="divide-y divide-border-default">
            {calls.map((call) => (
              <li key={call.id}>
                <button
                  onClick={() => onSelect(call.id)}
                  className={cn(
                    'flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left transition-colors',
                    call.id === selectedId ? 'bg-primary-500/12' : 'hover:bg-surface-hover',
                  )}
                >
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-text-primary">{call.caller}</p>
                    <p className="truncate text-[11px] text-text-tertiary">→ {call.receiver} · {call.callType}</p>
                  </div>
                  <StatusBadge tone={LIVE_CALL_STATUS_TONE[call.status]}>{titleCase(call.status)}</StatusBadge>
                </button>
              </li>
            ))}
          </ul>
        )}
      </AppCardContent>
    </AppCard>
  );
}
