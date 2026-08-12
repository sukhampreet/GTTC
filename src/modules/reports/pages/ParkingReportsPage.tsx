import { Car, LogIn, LogOut, ParkingSquare, Clock, Timer } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { parkingReportSummary } from '@/modules/reports/mock';
import { ParkingTrendChart } from '@/modules/reports/components/parking/ParkingTrendChart';

export function ParkingReportsPage() {
  return (
    <div>
      <PageHeader title="Parking Reports" description="Vehicle throughput, occupancy and dwell-time statistics across every parking zone." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Vehicles" value={parkingReportSummary.vehicles} icon={Car} tone="neutral" />
        <StatCard label="Entries" value={parkingReportSummary.entries} icon={LogIn} tone="neutral" />
        <StatCard label="Exits" value={parkingReportSummary.exits} icon={LogOut} tone="neutral" />
        <StatCard label="Occupancy" value={`${parkingReportSummary.occupancy}%`} icon={ParkingSquare} tone="neutral" />
        <StatCard label="Peak Hours" value={parkingReportSummary.peakHour} icon={Clock} tone="neutral" />
        <StatCard label="Avg. Duration" value={`${parkingReportSummary.averageDurationMinutes} min`} icon={Timer} tone="neutral" />
      </div>

      <ParkingTrendChart />
    </div>
  );
}
