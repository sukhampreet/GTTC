import type { ControllerRecord } from '@/modules/access-control/types';

export const controllerRecords: ControllerRecord[] = [
  { id: 'CTRL-01', name: 'ACP-Block-A-01', building: 'Block A', ipAddress: '10.20.1.11', status: 'online', linkedDoors: 4, firmware: 'v3.2.1', lastHeartbeat: '4 sec ago' },
  { id: 'CTRL-02', name: 'ACP-Block-B-01', building: 'Block B', ipAddress: '10.20.1.12', status: 'online', linkedDoors: 3, firmware: 'v3.2.1', lastHeartbeat: '6 sec ago' },
  { id: 'CTRL-03', name: 'ACP-Block-C-01', building: 'Block C', ipAddress: '10.20.1.13', status: 'offline', linkedDoors: 2, firmware: 'v3.1.8', lastHeartbeat: '1 hr ago' },
  { id: 'CTRL-04', name: 'ACP-Block-D-01', building: 'Block D', ipAddress: '10.20.1.14', status: 'online', linkedDoors: 1, firmware: 'v3.2.1', lastHeartbeat: '2 sec ago' },
  { id: 'CTRL-05', name: 'ACP-Block-C-02', building: 'Block C', ipAddress: '10.20.1.15', status: 'warning', linkedDoors: 2, firmware: 'v3.1.8', lastHeartbeat: '48 sec ago' },
];

export const faceDeviceCount = 9;
export const cardReaderCount = 14;
