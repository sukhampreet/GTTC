import type { DetectionCategoryMeta, DetectionEvent } from '@/modules/video-surveillance/types';

export const detectionCategoryMeta: DetectionCategoryMeta[] = [
  { category: 'person', label: 'Person Detection', description: 'Detects and tracks human presence across all AI-enabled camera zones.', camerasEnabled: 15, detectionsToday: 612, accuracyPct: 97.2, tone: 'info' },
  { category: 'vehicle', label: 'Vehicle Detection', description: 'Identifies vehicles, classifies type and captures plate regions at gates.', camerasEnabled: 8, detectionsToday: 498, accuracyPct: 96.1, tone: 'neutral' },
  { category: 'face', label: 'Face Detection', description: 'Detects faces for recognition hand-off at controlled entry points.', camerasEnabled: 6, detectionsToday: 341, accuracyPct: 95.8, tone: 'success' },
  { category: 'weapon', label: 'Weapon Detection', description: 'Flags visually identifiable firearms and edged weapons in frame.', camerasEnabled: 10, detectionsToday: 2, accuracyPct: 91.4, tone: 'danger' },
  { category: 'fire', label: 'Fire Detection', description: 'Monitors for flame and smoke signatures in high-risk zones.', camerasEnabled: 9, detectionsToday: 0, accuracyPct: 94.7, tone: 'danger' },
  { category: 'intrusion', label: 'Intrusion Detection', description: 'Detects unauthorised entry into restricted virtual zones.', camerasEnabled: 12, detectionsToday: 118, accuracyPct: 95.3, tone: 'danger' },
  { category: 'crowd', label: 'Crowd Detection', description: 'Estimates crowd density and flags abnormal gathering thresholds.', camerasEnabled: 5, detectionsToday: 96, accuracyPct: 93.6, tone: 'warning' },
  { category: 'helmet', label: 'Helmet Detection', description: 'Verifies helmet compliance for two-wheeler riders at gates.', camerasEnabled: 3, detectionsToday: 54, accuracyPct: 92.9, tone: 'warning' },
  { category: 'ppe', label: 'PPE Detection', description: 'Checks for mandated safety gear in maintenance and utility areas.', camerasEnabled: 4, detectionsToday: 41, accuracyPct: 92.1, tone: 'warning' },
  { category: 'line-crossing', label: 'Line Crossing', description: 'Raises an alert when a virtual tripwire boundary is crossed.', camerasEnabled: 11, detectionsToday: 79, accuracyPct: 96.6, tone: 'info' },
];

export const detectionEvents: DetectionEvent[] = [
  { id: 'DET-001', time: '09:41:12', camera: 'CAM-001 Main Gate Entry', location: 'Main Gate', category: 'vehicle', confidencePct: 98, status: 'acknowledged', tone: 'neutral' },
  { id: 'DET-002', time: '09:38:47', camera: 'CAM-042 Perimeter South', location: 'South Wall', category: 'line-crossing', confidencePct: 95, status: 'new', tone: 'danger' },
  { id: 'DET-003', time: '09:35:03', camera: 'CAM-042 Perimeter South', location: 'South Wall', category: 'intrusion', confidencePct: 93, status: 'new', tone: 'danger' },
  { id: 'DET-004', time: '09:28:56', camera: 'CAM-016 Server Room Entry', location: 'Server Room', category: 'face', confidencePct: 99, status: 'acknowledged', tone: 'success' },
  { id: 'DET-005', time: '09:20:11', camera: 'CAM-031 Parking Boom Barrier', location: 'Parking Entry', category: 'vehicle', confidencePct: 97, status: 'acknowledged', tone: 'neutral' },
  { id: 'DET-006', time: '09:14:29', camera: 'CAM-071 Hostel Block A Gate', location: 'Hostel Block A', category: 'helmet', confidencePct: 88, status: 'new', tone: 'warning' },
  { id: 'DET-007', time: '08:57:41', camera: 'CAM-091 Loading Dock', location: 'Loading Dock', category: 'ppe', confidencePct: 90, status: 'new', tone: 'warning' },
  { id: 'DET-008', time: '08:40:10', camera: 'CAM-061 Auditorium Main Hall', location: 'Auditorium', category: 'crowd', confidencePct: 91, status: 'dismissed', tone: 'warning' },
  { id: 'DET-009', time: '08:22:36', camera: 'CAM-022 Library Reading Hall', location: 'Library', category: 'person', confidencePct: 96, status: 'acknowledged', tone: 'info' },
  { id: 'DET-010', time: '07:58:02', camera: 'CAM-043 Perimeter East', location: 'East Wall', category: 'line-crossing', confidencePct: 92, status: 'acknowledged', tone: 'danger' },
  { id: 'DET-011', time: '07:41:19', camera: 'CAM-052 Cafeteria Entrance', location: 'Cafeteria', category: 'person', confidencePct: 95, status: 'acknowledged', tone: 'info' },
  { id: 'DET-012', time: '06:58:44', camera: 'CAM-044 Perimeter West', location: 'West Wall', category: 'weapon', confidencePct: 76, status: 'new', tone: 'danger' },
];
