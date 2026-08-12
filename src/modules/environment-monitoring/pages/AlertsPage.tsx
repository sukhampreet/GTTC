import { useMemo, useState } from 'react';

import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { FilterBar } from '@/components/data/FilterBar';
import { environmentAlerts } from '@/modules/environment-monitoring/mock';
import { AlertsTable } from '@/modules/environment-monitoring/components/alerts/AlertsTable';
import { titleCase } from '@/modules/environment-monitoring/components/shared/statusTone';
import type { AlertSeverity, AlertStatus } from '@/modules/environment-monitoring/types';

const SEVERITIES: Array<AlertSeverity | 'all'> = ['all', 'critical', 'high', 'medium', 'low'];
const STATUSES: Array<AlertStatus | 'all'> = ['all', 'active', 'acknowledged', 'resolved'];

export function AlertsPage() {
  const [severity, setSeverity] = useState<AlertSeverity | 'all'>('all');
  const [status, setStatus] = useState<AlertStatus | 'all'>('all');

  const filtered = useMemo(
    () =>
      environmentAlerts.filter((alert) => {
        const matchesSeverity = severity === 'all' || alert.severity === severity;
        const matchesStatus = status === 'all' || alert.status === status;
        return matchesSeverity && matchesStatus;
      }),
    [severity, status],
  );

  return (
    <div>
      <PageHeader title="Alerts" description="Every environment alert raised across temperature, air quality, occupancy, energy and HVAC systems." />

      <FilterBar className="mb-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[11px] uppercase tracking-wide text-text-tertiary">Severity</span>
          {SEVERITIES.map((s) => (
            <Button key={s} size="sm" variant={severity === s ? 'primary' : 'outline'} onClick={() => setSeverity(s)}>
              {s === 'all' ? 'All' : titleCase(s)}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[11px] uppercase tracking-wide text-text-tertiary">Status</span>
          {STATUSES.map((s) => (
            <Button key={s} size="sm" variant={status === s ? 'primary' : 'outline'} onClick={() => setStatus(s)}>
              {s === 'all' ? 'All' : titleCase(s)}
            </Button>
          ))}
        </div>
      </FilterBar>

      <AlertsTable alerts={filtered} />
    </div>
  );
}
