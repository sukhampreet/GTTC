import type { AlertItem } from '@/modules/smart-parking/types';

export const recentAlerts: AlertItem[] = [
  { id: 'AL-01', title: 'Service exit ANPR degraded', description: 'ANPR-Exit-02 — Service Exit Gate, low recognition confidence', tone: 'warning', timestamp: '9 min ago' },
  { id: 'AL-02', title: 'Barrier left open', description: 'Exit Barrier 2 — Service Exit Gate exceeded open threshold', tone: 'warning', timestamp: '18 min ago' },
  { id: 'AL-03', title: 'Visitor pass expired', description: 'MH-20-NO-5541 — Ramya Krishnan, still parked at D-06', tone: 'danger', timestamp: '34 min ago' },
  { id: 'AL-04', title: 'Zone C nearing capacity', description: '92% occupancy across Zone C parking slots', tone: 'warning', timestamp: '48 min ago' },
  { id: 'AL-05', title: 'Vehicle entry recorded', description: 'KA-33-AB-9967 — Main Entry Gate, assigned slot A-05', tone: 'info', timestamp: '1 hr ago' },
  { id: 'AL-06', title: 'Daily reconciliation completed', description: 'All entry/exit logs reconciled with ANPR records', tone: 'success', timestamp: 'Yesterday' },
];
