import type { LightingZone } from '@/modules/environment-monitoring/types';

export const lightingZones: LightingZone[] = [
  { id: 'LT-01', zoneName: 'Block A - Floor 1', building: 'Block A', state: 'on', brightnessPct: 80, energyKw: 3.2, fixtureCount: 42, health: 'online' },
  { id: 'LT-02', zoneName: 'Block A - Floor 2', building: 'Block A', state: 'on', brightnessPct: 65, energyKw: 2.6, fixtureCount: 38, health: 'online' },
  { id: 'LT-03', zoneName: 'Block B - Floor 1', building: 'Block B', state: 'off', brightnessPct: 0, energyKw: 0, fixtureCount: 30, health: 'online' },
  { id: 'LT-04', zoneName: 'Cafeteria', building: 'Block D', state: 'on', brightnessPct: 90, energyKw: 4.1, fixtureCount: 26, health: 'online' },
  { id: 'LT-05', zoneName: 'Server Room', building: 'Block A', state: 'on', brightnessPct: 100, energyKw: 1.4, fixtureCount: 12, health: 'online' },
  { id: 'LT-06', zoneName: 'Block C - Warehouse', building: 'Block C', state: 'on', brightnessPct: 55, energyKw: 5.8, fixtureCount: 48, health: 'warning' },
  { id: 'LT-07', zoneName: 'Conference Center', building: 'Block C', state: 'off', brightnessPct: 0, energyKw: 0, fixtureCount: 20, health: 'online' },
  { id: 'LT-08', zoneName: 'Lobby', building: 'Block A', state: 'on', brightnessPct: 75, energyKw: 1.9, fixtureCount: 18, health: 'online' },
];
