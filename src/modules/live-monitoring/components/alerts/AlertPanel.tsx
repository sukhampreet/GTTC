import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/data/StatCard';
import { AlertTriangle, AlertOctagon, Info, CircleAlert } from 'lucide-react';
import { liveAlerts } from '@/modules/live-monitoring/mock/alerts';
import { ALERT_SEVERITY_TONE } from '@/modules/live-monitoring/components/shared/statusTone';
import type { AlertSeverity } from '@/modules/live-monitoring/types';

const SEVERITY_ICON: Record<AlertSeverity, typeof AlertOctagon> = {
  Critical: AlertOctagon,
  High: AlertTriangle,
  Medium: CircleAlert,
  Low: Info,
};

const SEVERITY_COUNTS: AlertSeverity[] = ['Critical', 'High', 'Medium', 'Low'];

/** Professional alert panel grouped by severity — Critical / High / Medium / Low. */
export function AlertPanel() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SEVERITY_COUNTS.map((severity) => {
          const count = liveAlerts.filter((a) => a.severity === severity).length;
          return (
            <StatCard
              key={severity}
              label={severity}
              value={count}
              icon={SEVERITY_ICON[severity]}
              tone={ALERT_SEVERITY_TONE[severity]}
            />
          );
        })}
      </div>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Alert Feed</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="p-0">
          <ul className="divide-y divide-border-default">
            {liveAlerts.map((alert) => (
              <li key={alert.id} className="flex items-start justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <StatusBadge tone={ALERT_SEVERITY_TONE[alert.severity]}>{alert.severity}</StatusBadge>
                    <span className="font-mono text-[11px] text-text-tertiary">{alert.time}</span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] font-medium text-text-primary">{alert.description}</p>
                  <p className="mt-0.5 text-[11px] text-text-tertiary">{alert.location}</p>
                </div>
                <StatusBadge tone={alert.acknowledged ? 'success' : 'neutral'} className="shrink-0">
                  {alert.acknowledged ? 'Acknowledged' : 'Unacknowledged'}
                </StatusBadge>
              </li>
            ))}
          </ul>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
