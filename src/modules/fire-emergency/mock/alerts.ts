import type { AlertItem } from '@/modules/fire-emergency/types';

export const recentAlerts: AlertItem[] = [
  { id: 'AL-01', title: 'Smoke alarm triggered', description: 'SM-052 — Finance Wing, Block B', tone: 'danger', timestamp: 'Just now' },
  { id: 'AL-02', title: 'Smoke threshold exceeded', description: 'SM-014 — Level 2 East, Block C', tone: 'warning', timestamp: '14 min ago' },
  { id: 'AL-03', title: 'Fire panel offline', description: 'FACP-Block-D-01 lost heartbeat', tone: 'danger', timestamp: '38 min ago' },
  { id: 'AL-04', title: 'MCP activated', description: 'MCP-C-201 — Block C, pending reset', tone: 'warning', timestamp: '42 min ago' },
  { id: 'AL-05', title: 'Sensor communication lost', description: 'SM-033 — Loading Dock, Block C', tone: 'warning', timestamp: '2 hrs ago' },
  { id: 'AL-06', title: 'Fire drill completed', description: 'Campus-wide scheduled test', tone: 'info', timestamp: 'Yesterday' },
];
