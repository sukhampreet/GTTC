import type { VisitorRecord } from '@/modules/access-control/types';

export const visitorRecords: VisitorRecord[] = [
  { id: 'VS-9001', visitorName: 'Rakesh Bhatt', company: 'Siemens India', purpose: 'Vendor Meeting', host: 'Karthik Menon', checkIn: '09:12', checkOut: null, passNumber: 'VP-2201', status: 'checked-in' },
  { id: 'VS-9002', visitorName: 'Sneha Kulkarni', company: 'Deloitte', purpose: 'Audit', host: 'Aishwarya Rao', checkIn: '08:45', checkOut: '11:30', passNumber: 'VP-2198', status: 'checked-out' },
  { id: 'VS-9003', visitorName: 'Manoj Tiwari', company: 'BuildRight Contractors', purpose: 'Maintenance', host: 'Rahul Nair', checkIn: '10:05', checkOut: null, passNumber: 'VP-2203', status: 'checked-in' },
  { id: 'VS-9004', visitorName: 'Farah Sheikh', company: 'Bosch Security', purpose: 'Equipment Demo', host: 'Divya Prasad', checkIn: '—', checkOut: null, passNumber: 'VP-2205', status: 'expected' },
  { id: 'VS-9005', visitorName: 'Alok Sinha', company: 'Freelance', purpose: 'Interview', host: 'Meera Iyer', checkIn: '07:58', checkOut: null, passNumber: 'VP-2190', status: 'overstayed' },
  { id: 'VS-9006', visitorName: 'Ritu Chawla', company: 'Airtel Business', purpose: 'Network Survey', host: 'Arjun Kumar', checkIn: '09:40', checkOut: '10:15', passNumber: 'VP-2202', status: 'checked-out' },
];
