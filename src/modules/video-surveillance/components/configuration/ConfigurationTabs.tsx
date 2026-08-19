import { useState } from 'react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { useCameraRegistry } from '@/modules/video-surveillance/hooks/useCameraRegistry';
import type { CameraConfigTab } from '@/modules/video-surveillance/types';
import { AddIpCamPanel } from '@/modules/video-surveillance/components/configuration/AddIpCamPanel';
import {
  FieldGroup,
  ReadOnlyField,
  SelectField,
  SliderField,
  SubTabs,
  TextField,
  ToggleField,
} from '@/modules/video-surveillance/components/configuration/FormField';

const TABS: { id: CameraConfigTab; label: string }[] = [
  { id: 'camera', label: 'Camera' },
  { id: 'network', label: 'Network' },
  { id: 'event', label: 'Event' },
  { id: 'storage', label: 'Storage' },
  { id: 'display', label: 'Display' },
  { id: 'account', label: 'Account' },
  { id: 'system', label: 'System' },
  { id: 'info', label: 'Info' },
  { id: 'security', label: 'Security' },
];

const CHANNELS = Array.from({ length: 8 }, (_, i) => i + 1);

type CameraSubTab = 'add-ip-cam' | 'image' | 'overlay' | 'encode' | 'camera-name';

const CAMERA_SUB_TABS: { id: CameraSubTab; label: string }[] = [
  { id: 'add-ip-cam', label: 'Add IP Cam' },
  { id: 'image', label: 'Image' },
  { id: 'overlay', label: 'Overlay' },
  { id: 'encode', label: 'Encode' },
  { id: 'camera-name', label: 'Camera Name' },
];

export interface ConfigurationTabsProps {
  cameraId: string;
}

export function ConfigurationTabs({ cameraId }: ConfigurationTabsProps) {
  const [tab, setTab] = useState<CameraConfigTab>('camera');
  const [cameraSubTab, setCameraSubTab] = useState<CameraSubTab>('add-ip-cam');
  const imageChannel = 'D1';
  const { cameras } = useCameraRegistry();
  const camera = cameras.find((c) => c.id === cameraId) ?? cameras[0];

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

      <AppCardContent className="space-y-5">
        {tab === 'camera' && (
          <div className="space-y-4">
            <ReadOnlyField label="NVR Device" value="CP-UNR-108F1" hint="Single-NVR deployment — device is fixed, not selectable" />
            <SubTabs tabs={CAMERA_SUB_TABS} active={cameraSubTab} onChange={setCameraSubTab} />

            {cameraSubTab === 'add-ip-cam' && <AddIpCamPanel />}

            {cameraSubTab === 'image' && (
              <div className="space-y-4">
                <SelectField
                  label="Channel"
                  options={CHANNELS.map((c) => `D${c}`)}
                  defaultValue={imageChannel}
                  hint="Image settings apply per channel"
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <SliderField label="Brightness" defaultValue={50} />
                  <SliderField label="Contrast" defaultValue={50} />
                  <SliderField label="Saturation" defaultValue={50} />
                  <SliderField label="Sharpness" defaultValue={50} />
                  <SliderField label="Gamma" defaultValue={50} />
                  <SelectField label="Backlight Mode" options={['Off', 'BLC', 'WDR', 'HLC']} />
                  <SelectField label="Day/Night Mode" options={['Auto', 'Day', 'Night', 'Sensor']} />
                  <SelectField label="Flip" options={['Normal', '90°', '180°', '270°']} />
                  <ToggleField label="Mirror" hint="Enable/Disable horizontal mirroring" />
                </div>
              </div>
            )}

            {cameraSubTab === 'overlay' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ToggleField label="Time Title" defaultChecked hint="Overlays date/time on the video feed" />
                <SelectField
                  label="Time Format"
                  options={['YYYY-MM-DD HH:mm:ss', 'MM/DD/YYYY HH:mm:ss', 'DD/MM/YYYY HH:mm:ss']}
                />
                <ToggleField label="Channel Title" defaultChecked hint="Overlays the channel name on the video feed" />
                <TextField label="Channel Title Text" defaultValue="Channel 01" />
              </div>
            )}

            {cameraSubTab === 'encode' && (
              <div className="space-y-6">
                <FieldGroup title="Main Stream">
                  <SelectField label="Compression" options={['H.265', 'H.264']} />
                  <SelectField label="Resolution" options={['1920×1080 (1080P)', '1280×720 (720P)', '704×576 (D1)']} />
                  <SelectField label="Frame Rate" options={['25 fps', '30 fps', '15 fps', '12 fps']} />
                  <SelectField label="Bit Rate Type" options={['CBR', 'VBR']} />
                  <SelectField label="Quality" options={['Highest', 'Higher', 'High', 'Medium', 'Low']} />
                  <TextField label="I-Frame Interval" defaultValue="50" />
                  <TextField label="Bit Rate (Kb/s)" defaultValue="4096" />
                </FieldGroup>
                <FieldGroup title="Sub Stream">
                  <SelectField label="Compression" options={['H.264', 'H.265']} />
                  <SelectField label="Resolution" options={['704×576 (D1)', '640×360 (CIF)']} />
                  <SelectField label="Frame Rate" options={['15 fps', '25 fps']} />
                  <SelectField label="Bit Rate Type" options={['CBR', 'VBR']} />
                  <SelectField label="Quality" options={['Highest', 'Higher', 'High', 'Medium', 'Low']} />
                  <TextField label="I-Frame Interval" defaultValue="50" />
                  <TextField label="Bit Rate (Kb/s)" defaultValue="512" />
                </FieldGroup>
              </div>
            )}

            {cameraSubTab === 'camera-name' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CHANNELS.map((ch) => (
                  <TextField key={ch} label={`Channel ${ch}`} defaultValue={`Camera ${String(ch).padStart(2, '0')}`} />
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'network' && (
          <div className="space-y-6">
            <p className="text-[11.5px] text-text-tertiary">
              Network configuration is owned by the physical NVR. Values below are read-only summaries.
            </p>
            <FieldGroup title="TCP/IP">
              <ReadOnlyField label="IP Address" value="Managed on NVR" />
              <ReadOnlyField label="Subnet Mask" value="Managed on NVR" />
              <ReadOnlyField label="Default Gateway" value="Managed on NVR" />
              <ReadOnlyField label="MTU" value="Managed on NVR" />
            </FieldGroup>
            <FieldGroup title="Connection">
              <ReadOnlyField label="Max Connections" value="Managed on NVR" />
              <ReadOnlyField label="ONVIF Port" value="Managed on NVR" />
              <ReadOnlyField label="RTSP Port" value="Managed on NVR" />
              <ReadOnlyField label="HTTP Port" value="Managed on NVR" />
            </FieldGroup>
            <FieldGroup title="Wi-Fi">
              <ReadOnlyField label="Wi-Fi Status" value="Managed on NVR" />
              <ReadOnlyField label="SSID" value="Managed on NVR" />
            </FieldGroup>
            <FieldGroup title="Email">
              <ReadOnlyField label="SMTP Server" value="Managed on NVR" />
              <ReadOnlyField label="Sender Address" value="Managed on NVR" />
            </FieldGroup>
            <FieldGroup title="SNMP">
              <ReadOnlyField label="SNMP Status" value="Managed on NVR" />
              <ReadOnlyField label="SNMP Version" value="Managed on NVR" />
            </FieldGroup>
            <FieldGroup title="Auto Connect">
              <ReadOnlyField label="P2P Status" value="Managed on NVR" />
              <ReadOnlyField label="Device ID" value="Managed on NVR" />
            </FieldGroup>
            <FieldGroup title="InstaOn Cloud">
              <ReadOnlyField label="Cloud Status" value="Managed on NVR" />
              <ReadOnlyField label="Bound Account" value="Managed on NVR" />
            </FieldGroup>
            <FieldGroup title="HMS">
              <ReadOnlyField label="HMS Status" value="Managed on NVR" />
              <ReadOnlyField label="Server Address" value="Managed on NVR" />
            </FieldGroup>
          </div>
        )}

        {tab === 'event' && (
          <div className="space-y-6">
            <FieldGroup title="Alarm Info">
              <ReadOnlyField label="Local Alarm In" value="0 configured" />
              <ReadOnlyField label="Local Alarm Out" value="0 configured" />
            </FieldGroup>
            <FieldGroup title="Alarm Status">
              <ReadOnlyField label="Current Status" value="Normal" />
            </FieldGroup>
            <FieldGroup title="Alarm Input">
              <SelectField label="Input Type" options={['Local', 'Network Alarm', 'IPC Ext', 'IPC Offline']} />
            </FieldGroup>
            <FieldGroup title="Video Detect">
              <ToggleField label="Motion Detect" defaultChecked />
              <ToggleField label="Video Loss" />
              <ToggleField label="Tampering" />
            </FieldGroup>
            <FieldGroup title="Abnormality">
              <ToggleField label="HDD" hint="HDD error / full alerts" defaultChecked />
              <ToggleField label="Network" hint="Network disconnected alerts" defaultChecked />
              <ToggleField label="User" hint="Illegal login alerts" defaultChecked />
              <ToggleField label="Device" hint="Device abnormal alerts" />
            </FieldGroup>
            <FieldGroup title="Disarming">
              <ToggleField label="Disarming Enabled" />
              <TextField label="Disarming Period" defaultValue="Not set" />
            </FieldGroup>
          </div>
        )}

        {tab === 'storage' && (
          <div className="space-y-6">
            <FieldGroup title="Basic">
              <SelectField label="Overwrite Mode" options={['Overwrite Oldest', 'Stop Recording']} />
              <ReadOnlyField label="Total Capacity" value="Managed on NVR" />
            </FieldGroup>
            <FieldGroup title="Schedule">
              <ToggleField label="Record Schedule" defaultChecked />
              <ToggleField label="Snapshot Schedule" defaultChecked />
            </FieldGroup>
            <FieldGroup title="Disk Manager">
              <ReadOnlyField label="Disk 1 Status" value="Normal" />
              <ReadOnlyField label="Disk 1 Capacity" value="Managed on NVR" />
            </FieldGroup>
            <FieldGroup title="Record Mode">
              <SelectField label="Mode" options={['Auto', 'Manual', 'Off']} />
            </FieldGroup>
            <FieldGroup title="Disk Quota">
              <TextField label="Record Quota (%)" defaultValue="80" />
              <TextField label="Snapshot Quota (%)" defaultValue="20" />
            </FieldGroup>
            <FieldGroup title="Disk Check">
              <SelectField label="Detect Type" options={['Key Area Detect', 'Global Detect']} />
              <ReadOnlyField label="Report" value="No report generated" />
            </FieldGroup>
            <FieldGroup title="Rec Estimate">
              <ReadOnlyField label="Estimated Days Remaining" value="Managed on NVR" />
            </FieldGroup>
          </div>
        )}

        {tab === 'display' && (
          <div className="space-y-6">
            <FieldGroup title="Display">
              <SelectField label="Resolution" options={['1920×1080', '1280×1024']} />
              <ToggleField label="Show OSD Time" defaultChecked />
              <ToggleField label="Show Channel Name" defaultChecked />
            </FieldGroup>
            <FieldGroup title="Tour Setting">
              <ToggleField label="Enable Tour" />
              <TextField label="Tour Interval (sec)" defaultValue="5" />
              <SelectField label="Layout" options={['1×1', '2×2', '3×3', '4×4']} />
            </FieldGroup>
          </div>
        )}

        {tab === 'account' && (
          <div className="space-y-6">
            <FieldGroup title="User">
              <ReadOnlyField label="Current User" value="admin (Administrator)" />
            </FieldGroup>
            <FieldGroup title="Group">
              <ReadOnlyField label="Groups" value="Admin, User" />
            </FieldGroup>
            <FieldGroup title="Onvif User">
              <ToggleField label="Onvif Access" />
            </FieldGroup>
            <FieldGroup title="Password Reset">
              <TextField label="Security Email" defaultValue="" hint="Used for password recovery on the NVR" />
            </FieldGroup>
          </div>
        )}

        {tab === 'system' && (
          <div className="space-y-6">
            <FieldGroup title="General — General">
              <SelectField label="Language" options={['English']} />
              <SelectField label="Video Standard" options={['PAL', 'NTSC']} />
            </FieldGroup>
            <FieldGroup title="General — Date & Time">
              <SelectField label="Time Zone" options={['GMT+05:30 Chennai, Kolkata, Mumbai, New Delhi', 'UTC']} />
              <ToggleField label="DST" />
              <TextField label="NTP Server" defaultValue="pool.ntp.org" />
            </FieldGroup>
            <FieldGroup title="General — Holiday">
              <ToggleField label="Holiday Schedule" />
            </FieldGroup>
            <FieldGroup title="Voice — File Manager / Schedule">
              <ReadOnlyField label="Audio Files" value="No audio files configured" />
            </FieldGroup>
            <FieldGroup title="Voice — Broadcast">
              <ToggleField label="Broadcast" />
            </FieldGroup>
          </div>
        )}

        {tab === 'info' && (
          <div className="space-y-6">
            <FieldGroup title="Log">
              <ReadOnlyField label="System Log" value="View on NVR" />
            </FieldGroup>
            <FieldGroup title="System Info — Version">
              <ReadOnlyField label="Firmware Version" value={camera?.firmware ?? 'Managed on NVR'} />
            </FieldGroup>
            <FieldGroup title="System Info — HDD">
              <ReadOnlyField label="HDD Capacity" value="Managed on NVR" />
            </FieldGroup>
            <FieldGroup title="System Info — BPS">
              <ReadOnlyField label="Current Bitrate" value="Managed on NVR" />
            </FieldGroup>
            <FieldGroup title="System Info — HDD Health Detection">
              <ReadOnlyField label="HDD Health" value="Good" />
            </FieldGroup>
            <FieldGroup title="Network — Online User">
              <ReadOnlyField label="Online Users" value="1" />
            </FieldGroup>
            <FieldGroup title="Network — Network Load">
              <ReadOnlyField label="Network Load" value="Managed on NVR" />
            </FieldGroup>
            <FieldGroup title="Network — Network Test">
              <ReadOnlyField label="Last Test Result" value="Not run" />
            </FieldGroup>
            <FieldGroup title="System Maintain — Auto Maintenance">
              <ToggleField label="Auto Maintenance" />
            </FieldGroup>
            <FieldGroup title="System Maintain — Imp/Exp">
              <ReadOnlyField label="Config Import/Export" value="Available on NVR" />
            </FieldGroup>
            <FieldGroup title="System Maintain — Default">
              <ReadOnlyField label="Restore Defaults" value="Available on NVR" />
            </FieldGroup>
            <FieldGroup title="System Maintain — Upgrade">
              <ReadOnlyField label="Firmware Upgrade" value="Available on NVR" />
            </FieldGroup>
          </div>
        )}

        {tab === 'security' && (
          <div className="space-y-6">
            <FieldGroup title="Security Status">
              <ReadOnlyField label="System Security" value="Good" />
            </FieldGroup>
            <FieldGroup title="System Service">
              <ToggleField label="SSH" />
              <ToggleField label="Telnet" />
            </FieldGroup>
            <FieldGroup title="Attack Defense">
              <ToggleField label="Anti-Dos Attack" defaultChecked />
              <ToggleField label="IP Filter" />
            </FieldGroup>
            <FieldGroup title="CA Certificate">
              <ReadOnlyField label="Installed Certificate" value="None" />
            </FieldGroup>
            <FieldGroup title="A/V Encryption">
              <ToggleField label="Stream Encryption" defaultChecked />
            </FieldGroup>
            <FieldGroup title="Security Warning">
              <ToggleField label="Security Warning Notification" defaultChecked />
            </FieldGroup>
          </div>
        )}

        <div className="mt-2 flex justify-end gap-2 border-t border-border-default pt-4">
          <Button variant="outline" size="sm">Discard</Button>
          <Button size="sm">Save Changes</Button>
        </div>
      </AppCardContent>
    </AppCard>
  );
}
