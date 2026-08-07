import type { BlacklistEntry } from '@/modules/access-control/types';

export const blacklistEntries: BlacklistEntry[] = [
  { id: 'BL-01', name: 'Unregistered Card 6AC81F02-X', reason: 'Reported lost — potential misuse', addedDate: '02 Jul 2026', status: 'active', assignedDoors: 'All Doors' },
  { id: 'BL-02', name: 'Neha Verma (Former Contractor)', reason: 'Contract ended — access revoked', addedDate: '18 Jun 2026', status: 'active', assignedDoors: 'All Doors' },
  { id: 'BL-03', name: 'Card C10E7734', reason: 'Reported stolen', addedDate: '25 Jul 2026', status: 'active', assignedDoors: 6 },
  { id: 'BL-04', name: 'Alok Sinha (Visitor)', reason: 'Repeated overstay violations', addedDate: '30 Jul 2026', status: 'under-review', assignedDoors: 'All Doors' },
  { id: 'BL-05', name: 'Card A845F211-OLD', reason: 'Replaced with new credential', addedDate: '11 Mar 2026', status: 'expired', assignedDoors: 3 },
];
