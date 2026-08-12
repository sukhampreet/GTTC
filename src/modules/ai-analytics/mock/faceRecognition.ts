import type { FaceRecognitionEvent } from '@/modules/ai-analytics/types';

export const faceRecognitionEvents: FaceRecognitionEvent[] = [
  { id: 'FR-001', timestamp: '08:12:04', person: 'Arjun Mehta (Employee)', camera: 'CAM-Lobby-01', location: 'Main Lobby', confidence: 98.4, matchStatus: 'matched', status: 'processed' },
  { id: 'FR-002', timestamp: '08:14:41', person: 'Unknown', camera: 'CAM-Gate-03', location: 'North Gate', confidence: 71.2, matchStatus: 'unmatched', status: 'reviewing' },
  { id: 'FR-003', timestamp: '08:20:19', person: 'Priya Nair (Employee)', camera: 'CAM-Lobby-01', location: 'Main Lobby', confidence: 96.7, matchStatus: 'matched', status: 'processed' },
  { id: 'FR-004', timestamp: '08:31:52', person: 'Watchlist Match #WL-014', camera: 'CAM-Gate-01', location: 'Main Gate', confidence: 89.5, matchStatus: 'watchlist', status: 'flagged' },
  { id: 'FR-005', timestamp: '08:44:07', person: 'Rohan Das (Visitor)', camera: 'CAM-Recep-02', location: 'Reception', confidence: 93.1, matchStatus: 'matched', status: 'processed' },
  { id: 'FR-006', timestamp: '09:02:33', person: 'Unknown', camera: 'CAM-Parking-05', location: 'Parking Level 1', confidence: 64.8, matchStatus: 'unmatched', status: 'reviewing' },
  { id: 'FR-007', timestamp: '09:18:56', person: 'Sana Iqbal (Employee)', camera: 'CAM-BlockB-02', location: 'Block B Entrance', confidence: 97.9, matchStatus: 'matched', status: 'processed' },
  { id: 'FR-008', timestamp: '09:35:10', person: 'Unknown', camera: 'CAM-Gate-03', location: 'North Gate', confidence: 58.3, matchStatus: 'unmatched', status: 'reviewing' },
];
