import { HardDrive, Wifi, WifiOff, AlertTriangle, ShieldAlert, Wrench } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { deviceReportSummary } from '@/modules/reports/mock';
import { DeviceReportSummaryPanel } from '@/modules/reports/components/device/DeviceReportSummaryPanel';

export function DeviceReportsPage() {
  return (
    <div>
      <PageHeader title="Device Reports" description="Fleet-wide device health summary, using the same terminology as the Device Management module." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Devices" value={deviceReportSummary.totalDevices} icon={HardDrive} tone="neutral" />
        <StatCard label="Online" value={deviceReportSummary.online} icon={Wifi} tone="success" />
        <StatCard label="Offline" value={deviceReportSummary.offline} icon={WifiOff} tone="danger" />
        <StatCard label="Warning" value={deviceReportSummary.warning} icon={AlertTriangle} tone="warning" />
        <StatCard label="Critical" value={deviceReportSummary.critical} icon={ShieldAlert} tone="danger" />
        <StatCard label="Maintenance" value={deviceReportSummary.maintenance} icon={Wrench} tone="info" />
      </div>

      <DeviceReportSummaryPanel />
    </div>
  );
}
