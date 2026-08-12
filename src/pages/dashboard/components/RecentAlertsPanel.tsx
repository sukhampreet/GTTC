import { useNavigate } from 'react-router-dom';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';
import { ACCESS_CONTROL_PATHS } from '@/modules/access-control/constants/paths';
import { EVENT_CENTER_PATHS } from '@/modules/event-center/constants/paths';
import { dashboardAlerts } from '@/mock/dashboard';
import type { AlertStatus } from '@/types/dashboard';
import type { StatusTone } from '@/types/common';

const STATUS_LABEL: Record<AlertStatus, string> = {
  open: 'Open',
  investigating: 'Investigating',
  resolved: 'Resolved',
};

const STATUS_TONE: Record<AlertStatus, StatusTone> = {
  open: 'danger',
  investigating: 'warning',
  resolved: 'success',
};

export function RecentAlertsPanel() {
  const navigate = useNavigate();

  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <AppCardTitle>Recent Alerts</AppCardTitle>
        <Button variant="ghost" size="sm" onClick={() => navigate(`${ROUTES.eventCenter}/${EVENT_CENTER_PATHS.warnings}`)}>
          View all
        </Button>
      </AppCardHeader>
      <AppCardContent className="max-h-96 space-y-2 overflow-y-auto">
        {dashboardAlerts.map((alert) => {
          const isAccessControl = alert.module === 'Access Control';
          return (
            <div
              key={alert.id}
              role={isAccessControl ? 'button' : undefined}
              tabIndex={isAccessControl ? 0 : undefined}
              onClick={
                isAccessControl
                  ? () => navigate(`${ROUTES.accessControl}/${ACCESS_CONTROL_PATHS.logs}`)
                  : undefined
              }
              onKeyDown={
                isAccessControl
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') navigate(`${ROUTES.accessControl}/${ACCESS_CONTROL_PATHS.logs}`);
                    }
                  : undefined
              }
              className={cn(
                'rounded-(--radius-md) border border-border-default bg-surface-raised p-3',
                isAccessControl && 'cursor-pointer transition-colors hover:border-primary-500/60 hover:bg-surface-hover',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <StatusBadge tone={alert.severity}>{alert.severity}</StatusBadge>
                  <span className="font-mono text-[11px] text-text-tertiary">{alert.id}</span>
                </div>
                <span className="shrink-0 text-[11px] text-text-tertiary">{alert.timestamp}</span>
              </div>

              <p className="mt-2 text-[13px] text-text-primary">{alert.description}</p>

              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="truncate text-[11px] text-text-tertiary">
                  {alert.module} · {alert.location}
                </p>
                <StatusBadge tone={STATUS_TONE[alert.status]} dot={false} className="shrink-0">
                  {STATUS_LABEL[alert.status]}
                </StatusBadge>
              </div>
            </div>
          );
        })}
      </AppCardContent>
    </AppCard>
  );
}
