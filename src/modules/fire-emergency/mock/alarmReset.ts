import type { AlarmResetItem } from '@/modules/fire-emergency/types';

export const alarmResetQueue: AlarmResetItem[] = [
  { id: 'AR-01', device: 'SM-052 — Finance Wing Sensor', zone: 'Zone B', alarmType: 'Smoke Alarm', triggeredAt: '9 min ago', status: 'active' },
  { id: 'AR-02', device: 'HT-006 — Boiler Room Sensor', zone: 'Zone D', alarmType: 'Heat Alarm', triggeredAt: '18 min ago', status: 'active' },
  { id: 'AR-03', device: 'MCP-C-201', zone: 'Zone C', alarmType: 'MCP Activation', triggeredAt: '42 min ago', status: 'queued-for-reset' },
];
