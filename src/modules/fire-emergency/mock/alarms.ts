import type { AlarmHistoryEntry } from '@/modules/fire-emergency/types';

export const alarmHistory: AlarmHistoryEntry[] = [
  { id: 'AH-3001', date: '07 Aug 2026', time: '09:12:55', alarmType: 'Smoke Detected', device: 'SM-014', zone: 'Zone C', building: 'Block C', severity: 'major', acknowledged: true, resolved: false, operator: 'Rahul Nair' },
  { id: 'AH-3000', date: '07 Aug 2026', time: '08:58:02', alarmType: 'Smoke Alarm', device: 'SM-052', zone: 'Zone B', building: 'Block B', severity: 'critical', acknowledged: true, resolved: false, operator: 'Rahul Nair' },
  { id: 'AH-2999', date: '07 Aug 2026', time: '08:15:44', alarmType: 'System Test', device: 'FP-02', zone: 'Zone B', building: 'Block B', severity: 'minor', acknowledged: true, resolved: true, operator: 'Divya Prasad' },
  { id: 'AH-2998', date: '06 Aug 2026', time: '22:40:11', alarmType: 'Heat Alarm', device: 'HT-006', zone: 'Zone D', building: 'Block D', severity: 'critical', acknowledged: true, resolved: true, operator: 'Vikram Joshi' },
  { id: 'AH-2997', date: '06 Aug 2026', time: '17:05:38', alarmType: 'MCP Activated', device: 'MCP-C-201', zone: 'Zone C', building: 'Block C', severity: 'major', acknowledged: true, resolved: true, operator: 'Rahul Nair' },
  { id: 'AH-2996', date: '06 Aug 2026', time: '11:22:09', alarmType: 'Sensor Offline', device: 'SM-033', zone: 'Zone C', building: 'Block C', severity: 'minor', acknowledged: true, resolved: false, operator: 'System' },
  { id: 'AH-2995', date: '05 Aug 2026', time: '19:47:52', alarmType: 'Fire Panel Fault', device: 'FP-03', zone: 'Zone C', building: 'Block C', severity: 'major', acknowledged: true, resolved: true, operator: 'Divya Prasad' },
  { id: 'AH-2994', date: '05 Aug 2026', time: '08:30:00', alarmType: 'Scheduled Drill', device: 'All Zones', zone: 'Zone A', building: 'Campus-wide', severity: 'minor', acknowledged: true, resolved: true, operator: 'Vikram Joshi' },
  { id: 'AH-2993', date: '04 Aug 2026', time: '14:12:27', alarmType: 'Heat Elevated', device: 'HT-003', zone: 'Zone C', building: 'Block C', severity: 'minor', acknowledged: true, resolved: true, operator: 'Rahul Nair' },
  { id: 'AH-2992', date: '03 Aug 2026', time: '06:58:15', alarmType: 'Panel Offline', device: 'FP-04', zone: 'Zone D', building: 'Block D', severity: 'major', acknowledged: true, resolved: false, operator: 'System' },
];
