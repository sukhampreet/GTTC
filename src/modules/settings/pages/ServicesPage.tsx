import { Boxes } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { AppCard, AppCardContent } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/data/StatCard';
import { serviceStatusRecords } from '@/modules/settings/mock';
import { SYSTEM_STATUS_LABEL, SYSTEM_STATUS_TONE } from '@/modules/settings/components/shared/statusTone';

export function ServicesPage() {
  const online = serviceStatusRecords.filter((s) => s.state === 'online').length;

  return (
    <div>
      <PageHeader
        title="Docker / Services"
        description="Monitoring view of the platform's Docker service stack. Read-only — services cannot be started, stopped or restarted from here."
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total Services" value={serviceStatusRecords.length} icon={Boxes} tone="neutral" />
        <StatCard label="Healthy" value={online} icon={Boxes} tone="success" />
        <StatCard label="Needs Attention" value={serviceStatusRecords.length - online} icon={Boxes} tone="warning" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {serviceStatusRecords.map((s) => (
          <AppCard key={s.id}>
            <AppCardContent className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono text-[13px] font-semibold text-text-primary">{s.name}</p>
                  <p className="text-[11px] text-text-tertiary">{s.description}</p>
                </div>
                <StatusBadge tone={SYSTEM_STATUS_TONE[s.state]}>{SYSTEM_STATUS_LABEL[s.state]}</StatusBadge>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-(--radius-sm) bg-surface-hover px-2 py-1.5">
                  <p className="text-[10px] text-text-tertiary">Uptime</p>
                  <p className="text-[12px] font-medium text-text-primary">{s.uptime}</p>
                </div>
                <div className="rounded-(--radius-sm) bg-surface-hover px-2 py-1.5">
                  <p className="text-[10px] text-text-tertiary">CPU</p>
                  <p className="text-[12px] font-medium text-text-primary">{s.cpuPct}%</p>
                </div>
                <div className="rounded-(--radius-sm) bg-surface-hover px-2 py-1.5">
                  <p className="text-[10px] text-text-tertiary">Memory</p>
                  <p className="text-[12px] font-medium text-text-primary">{s.memoryPct}%</p>
                </div>
              </div>
            </AppCardContent>
          </AppCard>
        ))}
      </div>
    </div>
  );
}
