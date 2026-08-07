import type { AlertItem } from '@/modules/access-control/types';

export const recentAlerts: AlertItem[] = [
  { id: 'AL-01', title: 'Door forced open', description: 'Data Center Airlock — Block C', tone: 'danger', timestamp: 'Just now' },
  { id: 'AL-02', title: 'Controller offline', description: 'ACP-Block-C-01 lost heartbeat', tone: 'danger', timestamp: '4 min ago' },
  { id: 'AL-03', title: 'Door held open', description: 'Emergency Exit East — Block B', tone: 'warning', timestamp: '22 min ago' },
  { id: 'AL-04', title: 'Unauthorized card attempt', description: 'Server Room — Block A', tone: 'warning', timestamp: '38 min ago' },
  { id: 'AL-05', title: 'Blacklisted card scanned', description: 'Emergency Exit East — Block B', tone: 'danger', timestamp: '1 hr ago' },
  { id: 'AL-06', title: 'Face template enrolled', description: 'Neha Verma — Operations', tone: 'info', timestamp: '2 hrs ago' },
];
