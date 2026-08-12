import { devices } from '@/modules/device-management/mock/devices';
import type { NetworkDeviceRecord } from '@/modules/device-management/types';

function bandwidthFor(status: string, seed: number) {
  if (status === 'offline') return 0;
  return 12 + (seed % 88);
}

export const networkDevices: NetworkDeviceRecord[] = devices.map((device, index) => ({
  id: `NET-${device.id.split('-')[1]}`,
  device: device.name,
  ipAddress: device.ipAddress,
  macAddress: device.macAddress,
  deviceType: device.deviceType,
  status: device.status,
  bandwidthMbps: bandwidthFor(device.status, index * 9 + 4),
  latencyMs: device.status === 'offline' ? 0 : 6 + ((index * 3) % 40),
  lastSeen: device.lastSeen,
}));
