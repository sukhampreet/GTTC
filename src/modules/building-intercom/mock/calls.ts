import type { CallHistoryEntry, LiveCall } from '@/modules/building-intercom/types';

export const liveCalls: LiveCall[] = [
  { id: 'CALL-3391', caller: 'ODS-Visitor-Entrance', receiver: 'Security Desk', duration: '02:14', status: 'connected', callType: 'Video', connectionQuality: 'success' },
  { id: 'CALL-3392', caller: 'ODS-Parking-Gate', receiver: 'Front Office', duration: '00:00', status: 'ringing', callType: 'Audio', connectionQuality: 'warning' },
];

export const callHistory: CallHistoryEntry[] = [
  { id: 'CH-9081', date: '2026-08-07', time: '09:41:12', caller: 'ODS-Main-Gate', receiver: 'Security Desk', callDuration: '01:32', callType: 'Video', status: 'answered', operator: 'Security Desk' },
  { id: 'CH-9080', date: '2026-08-07', time: '09:22:05', caller: 'ODS-Visitor-Entrance', receiver: 'Front Office', callDuration: '00:00', callType: 'Video', status: 'missed', operator: '—' },
  { id: 'CH-9079', date: '2026-08-07', time: '08:57:40', caller: 'IDS-Block-A-Security', receiver: 'ODS-Loading-Dock', callDuration: '00:48', callType: 'Audio', status: 'answered', operator: 'Aishwarya Rao' },
  { id: 'CH-9078', date: '2026-08-07', time: '08:40:19', caller: 'ODS-Emergency-East', receiver: 'Security Desk', callDuration: '03:05', callType: 'Video', status: 'emergency', operator: 'Karthik Menon' },
  { id: 'CH-9077', date: '2026-08-06', time: '18:12:33', caller: 'ODS-Rooftop-Access', receiver: 'IDS-Block-A-Security', callDuration: '00:00', callType: 'Audio', status: 'rejected', operator: 'System' },
  { id: 'CH-9076', date: '2026-08-06', time: '17:44:51', caller: 'ODS-Cafeteria-Yard', receiver: 'Front Office', callDuration: '02:11', callType: 'Video', status: 'answered', operator: 'Divya Prasad' },
  { id: 'CH-9075', date: '2026-08-06', time: '16:30:02', caller: 'ODS-Parking-Gate', receiver: 'Security Desk', callDuration: '00:00', callType: 'Audio', status: 'missed', operator: '—' },
  { id: 'CH-9074', date: '2026-08-06', time: '14:08:47', caller: 'IDS-Block-B-Lobby', receiver: 'ODS-Main-Gate', callDuration: '01:57', callType: 'Video', status: 'answered', operator: 'Rahul Nair' },
  { id: 'CH-9073', date: '2026-08-06', time: '11:52:15', caller: 'ODS-Visitor-Entrance', receiver: 'Front Office', callDuration: '00:39', callType: 'Video', status: 'answered', operator: 'Meera Iyer' },
  { id: 'CH-9072', date: '2026-08-05', time: '19:03:28', caller: 'ODS-Loading-Dock', receiver: 'Security Desk', callDuration: '00:00', callType: 'Audio', status: 'missed', operator: '—' },
  { id: 'CH-9071', date: '2026-08-05', time: '15:26:44', caller: 'ODS-Main-Gate', receiver: 'Security Desk', callDuration: '00:52', callType: 'Video', status: 'answered', operator: 'Suresh Pillai' },
  { id: 'CH-9070', date: '2026-08-05', time: '10:14:09', caller: 'ODS-Emergency-East', receiver: 'Security Desk', callDuration: '04:22', callType: 'Video', status: 'emergency', operator: 'Neha Verma' },
];
