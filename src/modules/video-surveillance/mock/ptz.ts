import type { PtzPatrol, PtzPreset } from '@/modules/video-surveillance/types';
import { cameraRecords } from '@/modules/video-surveillance/mock/cameras';

export const ptzCameras = cameraRecords.filter((c) => c.hasPtz);

export const ptzPresets: PtzPreset[] = [
  { id: 'PST-01', name: 'Gate Wide Shot', camera: 'CAM-001 Main Gate Entry' },
  { id: 'PST-02', name: 'License Plate Zoom', camera: 'CAM-001 Main Gate Entry' },
  { id: 'PST-03', name: 'North Fence Line', camera: 'CAM-041 Perimeter North' },
  { id: 'PST-04', name: 'South Fence Line', camera: 'CAM-042 Perimeter South' },
  { id: 'PST-05', name: 'East Watchtower', camera: 'CAM-043 Perimeter East' },
  { id: 'PST-06', name: 'Stage Overview', camera: 'CAM-061 Auditorium Main Hall' },
];

export const ptzPatrols: PtzPatrol[] = [
  { id: 'PAT-01', name: 'Perimeter Sweep', camera: 'CAM-042 Perimeter South', presetCount: 4, intervalSec: 45, active: true },
  { id: 'PAT-02', name: 'Gate Watch', camera: 'CAM-001 Main Gate Entry', presetCount: 2, intervalSec: 30, active: true },
  { id: 'PAT-03', name: 'Auditorium Scan', camera: 'CAM-061 Auditorium Main Hall', presetCount: 3, intervalSec: 60, active: false },
];
