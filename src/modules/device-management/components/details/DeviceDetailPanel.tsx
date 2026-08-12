import { useMemo, useState } from 'react';
import { Cpu, MemoryStick, Thermometer, HardDrive as StorageIcon, SignalHigh } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SearchBar } from '@/components/data/SearchBar';
import { cn } from '@/utils/cn';
import { DEVICE_HEALTH_TONE, DEVICE_STATUS_TONE, titleCase } from '@/modules/device-management/components/shared/statusTone';
import { devices } from '@/modules/device-management/mock/devices';
import { deviceEvents } from '@/modules/device-management/mock/deviceEvents';

function MetricBar({ icon: Icon, label, value, unit = '%' }: { icon: typeof Cpu; label: string; value: number; unit?: string }) {
  const tone = value >= 85 ? 'bg-danger-500' : value >= 65 ? 'bg-warning-500' : 'bg-success-500';
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px] text-text-tertiary">
        <span className="inline-flex items-center gap-1.5">
          <Icon className="size-3.5" /> {label}
        </span>
        <span className="font-mono text-text-secondary">{value}{unit}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
        <div className={cn('h-full rounded-full', tone)} style={{ width: `${Math.min(100, value)}%` }} />
      </div>
    </div>
  );
}

export function DeviceDetailPanel() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(devices[0]?.id ?? '');

  const filteredList = useMemo(() => {
    if (!query.trim()) return devices;
    const q = query.trim().toLowerCase();
    return devices.filter((d) => `${d.name} ${d.id} ${d.location}`.toLowerCase().includes(q));
  }, [query]);

  const device = useMemo(() => devices.find((d) => d.id === selectedId) ?? devices[0], [selectedId]);
  const relatedEvents = useMemo(
    () => deviceEvents.filter((e) => e.device === device?.name).slice(0, 5),
    [device],
  );

  if (!device) return null;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
      <AppCard className="flex flex-col overflow-hidden">
        <div className="border-b border-border-default p-3">
          <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search devices…" />
        </div>
        <div className="max-h-[560px] overflow-y-auto">
          {filteredList.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={cn(
                'flex w-full flex-col items-start gap-0.5 border-b border-border-default px-3 py-2.5 text-left transition-colors last:border-0 hover:bg-surface-hover',
                d.id === device.id && 'bg-primary-500/10',
              )}
            >
              <span className="text-xs font-medium text-text-primary">{d.name}</span>
              <span className="text-[11px] text-text-tertiary">{d.location}</span>
            </button>
          ))}
        </div>
      </AppCard>

      <div className="flex flex-col gap-4">
        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Basic Information</AppCardTitle>
            <div className="flex items-center gap-2">
              <StatusBadge tone={DEVICE_STATUS_TONE[device.status]}>{titleCase(device.status)}</StatusBadge>
              <StatusBadge tone={DEVICE_HEALTH_TONE[device.health]}>{titleCase(device.health)}</StatusBadge>
            </div>
          </AppCardHeader>
          <AppCardContent className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs sm:grid-cols-3">
            <Field label="Device Name" value={device.name} />
            <Field label="Device ID" value={device.id} />
            <Field label="Device Type" value={device.deviceType} />
            <Field label="Module" value={device.module} />
            <Field label="Manufacturer" value={device.manufacturer} />
            <Field label="Model" value={device.model} />
            <Field label="Serial Number" value={device.serialNumber} />
            <Field label="Location" value={device.location} />
          </AppCardContent>
        </AppCard>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AppCard>
            <AppCardHeader><AppCardTitle>Network</AppCardTitle></AppCardHeader>
            <AppCardContent className="grid grid-cols-2 gap-y-3 text-xs">
              <Field label="IP Address" value={device.ipAddress} mono />
              <Field label="MAC Address" value={device.macAddress} mono />
              <Field label="Port" value={device.port ? String(device.port) : '—'} />
              <Field label="Connection" value={titleCase(device.status)} />
            </AppCardContent>
          </AppCard>

          <AppCard>
            <AppCardHeader><AppCardTitle>Firmware</AppCardTitle></AppCardHeader>
            <AppCardContent className="grid grid-cols-2 gap-y-3 text-xs">
              <Field label="Current Version" value={device.firmwareCurrent} />
              <Field label="Latest Version" value={device.firmwareLatest} />
              <Field
                label="Update Status"
                value={device.firmwareCurrent === device.firmwareLatest ? 'Up to date' : 'Update available'}
              />
              <Field label="Last Seen" value={device.lastSeen} />
            </AppCardContent>
          </AppCard>
        </div>

        <AppCard>
          <AppCardHeader><AppCardTitle>Health</AppCardTitle></AppCardHeader>
          <AppCardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MetricBar icon={Cpu} label="CPU" value={device.cpuPct} />
            <MetricBar icon={MemoryStick} label="Memory" value={device.memoryPct} />
            <MetricBar icon={Thermometer} label="Temperature" value={device.temperatureC} unit="°C" />
            <MetricBar icon={StorageIcon} label="Storage" value={device.storagePct} />
            <MetricBar icon={SignalHigh} label="Signal" value={device.signalPct} />
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader><AppCardTitle>Recent Activity</AppCardTitle></AppCardHeader>
          <AppCardContent className="space-y-2.5">
            {relatedEvents.length === 0 ? (
              <p className="text-xs text-text-tertiary">No recent events for this device.</p>
            ) : (
              relatedEvents.map((e) => (
                <div key={e.id} className="flex items-start justify-between gap-3 border-b border-border-default pb-2.5 last:border-0 last:pb-0">
                  <div>
                    <p className="text-xs font-medium text-text-primary">{e.event}</p>
                    <p className="text-[11px] text-text-tertiary">{e.timestamp}</p>
                  </div>
                  <StatusBadge tone={e.severity === 'critical' ? 'danger' : e.severity === 'warning' ? 'warning' : 'info'}>
                    {titleCase(e.severity)}
                  </StatusBadge>
                </div>
              ))
            )}
          </AppCardContent>
        </AppCard>
      </div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-text-tertiary">{label}</p>
      <p className={cn('mt-0.5 text-text-primary', mono && 'font-mono')}>{value}</p>
    </div>
  );
}
