import { cn } from '@/utils/cn';
import { cameraHealthRecords, recordingStorage } from '@/modules/video-surveillance/mock';
import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

const BAR_TONE: Record<'success' | 'warning' | 'danger', string> = {
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
};

function toneFor(pct: number): 'success' | 'warning' | 'danger' {
  if (pct >= 85) return 'danger';
  if (pct >= 65) return 'warning';
  return 'success';
}

function ResourceBar({ label, pct, hint }: { label: string; pct: number; hint?: string }) {
  const tone = toneFor(pct);
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[12px]">
        <span className="text-text-secondary">{label}</span>
        <span className="font-medium text-text-primary">{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
        <div className={cn('h-full rounded-full', BAR_TONE[tone])} style={{ width: `${pct}%` }} />
      </div>
      {hint && <p className="mt-0.5 text-[10.5px] text-text-tertiary">{hint}</p>}
    </div>
  );
}

export function SystemResourcePanel() {
  const avgCpu = average(cameraHealthRecords.map((h) => h.cpuPct));
  const avgMem = average(cameraHealthRecords.map((h) => h.memoryPct));
  const avgBitrate = average(cameraHealthRecords.map((h) => h.bitrateMbps));
  const avgBandwidth = average(cameraHealthRecords.map((h) => h.bandwidthMbps));
  const storage = recordingStorage.find((s) => s.id === 'video-storage');

  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>System Resources</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResourceBar label="Storage Health" pct={storage?.usedPct ?? 0} hint={`${storage?.used} of ${storage?.total}`} />
        <ResourceBar label="Average Bandwidth Utilisation" pct={Math.min(100, avgBandwidth)} hint={`${avgBandwidth} Mbps avg per camera`} />
        <ResourceBar label="Average Bitrate Load" pct={Math.min(100, avgBitrate * 4)} hint={`${avgBitrate} Mbps avg`} />
        <ResourceBar label="Average CPU Utilisation" pct={avgCpu} hint="Across NVR + edge encoders" />
        <ResourceBar label="Average Memory Utilisation" pct={avgMem} hint="Across NVR + edge encoders" />
      </AppCardContent>
    </AppCard>
  );
}
