import type { ParkingStatusSnapshot } from '@/modules/live-monitoring/types';

export const parkingStatusSnapshot: ParkingStatusSnapshot = {
  occupiedSlots: 286,
  availableSlots: 114,
  totalSlots: 400,
  currentVehicles: 286,
  gates: [
    { id: 'PG-01', name: 'Main Gate Entry', type: 'entry', status: 'online', barrierStatus: 'closed' },
    { id: 'PG-02', name: 'Main Gate Exit', type: 'exit', status: 'online', barrierStatus: 'closed' },
    { id: 'PG-03', name: 'Basement 1 Entry', type: 'entry', status: 'online', barrierStatus: 'open' },
    { id: 'PG-04', name: 'Basement 1 Exit', type: 'exit', status: 'online', barrierStatus: 'closed' },
    { id: 'PG-05', name: 'Visitor Lot Entry', type: 'entry', status: 'warning', barrierStatus: 'closed' },
    { id: 'PG-06', name: 'Visitor Lot Exit', type: 'exit', status: 'online', barrierStatus: 'closed' },
  ],
};
