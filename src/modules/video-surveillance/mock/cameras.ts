import type { CameraRecord } from '@/modules/video-surveillance/types';
import { REAL_CAMERA_ID } from '@/config/api';

export const cameraRecords: CameraRecord[] = [
  // Real, backend-integrated CP PLUS camera (Stage 2). Kept first so it's
  // visible in the default 9-up grid. `status` here is just the inventory
  // default the tile starts with — LiveCameraPlayer drives the live badge.
  {
    id: REAL_CAMERA_ID,
    name: 'CP PLUS Camera 01',
    // NVR IP is intentionally not hardcoded here (see API_CONTRACT.md — the
    // frontend must never contain the NVR address); it's backend-managed.
    ipAddress: 'Managed by backend',
    status: 'online',
    recording: false,
    aiEnabled: false,
    resolution: '1080p',
    location: 'Channel 1',
    building: 'CP PLUS NVR',
    floor: '—',
    firmware: 'CP-UNR-108F1',
    lastSeen: 'Live',
    health: 'success',
    nvr: 'CP-UNR-108F1',
    streamQuality: 'Good',
    group: 'CP PLUS (Live)',
    hasPtz: false,
    liveCameraId: REAL_CAMERA_ID,
  },
  // Channels 2-8: real slots on the same 8-channel CP-UNR-108F1 / 8-port PoE
  // switch, but no camera is physically connected to them yet. Names match
  // the NVR's actual on-screen channel titles (channel 2 was renamed
  // "front"; 3-8 are still factory defaults).
  { id: 'CAM-CH02', name: 'front', ipAddress: '—', status: 'offline', recording: false, aiEnabled: false, resolution: '1080p', location: 'Channel 2', building: 'CP PLUS NVR', floor: '—', firmware: '—', lastSeen: '—', health: 'neutral', nvr: 'CP-UNR-108F1', streamQuality: 'Poor', group: 'CP PLUS NVR', hasPtz: false },
  { id: 'CAM-CH03', name: 'Channel3', ipAddress: '—', status: 'offline', recording: false, aiEnabled: false, resolution: '1080p', location: 'Channel 3', building: 'CP PLUS NVR', floor: '—', firmware: '—', lastSeen: '—', health: 'neutral', nvr: 'CP-UNR-108F1', streamQuality: 'Poor', group: 'CP PLUS NVR', hasPtz: false },
  { id: 'CAM-CH04', name: 'Channel4', ipAddress: '—', status: 'offline', recording: false, aiEnabled: false, resolution: '1080p', location: 'Channel 4', building: 'CP PLUS NVR', floor: '—', firmware: '—', lastSeen: '—', health: 'neutral', nvr: 'CP-UNR-108F1', streamQuality: 'Poor', group: 'CP PLUS NVR', hasPtz: false },
  { id: 'CAM-CH05', name: 'Channel5', ipAddress: '—', status: 'offline', recording: false, aiEnabled: false, resolution: '1080p', location: 'Channel 5', building: 'CP PLUS NVR', floor: '—', firmware: '—', lastSeen: '—', health: 'neutral', nvr: 'CP-UNR-108F1', streamQuality: 'Poor', group: 'CP PLUS NVR', hasPtz: false },
  { id: 'CAM-CH06', name: 'Channel6', ipAddress: '—', status: 'offline', recording: false, aiEnabled: false, resolution: '1080p', location: 'Channel 6', building: 'CP PLUS NVR', floor: '—', firmware: '—', lastSeen: '—', health: 'neutral', nvr: 'CP-UNR-108F1', streamQuality: 'Poor', group: 'CP PLUS NVR', hasPtz: false },
  { id: 'CAM-CH07', name: 'Channel7', ipAddress: '—', status: 'offline', recording: false, aiEnabled: false, resolution: '1080p', location: 'Channel 7', building: 'CP PLUS NVR', floor: '—', firmware: '—', lastSeen: '—', health: 'neutral', nvr: 'CP-UNR-108F1', streamQuality: 'Poor', group: 'CP PLUS NVR', hasPtz: false },
  { id: 'CAM-CH08', name: 'Channel8', ipAddress: '—', status: 'offline', recording: false, aiEnabled: false, resolution: '1080p', location: 'Channel 8', building: 'CP PLUS NVR', floor: '—', firmware: '—', lastSeen: '—', health: 'neutral', nvr: 'CP-UNR-108F1', streamQuality: 'Poor', group: 'CP PLUS NVR', hasPtz: false },
];
