import { devices } from '@/modules/device-management/mock/devices';
import type { DiagnosticRecord } from '@/modules/device-management/types';

function latencyFor(status: string, seed: number) {
  if (status === 'offline') return 0;
  if (status === 'warning') return 80 + (seed % 60);
  return 8 + (seed % 20);
}

function packetLossFor(status: string, seed: number) {
  if (status === 'offline') return 100;
  if (status === 'warning') return 2 + (seed % 5);
  return Number(((seed % 10) / 10).toFixed(1));
}

export const diagnostics: DiagnosticRecord[] = devices.map((device, index) => ({
  id: `DIAG-${device.id.split('-')[1]}`,
  device: device.name,
  connectionStatus: device.status,
  latencyMs: latencyFor(device.status, index * 7 + 3),
  packetLossPct: packetLossFor(device.status, index * 5 + 1),
  cpuPct: device.cpuPct,
  memoryPct: device.memoryPct,
  storagePct: device.storagePct,
  lastCommunication: device.lastSeen,
}));
