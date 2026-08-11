import type { FirePanel } from '@/modules/fire-emergency/types';

export const firePanels: FirePanel[] = [
  { id: 'FP-01', name: 'FACP-Block-A-01', building: 'Block A', zone: 'Zone A', status: 'online', linkedDevices: 22, firmware: 'v4.1.0', lastHeartbeat: '3 sec ago' },
  { id: 'FP-02', name: 'FACP-Block-B-01', building: 'Block B', zone: 'Zone B', status: 'online', linkedDevices: 18, firmware: 'v4.1.0', lastHeartbeat: '5 sec ago' },
  { id: 'FP-03', name: 'FACP-Block-C-01', building: 'Block C', zone: 'Zone C', status: 'warning', linkedDevices: 14, firmware: 'v4.0.6', lastHeartbeat: '52 sec ago' },
  { id: 'FP-04', name: 'FACP-Block-D-01', building: 'Block D', zone: 'Zone D', status: 'offline', linkedDevices: 9, firmware: 'v3.9.2', lastHeartbeat: '38 min ago' },
];
