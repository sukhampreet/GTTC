import type { ServiceStatusRecord } from '@/modules/settings/types';

/** Services per context.md's Docker Deployment stack: nginx, redis, mysql, minio, emqx MQTT. */
export const serviceStatusRecords: ServiceStatusRecord[] = [
  { id: 'nginx', name: 'nginx', description: 'Reverse proxy & static asset server', state: 'online', uptime: '14d 6h', cpuPct: 3, memoryPct: 8 },
  { id: 'mysql', name: 'mysql', description: 'Primary relational database', state: 'online', uptime: '14d 6h', cpuPct: 12, memoryPct: 34 },
  { id: 'redis', name: 'redis', description: 'Cache & session store', state: 'online', uptime: '14d 6h', cpuPct: 4, memoryPct: 11 },
  { id: 'minio', name: 'minio', description: 'S3-compatible object storage for backups & media', state: 'warning', uptime: '2h 41m', cpuPct: 22, memoryPct: 47 },
  { id: 'emqx', name: 'emqx', description: 'MQTT broker for device telemetry', state: 'online', uptime: '14d 6h', cpuPct: 6, memoryPct: 14 },
  { id: 'app-server', name: 'gttc-app', description: 'Application server (API + WebSocket gateway)', state: 'online', uptime: '14d 6h', cpuPct: 18, memoryPct: 39 },
];
