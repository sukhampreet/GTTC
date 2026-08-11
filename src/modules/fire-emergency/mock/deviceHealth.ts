import type { DeviceHealthCategory } from '@/modules/fire-emergency/types';

export const deviceHealthCategories: DeviceHealthCategory[] = [
  { id: 'fire-panels', label: 'Fire Panels', online: 2, offline: 1, maintenance: 1 },
  { id: 'smoke-sensors', label: 'Smoke Sensors', online: 6, offline: 1, maintenance: 1 },
  { id: 'heat-sensors', label: 'Heat Sensors', online: 5, offline: 1, maintenance: 0 },
  { id: 'mcp-devices', label: 'MCP Devices', online: 5, offline: 1, maintenance: 0 },
  { id: 'pa-speakers', label: 'PA Speakers', online: 51, offline: 0, maintenance: 2 },
  { id: 'power-supplies', label: 'Power Supplies', online: 4, offline: 0, maintenance: 0 },
];
