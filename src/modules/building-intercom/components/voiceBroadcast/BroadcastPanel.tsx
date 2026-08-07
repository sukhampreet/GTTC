import { useState } from 'react';
import { Megaphone, Square } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/building-intercom/components/shared/statusTone';
import type { BroadcastDevice, BroadcastGroup } from '@/modules/building-intercom/types';

export interface BroadcastPanelProps {
  groups: BroadcastGroup[];
  devices: BroadcastDevice[];
}

export function BroadcastPanel({ groups, devices }: BroadcastPanelProps) {
  const [activeGroup, setActiveGroup] = useState(groups[0]?.name ?? '');
  const [selected, setSelected] = useState<Set<string>>(new Set(devices.filter((d) => d.selected).map((d) => d.id)));
  const [message, setMessage] = useState('');
  const [volume, setVolume] = useState(70);
  const [scheduleAt, setScheduleAt] = useState('');
  const [broadcasting, setBroadcasting] = useState(false);

  const groupDevices = devices.filter((d) => d.group === activeGroup);

  function toggleDevice(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Broadcast Groups</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="p-0">
          <ul className="divide-y divide-border-default">
            {groups.map((group) => (
              <li key={group.id}>
                <button
                  onClick={() => setActiveGroup(group.name)}
                  className={cn(
                    'flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left transition-colors',
                    group.name === activeGroup ? 'bg-primary-500/12' : 'hover:bg-surface-hover',
                  )}
                >
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-text-primary">{group.name}</p>
                    <p className="truncate text-[11px] text-text-tertiary">{group.zone}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-text-tertiary">{group.deviceCount} devices</span>
                </button>
              </li>
            ))}
          </ul>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Selected Devices</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="p-0">
          {groupDevices.length === 0 ? (
            <p className="px-4 py-6 text-center text-[12.5px] text-text-tertiary">No devices in this group.</p>
          ) : (
            <ul className="divide-y divide-border-default">
              {groupDevices.map((device) => (
                <li key={device.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <label className="flex min-w-0 items-center gap-2.5">
                    <Checkbox checked={selected.has(device.id)} onChange={() => toggleDevice(device.id)} />
                    <span className="truncate text-[12.5px] text-text-primary">{device.name}</span>
                  </label>
                  <StatusBadge tone={DEVICE_STATUS_TONE[device.status]} className="shrink-0">
                    {DEVICE_STATUS_LABEL[device.status]}
                  </StatusBadge>
                </li>
              ))}
            </ul>
          )}
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Broadcast Message</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="space-y-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-text-secondary">Message</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type the announcement to broadcast…"
              rows={4}
              className="w-full resize-none rounded-(--radius-md) border border-border-strong bg-surface-raised px-3 py-2 text-[13px] text-text-primary placeholder:text-text-tertiary focus:border-primary-500"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-text-secondary">Volume ({volume}%)</span>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-primary-500"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-text-secondary">Schedule (optional)</span>
            <Input type="datetime-local" value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} />
          </label>

          <div className="flex gap-2 border-t border-border-default pt-4">
            {!broadcasting ? (
              <Button size="sm" onClick={() => setBroadcasting(true)} disabled={selected.size === 0 || !message.trim()}>
                <Megaphone className="size-3.5" />
                Start Broadcast
              </Button>
            ) : (
              <Button variant="danger" size="sm" onClick={() => setBroadcasting(false)}>
                <Square className="size-3.5" />
                Stop Broadcast
              </Button>
            )}
            {broadcasting && <StatusBadge tone="info">Broadcasting to {selected.size} devices</StatusBadge>}
          </div>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
