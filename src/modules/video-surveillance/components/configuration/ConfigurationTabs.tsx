import { useState } from 'react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { cameraRecords } from '@/modules/video-surveillance/mock';
import type { CameraConfigTab } from '@/modules/video-surveillance/types';
import { SelectField, TextField, ToggleField } from '@/modules/video-surveillance/components/configuration/FormField';

const TABS: { id: CameraConfigTab; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'network', label: 'Network' },
  { id: 'video', label: 'Video' },
  { id: 'audio', label: 'Audio' },
  { id: 'ai', label: 'AI' },
  { id: 'recording', label: 'Recording' },
  { id: 'storage', label: 'Storage' },
  { id: 'maintenance', label: 'Maintenance' },
];

export interface ConfigurationTabsProps {
  cameraId: string;
}

export function ConfigurationTabs({ cameraId }: ConfigurationTabsProps) {
  const [tab, setTab] = useState<CameraConfigTab>('general');
  const camera = cameraRecords.find((c) => c.id === cameraId) ?? cameraRecords[0];

  return (
    <AppCard>
      <AppCardHeader className="flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <AppCardTitle>Camera Configuration — {camera?.name}</AppCardTitle>
        <div className="flex flex-wrap gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'rounded-(--radius-sm) px-2.5 py-1.5 text-[11.5px] font-medium transition-colors',
                tab === t.id ? 'bg-primary-500/12 text-primary-300' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </AppCardHeader>

      <AppCardContent>
        {tab === 'general' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Camera Name" defaultValue={camera?.name} />
            <TextField label="Location" defaultValue={camera?.location} />
            <TextField label="Building" defaultValue={camera?.building} />
            <TextField label="Floor" defaultValue={camera?.floor} />
            <SelectField label="Camera Group" options={['Perimeter', 'Admin Block', 'Parking', 'Library Block', 'Cafeteria', 'Hostel', 'Sports Complex', 'Auditorium']} defaultValue={camera?.group} />
            <SelectField label="NVR Assignment" options={['NVR-01', 'NVR-02', 'NVR-03', 'NVR-04', 'NVR-05']} defaultValue={camera?.nvr} />
          </div>
        )}

        {tab === 'network' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="IP Address" defaultValue={camera?.ipAddress} />
            <TextField label="Subnet Mask" defaultValue="255.255.255.0" />
            <TextField label="Gateway" defaultValue="10.10.2.1" />
            <TextField label="RTSP Port" defaultValue="554" />
            <TextField label="HTTP Port" defaultValue="80" />
            <SelectField label="Protocol" options={['ONVIF', 'RTSP', 'Proprietary SDK']} />
          </div>
        )}

        {tab === 'video' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Resolution" options={['4K (3840×2160)', '1080p (1920×1080)', '720p (1280×720)']} defaultValue={
              camera?.resolution === '4K' ? '4K (3840×2160)' : camera?.resolution === '1080p' ? '1080p (1920×1080)' : '720p (1280×720)'
            } />
            <SelectField label="Frame Rate" options={['15 fps', '25 fps', '30 fps', '60 fps']} defaultValue="25 fps" />
            <SelectField label="Encoding" options={['H.265', 'H.264', 'MJPEG']} />
            <SelectField label="Bitrate Mode" options={['Variable (VBR)', 'Constant (CBR)']} />
            <TextField label="Bitrate (Mbps)" defaultValue="8" />
            <ToggleField label="Wide Dynamic Range (WDR)" defaultChecked hint="Improves visibility in high-contrast scenes" />
          </div>
        )}

        {tab === 'audio' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ToggleField label="Enable Audio Recording" hint="Records synchronised audio alongside video" />
            <ToggleField label="Two-Way Audio" hint="Enables operator talk-back through camera speaker" />
            <SelectField label="Audio Codec" options={['AAC', 'G.711', 'G.726']} />
            <TextField label="Input Gain" defaultValue="70" />
          </div>
        )}

        {tab === 'ai' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ToggleField label="Enable AI Analytics" defaultChecked={camera?.aiEnabled} hint="Runs edge inference for this camera" />
            <SelectField label="Inference Node" options={['EDGE-01', 'EDGE-02', 'EDGE-03']} />
            <ToggleField label="Person Detection" defaultChecked={camera?.aiEnabled} />
            <ToggleField label="Vehicle Detection" />
            <ToggleField label="Intrusion Detection" />
            <ToggleField label="Line Crossing" />
          </div>
        )}

        {tab === 'recording' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Recording Mode" options={['Continuous', 'Motion Only', 'AI Triggered', 'Scheduled']} />
            <TextField label="Pre-Record Buffer (sec)" defaultValue="5" />
            <TextField label="Post-Record Buffer (sec)" defaultValue="10" />
            <ToggleField label="Recording Enabled" defaultChecked={camera?.recording} />
          </div>
        )}

        {tab === 'storage' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Primary Storage" options={['NVR (Local)', 'Network Storage', 'Cloud Archive']} />
            <TextField label="Retention Period (days)" defaultValue="30" />
            <ToggleField label="Overwrite When Full" defaultChecked />
            <ToggleField label="Mirror to Archive" />
          </div>
        )}

        {tab === 'maintenance' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Firmware Version" defaultValue={camera?.firmware} />
            <SelectField label="Update Schedule" options={['Manual', 'Weekly', 'Monthly']} />
            <ToggleField label="Auto-Reboot Nightly" hint="Reboots camera during a scheduled low-traffic window" />
            <ToggleField label="Health Alerts" defaultChecked />
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2 border-t border-border-default pt-4">
          <Button variant="outline" size="sm">Discard</Button>
          <Button size="sm">Save Changes</Button>
        </div>
      </AppCardContent>
    </AppCard>
  );
}
