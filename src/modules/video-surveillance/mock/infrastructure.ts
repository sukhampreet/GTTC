import type { CameraGroup, EdgeDeviceRecord, NvrRecord } from '@/modules/video-surveillance/types';

export const nvrRecords: NvrRecord[] = [
  { id: 'NVR-01', name: 'NVR-01 · Admin Wing', location: 'Admin Block Server Room', status: 'online', linkedCameras: 7, storageUsedPct: 68, raidStatus: 'healthy' },
  { id: 'NVR-02', name: 'NVR-02 · Academic Wing', location: 'Library Block IDF', status: 'online', linkedCameras: 5, storageUsedPct: 74, raidStatus: 'healthy' },
  { id: 'NVR-03', name: 'NVR-03 · Parking', location: 'Parking L1 IDF', status: 'online', linkedCameras: 4, storageUsedPct: 81, raidStatus: 'degraded' },
  { id: 'NVR-04', name: 'NVR-04 · Perimeter', location: 'North Gatehouse', status: 'warning', linkedCameras: 4, storageUsedPct: 59, raidStatus: 'rebuilding' },
  { id: 'NVR-05', name: 'NVR-05 · Hostel & Sports', location: 'Hostel Block A IDF', status: 'online', linkedCameras: 4, storageUsedPct: 45, raidStatus: 'healthy' },
];

export const edgeDeviceRecords: EdgeDeviceRecord[] = [
  { id: 'EDGE-01', name: 'AI Edge Node 1', location: 'Admin Block Server Room', status: 'online', linkedCameras: 8, inferenceLoadPct: 62, model: 'Jetson AGX Orin' },
  { id: 'EDGE-02', name: 'AI Edge Node 2', location: 'North Gatehouse', status: 'online', linkedCameras: 6, inferenceLoadPct: 78, model: 'Jetson AGX Orin' },
  { id: 'EDGE-03', name: 'AI Edge Node 3', location: 'Parking L1 IDF', status: 'warning', linkedCameras: 4, inferenceLoadPct: 91, model: 'Jetson Orin NX' },
];

export const cameraGroups: CameraGroup[] = [
  { id: 'GRP-01', name: 'Perimeter', cameraCount: 6, onlineCount: 5 },
  { id: 'GRP-02', name: 'Admin Block', cameraCount: 6, onlineCount: 6 },
  { id: 'GRP-03', name: 'Parking', cameraCount: 4, onlineCount: 4 },
  { id: 'GRP-04', name: 'Library Block', cameraCount: 2, onlineCount: 1 },
  { id: 'GRP-05', name: 'Cafeteria', cameraCount: 2, onlineCount: 2 },
  { id: 'GRP-06', name: 'Hostel', cameraCount: 2, onlineCount: 1 },
  { id: 'GRP-07', name: 'Sports Complex', cameraCount: 2, onlineCount: 1 },
  { id: 'GRP-08', name: 'Auditorium', cameraCount: 1, onlineCount: 1 },
];
