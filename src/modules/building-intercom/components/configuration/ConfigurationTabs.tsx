import { useState } from 'react';
import { RefreshCcw, Save } from 'lucide-react';

import { AppCard, AppCardContent } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { indoorStations, outdoorStations } from '@/modules/building-intercom/mock';
import { OPERATIONAL_STATE_LABEL, OPERATIONAL_STATE_TONE } from '@/modules/building-intercom/components/shared/statusTone';
import { FormField } from '@/modules/building-intercom/components/configuration/FormField';
import type { IntercomConfigTab } from '@/modules/building-intercom/types';

const TABS: { id: IntercomConfigTab; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'network', label: 'Network' },
  { id: 'audio', label: 'Audio' },
  { id: 'video', label: 'Video' },
  { id: 'recording', label: 'Recording' },
  { id: 'users', label: 'Users' },
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
  const [activeTab, setActiveTab] = useState<IntercomConfigTab>('general');
  const allStations = [...indoorStations.map((s) => ({ id: s.id, name: s.stationName, state: s.status })), ...outdoorStations.map((s) => ({ id: s.id, name: s.stationName, state: s.onlineStatus }))];

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
                <Input defaultValue="GTTC Building Intercom Subsystem" />
              </FormField>
              <FormField label="Time Zone">
                <Input defaultValue="Asia/Kolkata (UTC +05:30)" />
              </FormField>
              <FormField label="Default Ring Timeout (sec)">
                <Input type="number" defaultValue={30} />
              </FormField>
              <FormField label="Event Retention (days)">
                <Input type="number" defaultValue={90} />
              </FormField>
            </div>
            <label className="flex items-center gap-2 text-[12.5px] text-text-secondary">
              <Checkbox defaultChecked />
              Enable audit logging for all intercom events
            </label>
            <SaveBar />
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Subsystem Gateway IP">
                <Input defaultValue="10.20.4.1" />
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

        {activeTab === 'audio' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Default Speaker Volume (%)">
                <Input type="number" defaultValue={70} />
              </FormField>
              <FormField label="Default Microphone Gain (%)">
                <Input type="number" defaultValue={65} />
              </FormField>
              <FormField label="Audio Codec">
                <Input defaultValue="G.711 (PCMU)" />
              </FormField>
              <FormField label="Echo Cancellation">
                <label className="flex h-9 items-center gap-2 text-[12.5px] text-text-secondary">
                  <Checkbox defaultChecked />
                  Enabled
                </label>
              </FormField>
            </div>
            <SaveBar />
          </div>
        )}

        {activeTab === 'video' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Video Resolution">
                <Input defaultValue="1920x1080" />
              </FormField>
              <FormField label="Frame Rate (fps)">
                <Input type="number" defaultValue={25} />
              </FormField>
              <FormField label="Bitrate (kbps)">
                <Input type="number" defaultValue={2048} />
              </FormField>
              <FormField label="Night Vision">
                <label className="flex h-9 items-center gap-2 text-[12.5px] text-text-secondary">
                  <Checkbox defaultChecked />
                  Auto Infrared
                </label>
              </FormField>
            </div>
            <SaveBar />
          </div>
        )}

        {activeTab === 'recording' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Record Call Video">
                <label className="flex h-9 items-center gap-2 text-[12.5px] text-text-secondary">
                  <Checkbox defaultChecked />
                  Enabled
                </label>
              </FormField>
              <FormField label="Snapshot on Ring">
                <label className="flex h-9 items-center gap-2 text-[12.5px] text-text-secondary">
                  <Checkbox defaultChecked />
                  Enabled
                </label>
              </FormField>
              <FormField label="Recording Retention (days)">
                <Input type="number" defaultValue={90} />
              </FormField>
              <FormField label="Emergency Call Retention (days)">
                <Input type="number" defaultValue={180} />
              </FormField>
            </div>
            <SaveBar />
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Default Operator Role">
                <Input defaultValue="Security Desk Operator" />
              </FormField>
              <FormField label="Max Concurrent Operators">
                <Input type="number" defaultValue={4} />
              </FormField>
            </div>
            <label className="flex items-center gap-2 text-[12.5px] text-text-secondary">
              <Checkbox defaultChecked />
              Require operator confirmation for remote unlock
            </label>
            <SaveBar />
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Scheduled Maintenance Window">
                <Input defaultValue="Sunday 02:00 – 04:00" />
              </FormField>
              <FormField label="Auto-restart Unresponsive Stations" hint="Attempts a soft reset after 3 missed heartbeats">
                <label className="flex h-9 items-center gap-2 text-[12.5px] text-text-secondary">
                  <Checkbox defaultChecked />
                  Enabled
                </label>
              </FormField>
            </div>
            <ul className="divide-y divide-border-default rounded-(--radius-md) border border-border-default">
              {allStations.slice(0, 6).map((station) => (
                <li key={station.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <p className="truncate text-[13px] font-medium text-text-primary">{station.name}</p>
                  <StatusBadge tone={OPERATIONAL_STATE_TONE[station.state]}>{OPERATIONAL_STATE_LABEL[station.state]}</StatusBadge>
                </li>
              ))}
            </ul>
            <SaveBar />
          </div>
        )}

        {activeTab === 'diagnostics' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-(--radius-md) border border-border-default bg-surface-raised p-3">
                <p className="text-[11px] text-text-tertiary">Stations Online</p>
                <p className="mt-1 text-lg font-semibold text-text-primary">
                  {allStations.filter((s) => s.state === 'online').length}/{allStations.length}
                </p>
              </div>
              <div className="rounded-(--radius-md) border border-border-default bg-surface-raised p-3">
                <p className="text-[11px] text-text-tertiary">Avg. Call Setup Latency</p>
                <p className="mt-1 text-lg font-semibold text-text-primary">240 ms</p>
              </div>
              <div className="rounded-(--radius-md) border border-border-default bg-surface-raised p-3">
                <p className="text-[11px] text-text-tertiary">Last Full Sync</p>
                <p className="mt-1 text-lg font-semibold text-text-primary">4 min ago</p>
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
