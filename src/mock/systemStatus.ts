export interface SystemStatusMetric {
  id: string;
  label: string;
  value: string;
  tone: 'success' | 'info' | 'neutral';
}

export const systemStatusMetrics: SystemStatusMetric[] = [
  { id: 'cameras', label: 'Cameras Online', value: '126', tone: 'success' },
  { id: 'fire-devices', label: 'Fire Devices', value: '48', tone: 'success' },
  { id: 'access-controllers', label: 'Access Controllers', value: '22', tone: 'success' },
  { id: 'parking-gates', label: 'Parking Gates', value: '6', tone: 'success' },
  { id: 'ai-engine', label: 'AI Engine', value: 'Online', tone: 'info' },
  { id: 'cyber-defense', label: 'Cyber Defense', value: 'Active', tone: 'info' },
  { id: 'server-status', label: 'Server Status', value: 'Healthy', tone: 'success' },
];
