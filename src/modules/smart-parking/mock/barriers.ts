import type { Barrier } from '@/modules/smart-parking/types';

export const barriers: Barrier[] = [
  { id: 'BR-01', name: 'Entry Barrier 1', gateName: 'Main Entry Gate', direction: 'entry', barrierStatus: 'closed', gateStatus: 'online', controllerHealth: 'online' },
  { id: 'BR-02', name: 'Entry Barrier 2', gateName: 'Visitor Entry Gate', direction: 'entry', barrierStatus: 'closed', gateStatus: 'online', controllerHealth: 'online' },
  { id: 'BR-03', name: 'Exit Barrier 1', gateName: 'Main Exit Gate', direction: 'exit', barrierStatus: 'closed', gateStatus: 'online', controllerHealth: 'online' },
  { id: 'BR-04', name: 'Exit Barrier 2', gateName: 'Service Exit Gate', direction: 'exit', barrierStatus: 'open', gateStatus: 'warning', controllerHealth: 'warning' },
];
