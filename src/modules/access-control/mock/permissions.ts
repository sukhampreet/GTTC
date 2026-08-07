import type { AccessPermissionRecord } from '@/modules/access-control/types';

export const accessPermissionRecords: AccessPermissionRecord[] = [
  { id: 'PM-01', user: 'Aishwarya Rao', accessGroup: 'Executive Access', assignedDoors: 12, schedule: 'Executive Access', permissions: ['All Doors', 'Emergency Override', 'Anti-Passback Bypass'], status: 'active' },
  { id: 'PM-02', user: 'Karthik Menon', accessGroup: 'Finance Staff', assignedDoors: 6, schedule: 'General Shift', permissions: ['Finance Wing', 'Main Entrance'], status: 'active' },
  { id: 'PM-03', user: 'Divya Prasad', accessGroup: 'Operations Staff', assignedDoors: 4, schedule: 'General Shift', permissions: ['Operations Floor', 'Cafeteria'], status: 'active' },
  { id: 'PM-04', user: 'Rahul Nair', accessGroup: 'Security Team', assignedDoors: 9, schedule: 'Security Rotation A', permissions: ['All Doors', 'Emergency Override'], status: 'active' },
  { id: 'PM-05', user: 'Meera Iyer', accessGroup: 'HR Staff', assignedDoors: 3, schedule: 'General Shift', permissions: ['HR Wing', 'Main Entrance'], status: 'inactive' },
  { id: 'PM-06', user: 'Vendor Access Group', accessGroup: 'Contractors', assignedDoors: 2, schedule: 'Vendor Window', permissions: ['Loading Dock'], status: 'active' },
];
