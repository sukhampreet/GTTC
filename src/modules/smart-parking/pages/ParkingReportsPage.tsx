import { Car, Timer } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { dailyParkingStats, weeklyOccupancy, peakHours } from '@/modules/smart-parking/mock';
import { DailyParkingChart } from '@/modules/smart-parking/components/parkingReports/DailyParkingChart';
import { WeeklyOccupancyChart } from '@/modules/smart-parking/components/parkingReports/WeeklyOccupancyChart';
import { PeakHoursChart } from '@/modules/smart-parking/components/parkingReports/PeakHoursChart';

const AVERAGE_PARKING_DURATION = '3 hr 12 min';

export function ParkingReportsPage() {
  const totalVehicleCount = dailyParkingStats.reduce((sum, d) => sum + d.entries, 0);

  return (
    <div>
      <PageHeader title="Parking Reports" description="Entry/exit trends, occupancy patterns and peak-hour analytics." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Vehicle Count (7d)" value={totalVehicleCount} icon={Car} tone="neutral" />
        <StatCard label="Average Parking Duration" value={AVERAGE_PARKING_DURATION} icon={Timer} tone="info" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DailyParkingChart data={dailyParkingStats} />
        <WeeklyOccupancyChart data={weeklyOccupancy} />
      </div>

      <div className="mt-4">
        <PeakHoursChart data={peakHours} />
      </div>
    </div>
  );
}
