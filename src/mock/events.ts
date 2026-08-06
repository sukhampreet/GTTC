import type { EventRecord } from '@/types/mock';

export const events: EventRecord[] = [
  { id: 'EVT-1001', title: 'Intrusion detected - North Perimeter', source: 'AI Analytics', severity: 'danger', timestamp: '2 min ago', acknowledged: false },
  { id: 'EVT-1000', title: 'Camera CAM-041 went offline', source: 'Video Surveillance', severity: 'warning', timestamp: '14 min ago', acknowledged: false },
  { id: 'EVT-0998', title: 'Door held open - Emergency Exit East', source: 'Access Control', severity: 'warning', timestamp: '22 min ago', acknowledged: true },
  { id: 'EVT-0991', title: 'Fire panel self-test completed', source: 'Fire & Emergency', severity: 'info', timestamp: '1 hr ago', acknowledged: true },
  { id: 'EVT-0985', title: 'Parking Gate PG-04 sensor fault', source: 'Smart Parking', severity: 'warning', timestamp: '3 hr ago', acknowledged: true },
  { id: 'EVT-0970', title: 'Air quality threshold exceeded - Cafeteria', source: 'Environment Monitoring', severity: 'warning', timestamp: 'Yesterday', acknowledged: true },
];
