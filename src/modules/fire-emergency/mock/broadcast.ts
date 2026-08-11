import type { BroadcastGroup, PaZone } from '@/modules/fire-emergency/types';

export const broadcastGroups: BroadcastGroup[] = [
  { id: 'BG-01', name: 'All Zones', zones: ['Zone A', 'Zone B', 'Zone C', 'Zone D'], deviceCount: 64 },
  { id: 'BG-02', name: 'Evacuation Zones', zones: ['Zone A', 'Zone B'], deviceCount: 32 },
  { id: 'BG-03', name: 'Zone C Only', zones: ['Zone C'], deviceCount: 14 },
  { id: 'BG-04', name: 'Ground Floor Zones', zones: ['Zone A', 'Zone D'], deviceCount: 18 },
];

export const broadcastMessagePresets = [
  'This is an emergency. Please evacuate the building immediately using the nearest exit.',
  'A fire alarm has been triggered. Please remain calm and await further instructions.',
  'This is a scheduled fire drill. Please proceed to your assembly point.',
  'Custom message',
] as const;

export const paZones: PaZone[] = [
  { id: 'PA-Z-A', zoneName: 'Zone A — Block A', speakerCount: 18, speakerStatus: 'online', currentBroadcast: null, emergencyMode: false, health: 'online', volume: 60 },
  { id: 'PA-Z-B', zoneName: 'Zone B — Block B', speakerCount: 14, speakerStatus: 'online', currentBroadcast: null, emergencyMode: false, health: 'online', volume: 55 },
  { id: 'PA-Z-C', zoneName: 'Zone C — Block C', speakerCount: 12, speakerStatus: 'warning', currentBroadcast: 'Smoke Alert — Evacuate Level 2', emergencyMode: true, health: 'warning', volume: 85 },
  { id: 'PA-Z-D', zoneName: 'Zone D — Block D', speakerCount: 9, speakerStatus: 'online', currentBroadcast: null, emergencyMode: false, health: 'online', volume: 50 },
];
