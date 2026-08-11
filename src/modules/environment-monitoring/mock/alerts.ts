import type { EnvironmentAlert } from '@/modules/environment-monitoring/types';

export const environmentAlerts: EnvironmentAlert[] = [
  { id: 'EA-2001', type: 'High Temperature', severity: 'critical', timestamp: '11 Aug 2026 · 09:42:18', location: 'Block B - Floor 1', sensor: 'TMP-05', description: 'High Temperature — 29.6°C exceeds threshold of 28°C', status: 'active' },
  { id: 'EA-2000', type: 'Poor Air Quality', severity: 'high', timestamp: '11 Aug 2026 · 09:15:02', location: 'Basement Parking', sensor: 'AQ-06', description: 'Poor Air Quality — AQI 165 (Critical)', status: 'active' },
  { id: 'EA-1999', type: 'High CO₂', severity: 'high', timestamp: '11 Aug 2026 · 08:58:44', location: 'Basement Parking', sensor: 'AQ-06', description: 'High CO₂ — 1150 ppm recorded', status: 'acknowledged' },
  { id: 'EA-1998', type: 'Sensor Offline', severity: 'medium', timestamp: '11 Aug 2026 · 08:20:11', location: 'Block C - Warehouse', sensor: 'TMP-06', description: 'Sensor Offline — no data for 3 hours', status: 'active' },
  { id: 'EA-1997', type: 'Energy Spike', severity: 'medium', timestamp: '10 Aug 2026 · 22:40:38', location: 'Server Room', sensor: 'EN-03', description: 'Energy Spike — 68.2 kW peak draw', status: 'resolved' },
  { id: 'EA-1996', type: 'High Occupancy', severity: 'low', timestamp: '10 Aug 2026 · 17:05:09', location: 'Conference Center', sensor: 'OC-05', description: 'High Occupancy — approaching capacity during event', status: 'resolved' },
  { id: 'EA-1995', type: 'HVAC Fault', severity: 'critical', timestamp: '10 Aug 2026 · 11:22:52', location: 'Block C - Warehouse', sensor: 'HVAC-05', description: 'HVAC Fault — unit offline, no cooling', status: 'active' },
  { id: 'EA-1994', type: 'High Humidity', severity: 'low', timestamp: '09 Aug 2026 · 19:47:27', location: 'Block A - Floor 2', sensor: 'HUM-02', description: 'High Humidity — 68% exceeds threshold', status: 'resolved' },
  { id: 'EA-1993', type: 'Low Temperature', severity: 'medium', timestamp: '09 Aug 2026 · 14:12:03', location: 'Server Room', sensor: 'TMP-03', description: 'Low Temperature — 18.0°C below setpoint', status: 'resolved' },
  { id: 'EA-1992', type: 'High Humidity', severity: 'high', timestamp: '08 Aug 2026 · 06:58:15', location: 'Block C - Warehouse', sensor: 'HUM-05', description: 'High Humidity — 74% exceeds threshold of 65%', status: 'acknowledged' },
];
