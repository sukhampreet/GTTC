import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfirmationDialog } from '@/components/ui/Dialog';
import { EmptyState } from '@/components/feedback/EmptyState';
import type { AlarmResetItem } from '@/modules/fire-emergency/types';

export interface AlarmResetPanelProps {
  items: AlarmResetItem[];
  operatorName: string;
}

export function AlarmResetPanel({ items, operatorName }: AlarmResetPanelProps) {
  const [queue, setQueue] = useState(items);
  const [pendingReset, setPendingReset] = useState<AlarmResetItem | null>(null);

  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Current Alarms &amp; Reset Queue</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="p-0">
        {queue.length === 0 ? (
          <EmptyState title="No active alarms" description="All fire and emergency alarms are currently clear." />
        ) : (
          <ul className="divide-y divide-border-default">
            {queue.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-text-primary">{item.device}</p>
                  <p className="truncate text-[11px] text-text-tertiary">
                    {item.alarmType} · {item.zone} · Triggered {item.triggeredAt}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusBadge tone={item.status === 'active' ? 'danger' : 'warning'}>
                    {item.status === 'active' ? 'Active' : 'Queued'}
                  </StatusBadge>
                  <Button size="sm" variant="outline" onClick={() => setPendingReset(item)}>
                    <RotateCcw className="size-3.5" />
                    Reset
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AppCardContent>

      <ConfirmationDialog
        open={pendingReset !== null}
        title="Confirm Alarm Reset"
        description={
          pendingReset
            ? `Reset "${pendingReset.device}" (${pendingReset.alarmType})? This will be logged under operator "${operatorName}" at the current time.`
            : ''
        }
        confirmLabel="Reset Alarm"
        tone="danger"
        onConfirm={() => {
          setQueue((prev) => prev.filter((q) => q.id !== pendingReset?.id));
          setPendingReset(null);
        }}
        onCancel={() => setPendingReset(null)}
      />
    </AppCard>
  );
}
