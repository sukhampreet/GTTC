import type { ParkingEvent } from '@/modules/smart-parking/types';

export const parkingEvents: ParkingEvent[] = [
  { id: 'PE-001', timestamp: '11:58 AM', vehicleNumber: 'KA-33-AB-9967', vehicleType: 'Car', event: 'entry', gate: 'Main Entry Gate', slot: 'A-05' },
  { id: 'PE-002', timestamp: '11:51 AM', vehicleNumber: 'KA-19-ST-3312', vehicleType: 'Car', event: 'exit', gate: 'Main Exit Gate', slot: 'A-03' },
  { id: 'PE-003', timestamp: '11:42 AM', vehicleNumber: 'AP-16-IJ-2210', vehicleType: 'Car', event: 'entry', gate: 'Visitor Entry Gate', slot: 'B-08' },
  { id: 'PE-004', timestamp: '11:20 AM', vehicleNumber: 'KA-07-LM-9903', vehicleType: 'Bike', event: 'exit', gate: 'Main Exit Gate', slot: 'A-01' },
  { id: 'PE-005', timestamp: '11:08 AM', vehicleNumber: 'MH-04-XY-5589', vehicleType: 'Truck', event: 'exit', gate: 'Service Exit Gate', slot: 'D-08' },
  { id: 'PE-006', timestamp: '11:02 AM', vehicleNumber: 'KA-41-DE-2298', vehicleType: 'Car', event: 'entry', gate: 'Visitor Entry Gate', slot: 'A-12' },
  { id: 'PE-007', timestamp: '10:58 AM', vehicleNumber: 'KA-22-WX-1145', vehicleType: 'Car', event: 'entry', gate: 'Visitor Entry Gate', slot: 'B-01' },
  { id: 'PE-008', timestamp: '10:50 AM', vehicleNumber: 'KA-19-ST-3312', vehicleType: 'Car', event: 'exit', gate: 'Main Exit Gate', slot: 'A-03' },
  { id: 'PE-009', timestamp: '10:47 AM', vehicleNumber: 'TN-38-UV-7756', vehicleType: 'EV', event: 'entry', gate: 'Main Entry Gate', slot: 'D-03' },
  { id: 'PE-010', timestamp: '10:44 AM', vehicleNumber: 'KA-09-RS-4432', vehicleType: 'Car', event: 'entry', gate: 'Visitor Entry Gate', slot: 'B-02' },
  { id: 'PE-011', timestamp: '10:30 AM', vehicleNumber: 'KA-07-LM-9903', vehicleType: 'Bike', event: 'entry', gate: 'Main Entry Gate', slot: 'A-01' },
  { id: 'PE-012', timestamp: '10:12 AM', vehicleNumber: 'AP-16-IJ-2210', vehicleType: 'Car', event: 'entry', gate: 'Visitor Entry Gate', slot: 'B-08' },
];

export const entryActivity: ParkingEvent[] = parkingEvents.filter((event) => event.event === 'entry');
export const exitActivity: ParkingEvent[] = parkingEvents.filter((event) => event.event === 'exit');
