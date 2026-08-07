import { useState } from 'react';
import { RefreshCcw, Save } from 'lucide-react';

import { AppCard, AppCardContent } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { controllerRecords, faceDeviceCount, cardReaderCount } from '@/modules/access-control/mock';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/access-control/components/shared/statusTone';
import { FormField } from '@/modules/access-control/components/deviceConfig/FormField';
import type { DeviceConfigTab } from '@/modules/access-control/types';

const TABS: { id: DeviceConfigTab; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'network', label: 'Network' },
  { id: 'readers', label: 'Readers' },
  { id: 'controllers', label: 'Controllers' },
  { id: 'firmware', label: 'Firmware' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'diagnostics', label: 'Diagnostics' },
];

function SaveBar() {
  return (
    <div className="flex justify-end gap-2 border-t border-border-default pt-4">
      <Button variant="outline" size="sm">
        <RefreshCcw className="size-3.5" />
        Reset
      </Button>
      <Button size="sm">
        <Save className="size-3.5" />
        Save Changes
      </Button>
    </div>
  );
}

export function ConfigurationTabs() {
  const [activeTab, setActiveTab] = useState<DeviceConfigTab>('general');

  return (
    <AppCard>
      <div className="flex flex-wrap gap-1 border-b border-border-default p-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'rounded-(--radius-md) px-3 py-1.5 text-[12.5px] font-medium transition-colors',
              activeTab === tab.id
                ? 'bg-primary-500/12 text-primary-300'
                : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AppCardContent className="space-y-4">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="System Name">
                <Input defaultValue="GTTC Access Control Subsystem" />
              </FormField>
              <FormField label="Time Zone">
                <Input defaultValue="Asia/Kolkata (UTC +05:30)" />
              </FormField>
              <FormField label="Default Access Level">
                <Input defaultValue="Level 1 - General" />
              </FormField>
              <FormField label="Event Retention (days)">
                <Input type="number" defaultValue={90} />
              </FormField>
            </div>
            <label className="flex items-center gap-2 text-[12.5px] text-text-secondary">
              <Checkbox defaultChecked />
              Enable audit logging for all access events
            </label>
            <SaveBar />
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Subsystem Gateway IP">
                <Input defaultValue="10.20.1.1" />
              </FormField>
              <FormField label="Subnet Mask">
                <Input defaultValue="255.255.255.0" />
              </FormField>
              <FormField label="MQTT Broker Endpoint" hint="Provided by the shared emqx broker container">
                <Input defaultValue="mqtt://10.20.0.5:1883" />
              </FormField>
              <FormField label="Heartbeat Interval (sec)">
                <Input type="number" defaultValue={5} />
              </FormField>
            </div>
            <SaveBar />
          </div>
        )}

        {activeTab === 'readers' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Card Readers Registered">
                <Input readOnly value={cardReaderCount} />
              </FormField>
              <FormField label="Face Devices Registered">
                <Input readOnly value={faceDeviceCount} />
              </FormField>
              <FormField label="Default Reader Baud Rate">
                <Input defaultValue="9600" />
              </FormField>
              <FormField label="Face Match Threshold (%)">
                <Input type="number" defaultValue={85} />
              </FormField>
            </div>
            <SaveBar />
          </div>
        )}

        {activeTab === 'controllers' && (
          <div className="space-y-3">
            <ul className="divide-y divide-border-default rounded-(--radius-md) border border-border-default">
              {controllerRecords.map((controller) => (
                <li key={controller.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-text-primary">{controller.name}</p>
                    <p className="truncate text-[11px] text-text-tertiary">
                      {controller.ipAddress} · {controller.building} · {controller.linkedDoors} doors
                    </p>
                  </div>
                  <StatusBadge tone={DEVICE_STATUS_TONE[controller.status]}>
                    {DEVICE_STATUS_LABEL[controller.status]}
                  </StatusBadge>
                </li>
              ))}
            </ul>
            <SaveBar />
          </div>
        )}

        {activeTab === 'firmware' && (
          <div className="space-y-3">
            <ul className="divide-y divide-border-default rounded-(--radius-md) border border-border-default">
              {controllerRecords.map((controller) => (
                <li key={controller.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div>
                    <p className="text-[13px] font-medium text-text-primary">{controller.name}</p>
                    <p className="text-[11px] text-text-tertiary">Current: {controller.firmware}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Check for Update
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Scheduled Maintenance Window">
                <Input defaultValue="Sunday 02:00 – 04:00" />
              </FormField>
              <FormField label="Auto-restart Unresponsive Controllers" hint="Attempts a soft reset after 3 missed heartbeats">
                <label className="flex h-9 items-center gap-2 text-[12.5px] text-text-secondary">
                  <Checkbox defaultChecked />
                  Enabled
                </label>
              </FormField>
            </div>
            <SaveBar />
          </div>
        )}

        {activeTab === 'diagnostics' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-(--radius-md) border border-border-default bg-surface-raised p-3">
                <p className="text-[11px] text-text-tertiary">Controllers Online</p>
                <p className="mt-1 text-lg font-semibold text-text-primary">
                  {controllerRecords.filter((c) => c.status === 'online').length}/{controllerRecords.length}
                </p>
              </div>
              <div className="rounded-(--radius-md) border border-border-default bg-surface-raised p-3">
                <p className="text-[11px] text-text-tertiary">Avg. Heartbeat Latency</p>
                <p className="mt-1 text-lg font-semibold text-text-primary">180 ms</p>
              </div>
              <div className="rounded-(--radius-md) border border-border-default bg-surface-raised p-3">
                <p className="text-[11px] text-text-tertiary">Last Full Sync</p>
                <p className="mt-1 text-lg font-semibold text-text-primary">6 min ago</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCcw className="size-3.5" />
              Run Diagnostics
            </Button>
          </div>
        )}
      </AppCardContent>
    </AppCard>
  );
}
