import type { AnalyticsSummary, DetectionTrendPoint, DetectionTypeSlice } from '@/modules/video-surveillance/types';

export const analyticsSummary: AnalyticsSummary[] = [
  { id: 'detection-count', label: 'Detection Count (24h)', value: 1842, tone: 'info', hint: 'Across 15 AI-enabled cameras' },
  { id: 'accuracy', label: 'Model Accuracy', value: '96.4%', tone: 'success', hint: 'Rolling 7-day average' },
  { id: 'today-alerts', label: "Today's Alerts", value: 37, tone: 'warning', hint: '9 require review' },
  { id: 'weekly-trend', label: 'Weekly Trend', value: '+12%', tone: 'info', hint: 'vs. previous week' },
];

export const detectionWeeklyTrend: DetectionTrendPoint[] = [
  { label: 'Mon', detections: 210, falseAlarms: 12 },
  { label: 'Tue', detections: 264, falseAlarms: 9 },
  { label: 'Wed', detections: 238, falseAlarms: 14 },
  { label: 'Thu', detections: 301, falseAlarms: 11 },
  { label: 'Fri', detections: 289, falseAlarms: 15 },
  { label: 'Sat', detections: 176, falseAlarms: 7 },
  { label: 'Sun', detections: 164, falseAlarms: 6 },
];

export const detectionTypeDistribution: DetectionTypeSlice[] = [
  { name: 'Person', value: 612, tone: 'info' },
  { name: 'Vehicle', value: 498, tone: 'neutral' },
  { name: 'Face', value: 341, tone: 'success' },
  { name: 'Intrusion', value: 118, tone: 'danger' },
  { name: 'Crowd', value: 96, tone: 'warning' },
  { name: 'Other', value: 177, tone: 'neutral' },
];
