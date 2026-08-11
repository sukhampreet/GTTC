import type { AvailabilityTrendPoint, CameraHealthRecord, HealthDistributionSlice } from '@/modules/video-surveillance/types';
import { cameraRecords } from '@/modules/video-surveillance/mock/cameras';

function healthState(status: (typeof cameraRecords)[number]['status'], health: (typeof cameraRecords)[number]['health']): CameraHealthRecord['state'] {
  if (status === 'offline') return 'offline';
  if (health === 'danger') return 'critical';
  if (health === 'warning') return 'warning';
  return 'healthy';
}

export const cameraHealthRecords: CameraHealthRecord[] = cameraRecords.map((camera, index) => {
  const state = healthState(camera.status, camera.health);
  const baseCpu = state === 'offline' ? 0 : state === 'critical' ? 88 : state === 'warning' ? 71 : 34;
  const baseMem = state === 'offline' ? 0 : state === 'critical' ? 91 : state === 'warning' ? 74 : 41;
  return {
    id: `HLT-${camera.id}`,
    cameraId: camera.id,
    cameraName: camera.name,
    state,
    cpuPct: Math.min(99, baseCpu + (index % 5) * 2),
    memoryPct: Math.min(99, baseMem + (index % 4) * 2),
    bitrateMbps: state === 'offline' ? 0 : Number((4 + (index % 6) * 1.4).toFixed(1)),
    bandwidthMbps: state === 'offline' ? 0 : Number((8 + (index % 7) * 2.1).toFixed(1)),
    storageHealthPct: state === 'critical' ? 52 : state === 'warning' ? 78 : 96,
    uptimeDays: state === 'offline' ? 0 : 12 + (index % 40),
  };
});

export const healthDistribution: HealthDistributionSlice[] = [
  { name: 'Healthy', value: cameraHealthRecords.filter((h) => h.state === 'healthy').length, tone: 'success' },
  { name: 'Warning', value: cameraHealthRecords.filter((h) => h.state === 'warning').length, tone: 'warning' },
  { name: 'Critical', value: cameraHealthRecords.filter((h) => h.state === 'critical').length, tone: 'danger' },
  { name: 'Offline', value: cameraHealthRecords.filter((h) => h.state === 'offline').length, tone: 'neutral' },
];

export const availabilityTrend: AvailabilityTrendPoint[] = [
  { label: '00:00', online: 22, offline: 2 },
  { label: '04:00', online: 21, offline: 3 },
  { label: '08:00', online: 23, offline: 1 },
  { label: '12:00', online: 22, offline: 2 },
  { label: '16:00', online: 21, offline: 3 },
  { label: '20:00', online: 22, offline: 2 },
  { label: 'Now', online: 19, offline: 2 },
];

export const offlineTrend: AvailabilityTrendPoint[] = [
  { label: 'Mon', online: 22, offline: 2 },
  { label: 'Tue', online: 23, offline: 1 },
  { label: 'Wed', online: 21, offline: 3 },
  { label: 'Thu', online: 22, offline: 2 },
  { label: 'Fri', online: 20, offline: 4 },
  { label: 'Sat', online: 23, offline: 1 },
  { label: 'Sun', online: 19, offline: 2 },
];
