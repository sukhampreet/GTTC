import type { CardRecord } from '@/modules/access-control/types';

export const cardRecords: CardRecord[] = [
  { id: 'CD-4001', cardNumber: '88F2A1C0', holder: 'Aishwarya Rao', department: 'Executive', accessLevel: 'Level 4 - Critical', status: 'active', expiryDate: '31 Dec 2026', assignedDoors: 12 },
  { id: 'CD-4002', cardNumber: '77B3D9E4', holder: 'Karthik Menon', department: 'Finance', accessLevel: 'Level 3 - Restricted', status: 'active', expiryDate: '30 Jun 2026', assignedDoors: 6 },
  { id: 'CD-4003', cardNumber: '6AC81F02', holder: 'Divya Prasad', department: 'Operations', accessLevel: 'Level 2 - Staff', status: 'active', expiryDate: '15 Sep 2026', assignedDoors: 4 },
  { id: 'CD-4004', cardNumber: '52E4B7A1', holder: 'Rahul Nair', department: 'Security', accessLevel: 'Level 3 - Restricted', status: 'active', expiryDate: '01 Aug 2026', assignedDoors: 9 },
  { id: 'CD-4005', cardNumber: '3F19C6D8', holder: 'Meera Iyer', department: 'HR', accessLevel: 'Level 2 - Staff', status: 'inactive', expiryDate: '10 Jan 2026', assignedDoors: 3 },
  { id: 'CD-4006', cardNumber: '9D2A0B55', holder: 'Suresh Pillai', department: 'Logistics', accessLevel: 'Level 1 - General', status: 'active', expiryDate: '22 Nov 2026', assignedDoors: 2 },
  { id: 'CD-4007', cardNumber: 'C10E7734', holder: 'Neha Verma', department: 'Operations', accessLevel: 'Level 2 - Staff', status: 'lost', expiryDate: '05 May 2026', assignedDoors: 4 },
  { id: 'CD-4008', cardNumber: 'A845F211', holder: 'Arjun Kumar', department: 'IT', accessLevel: 'Level 3 - Restricted', status: 'active', expiryDate: '18 Oct 2026', assignedDoors: 7 },
  { id: 'CD-4009', cardNumber: '2B7C9A03', holder: 'Pooja Shetty', department: 'Finance', accessLevel: 'Level 2 - Staff', status: 'expired', expiryDate: '28 Feb 2026', assignedDoors: 3 },
  { id: 'CD-4010', cardNumber: 'E67D1F90', holder: 'Vikram Joshi', department: 'Security', accessLevel: 'Level 3 - Restricted', status: 'active', expiryDate: '12 Dec 2026', assignedDoors: 8 },
];
