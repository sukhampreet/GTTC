import { HardDrive, Wifi, WifiOff, AlertTriangle, Wrench } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { environmentSensors } from '@/modules/environment-monitoring/mock';
import { DeviceStatusTable } from '@/modules/environment-monitoring/components/deviceStatus/DeviceStatusTable';

const LOW_BATTERY_THRESHOLD = 20;

export function DeviceStatusPage() {
  const online = environmentSensors.filter((s) => s.status === 'online').length;
  const offline = environmentSensors.filter((s) => s.status === 'offline').length;
  const warning = environmentSensors.filter((s) => s.status === 'warning').length;
  const maintenance = environmentSensors.filter((s) => s.battery < LOW_BATTERY_THRESHOLD).length;

  return (
    <div>
      <PageHeader title="Device Status" description="Connectivity, battery and signal health for every environment sensor." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Total Sensors" value={environmentSensors.length} icon={HardDrive} tone="neutral" />
        <StatCard label="Online" value={online} icon={Wifi} tone="success" />
        <StatCard label="Offline" value={offline} icon={WifiOff} tone={offline > 0 ? 'danger' : 'success'} />
        <StatCard label="Warning" value={warning} icon={AlertTriangle} tone={warning > 0 ? 'warning' : 'success'} />
        <StatCard label="Maintenance" value={maintenance} icon={Wrench} tone={maintenance > 0 ? 'warning' : 'success'} />
      </div>

      <DeviceStatusTable sensors={environmentSensors} />
    </div>
  );
}
