import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { cn } from '@/utils/cn';
import { environmentAlerts } from '@/modules/environment-monitoring/mock';
import { ALERT_SEVERITY_TONE } from '@/modules/environment-monitoring/components/shared/statusTone';
import type { StatusTone } from '@/types/common';

const ICON_BY_TONE: Record<StatusTone, typeof AlertTriangle> = {
  danger: ShieldAlert,
  warning: AlertTriangle,
  info: Info,
  success: Info,
  neutral: Info,
};

const COLOR_BY_TONE: Record<StatusTone, string> = {
  danger: 'text-danger-400 bg-danger-bg',
  warning: 'text-warning-400 bg-warning-bg',
  info: 'text-info-400 bg-info-bg',
  success: 'text-success-400 bg-success-bg',
  neutral: 'text-text-secondary bg-surface-hover',
};

export function AlertsPanel() {
  const alerts = environmentAlerts.slice(0, 6);

  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Recent Alerts</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="p-0">
        <ul className="divide-y divide-border-default">
          {alerts.map((alert) => {
            const tone = ALERT_SEVERITY_TONE[alert.severity];
            const Icon = ICON_BY_TONE[tone];
            return (
              <li key={alert.id} className="flex items-start gap-3 px-4 py-2.5">
                <div className={cn('mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-(--radius-md)', COLOR_BY_TONE[tone])}>
                  <Icon className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-text-primary">{alert.type}</p>
                  <p className="truncate text-[11px] text-text-tertiary">{alert.location} — {alert.sensor}</p>
                </div>
                <span className="shrink-0 text-[11px] text-text-tertiary">{alert.timestamp.split(' · ')[1] ?? alert.timestamp}</span>
              </li>
            );
          })}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
