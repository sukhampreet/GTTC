import type { EmployeeAccessRecord } from '@/modules/access-control/types';

export const employeeAccessRecords: EmployeeAccessRecord[] = [
  { id: 'EAR-01', employeeId: 'EMP-1042', name: 'Aishwarya Rao', department: 'Executive', role: 'Chief Operating Officer', assignedCard: '88F2A1C0', assignedFace: true, accessLevel: 'Level 4 - Critical', status: 'active' },
  { id: 'EAR-02', employeeId: 'EMP-1108', name: 'Karthik Menon', department: 'Finance', role: 'Finance Manager', assignedCard: '77B3D9E4', assignedFace: true, accessLevel: 'Level 3 - Restricted', status: 'active' },
  { id: 'EAR-03', employeeId: 'EMP-1077', name: 'Divya Prasad', department: 'Operations', role: 'Operations Lead', assignedCard: '6AC81F02', assignedFace: true, accessLevel: 'Level 2 - Staff', status: 'active' },
  { id: 'EAR-04', employeeId: 'EMP-1153', name: 'Rahul Nair', department: 'Security', role: 'Security Officer', assignedCard: '52E4B7A1', assignedFace: false, accessLevel: 'Level 3 - Restricted', status: 'active' },
  { id: 'EAR-05', employeeId: 'EMP-1029', name: 'Meera Iyer', department: 'HR', role: 'HR Executive', assignedCard: '3F19C6D8', assignedFace: true, accessLevel: 'Level 2 - Staff', status: 'suspended' },
  { id: 'EAR-06', employeeId: 'EMP-1201', name: 'Suresh Pillai', department: 'Logistics', role: 'Warehouse Supervisor', assignedCard: '9D2A0B55', assignedFace: false, accessLevel: 'Level 1 - General', status: 'active' },
  { id: 'EAR-07', employeeId: 'EMP-1064', name: 'Neha Verma', department: 'Operations', role: 'Facilities Coordinator', assignedCard: null, assignedFace: true, accessLevel: 'Level 2 - Staff', status: 'active' },
  { id: 'EAR-08', employeeId: 'EMP-1188', name: 'Arjun Kumar', department: 'IT', role: 'IT Systems Engineer', assignedCard: 'A845F211', assignedFace: true, accessLevel: 'Level 3 - Restricted', status: 'active' },
  { id: 'EAR-09', employeeId: 'EMP-1091', name: 'Pooja Shetty', department: 'Finance', role: 'Accountant', assignedCard: '2B7C9A03', assignedFace: false, accessLevel: 'Level 2 - Staff', status: 'inactive' },
  { id: 'EAR-10', employeeId: 'EMP-1132', name: 'Vikram Joshi', department: 'Security', role: 'Shift Supervisor', assignedCard: 'E67D1F90', assignedFace: true, accessLevel: 'Level 3 - Restricted', status: 'active' },
];
