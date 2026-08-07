import type { FaceRecord } from '@/modules/access-control/types';

export const faceRecords: FaceRecord[] = [
  { id: 'FR-001', name: 'Aishwarya Rao', employeeId: 'EMP-1042', group: 'Executives', status: 'registered', templateQuality: 96, enrolledOn: '12 Jan 2026', lastMatched: '2 min ago' },
  { id: 'FR-002', name: 'Karthik Menon', employeeId: 'EMP-1108', group: 'Finance', status: 'registered', templateQuality: 91, enrolledOn: '03 Feb 2026', lastMatched: '38 min ago' },
  { id: 'FR-003', name: 'Divya Prasad', employeeId: 'EMP-1077', group: 'Operations', status: 'registered', templateQuality: 88, enrolledOn: '19 Feb 2026', lastMatched: '1 hr ago' },
  { id: 'FR-004', name: 'Rahul Nair', employeeId: 'EMP-1153', group: 'Security', status: 'pending', templateQuality: 0, enrolledOn: '—', lastMatched: 'Never' },
  { id: 'FR-005', name: 'Meera Iyer', employeeId: 'EMP-1029', group: 'HR', status: 'registered', templateQuality: 94, enrolledOn: '27 Nov 2025', lastMatched: '4 hrs ago' },
  { id: 'FR-006', name: 'Suresh Pillai', employeeId: 'EMP-1201', group: 'Logistics', status: 'pending', templateQuality: 0, enrolledOn: '—', lastMatched: 'Never' },
  { id: 'FR-007', name: 'Neha Verma', employeeId: 'EMP-1064', group: 'Operations', status: 'registered', templateQuality: 90, enrolledOn: '08 Dec 2025', lastMatched: 'Yesterday' },
  { id: 'FR-008', name: 'Arjun Kumar', employeeId: 'EMP-1188', group: 'IT', status: 'registered', templateQuality: 93, enrolledOn: '15 Mar 2026', lastMatched: '17 min ago' },
];

export const faceGroups = ['Executives', 'Finance', 'Operations', 'Security', 'HR', 'Logistics', 'IT'] as const;

export const faceTemplateStats = {
  registered: faceRecords.filter((f) => f.status === 'registered').length,
  pending: faceRecords.filter((f) => f.status === 'pending').length,
  groups: faceGroups.length,
  avgQuality: Math.round(
    faceRecords.filter((f) => f.status === 'registered').reduce((sum, f) => sum + f.templateQuality, 0) /
      faceRecords.filter((f) => f.status === 'registered').length,
  ),
};
