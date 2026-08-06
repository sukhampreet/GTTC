import type { PlatformUserRecord } from '@/types/mock';

export const platformUsers: PlatformUserRecord[] = [
  { id: 'USR-001', fullName: 'Aishwarya Rao', username: 'admin', email: 'admin@gttc-security.local', role: 'Administrator', status: 'active', lastLogin: 'Just now' },
  { id: 'USR-002', fullName: 'Karthik Menon', username: 'karthik.m', email: 'karthik.menon@gttc-security.local', role: 'Operator', status: 'active', lastLogin: '2 hrs ago' },
  { id: 'USR-003', fullName: 'Divya Prasad', username: 'divya.p', email: 'divya.prasad@gttc-security.local', role: 'Supervisor', status: 'active', lastLogin: 'Yesterday' },
  { id: 'USR-004', fullName: 'Rahul Nair', username: 'rahul.n', email: 'rahul.nair@gttc-security.local', role: 'Security Officer', status: 'disabled', lastLogin: '5 days ago' },
];
