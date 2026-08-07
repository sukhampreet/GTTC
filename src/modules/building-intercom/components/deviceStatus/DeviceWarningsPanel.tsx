import { AlertTriangle } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { cn } from '@/utils/cn';
import type { DeviceWarning } from '@/modules/building-intercom/types';

export interface DeviceWarningsPanelProps {
  warnings: DeviceWarning[];
}

export function DeviceWarningsPanel({ warnings }: DeviceWarningsPanelProps) {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Recent Warnings</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="p-0">
        {warnings.length === 0 ? (
          <p className="px-4 py-6 text-center text-[12.5px] text-text-tertiary">No active warnings.</p>
        ) : (
          <ul className="divide-y divide-border-default">
            {warnings.map((warning) => (
              <li key={warning.id} className="flex items-start gap-3 px-4 py-2.5">
                <div
                  className={cn(
                    'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-(--radius-md)',
                    warning.tone === 'danger' ? 'bg-danger-bg text-danger-400' : 'bg-warning-bg text-warning-400',
                  )}
                >
                  <AlertTriangle className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-text-primary">{warning.device}</p>
                  <p className="truncate text-[11px] text-text-tertiary">{warning.message}</p>
                </div>
                <span className="shrink-0 text-[11px] text-text-tertiary">{warning.timestamp}</span>
              </li>
            ))}
          </ul>
        )}
      </AppCardContent>
    </AppCard>
  );
}
