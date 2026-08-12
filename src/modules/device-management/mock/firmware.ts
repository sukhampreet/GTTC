import { devices } from '@/modules/device-management/mock/devices';
import type { FirmwareRecord } from '@/modules/device-management/types';

const RELEASE_DATES = [
  '2026-07-28', '2026-07-15', '2026-06-30', '2026-06-12', '2026-05-22',
  '2026-05-04', '2026-04-19', '2026-04-01', '2026-03-14', '2026-02-27',
];

export const firmware: FirmwareRecord[] = devices.map((device, index) => {
  const upToDate = device.firmwareCurrent === device.firmwareLatest;
  let status: FirmwareRecord['status'] = 'up-to-date';
  if (!upToDate) {
    status = index % 3 === 0 ? 'update-scheduled' : 'update-available';
  }
  if (device.health === 'offline') {
    status = 'unsupported';
  }

  return {
    id: `FW-${device.id.split('-')[1]}`,
    device: device.name,
    module: device.module,
    currentVersion: device.firmwareCurrent,
    availableVersion: device.firmwareLatest,
    releaseDate: RELEASE_DATES[index % RELEASE_DATES.length],
    status,
  };
});
