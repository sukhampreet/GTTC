import { Archive, Disc, HardDrive, ShieldCheck } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatCard } from '@/components/data/StatCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { cameraRecords, recordingPolicies, recordingStorage } from '@/modules/video-surveillance/mock';
import { titleCase } from '@/modules/video-surveillance/components/shared/statusTone';

const BAR_TONE: Record<string, string> = {
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
  info: 'bg-info-500',
  neutral: 'bg-text-tertiary',
};

export function RecordingOverview() {
  const activePolicies = recordingPolicies.filter((p) => p.status === 'active').length;
  const recordingCount = cameraRecords.filter((c) => c.recording).length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Storage Used" value={`${recordingStorage[0].usedPct}%`} icon={HardDrive} tone="warning" hint={recordingStorage[0].used} />
        <StatCard label="Active Policies" value={activePolicies} icon={ShieldCheck} tone="success" />
        <StatCard label="Recording Cameras" value={`${recordingCount} / ${cameraRecords.length}`} icon={Disc} tone="info" />
        <StatCard label="Archive Status" value="Synced" icon={Archive} tone="success" hint="Last sync 4 min ago" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Storage Breakdown</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="space-y-4">
            {recordingStorage.map((s) => (
              <div key={s.id}>
                <div className="mb-1 flex items-center justify-between text-[12px]">
                  <span className="text-text-secondary">{s.label}</span>
                  <span className="font-medium text-text-primary">{s.used} / {s.total}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
                  <div className={cn('h-full rounded-full', BAR_TONE[s.tone])} style={{ width: `${s.usedPct}%` }} />
                </div>
              </div>
            ))}
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Recording Policies</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="p-0">
            <ul className="divide-y divide-border-default">
              {recordingPolicies.map((policy) => (
                <li key={policy.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-medium text-text-primary">{policy.name}</p>
                    <p className="truncate text-[11px] text-text-tertiary">
                      {policy.scope} · {titleCase(policy.mode)} · {policy.retentionDays}d retention
                    </p>
                  </div>
                  <StatusBadge tone={policy.status === 'active' ? 'success' : 'neutral'}>{titleCase(policy.status)}</StatusBadge>
                </li>
              ))}
            </ul>
          </AppCardContent>
        </AppCard>
      </div>
    </div>
  );
}
