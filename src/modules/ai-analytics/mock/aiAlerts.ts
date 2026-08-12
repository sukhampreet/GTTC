import type { AIAlert } from '@/modules/ai-analytics/types';

export const aiAlerts: AIAlert[] = [
  { id: 'AL-9001', timestamp: '2026-08-11 08:31:52', alertType: 'Intrusion Detected', camera: 'CAM-Perimeter-04', location: 'Perimeter Zone D', severity: 'critical', confidence: 94.1, status: 'active' },
  { id: 'AL-9002', timestamp: '2026-08-11 08:14:41', alertType: 'Unknown Face', camera: 'CAM-Gate-03', location: 'North Gate', severity: 'medium', confidence: 71.2, status: 'active' },
  { id: 'AL-9003', timestamp: '2026-08-11 07:58:04', alertType: 'Crowd Threshold Exceeded', camera: 'CAM-Auditorium-01', location: 'Auditorium Entrance', severity: 'high', confidence: 96.0, status: 'acknowledged' },
  { id: 'AL-9004', timestamp: '2026-08-11 07:41:22', alertType: 'PPE Violation', camera: 'CAM-Warehouse-01', location: 'Warehouse Bay 1', severity: 'medium', confidence: 93.4, status: 'active' },
  { id: 'AL-9005', timestamp: '2026-08-10 23:52:36', alertType: 'Suspicious Behavior', camera: 'CAM-Perimeter-03', location: 'West Perimeter', severity: 'critical', confidence: 90.2, status: 'acknowledged' },
  { id: 'AL-9006', timestamp: '2026-08-10 20:36:11', alertType: 'Vehicle Detection', camera: 'CAM-Gate-01', location: 'Main Gate', severity: 'low', confidence: 65.4, status: 'resolved' },
  { id: 'AL-9007', timestamp: '2026-08-10 14:22:56', alertType: 'Line Crossing', camera: 'CAM-Perimeter-04', location: 'South Fence Line', severity: 'medium', confidence: 79.4, status: 'resolved' },
  { id: 'AL-9008', timestamp: '2026-08-10 09:12:07', alertType: 'PPE Violation', camera: 'CAM-Warehouse-01', location: 'Warehouse Bay 1', severity: 'low', confidence: 91.8, status: 'resolved' },
];
