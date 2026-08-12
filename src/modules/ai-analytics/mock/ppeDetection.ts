import type { PPEDetectionEvent } from '@/modules/ai-analytics/types';

export const ppeDetectionEvents: PPEDetectionEvent[] = [
  { id: 'PPE-501', timestamp: '07:41:22', camera: 'CAM-Warehouse-01', location: 'Warehouse Bay 1', violation: 'helmet', confidence: 93.4, status: 'open' },
  { id: 'PPE-502', timestamp: '08:02:51', camera: 'CAM-Warehouse-02', location: 'Warehouse Bay 2', violation: 'vest', confidence: 89.7, status: 'acknowledged' },
  { id: 'PPE-503', timestamp: '08:19:36', camera: 'CAM-Loading-01', location: 'Loading Dock', violation: 'gloves', confidence: 84.2, status: 'resolved' },
  { id: 'PPE-504', timestamp: '09:12:07', camera: 'CAM-Warehouse-01', location: 'Warehouse Bay 1', violation: 'helmet', confidence: 91.8, status: 'open' },
  { id: 'PPE-505', timestamp: '10:03:44', camera: 'CAM-Lab-01', location: 'Chemical Lab', violation: 'goggles', confidence: 87.3, status: 'acknowledged' },
  { id: 'PPE-506', timestamp: '10:44:19', camera: 'CAM-Lab-02', location: 'Chemical Lab Annex', violation: 'mask', confidence: 90.1, status: 'open' },
];
