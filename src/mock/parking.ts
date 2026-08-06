import type { ParkingGateRecord } from '@/types/mock';

export const parkingGates: ParkingGateRecord[] = [
  { id: 'PG-01', name: 'Main Entry Gate', type: 'entry', status: 'online', slotsTotal: 220, slotsOccupied: 168 },
  { id: 'PG-02', name: 'Main Exit Gate', type: 'exit', status: 'online', slotsTotal: 220, slotsOccupied: 168 },
  { id: 'PG-03', name: 'Visitor Entry', type: 'entry', status: 'online', slotsTotal: 40, slotsOccupied: 12 },
  { id: 'PG-04', name: 'Staff Exit', type: 'exit', status: 'warning', slotsTotal: 60, slotsOccupied: 45 },
];
