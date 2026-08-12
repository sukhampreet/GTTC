import { Activity, ShieldAlert, DoorOpen, FlameKindling, ParkingSquare, BrainCircuit, HardDrive } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { todaysReport } from '@/modules/reports/mock';
import { DailyReportChart } from '@/modules/reports/components/daily/DailyReportChart';

export function DailyReportsPage() {
  return (
    <div>
      <PageHeader title="Daily Reports" description={`Summary of events recorded on ${todaysReport.date}.`} />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
        <StatCard label="Total Events" value={todaysReport.totalEvents} icon={Activity} tone="neutral" />
        <StatCard label="Critical Events" value={todaysReport.criticalEvents} icon={ShieldAlert} tone={todaysReport.criticalEvents > 0 ? 'danger' : 'success'} />
        <StatCard label="Access Events" value={todaysReport.accessEvents} icon={DoorOpen} tone="neutral" />
        <StatCard label="Fire Events" value={todaysReport.fireEvents} icon={FlameKindling} tone={todaysReport.fireEvents > 0 ? 'warning' : 'success'} />
        <StatCard label="Parking Events" value={todaysReport.parkingEvents} icon={ParkingSquare} tone="neutral" />
        <StatCard label="AI Events" value={todaysReport.aiEvents} icon={BrainCircuit} tone="neutral" />
        <StatCard label="Device Events" value={todaysReport.deviceEvents} icon={HardDrive} tone="neutral" />
      </div>

      <DailyReportChart />
    </div>
  );
}
