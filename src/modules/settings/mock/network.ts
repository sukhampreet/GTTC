import type { NetworkServiceStatus, NetworkSetting } from '@/modules/settings/types';

export const networkSettings: NetworkSetting[] = [
  { id: 'server-ip', label: 'Server IP', value: '10.10.1.5' },
  { id: 'gateway', label: 'Gateway', value: '10.10.1.1' },
  { id: 'dns', label: 'DNS', value: '10.10.1.2, 8.8.8.8' },
  { id: 'subnet', label: 'Subnet Mask', value: '255.255.255.0' },
];

export const networkServiceStatus: NetworkServiceStatus[] = [
  { id: 'lan', label: 'LAN Status', state: 'online', detail: '1 Gbps · Full duplex' },
  { id: 'api', label: 'API Status', state: 'online', detail: 'Responding · 8ms avg latency' },
  { id: 'mqtt', label: 'MQTT Status', state: 'online', detail: 'Broker connected · 214 topics' },
  { id: 'health', label: 'Network Health', state: 'warning', detail: 'Intermittent packet loss on VLAN 20' },
];
