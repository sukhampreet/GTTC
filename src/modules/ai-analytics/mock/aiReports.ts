import type { DetectionDistributionSlice, DetectionTrendPoint } from '@/modules/ai-analytics/types';

export const detectionTrend7d: DetectionTrendPoint[] = [
  { day: 'Mon', detections: 412, alerts: 18 },
  { day: 'Tue', detections: 468, alerts: 22 },
  { day: 'Wed', detections: 391, alerts: 15 },
  { day: 'Thu', detections: 523, alerts: 27 },
  { day: 'Fri', detections: 601, alerts: 31 },
  { day: 'Sat', detections: 349, alerts: 12 },
  { day: 'Sun', detections: 287, alerts: 9 },
];

export const detectionByType: DetectionDistributionSlice[] = [
  { category: 'Person', value: 1842, color: 'var(--color-primary-500)' },
  { category: 'Vehicle', value: 964, color: 'var(--color-accent-500)' },
  { category: 'Face', value: 731, color: 'var(--color-success-500)' },
  { category: 'PPE', value: 214, color: 'var(--color-warning-500)' },
  { category: 'Intrusion', value: 96, color: 'var(--color-danger-500)' },
];

export const detectionByCamera: { camera: string; value: number }[] = [
  { camera: 'CAM-Lobby-01', value: 612 },
  { camera: 'CAM-Gate-01', value: 498 },
  { camera: 'CAM-Cafeteria-01', value: 441 },
  { camera: 'CAM-Warehouse-01', value: 287 },
  { camera: 'CAM-Perimeter-04', value: 176 },
];

export const detectionByLocation: { location: string; value: number }[] = [
  { location: 'Main Lobby', value: 612 },
  { location: 'Main Gate', value: 498 },
  { location: 'Cafeteria', value: 441 },
  { location: 'Warehouse Bay 1', value: 287 },
  { location: 'Perimeter Zone D', value: 176 },
];

export const alertTrend7d: DetectionTrendPoint[] = detectionTrend7d;

export const recognitionStats = {
  totalRecognitions: 3247,
  knownFaces: 2891,
  unknownFaces: 356,
  averageConfidence: 94.2,
};
