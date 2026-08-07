import type { IntercomEvent } from '@/modules/building-intercom/types';

export const recentEvents: IntercomEvent[] = [
  { id: 'EV-01', title: 'Emergency call answered', description: 'ODS-Emergency-East — Security Desk', tone: 'danger', timestamp: 'Just now' },
  { id: 'EV-02', title: 'Station offline', description: 'IDS-Block-D-Gym lost connection', tone: 'danger', timestamp: '12 min ago' },
  { id: 'EV-03', title: 'Remote unlock triggered', description: 'Visitor Entrance — Block A', tone: 'warning', timestamp: '24 min ago' },
  { id: 'EV-04', title: 'Voice broadcast completed', description: 'Fire drill announcement — All Outdoor Stations', tone: 'info', timestamp: '1 hr ago' },
  { id: 'EV-05', title: 'Missed call', description: 'ODS-Visitor-Entrance — Front Office', tone: 'warning', timestamp: '1 hr ago' },
  { id: 'EV-06', title: 'Firmware update available', description: 'IDS-Block-C-Exec — v2.4.0', tone: 'info', timestamp: '2 hr ago' },
];
