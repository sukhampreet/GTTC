import type { PersonDetectionEvent } from '@/modules/ai-analytics/types';

export const personDetectionEvents: PersonDetectionEvent[] = [
  { id: 'PD-101', timestamp: '08:00:12', camera: 'CAM-Lobby-01', location: 'Main Lobby', count: 14, confidence: 97.2, status: 'normal' },
  { id: 'PD-102', timestamp: '08:15:44', camera: 'CAM-Cafeteria-01', location: 'Cafeteria', count: 38, confidence: 95.6, status: 'normal' },
  { id: 'PD-103', timestamp: '08:32:09', camera: 'CAM-Gate-01', location: 'Main Gate', count: 6, confidence: 92.1, status: 'normal' },
  { id: 'PD-104', timestamp: '08:47:51', camera: 'CAM-BlockC-04', location: 'Block C Corridor', count: 2, confidence: 88.4, status: 'review' },
  { id: 'PD-105', timestamp: '09:05:23', camera: 'CAM-Parking-05', location: 'Parking Level 1', count: 1, confidence: 79.9, status: 'alert' },
  { id: 'PD-106', timestamp: '09:22:37', camera: 'CAM-Rooftop-01', location: 'Rooftop', count: 0, confidence: 0, status: 'normal' },
  { id: 'PD-107', timestamp: '09:40:15', camera: 'CAM-Lobby-01', location: 'Main Lobby', count: 22, confidence: 96.8, status: 'normal' },
];
