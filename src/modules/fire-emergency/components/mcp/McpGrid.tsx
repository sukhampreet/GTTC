import { Siren, RotateCcw } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/feedback/EmptyState';
import type { StatusTone } from '@/types/common';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE, titleCase } from '@/modules/fire-emergency/components/shared/statusTone';
import type { McpDevice } from '@/modules/fire-emergency/types';

export interface McpGridProps {
  devices: McpDevice[];
}

const MCP_STATUS_TONE: Record<McpDevice['status'], StatusTone> = {
  normal: 'success',
  activated: 'danger',
  fault: 'warning',
};

export function McpGrid({ devices }: McpGridProps) {
  if (devices.length === 0) {
    return <EmptyState title="No manual call points found" description="Try a different search term." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {devices.map((device) => (
        <AppCard key={device.id} className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-(--radius-md) border border-border-default bg-surface-raised text-danger-400">
                <Siren className="size-4.5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-text-primary">{device.mcpId}</p>
                <p className="truncate text-[11px] text-text-tertiary">{device.building} · {device.floor}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <StatusBadge tone={MCP_STATUS_TONE[device.status]}>{titleCase(device.status)}</StatusBadge>
            <StatusBadge tone={DEVICE_STATUS_TONE[device.health]}>{DEVICE_STATUS_LABEL[device.health]}</StatusBadge>
          </div>

          <div className="flex items-center justify-between border-t border-border-default pt-2.5 text-[11px] text-text-tertiary">
            <span>{device.zone}</span>
            <span>{device.activationCount} activation{device.activationCount === 1 ? '' : 's'}</span>
          </div>

          {device.resetStatus === 'pending-reset' && (
            <div className="flex items-center gap-1.5 rounded-(--radius-sm) bg-warning-bg px-2 py-1 text-[11px] font-medium text-warning-400">
              <RotateCcw className="size-3" />
              Pending physical reset
            </div>
          )}
        </AppCard>
      ))}
    </div>
  );
}
