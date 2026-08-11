import type { VisitorVehicle } from '@/modules/smart-parking/types';

export const visitorVehicles: VisitorVehicle[] = [
  { id: 'VV-001', vehicleNumber: 'MH-12-CD-3345', visitorName: 'Aishwarya Rao', company: 'Infosys Ltd', host: 'Rahul Nair', purpose: 'Client Meeting', entryTime: '09:18 AM', exitTime: null, passStatus: 'active', slot: 'C-08' },
  { id: 'VV-002', vehicleNumber: 'AP-16-IJ-2210', visitorName: 'Arjun Reddy', company: 'Wipro Technologies', host: 'Divya Prasad', purpose: 'Vendor Delivery', entryTime: '10:12 AM', exitTime: null, passStatus: 'active', slot: 'B-08' },
  { id: 'VV-003', vehicleNumber: 'KA-09-RS-4432', visitorName: 'Suresh Babu', company: 'TCS', host: 'Karthik Menon', purpose: 'Interview', entryTime: '10:44 AM', exitTime: null, passStatus: 'active', slot: 'B-02' },
  { id: 'VV-004', vehicleNumber: 'KA-41-DE-2298', visitorName: 'Manoj Pillai', company: 'Tech Mahindra', host: 'Priya Iyer', purpose: 'Client Meeting', entryTime: '11:02 AM', exitTime: null, passStatus: 'active', slot: 'A-12' },
  { id: 'VV-005', vehicleNumber: 'KA-22-WX-1145', visitorName: 'Balaji Iyer', company: 'Accenture', host: 'Vikram Shetty', purpose: 'Audit Visit', entryTime: '10:58 AM', exitTime: null, passStatus: 'active', slot: 'B-01' },
  { id: 'VV-006', vehicleNumber: 'KA-01-BZ-7788', visitorName: 'Karthik Menon', company: 'Bosch India', host: 'Ananya Krishnan', purpose: 'Equipment Delivery', entryTime: '09:02 AM', exitTime: '11:47 AM', passStatus: 'checked-out', slot: 'B-06' },
  { id: 'VV-007', vehicleNumber: 'KL-09-YZ-8834', visitorName: 'Anjali Warrier', company: 'HCL Technologies', host: 'Meera Pillai', purpose: 'Facility Inspection', entryTime: '08:30 AM', exitTime: '09:12 AM', passStatus: 'checked-out', slot: 'C-01' },
  { id: 'VV-008', vehicleNumber: 'KA-07-LM-9903', visitorName: 'Harish Kumar', company: 'Cognizant', host: 'Suresh Babu', purpose: 'Training Session', entryTime: '10:30 AM', exitTime: '11:20 AM', passStatus: 'checked-out', slot: 'A-01' },
  { id: 'VV-009', vehicleNumber: 'AP-28-RS-6690', visitorName: 'Nithya Suresh', company: 'IBM India', host: 'Naveen Gowda', purpose: 'Client Meeting', entryTime: '09:40 AM', exitTime: null, passStatus: 'active', slot: 'C-12' },
  { id: 'VV-010', vehicleNumber: 'KA-19-ST-3312', visitorName: 'Gopal Krishnan', company: 'Capgemini', host: 'Deepika Suresh', purpose: 'Contract Review', entryTime: '07:28 AM', exitTime: '10:50 AM', passStatus: 'expired', slot: 'A-03' },
  { id: 'VV-011', vehicleNumber: 'TN-38-UV-7756', visitorName: 'Swathi Menon', company: 'Infosys Ltd', host: 'Rohit Sharma', purpose: 'Site Visit', entryTime: '08:47 AM', exitTime: null, passStatus: 'active', slot: 'D-03' },
  { id: 'VV-012', vehicleNumber: 'MH-20-NO-5541', visitorName: 'Ramya Krishnan', company: 'Wipro Technologies', host: 'Kavya Nair', purpose: 'Client Meeting', entryTime: '08:03 AM', exitTime: null, passStatus: 'expired', slot: 'D-06' },
];
