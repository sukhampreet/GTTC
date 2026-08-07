import { KeyRound, DoorClosed, Clock } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/feedback/EmptyState';
import type { AccessPermissionRecord } from '@/modules/access-control/types';

export interface PermissionCardsProps {
  permissions: AccessPermissionRecord[];
}

export function PermissionCards({ permissions }: PermissionCardsProps) {
  if (permissions.length === 0) {
    return <EmptyState title="No permission groups found" description="Try a different search term." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
      {permissions.map((permission) => (
        <AppCard key={permission.id} className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[13.5px] font-semibold text-text-primary">{permission.user}</p>
              <p className="truncate text-[11px] text-text-tertiary">{permission.accessGroup}</p>
            </div>
            <StatusBadge tone={permission.status === 'active' ? 'success' : 'neutral'}>
              {permission.status === 'active' ? 'Active' : 'Inactive'}
            </StatusBadge>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-text-tertiary">
            <span className="inline-flex items-center gap-1">
              <DoorClosed className="size-3.5" />
              {permission.assignedDoors} doors
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {permission.schedule}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-border-default pt-2.5">
            {permission.permissions.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1 rounded-(--radius-sm) bg-surface-hover px-2 py-1 text-[10.5px] font-medium text-text-secondary"
              >
                <KeyRound className="size-3" />
                {p}
              </span>
            ))}
          </div>
        </AppCard>
      ))}
    </div>
  );
}
