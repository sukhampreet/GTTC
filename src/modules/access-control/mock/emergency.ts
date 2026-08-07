import type { EmergencyDoorState } from '@/modules/access-control/types';

export const emergencyDoorStates: EmergencyDoorState[] = [
  { id: 'DR-003', doorName: 'Emergency Exit East', building: 'Block B', unlocked: true, triggeredBy: 'Fire Alarm Zone 2', triggeredAt: '22 min ago' },
  { id: 'DR-009', doorName: 'Cafeteria Entrance', building: 'Block D', unlocked: false, triggeredBy: '—', triggeredAt: '—' },
];

export const lastEmergencyTrigger = {
  event: 'Fire Alarm Zone 2 — Smoke Detected',
  time: '22 min ago',
  triggeredBy: 'Fire & Emergency System (Auto)',
};
