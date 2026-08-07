import type { AntiPassbackEvent, AntiPassbackZone } from '@/modules/access-control/types';

export const antiPassbackZones: AntiPassbackZone[] = [
  { id: 'APB-01', zoneName: 'Data Center Zone', building: 'Block C', enabled: true, mode: 'hard', violationsToday: 2 },
  { id: 'APB-02', zoneName: 'Executive Floor Zone', building: 'Block A', enabled: true, mode: 'soft', violationsToday: 0 },
  { id: 'APB-03', zoneName: 'Finance Wing Zone', building: 'Block B', enabled: true, mode: 'timed', violationsToday: 1 },
  { id: 'APB-04', zoneName: 'Loading Dock Zone', building: 'Block C', enabled: false, mode: 'soft', violationsToday: 0 },
];

export const antiPassbackEvents: AntiPassbackEvent[] = [
  { id: 'APE-01', time: '09:35:20', zone: 'Data Center Zone', user: 'Unknown Card', eventType: 'Passback Violation', action: 'Access Denied' },
  { id: 'APE-02', time: '08:58:11', zone: 'Finance Wing Zone', user: 'Karthik Menon', eventType: 'Re-entry without Exit', action: 'Access Denied' },
  { id: 'APE-03', time: '08:20:44', zone: 'Data Center Zone', user: 'Arjun Kumar', eventType: 'Tailgate Suspected', action: 'Logged Only' },
  { id: 'APE-04', time: 'Yesterday 17:12', zone: 'Executive Floor Zone', user: 'Aishwarya Rao', eventType: 'Bypass Used', action: 'Override Granted' },
];
