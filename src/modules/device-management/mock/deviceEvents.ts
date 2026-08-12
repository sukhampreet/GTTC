import type { DeviceEventRecord } from '@/modules/device-management/types';

export const deviceEvents: DeviceEventRecord[] = [
  { id: 'DEVT-9101', timestamp: '2026-08-11 09:38:00', device: 'CAM-041', event: 'Device Offline', severity: 'critical', status: 'open', description: 'Camera stopped responding to NVR heartbeat for over 10 minutes.' },
  { id: 'DEVT-9100', timestamp: '2026-08-11 09:20:15', device: 'FP-A-01', event: 'Bus Fault', severity: 'critical', status: 'acknowledged', description: 'Fire panel reporting a communication fault on detection loop 2.' },
  { id: 'DEVT-9099', timestamp: '2026-08-11 08:47:40', device: 'BAR-ENT-02', event: 'Motor Overheat', severity: 'warning', status: 'acknowledged', description: 'Barrier motor temperature exceeded safe operating threshold.' },
  { id: 'DEVT-9098', timestamp: '2026-08-11 08:33:05', device: 'ENV-SRV-01', event: 'Sensor Drift', severity: 'warning', status: 'open', description: 'Temperature sensor readings trending above calibrated baseline.' },
  { id: 'DEVT-9097', timestamp: '2026-08-11 08:12:22', device: 'IC-OUT-04', event: 'Connectivity Lost', severity: 'critical', status: 'open', description: 'Outdoor intercom station lost network connectivity.' },
  { id: 'DEVT-9096', timestamp: '2026-08-11 08:05:10', device: 'NVR-CORE-01', event: 'Storage Warning', severity: 'warning', status: 'acknowledged', description: 'Recording storage nearing capacity at 88% utilization.' },
  { id: 'DEVT-9095', timestamp: '2026-08-11 07:44:30', device: 'HT-B-009', event: 'Low Battery', severity: 'warning', status: 'resolved', description: 'Heat sensor battery below 20% — replaced during maintenance visit.' },
  { id: 'DEVT-9094', timestamp: '2026-08-11 07:36:12', device: 'SW-CORE-01', event: 'CRC Errors', severity: 'warning', status: 'open', description: 'Core switch uplink port reporting elevated CRC error rate.' },
  { id: 'DEVT-9093', timestamp: '2026-08-11 06:58:03', device: 'DR-WEST-11', event: 'Firmware Outdated', severity: 'info', status: 'resolved', description: 'Controller flagged for firmware update to v2.8.4.' },
  { id: 'DEVT-9092', timestamp: '2026-08-11 06:30:48', device: 'AI-EDGE-03', event: 'Maintenance Mode', severity: 'info', status: 'resolved', description: 'Device placed into maintenance mode for scheduled firmware upgrade.' },
  { id: 'DEVT-9091', timestamp: '2026-08-11 06:12:19', device: 'DB-PRIMARY', event: 'Backup Completed', severity: 'info', status: 'resolved', description: 'Nightly backup completed successfully — 4.2 GB archived.' },
  { id: 'DEVT-9090', timestamp: '2026-08-10 23:41:00', device: 'CAM-055', event: 'Power Restored', severity: 'info', status: 'resolved', description: 'Camera regained power after circuit breaker reset.' },
  { id: 'DEVT-9089', timestamp: '2026-08-10 22:15:44', device: 'ENV-CAF-03', event: 'Device Connected', severity: 'info', status: 'resolved', description: 'Environment sensor reconnected to gateway after brief outage.' },
  { id: 'DEVT-9088', timestamp: '2026-08-10 21:02:37', device: 'DR-SOUTH-05', event: 'Firmware Verified', severity: 'info', status: 'resolved', description: 'Controller confirmed running latest firmware v2.8.4.' },
  { id: 'DEVT-9087', timestamp: '2026-08-10 19:47:12', device: 'IC-IN-12', event: 'System Started', severity: 'info', status: 'resolved', description: 'Indoor intercom station rejoined network after firmware update.' },
];
