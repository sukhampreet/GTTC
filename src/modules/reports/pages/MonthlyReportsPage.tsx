import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { ShieldAlert, DoorOpen, FlameKindling, ParkingSquare, Leaf, BrainCircuit, HardDrive } from 'lucide-react';
import { monthlyReports } from '@/modules/reports/mock';
import { MonthlyReportChart } from '@/modules/reports/components/monthly/MonthlyReportChart';

export function MonthlyReportsPage() {
  const latest = monthlyReports[monthlyReports.length - 1];

  return (
    <div>
      <PageHeader title="Monthly Reports" description="Month-over-month rollup across every security subsystem." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
        <StatCard label="Incidents" value={latest.incidents} icon={ShieldAlert} tone="neutral" />
        <StatCard label="Access" value={latest.access} icon={DoorOpen} tone="neutral" />
        <StatCard label="Fire" value={latest.fire} icon={FlameKindling} tone="neutral" />
        <StatCard label="Parking" value={latest.parking} icon={ParkingSquare} tone="neutral" />
        <StatCard label="Environment" value={latest.environment} icon={Leaf} tone="neutral" />
        <StatCard label="AI" value={latest.ai} icon={BrainCircuit} tone="neutral" />
        <StatCard label="Devices" value={latest.devices} icon={HardDrive} tone="neutral" />
      </div>

      <MonthlyReportChart />
    </div>
  );
}
