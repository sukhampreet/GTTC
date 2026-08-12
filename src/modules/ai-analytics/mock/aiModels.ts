import type { AIModel } from '@/modules/ai-analytics/types';

export const aiModels: AIModel[] = [
  { id: 'MDL-01', modelName: 'FaceMatch Pro', modelType: 'Face Recognition', version: 'v3.2.1', status: 'running', accuracy: 97.8, lastUpdated: '2026-07-28', deploymentStatus: 'deployed', enabled: true },
  { id: 'MDL-02', modelName: 'PersonNet', modelType: 'Person Detection', version: 'v2.6.0', status: 'running', accuracy: 96.4, lastUpdated: '2026-07-15', deploymentStatus: 'deployed', enabled: true },
  { id: 'MDL-03', modelName: 'VehicleVision', modelType: 'Vehicle Detection', version: 'v2.1.4', status: 'running', accuracy: 95.1, lastUpdated: '2026-06-30', deploymentStatus: 'deployed', enabled: true },
  { id: 'MDL-04', modelName: 'IntrusionGuard', modelType: 'Intrusion Detection', version: 'v1.9.2', status: 'running', accuracy: 93.7, lastUpdated: '2026-07-02', deploymentStatus: 'deployed', enabled: true },
  { id: 'MDL-05', modelName: 'CrowdSense', modelType: 'Crowd Analysis', version: 'v1.4.0', status: 'updating', accuracy: 91.2, lastUpdated: '2026-08-05', deploymentStatus: 'staged', enabled: true },
  { id: 'MDL-06', modelName: 'PPEWatch', modelType: 'PPE Detection', version: 'v1.7.3', status: 'running', accuracy: 92.6, lastUpdated: '2026-07-20', deploymentStatus: 'deployed', enabled: true },
  { id: 'MDL-07', modelName: 'BehaviorAI', modelType: 'Behavior Analysis', version: 'v1.2.0', status: 'stopped', accuracy: 88.4, lastUpdated: '2026-06-11', deploymentStatus: 'not-deployed', enabled: false },
  { id: 'MDL-08', modelName: 'LineTrack', modelType: 'Line Crossing', version: 'v1.5.1', status: 'running', accuracy: 94.9, lastUpdated: '2026-07-10', deploymentStatus: 'deployed', enabled: true },
];
